import { FadeIn } from '@/components/atoms/fade-in';
import { SectionHeading } from '@/components/molecules/section-heading';
import { Accordion } from '@/components/molecules/accordion';

export type FaqItem = {
  _id: string;
  question: string;
  answer: string;
};

const fallback: FaqItem[] = [
  {
    _id: '1',
    question: 'How much does a typical project cost?',
    answer:
      'Project costs vary by scope and complexity. A marketing website typically starts at $2 000–5 000. A complex SaaS or AI product is scoped after a paid discovery phase. We always provide a detailed fixed-price proposal before any work begins.',
  },
  {
    _id: '2',
    question: 'How long does it take to build and launch?',
    answer:
      'A polished marketing website takes 4–6 weeks. A web application or SaaS product takes 3–6 months. We structure larger projects into milestone-based sprints so you see progress early and often.',
  },
  {
    _id: '3',
    question: 'Do you work with early-stage startups?',
    answer:
      'Absolutely. We love working with founders at the idea stage to shape the MVP and technical direction. We are comfortable operating under NDA and advising on build vs. buy decisions.',
  },
  {
    _id: '4',
    question: 'What does the process look like after we reach out?',
    answer:
      'After your inquiry we schedule a discovery call to understand your goals. We then prepare a scope document, timeline and proposal. Once agreed, we kick off with design, move to development, and hand over a fully tested and deployed product.',
  },
  {
    _id: '5',
    question: 'Do you offer ongoing support and maintenance?',
    answer:
      'Yes. We offer monthly retainer plans for maintenance, performance monitoring, feature development and priority bug fixes so your product keeps improving after launch.',
  },
];

export function FaqSection({ faqs }: { faqs?: FaqItem[] }) {
  const list = faqs && faqs.length ? faqs : fallback;

  return (
    <section className="section bg-[#EEF0FF]">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <FadeIn className="text-center">
            <SectionHeading
              eyebrow="FAQ"
              title="Common questions."
              description="Everything you need to know before we get started."
              className="mx-auto text-center"
            />
          </FadeIn>

          <div className="border-t border-slate-200">
            {list.map((faq, i) => (
              <FadeIn key={faq._id} delay={i * 0.08}>
                <Accordion question={faq.question} answer={faq.answer} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
