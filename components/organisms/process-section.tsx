import { FadeIn } from '@/components/atoms/fade-in';
import { SectionHeading } from '@/components/molecules/section-heading';

const steps = [
  { n: '01', title: 'Discover',  desc: 'Deep-dive into your business, users, goals and competitive landscape.' },
  { n: '02', title: 'Plan',      desc: 'Define scope, milestones, architecture and a realistic delivery roadmap.' },
  { n: '03', title: 'Design',    desc: 'Create the visual system, user flows, and interactive prototypes.' },
  { n: '04', title: 'Build',     desc: 'Develop, integrate, test and iterate in public sprints with your feedback.' },
  { n: '05', title: 'Launch',    desc: 'Production deployment, performance tuning, SEO and complete handover.' },
  { n: '06', title: 'Evolve',    desc: 'Ongoing support, new features, and continuous improvement post-launch.' },
];

export function ProcessSection() {
  return (
    <section className="section">
      <div className="container">
        <FadeIn>
          <SectionHeading
            eyebrow="Delivery Methodology"
            title="Predictable delivery, zero surprises."
            description="A rigorous, transparent six-phase methodology ensuring on-time delivery and strict quality control at scale."
          />
        </FadeIn>

        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-[#0051FF] via-slate-200 to-transparent sm:left-7 md:block" />

          <div className="space-y-4 sm:space-y-5">
            {steps.map(({ n, title, desc }, i) => (
              <FadeIn key={n} delay={i * 0.1}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 md:gap-8">
                  {/* Step circle */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0051FF] text-base font-bold text-white shadow-lg shadow-[#0051FF]/25 sm:h-14 sm:w-14 sm:text-lg">
                    {n}
                  </div>
                  {/* Card */}
                  <div className="card flex-1 p-6">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="mt-2 leading-7 text-slate-600">{desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
