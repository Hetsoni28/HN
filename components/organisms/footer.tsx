import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { getLiveProjects } from '@/lib/live-projects';

/* ── Link columns ── */
const SERVICES = [
  { href: '/services/websites',            label: 'Website Development' },
  { href: '/services/web-applications',    label: 'Web Applications' },
  { href: '/services/mobile-applications', label: 'Mobile Apps' },
  { href: '/services/ai-solutions',        label: 'AI Solutions' },
  { href: '/services/saas-platforms',      label: 'SaaS Platforms' },
  { href: '/services/e-commerce',          label: 'E-Commerce' },
  { href: '/services/custom-software',     label: 'Custom Software' },
  { href: '/services/ui-ux-design',        label: 'UI/UX Design' },
];

const COMPANY = [
  { href: '/about',    label: 'About Us' },
  { href: '/process',  label: 'Our Process' },
  { href: '/work',     label: 'Our Work' },
  { href: '/compare',  label: 'HN vs Others' },
  { href: '/insights', label: 'Insights' },
  { href: '/showreel', label: 'Showreel' },
  { href: '/contact',  label: 'Contact' },
];

const RESOURCES = [
  { href: '/estimate',    label: 'Cost Estimator' },
  { href: '/website-cost-india', label: 'Website Cost Guide' },
  { href: '/brief',       label: 'Brief Generator' },
  { href: '/maintenance', label: 'Maintenance Plans' },
  { href: '/start',       label: 'Getting Started' },
  { href: '/referral',    label: 'Refer & Earn 10%' },
];

const LEGAL = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms',          label: 'Terms of Service' },
  { href: '/cookie-policy',  label: 'Cookie Policy' },
];

/* Public contacts: Het Soni and Neel Patel only (see AGENTS.md). */
const CONTACTS = [
  { label: 'contact.hntech.in@gmail.com', href: 'mailto:contact.hntech.in@gmail.com', icon: Mail },
  { label: 'Het Soni · +91 72020 31164',    href: 'tel:+917202031164',                    icon: Phone },
  { label: 'Neel Patel · +91 79907 43263',  href: 'tel:+917990743263',                    icon: Phone },
];

const SOCIAL_ITEMS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Hetsoni28',
    icon: (
      <svg className="h-[22px] w-[22px] fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hntech-in-9b3905279?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    icon: (
      <svg className="h-[22px] w-[22px] fill-current" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.999 23.227 23.999 22.271V1.729C23.999.774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/917202031164',
    icon: (
      <svg className="h-[22px] w-[22px] fill-current" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.14 1.54 5.877L.057 23.428a.75.75 0 00.916.916l5.55-1.483A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.67-.524-5.18-1.435l-.371-.22-3.844 1.027 1.027-3.844-.22-.371A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/___hn.in?stkn=ZWdpcHNscHd5eTVt',
    icon: (
      <svg className="h-[22px] w-[22px] fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@hntech-w1v',
    icon: (
      <svg className="h-[22px] w-[22px] fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/19W4Kwh6ia/?mibextid=wwXIfr',
    icon: (
      <svg className="h-[22px] w-[22px] fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

const linkCls = 'text-sm text-slate-600 transition-colors hover:text-[#0041CC]';
const headingCls = 'text-xs font-bold uppercase tracking-[0.18em] text-slate-900';

function Column({ heading, links }: { heading: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className={headingCls}>{heading}</h3>
      <ul className="mt-5 space-y-3">
        {links.map(({ href, label }) => (
          <li key={href}><Link href={href} className={linkCls}>{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export async function Footer() {
  const year = new Date().getFullYear();
  // Recent live client websites from Sanity; the column hides if the CMS is unreachable.
  const work = await getLiveProjects().catch(() => []);

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white text-slate-900">
      <div className="container relative">

        {/* ── CTA card ── */}
        <div className="relative -mb-px pt-16 md:pt-20">
          <div className="flex flex-col gap-8 overflow-hidden rounded-3xl bg-[#EEF0FF] p-8 sm:p-10 md:flex-row md:items-center md:justify-between md:p-12">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0041CC]">Ready to build?</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Let&apos;s turn your idea into a product.</h2>
              <p className="mt-3 text-base text-slate-600">
                Tell us what you&apos;re building. You&apos;ll get a clear plan and a free proposal within 48 hours.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0051FF] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0051FF]/20 transition hover:bg-[#0041CC]"
              >
                Get a Free Proposal <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="/estimate"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-900 transition hover:border-[#0051FF] hover:text-[#0041CC]"
              >
                Estimate Cost
              </Link>
            </div>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.1fr] lg:gap-10">

          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="HN Tech home" className="inline-flex items-center gap-3">
              <Image src="/hn-logo.svg" alt="" width={830} height={735} className="h-11 w-auto" unoptimized />
              <span className="leading-none">
                <span className="block text-lg font-black tracking-tight">HN Tech</span>
                <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Web · App · AI</span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-600">
              A senior-engineer-led web and app development company in India. We design and build websites, web apps,
              SaaS platforms, mobile apps and AI solutions for growing businesses.
            </p>

            <ul className="mt-7 space-y-3">
              {CONTACTS.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <a href={href} className="group inline-flex items-center gap-3 text-sm text-slate-700 transition hover:text-[#0041CC]">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-900 transition group-hover:border-[#0051FF] group-hover:bg-[#0051FF] group-hover:text-white">
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
              <li className="inline-flex items-center gap-3 text-sm text-slate-700">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-900"><MapPin aria-hidden="true" className="h-4 w-4" /></span>
                Gujarat, India · Clients worldwide
              </li>
            </ul>

            <ul className="mt-7 flex flex-wrap gap-2" aria-label="HN Tech on social media">
              {SOCIAL_ITEMS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    title={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition hover:-translate-y-0.5 hover:border-[#0051FF] hover:bg-[#0051FF] hover:text-white [&_svg]:h-4 [&_svg]:w-4"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Column heading="Services" links={SERVICES} />
          <Column heading="Company" links={COMPANY} />
          <Column heading="Resources" links={RESOURCES} />

          {/* Recent work (Sanity) */}
          {work.length > 0 && (
            <div>
              <h3 className={headingCls}>Recent Work</h3>
              <ul className="mt-5 space-y-3">
                {work.slice(0, 7).map((p) => (
                  <li key={p.url}>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className={`group inline-flex items-center gap-1 ${linkCls}`}>
                      {p.name}
                      <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
                <li>
                  <Link href="/work" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0041CC] hover:text-[#0051FF]">
                    View all work <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col gap-4 border-t border-slate-200 py-7 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {year} HN Tech. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL.map(({ href, label }) => (
              <li key={href}><Link href={href} className="transition-colors hover:text-[#0041CC]">{label}</Link></li>
            ))}
          </ul>
          <p>Made with care in India</p>
        </div>
      </div>
    </footer>
  );
}
