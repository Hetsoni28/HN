import Image from 'next/image';
import { FadeIn } from '@/components/atoms/fade-in';
const STEPS = [
  {
    number: '01',
    title: 'Discover',
    tagline: 'We listen before we write a single line of code.',
    color: 'from-[#0051FF] to-[#0070F3]',
    what: 'A structured kick-off session to understand your business, goals, users, and constraints. We ask the hard questions now so there are no surprises later.',
    clientProvides: [
      'Business overview and objectives',
      'Existing designs or brand assets (if any)',
      'Reference sites or products you admire',
      'Technical constraints or existing systems',
    ],
    hnDelivers: [
      'Detailed discovery notes and requirement summary',
      'Clarifying questions resolved',
      'Preliminary project scope document',
    ],
    communication: 'Video call (60–90 min) + shared discovery document.',
    handoff: 'Signed scope of work and project brief.',
  },
  {
    number: '02',
    title: 'Plan',
    tagline: 'A clear roadmap before any design or development begins.',
    color: 'from-[#0070F3] to-[#0090FF]',
    what: 'We translate the discovery into a concrete plan — architecture decisions, feature list, technology choices, timeline, and milestones. No ambiguity, no moving targets.',
    clientProvides: [
      'Feedback on the draft project plan',
      'Prioritised feature list (must-have vs. nice-to-have)',
      'Budget confirmation',
      'Access to any existing systems or APIs',
    ],
    hnDelivers: [
      'Full project plan with milestones and deadlines',
      'Technology stack recommendation with rationale',
      'Data and architecture diagram',
      'Risk register and mitigation notes',
    ],
    communication: 'Async via shared doc + one review call.',
    handoff: 'Approved project plan. Development contract signed.',
  },
  {
    number: '03',
    title: 'Design',
    tagline: 'Interfaces built for real users, not for portfolio screenshots.',
    color: 'from-[#0090FF] to-[#00B0FF]',
    what: 'UI/UX design that solves actual problems. We work in Figma with a component-first approach — building a design system that scales alongside the product.',
    clientProvides: [
      'Brand guidelines, logo, and colour palette',
      'Content and copy for key pages',
      'Feedback on each design round (max 2 revision cycles)',
    ],
    hnDelivers: [
      'Figma file with all screens and states',
      'Design system (components, tokens, typography)',
      'Mobile-responsive layouts',
      'Developer-ready annotated specs',
    ],
    communication: 'Weekly design review calls + Figma comments.',
    handoff: 'Approved Figma file. Design system exported.',
  },
  {
    number: '04',
    title: 'Build',
    tagline: 'Clean code, tested features, no shortcuts.',
    color: 'from-[#00B0FF] to-[#00C8FF]',
    what: 'The main development phase. We work in short sprints, ship working features to a staging environment, and keep you updated weekly. No black-box development.',
    clientProvides: [
      'Content, copy, and media assets',
      'Third-party API credentials (payment gateway, etc.)',
      'Prompt feedback on staging previews',
    ],
    hnDelivers: [
      'Working application deployed to staging',
      'Weekly progress updates with demo links',
      'Git repository with clean commit history',
      'Automated tests for critical user flows',
    ],
    communication: 'Weekly update + async Slack/WhatsApp channel.',
    handoff: 'Staging URL with all features complete and tested.',
  },
  {
    number: '05',
    title: 'Launch',
    tagline: 'A smooth go-live, not a stressful one.',
    color: 'from-[#00C8FF] to-[#00D2FF]',
    what: 'Production deployment with pre-flight checks, DNS configuration, performance validation, and monitoring setup. We stay on-call for 72 hours post-launch.',
    clientProvides: [
      'Domain access and hosting credentials',
      'Final content sign-off',
      'Confirmation of launch timing',
    ],
    hnDelivers: [
      'Production deployment with zero downtime',
      'SSL certificates and DNS configuration',
      'Uptime and error monitoring configured',
      'SEO and performance audit post-launch',
      '72-hour on-call support window',
    ],
    communication: 'Daily check-ins during launch week.',
    handoff: 'Live product. Full codebase and credentials handed over.',
  },
  {
    number: '06',
    title: 'Evolve',
    tagline: 'A launch is a beginning, not an end.',
    color: 'from-[#00D2FF] to-[#0051FF]',
    what: 'Ongoing support, performance monitoring, and feature development. We offer monthly retainers for clients who want a long-term engineering partner, not a one-time vendor.',
    clientProvides: [
      'Feature requests and feedback',
      'Monthly retainer (if ongoing support selected)',
    ],
    hnDelivers: [
      'Bug fixes and security patches',
      'Monthly performance and Lighthouse reports',
      'New feature development within retainer hours',
      'Quarterly product review and roadmap planning',
    ],
    communication: 'Dedicated Slack/WhatsApp channel. Monthly video review.',
    handoff: 'Ongoing — the product grows with your business.',
  },
];

/* ── Sub-item row ── */
function DetailRow({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  return (
    <div>
      <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        {label}
      </div>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-slate-600">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0051FF]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Single step card ── */
function StepCard({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  return (
    <FadeIn delay={index * 0.07}>
      <div className="group relative grid gap-0 overflow-hidden rounded-3xl border border-[#E2E5F1] bg-white transition duration-300 hover:border-[#0051FF]/20 hover:shadow-xl hover:shadow-[#0051FF]/8 lg:grid-cols-[280px_1fr]">

        {/* Left — number + title */}
        <div className={`relative flex flex-col justify-between bg-gradient-to-br ${step.color} p-8 lg:p-10`}>
          <div>
            <span className="text-7xl font-black leading-none text-white/20">{step.number}</span>
            <h3 className="mt-4 text-3xl font-bold text-white">{step.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/70">{step.tagline}</p>
          </div>
        </div>

        {/* Right — details */}
        <div className="p-8 lg:p-10">
          <p className="text-base leading-7 text-slate-600">{step.what}</p>

          <div className="mt-8 grid gap-7 sm:grid-cols-2">
            <DetailRow label="Client provides" items={step.clientProvides} />
            <DetailRow label="HN delivers" items={step.hnDelivers} />
          </div>

          <div className="mt-8 grid gap-5 border-t border-[#E2E5F1] pt-6 sm:grid-cols-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Communication</span>
              <p className="mt-1.5 text-sm text-slate-600">{step.communication}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Handoff</span>
              <p className="mt-1.5 text-sm font-semibold text-slate-800">{step.handoff}</p>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ── Exported organisms ── */
export function ProcessHero() {
  return (
    <section className="relative section overflow-hidden min-h-[70vh] flex flex-col justify-center py-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/process-hero.png"
          alt="Process Background Illustration"
          fill
          quality={100}
          className="object-cover object-center"
          priority
         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      </div>

      <div className="container relative z-10 text-center">
        <FadeIn>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl md:text-6xl drop-shadow-sm">
            Your journey from <span className="gradient-text">idea to live product.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-800 font-medium sm:text-lg sm:leading-8 drop-shadow-sm">
            A transparent, structured process with no black boxes. You always know what&apos;s happening, what&apos;s next, and what we need from you.
          </p>
        </FadeIn>

        {/* Step pills */}
        <FadeIn delay={0.15}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {STEPS.map((s) => (
              <span
                key={s.number}
                className="rounded-full border border-white/60 bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm"
              >
                <span className="mr-2 font-black text-[#0051FF]">{s.number}</span>
                {s.title}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function ProcessSteps() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="relative space-y-6">
          {/* Vertical connector line */}
          <div className="absolute left-[139px] top-0 hidden h-full w-px bg-gradient-to-b from-[#0051FF]/30 via-[#00D2FF]/30 to-transparent lg:block" />
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessFaq() {
  const faqs = [
    { q: 'How long does a typical project take?', a: 'Most projects fall between 4–12 weeks depending on scope. A simple website: 3–4 weeks. A full SaaS platform: 10–16 weeks. We give you a precise timeline in the Plan phase before any work begins.' },
    { q: 'How do we communicate during the project?', a: 'You get a dedicated Slack or WhatsApp channel with direct access to Het and Neel — not an account manager. Expect weekly written updates, milestone demos, and prompt responses to questions.' },
    { q: 'What do you need from us to get started?', a: 'A brief describing what you want to build, any existing brand assets, and a rough sense of your budget and timeline. We handle everything from there.' },
    { q: 'Do you work on fixed price or time & materials?', a: 'Primarily fixed price for defined scopes — you know the cost upfront. For evolving products and ongoing retainers, we use a monthly time-and-materials model.' },
  ];

  return (
    <section className="section bg-[#EEF0FF]">
      <div className="container">
        <FadeIn>
          <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">Process FAQs.</h2>
        </FadeIn>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {faqs.map((faq, i) => (
            <FadeIn key={faq.q} delay={i * 0.07} className="h-full">
              <div className="h-full rounded-2xl border border-[#E2E5F1] bg-white p-7">
                <h3 className="text-base font-bold text-slate-900">{faq.q}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{faq.a}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
