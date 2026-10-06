'use client';

import Image from 'next/image';
import Link from 'next/link';

/**
 * Atom — Logo
 * HN icon mark + premium wordmark.
 */
export function Logo() {
  return (
    <Link href="/" aria-label="HN home" className="flex items-center gap-3 group">
      {/* Icon mark */}
      <Image
        src="/hn-logo.svg"
        alt="HN"
        width={830}
        height={735}
        className="h-11 w-auto object-contain"
        priority
      />

      {/* Thin divider */}
      <span className="h-9 w-px bg-slate-200" aria-hidden="true" />

      {/* Wordmark */}
      <div className="flex flex-col justify-center gap-[4px]">
        <span className="text-base font-black leading-none tracking-[-0.02em] text-[#0B111E] group-hover:text-[#0051FF] transition-colors">
          HN
        </span>
        <span className="text-xs font-bold uppercase leading-none tracking-[0.18em] text-slate-400">
          Tech
        </span>
      </div>
    </Link>
  );
}
