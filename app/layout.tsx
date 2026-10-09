import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { spaceGrotesk, plusJakarta } from '@/lib/fonts';
import '../styles/globals.css';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/molecules/structured-data';
import { SkipLink } from '@/components/atoms/skip-link';
import { WelcomeManager } from '@/components/welcome/WelcomeManager';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hntech.in';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'HN Tech — Digital Products From Ideas to Scale',
    template: '%s — HN Tech',
  },
  description: 'HN Tech is a premium technology company. We design and build websites, web apps, SaaS platforms, mobile apps, and AI solutions for ambitious businesses.',
  keywords: ['HN Tech', 'technology company', 'web development', 'web applications', 'AI solutions', 'SaaS development', 'mobile app development', 'Next.js agency', 'software development India', 'Het Soni', 'Neel Patel', 'Vraj Prajapati'],
  authors: [{ name: 'Het Soni' }, { name: 'Neel Patel' }, { name: 'Vraj Prajapati' }],
  creator: 'HN Tech',
  publisher: 'HN Tech',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website', locale: 'en_IN', url: SITE_URL, siteName: 'HN Tech',
    title: 'HN Tech — Digital Products From Ideas to Scale',
    description: 'A premium technology company building websites, web apps, SaaS, mobile apps, and AI solutions.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'HN Tech' }],
  },
  twitter: {
    card: 'summary_large_image', site: '@hetsoni', creator: '@hetsoni',
    title: 'HN Tech — Digital Products From Ideas to Scale',
    description: 'A premium technology company building websites, web apps, SaaS, mobile apps, and AI solutions.',
    images: ['/opengraph-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
};

/* Prevent iOS Safari auto-zoom on inputs (triggered when font-size < 16px).
   interactive-widget keeps the viewport stable when the keyboard opens. */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,          // allow user pinch-zoom (accessibility)
  userScalable: true,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-visual',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${plusJakarta.variable}`} data-scroll-behavior="smooth">
      <head>
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
              <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-THBXTP7VK9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-THBXTP7VK9');
          }
        </Script>
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
