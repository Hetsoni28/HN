import { Space_Grotesk, Plus_Jakarta_Sans } from 'next/font/google';

/**
 * Space Grotesk — headlines (h1–h6)
 * Self-hosted subset via next/font → zero layout shift, no external request
 */
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
});

/**
 * Plus Jakarta Sans — body copy
 * Self-hosted subset via next/font → zero layout shift, no external request
 */
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  preload: true,
});
