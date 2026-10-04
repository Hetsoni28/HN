import type { Metadata } from 'next';
import { FadeIn } from '@/components/atoms/fade-in';
import { Button } from '@/components/atoms/button';

export const metadata: Metadata = {
  title: 'HN vs Freelancer vs Big Agency | Which is Right for You?',
  description:
    'Comparing HN Tech against hiring a freelancer or a big agency. See quality, cost, accountability, timelines, and hidden costs side-by-side before you decide.',
  keywords: [
    'hire freelancer vs agency',
    'HN vs freelancer vs agency',
    'freelancer vs agency comparison',
    'digital agency vs freelancer',
    'when to hire a freelancer',
    'when to hire an agency',
    'tech company vs agency',
    'best way to build a web app',
    'hire developers India',
  ],
  openGraph: {
    title: 'HN vs Freelancer vs Big Agency | Which is Right for You?',
    description:
      'Stop guessing. Compare HN, freelancers, and big agencies across quality, cost, timelines, accountability, and more.',
    type: 'website',
  },
};

/* ── Comparison table data ── */
const TABLE_ROWS = [
  {
    category: 'Quality & Expertise',
    hn: { text: 'Senior-level engineers & designers on every project', icon: '⭐' },
    freelancer: { text: 'Varies widely — hard to vet upfront', icon: '⚠️' },
    agency: { text: 'Strong teams but juniors do the work', icon: '✓' },
  },
  {
    category: 'Communication',
    hn: { text: 'Direct access to founders, no account managers', icon: '✓' },
    freelancer: { text: 'Direct but unreliable response times', icon: '⚠️' },
    agency: { text: 'Filtered through PMs & account leads', icon: '✗' },
  },
  {
    category: 'Timeline',
    hn: { text: 'Predictable sprints, clear milestones', icon: '✓' },
    freelancer: { text: 'Unpredictable — disappears mid-project', icon: '✗' },
    agency: { text: 'Slow — committees & approval chains', icon: '⚠️' },
  },
  {
    category: 'Cost',
    hn: { text: 'Transparent flat-rate pricing, no surprise invoices', icon: '✓' },
    freelancer: { text: 'Low rate, but hidden scope creep costs', icon: '⚠️' },
    agency: { text: 'High retainers, inflated overhead', icon: '✗' },
  },
  {
    category: 'Accountability',
    hn: { text: 'Founders personally stake reputation on delivery', icon: '✓' },
    freelancer: { text: 'Minimal — hard to enforce contracts', icon: '✗' },
    agency: { text: 'Contractual but ownership diffused', icon: '⚠️' },
  },
  {
    category: 'Scalability',
    hn: { text: 'Grows with you — right-size each phase', icon: '✓' },
    freelancer: { text: 'Single-person bottleneck, not scalable', icon: '✗' },
    agency: { text: 'Built for scale, but expensive to engage', icon: '✓' },
  },
  {
    category: 'Ongoing Support',
    hn: { text: 'Long-term retainers available, same team', icon: '✓' },
    freelancer: { text: 'Availability not guaranteed post-launch', icon: '✗' },
    agency: { text: 'Available but billed at premium rates', icon: '⚠️' },
  },
  {
    category: 'Hidden Costs',
    hn: { text: 'None — fixed scope, fixed price', icon: '✓' },
    freelancer: { text: 'Scope creep, rework, ghosting risk', icon: '✗' },
    agency: { text: 'Change-order fees, over-service billing', icon: '✗' },
  },
];

const ICON_COLOR: Record<string, string> = {
  '✓': 'text-emerald-400',
  '✗': 'text-red-400',
  '⚠️': 'text-amber-400',
  '⭐': 'text-[#0051FF]',
};

/* ── Persona cards ── */
const PERSONAS = [
  {
    who: 'Choose HN if…',
    accent: 'bg-[#0051FF]',
    textColor: 'text-white',
    subColor: 'text-white/75',
    borderColor: 'border-[#0051FF]',
    points: [
      "You're a startup founder moving fast",
      'You need senior engineers, not interns',
      'You want the people you spoke to to actually build it',
      'Deadlines are real and budget is fixed',
      'You care about clean code and long-term maintainability',
    ],
  },
  {
    who: 'Choose a freelancer if…',
    accent: 'bg-slate-100',
    textColor: 'text-slate-900',
    subColor: 'text-slate-500',
    borderColor: 'border-slate-200',
    points: [
      'Budget is extremely tight (under \$2k)',
      'You need a simple one-page brochure site',
      'There is genuinely no hard deadline',
      'You have in-house developers for QA and support',
      'The project is truly isolated and one-off',
    ],
  },
  {
    who: 'Choose a big agency if…',
    accent: 'bg-slate-100',
    textColor: 'text-slate-900',
    subColor: 'text-slate-500',
    borderColor: 'border-slate-200',
    points: [
      'You are an enterprise with a \$200k+ budget',
      'Legal / compliance sign-offs require large vendor contracts',
      'You need dozens of parallel workstreams',
      'Brand is a Fortune 500 requiring ISO certifications',
      'Internal procurement mandates a certain vendor size',
    ],
  },
];

export default function ComparePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="section bg-[#EEF0FF]">
        <div className="container text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0051FF]/20 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#0051FF]">
              The honest comparison
            </div>
            <h1 className="mx-auto mt-5 max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              Stop Guessing.{' '}
              <span className="gradient-text">Pick the Right Partner.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">
              Hiring the wrong team is expensive — not just in money, but in time, missed
              opportunities, and months of rework. Here&apos;s an unfiltered breakdown of your
              three real options.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="section">
        <div className="container">
          <FadeIn>
            <div className="overflow-x-auto rounded-2xl border border-[#E2E5F1] shadow-xl shadow-slate-100">
              <table className="w-full min-w-[700px] border-collapse text-sm">
                {/* Header */}
                <thead>
                  <tr>
                    <th className="w-40 border-b border-[#E2E5F1] bg-slate-50 px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400">
                      Category
                    </th>
                    {/* HN — highlighted */}
                    <th className="border-b border-[#0051FF] bg-[#0051FF] px-6 py-4 text-left">
                      <div className="text-xs font-bold uppercase tracking-widest text-white/60">
                        Recommended
                      </div>
                      <div className="mt-0.5 text-base font-bold text-white">HN Tech</div>
                    </th>
                    <th className="border-b border-[#E2E5F1] bg-slate-50 px-6 py-4 text-left">
                      <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Option 2
                      </div>
                      <div className="mt-0.5 text-base font-bold text-slate-700">Freelancer</div>
                    </th>
                    <th className="border-b border-[#E2E5F1] bg-slate-50 px-6 py-4 text-left">
                      <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Option 3
                      </div>
                      <div className="mt-0.5 text-base font-bold text-slate-700">Big Agency</div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {TABLE_ROWS.map((row, i) => (
                    <tr
                      key={row.category}
                      className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                    >
                      {/* Category */}
                      <td className="border-b border-[#E2E5F1] px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        {row.category}
                      </td>

                      {/* HN — blue column */}
                      <td className="border-b border-[#0051FF]/20 bg-[#0051FF] px-6 py-4">
                        <div className="flex items-start gap-2">
                          <span
                            className={`mt-0.5 shrink-0 text-base leading-none ${ICON_COLOR[row.hn.icon] ?? 'text-white'}`}
                          >
                            {row.hn.icon}
                          </span>
                          <span className="text-sm font-medium leading-snug text-white/90">
                            {row.hn.text}
                          </span>
                        </div>
                      </td>

                      {/* Freelancer */}
                      <td className="border-b border-[#E2E5F1] px-6 py-4">
                        <div className="flex items-start gap-2">
                          <span
                            className={`mt-0.5 shrink-0 text-base leading-none ${ICON_COLOR[row.freelancer.icon] ?? 'text-slate-600'}`}
                          >
                            {row.freelancer.icon}
                          </span>
                          <span className="text-sm leading-snug text-slate-600">
                            {row.freelancer.text}
                          </span>
                        </div>
                      </td>

                      {/* Big Agency */}
                      <td className="border-b border-[#E2E5F1] px-6 py-4">
                        <div className="flex items-start gap-2">
                          <span
                            className={`mt-0.5 shrink-0 text-base leading-none ${ICON_COLOR[row.agency.icon] ?? 'text-slate-600'}`}
                          >
                            {row.agency.icon}
                          </span>
                          <span className="text-sm leading-snug text-slate-600">
                            {row.agency.text}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Persona Cards ── */}
      <section className="section bg-[#F6F7FB]">
        <div className="container">
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                Which one is right for you?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
                No fluff — pick the option that matches your situation.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {PERSONAS.map((p, i) => (
              <FadeIn key={p.who} delay={i * 0.08}>
                <div
                  className={`flex h-full flex-col rounded-2xl border-2 ${p.borderColor} ${p.accent} p-7`}
                >
                  <h3 className={`mb-5 text-lg font-bold ${p.textColor}`}>{p.who}</h3>
                  <ul className="flex-1 space-y-3">
                    {p.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <span
                          className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${p.textColor === 'text-white' ? 'bg-white/60' : 'bg-slate-400'}`}
                        />
                        <span className={`text-sm leading-snug ${p.subColor}`}>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social proof strip ── */}
      <section className="section border-y border-[#E2E5F1]">
        <div className="container">
          <FadeIn>
            <div className="grid gap-8 text-center sm:grid-cols-3">
              {[
                { stat: '48 h', label: 'Average first-draft turnaround' },
                { stat: '100%', label: 'Projects delivered on agreed scope' },
                { stat: '3', label: 'Senior engineers, zero hand-offs' },
              ].map(({ stat, label }) => (
                <div key={label}>
                  <div className="text-4xl font-bold text-[#0051FF] md:text-5xl">{stat}</div>
                  <div className="mt-2 text-sm font-medium text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section bg-[#0051FF]">
        <div className="container text-center">
          <FadeIn>
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Ready to work with the right team?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
              Skip the guesswork. Get a free proposal from HN — three senior engineers who treat your
              project like their own.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                href="/contact"
                className="bg-white px-10 py-4 text-base font-bold text-[#0051FF] hover:bg-blue-50"
              >
                Get a Free Proposal →
              </Button>
              <Button
                href="/work"
                className="border border-white/30 bg-transparent px-10 py-4 text-base text-white hover:bg-white/10"
              >
                See Our Work
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
