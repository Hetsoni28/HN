import { FadeIn } from '@/components/atoms/fade-in';

const industries = [
  {
    label: 'FinTech',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="14" height="9" rx="1.5" />
        <path d="M1 7h14" />
        <path d="M5 11h2" />
        <path d="M9 11h2" />
      </svg>
    ),
  },
  {
    label: 'HealthTech',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2v12M2 8h12" />
        <rect x="1" y="1" width="14" height="14" rx="2" />
      </svg>
    ),
  },
  {
    label: 'SaaS Platforms',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="14" height="10" rx="1.5" />
        <path d="M5 13v2M11 13v2M3 15h10" />
        <path d="M5 7h6M5 9.5h4" />
      </svg>
    ),
  },
  {
    label: 'E-Commerce',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 2h2l1.5 6.5h6.5l1-4H5" />
        <circle cx="7" cy="13" r="1" />
        <circle cx="12" cy="13" r="1" />
      </svg>
    ),
  },
  {
    label: 'Real Estate',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 14h14" />
        <path d="M3 14V7.5L8 3l5 4.5V14" />
        <rect x="6" y="10" width="4" height="4" />
      </svg>
    ),
  },
  {
    label: 'EdTech',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2L1 6l7 4 7-4-7-4z" />
        <path d="M4 8.5v4c0 1 1.8 1.5 4 1.5s4-.5 4-1.5v-4" />
        <path d="M14 6v4" />
      </svg>
    ),
  },
  {
    label: 'Web Applications',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="2" width="14" height="12" rx="1.5" />
        <path d="M1 5h14" />
        <circle cx="3.5" cy="3.5" r="0.5" fill="currentColor" />
        <circle cx="5.5" cy="3.5" r="0.5" fill="currentColor" />
        <path d="M5 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: 'Mobile Apps',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="1" width="8" height="14" rx="1.5" />
        <path d="M7 12h2" />
        <path d="M6 4h4" />
      </svg>
    ),
  },
  {
    label: 'AI & LLMs',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 2L4 11h7l-2 7 9-10h-7l2-6z" />
      </svg>
    ),
  },
  {
    label: 'API Platforms',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 8h12M10 5l3 3-3 3M6 5L3 8l3 3" />
      </svg>
    ),
  },
  {
    label: 'Blockchain',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="5" width="4" height="4" rx="0.5" />
        <rect x="6" y="2" width="4" height="4" rx="0.5" />
        <rect x="6" y="9" width="4" height="4" rx="0.5" />
        <rect x="11" y="5" width="4" height="4" rx="0.5" />
        <path d="M5 7h1M10 4v1M10 11v1M10 7h1" />
      </svg>
    ),
  },
  {
    label: 'CRM Systems',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="5" r="3" />
        <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" />
      </svg>
    ),
  },
  {
    label: 'Analytics',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 13L6 8l3 3 5-7" />
        <path d="M2 15h12" />
      </svg>
    ),
  },
];

// Duplicate for seamless infinite loop
const doubled = [...industries, ...industries];

export function TrustBar() {
  return (
    <section className="bg-white border-b border-gray-100 py-10 overflow-hidden">
      <FadeIn>
        <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold text-center mb-8">
          Trusted across industries
        </p>
      </FadeIn>

      {/* Scrolling marquee row */}
      <div className="relative flex w-full overflow-hidden">
        {/* Left fade edge */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
        {/* Right fade edge */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

        <div className="flex w-fit min-w-full shrink-0 animate-marquee items-center gap-4">
          {doubled.map(({ label, icon }, i) => (
            <span
              key={i}
              className="inline-flex shrink-0 items-center gap-2 border border-gray-200 bg-gray-50 rounded-full px-4 py-2 text-sm font-medium text-gray-600"
            >
              {icon}
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
