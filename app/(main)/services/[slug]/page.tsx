import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getServiceBySlug, getServices } from '@/lib/content';
import { FadeIn } from '@/components/atoms/fade-in';
import { Button } from '@/components/atoms/button';
import { ServiceIcon } from '@/components/atoms/service-icon';
import { Breadcrumb } from '@/components/molecules/breadcrumb';
import { WhatsAppButton } from '@/components/atoms/whatsapp-button';

/* ── ISR — rebuild every 24 hours ── */
export const revalidate = 86400;

/* ── Static params for all 11 services ── */
export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug.current }));
}

/* ── SEO metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: 'Service not found' };
  return {
    title: service.title,
    description: service.tagline ?? service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const heroImages: Record<string, string> = {
    'websites': '/service-websites-hero.jpg',
    'web-applications': '/service-webapps-hero.png',
    'mobile-applications': '/service-mobileapps-hero.png',
  };
  const heroImage = heroImages[service.slug.current];

  return (
    <>
      {/* ── 1. Hero ── */}
      <section className={`relative section overflow-hidden ${heroImage ? 'min-h-[50vh] flex flex-col justify-center py-20' : 'bg-[#EEF0FF]'}`}>
        {heroImage && (
          <div className="absolute inset-0 -z-20">
            <Image
              src={heroImage}
              alt={`${service.title} Background`}
              fill
              className="object-cover object-center"
              priority
            />
            {/* Clean gradient overlay: solid on the left behind the text, fading to show the image on the right */}
            <div className="absolute inset-0 bg-[#EEF0FF]/40"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#EEF0FF] via-[#EEF0FF]/80 to-[#EEF0FF]/10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#EEF0FF]/60 via-transparent to-[#EEF0FF]"></div>
          </div>
        )}
        <div className="container relative z-10">
          <FadeIn>
            <Breadcrumb label={service.title} className="mb-6" />
            <div className="mt-5 flex items-center gap-5">
              {service.icon !== undefined && (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm text-[#0051FF] shadow-sm">
                  <ServiceIcon slug={service.slug.current} />
                </div>
              )}
              <div className="max-w-2xl">
                <h1 className="text-3xl font-bold text-slate-900 drop-shadow-sm sm:text-4xl md:text-5xl">{service.title}</h1>
                {service.tagline && (
                  <p className="mt-3 text-base font-medium text-slate-800 drop-shadow-sm sm:text-lg">{service.tagline}</p>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 2. What it is ── */}
      {service.description && (
        <section className="section">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
              <FadeIn>
                <p className="mt-5 text-xl leading-9 text-slate-700">{service.description}</p>
              </FadeIn>

              {/* Quick-facts panel */}
              <FadeIn delay={0.15}>
                <div className="rounded-2xl border border-[#E2E5F1] bg-[#EEF0FF] p-6">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#0051FF]">Quick facts</div>
                  <div className="mt-4 space-y-3 text-sm text-slate-600">
                    {service.technology?.slice(0, 4).map((t) => (
                      <div key={t} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#0051FF]" />
                        {t}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 space-y-3">
                    <Button href="/contact" variant="primary" fullWidth>
                      Start this project →
                    </Button>
                    <WhatsAppButton 
                      message={`Hi HN Studio, I'm interested in your ${service.title} services.`} 
                      fullWidth 
                    />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      )}

      {/* ── 3. What HN Provides ── */}
      {service.whatWeProvide && service.whatWeProvide.length > 0 && (
        <section className="section bg-[#EEF0FF]">
          <div className="container">
            <FadeIn>
              <h2 className="mt-5 text-3xl font-bold md:text-4xl">Our deliverables for this service.</h2>
            </FadeIn>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {service.whatWeProvide.map((item, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <div className="flex items-start gap-4 rounded-xl bg-white p-5 border border-[#E2E5F1]">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0051FF] text-xs font-bold text-white">
                      ✓
                    </div>
                    <span className="text-sm font-medium leading-6 text-slate-700">{item}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. Features ── */}
      {service.features && service.features.length > 0 && (
        <section className="section">
          <div className="container">
            <FadeIn>
              <h2 className="mt-5 text-3xl font-bold md:text-4xl">What you get.</h2>
            </FadeIn>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {service.features.map((f, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-[#E2E5F1] bg-white p-6">
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF0FF]">
                      <span className="text-sm font-bold text-[#0051FF]">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{f.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{f.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. Technology ── */}
      {service.technology && service.technology.length > 0 && (
        <section className="section bg-[#EEF0FF]">
          <div className="container">
            <FadeIn>
              <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                Stack we use for {service.title}.
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                {service.technology.map((t) => (
                  <span
                    key={t}
                    className="rounded-xl border border-[#E2E5F1] bg-white px-5 py-2.5 text-sm font-semibold text-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── 6. CTA ── */}
      <section className="section">
        <div className="container">
          <FadeIn>
            <div className="rounded-3xl bg-[#0051FF] px-8 py-16 text-center text-white md:px-20">
              <div className="absolute left-1/3 top-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
              <h2 className="relative text-3xl font-bold sm:text-4xl md:text-5xl">
                Ready to build your{' '}
                <span className="text-[#00D2FF]">{service.title.toLowerCase()}?</span>
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-base text-white/80 sm:mt-5 sm:text-lg">
                Tell us your idea. We&apos;ll send you a clear plan and proposal within 48 hours.
              </p>
              <div className="relative mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  href="/contact"
                  className="w-full bg-white px-10 py-4 text-base font-bold text-[#0051FF] hover:bg-blue-50 sm:w-auto"
                >
                  Get a Free Proposal →
                </Button>
                <Button
                  href="/work"
                  className="w-full border border-white/30 bg-transparent px-10 py-4 text-base text-white hover:border-white/60 hover:bg-white/10 sm:w-auto"
                >
                  View related work
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
