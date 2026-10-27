import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Image from 'next/image';
import { getProjects } from '@/lib/content';
import { FadeIn } from '@/components/atoms/fade-in';
import { TransformationSection } from '@/components/organisms/transformation-section';
import { WorkFilter } from './work-filter';

export const metadata: Metadata = pageMetadata({
  title: 'Portfolio — Web, SaaS & AI Case Studies',
  description:
    'See HN Tech case studies: custom web applications, SaaS platforms, e-commerce websites and AI products, with the stack, timeline and results of each.',
  path: '/work',
});

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <>
      <section className="relative section overflow-hidden min-h-[60vh] flex flex-col justify-center">
        {/* Background Image with Next.js Image for optimization */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/work-hero.jpg"
            alt="Websites, web apps and mobile apps built by HN Tech shown on laptop, phone and monitors"
            fill
            className="object-cover object-center"
            priority
           sizes="100vw" />
          {/* Clean gradient overlay: no blur, ensures text is readable while keeping the image crisp */}
          <div className="absolute inset-0 bg-[#EEF0FF]/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#EEF0FF]/90 via-transparent to-[#EEF0FF]"></div>
        </div>

        <div className="container relative z-10 text-center py-16">
          <FadeIn>
            <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl text-slate-900 drop-shadow-sm">
              Products we&apos;re <span className="gradient-text">proud of.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-800 font-medium drop-shadow-sm">
              A collection of our recent work across web applications, SaaS platforms, AI integrations, and high-performance websites.
            </p>
          </FadeIn>
        </div>
      </section>

      <TransformationSection />

      <section className="section">
        <div className="container">
          <WorkFilter initialProjects={projects} />
        </div>
      </section>
    </>
  );
}
