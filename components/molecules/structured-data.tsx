/* JSON-LD Structured Data components — drop <StructuredData> anywhere in a Server Component */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hntech.in';

/* ── Organisation (sitewide) ── */
export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'HN Tech',
    alternateName: 'HN',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/opengraph-image.png`,
    },
    description: 'HN is a technology company building websites, web apps, SaaS platforms, mobile apps, and AI solutions.',
    foundingDate: '2024',
    founders: [
      { '@type': 'Person', name: 'Het Soni', jobTitle: 'Full Stack Developer' },
      { '@type': 'Person', name: 'Neel Patel', jobTitle: 'Web Developer' },
    ],
    address: { '@type': 'PostalAddress', addressCountry: 'IN' },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contact.hnsolutions@gmail.com',
    },
    sameAs: [
      'https://github.com/Hetsoni28',
      'https://www.linkedin.com/in/hn-in-b66003440',
      'https://twitter.com/hetsoni',
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ── WebSite (home page search box) ── */
export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'HN',
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/insights?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ── Article (blog post) ── */
export function ArticleJsonLd({
  title,
  description,
  url,
  publishedAt,
  authorName,
  imageUrl,
}: {
  title: string;
  description?: string;
  url: string;
  publishedAt?: string;
  authorName?: string;
  imageUrl?: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      '@type': 'Person',
      name: authorName ?? 'HN Tech',
      url: SITE_URL,
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
    image: imageUrl ?? `${SITE_URL}/opengraph-image.png`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ── BreadcrumbList ── */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ── Service ── */
export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description?: string;
  url: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: 'Worldwide',
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
