'use client';

import { useState, useEffect, useRef } from 'react';
import { Logo } from '@/components/atoms/logo';
import { Button } from '@/components/atoms/button';
import { NavLink } from '@/components/molecules/nav-link';
import { VisuallyHidden } from '@/components/atoms/visually-hidden';

const NAV_LINKS: [string, string][] = [
  ['Services', '/services'],
  ['Work',     '/work'],
  ['Process',  '/process'],
  ['About',    '/about'],
  ['Insights', '/insights'],
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  /* Close on Escape key */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        hamburgerRef.current?.focus(); // return focus to trigger
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur"
      role="banner"
    >
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(([label, href]) => (
            <NavLink key={href} href={href} label={label} />
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button href="/contact" variant="primary" className="text-sm">
            Start a Project
            <span aria-hidden="true"> →</span>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          className="rounded-lg border border-slate-200 p-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {/* Hamburger / X icon — inline SVG, no emoji */}
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" stroke="#0B111E" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="#0B111E" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`border-t border-slate-200 bg-white md:hidden ${open ? 'block' : 'hidden'}`}
      >
        <nav aria-label="Mobile navigation" className="container flex flex-col py-4">
          {NAV_LINKS.map(([label, href]) => (
            <NavLink
              key={href}
              href={href}
              label={label}
              mobile
              onClick={() => setOpen(false)}
            />
          ))}
          <Button
            href="/contact"
            variant="primary"
            className="mt-4"
            onClick={() => setOpen(false)}
          >
            Start a Project
            <span aria-hidden="true"> →</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
