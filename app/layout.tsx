import type { Metadata } from 'next';
import { spaceGrotesk, plusJakarta } from '@/lib/fonts';
import '../styles/globals.css';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/molecules/structured-data';
import { SkipLink } from '@/components/atoms/skip-link';
import { WelcomeManager } from '@/components/welcome/WelcomeManager';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hn.studio';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'HN — Digital Products From Ideas to Scale',
    template: '%s — HN',
  },
  description: 'HN is a two-person digital product studio. We design and build websites, web apps, SaaS platforms, mobile apps, and AI solutions for ambitious businesses.',
  keywords: ['HN', 'digital product studio', 'web development', 'web applications', 'AI solutions', 'SaaS development', 'mobile app development', 'Next.js agency', 'software development India', 'Het Soni', 'Neel Patel', 'Vraj Prajapati'],
  authors: [{ name: 'Het Soni' }, { name: 'Neel Patel' }, { name: 'Vraj Prajapati' }],
  creator: 'HN',
  publisher: 'HN',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website', locale: 'en_IN', url: SITE_URL, siteName: 'HN',
    title: 'HN — Digital Products From Ideas to Scale',
    description: 'A two-person digital product studio building websites, web apps, SaaS, mobile apps, and AI solutions.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'HN' }],
  },
  twitter: {
    card: 'summary_large_image', site: '@hetsoni', creator: '@hetsoni',
    title: 'HN — Digital Products From Ideas to Scale',
    description: 'A two-person digital product studio building websites, web apps, SaaS, mobile apps, and AI solutions.',
    images: ['/opengraph-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${plusJakarta.variable}`} data-scroll-behavior="smooth">
      <head>
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
      </head>
      <body>
        <WelcomeManager />
        <SkipLink />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {children}
      </body>
    </html>
  );
}
