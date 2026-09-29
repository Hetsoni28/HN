import { FadeIn } from '@/components/atoms/fade-in';
/* ─── Hero ─── */
export function AboutHero() {
  return (
    <section className="section bg-[#EEF0FF]">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              Why <span className="gradient-text">HN</span> exists.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Most businesses are told they need to wait months and spend lakhs to get a digital product built. We know that&apos;s not true — because we&apos;ve done it better, faster, and with more care.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              HN was founded on one belief: <strong className="text-slate-900">great software should be accessible to every business</strong>, not just the ones with enterprise budgets. From a single website to a full SaaS platform — we build it right, on time, every time.
            </p>
          </FadeIn>

          {/* Stats panel */}
          <FadeIn delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '2024', label: 'Founded', sub: 'Est. in India' },
                { value: '15+',  label: 'Projects', sub: 'Products shipped' },
                { value: '100%', label: 'On-Time', sub: 'Every single project' },
                { value: '2',    label: 'Founders', sub: 'Het & Neel' },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-[#E2E5F1] bg-white p-6">
                  <div className="text-4xl font-bold text-[#0051FF]">{s.value}</div>
                  <div className="mt-1 text-base font-bold text-slate-900">{s.label}</div>
                  <div className="mt-0.5 text-xs text-slate-400">{s.sub}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Intro: HN = Het + Neel ─── */
export function AboutIntro() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
              HN ={' '}
              <span className="gradient-text">Het</span>
              {' '}+{' '}
              <span className="gradient-text">Neel</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-500">
              We&apos;re a two-person digital product studio from India. No bloated teams, no account managers, no hand-offs. When you work with HN, you work directly with the engineers building your product.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-500">
              Between us we cover the full stack — frontend, backend, mobile, AI, cloud, and design. We&apos;ve shipped everything from car rental management systems to AI-powered healthcare assistants, and we bring that same depth of craft to every project we take on.
            </p>
          </FadeIn>
        </div>

        {/* Founder intro cards */}
        <FadeIn delay={0.15}>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {[
              {
                name: 'Het Soni',
                role: 'Full Stack Developer',
                initials: 'HS',
                color: 'from-[#0051FF] to-[#0070F3]',
                bio: 'Focused on full-stack architecture, React ecosystems, and AI integration. Loves turning complex requirements into clean, scalable systems.',
                skills: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'AI/ML', 'TypeScript'],
                github: 'https://github.com/Hetsoni28',
              },
              {
                name: 'Neel Patel',
                role: 'Web Developer',
                initials: 'NP',
                color: 'from-[#0070F3] to-[#00D2FF]',
                bio: 'Specialises in frontend engineering, UI/UX implementation, and performance optimisation. Turns designs into pixel-perfect, fast-loading interfaces.',
                skills: ['React', 'Tailwind CSS', 'Figma', 'TypeScript', 'Motion Design', 'Laravel'],
                github: '#',
              },
            ].map((f) => (
              <div key={f.name} className="rounded-3xl border border-[#E2E5F1] bg-white p-8">
                {/* Avatar */}
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${f.color} text-xl font-bold text-white`}>
                  {f.initials}
                </div>
                <div className="mt-5">
                  <div className="text-xl font-bold text-slate-900">{f.name}</div>
                  <div className="mt-1 text-sm font-semibold text-[#0051FF]">{f.role}</div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-500">{f.bio}</p>
                {/* Skills */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {f.skills.map((s) => (
                    <span key={s} className="rounded-lg border border-[#E2E5F1] bg-[#EEF0FF] px-3 py-1 text-xs font-semibold text-slate-600">
                      {s}
                    </span>
                  ))}
                </div>
                {/* GitHub link */}
                <a
                  href={f.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-[#0051FF]"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub Profile
                </a>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Vision ─── */
export function AboutVision() {
  return (
    <section className="section bg-[#EEF0FF]">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-center">
          <FadeIn>
            <h2 className="mt-5 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
              What HN wants to build.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-6">
              <p className="text-lg leading-8 text-slate-600">
                We want to be the studio that ambitious founders and growing businesses trust for their most important digital bets — the product that defines their company.
              </p>
              <p className="text-lg leading-8 text-slate-600">
                Our vision is a world where exceptional digital products aren&apos;t the privilege of the well-funded few. Where a founder in Ahmedabad can ship a world-class SaaS product. Where a local business can have a website as fast and as beautiful as a Fortune 500 company.
              </p>
              <div className="rounded-2xl border-l-4 border-[#0051FF] bg-white p-6">
                <p className="text-lg font-semibold italic text-slate-700">
                  &ldquo;From Idea to Digital Reality — for every business, at every stage.&rdquo;
                </p>
                <p className="mt-2 text-sm text-slate-400">— HN Mission</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
