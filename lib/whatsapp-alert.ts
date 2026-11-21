/**
 * Instant WhatsApp alert to the HN team when a new lead arrives, sent through CallMeBot's free
 * WhatsApp API (https://www.callmebot.com/blog/free-api-whatsapp-messages/).
 *
 * Setup (one time): from the phone that should receive alerts, send the activation message CallMeBot
 * describes, then put the API key it replies with in CALLMEBOT_APIKEY.
 *   CALLMEBOT_APIKEY       — required; alerts are skipped (no error) while it's unset
 *   WHATSAPP_ALERT_PHONE   — optional, international format without "+"; defaults to Het Soni's number
 *
 * Never throws: a failed alert must not break the form that triggered it. Call it inside next/server
 * `after()` so the visitor's response isn't delayed.
 */
const DEFAULT_PHONE = '917202031164';

export async function sendWhatsAppAlert(text: string): Promise<void> {
  const apiKey = process.env.CALLMEBOT_APIKEY?.trim();
  if (!apiKey) {
    if (process.env.NODE_ENV === 'development') console.log('[WhatsApp alert — not configured]\n' + text);
    return;
  }
  const phone = (process.env.WHATSAPP_ALERT_PHONE?.trim() || DEFAULT_PHONE).replace(/\D/g, '');
  const url =
    `https://api.callmebot.com/whatsapp.php?phone=%2B${phone}` +
    `&text=${encodeURIComponent(text.slice(0, 1500))}&apikey=${encodeURIComponent(apiKey)}`;

  try {
    const res = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(10_000) });
    if (!res.ok) console.error('[WhatsApp alert] CallMeBot responded', res.status);
  } catch (err) {
    console.error('[WhatsApp alert] failed:', err instanceof Error ? err.message : err);
  }
}

/** Plain-text lead summary for WhatsApp (one field per line, empty fields dropped). */
export function leadMessage(title: string, fields: Record<string, string | undefined>): string {
  const lines = Object.entries(fields)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v!.trim()}`);
  return [`🔔 ${title}`, '', ...lines, '', 'Reply fast: www.hntech.in'].join('\n');
}
