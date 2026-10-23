import type { Metadata, Viewport } from 'next';
import { spaceGrotesk, plusJakarta } from '@/lib/fonts';
import '../styles/globals.css';
import { OrganizationJsonLd, WebSiteJsonLd, ProfessionalServiceJsonLd } from '@/components/molecules/structured-data';
import { SkipLink } from '@/components/atoms/skip-link';
import { WelcomeManager } from '@/components/welcome/WelcomeManager';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost')
  ? process.env.NEXT_PUBLIC_SITE_URL
  : 'https://www.hntech.in';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'HN Tech — Best Tech Company for Web Development',
    template: '%s | HN Tech',
  },
  description:
    'HN Tech is the best tech company for all development: custom websites, SaaS platforms, mobile apps, and scalable AI digital services for businesses.',
  keywords: [
    'best tech company for all development',
    'best web development company',
    'best digital services company',
    'top software development company',
    'custom web development',
    'SaaS platform development',
    'mobile app development company',
    'full stack development agency',
    'AI solutions and integrations',
    'Next.js development company',
    'HN Tech',
    'Het Soni',
    'Neel Patel',
  ],
  authors: [{ name: 'Het Soni' }, { name: 'Neel Patel' }],
  creator: 'HN Tech',
  publisher: 'HN Tech',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website', locale: 'en_IN', url: SITE_URL, siteName: 'HN Tech',
    title: 'HN Tech — Best Tech Company for Web Development',
    description:
      'HN Tech is the best tech company for all development: custom websites, SaaS platforms, mobile apps, and scalable AI digital services for businesses.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'HN Tech — Best Tech Company for Web Development & Digital Services' }],
  },
  twitter: {
    card: 'summary_large_image', site: '@hetsoni', creator: '@hetsoni',
    title: 'HN Tech — Best Tech Company for Web Development',
    description:
      'HN Tech is the best tech company for all development: custom websites, SaaS platforms, mobile apps, and scalable AI digital services for businesses.',
    images: ['/opengraph-image.png'],
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
