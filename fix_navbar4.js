const fs = require('fs');
const file = 'components/organisms/navbar.tsx';
let text = fs.readFileSync(file, 'utf8');

text = text.replace(/\/\*.*Data.*\*\/(.|\n)*?\/\*.*Types.*\*\//, /* ── Data ── */

const SERVICES_MENU = [
  { label: 'Websites',          href: '/services/websites',            desc: 'Fast, beautiful marketing & business sites',   icon: '🌐' },
  { label: 'Web Applications',  href: '/services/web-applications',    desc: 'Custom dashboards, portals & platforms',        icon: '💻' },
  { label: 'Mobile Apps',       href: '/services/mobile-applications', desc: 'iOS & Android apps built with React Native',    icon: '📱' },
  { label: 'AI Solutions',      href: '/services/ai-solutions',        desc: 'AI-powered tools, chatbots & automation',       icon: '✨' },
  { label: 'SaaS Platforms',    href: '/services/saas-platforms',      desc: 'Scalable multi-tenant SaaS products',           icon: '☁️' },
  { label: 'E-Commerce',        href: '/services/e-commerce',          desc: 'Conversion-optimised online stores',            icon: '🛒' },
  { label: 'Maintenance Plans', href: '/maintenance',                  desc: 'Ongoing support, updates & monitoring',         icon: '🔧' },
];

const COMPANY_MENU = [
  { label: 'About Us',         href: '/about',    desc: 'Who we are and how we work',       icon: '👋' },
  { label: 'Our Process',      href: '/process',  desc: 'From discovery to delivery',       icon: '⚙️' },
  { label: 'Portfolio',        href: '/work',     desc: 'Case studies of our best work',    icon: '🏆' },
  { label: 'Insights / Blog',  href: '/insights', desc: 'Articles on web, SaaS & AI',      icon: '📰' },
  { label: 'Showreel',         href: '/showreel', desc: '40-second cinematic overview',     icon: '🎬' },
  { label: 'HN vs Others',     href: '/compare',  desc: 'Why choose HN over alternatives', icon: '⚖️' },
  { label: 'Refer & Earn 10%', href: '/referral', desc: 'Refer a friend, earn 10% commission', icon: '🤝' },
];

const TOP_LINKS = [
  { label: 'Process',   href: '/process',  icon: '⚙️' },
  { label: 'Estimator', href: '/estimate', icon: '🧮' },
  { label: 'Insights',  href: '/insights', icon: '📰' },
  { label: 'Contact',   href: '/contact',  icon: '✉️' },
];

/* ── Types ── */);

fs.writeFileSync(file, text, 'utf8');
