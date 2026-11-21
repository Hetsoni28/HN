/**
 * Live client websites shown on the Work page. Each card opens the live site in a new tab.
 * To add a project: put a 1440x900 screenshot in public/images/work/ and add an entry here.
 */
export type LiveProject = {
  name: string;
  url: string;
  category: string;
  description: string;
  image: string;
};

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
