import type { Metadata } from 'next';

/**
 * lib/seo.ts — shared page metadata.
 *
 * Next.js merges metadata shallowly: a page that sets `openGraph` replaces the
 * layout's whole `openGraph` block, including its image. Build page metadata
 * through `pageMetadata()` so every page keeps the site name, locale and a
 * share image.
 */

export const SITE_URL = 'https://www.hntech.in';
export const SITE_NAME = 'HN Tech';

export const DEFAULT_OG_IMAGE = {
  url: '/og-cover.png',
  width: 1200,
  height: 630,
  alt: 'HN Tech — web and app development company in India',
};

const TITLE_SUFFIX = ` | ${SITE_NAME}`;
const MAX_TITLE = 60;

/** Trim a description to Google's ~155 character snippet length. */
export function clampDescription(text: string, max = 155): string {
  return text.length > max ? `${text.slice(0, max - 3).trim()}...` : text;
}

/**
 * Title for CMS-provided titles: drops a trailing "| HN" / "| HN Tech" brand
 * (the layout template adds it) and skips the template when the result would
 * run past ~60 characters and get truncated in search results.
 */
export function cmsTitle(raw: string): Metadata['title'] {
  const clean = raw.replace(/\s*[|–—-]\s*HN(\s+tech)?\s*$/i, '').trim();
  return clean.length + TITLE_SUFFIX.length > MAX_TITLE ? { absolute: clean } : clean;
}

type OpenGraph = NonNullable<Metadata['openGraph']>;

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  ownImage = false,
  openGraph,
}: {
  /** Page title; the layout template appends " | HN Tech" unless absolute. */
  title: Metadata['title'];
  description: string;
  /** Path from the site root, e.g. "/services". */
  path: string;
  keywords?: string[];
  /** The route has its own opengraph-image file — don't override it. */
  ownImage?: boolean;
  openGraph?: OpenGraph;
}): Metadata {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  const desc = clampDescription(description);
  const ogTitle =
    typeof title === 'string'
      ? `${title}${TITLE_SUFFIX}`
      : title && 'absolute' in title
        ? title.absolute
        : SITE_NAME;

  return {
    title,
    description: desc,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: SITE_NAME,
      url,
      title: ogTitle,
      description: desc,
      ...(ownImage ? {} : { images: [DEFAULT_OG_IMAGE] }),
      ...openGraph,
    } as OpenGraph,
  };
}

/** Search-focused titles and descriptions for each service page. */
export const SERVICE_SEO: Record<string, { title: string; description: string }> = {
  'websites': {
    title: 'Website Development Company in India',
    description: 'Custom website development in India: fast, SEO-ready business websites, corporate portals and CMS sites built with Next.js. Free proposal in 48 hours.',
  },
  'web-applications': {
    title: 'Web Application Development Services',
    description: 'Custom web application development: secure, scalable web apps, client portals and internal tools built with React, Next.js and Node.js, from MVP to launch.',
  },
  'mobile-applications': {
    title: 'Mobile App Development Company in India',
    description: 'Cross-platform mobile app development for iOS and Android with React Native: one codebase, native performance, and App Store and Play Store launch support.',
  },
  'ai-solutions': {
    title: 'AI Development & Automation Services',
    description: 'AI development services: custom LLM integrations, chatbots, workflow automation and AI-powered features added to your product with OpenAI and LangChain.',
  },
  'saas-platforms': {
    title: 'SaaS Development Company in India',
    description: 'SaaS product development from MVP to scale: multi-tenant architecture, subscriptions and billing, admin dashboards and secure cloud deployment.',
  },
  'custom-software': {
    title: 'Custom Software Development Services',
    description: 'Custom software development for your business processes: CRM, ERP, booking and workflow systems designed, built and maintained by senior engineers.',
  },
  'e-commerce': {
    title: 'E-Commerce Website Development',
    description: 'E-commerce website development: fast storefronts, secure Razorpay and Stripe checkout, inventory management and SEO-ready product pages.',
  },
  'apis-integrations': {
    title: 'API Development & Integration Services',
    description: 'REST and GraphQL API development and third-party integrations: payment gateways, CRMs, ERPs and webhooks connected reliably and securely.',
  },
  'dashboards-admin': {
    title: 'Admin Panel & Dashboard Development',
    description: 'Custom admin panel and dashboard development: role-based access, real-time analytics, reports and data management tools for your business.',
  },
  'ui-ux-design': {
    title: 'UI/UX Design Services for Web & Mobile',
    description: 'UI/UX design for websites, web apps and mobile apps: user research, wireframes, Figma prototypes and design systems ready for development.',
  },
  'maintenance-support': {
    title: 'Website & App Maintenance Services',
    description: 'Website and app maintenance services: security updates, uptime monitoring, bug fixes, backups and performance tuning for your live product.',
  },
};
