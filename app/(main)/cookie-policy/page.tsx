import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/organisms/legal-page';

export const metadata: Metadata = {
  title: 'Cookie Policy — HN',
  description: 'Information about how HN uses cookies on its website.',
};

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Cookie Policy"
      lastUpdated="2025-09-01"
      heroImage="/cookie-hero.png"
      intro="This Cookie Policy explains what cookies are, which cookies our website (hntech.in) uses, and how you can control them. We keep our cookie usage minimal — we do not use advertising or tracking cookies."
      sections={[
        {
          heading: '1. What Are Cookies?',
          content: [
            'Cookies are small text files placed on your device by a website when you visit it. They help the website remember information about your visit, such as your preferences, to make your next visit easier and the site more useful.',
            'Cookies cannot run programs or deliver viruses to your device. They are uniquely assigned to you and can only be read by the web server that issued them.',
          ],
        },
        {
          heading: '2. Cookies We Use',
          content: [
            'Strictly Necessary Cookies: These cookies are essential for our website to function correctly. They enable basic features such as page navigation and access to secure areas. Our website cannot function properly without these cookies, and they cannot be switched off.',
            'Analytics Cookies: We may use anonymised analytics tools (such as Vercel Analytics) to understand how visitors interact with our website — for example, which pages are visited most and how long visitors stay. This data is aggregated and does not identify individual users. No personally identifiable information is collected through analytics cookies.',
            'We do NOT use: advertising cookies, retargeting cookies, social media tracking cookies, or any cookies that profile you for commercial purposes.',
          ],
        },
        {
          heading: '3. Third-Party Cookies',
          content: [
            'Our website does not embed third-party advertising networks, social media widgets, or external analytics platforms that set their own tracking cookies.',
            'If we ever add third-party integrations in the future, this policy will be updated accordingly.',
          ],
        },
        {
          heading: '4. How to Control Cookies',
          content: [
            'You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or be notified when a cookie is set.',
            'To manage cookies in your browser, refer to the help section of your specific browser: Chrome, Firefox, Safari, or Edge.',
            'Please note that disabling strictly necessary cookies may affect the functionality of our website.',
          ],
        },
        {
          heading: '5. Cookie Duration',
          content: [
            'Session cookies: These are temporary and are deleted when you close your browser.',
            'Persistent cookies: These remain on your device for a set period (typically up to 12 months) or until you delete them manually.',
            'Our analytics cookies, if present, are typically session-based or short-lived (under 30 days).',
          ],
        },
        {
          heading: '6. Changes to This Policy',
          content: [
            'We may update this Cookie Policy as our website evolves. The "Last updated" date at the top reflects the most recent revision. We encourage you to review this page periodically.',
          ],
        },
        {
          heading: '7. Contact Us',
          content: [
            'If you have any questions about our use of cookies, please email us at contact.hnsolutions@gmail.com.',
          ],
        },
      ]}
    />
  );
}
