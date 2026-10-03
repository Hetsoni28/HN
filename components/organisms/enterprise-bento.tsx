import Link from 'next/link';
import { FadeIn } from '@/components/atoms/fade-in';

const bentoCards = [
  {
    color: 'text-emerald-400',
    title: 'Security First',
    desc: 'Bank-grade security, zero-trust architecture, end-to-end encryption built in.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2L3 5v5c0 4.418 3.134 8.556 7 9.95C13.866 18.556 17 14.418 17 10V5L10 2z" />
        <path d="M7 10l2 2 4-4" />
      </svg>
    ),
  },
  {
    color: 'text-blue-400',
    title: 'Infinite Scale',
    desc: 'Auto-scaling AWS and Vercel infrastructure. Built for 10 to 10 million users.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 13a4.5 4.5 0 00-4.5-4.5 4.5 4.5 0 00-9 0A3.5 3.5 0 003.5 15H16a2.5 2.5 0 00.5-5z" />
      </svg>
    ),
  },
  {
    color: 'text-purple-400',
    title: 'AI Powered',
    desc: 'Custom LLM integrations, intelligent automation, and real-time data pipelines.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 2L4 11h7l-2 7 9-10h-7l2-6z" />
      </svg>
    ),
  },
  {
    color: 'text-orange-400',
    title: 'Zero Tech Debt',
    desc: 'Strictly typed, fully documented code your internal team can inherit.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

export function EnterpriseBento() {
  return (
    <section className="bg-[#0B111E] py-24 sm:py-32">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <FadeIn>
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Built for scale.<br />
              Engineered for trust.
            </h2>
            <p className="text-gray-400 mt-6 text-lg">
              We deliver enterprise-grade platforms that handle millions of users, protect sensitive data, and drive measurable business results.
            </p>
            <Link
              href="/work"
              className="mt-8 inline-flex items-center gap-2 text-[#0051FF] font-semibold hover:gap-3 transition-all"
            >
              View our work →
            </Link>
          </FadeIn>

          {/* Right — 2x2 bento grid */}
          <FadeIn delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {bentoCards.map(({ color, title, desc, icon }) => (
                <div
                  key={title}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
                >
                  <div className={`inline-flex rounded-lg p-2 bg-white/10 ${color}`}>
                    {icon}
                  </div>
                  <div className="font-semibold text-white mt-4 mb-2">{title}</div>
                  <div className="text-sm text-gray-400">{desc}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
