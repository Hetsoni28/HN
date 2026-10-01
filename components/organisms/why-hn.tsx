import { FadeIn } from '@/components/atoms/fade-in';
import { Counter } from '@/components/atoms/counter';
import { SectionHeading } from '@/components/molecules/section-heading';

const reasons = [
  {
    title: 'Enterprise Architecture',
    desc: 'We engineer highly scalable, microservices-driven architecture designed to handle enterprise loads seamlessly.',
  },
  {
    title: 'Rigorous Security Standards',
    desc: 'Security is embedded at every layer, ensuring strict compliance and absolute protection of your data.',
  },
  {
    title: 'Data-Driven Engineering',
    desc: 'Every technical decision is driven by measurable business outcomes, ROI, and core performance metrics.',
  },
  {
    title: 'Zero Technical Debt',
    desc: 'We deliver clean, strictly typed, fully documented codebases that your internal teams can inherit effortlessly.',
  },
  {
    title: 'Dedicated Elite Teams',
    desc: 'You work directly with senior architects and elite engineers. No junior hand-offs, no communication silos.',
  },
  {
    title: 'Long-term SLA & Support',
    desc: 'We do not just ship and leave. We provide ongoing 99.99% uptime guarantees and dedicated maintenance.',
  },
];

const metrics = [
  { value: '15+',  label: 'Products shipped',     bg: 'bg-[#0051FF]',              text: 'text-white',       sub: 'text-white/70' },
  { value: '100%', label: 'On-time delivery',      bg: 'bg-[#EEF0FF] border border-[#E2E5F1]', text: 'text-[#0051FF]', sub: 'text-slate-500' },
  { value: '3',    label: 'Countries served',      bg: 'bg-[#EEF0FF] border border-[#E2E5F1]', text: 'text-slate-900', sub: 'text-slate-500' },
  { value: '2x',   label: 'Faster than agencies', bg: 'bg-[#0B111E]',              text: 'text-white',       sub: 'text-slate-400' },
];

export function WhyHN() {
  return (
    <section className="section">
      <div className="container">

        {/* Top heading — full width */}
        <FadeIn>
          <SectionHeading
            eyebrow="Why HN"
            title="We obsess over the details most studios skip."
          />
        </FadeIn>

        {/* Two equal columns */}
        <div className="grid items-start gap-10 lg:grid-cols-2">

          {/* Left — 2-col reasons grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {reasons.map(({ title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.06}>
                <div className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0051FF] text-[10px] font-bold text-white">
                    ✓
                  </div>
                  <div>
                    <div className="text-sm font-bold leading-snug text-slate-900">{title}</div>
                    <div className="mt-1 text-xs leading-5 text-slate-500">{desc}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Right — metric cards + promise */}
          <FadeIn delay={0.15}>
            <div className="grid grid-cols-2 gap-3">
              {metrics.map((m) => (
                <div key={m.label} className={`rounded-2xl p-6 ${m.bg}`}>
                  <div className={`text-4xl font-bold ${m.text}`}>
                    <Counter value={m.value} />
                  </div>
                  <div className={`mt-1.5 text-sm ${m.sub}`}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Promise banner */}
            <div className="mt-3 rounded-2xl bg-gradient-to-r from-[#0051FF] to-[#00D2FF] p-6 text-white">
              <div className="text-xs font-bold uppercase tracking-widest opacity-80">
                Our commitment
              </div>
              <h3 className="mt-1.5 text-xl font-bold">If it ships, it&apos;s quality.</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/80">
                We don&apos;t release work we&apos;re not proud to put our names on. Clean code, tested, documented, and maintainable.
              </p>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
