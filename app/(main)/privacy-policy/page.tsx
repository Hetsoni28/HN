import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/organisms/legal-page';

export const metadata: Metadata = {
  title: 'Privacy Policy â€” HN',
  description: 'How HN collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="2025-09-01"
      heroImage="/privacy-hero.png"
      intro="HN Digital Product Studio ('HN', 'we', 'us', or 'our') is committed to protecting your privacy. This Privacy Policy explains what information we collect when you visit our website or contact us, how we use it, and your rights regarding that information. We operate from India and comply with applicable Indian data protection laws."
      sections={[
        {
          heading: '1. Information We Collect',
          content: [
            'Contact form submissions: When you fill out our contact form, we collect your name, email address, phone number (optional), and the message you send. This is used solely to respond to your inquiry.',
            'Referral form submissions: If you submit a referral, we collect your name, email, phone (optional), and the details of the person you are referring. This information is used to process the referral and pay your reward if eligible.',
            'Email communications: When you email us directly at contact.hnsolutions@gmail.com, we retain your email address and the content of your messages for the purpose of responding to you.',
            'Analytics: Our website may use anonymised analytics tools to understand general visitor behaviour (such as pages visited and time on site). We do not collect personally identifiable information through analytics.',
            'We do not collect payment information directly. Any payments are processed through third-party providers (such as UPI apps or bank transfers) and are subject to their own privacy policies.',
          ],
        },
        {
          heading: '2. How We Use Your Information',
          content: [
            'To respond to your enquiries and project requests.',
            'To process referral submissions and communicate with referred contacts.',
            'To send project-related updates and invoices to active clients.',
            'To improve our website and understand how visitors use it.',
            'We do not use your information for unsolicited marketing emails. We will only email you if you have contacted us first or are an active client.',
          ],
        },
        {
          heading: '3. Sharing Your Information',
          content: [
            'We do not sell, rent, or trade your personal information to any third party.',
            'We may share your information with trusted service providers who help us operate our business (e.g., email services, cloud storage), but only to the extent necessary and under strict confidentiality obligations.',
            'We may disclose your information if required by law or to protect our legal rights.',
          ],
        },
        {
          heading: '4. Data Retention',
          content: [
            'We retain contact form and enquiry data for up to 2 years, after which it is deleted unless an ongoing client relationship exists.',
            'Project-related communications and contracts are retained for up to 7 years for legal and accounting purposes.',
            'You may request deletion of your data at any time by emailing us at contact.hnsolutions@gmail.com.',
          ],
        },
        {
          heading: '5. Cookies',
          content: [
            'Our website uses a small number of cookies necessary for basic functionality and anonymised analytics. We do not use tracking cookies for advertising purposes. Please see our Cookie Policy for full details.',
          ],
        },
        {
          heading: '6. Your Rights',
          content: [
            'You have the right to access the personal data we hold about you, request corrections, or ask us to delete it.',
            'To exercise any of these rights, please contact us at contact.hnsolutions@gmail.com. We will respond within 30 days.',
          ],
        },
        {
          heading: '7. Security',
          content: [
            'We take reasonable technical and organisational measures to protect your data from unauthorised access, loss, or misuse. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
          ],
        },
        {
          heading: '8. Changes to This Policy',
          content: [
            'We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page reflects the most recent revision. Continued use of our website after changes constitutes acceptance of the updated policy.',
          ],
        },
        {
          heading: '9. Contact',
          content: [
            'If you have any questions or concerns about this Privacy Policy, please contact us at contact.hnsolutions@gmail.com or use the contact form on our website.',
          ],
        },
      ]}
    />
  );
}
