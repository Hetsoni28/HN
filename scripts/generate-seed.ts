import fs from 'fs';
import path from 'path';

process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'zpuvaooc';
process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';

import {
  FALLBACK_SERVICES,
  FALLBACK_PROJECTS,
  FALLBACK_TEAM,
  FALLBACK_POSTS,
} from '../lib/content';

const seedFile = path.join(process.cwd(), 'seed.ndjson');

const docs: Record<string, unknown>[] = [];

// 1. Services
FALLBACK_SERVICES.forEach((service, index) => {
  docs.push({
    _type: 'service',
    _id: `service-${service.slug.current}`,
    title: service.title,
    slug: { _type: 'slug', current: service.slug.current },
    icon: service.icon,
    tagline: service.tagline,
    shortDescription: service.shortDescription,
    description: service.description,
    whatWeProvide: service.whatWeProvide,
    features: service.features?.map(f => ({
      _key: Math.random().toString(36).substring(7),
      title: f.title,
      description: f.description,
    })),
    technology: service.technology,
    order: service.order || index + 1,
  });
});

// 2. Projects
FALLBACK_PROJECTS.forEach((project) => {
  docs.push({
    _type: 'project',
    _id: `project-${project.slug.current}`,
    title: project.title,
    slug: { _type: 'slug', current: project.slug.current },
    category: project.category,
    industry: project.industry,
    featured: project.featured,
    shortDescription: project.shortDescription,
    features: project.features,
    technology: project.technology,
    challengeText: project.challengeText,
    approachText: project.approachText,
    solutionText: project.solutionText,
    architectureText: project.architectureText,
    resultsText: project.resultsText,
    timeline: project.timeline,
    role: project.role,
    liveUrl: project.liveUrl,
    seoTitle: project.seoTitle,
    seoDescription: project.seoDescription,
  });
});

// 3. Team
FALLBACK_TEAM.forEach((member) => {
  docs.push({
    _type: 'teamMember',
    _id: `team-${member.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: member.name,
    role: member.role,
    tagline: member.tagline,
    bio: member.bio,
    skills: member.skills,
    github: member.github,
    linkedin: member.linkedin,
    twitter: member.twitter,
    displayOrder: member.displayOrder,
  });
});

// 4. Blog Posts
FALLBACK_POSTS.forEach((post) => {
  let authorRef = 'team-het-soni';
  if (post.author?.name === 'Neel Patel') authorRef = 'team-neel-patel';

  docs.push({
    _type: 'blogPost',
    _id: `blog-${post.slug.current}`,
    title: post.title,
    slug: { _type: 'slug', current: post.slug.current },
    category: post.category,
    excerpt: post.excerpt,
    readTime: post.readTime,
    publishedAt: post.publishedAt,
    featured: post.featured,
    tags: post.tags,
    author: {
      _type: 'reference',
      _ref: authorRef,
    }
  });
});

// 5. Site Settings
docs.push({
  _type: 'siteSettings',
  _id: 'siteSettings',
  title: 'HN Studio',
  description: 'A digital product studio founded by Het Soni and Neel Patel.',
  contactEmail: 'het@hn.studio',
  githubUrl: 'https://github.com/Hetsoni28',
});

// 6. FAQs
const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "A standard web application or SaaS MVP typically takes 6-10 weeks from discovery to deployment. Marketing sites are usually faster (3-5 weeks), while complex enterprise platforms or mobile apps may take 3-4 months."
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer: "Absolutely. We offer monthly retainers that cover security updates, performance monitoring, bug fixes, and an allocation of hours for new feature development to ensure your product continues to evolve."
  },
  {
    question: "What is your typical technology stack?",
    answer: "For web applications, we prefer Next.js, React, and Tailwind CSS on the frontend, powered by NestJS, Node.js, and PostgreSQL on the backend. For content-heavy sites, we use Sanity CMS. For mobile, we build with React Native and Expo."
  },
  {
    question: "Do you design the product or just write the code?",
    answer: "We handle full-cycle product development. This includes user research, UX architecture, UI design in Figma, and the final technical implementation. We believe design and engineering shouldn't happen in silos."
  }
];

faqs.forEach((faq, i) => {
  docs.push({
    _type: 'faq',
    _id: `faq-${i+1}`,
    question: faq.question,
    answer: faq.answer,
    displayOrder: i + 1,
  });
});

const ndjson = docs.map((doc) => JSON.stringify(doc)).join('\n');
fs.writeFileSync(seedFile, ndjson, 'utf8');

console.log(`Generated seed file with ${docs.length} documents at ${seedFile}`);
