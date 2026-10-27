import type { Metadata, Viewport } from 'next';
import { spaceGrotesk, plusJakarta } from '@/lib/fonts';
import '../styles/globals.css';
import { OrganizationJsonLd, WebSiteJsonLd, ProfessionalServiceJsonLd } from '@/components/molecules/structured-data';
import { SkipLink } from '@/components/atoms/skip-link';
import { WelcomeManager } from '@/components/welcome/WelcomeManager';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost')
  ? process.env.NEXT_PUBLIC_SITE_URL
  : 'https://www.hntech.in';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Web & App Development Company in India | HN Tech',
    template: '%s | HN Tech',
  },
  description:
    'HN Tech is a web and app development company in India building custom websites, web apps, SaaS platforms, mobile apps and AI solutions for businesses.',
  keywords: [
    'web development company in India',
    'app development company in India',
    'software development company',
    'custom website development',
    'web application development',
    'SaaS development company',
    'mobile app development company',
    'AI development services',
    'Next.js development company',
    'HN Tech',
  ],
  authors: [{ name: 'Het Soni' }, { name: 'Neel Patel' }],
  creator: 'HN Tech',
  publisher: 'HN Tech',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website', locale: 'en_IN', url: SITE_URL, siteName: 'HN Tech',
    title: 'Web & App Development Company in India | HN Tech',
    description:
      'HN Tech is a web and app development company in India building custom websites, web apps, SaaS platforms, mobile apps and AI solutions for businesses.',
    images: [DEFAULT_OG_IMAGE],
  },
  // No title/description here: X falls back to each page's og:title / og:description.
  twitter: {
    card: 'summary_large_image', site: '@hetsoni', creator: '@hetsoni',
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
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
        {/* Plain <script> tags on purpose: Google Tag verification reads the raw <head> HTML,
            and next/script / @next/third-parties inject the tag client-side, which fails it. */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga -- see note above */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-THBXTP7VK9"
        />
        <script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-THBXTP7VK9');
            `,
          }}
        />
      </head>
      <body>
        <WelcomeManager />
        <SkipLink />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <ProfessionalServiceJsonLd />
        {children}
      </body>
    </html>
  );
}
