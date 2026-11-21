import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';

/** Slim utility strip above the navbar: contact details on desktop, estimate link everywhere. */
export function AnnouncementBar() {
  return (
    <div className="bg-[#0051FF] text-white">
      <div className="container flex items-center justify-center gap-6 py-2.5 text-xs font-medium sm:text-[13px] md:justify-between">
        <div className="hidden items-center gap-6 text-white md:flex">
          <a href="mailto:contact.hnsolutions@gmail.com" className="inline-flex items-center gap-2 transition-colors hover:text-white">
            <Mail aria-hidden="true" className="h-3.5 w-3.5" /> contact.hnsolutions@gmail.com
          </a>
        </div>
        <Link
          href="/estimate"
          className="group inline-flex items-center gap-2 font-semibold text-white"
        >
          <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0041CC]">New</span>
          Get an instant project cost estimate
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
