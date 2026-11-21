import { cache } from 'react';
import { client, isSanityConfigured, REVALIDATE } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import type { SanityImage } from '@/lib/content';

/**
 * Live client websites shown on the Work page. Each card opens the live site in a new tab.
 * Managed in Sanity Studio ("Live Website"); the Work page section hides when there are none.
 */
export type LiveProject = {
  name: string;
  url: string;
  category?: string;
  description?: string;
  image: string;
  alt?: string;
};

type SanityLiveProject = {
  name: string;
  url: string;
  category?: string;
  description?: string;
  thumbnail?: SanityImage;
};

export const getLiveProjects = cache(async (): Promise<LiveProject[]> => {
  if (!isSanityConfigured) return [];
  const data = await client.fetch<SanityLiveProject[]>(
    `*[_type == "liveProject" && defined(url) && defined(thumbnail.asset)] | order(coalesce(order, 999) asc, _createdAt desc) {
      name, url, category, description, "thumbnail": thumbnail { asset->, alt }
    }`,
    {},
    { next: { revalidate: REVALIDATE.DYNAMIC_CONTENT } }
  );
  return data.map((p) => ({
    name: p.name,
    url: p.url,
    category: p.category,
    description: p.description,
    image: urlFor(p.thumbnail!).width(1280).height(800).fit('crop').url(),
    alt: p.thumbnail?.alt,
  }));
});
