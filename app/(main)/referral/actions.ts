'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { sanitizeText } from '@/lib/security';

/* ─── Schema ─── */
const ReferralSchema = z.object({
  referrerName:    z.string().min(2, 'Name must be at least 2 characters').max(100),
  referrerEmail:   z.string().email('Please enter a valid email address').max(254),
  referrerPhone:   z.string().max(30).optional(),
  friendName:      z.string().min(2, "Friend's name must be at least 2 characters").max(100),
  friendEmail:     z.string().email("Please enter your friend's email address").max(254),
  friendCompany:   z.string().max(100).optional(),
  friendNeed:      z.string().min(10, 'Please describe the project in at least 10 characters').max(1000),
  /* Honeypot — must be empty */
  website:         z.string().max(0, 'Bot detected'),
});

export type ReferralFormData = z.infer<typeof ReferralSchema>;

export type FormState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  friendName?: string;
  errors?: Partial<Record<keyof ReferralFormData, string>>;
};

/* ─── Server Action ─── */
export async function submitReferral(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {

  /* 1. Sanitize all text inputs BEFORE validation */
  const raw = {
    referrerName:  sanitizeText(String(formData.get('referrerName')  ?? '')),
    referrerEmail: sanitizeText(String(formData.get('referrerEmail') ?? '')),
    referrerPhone: sanitizeText(String(formData.get('referrerPhone') ?? '')),
    friendName:    sanitizeText(String(formData.get('friendName')    ?? '')),
    friendEmail:   sanitizeText(String(formData.get('friendEmail')   ?? '')),
    friendCompany: sanitizeText(String(formData.get('friendCompany') ?? '')),
    friendNeed:    sanitizeText(String(formData.get('friendNeed')    ?? '')),
    website:       String(formData.get('website') ?? ''), // honeypot — check raw
  };

  /* 2. Validate with Zod */
  const parsed = ReferralSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: FormState['errors'] = {};
    for (const [key, msgs] of Object.entries(parsed.error.flatten().fieldErrors)) {
      errors[key as keyof ReferralFormData] = msgs?.[0];
    }
    return { status: 'error', message: 'Please fix the errors below.', errors };
  }

  const data = parsed.data;

  /* 3. Send email via Resend (wrapped in try/catch — never block user on email failure) */
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[Referral Form — DEV] RESEND_API_KEY not set. Skipping email.');
    return { status: 'success', friendName: data.friendName };
  }
  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from:    'HN Referral Program <onboarding@resend.dev>',
      to:      ['contact.hnsolutions@gmail.com'],
      replyTo: data.referrerEmail,
      subject: `🤝 New Referral — ${data.referrerName} referred ${data.friendName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#ffffff">
          <div style="background:#0051FF;padding:32px 32px 24px;border-radius:12px 12px 0 0">
            <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700">🤝 New Referral Received</h1>
            <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px">
              Someone just referred a friend to HN!
            </p>
          </div>

          <div style="padding:28px 32px;border:1px solid #E2E5F1;border-top:none">

            <h2 style="color:#0051FF;font-size:14px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;margin:0 0 12px">
              Referring Party
            </h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
              <tr>
                <td style="padding:8px 12px;background:#F8F9FF;border-radius:6px;width:140px;font-size:13px;color:#64748b;font-weight:600">Name</td>
                <td style="padding:8px 12px;background:#F8F9FF;border-radius:6px;font-size:13px;color:#1e293b">${data.referrerName}</td>
              </tr>
              <tr><td colspan="2" style="height:4px"></td></tr>
              <tr>
                <td style="padding:8px 12px;background:#F8F9FF;border-radius:6px;width:140px;font-size:13px;color:#64748b;font-weight:600">Email</td>
                <td style="padding:8px 12px;background:#F8F9FF;border-radius:6px;font-size:13px;color:#1e293b">
                  <a href="mailto:${data.referrerEmail}" style="color:#0051FF">${data.referrerEmail}</a>
                </td>
              </tr>
              ${data.referrerPhone ? `
              <tr><td colspan="2" style="height:4px"></td></tr>
              <tr>
                <td style="padding:8px 12px;background:#F8F9FF;border-radius:6px;width:140px;font-size:13px;color:#64748b;font-weight:600">Phone</td>
                <td style="padding:8px 12px;background:#F8F9FF;border-radius:6px;font-size:13px;color:#1e293b">${data.referrerPhone}</td>
              </tr>` : ''}
            </table>

            <hr style="border:none;border-top:1px solid #E2E5F1;margin:0 0 24px"/>

            <h2 style="color:#0051FF;font-size:14px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;margin:0 0 12px">
              Referred Friend
            </h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
              <tr>
                <td style="padding:8px 12px;background:#F8F9FF;border-radius:6px;width:140px;font-size:13px;color:#64748b;font-weight:600">Name</td>
                <td style="padding:8px 12px;background:#F8F9FF;border-radius:6px;font-size:13px;color:#1e293b">${data.friendName}</td>
              </tr>
              <tr><td colspan="2" style="height:4px"></td></tr>
              <tr>
                <td style="padding:8px 12px;background:#F8F9FF;border-radius:6px;width:140px;font-size:13px;color:#64748b;font-weight:600">Email</td>
                <td style="padding:8px 12px;background:#F8F9FF;border-radius:6px;font-size:13px;color:#1e293b">
                  <a href="mailto:${data.friendEmail}" style="color:#0051FF">${data.friendEmail}</a>
                </td>
              </tr>
              ${data.friendCompany ? `
              <tr><td colspan="2" style="height:4px"></td></tr>
              <tr>
                <td style="padding:8px 12px;background:#F8F9FF;border-radius:6px;width:140px;font-size:13px;color:#64748b;font-weight:600">Company</td>
                <td style="padding:8px 12px;background:#F8F9FF;border-radius:6px;font-size:13px;color:#1e293b">${data.friendCompany}</td>
              </tr>` : ''}
              <tr><td colspan="2" style="height:4px"></td></tr>
              <tr>
                <td style="padding:8px 12px;background:#F8F9FF;border-radius:6px;width:140px;font-size:13px;color:#64748b;font-weight:600;vertical-align:top">Project Need</td>
                <td style="padding:8px 12px;background:#F8F9FF;border-radius:6px;font-size:13px;color:#1e293b;white-space:pre-wrap">${data.friendNeed}</td>
              </tr>
            </table>

            <div style="background:#EEF3FF;border-left:3px solid #0051FF;padding:14px 16px;border-radius:0 6px 6px 0;margin-bottom:8px">
              <p style="margin:0;font-size:13px;color:#1e293b">
                <strong>Next step:</strong> Reach out to ${data.friendName} at
                <a href="mailto:${data.friendEmail}" style="color:#0051FF">${data.friendEmail}</a>
                and mention that ${data.referrerName} sent them your way. Send a proposal within 48 hours!
              </p>
            </div>

          </div>

          <div style="padding:16px 32px;background:#F8F9FF;border-radius:0 0 12px 12px;border:1px solid #E2E5F1;border-top:none">
            <p style="margin:0;font-size:11px;color:#94a3b8">Sent via HN Referral Program · contact.hnsolutions@gmail.com</p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    /* Email failed — still return success so user isn't blocked */
    console.error('[Referral Form] Resend error:', err);
  }

  return { status: 'success', friendName: data.friendName };
}
