'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/atoms/logo';
import { Button } from '@/components/atoms/button';
import { AvailabilityBadge } from '@/components/atoms/availability-badge';

/* ─────────────────────────── Data ─────────────────────────── */

const SERVICES_MENU = [
  {
    label: 'Websites',
    href: '/services/websites',
    desc: 'Fast, beautiful marketing & business sites',
  },
  {
    label: 'Web Applications',
    href: '/services/web-applications',
    desc: 'Custom dashboards, portals & platforms',
  },
  {
    label: 'Mobile Apps',
    href: '/services/mobile-applications',
    desc: 'iOS & Android apps built with React Native',
  },
  {
    label: 'AI Solutions',
    href: '/services/ai-solutions',
    desc: 'AI-powered tools, chatbots & automation',
  },
  {
    label: 'SaaS Platforms',
    href: '/services/saas-platforms',
    desc: 'Scalable multi-tenant SaaS products',
  },
  {
    label: 'E-Commerce',
    href: '/services/e-commerce',
    desc: 'Conversion-optimised online stores',
  },
  {
    label: 'Maintenance Plans',
    href: '/maintenance',
    desc: 'Ongoing support, updates & monitoring',
  },
];

const COMPANY_MENU = [
  { label: 'About Us',       href: '/about',   desc: 'Who we are and how we work' },
  { label: 'Our Process',    href: '/process',  desc: 'From discovery to delivery' },
  { label: 'Portfolio',      href: '/work',     desc: 'Case studies of our best work' },
  { label: 'Insights / Blog',href: '/insights', desc: 'Articles on web, SaaS & AI' },
  { label: 'Showreel',       href: '/showreel', desc: '40-second cinematic overview' },
  { label: 'HN vs Others',   href: '/compare',  desc: 'Why choose HN over alternatives' },
];

const TOP_LINKS = [
  { label: 'Process',   href: '/process' },
  { label: 'Estimator', href: '/estimate' },
  { label: 'Insights',  href: '/insights' },
  { label: 'Contact',   href: '/contact' },
];

/* ─────────────────────────── Sub-components ─────────────────────────── */

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

interface DropdownItem { label: string; href: string; desc: string; }

function MegaDropdown({ items, onClose }: { items: DropdownItem[]; onClose: () => void }) {
  return (
    <div className="absolute left-0 top-full z-50 mt-2 w-[520px] rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xl shadow-slate-200/60 ring-1 ring-black/5">
      <div className="grid grid-cols-2 gap-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="group flex flex-col gap-0.5 rounded-xl px-4 py-3 transition hover:bg-[#EEF0FF]"
          >
            <span className="text-sm font-semibold text-slate-900 transition group-hover:text-[#0051FF]">
              {item.label}
            </span>
            <span className="text-xs leading-relaxed text-slate-400">{item.desc}</span>
          </Link>
        ))}
      </div>
      {/* Footer strip */}
      <div className="mt-2 flex items-center justify-between rounded-xl bg-[#0051FF] px-4 py-2.5">
        <span className="text-xs font-semibold text-white/80">
          Not sure what you need?
        </span>
        <Link
          href="/estimate"
          onClick={onClose}
          className="text-xs font-bold text-white underline-offset-2 hover:underline"
        >
          Use the estimator →
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────── Navbar ─────────────────────────── */

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile on route change */
  useEffect(() => { setMobileOpen(false); setActiveDropdown(null); }, [pathname]);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* Escape key */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMobileOpen(false); setActiveDropdown(null); hamburgerRef.current?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const openDropdown = useCallback((name: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setActiveDropdown(name);
  }, []);

  const closeDropdown = useCallback(() => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? 'shadow-md shadow-slate-200/60' : 'border-b border-slate-200/70'
      }`}
      role="banner"
    >
      <div className="container flex h-[68px] items-center justify-between gap-6">

        {/* Logo */}
        <Logo />

        {/* ── Desktop nav ── */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => openDropdown('services')}
            onMouseLeave={closeDropdown}
          >
            <button
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isActive('/services') || activeDropdown === 'services'
                  ? 'bg-[#EEF0FF] text-[#0051FF]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'services'}
            >
              Services
              <ChevronDown open={activeDropdown === 'services'} />
            </button>
            {activeDropdown === 'services' && (
              <MegaDropdown items={SERVICES_MENU} onClose={() => setActiveDropdown(null)} />
            )}
          </div>

          {/* Work link */}
          <Link
            href="/work"
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
              isActive('/work')
                ? 'bg-[#EEF0FF] text-[#0051FF]'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            Work
          </Link>

          {/* Company dropdown */}
          <div
            className="relative"
            onMouseEnter={() => openDropdown('company')}
            onMouseLeave={closeDropdown}
          >
            <button
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                (isActive('/about') || isActive('/process') || isActive('/insights') || isActive('/compare'))
                || activeDropdown === 'company'
                  ? 'bg-[#EEF0FF] text-[#0051FF]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'company'}
            >
              Company
              <ChevronDown open={activeDropdown === 'company'} />
            </button>
            {activeDropdown === 'company' && (
              <MegaDropdown items={COMPANY_MENU} onClose={() => setActiveDropdown(null)} />
            )}
          </div>

          {/* Flat links */}
          {TOP_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isActive(href)
                  ? 'bg-[#EEF0FF] text-[#0051FF]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ── Desktop right actions ── */}
        <div className="hidden items-center gap-3 lg:flex">
          <AvailabilityBadge />

          <Button href="/contact" variant="primary" className="text-sm px-5 py-2.5">
            Start a Project →
          </Button>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          ref={hamburgerRef}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="absolute inset-x-0 top-full z-50 h-[calc(100vh-68px)] overflow-y-auto border-t border-slate-200 bg-white lg:hidden"
        >
          <nav className="container flex flex-col gap-1 py-4" aria-label="Mobile navigation">

            {/* Services section */}
            <p className="px-3 pb-1 pt-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Services
            </p>
            {SERVICES_MENU.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
                  isActive(href) ? 'bg-[#EEF0FF] text-[#0051FF]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Company section */}
            <p className="px-3 pb-1 pt-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Company
            </p>
            {COMPANY_MENU.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
                  isActive(href) ? 'bg-[#EEF0FF] text-[#0051FF]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Flat links */}
            <p className="px-3 pb-1 pt-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              More
            </p>
            {TOP_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
                  isActive(href) ? 'bg-[#EEF0FF] text-[#0051FF]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {label}
              </Link>
            ))}

            {/* CTA */}
            <div className="mt-4 border-t border-slate-100 pt-4">
              <Button
                href="/contact"
                variant="primary"
                className="w-full justify-center"
                onClick={() => setMobileOpen(false)}
              >
                Start a Project →
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
