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
      intro="These Terms of Service ('Terms') govern your use of the HN Digital Product Studio website and any services we provide. By accessing our website or engaging our services, you agree to be bound by these Terms. Please read them carefully."
      sections={[
        {
          heading: '1. Services',
          content: [
            'HN Digital Product Studio provides digital product design and development services including websites, web applications, mobile applications, SaaS platforms, AI solutions, and related consulting.',
            'The specific services, deliverables, timelines, and fees for any project are agreed upon in a separate Statement of Work (SOW) or project contract, which forms part of the agreement between us.',
          ],
        },
        {
          heading: '2. Intellectual Property',
          content: [
            'Upon receipt of full payment, all custom work created specifically for a client project — including design files, source code, and written content — is transferred to the client.',
            'HN retains ownership of any pre-existing tools, frameworks, libraries, or processes developed independently and used in the project. Clients receive a perpetual licence to use these components within their project.',
            'HN reserves the right to display completed work in our portfolio unless explicitly agreed otherwise in the project contract.',
          ],
        },
        {
          heading: '3. Payment Terms',
          content: [
            'Payment terms are outlined in the project contract. Typically, projects require a deposit of 40–50% before work commences, with the remainder due upon project completion or in agreed milestone payments.',
            'Invoices are due within 14 days of issue unless otherwise agreed. Late payments may incur interest at 2% per month.',
            'We reserve the right to pause work on any project with an overdue invoice.',
          ],
        },
        {
          heading: '4. Client Responsibilities',
          content: [
            'Clients are responsible for providing accurate and complete information, timely feedback, required assets (logos, content, credentials), and approvals at agreed milestones.',
            'Delays caused by late feedback, missing assets, or scope changes beyond the agreed SOW may affect project timelines and may incur additional costs.',
          ],
        },
        {
          heading: '5. Warranties and Limitations',
          content: [
            'We warrant that our services will be performed with reasonable skill and care, and that deliverables will substantially conform to the agreed specifications.',
            "To the fullest extent permitted by law, HN's total liability for any claim arising from our services is limited to the fees paid by the client for the specific project giving rise to the claim.",
            'We are not liable for indirect, incidental, consequential, or punitive damages including lost profits or business interruption.',
          ],
        },
        {
          heading: '6. Confidentiality',
          content: 'Both parties agree to keep confidential any non-public information disclosed in connection with a project. This obligation continues for two years after the completion of the project. Standard NDAs are available upon request.',
        },
        {
          heading: '7. Termination',
          content: [
            "Either party may terminate a project engagement with 14 days' written notice.",
            'In the event of termination, the client is responsible for payment of all work completed up to the termination date. Any deposit paid is non-refundable unless HN is in material breach of the agreed terms.',
          ],
        },
        {
          heading: '8. Governing Law',
          content: 'These Terms are governed by the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of India.',
        },
        {
          heading: '9. Changes to These Terms',
          content: 'We may update these Terms from time to time. Continued use of our website or services after such changes constitutes acceptance of the revised Terms.',
        },
      ]}
    />
  );
}
