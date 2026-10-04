import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/organisms/legal-page';

export const metadata: Metadata = {
  title: 'Terms of Service — HN',
  description: 'Terms and conditions for using HN services and website.',
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated="2025-09-01"
      intro="These Terms of Service ('Terms') govern your use of the HN Digital Product Studio website at hn.studio and any services we provide. By accessing our website or engaging our services, you agree to be bound by these Terms. Please read them carefully before proceeding."
      sections={[
        {
          heading: '1. About HN',
          content: [
            'HN Digital Product Studio is a freelance digital product studio based in India, founded by Het Soni and Neel Patel. We provide web development, web app development, SaaS development, mobile app development, AI integration, and digital product design services.',
            'For any queries, contact us at contact@hn.studio or via WhatsApp at +91 7990 743263.',
          ],
        },
        {
          heading: '2. Services & Project Agreements',
          content: [
            'The specific services, scope of work, deliverables, timelines, and fees for any project are agreed upon in a separate project proposal or Statement of Work (SOW), which we send to you before any work begins.',
            'Work does not commence until both parties have agreed to the project scope and an advance payment (if applicable) has been received.',
            'Any changes to the agreed scope after work has begun may result in additional charges, which will be communicated and agreed upon before implementation.',
          ],
        },
        {
          heading: '3. Payments',
          content: [
            'Payment terms are specified in each individual project agreement. Typically, we follow a milestone-based payment structure (e.g., 50% upfront, 50% on delivery).',
            'Invoices are issued in Indian Rupees (INR) and are payable via UPI, bank transfer, or another mutually agreed method.',
            'Late payments may result in pausing of project work. We reserve the right to charge interest on overdue invoices at a rate of 2% per month.',
          ],
        },
        {
          heading: '4. Intellectual Property',
          content: [
            'Upon receipt of full and final payment, all custom work created specifically for your project — including design files, source code, and written content — is transferred to you, the client.',
            'HN retains ownership of any pre-existing tools, reusable components, libraries, or internal frameworks developed independently. You receive a perpetual, royalty-free licence to use these within your project.',
            'HN reserves the right to display completed work in our portfolio and case studies unless you explicitly request otherwise in writing before project completion.',
          ],
        },
        {
          heading: '5. Client Responsibilities',
          content: [
            'You are responsible for providing accurate and complete information, content, and materials required for the project in a timely manner.',
            'Delays caused by late provision of materials or feedback from your side may affect project timelines. HN is not liable for delays caused by the client.',
            'You confirm that any content, images, or materials you provide do not infringe any third-party intellectual property rights.',
          ],
        },
        {
          heading: '6. Confidentiality',
          content: [
            'Both parties agree to keep confidential any proprietary or sensitive information shared during the course of the project and not to disclose it to third parties without written consent.',
            'This obligation continues for 2 years after the conclusion of the project.',
          ],
        },
        {
          heading: '7. Limitation of Liability',
          content: [
            'HN\'s liability for any claim arising from a project is limited to the total fees paid by you for that specific project.',
            'We are not liable for any indirect, incidental, or consequential damages, including but not limited to loss of revenue, data loss, or business interruption.',
            'We do not guarantee specific business outcomes (such as sales, traffic, or rankings) as a result of our work.',
          ],
        },
        {
          heading: '8. Termination',
          content: [
            'Either party may terminate a project agreement by providing 14 days written notice.',
            'In the event of termination, you are liable to pay for all work completed up to the date of termination. Any advance payments made are non-refundable unless HN has failed to deliver the agreed work.',
            'On termination, HN will provide you with all completed work and assets related to your project.',
          ],
        },
        {
          heading: '9. Website Use',
          content: [
            'The content on our website (hn.studio) is provided for informational purposes only. Prices, timelines, and service descriptions are indicative and subject to change.',
            'You may not reproduce, distribute, or use our website content without written permission.',
          ],
        },
        {
          heading: '10. Governing Law',
          content: [
            'These Terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Gujarat, India.',
          ],
        },
        {
          heading: '11. Changes to These Terms',
          content: [
            'We may update these Terms from time to time. The updated version will be posted on this page with a revised date. Continued use of our website or services after changes constitutes acceptance.',
          ],
        },
      ]}
    />
  );
}
