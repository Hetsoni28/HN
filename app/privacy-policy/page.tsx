import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/organisms/legal-page';

export const metadata: Metadata = {
  title: 'Privacy Policy — HN',
  description: 'How HN collects, uses, and protects your personal information.',
};

const LAST_UPDATED = '2025-09-01';

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      intro="HN Digital Product Studio ('HN', 'we', 'us', or 'our') is committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it. By using our website or services, you agree to the practices described in this policy."
      sections={[
        {
          heading: '1. Information We Collect',
          content: [
            'Contact information you provide voluntarily, including your name, email address, phone number, and company name when you submit our contact or project inquiry form.',
            'Usage data collected automatically when you visit our website, including your IP address, browser type, pages visited, time spent on pages, and referring URLs. This data is collected via standard server logs and analytics tools.',
            'Communication data including the content of emails or messages you send to us.',
          ],
        },
        {
          heading: '2. How We Use Your Information',
          content: [
            'To respond to your project inquiries and communicate with you about potential or ongoing work.',
            'To improve our website and services by understanding how visitors interact with our content.',
            'To send you relevant updates about our services where you have expressly consented to receive such communications.',
            'To comply with legal obligations and protect our legal rights.',
          ],
        },
        {
          heading: '3. Data Storage and Security',
          content: [
            'We do not operate a proprietary database for contact form submissions. Inquiry data is transmitted directly to us via email using Resend, a third-party email delivery service.',
            'We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. However, no method of internet transmission or electronic storage is 100% secure.',
            'We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, including any legal, accounting, or reporting requirements.',
          ],
        },
        {
          heading: '4. Third-Party Services',
          content: [
            'Our website uses third-party services including Sanity (headless CMS), Resend (email delivery), and standard analytics. Each of these services has its own privacy policy.',
            'We do not sell, trade, or rent your personal information to third parties. We may share data with service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.',
          ],
        },
        {
          heading: '5. Cookies',
          content: 'We use cookies and similar tracking technologies to improve your browsing experience. For detailed information about the cookies we use and your choices regarding cookies, please see our Cookie Policy.',
        },
        {
          heading: '6. Your Rights',
          content: [
            'You have the right to access, correct, or delete any personal information we hold about you.',
            'You have the right to object to or restrict the processing of your personal data.',
            'You have the right to data portability — to receive a copy of your data in a structured, machine-readable format.',
            'To exercise any of these rights, please contact us at het@hn.studio.',
          ],
        },
        {
          heading: "7. Children's Privacy",
          content: 'Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that a child under 16 has provided us with personal information, we will delete it promptly.',
        },
        {
          heading: '8. Changes to This Policy',
          content: 'We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.',
        },
      ]}
    />
  );
}
