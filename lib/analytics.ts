/**
 * Google Analytics 4 events for lead tracking. Safe to call anywhere on the client:
 * it does nothing on the server, when gtag hasn't loaded, or when the visitor declined cookies.
 *
 * Events sent:
 *   generate_lead       — contact form, referral form or emailed estimate submitted (mark as a Key event in GA4)
 *   cta_click           — a "Start a Project" / contact link was clicked
 *   whatsapp_click      — any WhatsApp link was tapped
 *   phone_click         — any tel: link was tapped
 *   email_click         — any mailto: link was clicked
 *   estimator_start     — first time a visitor changes an option in the cost estimator
 */
type Gtag = (command: 'event' | 'consent', name: string, params?: Record<string, unknown>) => void;

export const CONSENT_KEY = 'hn-cookie-consent';

export function trackEvent(name: string, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === 'undefined') return;
  try {
    if (localStorage.getItem(CONSENT_KEY) === 'declined') return;
  } catch {
    // storage blocked: fall through, gtag consent mode still applies
  }
  const gtag = (window as Window & { gtag?: Gtag }).gtag;
  if (typeof gtag !== 'function') return;
  gtag('event', name, { page_path: window.location.pathname, ...params });
}

/** Tell GA whether it may store analytics cookies (called from the cookie banner). */
export function setAnalyticsConsent(granted: boolean) {
  if (typeof window === 'undefined') return;
  const gtag = (window as Window & { gtag?: Gtag }).gtag;
  if (typeof gtag === 'function') gtag('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' });
}
