import type { Metadata } from 'next';
import { getFeaturedProjects, getFaqs, getTestimonials } from '@/lib/content';

import { HeroSection }     from '@/components/organisms/hero-section';
import { WhatWeBuild }     from '@/components/organisms/what-we-build';
import { FeaturedWork }    from '@/components/organisms/featured-work';
import { TransformationSection } from '@/components/organisms/transformation-section';
import { WhyHN }           from '@/components/organisms/why-hn';
import { TestimonialsSection } from '@/components/organisms/testimonials-section';
import { ServicesSection } from '@/components/organisms/services-section';
import { OffersStrip }    from '@/components/organisms/offers-strip';
import { ProcessSection }  from '@/components/organisms/process-section';
import { TechSection }     from '@/components/organisms/tech-section';
import { AboutSection }    from '@/components/organisms/about-section';
import { FaqSection }      from '@/components/organisms/faq-section';
import { FinalCta }        from '@/components/organisms/final-cta';
import { Marquee }         from '@/components/molecules/marquee';
import { GithubActivity } from '@/components/organisms/github-activity';

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
  const [projects, faqs, testimonials] = await Promise.all([
    getFeaturedProjects(),
    getFaqs(),
    getTestimonials(),
  ]);

  return (
    <>
      <HeroSection />
      <Marquee items={marqueeItems} />
      <WhatWeBuild />
      <FeaturedWork projects={projects} />
      <TransformationSection />
      <WhyHN />
      <TestimonialsSection testimonials={testimonials} />
      <OffersStrip />
      <ServicesSection />
      <ProcessSection />
      <TechSection />
      <AboutSection />
      <FaqSection faqs={faqs} />
      <GithubActivity />
      <FinalCta />
    </>
  );
}
