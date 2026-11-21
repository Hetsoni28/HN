/** Website & app maintenance plans (billed every 2 months). Used by /maintenance and the cost guide. */
export type Plan = {
  id: 'starter' | 'growth' | 'scale';
  name: string;
  price: string;
  popular: boolean;
  features: string[];
  bestFor: string;
};

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '₹8,000',
    popular: false,
    features: [
      'Security updates & patches (every 2 months)',
      'CMS content updates (up to 4 updates)',
      'Uptime monitoring (24/7 alerts)',
      'Performance report (every 2 months)',
      'Email support (72h response)',
    ],
    bestFor: 'Small business websites',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '₹18,000',
    popular: true,
    features: [
      'Everything in Starter, plus:',
      'Priority bug fixes (48h response)',
      'CMS content updates (up to 12 updates)',
      'Google Analytics insights report',
      'Minor design tweaks (up to 2h)',
      'WhatsApp support',
    ],
    bestFor: 'Growing startups and e-commerce',
  },
  {
    id: 'scale',
    name: 'Scale',
    price: '₹35,000',
    popular: false,
    features: [
      'Everything in Growth, plus:',
      'Dedicated engineer (4h included)',
      'Feature additions (up to 4h dev time)',
      'Detailed performance reports',
      'Database backups & optimisation',
      'Phone + WhatsApp support (24h response)',
      'Strategy call included',
    ],
    bestFor: 'SaaS platforms and web apps',
  },
];
