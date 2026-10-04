'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { Resend } from 'resend';
import { sanitizeText } from '@/lib/security';

/* ─── Schema ─── */
const InquirySchema = z.object({
  name:        z.string().min(2, 'Name must be at least 2 characters').max(100),
  email:       z.string().email('Please enter a valid email address').max(254),
  phone:       z.string().max(30).optional(),
  company:     z.string().max(100).optional(),
  projectType: z.string().min(1, 'Please select a project type').max(60),
  description: z.string().min(20, 'Please describe your project in at least 20 characters').max(3000),
  
  timeline:    z.string().min(1, 'Please select a timeline').max(60),
  /* Honeypot — must be empty */
  website:     z.string().max(0, 'Bot detected'),
});

export type InquiryFormData = z.infer<typeof InquirySchema>;

export type FormState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  errors?: Partial<Record<keyof InquiryFormData, string>>;
};

/* ─── Rate limit (simple in-memory, resets on cold start) ─── */
const rateMap = new Map<string, { count: number; resetAt: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip) ?? { count: 0, resetAt: now + 60_000 };
  if (now > entry.resetAt) { rateMap.set(ip, { count: 1, resetAt: now + 60_000 }); return false; }
  if (entry.count >= 3) return true;
  rateMap.set(ip, { ...entry, count: entry.count + 1 });
  return false;
}

/* ─── Server Action ─── */
export async function submitInquiry(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  let ip = 'unknown';
  try {
    const headerList = await headers();
    ip = headerList.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  } catch {
    // Graceful fallback when executed outside active request scope (e.g. unit testing)
    ip = '127.0.0.1';
  }

  if (isRateLimited(ip)) {
    return {
      status: 'error',
      message: 'Too many requests. Please wait a minute before submitting again.',
    };
  }

  /* 1. Sanitize all text inputs BEFORE validation */
  const raw = {
    name:        sanitizeText(String(formData.get('name') ?? '')),
    email:       sanitizeText(String(formData.get('email') ?? '')),
    phone:       sanitizeText(String(formData.get('phone') ?? '')),
    company:     sanitizeText(String(formData.get('company') ?? '')),
    projectType: sanitizeText(String(formData.get('projectType') ?? '')),
    description: sanitizeText(String(formData.get('description') ?? '')),
    
    timeline:    sanitizeText(String(formData.get('timeline') ?? '')),
    website:     String(formData.get('website') ?? ''), // honeypot — don't sanitize (check raw)
  };

  /* 2. Validate with Zod */
  const parsed = InquirySchema.safeParse(raw);
  if (!parsed.success) {
    const errors: FormState['errors'] = {};
    for (const [key, msgs] of Object.entries(parsed.error.flatten().fieldErrors)) {
      errors[key as keyof InquiryFormData] = msgs?.[0];
    }
    return { status: 'error', message: 'Please fix the errors below.', errors };
  }

  const data = parsed.data;

  /* 3. Process File Attachment */
  const rawFile = formData.get('file') as File | null;
  let fileBase64: string | null = null;
  let fileName = '';
  let fileType = 'application/octet-stream';

  if (rawFile && rawFile.size > 0) {
    if (rawFile.size > 5 * 1024 * 1024) {
      return { status: 'error', message: 'Attachment must be under 5MB.' };
    }
    const arrayBuffer = await rawFile.arrayBuffer();
    fileBase64 = Buffer.from(arrayBuffer).toString('base64');
    fileName = rawFile.name;
    fileType = rawFile.type || 'application/octet-stream';
  }

  /* 4. Send email via Resend */
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL ?? 'contact@hn.studio';

  if (!apiKey) {
    if (process.env.NODE_ENV === 'development') {
      /* Dev mode — log to console and succeed for local development testing */
      console.log('[Contact Form — DEV MODE] Inbound inquiry:', data, fileBase64 ? `[Attached: ${fileName}]` : '');
      return { status: 'success' };
    }
    console.error('[Contact Form — PRODUCTION ERROR] RESEND_API_KEY is not configured.');
    return {
      status: 'error',
      message: 'Email service is temporarily unavailable. Please contact us directly at het@hntech.in or via WhatsApp.',
    };
  }

  try {
    const resend = new Resend(apiKey);

    /* Resend requires base64 string + contentType for reliable attachment delivery */
    const attachments = fileBase64
      ? [{ filename: fileName, content: fileBase64, contentType: fileType }]
      : undefined;

    const { error: sendError } = await resend.emails.send({
      from:    'HN Contact Form <onboarding@resend.dev>',
      to:      [toEmail],
      replyTo: data.email,
      subject: `New Inquiry — ${data.projectType} from ${data.name}${fileBase64 ? ' 📎' : ''}`,
      attachments,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
          <div style="background-color:#0B111E;padding:32px;text-align:center">
            <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;letter-spacing:-0.5px">HN Tech</h1>
            <p style="color:#94a3b8;margin:8px 0 0 0;font-size:14px;text-transform:uppercase;letter-spacing:1px">New Project Inquiry</p>
          </div>
          <div style="padding:40px 32px">
            <p style="font-size:16px;color:#334155;line-height:24px;margin:0 0 24px 0">
              You have received a new project inquiry from <strong>${data.name}</strong>.
            </p>
            <div style="background-color:#f8fafc;border-radius:8px;padding:24px;margin-bottom:32px">
              <h3 style="margin:0 0 16px 0;font-size:14px;text-transform:uppercase;letter-spacing:1px;color:#64748b">Client Details</h3>
              <div style="margin-bottom:12px">
                <span style="color:#64748b;font-size:14px;display:inline-block;width:80px">Name</span>
                <span style="color:#0f172a;font-weight:500;font-size:15px">${data.name}</span>
              </div>
              <div style="margin-bottom:12px">
                <span style="color:#64748b;font-size:14px;display:inline-block;width:80px">Email</span>
                <a href="mailto:${data.email}" style="color:#0051FF;text-decoration:none;font-weight:500;font-size:15px">${data.email}</a>
              </div>
              ${data.phone ? `<div style="margin-bottom:12px"><span style="color:#64748b;font-size:14px;display:inline-block;width:80px">Phone</span><span style="color:#0f172a;font-weight:500;font-size:15px">${data.phone}</span></div>` : ''}
              ${data.company ? `<div style="margin-bottom:0"><span style="color:#64748b;font-size:14px;display:inline-block;width:80px">Company</span><span style="color:#0f172a;font-weight:500;font-size:15px">${data.company}</span></div>` : ''}
            </div>
            <div style="background-color:#f8fafc;border-radius:8px;padding:24px;margin-bottom:32px">
              <h3 style="margin:0 0 16px 0;font-size:14px;text-transform:uppercase;letter-spacing:1px;color:#64748b">Project Scope</h3>
              <div style="margin-bottom:12px">
                <span style="color:#64748b;font-size:14px;display:inline-block;width:80px">Type</span>
                <span style="color:#0f172a;font-weight:500;font-size:15px">${data.projectType}</span>
              </div>
              <div style="margin-bottom:12px">
                <span style="color:#64748b;font-size:14px;display:inline-block;width:80px">Timeline</span>
                <span style="color:#0f172a;font-weight:500;font-size:15px">${data.timeline}</span>
              </div>
              <div style="margin-bottom:0">
                <span style="color:#64748b;font-size:14px;display:inline-block;width:80px">Attachment</span>
                <span style="color:#0f172a;font-weight:500;font-size:15px">${fileBase64 ? `📎 ${fileName}` : 'None'}</span>
              </div>
            </div>
            <h3 style="margin:0 0 12px 0;font-size:14px;text-transform:uppercase;letter-spacing:1px;color:#64748b">Message</h3>
            <div style="background-color:#f8fafc;border-radius:8px;padding:24px">
              <p style="margin:0;font-size:15px;color:#334155;line-height:24px;white-space:pre-wrap">${data.description}</p>
            </div>
            <div style="margin-top:40px;text-align:center">
              <a href="mailto:${data.email}" style="display:inline-block;background-color:#0051FF;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;font-size:15px">Reply to ${data.name.split(' ')[0]}</a>
            </div>
          </div>
          <div style="background-color:#f1f5f9;padding:24px 32px;text-align:center">
            <p style="margin:0;color:#64748b;font-size:13px">This email was securely sent from your HN Tech contact form.</p>
          </div>
        </div>
      `,
    });

    if (sendError) {
      console.error('[Contact Form — Resend Delivery Error]:', sendError.message);
      return {
        status: 'error',
        message: 'Delivery error. Please email us directly at het@hntech.in or message us on WhatsApp.',
      };
    }

    return { status: 'success' };
  } catch (err) {
    console.error('[Contact Form] Unexpected delivery failure:', err);
    return {
      status: 'error',
      message: 'Something went wrong sending your inquiry. Please email us directly at het@hntech.in or reach out via WhatsApp.',
    };
  }
}
