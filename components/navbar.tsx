'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const links: [string, string][] = [
  ['Services', '/services'],
  ['Work', '/work'],
  ['Process', '/process'],
  ['About', '/about'],
  ['Insights', '/insights'],
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="HN home">
          <Image
            src="/hn-logo.svg"
            alt="HN"
            width={88}
            height={70}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              className="text-sm font-semibold text-slate-600 transition hover:text-[#0051FF]"
              href={href}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link href="/contact" className="btn btn-primary text-sm">
            Start a Project →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="rounded-lg border border-slate-200 px-3 py-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="container flex flex-col py-4">
            {links.map(([label, href]) => (
              <Link
                onClick={() => setOpen(false)}
                key={href}
                className="border-b border-slate-100 py-4 font-semibold"
                href={href}
              >
                {label}
              </Link>
            ))}
            <Link
              onClick={() => setOpen(false)}
              href="/contact"
              className="btn btn-primary mt-4"
            >
              Start a Project →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
