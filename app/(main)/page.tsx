import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'HN Tech — Best Tech Company for Web Development & Digital Services',
  description: 'Looking for the best tech company for all development? HN Tech delivers top-tier custom web development, SaaS platforms, mobile applications, and AI digital services worldwide.',
  keywords: [
    'best tech company for all development',
    'best web development company',
    'best digital services company',
    'custom software development company',
    'SaaS platform development',
    'mobile app development company',
    'full stack developers India',
    'Next.js development company',
  ],
  openGraph: {
    title: 'HN Tech — Best Tech Company for Web Development & Digital Services',
    description: 'Looking for the best tech company for all development? HN Tech delivers top-tier custom web development, SaaS platforms, mobile applications, and AI digital services worldwide.',
    url: 'https://www.hntech.in',
    type: 'website',
  },
};

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
