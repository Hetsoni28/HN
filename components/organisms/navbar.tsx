'use client';

import { useState, useEffect, useRef, useCallback, useId } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, AppWindow, Smartphone, BrainCircuit, Cloud, ShoppingCart, Code2, Palette,
  Users, Workflow, Scale, Briefcase, Newspaper, Film, Calculator, FileText, Gift, Wrench,
  ChevronDown, ArrowRight, ArrowUpRight, Phone, Mail, Clock, type LucideIcon,
} from 'lucide-react';
import { Logo } from '@/components/atoms/logo';

/* ─────────────────────────── Data ─────────────────────────── */

type MenuItem = { label: string; href: string; desc: string; icon: LucideIcon };

const SERVICES_MENU: MenuItem[] = [
  { label: 'Website Development', href: '/services/websites',            desc: 'Fast, SEO-ready business websites',        icon: Globe },
  { label: 'Web Applications',    href: '/services/web-applications',    desc: 'Portals, dashboards and internal tools',   icon: AppWindow },
  { label: 'Mobile Apps',         href: '/services/mobile-applications', desc: 'iOS and Android with React Native',        icon: Smartphone },
  { label: 'AI Solutions',        href: '/services/ai-solutions',        desc: 'Chatbots, LLM features and automation',    icon: BrainCircuit },
  { label: 'SaaS Platforms',      href: '/services/saas-platforms',      desc: 'Multi-tenant products, built to scale',    icon: Cloud },
  { label: 'E-Commerce',          href: '/services/e-commerce',          desc: 'Online stores with secure checkout',       icon: ShoppingCart },
  { label: 'Custom Software',     href: '/services/custom-software',     desc: 'CRM, ERP and workflow systems',            icon: Code2 },
  { label: 'UI/UX Design',        href: '/services/ui-ux-design',        desc: 'Research, prototypes and design systems',  icon: Palette },
];

const COMPANY_MENU: { heading: string; items: MenuItem[] }[] = [
  {
    heading: 'Company',
    items: [
      { label: 'About Us',     href: '/about',    desc: 'The team behind HN Tech',          icon: Users },
      { label: 'Our Process',  href: '/process',  desc: 'How we take ideas to launch',      icon: Workflow },
      { label: 'Our Work',     href: '/work',     desc: 'Live websites and case studies',   icon: Briefcase },
      { label: 'HN vs Others', href: '/compare',  desc: 'Freelancer vs agency vs HN',       icon: Scale },
    ],
  },
  {
    heading: 'Resources',
    items: [
      { label: 'Insights',          href: '/insights',    desc: 'Articles on web, SaaS and AI',   icon: Newspaper },
      { label: 'Cost Estimator',    href: '/estimate',    desc: 'Get an instant budget range',    icon: Calculator },
      { label: 'Brief Generator',   href: '/brief',       desc: 'Turn your idea into a brief',    icon: FileText },
      { label: 'Maintenance Plans', href: '/maintenance', desc: 'Support after launch',           icon: Wrench },
      { label: 'Showreel',          href: '/showreel',    desc: 'Our work in 40 seconds',         icon: Film },
      { label: 'Refer & Earn',      href: '/referral',    desc: 'Earn 10% for every referral',    icon: Gift },
    ],
  },
];

const TOP_LINKS = [
  { label: 'Work',     href: '/work' },
  { label: 'Process',  href: '/process' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact',  href: '/contact' },
];

// Main contact number: Het Soni
const PHONE = { display: '+91 72020 31164', href: 'tel:+917202031164' };
const EMAIL = 'contact.hnsolutions@gmail.com';

type DropdownName = 'services' | 'company';

/* ─────────────────────────── Sub-components ─────────────────────────── */

function MenuLink({ item, onClose, compact = false }: { item: MenuItem; onClose: () => void; compact?: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onClose}
      className="group flex items-start gap-3.5 rounded-xl p-3 transition hover:bg-[#F4F6FF]"
    >
      <span className={`flex shrink-0 items-center justify-center rounded-lg border border-[#E2E5F1] bg-white text-[#0051FF] transition group-hover:border-[#0051FF] group-hover:bg-[#0051FF] group-hover:text-white ${compact ? 'h-9 w-9' : 'h-10 w-10'}`}>
        <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.8} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-slate-900 transition group-hover:text-[#0041CC]">{item.label}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">{item.desc}</span>
      </span>
    </Link>
  );
}

function ServicesPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="grid grid-cols-[1fr_300px] gap-6 p-6">
      <div>
        <p className="px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">What we build</p>
        <div className="mt-2 grid grid-cols-2 gap-1">
          {SERVICES_MENU.map((item) => <MenuLink key={item.href} item={item} onClose={onClose} />)}
        </div>
        <Link
          href="/services"
          onClick={onClose}
          className="mt-3 inline-flex items-center gap-1.5 px-3 text-sm font-semibold text-[#0041CC] hover:gap-2.5 transition-all"
        >
          View all services <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>

      {/* Featured card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0B111E] p-6 text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#0051FF]/40 blur-3xl" />
        <p className="relative text-[11px] font-bold uppercase tracking-[0.18em] text-[#7FA6FF]">Not sure where to start?</p>
        <p className="relative mt-3 text-lg font-bold leading-snug">Get a budget range for your project in 2 minutes.</p>
        <Link
          href="/estimate"
          onClick={onClose}
          className="relative mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-[#0B111E] transition hover:bg-[#EEF0FF]"
        >
          <Calculator aria-hidden="true" className="h-4 w-4" /> Cost estimator
        </Link>
        <Link
          href="/contact"
          onClick={onClose}
          className="relative mt-3 flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-white"
        >
          Or book a free consultation <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
        <p className="relative mt-6 flex items-center gap-2 border-t border-white/15 pt-4 text-xs text-white/70">
          <Clock aria-hidden="true" className="h-3.5 w-3.5" /> We reply within 24–48 hours
        </p>
      </div>
    </div>
  );
}

function CompanyPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="grid grid-cols-[1fr_1.5fr] gap-6 p-6">
      {COMPANY_MENU.map((col) => (
        <div key={col.heading}>
          <p className="px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{col.heading}</p>
          <div className={`mt-2 grid gap-1 ${col.items.length > 4 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {col.items.map((item) => <MenuLink key={item.href} item={item} onClose={onClose} compact />)}
          </div>
        </div>
      ))}
    </div>
  );
}

function MobileSection({ title, items, onClose, isActive }: {
  title: string;
  items: MenuItem[];
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-b border-slate-100">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <span className="text-base font-bold text-slate-900">{title}</span>
        <ChevronDown aria-hidden="true" className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-0.5 px-3 pb-4">
              {items.map(({ label, href, desc, icon: Icon }) => (
                <Link key={href} href={href} onClick={onClose}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${isActive(href) ? 'bg-[#EEF0FF]' : 'hover:bg-slate-50'}`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E2E5F1] bg-white text-[#0051FF]">
                    <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className={`block text-sm font-semibold ${isActive(href) ? 'text-[#0041CC]' : 'text-slate-800'}`}>{label}</span>
                    <span className="block text-xs text-slate-500">{desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────── Navbar ─────────────────────────── */

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownName | null>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);
  const companyBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setActiveDropdown(null);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Escape closes whatever is open and returns focus to the control that opened it
  useEffect(() => {
    if (!mobileOpen && !activeDropdown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (mobileOpen) {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      } else if (activeDropdown) {
        (activeDropdown === 'services' ? servicesBtnRef : companyBtnRef).current?.focus();
        setActiveDropdown(null);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen, activeDropdown]);

  // Mobile menu: move focus into it on open, and keep Tab cycling between the menu and its toggle.
  useEffect(() => {
    if (!mobileOpen) return;
    const focusables = () =>
      Array.from(drawerRef.current?.querySelectorAll<HTMLElement>('a[href], button') ?? []);
    const t = setTimeout(() => focusables()[0]?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!e.shiftKey && active === last) { e.preventDefault(); hamburgerRef.current?.focus(); }
      else if (e.shiftKey && active === first) { e.preventDefault(); hamburgerRef.current?.focus(); }
      else if (active === hamburgerRef.current) { e.preventDefault(); (e.shiftKey ? last : first)?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { clearTimeout(t); document.removeEventListener('keydown', onKey); };
  }, [mobileOpen]);

  const openDropdown = useCallback((name: DropdownName) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setActiveDropdown(name);
  }, []);

  const closeDropdown = useCallback(() => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 140);
  }, []);

  /** Close the desktop mega menu when keyboard focus leaves the header. */
  const onHeaderBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setActiveDropdown(null);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  const servicesActive = pathname.startsWith('/services');
  const companyActive = COMPANY_MENU.some((c) => c.items.some((i) => i.href !== '/work' && isActive(i.href)));

  const navItem = (active: boolean) =>
    `relative flex items-center gap-1 rounded-lg px-3.5 py-2 text-[15px] font-semibold transition-colors ${
      active ? 'text-[#0041CC]' : 'text-slate-700 hover:text-[#0B111E]'
    }`;
  const underline = (active: boolean) =>
    `pointer-events-none absolute inset-x-3.5 -bottom-[3px] h-0.5 rounded-full bg-[#0051FF] transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`;

  return (
    <header
      onBlur={onHeaderBlur}
      onMouseLeave={closeDropdown}
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur-xl transition-shadow duration-300 ${
        scrolled || activeDropdown ? 'shadow-[0_8px_30px_-12px_rgba(11,17,30,0.18)]' : 'border-b border-slate-200/70'
      }`}
    >
      <div className={`container flex items-center justify-between gap-6 transition-[height] duration-300 ${scrolled ? 'h-16' : 'h-[76px]'}`}>

        <Logo />

        {/* ── Desktop nav ── */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-0.5 lg:flex">
          <button
            ref={servicesBtnRef}
            onMouseEnter={() => openDropdown('services')}
            onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
            aria-expanded={activeDropdown === 'services'}
            aria-controls="nav-services-menu"
            className={navItem(servicesActive || activeDropdown === 'services')}
          >
            Services
            <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
            <span aria-hidden="true" className={underline(servicesActive)} />
          </button>

          {TOP_LINKS.slice(0, 1).map(({ label, href }) => (
            <Link key={href} href={href} onMouseEnter={closeDropdown} aria-current={isActive(href) ? 'page' : undefined} className={navItem(isActive(href))}>
              {label}
              <span aria-hidden="true" className={underline(isActive(href))} />
            </Link>
          ))}

          <button
            ref={companyBtnRef}
            onMouseEnter={() => openDropdown('company')}
            onClick={() => setActiveDropdown(activeDropdown === 'company' ? null : 'company')}
            aria-expanded={activeDropdown === 'company'}
            aria-controls="nav-company-menu"
            className={navItem(companyActive || activeDropdown === 'company')}
          >
            Company
            <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === 'company' ? 'rotate-180' : ''}`} />
            <span aria-hidden="true" className={underline(companyActive)} />
          </button>

          {TOP_LINKS.slice(1).map(({ label, href }) => (
            <Link key={href} href={href} onMouseEnter={closeDropdown} aria-current={isActive(href) ? 'page' : undefined} className={navItem(isActive(href))}>
              {label}
              <span aria-hidden="true" className={underline(isActive(href))} />
            </Link>
          ))}
        </nav>

        {/* ── Desktop right ── */}
        <div className="hidden items-center gap-5 lg:flex">
          <a href={PHONE.href} className="group flex items-center gap-2.5 text-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF0FF] text-[#0051FF] transition group-hover:bg-[#0051FF] group-hover:text-white">
              <Phone aria-hidden="true" className="h-4 w-4" />
            </span>
            <span className="hidden leading-tight xl:block">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500">Call us</span>
              <span className="block font-bold text-slate-900">{PHONE.display}</span>
            </span>
            <span className="sr-only xl:hidden">Call us at {PHONE.display}</span>
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0051FF] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#0051FF]/25 transition hover:bg-[#0041CC]"
          >
            Start a Project <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        {/* ── Hamburger ── */}
        <button
          ref={hamburgerRef}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-800 transition hover:bg-slate-50 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen} aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
            {mobileOpen
              ? <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              : <path d="M3 5h14M3 10h14M3 15h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {/* ── Desktop mega menu ── */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            key={activeDropdown}
            id={activeDropdown === 'services' ? 'nav-services-menu' : 'nav-company-menu'}
            onMouseEnter={() => openDropdown(activeDropdown)}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-full hidden border-t border-slate-100 bg-white shadow-[0_24px_48px_-16px_rgba(11,17,30,0.22)] lg:block"
          >
            <div className="container">
              {activeDropdown === 'services'
                ? <ServicesPanel onClose={() => setActiveDropdown(null)} />
                : <CompanyPanel onClose={() => setActiveDropdown(null)} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              aria-hidden="true"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`fixed inset-0 z-40 bg-[#0B111E]/50 backdrop-blur-sm lg:hidden ${scrolled ? 'top-16' : 'top-[76px]'}`}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              key="drawer"
              id="mobile-menu"
              ref={drawerRef}
              role="navigation" aria-label="Mobile navigation"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className={`fixed right-0 z-50 flex w-full flex-col sm:max-w-sm overflow-y-auto bg-white shadow-2xl lg:hidden ${
                scrolled ? 'top-16 h-[calc(100dvh-4rem)]' : 'top-[76px] h-[calc(100dvh-76px)]'
              }`}
            >
              <div className="flex-1">
                <MobileSection title="Services" items={SERVICES_MENU} onClose={() => setMobileOpen(false)} isActive={isActive} />
                <MobileSection title="Company" items={COMPANY_MENU[0].items} onClose={() => setMobileOpen(false)} isActive={isActive} />
                <MobileSection title="Resources" items={COMPANY_MENU[1].items} onClose={() => setMobileOpen(false)} isActive={isActive} />

                <div className="grid grid-cols-2 gap-2 px-6 py-5">
                  {TOP_LINKS.map(({ label, href }) => (
                    <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                      aria-current={isActive(href) ? 'page' : undefined}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        isActive(href) ? 'bg-[#EEF0FF] text-[#0041CC]' : 'bg-slate-50 text-slate-800 hover:bg-[#EEF0FF]'
                      }`}
                    >
                      {label} <ArrowUpRight aria-hidden="true" className="h-4 w-4 opacity-60" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact + CTA */}
              <div className="border-t border-slate-100 bg-[#F7F8FC] px-6 py-6">
                <Link
                  href="/contact" onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0051FF] py-3.5 text-sm font-bold text-white"
                >
                  Start a Project <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <div className="mt-4 space-y-2 text-sm">
                  <a href={PHONE.href} className="flex items-center gap-3 font-semibold text-slate-800">
                    <Phone aria-hidden="true" className="h-4 w-4 text-[#0051FF]" /> {PHONE.display}
                  </a>
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 font-semibold text-slate-800">
                    <Mail aria-hidden="true" className="h-4 w-4 text-[#0051FF]" /> {EMAIL}
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
