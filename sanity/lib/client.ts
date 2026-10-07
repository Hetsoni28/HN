import { createClient } from 'next-sanity';

const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_READ_TOKEN;
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const rawDataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();

export const isSanityConfigured = Boolean(
  rawProjectId &&
  rawProjectId !== 'placeholder-project-id' &&
  rawProjectId !== 'your_project_id_here' &&
  rawProjectId !== 'dummy123' &&
  rawProjectId !== 'unconfigured' &&
  !rawProjectId.includes('placeholder')
);

/**
 * Primary Sanity client — CDN-cached with ISR revalidation.
 *
 * • useCdn: false when a token is present (server-side authenticated fetches)
 * • The `next: { revalidate }` option is passed per-fetch in content.ts
 *   so each query can have its own TTL independent of the client config.
 * • When NEXT_PUBLIC_SANITY_PROJECT_ID is unconfigured, fallback content is
 *   served by content.ts and client.fetch is never invoked.
 */
export const client = createClient({
  projectId: isSanityConfigured ? rawProjectId! : 'dummy123',
  dataset: rawDataset || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-01',
  useCdn: !token,        // false when token present (bypasses CDN for auth'd reads)
  perspective: 'published',
  stega: false,          // disable visual editing overlays in production
  token,                 // undefined in browser/public context — safe to pass
});

/** Revalidation intervals for ISR */
export const REVALIDATE = {
  STATIC_CONTENT: 60 * 60 * 24,  // 24 h  — team, services, FAQs
  DYNAMIC_CONTENT: 60,            //  1 min — blog posts, projects (changed from 1 hour to 1 min for faster updates)
  REALTIME: 60,                   //  1 min — contact, page-level settings
} as const;
