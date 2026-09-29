'use client';

import Image from 'next/image';
import Link from 'next/link';

/**
 * Atom — Logo
 * HN monogram — transparent background PNG embedded in SVG.
 * Natural dimensions: 830 × 735. Rendered at h-12 (48px tall).
 */
export function Logo() {
  return (
    <Link href="/" aria-label="HN home">
      <Image
        src="/hn-logo.svg"
        alt="HN"
        width={830}
        height={735}
        className="h-12 w-auto object-contain"
        priority
      />
    </Link>
  );
}
