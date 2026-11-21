import { cache } from 'react';
import { client, isSanityConfigured, REVALIDATE } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import type { SanityImage } from '@/lib/content';

/**
 * Live client websites shown on the Work page. Each card opens the live site in a new tab.
 * Managed in Sanity Studio ("Live Website"). LIVE_PROJECTS below is shown only while Sanity has none.
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
  if (!isSanityConfigured) return LIVE_PROJECTS;
  const data = await client.fetch<SanityLiveProject[]>(
    `*[_type == "liveProject" && defined(url) && defined(thumbnail.asset)] | order(coalesce(order, 999) asc, _createdAt desc) {
      name, url, category, description, "thumbnail": thumbnail { asset->, alt }
    }`,
    {},
    { next: { revalidate: REVALIDATE.DYNAMIC_CONTENT } }
  );
  if (!data.length) return LIVE_PROJECTS;
  return data.map((p) => ({
    name: p.name,
    url: p.url,
    category: p.category,
    description: p.description,
    image: urlFor(p.thumbnail!).width(1280).height(800).fit('crop').url(),
    alt: p.thumbnail?.alt,
  }));
});

export const LIVE_PROJECTS: LiveProject[] = [
  {
    name: 'Revora Healthcare',
    url: 'https://www.revorahealthcare.com/',
    category: 'Healthcare',
    description: 'Corporate website for an Ahmedabad pharmaceutical company: ophthalmic brands, orthopaedic distribution and WHO-GMP manufacturing.',
    image: '/images/work/revora-healthcare.jpg',
  },
  {
    name: '8webcom',
    url: 'https://8webcom-com.vercel.app/',
    category: 'Agency Website',
    description: 'Website for an Ahmedabad web development and digital marketing company with 15+ years and 1,500+ projects.',
    image: '/images/work/8webcom.jpg',
  },
  {
    name: 'Angel Touch',
    url: 'https://angel-touch.vercel.app/',
    category: 'Salon & Academy',
    description: 'Website for a women-only Ayurvedic salon and beauty academy in Satellite, Ahmedabad.',
    image: '/images/work/angel-touch.jpg',
  },
  {
    name: 'Shri Hari Jewellers',
    url: 'https://shri-hari-kappa.vercel.app/',
    category: 'Jewellery',
    description: 'Catalogue website for a handcrafted gold and silver jeweller in Mogar, Anand, with WhatsApp enquiries.',
    image: '/images/work/shri-hari-jewellers.jpg',
  },
  {
    name: 'OVOW Foods',
    url: 'https://ovow-foods.vercel.app/',
    category: 'Food & Restaurant',
    description: 'Online ordering website for a pure-vegetarian cloud kitchen in Ahmedabad.',
    image: '/images/work/ovow-foods.jpg',
  },
  {
    name: 'Rajeshwari Jewellers',
    url: 'https://rajeshwari-jewellers.vercel.app',
    category: 'Jewellery',
    description: 'Website for a wholesale and retail 22K gold jeweller in Ahmedabad: bridal, antique and everyday collections.',
    image: '/images/work/rajeshwari-jewellers.jpg',
  },
  {
    name: 'RK Interior Design',
    url: 'https://rkinteriordesign.co/',
    category: 'Interior Design',
    description: 'Portfolio website for an Ahmedabad interior design studio covering residential and commercial spaces.',
    image: '/images/work/rk-interior.jpg',
  },
  {
    name: 'LUMIÈRE Salon Supplies',
    url: 'https://salon-product-website.vercel.app',
    category: 'E-Commerce',
    description: 'Product website for a professional salon supplies brand selling waxing products and salon essentials.',
    image: '/images/work/salon.jpg',
  },
  {
    name: 'Finance Advisor',
    url: 'https://finance-advisor-wine.vercel.app/',
    category: 'Web Application',
    description: 'AI-powered personal and family finance app for tracking income, expenses and budgets.',
    image: '/images/work/finance-advisor.jpg',
  },
];
