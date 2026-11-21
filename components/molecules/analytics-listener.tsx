'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

/**
 * One delegated click listener for lead-intent links across the whole site, so individual buttons
 * don't each need tracking code: WhatsApp, phone, email and "Start a Project" (/contact) links.
 */
export function AnalyticsListener() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute('href') ?? '';
      const label = (link.getAttribute('aria-label') || link.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80);

      if (/wa\.me|api\.whatsapp\.com/.test(href)) trackEvent('whatsapp_click', { link_text: label });
      else if (href.startsWith('tel:')) trackEvent('phone_click', { link_text: label });
      else if (href.startsWith('mailto:')) trackEvent('email_click', { link_text: label });
      else if (/^\/contact(\?|$)/.test(href)) trackEvent('cta_click', { cta: 'start_project', link_text: label });
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
