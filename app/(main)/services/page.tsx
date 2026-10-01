import Link from 'next/link';
import type { Metadata } from 'next';
import { getServices } from '@/lib/content';
import { FadeIn } from '@/components/atoms/fade-in';
import { Button } from '@/components/atoms/button';
import { ServiceIcon } from '@/components/atoms/service-icon';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Full-stack digital services — websites, web apps, mobile, AI, SaaS, and more from HN.',
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      {/* ── Hero ── */}
      <section className="section bg-[#EEF0FF]">
        <div className="container text-center">
          <FadeIn>
            <h1 className="mx-auto mt-5 max-w-3xl text-5xl font-bold leading-tight md:text-6xl">
              Everything you need to go from{' '}
              <span className="gradient-text">idea to launch.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">
              HN covers the full stack — strategy, design, engineering, and support.
              Pick the service you need or let us scope the right solution for your goals.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Service cards grid ── */}
      <section className="section">
        <div className="container">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <FadeIn key={service._id} delay={i * 0.05}>
                <Link
                  href={`/services/${service.slug.current}`}
                  className="group flex h-full flex-col rounded-2xl border border-[#E2E5F1] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#0051FF]/30 hover:shadow-xl hover:shadow-[#0051FF]/8"
                >
                  {/* Icon */}
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#0051FF]">
                    <ServiceIcon slug={service.slug.current} />
                  </div>

                  {/* Number */}
                  <div className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-slate-900 transition group-hover:text-[#0051FF]">
                    {service.title}
                  </h2>

                  {/* Tagline */}
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">
                    {service.tagline || service.shortDescription || ''}
                  </p>

                  {/* Arrow */}
                  <div className="mt-5 flex items-center gap-1 text-sm font-bold text-[#0051FF] opacity-0 transition group-hover:opacity-100">
                    Learn more
                    <svg className="h-4 w-4 translate-x-0 transition group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="section bg-[#EEF0FF]">
        <div className="container text-center">
          <FadeIn>
            <h2 className="text-4xl font-bold">Not sure which service you need?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
              Describe your idea and we&apos;ll recommend the right approach, tech stack, and scope.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="primary" className="px-8 py-4">
                Talk to Het &amp; Neel →
              </Button>
              <Button href="/work" variant="secondary" className="px-8 py-4">
                See our work first
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
