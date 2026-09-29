import Link from 'next/link';
import { Logo } from '@/components/atoms/logo';

/* ── Nav columns ── */
const NAV = [
  {
    heading: 'Company',
    links: [
      { href: '/about',    label: 'About Us' },
      { href: '/process',  label: 'Our Process' },
      { href: '/compare',  label: 'HN vs Others' },
      { href: '/work',     label: 'Portfolio' },
      { href: '/insights', label: 'Insights' },
      { href: '/contact',  label: 'Contact' },
    ],
  },
  {
    heading: 'Services',
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
  {
    heading: 'Resources',
    links: [
      { href: '/estimate', label: 'Cost Estimator' },
      { href: '/brief',    label: 'Brief Generator' },
      { href: '/start',    label: 'Getting Started' },
      { href: '/referral', label: 'Refer & Earn ₹5,000' },
      { href: '/compare',  label: 'Compare Options' },
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
  {
    label: 'WhatsApp',
    href: 'https://wa.me/917990743263',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.14 1.54 5.877L.057 23.428a.75.75 0 00.916.916l5.55-1.483A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.67-.524-5.18-1.435l-.371-.22-3.844 1.027 1.027-3.844-.22-.371A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
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
  { value: '40+', label: 'Projects Shipped' },
  { value: '5★',  label: 'Client Rating' },
  { value: '48h', label: 'Avg Response' },
  { value: '₹0',  label: 'Hidden Fees' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B111E] text-white">

      {/* ── Pre-footer CTA strip ── */}
      <div className="border-b border-white/[0.06]">
        <div className="container flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#0051FF]">
              Ready to build?
            </p>
            <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">
              Start your project today.
            </p>
            <p className="mt-2 text-sm text-white/40">
              From idea to launch in as little as 4 weeks.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#0051FF] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0040CC] sm:px-7 sm:py-3.5"
            >
              Get a Free Proposal
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </Link>
            <Link
              href="/estimate"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-white/70 transition hover:border-white/20 hover:text-white sm:px-7 sm:py-3.5"
            >
              Estimate Cost
            </Link>
          </div>
        </div>
      </div>

      {/* ── Trust stats bar ── */}
      <div className="border-b border-white/[0.06]">
        <div className="container grid grid-cols-2 divide-x divide-white/[0.06] md:grid-cols-4">
          {TRUST_STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5 py-5">
              <span className="text-2xl font-black text-white">{s.value}</span>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-white/30">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="container py-14 md:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr_1fr] lg:gap-8">

          {/* Brand column */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/40">
              A senior-engineer-led digital product studio. We build websites, web apps, SaaS platforms, mobile apps, and AI solutions for ambitious founders and businesses.
            </p>

            {/* Contact */}
            <div className="mt-7 space-y-3">
              <a
                href="mailto:contact.hnsolutions@gmail.com"
                className="group flex items-center gap-2.5 text-sm text-white/40 transition hover:text-white"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/5 transition group-hover:border-[#0051FF]/40 group-hover:bg-[#0051FF]/10">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                contact.hnsolutions@gmail.com
              </a>
              <a
                href="https://wa.me/917990743263"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 text-sm text-white/40 transition hover:text-white"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/5 transition group-hover:border-[#0051FF]/40 group-hover:bg-[#0051FF]/10">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                +91 7990 743263
              </a>
              <div className="flex items-center gap-2.5 text-sm text-white/30">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/5">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </span>
                India · Available worldwide
              </div>
            </div>

            {/* Socials */}
            <div className="mt-7 flex gap-2.5">
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
              <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-white/30">
                {col.heading}
              </h3>
              <nav className="flex flex-col gap-3">
                {col.links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group flex items-center gap-1.5 text-sm text-white/45 transition hover:text-white"
                  >
                    <span className="h-px w-0 bg-[#0051FF] transition-all group-hover:w-3" />
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.06]">
        <div className="container flex flex-col items-start justify-between gap-4 py-5 text-xs text-white/25 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            {/* Mini availability indicator */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Taking new projects
            </span>
            <span>© {year} HN. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap gap-5">
            {LEGAL.map(({ href, label }) => (
              <Link key={href} href={href} className="transition hover:text-white/60">
                {label}
              </Link>
            ))}
          </div>

          <span className="hidden md:block">
            Crafted with care by{' '}
            <span className="font-semibold text-white/50">HN</span>
          </span>
        </div>
      </div>

    </footer>
  );
}
