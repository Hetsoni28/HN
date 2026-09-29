import Link from 'next/link';
import { Eyebrow } from '@/components/atoms/eyebrow';

const QUICK_LINKS = [
  { href: '/',          label: 'Home' },
  { href: '/work',      label: 'Our Work' },
  { href: '/services',  label: 'Services' },
  { href: '/about',     label: 'About' },
  { href: '/contact',   label: 'Contact' },
  { href: '/insights',  label: 'Insights' },
];

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-white">
      <div className="container py-24 text-center">

        {/* Large 404 */}
        <div className="relative mx-auto mb-8 w-fit">
          <div className="select-none text-[120px] font-black leading-none text-[#EEF0FF] sm:text-[180px] md:text-[240px]">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-[#0051FF]">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <Eyebrow>Page not found</Eyebrow>
        <h1 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-slate-500">
          The page you&apos;re looking for may have been moved, renamed, or never existed. Here are some helpful links to get you back on track.
        </p>

        {/* Quick links */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {QUICK_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-xl border border-[#E2E5F1] bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#0051FF]/30 hover:text-[#0051FF]"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Primary CTA */}
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0051FF] px-8 py-4 text-base font-bold text-white transition hover:bg-[#0040CC]"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
