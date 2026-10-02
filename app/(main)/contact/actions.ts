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
  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
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
  let fileBuffer: Buffer | null = null;
  let fileName = '';

  if (rawFile && rawFile.size > 0) {
    if (rawFile.size > 5 * 1024 * 1024) {
      return { status: 'error', message: 'Attachment must be under 5MB.' };
    }
    const arrayBuffer = await rawFile.arrayBuffer();
    fileBuffer = Buffer.from(arrayBuffer);
    fileName = rawFile.name;
  }

  /* 4. Send email via Resend */
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL ?? 'contact.hnsolutions@gmail.com';

  if (!apiKey) {
    /* Dev mode — log to console and succeed */
    console.log('[Contact Form — DEV] New inquiry:', data, fileBuffer ? `[Attached: ${fileName}]` : '');
    return { status: 'success' };
  }

  try {
    const resend = new Resend(apiKey);

    const attachments = fileBuffer ? [{ filename: fileName, content: fileBuffer }] : undefined;

    await resend.emails.send({
      from:    'HN Contact Form <onboarding@resend.dev>',
      to:      [toEmail],
      replyTo: data.email,
      subject: `New Inquiry — ${data.projectType} from ${data.name}`,
      attachments,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#0051FF">New Project Inquiry</h2>
          <hr style="border-color:#E2E5F1"/>

          <h3>Contact</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          ${data.phone   ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}

          <h3>Project</h3>
          <p><strong>Type:</strong> ${data.projectType}</p>
          
          <p><strong>Timeline:</strong> ${data.timeline}</p>
          <p><strong>Attachment:</strong> ${fileBuffer ? fileName : 'None'}</p>

          <h3>Description</h3>
          <p style="white-space:pre-wrap">${data.description}</p>
          <hr style="border-color:#E2E5F1"/>
          <p style="color:#94a3b8;font-size:12px">Sent via hn.studio contact form</p>
        </div>
      `,
    });

    /* Auto-reply to client (Requires verified domain in Resend)
    await resend.emails.send({
      from:    'HN <onboarding@resend.dev>',
      to:      [data.email],
      subject: `We received your inquiry, ${data.name.split(' ')[0]}!`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#0051FF">Thanks for reaching out!</h2>
          <p>Hi ${data.name.split(' ')[0]},</p>
          <p>We've received your inquiry about a <strong>${data.projectType}</strong> project and will get back to you within <strong>24–48 hours</strong>.</p>
          <p>In the meantime, feel free to check out our work at <a href="https://hn.studio/work">hn.studio/work</a>.</p>
          <p>— Het & Neel</p>
          <hr style="border-color:#E2E5F1"/>
          <p style="color:#94a3b8;font-size:12px">HN · Digital Product Studio</p>
        </div>
      `,
    });
    */

    return { status: 'success' };
  } catch (err) {
    console.error('[Contact Form] Resend error:', err);
    return { status: 'error', message: 'Something went wrong. Please email us directly at het@hn.studio.' };
  }
}
