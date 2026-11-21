/**
 * Cost estimator pricing — shared by the estimator UI and the "email me this estimate" server action,
 * so emailed numbers are always recalculated on the server, never taken from the browser.
 * Adjust base rates and feature costs here (INR).
 */

/** Included in every project type, on top of its own list (see COMMON_INCLUDES usage below). */
export const COMMON_INCLUDES = [
  'Launch on your domain with SSL (HTTPS)',
  'On-call support for 72 hours after launch',
  'Full handover of code, files and logins',
];

/*
 * `includes` = what the base price covers. Keep these separate from FEATURES (paid add-ons)
 * so nothing reads as both included and extra. These are promises to clients — review before changing.
 */
export const PROJECT_BASES = [
  {
    id: 'website', name: 'Website / Landing Page', min: 25000, max: 50000, desc: 'High-converting static or CMS-backed site.',
    includes: [
      'Core pages: Home, About, Services and Contact',
      'Mobile-friendly, responsive layout',
      'Contact form and WhatsApp button',
      'Basic on-page SEO: page titles, descriptions and sitemap',
      'Speed and image optimisation',
    ],
  },
  {
    id: 'webapp', name: 'Web Application / SaaS', min: 80000, max: 150000, desc: 'Complex logic, databases, and custom workflows.',
    includes: [
      'Database design and back-end (API) for your workflows',
      'Core screens for your main user journeys',
      'Responsive web interface for desktop and mobile',
      'Testing of key flows before launch',
      'Cloud deployment and hosting setup',
    ],
  },
  {
    id: 'mobile', name: 'Mobile App (iOS & Android)', min: 120000, max: 250000, desc: 'React Native / Flutter cross-platform app.',
    includes: [
      'One app for both iOS and Android',
      'Core screens for your main user journeys',
      'Connection to your back-end / API',
      'Testing on iOS and Android before release',
      'Help publishing to the App Store and Google Play',
    ],
  },
  {
    id: 'ecommerce', name: 'E-Commerce Store', min: 60000, max: 120000, desc: 'Full shopping cart, inventory, and checkout.',
    includes: [
      'Product catalogue, categories and product pages',
      'Cart and checkout flow',
      'Stock / inventory tracking',
      'Mobile-friendly storefront',
      'Basic on-page SEO for products and categories',
    ],
  },
];

export const FEATURES = [
  { id: 'design', name: 'Custom UI/UX Design', min: 15000, max: 30000, desc: 'Framer/Figma prototyping and branding.' },
  { id: 'auth', name: 'User Accounts & Profiles', min: 10000, max: 20000, desc: 'Authentication, roles, and profile management.' },
  { id: 'payments', name: 'Payment Gateway', min: 8000, max: 15000, desc: 'Razorpay, Stripe, or PayPal integration.' },
  { id: 'admin', name: 'Admin Dashboard / CMS', min: 20000, max: 40000, desc: 'Custom portal to manage your data/users.' },
  { id: 'ai', name: 'AI Integration', min: 30000, max: 60000, desc: 'OpenAI, Claude, or custom GenAI features.' },
  { id: 'api', name: '3rd-Party APIs', min: 15000, max: 30000, desc: 'Connecting external services (CRM, ERP, etc).' },
  { id: 'seo', name: 'Advanced SEO & Analytics', min: 8000, max: 15000, desc: 'Technical SEO, schema, and tracking setup.' },
];

export const TIMELINES = [
  { id: 'flexible', name: 'Flexible (Standard)', multiplier: 1, desc: 'Standard development lifecycle.' },
  { id: 'rush', name: 'Rush (Priority)', multiplier: 1.35, desc: 'Fast-tracked delivery. +35% premium.' },
];

export const formatINR = (value: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

/** Unknown ids are ignored, so a tampered request can't produce a made-up line item. */
export function calculateEstimate(baseId: string, featureIds: Iterable<string>, timelineId: string) {
  const base = PROJECT_BASES.find((b) => b.id === baseId);
  const timeline = TIMELINES.find((t) => t.id === timelineId);
  const wanted = new Set(featureIds);
  const activeFeatures = FEATURES.filter((f) => wanted.has(f.id));

  let min = base?.min ?? 0;
  let max = base?.max ?? 0;
  for (const f of activeFeatures) {
    min += f.min;
    max += f.max;
  }
  const mult = timeline?.multiplier ?? 1;
  return { min: Math.round(min * mult), max: Math.round(max * mult), base, activeFeatures, timeline };
}
