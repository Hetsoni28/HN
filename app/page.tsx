import type { Metadata } from 'next';
import { getFeaturedProjects, getFaqs } from '@/lib/content';

import { HeroSection }     from '@/components/organisms/hero-section';
import { WhatWeBuild }     from '@/components/organisms/what-we-build';
import { FeaturedWork }    from '@/components/organisms/featured-work';
import { WhyHN }           from '@/components/organisms/why-hn';
import { ServicesSection } from '@/components/organisms/services-section';
import { ProcessSection }  from '@/components/organisms/process-section';
import { TechSection }     from '@/components/organisms/tech-section';
import { AboutSection }    from '@/components/organisms/about-section';
import { FaqSection }      from '@/components/organisms/faq-section';
import { FinalCta }        from '@/components/organisms/final-cta';
import { Marquee }         from '@/components/molecules/marquee';

export const metadata: Metadata = {
  title: 'HN Studio — Digital Product Studio',
  description: 'HN is a two-person digital product studio building websites, web apps, SaaS platforms, mobile apps, and AI solutions for ambitious businesses.',
  openGraph: {
    title: 'HN Studio — Digital Product Studio',
    description: 'HN is a two-person digital product studio building websites, web apps, SaaS platforms, mobile apps, and AI solutions for ambitious businesses.',
    url: 'https://hn.studio',
    type: 'website',
  },
};

const marqueeItems = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js',
  'FastAPI', 'PostgreSQL', 'Supabase', 'Sanity CMS', 'AI & LLMs',
  'Docker', 'AWS', 'Vercel', 'Stripe', 'React Native',
];

export default async function Home() {
  const [projects, faqs] = await Promise.all([
    getFeaturedProjects(),
    getFaqs(),
  ]);

  return (
    <>
      <HeroSection />
      <Marquee items={marqueeItems} />
      <WhatWeBuild />
      <FeaturedWork projects={projects} />
      <WhyHN />
      <ServicesSection />
      <ProcessSection />
      <TechSection />
      <AboutSection />
      <FaqSection faqs={faqs} />
      <FinalCta />
    </>
  );
}
