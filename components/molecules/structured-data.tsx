/* JSON-LD Structured Data components — drop <StructuredData> anywhere in a Server Component */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost')
  ? process.env.NEXT_PUBLIC_SITE_URL
  : 'https://www.hntech.in';

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
      url: `${SITE_URL}/hn-logo.png`,
      width: 830,
      height: 735,
    },
    description: 'HN Tech is a technology company building websites, web apps, SaaS platforms, mobile apps, and AI solutions.',
    foundingDate: '2024',
    founders: [
      {
        '@type': 'Person',
        name: 'Het Soni',
        jobTitle: 'Founder & Full Stack Developer',
        sameAs: [
          'https://github.com/Hetsoni28',
          'https://www.linkedin.com/in/soni-het-9b6b30360/',
          'https://twitter.com/hetsoni',
        ],
      },
      { '@type': 'Person', name: 'Neel Patel', jobTitle: 'Founder & Web Developer' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contact.hnsolutions@gmail.com',
      telephone: '+917990743263',
    },
    sameAs: [
      'https://github.com/Hetsoni28',
      'https://www.linkedin.com/in/hntech-in-9b3905279',
      'https://www.instagram.com/___hn.in?stkn=ZWdpcHNscHd5eTVt',
      'https://www.youtube.com/@hntech-w1v',
      'https://www.facebook.com/share/19W4Kwh6ia/?mibextid=wwXIfr',
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
    name: 'HN Tech',
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
    image: imageUrl ?? `${SITE_URL}/og-cover.png`,
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

/* ── ProfessionalService (LocalBusiness & Tech Agency) ── */
export function ProfessionalServiceJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service-agency`,
    name: 'HN Tech',
    alternateName: ['HN Tech — Web & App Development Company', 'HN Development', 'HN Studio'],
    url: SITE_URL,
    logo: `${SITE_URL}/hn-logo.png`,
    image: `${SITE_URL}/og-cover.png`,
    description: 'HN Tech is a web and app development company in India building custom websites, web apps, SaaS platforms, mobile apps and AI solutions for businesses.',
    priceRange: '₹₹ - ₹₹₹₹',
    telephone: '+917990743263',
    email: 'contact.hnsolutions@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 23.0225,
      longitude: 72.5714,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '20:00',
      },
    ],
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Worldwide' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Full Stack Tech & Digital Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Web Development',
            description: 'High-performance Next.js and React web development, modern animations, and SEO-optimized web architecture.',
            url: `${SITE_URL}/services/websites`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Applications & SaaS Platforms',
            description: 'Scalable multi-tenant SaaS engineering, cloud databases, user authentication, and Stripe billing integrations.',
            url: `${SITE_URL}/services/saas-platforms`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mobile App Development',
            description: 'Cross-platform iOS and Android mobile app development with React Native, smooth gesture animations, and offline sync.',
            url: `${SITE_URL}/services/mobile-applications`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Solutions & LLM Integrations',
            description: 'Custom AI agents, intelligent workflows, LLM fine-tuning, and automated enterprise data pipelines.',
            url: `${SITE_URL}/services/ai-solutions`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Maintenance & Speed Optimization',
            description: '24/7 uptime monitoring, security patching, Core Web Vitals optimization, and continuous product evolution.',
            url: `${SITE_URL}/maintenance`,
          },
        },
      ],
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ── FAQPage (Rich Google Snippet for FAQs) ── */
export function FAQPageJsonLd({
  faqs,
}: {
  faqs?: { question: string; answer: string }[];
}) {
  if (!faqs || faqs.length === 0) return null;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

