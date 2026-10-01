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

  const isWebsites = slug === 'websites';
  const heroImages: Record<string, string> = {
    'web-applications': '/service-webapps-hero.png',
    'mobile-applications': '/service-mobileapps-hero.png',
    'ai-solutions': '/service-ai-hero.png',
  };
  const heroImage = heroImages[service.slug.current];

  return (
    <>
      {/* ── 1. Hero ── */}
      {isWebsites ? (
        <section className="relative w-full bg-gradient-to-b from-[#EBF2FF] via-[#F4F7FF] to-[#F8FAFC] border-b border-slate-200/80 overflow-hidden pt-8 pb-12">
          {/* Soft Blurred Ambient Glow Orbs */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <div
              className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[#38A1FF]/20 blur-3xl"
              style={{ transform: 'translate3d(0,0,0)' }}
            />
            <div
              className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#00D2FF]/15 blur-3xl"
              style={{ transform: 'translate3d(0,0,0)' }}
            />
            <div
              className="absolute left-1/2 top-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-[#0051FF]/10 blur-3xl"
              style={{ transform: 'translate3d(0,0,0)' }}
            />
          </div>

          <div className="container relative z-10">
            <FadeIn>
              <Breadcrumb label={service.title} className="mb-6" />

              <div className="flex flex-col items-start gap-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0051FF]/25 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#0051FF] shadow-sm backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[#0051FF] animate-pulse" />
                  Websites & Platforms
                </div>

                <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
                  Fast, modern websites built to{' '}
                  <span className="bg-gradient-to-r from-[#0051FF] via-[#0070F3] to-[#00D2FF] bg-clip-text text-transparent">
                    convert.
                  </span>
                </h1>

                <p className="max-w-2xl text-base font-medium text-slate-600 sm:text-lg md:text-xl leading-relaxed">
                  A great website is your most powerful sales and trust-building tool. We build marketing sites, corporate portals, and content platforms with Core Web Vitals ≥ 90 and sub-2s load times.
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Button href="/contact" variant="primary" className="shadow-lg shadow-blue-500/30">
                    Start Your Project →
                  </Button>
                  <Button href="/estimate" variant="secondary">
                    Estimate Cost
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Panoramic Artwork Showcase Frame (Ultra-Sharp 4K Serving) */}
          <div className="relative w-full max-w-[1920px] mx-auto overflow-hidden px-4 sm:px-6 lg:px-8 mt-10">
            <FadeIn delay={0.15}>
              <div className="relative w-full overflow-hidden rounded-3xl border border-white/90 bg-gradient-to-b from-white via-white to-[#F0F4FF] p-2 shadow-[0_20px_60px_-15px_rgba(0,81,255,0.18)] transition-all duration-500 hover:shadow-[0_25px_70px_-15px_rgba(0,81,255,0.25)]">
                <Image
                  src="/images/websites-hero.png"
                  alt="HN Studio Websites & Platforms Hero Artwork"
                  width={2560}
                  height={1096}
                  priority
                  fetchPriority="high"
                  unoptimized
                  style={{ imageRendering: '-webkit-optimize-contrast', transform: 'translate3d(0,0,0)' }}
                  className="w-full h-auto object-cover block rounded-2xl contrast-[1.03] brightness-[1.01]"
                />
              </div>
            </FadeIn>
          </div>

          {/* Feature Badges Bar */}
          <div className="container relative z-10 mt-8">
            <FadeIn delay={0.2}>
              <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4">
                {[
                  { icon: '🌐', label: 'Custom Design — No Templates' },
                  { icon: '⚡', label: 'Lighthouse Score 99/100' },
                  { icon: '✏️', label: 'Sanity CMS Integration' },
                  { icon: '📈', label: 'SEO Growth +320%' },
                  { icon: '🚀', label: 'Sub-2s Load Speed' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/95 backdrop-blur-md px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition hover:border-[#0051FF]/40 hover:bg-[#EEF0FF] hover:text-[#0051FF] hover:scale-105"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      ) : heroImage ? (
        <section className="relative section overflow-hidden min-h-[50vh] flex flex-col justify-center py-20">
          <div className="absolute inset-0 -z-20">
            <Image
              src={heroImage}
              alt={`${service.title} Background`}
              fill
              className="object-cover object-center"
              priority
            />
            {/* Clean gradient overlay */}
            <div className="absolute inset-0 bg-[#EEF0FF]/40"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#EEF0FF] via-[#EEF0FF]/80 to-[#EEF0FF]/10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#EEF0FF]/60 via-transparent to-[#EEF0FF]"></div>
          </div>
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
      ) : (
        <section className="section bg-[#EEF0FF]">
          <div className="container">
            <FadeIn>
              <Breadcrumb label={service.title} className="mb-6" />
              <div className="mt-5 flex items-center gap-5">
                {service.icon !== undefined && (
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#0051FF] shadow-sm">
                    <ServiceIcon slug={service.slug.current} />
                  </div>
                )}
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">{service.title}</h1>
                  {service.tagline && (
                    <p className="mt-2 text-base text-slate-500 sm:text-lg">{service.tagline}</p>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

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
