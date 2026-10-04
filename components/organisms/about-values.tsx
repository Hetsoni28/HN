import { FadeIn } from '@/components/atoms/fade-in';
import type { TeamMember } from '@/lib/content';

const VALUES = [
  {
    title: 'Purpose',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    description: 'Every line of code we write serves a real business outcome. We don\'t build features for the sake of it — we build what moves the needle.',
  },
  {
    title: 'Quality',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    description: 'We hold ourselves to a standard most agencies don\'t — clean architecture, tested code, detailed documentation, and products that are genuinely pleasant to use.',
  },
  {
    title: 'Practical Technology',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    description: 'We choose the right tool for the job, not the trendy one. Battle-tested stacks, proven patterns, and technology that will still make sense in five years.',
  },
  {
    title: 'Scalability',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
      </svg>
    ),
    description: 'We architect for tomorrow, not just today. Whether you have 10 users or 100,000, the product we build will handle it without a costly rewrite.',
  },
  {
    title: 'Continuous Improvement',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    description: 'We ship, learn, and iterate. A launch is not the end — it\'s the beginning. We stay invested in the products we build and celebrate every improvement.',
  },
];

/* ─── Values ─── */
export function AboutValues() {
  return (
    <section className="section bg-white">
      <div className="container">
        <FadeIn>
          <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
            What we stand for.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-500">
            These aren&apos;t words on a wall — they&apos;re how we make decisions, write code, and talk to clients every single day.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.07}>
              <div className={`h-full rounded-2xl border border-[#E2E5F1] bg-white p-7 transition duration-300 hover:border-[#0051FF]/30 hover:shadow-lg hover:shadow-[#0051FF]/8 ${i === 0 ? 'lg:col-span-1' : ''}`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#0051FF]">
                  {v.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">{v.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{v.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Team ─── */
export function AboutTeam({ members }: { members: TeamMember[] }) {
  const avatarGradients = [
    'bg-gradient-to-br from-[#0051FF] to-[#0070F3]',
    'bg-gradient-to-br from-[#0070F3] to-[#00D2FF]',
    'bg-gradient-to-br from-[#f43f5e] to-[#fb7185]',
    'bg-gradient-to-br from-[#00D2FF] to-[#0051FF]',
  ];

  return (
    <section className="section bg-[#EEF0FF]">
      <div className="container">
        <FadeIn>
          <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
            The people building your product.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-500">
            Small on purpose. Every project gets our full attention — not a junior team with senior oversight.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {members.map((m, i) => (
            <FadeIn key={m._id} delay={i * 0.1}>
              <div className="group flex h-full flex-col rounded-3xl border border-[#E2E5F1] bg-white p-8 transition duration-300 hover:border-[#0051FF]/20 hover:shadow-xl hover:shadow-[#0051FF]/8">
                <div className="flex items-start gap-5">
                  {/* Avatar */}
                  <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold text-white ${avatarGradients[i] ?? avatarGradients[0]}`}>
                    {m.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="text-xl font-bold text-slate-900">{m.name}</div>
                    <div className="mt-0.5 text-sm font-semibold text-[#0051FF]">{m.role}</div>
                    {m.tagline && <p className="mt-1 text-xs italic text-slate-400">{m.tagline}</p>}
                  </div>
                </div>

                {m.bio && (
                  <p className="mt-5 flex-1 text-sm leading-7 text-slate-500">{m.bio}</p>
                )}

                {m.skills && m.skills.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {m.skills.map((s) => (
                      <span key={s} className="rounded-lg border border-[#E2E5F1] bg-[#EEF0FF] px-3 py-1 text-xs font-semibold text-slate-600">
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {/* Social links */}
                <div className="mt-5 flex gap-3 border-t border-[#E2E5F1] pt-5">
                  {m.github && m.github !== '#' && (
                    <a href={m.github} target="_blank" rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E5F1] text-slate-400 transition hover:border-[#0051FF]/30 hover:text-[#0051FF]">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>
                  )}
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E5F1] text-slate-400 transition hover:border-[#0051FF]/30 hover:text-[#0051FF]">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  {(m as TeamMember & { instagram?: string }).instagram && (m as TeamMember & { instagram?: string }).instagram !== '#' && (
                    <a href={(m as TeamMember & { instagram?: string }).instagram} target="_blank" rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E5F1] text-slate-400 transition hover:border-pink-400/40 hover:text-pink-500">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <radialGradient id="ig-gradient" cx="30%" cy="107%" r="150%">
                              <stop offset="0%" stopColor="#fdf497" />
                              <stop offset="5%" stopColor="#fdf497" />
                              <stop offset="45%" stopColor="#fd5949" />
                              <stop offset="60%" stopColor="#d6249f" />
                              <stop offset="90%" stopColor="#285AEB" />
                            </radialGradient>
                          </defs>
                          <path fill="url(#ig-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                    </a>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
