import Link from 'next/link';
import { Logo } from '@/components/atoms/logo';

/* ── Nav columns ── */
const NAV = [
  {
    heading: 'Company',
    links: [
      { href: '/about',    label: 'About Us' },
      { href: '/process',  label: 'Our Process' },
      { href: '/estimate', label: 'Estimator' },
      { href: '/brief',    label: 'Brief Generator' },
      { href: '/work',     label: 'Portfolio' },
      { href: '/insights', label: 'Insights' },
      { href: '/contact',  label: 'Contact' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { href: '/services/websites',           label: 'Websites' },
      { href: '/services/web-applications',   label: 'Web Applications' },
      { href: '/services/mobile-applications',label: 'Mobile Apps' },
      { href: '/services/ai-solutions',       label: 'AI Solutions' },
      { href: '/services/saas-platforms',     label: 'SaaS Platforms' },
      { href: '/services/e-commerce',         label: 'E-Commerce' },
    ],
  },
  {
    heading: 'Work',
    links: [
      { href: '/work/data-insight',    label: 'Data Insight' },
      { href: '/work/smartdrive-x',    label: 'SmartDrive X' },
      { href: '/work/medimind-ai',     label: 'MediMind AI' },
      { href: '/work/nexus-ecommerce', label: 'Nexus E-Commerce' },
      { href: '/work/financeflow',     label: 'FinanceFlow' },
      { href: '/work/fittrack-pro',    label: 'FitTrack Pro' },
    ],
  },
];

const SOCIAL = [
  {
    label: 'GitHub',
    href: 'https://github.com/Hetsoni28',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/hetsoni',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.999 23.227 23.999 22.271V1.729C23.999.774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/hetsoni',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const LEGAL = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms',          label: 'Terms of Service' },
  { href: '/cookie-policy',  label: 'Cookie Policy' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B111E] text-white">

      {/* ── Pre-footer CTA strip ── */}
      <div className="border-b border-white/8">
        <div className="container flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30">
              Ready to build?
            </p>
            <p className="mt-1 text-xl font-bold text-white sm:text-2xl">
              Start your project today.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#0051FF] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0040CC] sm:px-7 sm:py-3.5"
          >
            Get a Free Proposal
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="container py-12 md:py-16">
        {/* Mobile: single col → sm: 2-col → lg: 4-col */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12">

          {/* Brand column */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/40">
              A two-person digital product studio building websites, web apps, SaaS platforms, mobile apps, and AI solutions for ambitious businesses.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-2">
              <a href="mailto:contact.hnsolutions@gmail.com"
                className="flex items-center gap-2.5 text-sm text-white/40 transition hover:text-white">
                <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                contact.hnsolutions@gmail.com
              </a>
              <a href="tel:+917202031164"
                className="flex items-center gap-2.5 text-sm text-white/40 transition hover:text-white">
                <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                +91 7202 031164
              </a>
              <a href="tel:+917990743263"
                className="flex items-center gap-2.5 text-sm text-white/40 transition hover:text-white">
                <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                +91 7990 743263
              </a>
              <div className="flex items-center gap-2.5 text-sm text-white/40">
                <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                India · Available worldwide
              </div>
            </div>

            {/* Socials */}
            <div className="mt-7 flex gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/40 transition hover:border-[#0051FF]/60 hover:bg-[#0051FF]/10 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-white/30">
                {col.heading}
              </h3>
              <nav className="flex flex-col gap-3">
                {col.links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-sm text-white/50 transition hover:text-white"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/8">
        <div className="container flex flex-col items-start justify-between gap-3 py-5 text-xs text-white/25 md:flex-row md:items-center">
          <span>© {year} HN Digital Product Studio. All rights reserved.</span>

          <div className="flex flex-wrap gap-5">
            {LEGAL.map(({ href, label }) => (
              <Link key={href} href={href} className="transition hover:text-white/60">
                {label}
              </Link>
            ))}
          </div>

          <span className="hidden md:block">
            Designed & built by{' '}
            <span className="text-white/40 font-semibold">HN</span>
          </span>
        </div>
      </div>

    </footer>
  );
}
