import type { MetadataRoute } from 'next';
import { getProjects, getPosts, getServices } from '@/lib/content';
import { CITIES, SERVICES_LIST } from '@/lib/locations';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://hn.studio';

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
  { url: `${BASE}/work`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${BASE}/services`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE}/about`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/process`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/insights`,      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${BASE}/compare`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/showreel`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/estimate`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/brief`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/referral`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/start`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/maintenance`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/contact`,       lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.7 },
  { url: `${BASE}/privacy-policy`,lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
  { url: `${BASE}/terms`,         lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
  { url: `${BASE}/cookie-policy`, lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts, services] = await Promise.all([
    getProjects(),
    getPosts(),
    getServices(),
  ]);

  const projectUrls: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE}/work/${p.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const postUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/insights/${p.slug.current}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const serviceUrls: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/services/${s.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // 50 city × service location pages — high SEO value
  const locationUrls: MetadataRoute.Sitemap = SERVICES_LIST.flatMap((service) =>
    CITIES.map((city) => ({
      url: `${BASE}/services/${service.slug}/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  return [...STATIC_ROUTES, ...projectUrls, ...postUrls, ...serviceUrls, ...locationUrls];
}
