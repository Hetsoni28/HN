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
  title: {
    absolute: 'HN Tech — Best Tech Company for Web Development',
  },
  description:
    'HN Tech is the best tech company for all development: custom websites, SaaS platforms, mobile apps, and scalable AI digital services for businesses.',
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
  alternates: {
    canonical: 'https://www.hntech.in',
  },
  openGraph: {
    title: 'HN Tech — Best Tech Company for Web Development',
    description:
      'HN Tech is the best tech company for all development: custom websites, SaaS platforms, mobile apps, and scalable AI digital services for businesses.',
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
