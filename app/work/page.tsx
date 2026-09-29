import type { Metadata } from 'next';
import { getProjects } from '@/lib/content';
import { FadeIn } from '@/components/atoms/fade-in';
import { Eyebrow } from '@/components/atoms/eyebrow';
import { BeforeAfterSlider } from '@/components/molecules/before-after-slider';
import { WorkFilter } from './work-filter';

export const metadata: Metadata = {
  title: 'Our Work',
  description: 'Explore our portfolio of scalable web applications, SaaS platforms, and AI solutions.',
};

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <>
      <section className="section bg-[#EEF0FF]">
        <div className="container text-center">
          <FadeIn>
            <Eyebrow>Portfolio</Eyebrow>
            <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Products we&apos;re <span className="gradient-text">proud of.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">
              A collection of our recent work across web applications, SaaS platforms, AI integrations, and high-performance websites.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section bg-slate-50 border-y border-slate-200">
        <div className="container">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center mb-12">
              <Eyebrow>Transformation</Eyebrow>
              <h2 className="text-3xl font-bold mt-4">Drag to compare</h2>
              <p className="mt-4 text-slate-500">See how we transform outdated interfaces into modern, high-converting digital products. Slide to reveal the difference.</p>
            </div>
            <div className="mx-auto max-w-5xl">
              <BeforeAfterSlider 
                beforeImage="/og-image.png"
                afterImage="/hero-mockup.png"
                beforeLabel="Legacy Design"
                afterLabel="HN Studio Redesign"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* WorkFilter is a client component that handles state and displays the grid */}
          <WorkFilter initialProjects={projects} />
        </div>
      </section>
    </>
  );
}
