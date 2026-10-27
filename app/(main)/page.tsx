import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { getFeaturedProjects, getFaqs, getTestimonials } from '@/lib/content';

import { HeroSection }        from '@/components/organisms/hero-section';
import { TrustBar }           from '@/components/organisms/trust-bar';
import { WhatWeBuild }        from '@/components/organisms/what-we-build';
import { FeaturedWork }       from '@/components/organisms/featured-work';
import { WhyHN }              from '@/components/organisms/why-hn';
import { ServicesSection }    from '@/components/organisms/services-section';
import { ProcessSection }     from '@/components/organisms/process-section';
import { TechSection }        from '@/components/organisms/tech-section';
import { AboutSection }       from '@/components/organisms/about-section';
import { TestimonialsSection } from '@/components/organisms/testimonials-section';
import { FaqSection }         from '@/components/organisms/faq-section';
import { FinalCta }           from '@/components/organisms/final-cta';
import { GithubActivity }     from '@/components/organisms/github-activity';

import { FAQPageJsonLd }       from '@/components/molecules/structured-data';

export const metadata: Metadata = pageMetadata({
  title: { absolute: 'Web & App Development Company in India | HN Tech' },
  description:
    'HN Tech is a web and app development company in India building custom websites, web apps, SaaS platforms, mobile apps and AI solutions for businesses.',
  path: '/',
  keywords: [
    'web development company in India',
    'app development company in India',
    'custom software development company',
    'website development services',
    'SaaS development company',
    'mobile app development company',
    'AI development services',
    'Next.js development company',
  ],
});

export default async function Home() {
  const [projects, faqs, testimonials] = await Promise.all([
    getFeaturedProjects(),
    getFaqs(),
    getTestimonials(),
  ]);

  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <HeroSection />
      <TrustBar />
      <WhatWeBuild />
      <FeaturedWork projects={projects} />
      <WhyHN />
      <ServicesSection />
      <ProcessSection />
      <TechSection />
      <AboutSection />
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection faqs={faqs} />
      <GithubActivity />
      <FinalCta />
    </>
  );
}
