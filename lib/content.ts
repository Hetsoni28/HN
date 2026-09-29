import { client } from '@/sanity/lib/client';

const hasSanity = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

/* ─────────────── Types ─────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SanityImage = { asset: any; alt?: string; hotspot?: any };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PortableTextContent = any[];

export type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  category?: string;
  industry?: string;
  featured?: boolean;
  shortDescription?: string;
  heroImage?: SanityImage;
  gallery?: SanityImage[];
  challenge?: PortableTextContent;
  approach?: PortableTextContent;
  solution?: PortableTextContent;
  architecture?: PortableTextContent;
  results?: PortableTextContent;
  body?: PortableTextContent;
  features?: string[];
  technology?: string[];
  challengeText?: string;
  approachText?: string;
  solutionText?: string;
  architectureText?: string;
  resultsText?: string;
  timeline?: string;
  role?: string;
  liveUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type ServiceFeature = { title: string; description: string };

export type Service = {
  _id: string;
  title: string;
  slug: { current: string };
  icon?: string;
  tagline?: string;
  shortDescription?: string;
  description?: string;
  whatWeProvide?: string[];
  features?: ServiceFeature[];
  technology?: string[];
  order?: number;
};

export type Faq = { _id: string; question: string; answer: string };

export type TeamMember = {
  _id: string;
  name: string;
  role?: string;
  tagline?: string;
  bio?: string;
  photo?: SanityImage;
  skills?: string[];
  github?: string;
  linkedin?: string;
  twitter?: string;
  displayOrder?: number;
};

/* ─────────────────────────────────────────────────────────
   FALLBACK SERVICES
───────────────────────────────────────────────────────── */
export const FALLBACK_SERVICES: Service[] = [
  {
    _id: '1', icon: '🌐',
    title: 'Websites & Platforms', slug: { current: 'websites' },
    tagline: 'Fast, beautiful websites that convert visitors into customers.',
    shortDescription: 'Marketing sites, corporate portals, and content platforms built for performance.',
    description: 'A great website is your most powerful sales and trust-building tool. HN builds marketing sites, corporate portals, and content platforms that are fast, accessible, and designed to convert.',
    whatWeProvide: ['Full custom design — no templates', 'CMS integration (Sanity, headless WordPress)', 'SEO-optimised architecture out of the box', 'Core Web Vitals score ≥ 90', 'Analytics & conversion tracking setup'],
    features: [
      { title: 'Responsive Design', description: 'Pixel-perfect on every device from mobile to 4K.' },
      { title: 'CMS Powered', description: 'Edit content without touching code using Sanity Studio.' },
      { title: 'SEO Ready', description: 'Semantic HTML, metadata, and structured data built in.' },
      { title: 'Performance First', description: 'Sub-2 second load targets with Lighthouse scores ≥ 90.' },
    ],
    technology: ['Next.js', 'React', 'Sanity CMS', 'Tailwind CSS', 'TypeScript', 'Vercel'], order: 1,
  },
  {
    _id: '2', icon: '💻',
    title: 'Web Applications', slug: { current: 'web-applications' },
    tagline: 'Complex SaaS and internal tools built to scale.',
    shortDescription: 'Full-stack web apps from MVP to production-grade SaaS.',
    description: 'From customer-facing SaaS products to internal business tools, HN engineers robust web applications with clean architecture, real-time features, and the scalability to grow with your business.',
    whatWeProvide: ['Full-stack architecture design', 'Authentication & role-based access', 'Real-time features (WebSockets, SSE)', 'Third-party API integration', 'Automated testing and CI/CD setup'],
    features: [
      { title: 'Scalable Architecture', description: 'Built to handle growth from 100 to 100,000 users.' },
      { title: 'Auth & Permissions', description: 'Secure login, roles, and multi-tenancy patterns.' },
      { title: 'Real-time Ready', description: 'Live updates, notifications, and collaborative features.' },
      { title: 'Tested & Reliable', description: 'Unit, integration, and e2e tests as a standard.' },
    ],
    technology: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'TypeScript', 'Docker', 'AWS'], order: 2,
  },
  {
    _id: '3', icon: '📱',
    title: 'Mobile Applications', slug: { current: 'mobile-applications' },
    tagline: 'Cross-platform apps for iOS and Android from one codebase.',
    shortDescription: 'React Native mobile apps with native feel and performance.',
    description: 'HN builds cross-platform mobile applications using React Native — sharing up to 90% of code between iOS and Android while delivering genuine native performance and look-and-feel.',
    whatWeProvide: ['Single codebase for iOS + Android', 'Native device features (camera, GPS, push notifications)', 'Offline-first architecture', 'App Store & Play Store submission', 'OTA update support'],
    features: [
      { title: 'Cross-Platform', description: 'iOS and Android from one shared React Native codebase.' },
      { title: 'Native Performance', description: 'Smooth 60fps animations and native navigation.' },
      { title: 'Offline Support', description: 'Works without internet using local storage and sync.' },
      { title: 'Push Notifications', description: 'Engage users with targeted push campaigns.' },
    ],
    technology: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Firebase', 'Fastlane'], order: 3,
  },
  {
    _id: '4', icon: '🤖',
    title: 'AI Solutions', slug: { current: 'ai-solutions' },
    tagline: 'Intelligent features and automation embedded in your product.',
    shortDescription: 'Custom LLM integrations, AI chatbots, and intelligent automation.',
    description: 'HN integrates AI capabilities directly into your product — from LLM-powered features and retrieval-augmented generation to intelligent workflow automation and custom AI agents.',
    whatWeProvide: ['LLM API integration (OpenAI, Anthropic, Gemini)', 'RAG pipelines with vector databases', 'Custom AI chatbots and agents', 'Intelligent data extraction and classification', 'Local/private model deployment with Ollama'],
    features: [
      { title: 'LLM Integration', description: 'OpenAI, Anthropic, Gemini, or open-source models.' },
      { title: 'RAG Pipelines', description: 'Retrieval-augmented generation for accurate, contextual answers.' },
      { title: 'AI Agents', description: 'Autonomous agents that take actions inside your product.' },
      { title: 'Private Deployment', description: 'On-premise models via Ollama for sensitive data.' },
    ],
    technology: ['Python', 'FastAPI', 'LangChain', 'OpenAI', 'Ollama', 'Pinecone', 'PostgreSQL'], order: 4,
  },
  {
    _id: '5', icon: '☁️',
    title: 'SaaS Platforms', slug: { current: 'saas-platforms' },
    tagline: 'Multi-tenant SaaS products built from first principles.',
    shortDescription: 'Full-stack SaaS with billing, auth, and multi-tenancy.',
    description: 'Building a SaaS product is more than features — it requires multi-tenancy, subscription billing, usage metering, and the infrastructure to support thousands of customers. HN handles all of it.',
    whatWeProvide: ['Multi-tenant architecture', 'Subscription billing with Stripe', 'Usage metering and limits', 'Customer portal and onboarding flows', 'Admin dashboard and analytics'],
    features: [
      { title: 'Multi-Tenancy', description: 'Isolated data per customer with shared infrastructure.' },
      { title: 'Stripe Billing', description: 'Subscriptions, trials, usage-based billing, and invoices.' },
      { title: 'Onboarding Flows', description: 'Smooth sign-up to value in minimal steps.' },
      { title: 'Admin Controls', description: 'Manage customers, plans, and usage from a central panel.' },
    ],
    technology: ['Next.js', 'NestJS', 'Stripe', 'PostgreSQL', 'Redis', 'TypeScript', 'AWS'], order: 5,
  },
  {
    _id: '6', icon: '⚙️',
    title: 'Custom Software', slug: { current: 'custom-software' },
    tagline: 'Bespoke software built exactly for your business processes.',
    shortDescription: 'Tailored systems that no off-the-shelf product can match.',
    description: 'When generic tools do not fit your workflow, custom software is the answer. HN designs and builds bespoke systems — from inventory management to workflow automation — that fit your exact process.',
    whatWeProvide: ['Deep discovery and process analysis', 'Bespoke database and API design', 'Legacy system integration', 'Role-based workflows and approvals', 'Training and full documentation'],
    features: [
      { title: 'Process-Driven Design', description: 'Built around how your team actually works.' },
      { title: 'Legacy Integration', description: 'Connects to existing systems via APIs or direct DB.' },
      { title: 'Role-Based Access', description: 'Granular permissions for every user type.' },
      { title: 'Full Documentation', description: 'Code, API, and user docs delivered with the product.' },
    ],
    technology: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript', 'Docker', 'REST & GraphQL'], order: 6,
  },
  {
    _id: '7', icon: '🛒',
    title: 'E-Commerce', slug: { current: 'e-commerce' },
    tagline: 'Online stores built to convert and scale.',
    shortDescription: 'Custom e-commerce with payment, inventory, and order management.',
    description: 'HN builds e-commerce solutions from full custom storefronts to headless Shopify integrations — with fast product pages, smooth checkout, payment gateway integration, and order management.',
    whatWeProvide: ['Custom storefront design', 'Payment gateway integration (Razorpay, Stripe)', 'Inventory and order management', 'Wishlist, cart, and coupon systems', 'Analytics and conversion optimisation'],
    features: [
      { title: 'Fast Product Pages', description: 'Optimised for Core Web Vitals and conversions.' },
      { title: 'Payment Gateway', description: 'Razorpay, Stripe, and UPI integration.' },
      { title: 'Order Management', description: 'Full OMS with status tracking and notifications.' },
      { title: 'Admin Panel', description: 'Manage products, stock, and orders easily.' },
    ],
    technology: ['Next.js', 'Sanity', 'Razorpay', 'Stripe', 'PostgreSQL', 'TypeScript'], order: 7,
  },
  {
    _id: '8', icon: '�—',
    title: 'APIs & Integrations', slug: { current: 'apis-integrations' },
    tagline: 'Reliable APIs and third-party integrations that just work.',
    shortDescription: 'REST and GraphQL APIs, webhooks, and third-party connectors.',
    description: 'HN designs and builds clean, documented, versioned APIs — and connects your systems to third-party services like payment gateways, CRMs, ERPs, communication tools, and data providers.',
    whatWeProvide: ['REST and GraphQL API design', 'API documentation with Swagger/OpenAPI', 'Webhook implementation and management', 'Third-party API integration (Twilio, SendGrid, etc.)', 'Rate limiting, auth, and security hardening'],
    features: [
      { title: 'Clean API Design', description: 'RESTful or GraphQL with versioning and clear contracts.' },
      { title: 'Full Documentation', description: 'Swagger/OpenAPI docs generated automatically.' },
      { title: 'Webhook Support', description: 'Real-time event-driven integrations.' },
      { title: 'Secure by Default', description: 'JWT auth, rate limiting, and input validation.' },
    ],
    technology: ['NestJS', 'FastAPI', 'GraphQL', 'REST', 'JWT', 'Swagger', 'PostgreSQL'], order: 8,
  },
  {
    _id: '9', icon: '📊',
    title: 'Dashboards & Admin Panels', slug: { current: 'dashboards-admin' },
    tagline: 'Data-rich dashboards and control panels for your business.',
    shortDescription: 'Custom analytics dashboards, CRMs, and admin interfaces.',
    description: 'HN builds data-dense, real-time dashboards and admin panels that give your team full visibility and control. From analytics to CRM to operations dashboards — all tailored to your data model.',
    whatWeProvide: ['Custom dashboard design and architecture', 'Real-time data visualisation (charts, KPIs)', 'CRUD interfaces for all data models', 'Role-based access control', 'Data export (CSV, PDF)'],
    features: [
      { title: 'Real-Time Charts', description: 'Live updating charts and KPI metrics.' },
      { title: 'CRUD Interfaces', description: 'Manage every entity in your data model.' },
      { title: 'Role-Based Access', description: 'Different views for admin, manager, and staff.' },
      { title: 'Data Export', description: 'Export any dataset to CSV or PDF.' },
    ],
    technology: ['React', 'Next.js', 'Recharts', 'TanStack Table', 'PostgreSQL', 'TypeScript'], order: 9,
  },
  {
    _id: '10', icon: '🎨',
    title: 'UI/UX Design', slug: { current: 'ui-ux-design' },
    tagline: 'Interfaces people actually enjoy using.',
    shortDescription: 'User research, wireframes, design systems, and Figma prototypes.',
    description: 'HN designs interfaces grounded in user behaviour — clear information architecture, consistent design systems, and polished visuals that make complex products feel simple and intuitive.',
    whatWeProvide: ['User research and persona mapping', 'Information architecture and user flows', 'Wireframes and interactive Figma prototypes', 'Design system creation (tokens, components)', 'Handover-ready specs for engineering'],
    features: [
      { title: 'User Research', description: 'Interviews, surveys, and competitor analysis.' },
      { title: 'Design System', description: 'Tokens, components, and documentation in Figma.' },
      { title: 'Prototyping', description: 'Clickable Figma prototypes for validation.' },
      { title: 'Dev Handover', description: 'Annotated specs that developers can build from directly.' },
    ],
    technology: ['Figma', 'FigJam', 'Framer', 'Storybook', 'Tailwind CSS'], order: 10,
  },
  {
    _id: '11', icon: '🛠️',
    title: 'Maintenance & Support', slug: { current: 'maintenance-support' },
    tagline: 'Keep your product fast, secure, and improving.',
    shortDescription: 'Monthly retainers for ongoing updates, bug fixes, and feature development.',
    description: 'HN offers monthly maintenance retainers so your product never stagnates. Security updates, dependency upgrades, performance monitoring, bug fixes, and new features — all handled by the team that built it.',
    whatWeProvide: ['Priority bug fixes and hotfixes', 'Dependency and security updates', 'Performance monitoring (uptime, Lighthouse)', 'Monthly feature development allocation', 'Direct Slack/WhatsApp access to Het and Neel'],
    features: [
      { title: 'Priority Support', description: 'Critical bugs addressed within 24 hours.' },
      { title: 'Security Updates', description: 'Dependencies and patches kept current.' },
      { title: 'Performance Monitoring', description: 'Uptime, speed, and error tracking.' },
      { title: 'Monthly Features', description: 'Allocated dev hours for new functionality.' },
    ],
    technology: ['Any stack we built', 'Sentry', 'Vercel Analytics', 'GitHub Actions', 'Uptime Robot'], order: 11,
  },
];

/* ─────────────────────────────────────────────────────────
   FALLBACK PROJECTS — rich case study content
───────────────────────────────────────────────────────── */
export const FALLBACK_PROJECTS: Project[] = [
  {
    _id: 'p1', title: 'Data Insight',
    slug: { current: 'data-insight' },
    category: 'AI / SaaS', industry: 'Business Intelligence',
    timeline: '3 months', role: 'Full-Stack + AI Integration',
    shortDescription: 'AI-powered analytics platform for business data exploration and real-time reporting.',
    technology: ['Next.js', 'FastAPI', 'PostgreSQL', 'OpenAI', 'LangChain', 'Recharts', 'TypeScript'],
    features: [
      'Natural language querying of business data',
      'Real-time dashboards with 15+ chart types',
      'Role-based access for teams',
      'CSV / PDF data export',
      'Automated weekly email reports',
      'White-label customisation per tenant',
    ],
    challengeText: `The client had years of business data locked inside spreadsheets with no way to explore it in real time. Analysts were spending three hours daily generating reports — error-prone, slow, and blocking strategic decisions.\n\nThey needed non-technical users to ask questions of their data and get answers instantly, without depending on a developer every time.`,
    approachText: `We deep-dived the existing data schema to understand the domain model, then designed a three-layer architecture: FastAPI for data access and AI orchestration, Next.js for interactive dashboards, and a LangChain pipeline that translates natural language into safe, read-only SQL queries.\n\nTwo weeks of prompt engineering and query validation ran before exposing the AI layer — ensuring every generated query was sanitised, scoped to user permissions, and logged for auditing.`,
    solutionText: `Data Insight shipped with a split-pane interface: natural language chat on the left, live chart on the right — updating instantly as you type.\n\nDashboards can be pinned, shared, and scheduled for automated delivery. The AI layer uses RAG over the data dictionary to stay accurate even when schema changes occur.`,
    architectureText: `Serverless Next.js frontend on Vercel, communicating with FastAPI on AWS Lambda. PostgreSQL primary store with a read replica for analytics queries. LangChain orchestrates LLM calls and injects schema context via a retrieval step before each query generation.`,
    resultsText: `Report generation time dropped from 3 hours to under 10 seconds. Analyst dependency on developers fell 80%. The platform handles 2,000+ daily queries across 12 active tenants, with a p95 response time of 1.8 seconds.`,
  },
  {
    _id: 'p2', title: 'SmartDrive X',
    slug: { current: 'smartdrive-x' },
    category: 'Web Application', industry: 'Transport & Logistics',
    timeline: '2 months', role: 'Full-Stack Development',
    shortDescription: 'Full-stack car rental management covering vehicles, bookings, invoices and payments.',
    technology: ['Laravel', 'MySQL', 'Bootstrap', 'Razorpay', 'Alpine.js', 'FPDF', 'Redis'],
    features: [
      'Vehicle fleet management with real-time availability',
      'Online booking with date-range conflict detection',
      'Razorpay payment with automated receipts',
      'PDF invoice generation',
      'Admin dashboard with revenue and utilisation metrics',
      'Customer accounts with booking history',
    ],
    challengeText: `A regional car rental business was managing 40+ vehicles entirely on paper — bookings tracked in spreadsheets, invoices hand-typed, and payment reconciliation taking a full day at month-end. Double-bookings were a regular occurrence, costing both revenue and reputation.`,
    approachText: `We mapped every operational flow before writing code: booking creation, vehicle check-out, return, damage assessment, payment, and invoice dispatch. The conflict-detection algorithm was prototyped and stress-tested in isolation before integration into the booking flow.`,
    solutionText: `SmartDrive X is a single Laravel application with a multi-panel design: a public-facing booking portal and a private operations dashboard. Availability is calculated in real time against a date-range index, and Razorpay webhooks update payment status the moment a transaction completes.`,
    architectureText: `Laravel MVC on a DigitalOcean Droplet, MySQL for primary storage, Redis for sessions and queue workers. Razorpay webhooks processed asynchronously via Laravel Queues, keeping booking confirmation under 400ms.`,
    resultsText: `Double-bookings dropped to zero within the first week. Monthly reconciliation went from a full day to 20 minutes. The business onboarded 3 new vehicle partners within 30 days of launch.`,
  },
  {
    _id: 'p3', title: 'MediMind AI',
    slug: { current: 'medimind-ai' },
    category: 'AI Product', industry: 'Healthcare',
    timeline: '6 weeks', role: 'AI Architecture + Backend',
    shortDescription: 'Local-first AI healthcare assistant using secure APIs and large language models.',
    technology: ['FastAPI', 'Ollama', 'MySQL', 'JWT', 'LangChain', 'React', 'Tailwind CSS'],
    features: [
      'Fully offline LLM inference via Ollama (Mistral 7B)',
      'Symptom triage with structured output parsing',
      'Patient record summarisation',
      'Appointment and medication reminders',
      'Role-based access (doctor / patient / admin)',
      'Audit log for every AI interaction',
    ],
    challengeText: `A private clinic group needed an AI assistant for clinical workflows — but strict data privacy regulations meant patient data could not leave their on-premise network. Every major AI API was off-limits. They needed the intelligence of a large language model with zero cloud dependency.`,
    approachText: `The key technical decision was Ollama as the local inference runtime, running Mistral 7B on the clinic's existing GPU servers. We designed the LangChain pipeline to work entirely within the local network, with structured output parsing ensuring every AI response conformed to a validated schema before reaching clinical staff.`,
    solutionText: `MediMind AI runs entirely on the clinic's hardware — no patient data ever leaves the building. Doctors interact through a clean React interface: type symptoms, receive structured triage output instantly. A full audit log satisfies all compliance requirements.`,
    architectureText: `FastAPI backend on-premise, Ollama serving Mistral 7B on a local GPU node, MySQL for patient and audit data, JWT auth with refresh token rotation. The React frontend communicates only with the local FastAPI instance — no external network calls exist in the production build.`,
    resultsText: `Clinical triage time reduced by 35%. The clinic passed their annual data privacy audit with zero AI-related findings. The solution has since been licensed to two additional clinic branches.`,
  },
  {
    _id: 'p4', title: 'Nexus E-Commerce',
    slug: { current: 'nexus-ecommerce' },
    category: 'E-Commerce', industry: 'Retail',
    timeline: '10 weeks', role: 'Full-Stack + Design',
    shortDescription: 'Headless storefront with ultra-fast page loads and Stripe checkout.',
    technology: ['Next.js', 'Sanity', 'Stripe', 'Tailwind CSS', 'TypeScript', 'Vercel', 'Razorpay'],
    features: [
      'Headless storefront with ISR product pages',
      'Stripe + Razorpay dual-payment support',
      'Real-time inventory management',
      'Wishlist, cart, and promo code system',
      'Order tracking and notification emails',
      'Admin panel for products, orders, and customers',
    ],
    challengeText: `The client's Shopify store was generating six-figure revenue but hitting hard limits: slow mobile load times were tanking conversions, the template was impossible to customise, and the monthly bill was climbing as they added apps. They wanted full ownership of their storefront.`,
    approachText: `We advocated for a headless architecture from day one. By decoupling the frontend (Next.js) from the content/commerce layer (Sanity + custom backend), we could build exactly the UX needed without template constraints. ISR handles catalogue pages so even a 10,000-SKU store loads instantly.`,
    solutionText: `Nexus is a headless store with every page statically generated and revalidated every 60 seconds. The checkout flow is a seamless single-page experience with real-time inventory checks before payment is captured, eliminating overselling.`,
    architectureText: `Next.js frontend on Vercel with ISR, Sanity as the product CMS, lightweight NestJS API for cart/order/inventory logic, PostgreSQL for transactional data, Stripe and Razorpay for payments. Webhook handlers update order status in real time as payment events arrive.`,
    resultsText: `Page load time dropped from 4.2s to 0.8s. Conversion rate improved by 23% in the first month post-launch. The client eliminated significant monthly Shopify app fees, recouping the build cost in under 5 months.`,
  },
  {
    _id: 'p5', title: 'FinanceFlow',
    slug: { current: 'financeflow' },
    category: 'SaaS', industry: 'Fintech',
    timeline: '4 months', role: 'Product + Full-Stack',
    shortDescription: 'Fintech SaaS dashboard for expense tracking and corporate card management.',
    technology: ['React', 'NestJS', 'PostgreSQL', 'Prisma', 'TypeScript', 'Stripe', 'Redis'],
    features: [
      'Multi-user expense submission and approval workflows',
      'Corporate card virtual issuance via Stripe Issuing',
      'Spend categorisation with ML-assisted tagging',
      'Budget allocation and real-time burn-rate tracking',
      'CSV / accounting software export (QuickBooks, Xero)',
      'SSO via Google Workspace',
    ],
    challengeText: `A 50-person startup was using three separate tools — a spreadsheet for expenses, a bank app for cards, and Slack for approvals — creating a fragmented, error-prone process. The finance team spent 15 hours per month reconciling data between systems.`,
    approachText: `We ran a two-week discovery sprint, shadowing the finance team through their month-end process. Every manual step became a feature requirement. The approval workflow was the most nuanced challenge — flexible enough for different department policies while simple enough that employees would actually use it.`,
    solutionText: `FinanceFlow consolidates the entire expense lifecycle: employees submit expenses via a mobile-friendly form, managers approve in one click, cards are issued and spend limits enforced automatically. Finance gets a real-time view of company-wide spending by department, project, and category.`,
    architectureText: `React SPA talking to a NestJS REST API, PostgreSQL with Prisma ORM, Redis for background job queuing. Stripe Issuing and Radar handle card creation and fraud prevention. Multi-tenancy implemented at database level using row-level security policies.`,
    resultsText: `Month-end reconciliation dropped from 15 hours to under 2 hours. Expense policy violations fell by 70% due to automatic limit enforcement. Launched to 50 users and scaled to 200 within 90 days.`,
  },
  {
    _id: 'p6', title: 'FitTrack Pro',
    slug: { current: 'fittrack-pro' },
    category: 'Mobile', industry: 'Health & Fitness',
    timeline: '3 months', role: 'Mobile + Backend Development',
    shortDescription: 'Cross-platform mobile app for workout tracking, nutrition logging, and community challenges.',
    technology: ['React Native', 'Expo', 'Supabase', 'TypeScript', 'React Navigation', 'Reanimated 3'],
    features: [
      'Custom workout builder with 400+ exercise library',
      'Animated workout timer with rest period tracking',
      'Nutrition tracking with macro breakdown',
      'Community challenges with leaderboards',
      'Progress charts with streak tracking',
      'Offline workout logging with background sync',
    ],
    challengeText: `The client wanted to compete in the crowded fitness app market with one differentiator: genuine social accountability. Existing apps had community features bolted on as afterthoughts. They wanted challenges to be a core part of the product loop — not a tab buried in settings.`,
    approachText: `We designed the app with challenges at the centre of navigation. Every workout logged contributes to ongoing team challenges, making each individual action feel connected to a community outcome. Offline-first architecture was the hardest technical problem — users need the app to work perfectly in a gym with no signal.`,
    solutionText: `FitTrack Pro uses Expo for the cross-platform layer and Reanimated 3 for silky 60fps workout animations. All workout data is persisted locally first and synced to Supabase in the background. Challenge leaderboards update in real time via Supabase Realtime subscriptions when connectivity is available.`,
    architectureText: `React Native with Expo, local SQLite via expo-sqlite for offline storage, Supabase for auth and real-time subscriptions. Reanimated 3 drives workout timer animations. Push notifications via Expo Notifications for challenge milestones and rest reminders.`,
    resultsText: `App Store rating of 4.8 after 200 reviews. Day-7 retention of 42% — significantly above the 25% fitness app industry average. Community challenges is the top-cited reason for continued use in app store reviews.`,
  },
];

/* ─────────────────────────────────────────────────────────
   FETCH FUNCTIONS
───────────────────────────────────────────────────────── */


import { REVALIDATE } from '@/sanity/lib/client';

export async function getProjects(): Promise<Project[]> {
  if (!hasSanity) return FALLBACK_PROJECTS;
  const data = await client.fetch<Project[]>(
    `*[_type == "project"] | order(_createdAt desc) {
      _id, title, slug, category, industry, shortDescription, technology, featured
    }`,
    {},
    { next: { revalidate: REVALIDATE.DYNAMIC_CONTENT } }
  );
  return data.length ? data : FALLBACK_PROJECTS;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (!hasSanity) return FALLBACK_PROJECTS.slice(0, 3);
  const data = await client.fetch<Project[]>(
    `*[_type == "project" && featured == true] | order(_createdAt desc)[0...3] {
      _id, title, slug, category, industry, shortDescription, technology
    }`,
    {},
    { next: { revalidate: REVALIDATE.DYNAMIC_CONTENT } }
  );
  return data.length ? data : FALLBACK_PROJECTS.slice(0, 3);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const found = FALLBACK_PROJECTS.find((p) => p.slug.current === slug) ?? null;
  if (!hasSanity) return found;
  const data = await client.fetch<Project | null>(
    `*[_type == "project" && slug.current == $slug][0] {
      _id, title, slug, category, industry, shortDescription,
      "heroImage": heroImage { asset->, alt },
      "gallery": gallery[] { asset->, alt },
      challenge, approach, solution, architecture, results, body,
      features, technology,
      seoTitle, seoDescription
    }`,
    { slug },
    { next: { revalidate: REVALIDATE.DYNAMIC_CONTENT } }
  );
  return data ?? found;
}

export async function getServices(): Promise<Service[]> {
  if (!hasSanity) return FALLBACK_SERVICES;
  const data = await client.fetch<Service[]>(
    `*[_type == "service"] | order(order asc) {
      _id, title, slug, icon, tagline, shortDescription,
      description, whatWeProvide,
      features[]{ title, description },
      technology, order
    }`,
    {},
    { next: { revalidate: REVALIDATE.STATIC_CONTENT } }
  );
  return data.length ? data : FALLBACK_SERVICES;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const found = FALLBACK_SERVICES.find((s) => s.slug.current === slug) ?? null;
  if (!hasSanity) return found;
  const data = await client.fetch<Service | null>(
    `*[_type == "service" && slug.current == $slug][0] {
      _id, title, slug, icon, tagline, shortDescription,
      description, whatWeProvide,
      features[]{ title, description },
      technology, order
    }`,
    { slug },
    { next: { revalidate: REVALIDATE.STATIC_CONTENT } }
  );
  return data ?? found;
}

export const FALLBACK_TEAM: TeamMember[] = [
  {
    _id: 'tm1',
    name: 'Het Soni',
    role: 'Full Stack Developer',
    tagline: 'Architecting scalable systems from database to UI.',
    bio: 'Full-stack engineer focused on React ecosystems, backend architecture, and AI integration. Co-founded HN to build the kind of digital products he wished more businesses could access.',
    skills: ['Next.js', 'React', 'Node.js', 'FastAPI', 'PostgreSQL', 'TypeScript', 'AI/ML'],
    github: 'https://github.com/Hetsoni28',
    displayOrder: 1,
  },
  {
    _id: 'tm2',
    name: 'Neel Patel',
    role: 'Web Developer',
    tagline: 'Turning interfaces into experiences people remember.',
    bio: 'Frontend engineer and UI specialist who cares deeply about performance, accessibility, and design quality. Brings the pixel-perfect execution that makes HN products stand out.',
    skills: ['React', 'Tailwind CSS', 'TypeScript', 'Figma', 'Laravel', 'Motion Design'],
    github: '#',
    displayOrder: 2,
  },
];

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!hasSanity) return FALLBACK_TEAM;
  const data = await client.fetch<TeamMember[]>(
    `*[_type == "teamMember"] | order(displayOrder asc) {
      _id, name, role, tagline, bio,
      "photo": photo { asset->, alt },
      skills, github, linkedin, twitter, displayOrder
    }`,
    {},
    { next: { revalidate: REVALIDATE.STATIC_CONTENT } }
  );
  return data.length ? data : FALLBACK_TEAM;
}

export const FALLBACK_FAQS: Faq[] = [
  {
    _id: 'faq-1',
    question: 'How long does a typical project take?',
    answer: 'A standard web application or SaaS MVP typically takes 6–10 weeks from discovery to deployment. Marketing sites are usually faster (3–5 weeks), while complex enterprise platforms or mobile apps may take 3–4 months.',
  },
  {
    _id: 'faq-2',
    question: 'Do you offer post-launch support and maintenance?',
    answer: 'Absolutely. We offer monthly retainers that cover security updates, performance monitoring, bug fixes, and an allocation of hours for new feature development so your product continues to evolve.',
  },
  {
    _id: 'faq-3',
    question: 'What is your typical technology stack?',
    answer: 'For web applications we prefer Next.js, React, and Tailwind CSS on the frontend, powered by NestJS or Node.js with PostgreSQL on the backend. For content-heavy sites we use Sanity CMS. For mobile we build with React Native and Expo.',
  },
  {
    _id: 'faq-4',
    question: 'Do you design the product or just write the code?',
    answer: 'We handle full-cycle product development — user research, UX architecture, UI design in Figma, and final engineering. Design and engineering should never happen in silos.',
  },
  {
    _id: 'faq-5',
    question: 'How do you handle project pricing?',
    answer: 'We work on fixed-scope projects and monthly retainers. After our free discovery call we send a detailed proposal with clear scope, timeline, and price — no hidden fees.',
  },
  {
    _id: 'faq-6',
    question: 'Can you work with an existing codebase?',
    answer: 'Yes. We regularly join projects mid-way — whether to rescue a legacy codebase, add new features, or refactor for scale. We always start with a codebase audit before committing to a scope.',
  },
];

export async function getFaqs(): Promise<Faq[]> {
  if (!hasSanity) return FALLBACK_FAQS;
  const data = await client.fetch<Faq[]>(
    `*[_type == "faq"] | order(displayOrder asc) {
      _id, question, answer
    }`,
    {},
    { next: { revalidate: REVALIDATE.STATIC_CONTENT } }
  );
  return data.length ? data : FALLBACK_FAQS;
}

/* ─────────────────────────────────────────────────────────
   BLOG / INSIGHTS
───────────────────────────────────────────────────────── */
export type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: SanityImage;
  content?: PortableTextContent;
  author?: { name: string; role?: string; photo?: SanityImage };
  category?: string;
  tags?: string[];
  readTime?: number;
  featured?: boolean;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export const BLOG_CATEGORIES = [
  'All',
  'AI',
  'Web Development',
  'SaaS',
  'Product Development',
  'Technology',
  'HN Updates',
] as const;

export const FALLBACK_POSTS: BlogPost[] = [
  {
    _id: 'bp1',
    title: 'Why Every SaaS Startup Needs an AI-Powered Analytics Layer in 2025',
    slug: { current: 'saas-ai-analytics-2025' },
    excerpt: 'Raw data is noise. Here\'s how embedding an AI analytics layer into your SaaS product turns that noise into decisions — and keeps users from churning.',
    category: 'AI',
    tags: ['AI', 'SaaS', 'Analytics', 'Product'],
    readTime: 7,
    featured: true,
    publishedAt: '2025-09-15T09:00:00Z',
    author: { name: 'Het Soni', role: 'Full Stack Developer' },
  },
  {
    _id: 'bp2',
    title: 'Next.js 15 App Router: What Actually Changed and What It Means for Your Project',
    slug: { current: 'nextjs-15-app-router-changes' },
    excerpt: 'A practical breakdown of the biggest Next.js 15 changes — from the new caching model to Turbopack stability — written for engineers who build production apps.',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'Web Dev'],
    readTime: 9,
    featured: false,
    publishedAt: '2025-08-28T09:00:00Z',
    author: { name: 'Neel Patel', role: 'Web Developer' },
  },
  {
    _id: 'bp3',
    title: 'The SaaS Pricing Page That Actually Converts: Lessons from 12 Products We\'ve Built',
    slug: { current: 'saas-pricing-page-converts' },
    excerpt: 'Pricing pages kill more SaaS deals than bad products do. Here\'s what we\'ve learned from designing and A/B testing pricing for 12 real products.',
    category: 'SaaS',
    tags: ['SaaS', 'Design', 'Conversion', 'Product'],
    readTime: 8,
    featured: false,
    publishedAt: '2025-08-10T09:00:00Z',
    author: { name: 'Het Soni', role: 'Full Stack Developer' },
  },
  {
    _id: 'bp4',
    title: 'From Idea to MVP in 6 Weeks: Our Exact Process',
    slug: { current: 'idea-to-mvp-6-weeks' },
    excerpt: 'No fluff, no consulting jargon. A step-by-step account of how we take a founder\'s idea and turn it into a live, tested product in 6 weeks flat.',
    category: 'Product Development',
    tags: ['Product', 'MVP', 'Process', 'HN'],
    readTime: 11,
    featured: true,
    publishedAt: '2025-07-22T09:00:00Z',
    author: { name: 'Het Soni', role: 'Full Stack Developer' },
  },
  {
    _id: 'bp5',
    title: 'Why We Chose Sanity CMS Over Contentful, Strapi, and Notion for Every New Project',
    slug: { current: 'sanity-cms-vs-alternatives' },
    excerpt: 'We\'ve used them all. Here\'s the honest comparison — and why Sanity consistently wins for client projects that need flexibility without developer friction.',
    category: 'Technology',
    tags: ['CMS', 'Sanity', 'Technology', 'Dev'],
    readTime: 6,
    featured: false,
    publishedAt: '2025-07-05T09:00:00Z',
    author: { name: 'Neel Patel', role: 'Web Developer' },
  },
  {
    _id: 'bp6',
    title: 'HN is Now a Studio: What Changed, What Didn\'t, and What\'s Next',
    slug: { current: 'hn-becomes-studio' },
    excerpt: 'We started as two engineers freelancing nights and weekends. Today we\'re a studio with a clear process, a growing portfolio, and an even clearer vision for what we want to build.',
    category: 'HN Updates',
    tags: ['HN', 'Studio', 'Update'],
    readTime: 4,
    featured: false,
    publishedAt: '2025-06-01T09:00:00Z',
    author: { name: 'Het Soni', role: 'Full Stack Developer' },
  },
];

export async function getPosts(category?: string): Promise<BlogPost[]> {
  if (!hasSanity) {
    if (category && category !== 'All') {
      return FALLBACK_POSTS.filter((p) => p.category === category);
    }
    return FALLBACK_POSTS;
  }
  const filter = category && category !== 'All'
    ? `&& category == $category`
    : '';
  const data = await client.fetch<BlogPost[]>(
    `*[_type == "blogPost" ${filter}] | order(publishedAt desc) {
      _id, title, slug, excerpt, category, tags, readTime, featured, publishedAt,
      "coverImage": coverImage { asset->, alt },
      "author": author-> { name, role, "photo": photo { asset->, alt } },
      seoTitle, seoDescription
    }`,
    category && category !== 'All' ? { category } : {},
    { next: { revalidate: REVALIDATE.DYNAMIC_CONTENT } }
  );
  return data.length ? data : FALLBACK_POSTS;
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  if (!hasSanity) return FALLBACK_POSTS.filter((p) => p.featured);
  const data = await client.fetch<BlogPost[]>(
    `*[_type == "blogPost" && featured == true] | order(publishedAt desc)[0...3] {
      _id, title, slug, excerpt, category, tags, readTime, featured, publishedAt,
      "coverImage": coverImage { asset->, alt },
      "author": author-> { name, role, "photo": photo { asset->, alt } }
    }`,
    {},
    { next: { revalidate: REVALIDATE.DYNAMIC_CONTENT } }
  );
  return data.length ? data : FALLBACK_POSTS.filter((p) => p.featured);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const found = FALLBACK_POSTS.find((p) => p.slug.current === slug) ?? null;
  if (!hasSanity) return found;
  const data = await client.fetch<BlogPost | null>(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      _id, title, slug, excerpt, category, tags, readTime, featured, publishedAt,
      "coverImage": coverImage { asset->, alt },
      content,
      "author": author-> { name, role, "photo": photo { asset->, alt } },
      seoTitle, seoDescription
    }`,
    { slug },
    { next: { revalidate: REVALIDATE.DYNAMIC_CONTENT } }
  );
  return data ?? found;
}

export async function getRelatedPosts(currentId: string, category?: string): Promise<BlogPost[]> {
  if (!hasSanity) {
    return FALLBACK_POSTS
      .filter((p) => p._id !== currentId && p.category === category)
      .slice(0, 3);
  }
  const data = await client.fetch<BlogPost[]>(
    `*[_type == "blogPost" && _id != $currentId && category == $category] | order(publishedAt desc)[0...3] {
      _id, title, slug, excerpt, category, readTime, publishedAt,
      "coverImage": coverImage { asset->, alt },
      "author": author-> { name, role }
    }`,
    { currentId, category: category ?? '' },
    { next: { revalidate: REVALIDATE.DYNAMIC_CONTENT } }
  );
  return data.length
    ? data
    : FALLBACK_POSTS.filter((p) => p._id !== currentId && p.category === category).slice(0, 3);
}


/* --------------- Testimonials --------------- */

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
};

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Arjun Mehta',
    role: 'Founder & CEO',
    company: 'Stackwise Technologies',
    quote:
      'HN Studio transformed our legacy dashboard into a modern SaaS product in just eight weeks. The code quality and attention to performance blew our engineering team away. We went from 4-second load times down to under 800 ms — our retention jumped noticeably the very next month.',
    avatar: '/images/testimonials/arjun.jpg',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'Head of Product',
    company: 'Finledge India',
    quote:
      'We needed a complex multi-tenant web app built quickly without cutting corners on security or UX. HN delivered a fully tested, beautifully designed platform on time and on budget. Their direct communication style meant zero surprises throughout the entire engagement.',
    avatar: '/images/testimonials/priya.jpg',
  },
  {
    id: '3',
    name: 'Rahul Nair',
    role: 'Co-founder',
    company: 'Orbito Health',
    quote:
      'Working with HN Studio felt like having an in-house team that genuinely cared about our product. They rebuilt our patient portal from scratch using Next.js and Supabase, cutting our infrastructure costs by 40 %. The new interface has received overwhelmingly positive feedback from our doctors and patients alike.',
    avatar: '/images/testimonials/rahul.jpg',
  },
  {
    id: '4',
    name: 'Sneha Kulkarni',
    role: 'Director of Operations',
    company: 'GrowCart',
    quote:
      'HN built our entire e-commerce platform with a custom AI-powered recommendation engine in under three months. The site passes Core Web Vitals with flying colours and ranks significantly better than our previous solution. I would not hesitate to recommend them to any serious founder.',
    avatar: '/images/testimonials/sneha.jpg',
  },
];

export async function getTestimonials(): Promise<Testimonial[]> {
  // Sanity integration can be wired up here in a future iteration.
  // For now we always return the curated fallback testimonials.
  return FALLBACK_TESTIMONIALS;
}