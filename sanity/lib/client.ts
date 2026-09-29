import { createClient } from 'next-sanity';

/**
 * Primary Sanity client — CDN-cached with ISR revalidation.
 *
 * • useCdn: true   → serve from Sanity's global CDN edge cache
 * • The `next: { revalidate }` option is passed per-fetch in content.ts
 *   so each query can have its own TTL independent of the client config.
 */
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-01',
  useCdn: true,
  perspective: 'published',
  stega: false, // disable visual editing overlays in production
});

/** Revalidation intervals for ISR */
export const REVALIDATE = {
  STATIC_CONTENT: 60 * 60 * 24,  // 24 h  — team, services, FAQs
  DYNAMIC_CONTENT: 60 * 60,       //  1 h  — blog posts, projects
  REALTIME: 60,                   //  1 min — contact, page-level settings
} as const;
