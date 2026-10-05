'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/atoms/logo';
import { Button } from '@/components/atoms/button';

/* ─────────────────────────── Data ─────────────────────────── */

const SERVICES_MENU = [
  { label: 'Websites',          href: '/services/websites',            desc: 'Fast, beautiful marketing & business sites',   icon: '🌐' },
  { label: 'Web Applications',  href: '/services/web-applications',    desc: 'Custom dashboards, portals & platforms',        icon: '⚙️' },
  { label: 'Mobile Apps',       href: '/services/mobile-applications', desc: 'iOS & Android apps built with React Native',    icon: '📱' },
  { label: 'AI Solutions',      href: '/services/ai-solutions',        desc: 'AI-powered tools, chatbots & automation',       icon: '🤖' },
  { label: 'SaaS Platforms',    href: '/services/saas-platforms',      desc: 'Scalable multi-tenant SaaS products',           icon: '🚀' },
  { label: 'E-Commerce',        href: '/services/e-commerce',          desc: 'Conversion-optimised online stores',            icon: '🛒' },
  { label: 'Maintenance Plans', href: '/maintenance',                  desc: 'Ongoing support, updates & monitoring',         icon: '🔧' },
];

const COMPANY_MENU = [
  { label: 'About Us',         href: '/about',    desc: 'Who we are and how we work',       icon: '👥' },
  { label: 'Our Process',      href: '/process',  desc: 'From discovery to delivery',       icon: '📋' },
  { label: 'Portfolio',        href: '/work',     desc: 'Case studies of our best work',    icon: '💼' },
  { label: 'Insights / Blog',  href: '/insights', desc: 'Articles on web, SaaS & AI',      icon: '✍️' },
  { label: 'Showreel',         href: '/showreel', desc: '40-second cinematic overview',     icon: '🎬' },
  { label: 'HN vs Others',     href: '/compare',  desc: 'Why choose HN over alternatives', icon: '⚖️' },
  { label: 'Refer & Earn 10%', href: '/referral', desc: 'Refer a friend, earn 10% commission', icon: '🤝' },
];

const TOP_LINKS = [
  { label: 'Process',   href: '/process',  icon: '📋' },
  { label: 'Estimator', href: '/estimate', icon: '🧮' },
  { label: 'Insights',  href: '/insights', icon: '✍️' },
  { label: 'Contact',   href: '/contact',  icon: '✉️' },
];

/* ─────────────────────────── Types ─────────────────────────── */

interface DropdownItem { label: string; href: string; desc: string; icon?: string; }

/* ──────────────────────────â”€ Sub-components ──────────────────────────â”€ */

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

function MegaDropdown({ items, onClose }: { items: DropdownItem[]; onClose: () => void }) {
  return (
    <div className="absolute left-0 top-full z-50 mt-2 w-[520px] rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xl shadow-slate-200/60 ring-1 ring-black/5">
      <div className="grid grid-cols-2 gap-1">
        {items.map((item) => (
          <Link key={item.href} href={item.href} onClick={onClose}
            className="group flex flex-col gap-0.5 rounded-xl px-4 py-3 transition hover:bg-[#EEF0FF]"
          >
            <span className="text-sm font-semibold text-slate-900 transition group-hover:text-[#0051FF]">{item.label}</span>
            <span className="text-xs leading-relaxed text-slate-400">{item.desc}</span>
          </Link>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between rounded-xl bg-[#0051FF] px-4 py-2.5">
        <span className="text-xs font-semibold text-white/80">Not sure what you need?</span>
        <Link href="/estimate" onClick={onClose} className="text-xs font-bold text-white underline-offset-2 hover:underline">
          Use the estimator â†’
        </Link>
      </div>
    </div>
  );
}

function MobileSection({ title, items, onClose, isActive }: {
  title: string;
  items: DropdownItem[];
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <span className="text-base font-bold text-slate-900">{title}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-1 px-4 pb-4">
              {items.map(({ label, href, desc, icon }) => (
                <Link key={href} href={href} onClick={onClose}
                  className={`flex items-start gap-3 rounded-xl px-3 py-3 transition ${
                    isActive(href) ? 'bg-[#EEF0FF]' : 'hover:bg-slate-50'
                  }`}
                >
                  <span className="mt-0.5 text-xl leading-none">{icon}</span>
                  <div>
                    <p className={`text-sm font-semibold ${isActive(href) ? 'text-[#0051FF]' : 'text-slate-800'}`}>{label}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────â”€ Navbar ──────────────────────────â”€ */

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

          <div className="relative" onMouseEnter={() => openDropdown('services')} onMouseLeave={closeDropdown}>
            <button
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isActive('/services') || activeDropdown === 'services'
                  ? 'bg-[#EEF0FF] text-[#0051FF]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              aria-haspopup="true" aria-expanded={activeDropdown === 'services'}
            >
              Services <ChevronDown open={activeDropdown === 'services'} />
            </button>
            {activeDropdown === 'services' && (
              <MegaDropdown items={SERVICES_MENU} onClose={() => setActiveDropdown(null)} />
            )}
          </div>

          <Link href="/work" className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
            isActive('/work') ? 'bg-[#EEF0FF] text-[#0051FF]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}>Work</Link>

          <div className="relative" onMouseEnter={() => openDropdown('company')} onMouseLeave={closeDropdown}>
            <button
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                (isActive('/about') || isActive('/process') || isActive('/insights') || isActive('/compare')) || activeDropdown === 'company'
                  ? 'bg-[#EEF0FF] text-[#0051FF]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              aria-haspopup="true" aria-expanded={activeDropdown === 'company'}
            >
              Company <ChevronDown open={activeDropdown === 'company'} />
            </button>
            {activeDropdown === 'company' && (
              <MegaDropdown items={COMPANY_MENU} onClose={() => setActiveDropdown(null)} />
            )}
          </div>

          {TOP_LINKS.map(({ label, href }) => (
            <Link key={href} href={href} className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
              isActive(href) ? 'bg-[#EEF0FF] text-[#0051FF]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}>{label}</Link>
          ))}
        </nav>

        {/* ── Desktop right ── */}
        <div className="hidden items-center gap-3 lg:flex">
          
          <Button href="/contact" variant="primary" className="text-sm px-5 py-2.5">
            Start a Project &rarr;
            </Button>
        </div>

        {/* ── Hamburger ── */}
        <button
          ref={hamburgerRef}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen} aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.svg key="close"
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}
                width="18" height="18" viewBox="0 0 18 18" fill="none"
              >
                <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </motion.svg>
            ) : (
              <motion.svg key="menu"
                initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}
                width="18" height="18" viewBox="0 0 18 18" fill="none"
              >
                <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• Premium Mobile Drawer â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Blurred backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[68px] z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in panel from right */}
            <motion.div
              key="drawer"
              id="mobile-menu"
              role="dialog" aria-modal="true" aria-label="Navigation menu"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed right-0 top-[68px] z-50 flex h-[calc(100dvh-68px)] w-full max-w-sm flex-col overflow-y-auto bg-white shadow-2xl lg:hidden"
            >
              {/* ── Gradient header ── */}
              <div className="bg-gradient-to-br from-[#0051FF] to-[#003ED9] px-6 py-6">
                <p className="text-[11px] font-bold uppercase tracking-widest text-blue-200">HN Tech</p>
                <h2 className="mt-1 text-xl font-extrabold leading-tight text-white">
                  What can we<br />build for you?
                </h2>
                <div className="mt-4 flex gap-3">
                  <Link
                    href="/contact" onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-xl bg-white py-3 text-center text-sm font-bold text-[#0051FF] transition hover:bg-blue-50"
                  >
                    Start a Project &rarr;
            </Link>
                  <a
                    href="https://wa.me/917990743263?text=Hi%20HN%20Tech!"
                    target="_blank" rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1ebe5d]"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* ── Accordion nav ── */}
              <div className="flex-1">
                <MobileSection title="Services" items={SERVICES_MENU} onClose={() => setMobileOpen(false)} isActive={isActive} />
                <MobileSection title="Company"  items={COMPANY_MENU}  onClose={() => setMobileOpen(false)} isActive={isActive} />

                {/* Quick links 2-col grid */}
                <div className="px-6 py-5">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Quick Links</p>
                  <div className="grid grid-cols-2 gap-2">
                    {TOP_LINKS.map(({ label, href, icon }) => (
                      <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                          isActive(href)
                            ? 'bg-[#EEF0FF] text-[#0051FF]'
                            : 'bg-slate-50 text-slate-700 hover:bg-[#EEF0FF] hover:text-[#0051FF]'
                        }`}
                      >
                        <span>{icon}</span>{label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Footer strip ── */}
              <div className="border-t border-slate-100 px-6 py-5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  <p className="text-xs font-semibold text-slate-600">Available for new projects</p>
                </div>
                <p className="mt-0.5 text-xs text-slate-400">contact.hnsolutions@gmail.com</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
