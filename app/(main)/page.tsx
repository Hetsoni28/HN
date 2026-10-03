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

export const metadata: Metadata = {
  title: 'HN \u2014 Building Digital Products From Ideas to Scale',
  description: 'HN is a digital product studio. We design and develop modern websites, applications, AI solutions, SaaS platforms, and custom software for businesses and ambitious ideas.',
  openGraph: {
    title: 'HN \u2014 Building Digital Products From Ideas to Scale',
    description: 'HN is a digital product studio. We design and develop modern websites, applications, AI solutions, SaaS platforms, and custom software for businesses and ambitious ideas.',
    url: 'https://hn.studio',
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
