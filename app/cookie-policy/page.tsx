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
      intro="This Cookie Policy explains how HN Digital Product Studio uses cookies and similar tracking technologies when you visit our website. By continuing to use our website, you consent to our use of cookies as described in this policy."
      sections={[
        {
          heading: '1. What Are Cookies?',
          content: 'Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently, remember your preferences, and provide information to website owners about how their site is being used.',
        },
        {
          heading: '2. Types of Cookies We Use',
          content: [
            'Essential cookies: Strictly necessary for the website to function. These cannot be disabled and are set in response to actions you take such as filling in forms.',
            'Analytics cookies: We use basic analytics to understand how visitors interact with our website — pages visited, time on site, and referral sources. This data is anonymised and not linked to any individual.',
            'Preference cookies: These remember your settings and choices to provide a more personalised experience on return visits.',
          ],
        },
        {
          heading: '3. Cookies We Do Not Use',
          content: [
            'We do not use advertising or tracking cookies.',
            'We do not use cookies to build profiles of individual users for marketing purposes.',
            'We do not share cookie data with third-party advertisers.',
          ],
        },
        {
          heading: '4. Third-Party Cookies',
          content: 'Some pages may include embedded content or tools from third parties (such as Sanity for content management). These third parties may set their own cookies. We recommend reviewing the privacy policies of these services directly.',
        },
        {
          heading: '5. Managing Cookies',
          content: [
            'You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or be notified when a new cookie is set.',
            'Please note that disabling certain cookies may affect the functionality of our website.',
          ],
        },
        {
          heading: '6. Changes to This Policy',
          content: 'We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. Changes will be posted on this page with an updated revision date.',
        },
      ]}
    />
  );
}
