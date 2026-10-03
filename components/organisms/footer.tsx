import Link from 'next/link';
import { Logo } from '@/components/atoms/logo';

/* ── Nav columns ── */
const NAV = [
  {
    heading: 'COMPANY',
    links: [
      { href: '/about',    label: 'About Us' },
      { href: '/process',  label: 'Our Process' },
      { href: '/compare',  label: 'HN vs Others' },
      { href: '/work',     label: 'Portfolio' },
      { href: '/insights', label: 'Insights' },
      { href: '/showreel', label: 'Showreel' },
      { href: '/contact',  label: 'Contact' },
    ],
  },
  {
    heading: 'SERVICES',
    links: [
      { href: '/services/websites',            label: 'Websites' },
      { href: '/services/web-applications',    label: 'Web Applications' },
      { href: '/services/mobile-applications', label: 'Mobile Apps' },
      { href: '/services/ai-solutions',        label: 'AI Solutions' },
      { href: '/services/saas-platforms',      label: 'SaaS Platforms' },
      { href: '/services/e-commerce',          label: 'E-Commerce' },
      { href: '/maintenance',                  label: 'Maintenance Plans' },
    ],
  },
  {
    heading: 'WORK',
    links: [
      { href: '/work/data-insight',    label: 'Data Insight' },
      { href: '/work/smartdrive-x',    label: 'SmartDrive X' },
      { href: '/work/medimind-ai',     label: 'MediMind AI' },
      { href: '/work/nexus-ecommerce', label: 'Nexus E-Commerce' },
      { href: '/work/financeflow',     label: 'FinanceFlow' },
      { href: '/work/fittrack-pro',    label: 'FitTrack Pro' },
    ],
  },
  {
    heading: 'RESOURCES',
    links: [
      { href: '/estimate', label: 'Cost Estimator' },
      { href: '/brief',    label: 'Brief Generator' },
      { href: '/start',    label: 'Getting Started' },
      { href: '/referral', label: 'Refer & Earn 10%' },
      { href: '/compare',  label: 'Compare Options' },
    ],
  },
];

const SOCIAL_ITEMS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Hetsoni28',
    hoverBg: 'hover:bg-[#181717] focus:bg-[#181717]',
    hoverGlow: 'hover:shadow-[0_12px_28px_rgba(0,0,0,0.6)] focus:shadow-[0_12px_28px_rgba(0,0,0,0.6)]',
    icon: (
      <svg className="h-[22px] w-[22px] fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hn-in-b66003440',
    hoverBg: 'hover:bg-[#0A66C2] focus:bg-[#0A66C2]',
    hoverGlow: 'hover:shadow-[0_12px_28px_rgba(10,102,194,0.6)] focus:shadow-[0_12px_28px_rgba(10,102,194,0.6)]',
    icon: (
      <svg className="h-[22px] w-[22px] fill-current" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.999 23.227 23.999 22.271V1.729C23.999.774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/917990743263',
    hoverBg: 'hover:bg-[#25D366] focus:bg-[#25D366]',
    hoverGlow: 'hover:shadow-[0_12px_28px_rgba(37,211,102,0.6)] focus:shadow-[0_12px_28px_rgba(37,211,102,0.6)]',
    icon: (
      <svg className="h-[22px] w-[22px] fill-current" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.14 1.54 5.877L.057 23.428a.75.75 0 00.916.916l5.55-1.483A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.67-.524-5.18-1.435l-.371-.22-3.844 1.027 1.027-3.844-.22-.371A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/___hn.in?stkn=ZWdpcHNscHd5eTVt',
    hoverBg: 'hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] focus:bg-gradient-to-tr focus:from-[#f09433] focus:via-[#dc2743] focus:to-[#bc1888]',
    hoverGlow: 'hover:shadow-[0_12px_28px_rgba(220,39,67,0.6)] focus:shadow-[0_12px_28px_rgba(220,39,67,0.6)]',
    icon: (
      <svg className="h-[22px] w-[22px] fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

const LEGAL = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms',          label: 'Terms of Service' },
  { href: '/cookie-policy',  label: 'Cookie Policy' },
];

const TRUST_STATS = [
  { value: '15+', label: 'PROJECTS SHIPPED' },
  { value: '48h', label: 'AVG RESPONSE' },
  { value: '₹0',  label: 'HIDDEN FEES' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-white text-slate-900 selection:bg-[#0051FF] selection:text-slate-900">

      

      <div className="relative z-10">

        {/* ── Pre-footer CTA strip ── */}
        <div className="border-b border-slate-200">
          <div className="container flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
            <div>
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#0051FF]">
                READY TO BUILD?
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
                Start your project{' '}
                <span className="text-[#0051FF]">
                  today.
                </span>
              </h2>
              <p className="mt-2 text-sm font-medium text-slate-500">
                From idea to launch in as little as 4 weeks.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#0051FF] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:bg-blue-600 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-reduce:transition-none motion-reduce:transform-none"
                
              >
                <span className="text-white" >
                  Get a Free Proposal
                </span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>
              <Link
                href="/estimate"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white backdrop-blur-md px-7 py-3.5 text-sm font-semibold text-slate-900 transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-reduce:transition-none motion-reduce:transform-none"
              >
                Estimate Cost
              </Link>
            </div>
          </div>
        </div>

        {/* ── Trust stats bar ── */}
        <div className="border-b border-slate-200 bg-white backdrop-blur-sm">
          <div className="container grid grid-cols-3 divide-x divide-slate-200">
            {TRUST_STATS.map((s) => (
              <div key={s.label} className="group flex flex-col items-center gap-1 py-6 text-center cursor-default">
                <span className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl transition-colors duration-300 group-hover:text-[#0051FF]">
                  {s.value}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 transition-colors duration-300 group-hover:text-slate-900 sm:text-xs">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Main footer grid ── */}
        <div className="container py-14 md:py-20">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr_1fr] lg:gap-8">

            {/* Brand column */}
            <div>
              <div className="group/brand inline-block">
                <Logo />
              </div>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-500">
                A senior-engineer-led digital product studio. We build websites, web apps, SaaS platforms, mobile apps, and AI solutions for ambitious founders and businesses.
              </p>

              {/* Contact */}
              <div className="mt-7 space-y-3.5">
                <a
                  href="mailto:contact.hnsolutions@gmail.com"
                  className="group flex items-center gap-3 text-sm font-medium text-slate-500 transition-colors duration-300 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-lg p-0.5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-900 border border-slate-200 transition-all duration-300 group-hover:bg-slate-200 group-hover:border-slate-300 group-hover:scale-105 motion-reduce:transform-none">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <span className="relative overflow-hidden py-0.5">
                    contact.hnsolutions@gmail.com
                    <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[#0051FF] transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
                  </span>
                </a>

                <a
                  href="https://wa.me/917990743263"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm font-medium text-slate-500 transition-colors duration-300 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-lg p-0.5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-900 border border-slate-200 transition-all duration-300 group-hover:bg-slate-200 group-hover:border-slate-300 group-hover:scale-105 motion-reduce:transform-none">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </span>
                  <span className="relative overflow-hidden py-0.5">
                    +91 79907 43263
                    <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[#0051FF] transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
                  </span>
                </a>

                <a
                  href="tel:+917202031164"
                  className="group flex items-center gap-3 text-sm font-medium text-slate-500 transition-colors duration-300 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-lg p-0.5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-900 border border-slate-200 transition-all duration-300 group-hover:bg-slate-200 group-hover:border-slate-300 group-hover:scale-105 motion-reduce:transform-none">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </span>
                  <span className="relative overflow-hidden py-0.5">
                    +91 72020 31164
                    <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[#0051FF] transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
                  </span>
                </a>

                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-900 border border-slate-200">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </span>
                  India · Available worldwide
                </div>
              </div>

              {/* ── Social Icons ── */}
              <div className="mt-8 flex items-center gap-3">
                {SOCIAL_ITEMS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 transition-all duration-200 hover:text-white hover:-translate-y-0.5 hover:scale-105 hover:border-transparent active:scale-95 ${s.hoverBg}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav columns */}
            {NAV.map((col) => (
              <div key={col.heading} className="group/col">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-900 transition-all duration-300 group-hover/col:tracking-[0.24em]">
                  {col.heading}
                </h3>
                <div className="mb-5 h-[2px] w-6 bg-[#0051FF] rounded-full transition-all duration-300 group-hover/col:w-10" />
                <nav className="group/list flex flex-col gap-3">
                  {col.links.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="group relative inline-flex items-center text-sm font-medium text-slate-500 transition-all duration-300 hover:translate-x-1 hover:text-slate-900 group-hover/list:opacity-70 hover:!opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded motion-reduce:transition-none motion-reduce:transform-none"
                    >
                      <span className="relative py-0.5">
                        {label}
                        <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[#0051FF] transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-slate-200 bg-slate-50">
          <div className="container flex flex-col items-start justify-between gap-4 py-6 text-xs text-slate-600 sm:flex-row sm:items-center">
            <span>© {year} HN. All rights reserved.</span>

            <div className="flex flex-wrap gap-5">
              {LEGAL.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="group relative text-slate-600 transition-colors duration-300 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded"
                >
                  <span className="relative py-0.5">
                    {label}
                    <span className="absolute bottom-0 left-0 h-[1px] w-full origin-center scale-x-0 bg-[#0051FF] transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
                  </span>
                </Link>
              ))}
            </div>

            <span className="hidden md:block font-medium text-slate-600">
              Crafted with care by{' '}
              <span className="font-bold text-slate-900 transition-colors duration-300 hover:text-[#0051FF]">
                HN
              </span>
            </span>
          </div>
        </div>

      </div>

    </footer>
  );
}
