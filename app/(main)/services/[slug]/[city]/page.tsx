import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CITIES, SERVICES_LIST, getCityName, getServiceName, getCanonicalServiceSlug } from '@/lib/locations';
import { FadeIn } from '@/components/atoms/fade-in';
import { Button } from '@/components/atoms/button';

/* ── Static generation for all 50 combinations ── */
export function generateStaticParams() {
  const params: { slug: string; city: string }[] = [];
  for (const service of SERVICES_LIST) {
    for (const city of CITIES) {
      params.push({ slug: service.slug, city: city.slug });
    }
  }
  return params;
}

/* ── SEO metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}): Promise<Metadata> {
  const { slug, city } = await params;

  const serviceName = getServiceName(slug);
  const cityName    = getCityName(city);

  const cityData = CITIES.find((c) => c.slug === city);
  if (!cityData || !SERVICES_LIST.find((s) => s.slug === slug)) {
    return { title: 'Page not found' };
  }

  const title       = `${serviceName} in ${cityName} | HN`;
  const description =
    `HN Studio delivers expert ${serviceName} in ${cityName}, ${cityData.state}. ` +
    `We build fast, scalable, production-ready products — on time and on budget. ` +
    `Get a free proposal within 48 hours.`;

  return {
    title,
    description,
    keywords: [
      `${serviceName.toLowerCase()} in ${cityName}`,
      `${serviceName.toLowerCase()} company ${cityName}`,
      `${serviceName.toLowerCase()} agency ${cityName}`,
      `${serviceName.toLowerCase()} ${cityData.state}`,
      `hire ${serviceName.toLowerCase()} ${cityName}`,
      'HN Studio',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
    },
    alternates: {
      canonical: `/services/${slug}/${city}`,
    },
  };
}

/* ── Benefit cards data ── */
const BENEFITS = [
  {
    icon: '⚡',
    title: 'Senior engineers, not juniors',
    description:
      'Every line of code is written by experienced engineers with production track records — no hand-offs to trainees.',
  },
  {
    icon: '📦',
    title: 'Fixed-scope, transparent pricing',
    description:
      'We quote a clear price before we start. No surprise invoices, no scope creep — just honest, predictable delivery.',
  },
  {
    icon: '🚀',
    title: 'Faster time-to-market',
    description:
      'Our streamlined process means your MVP or feature ships in weeks, not months — so you start getting ROI sooner.',
  },
];

/* ── Page ── */
export default async function ServiceCityPage({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}) {
  const { slug, city } = await params;

  const cityData    = CITIES.find((c) => c.slug === city);
  const serviceData = SERVICES_LIST.find((s) => s.slug === slug);

  if (!cityData || !serviceData) notFound();

  const serviceName = serviceData.name;
  const cityName    = cityData.name;
  const canonicalSlug = getCanonicalServiceSlug(slug);

  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="section bg-[#EEF0FF]">
        <div className="container">
          <FadeIn>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="hover:text-[#0051FF]">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-[#0051FF]">Services</Link>
              <span>/</span>
              <Link href={`/services/${canonicalSlug}`} className="hover:text-[#0051FF]">{serviceName}</Link>
              <span>/</span>
              <span className="font-medium text-slate-800">{cityName}</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full bg-[#0051FF]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0051FF]">
              {cityData.state} · India
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
              {serviceName}{' '}
              <span className="text-[#0051FF]">in {cityName}</span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Partner with HN Studio — a product-focused digital agency — to build
              world-class {serviceName.toLowerCase()} solutions right here in {cityName}.
              We combine deep technical expertise with sharp business thinking to
              deliver software that actually moves the needle.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="primary">
                Get a Free Proposal →
              </Button>
              <Button href={`/services/${canonicalSlug}`} variant="secondary">
                View {serviceName} details
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 2. Why HN vs local agency ── */}
      <section className="section">
        <div className="container">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Why hire HN instead of a local{' '}
              <span className="text-[#0051FF]">{cityName}</span> agency?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
              Most agencies in {cityName} promise the world, then hand your project
              to junior developers. Here&apos;s how we&apos;re different.
            </p>
          </FadeIn>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <FadeIn key={b.title} delay={i * 0.1}>
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-[#E2E5F1] bg-white p-7 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF0FF] text-2xl">
                    {b.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{b.title}</h3>
                  <p className="text-sm leading-6 text-slate-500">{b.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Services offered ── */}
      <section className="section bg-[#EEF0FF]">
        <div className="container">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              {serviceName} services we offer in {cityName}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
              Whether you&apos;re a startup or an established business in {cityName}, our
              end-to-end {serviceName.toLowerCase()} offering covers everything you need.
            </p>
          </FadeIn>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              `Custom ${serviceName} strategy & architecture`,
              'UI / UX design & prototyping',
              'Full-stack engineering & API development',
              'Quality assurance & performance testing',
              'Cloud deployment & DevOps',
              'Ongoing maintenance & support',
            ].map((item, i) => (
              <FadeIn key={item} delay={i * 0.06}>
                <div className="flex items-start gap-4 rounded-xl border border-[#E2E5F1] bg-white p-5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0051FF] text-xs font-bold text-white">
                    ✓
                  </div>
                  <span className="text-sm font-medium leading-6 text-slate-700">{item}</span>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Other cities we serve */}
          <FadeIn delay={0.2}>
            <div className="mt-12 rounded-2xl border border-[#E2E5F1] bg-white p-6">
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-[#0051FF]">
                Also serving
              </p>
              <div className="flex flex-wrap gap-2">
                {CITIES.filter((c) => c.slug !== city).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/services/${slug}/${c.slug}`}
                    className="rounded-lg border border-[#E2E5F1] px-4 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:border-[#0051FF] hover:text-[#0051FF]"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 4. CTA ── */}
      <section className="section relative overflow-hidden bg-[#0051FF] text-white">
        <div className="pointer-events-none absolute left-1/4 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="container relative z-10">
          <FadeIn>
            <div className="px-8 py-8 text-center md:px-20">
              <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                Ready to build in{' '}
                <span className="text-[#00D2FF]">{cityName}?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:mt-5 sm:text-lg">
                Tell us what you need. We&apos;ll send you a clear plan and proposal
                within 48 hours — no strings attached.
              </p>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
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
                  View our work
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
