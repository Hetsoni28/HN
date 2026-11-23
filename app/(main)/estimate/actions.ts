'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { Resend } from 'resend';
import { sanitizeText } from '@/lib/security';
import { calculateEstimate, formatINR, PROJECT_BASES, TIMELINES, COMMON_INCLUDES } from '@/lib/estimator';

/* ─── Schema ─── */
const EstimateSchema = z.object({
  name:     z.string().min(2, 'Please enter your name').max(100),
  email:    z.string().email('Please enter a valid email address').max(254),
  phone:    z.string().max(30).optional(),
  base:     z.enum(PROJECT_BASES.map((b) => b.id) as [string, ...string[]]),
  features: z.array(z.string().max(30)).max(20),
  timeline: z.enum(TIMELINES.map((t) => t.id) as [string, ...string[]]),
  budget:   z.string().max(12).optional(),
  /* Honeypot — must be empty */
  website:  z.string().max(0, 'Bot detected'),
});

export type EstimateFormState = {
  status: 'idle' | 'success' | 'error';
  /** true when the visitor's own copy was emailed; false when only our team got it */
  visitorEmailed?: boolean;
  email?: string;
  message?: string;
  errors?: Partial<Record<'name' | 'email' | 'phone', string>>;
};

/* ─── Rate limit (simple in-memory, resets on cold start) ─── */
const rateMap = new Map<string, { count: number; resetAt: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip) ?? { count: 0, resetAt: now + 10 * 60_000 };
  if (now > entry.resetAt) { rateMap.set(ip, { count: 1, resetAt: now + 10 * 60_000 }); return false; }
  if (entry.count >= 3) return true;
  rateMap.set(ip, { ...entry, count: entry.count + 1 });
  return false;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

function estimateTable(e: ReturnType<typeof calculateEstimate>) {
  const row = (label: string, value: string, strong = false) =>
    `<tr><td style="padding:8px 0;color:#475569;font-size:14px">${label}</td><td style="padding:8px 0;text-align:right;color:#0f172a;font-size:14px;${strong ? 'font-weight:700' : ''}">${value}</td></tr>`;
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
      ${row('Project type', esc(e.base?.name ?? ''), true)}
      ${e.activeFeatures.map((f) => row(`+ ${esc(f.name)}`, '')).join('')}
      ${row('Timeline', esc(e.timeline?.name ?? ''))}
    </table>
    <div style="margin-top:16px;background:#F5F6FF;border-radius:8px;padding:16px">
      <div style="color:#0041CC;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px">Included in this price</div>
      <ul style="margin:10px 0 0;padding-left:18px;color:#334155;font-size:14px;line-height:22px">
        ${[...(e.base?.includes ?? []), ...COMMON_INCLUDES].map((i) => `<li>${esc(i)}</li>`).join('')}
      </ul>
    </div>
    <div style="margin-top:16px;padding-top:16px;border-top:1px dashed #cbd5e1">
      <div style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px">Estimated range (INR)</div>
      <div style="margin-top:6px;color:#0051FF;font-size:26px;font-weight:800">${formatINR(e.min)} – ${formatINR(e.max)}</div>
    </div>`;
}

/* ─── Server Action ─── */
export async function emailEstimate(_prev: EstimateFormState, formData: FormData): Promise<EstimateFormState> {
  let ip = 'unknown';
  try {
    ip = (await headers()).get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  } catch {
    ip = '127.0.0.1';
  }
  if (isRateLimited(ip)) {
    return { status: 'error', message: 'Too many requests. Please wait a few minutes and try again.' };
  }

  const parsed = EstimateSchema.safeParse({
    name:     sanitizeText(String(formData.get('name') ?? '')),
    email:    sanitizeText(String(formData.get('email') ?? '')),
    phone:    sanitizeText(String(formData.get('phone') ?? '')) || undefined,
    base:     String(formData.get('base') ?? ''),
    features: formData.getAll('features').map(String),
    timeline: String(formData.get('timeline') ?? ''),
    budget:   String(formData.get('budget') ?? '').replace(/\D/g, '') || undefined,
    website:  String(formData.get('website') ?? ''),
  });
  if (!parsed.success) {
    const f = parsed.error.flatten().fieldErrors;
    return { status: 'error', message: 'Please fix the errors below.', errors: { name: f.name?.[0], email: f.email?.[0], phone: f.phone?.[0] } };
  }
  const data = parsed.data;

  // Recalculate on the server — never trust prices sent from the browser
  const estimate = calculateEstimate(data.base, data.features, data.timeline);
  const budget = data.budget ? formatINR(Number(data.budget)) : 'Not specified';
  const firstName = esc(data.name.split(' ')[0]);

  const apiKey = process.env.RESEND_API_KEY;
  const teamEmail = process.env.CONTACT_EMAIL ?? 'contact.hntech.in@gmail.com';
  // A sender on a domain verified in Resend (e.g. "HN Tech <estimates@hntech.in>").
  // Resend's test sender can only deliver to the account owner, so visitor emails need this.
  const visitorFrom = process.env.RESEND_FROM;

  if (!apiKey) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Estimate — DEV MODE] Lead:', { ...data, estimate: `${estimate.min}-${estimate.max}` });
      return { status: 'success', visitorEmailed: false, email: data.email };
    }
    console.error('[Estimate — PRODUCTION ERROR] RESEND_API_KEY is not configured.');
    return { status: 'error', message: 'Email is temporarily unavailable. Please use “Send estimate via WhatsApp” instead.' };
  }

  const resend = new Resend(apiKey);

  /* 1. Lead copy to the HN team — this is the part that must succeed */
  try {
    const { error } = await resend.emails.send({
      from: 'HN Estimator <onboarding@resend.dev>',
      to: [teamEmail],
      replyTo: data.email,
      subject: `New estimate lead — ${estimate.base?.name} from ${data.name}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
          <div style="background:#0B111E;padding:28px 32px">
            <div style="color:#fff;font-size:20px;font-weight:700">HN Tech</div>
            <div style="color:#94a3b8;font-size:13px;margin-top:6px;text-transform:uppercase;letter-spacing:1px">New estimator lead</div>
          </div>
          <div style="padding:32px">
            <p style="margin:0 0 20px;color:#334155;font-size:15px"><strong>${esc(data.name)}</strong> used the cost estimator and asked for a copy.</p>
            <div style="background:#f8fafc;border-radius:8px;padding:20px;margin-bottom:24px;font-size:14px;color:#0f172a;line-height:24px">
              <div><span style="color:#64748b;display:inline-block;width:80px">Email</span><a href="mailto:${esc(data.email)}" style="color:#0051FF">${esc(data.email)}</a></div>
              ${data.phone ? `<div><span style="color:#64748b;display:inline-block;width:80px">Phone</span>${esc(data.phone)}</div>` : ''}
              <div><span style="color:#64748b;display:inline-block;width:80px">Budget</span>${budget}</div>
            </div>
            ${estimateTable(estimate)}
            <div style="margin-top:28px;text-align:center">
              <a href="mailto:${esc(data.email)}" style="display:inline-block;background:#0051FF;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px">Reply to ${firstName}</a>
            </div>
          </div>
        </div>`,
    });
    if (error) {
      console.error('[Estimate — Resend team copy error]:', error.message);
      return { status: 'error', message: 'Could not send right now. Please use “Send estimate via WhatsApp” instead.' };
    }
  } catch (err) {
    console.error('[Estimate] Team copy failed:', err);
    return { status: 'error', message: 'Could not send right now. Please use “Send estimate via WhatsApp” instead.' };
  }

  /* 2. The visitor's own copy — only possible from a verified sender domain */
  let visitorEmailed = false;
  if (visitorFrom) {
    try {
      const { error } = await resend.emails.send({
        from: visitorFrom,
        to: [data.email],
        replyTo: teamEmail,
        subject: `Your project estimate from HN Tech — ${formatINR(estimate.min)} to ${formatINR(estimate.max)}`,
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
            <div style="background:#0051FF;padding:28px 32px">
              <div style="color:#fff;font-size:20px;font-weight:700">HN Tech</div>
              <div style="color:#dbe5ff;font-size:13px;margin-top:6px">Human Network Tech · Web, App &amp; AI Development</div>
            </div>
            <div style="padding:32px">
              <p style="margin:0 0 8px;color:#0f172a;font-size:16px">Hi ${firstName},</p>
              <p style="margin:0 0 24px;color:#334155;font-size:15px;line-height:24px">Here's the estimate you put together on our website. It's a starting range based on typical projects; we'll confirm an exact price once we understand your requirements.</p>
              ${estimateTable(estimate)}
              <p style="margin:28px 0 0;color:#334155;font-size:15px;line-height:24px">Reply to this email or message us on WhatsApp and we'll send you a clear plan and a free proposal within 48 hours.</p>
              <div style="margin-top:24px">
                <a href="https://wa.me/917202031164" style="display:inline-block;background:#0051FF;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px">Chat on WhatsApp</a>
              </div>
              <p style="margin:28px 0 0;color:#64748b;font-size:13px">Het Soni · Founder, HN Tech · +91 72020 31164 · www.hntech.in</p>
            </div>
          </div>`,
      });
      if (error) console.error('[Estimate — Resend visitor copy error]:', error.message);
      else visitorEmailed = true;
    } catch (err) {
      console.error('[Estimate] Visitor copy failed:', err);
    }
  }

  return { status: 'success', visitorEmailed, email: data.email };
}
