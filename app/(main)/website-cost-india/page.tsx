import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calculator, Check } from 'lucide-react';
import { pageMetadata, SITE_URL } from '@/lib/seo';
import { PROJECT_BASES, FEATURES, TIMELINES, formatINR, calculateEstimate } from '@/lib/estimator';
import { PLANS } from '@/lib/maintenance-plans';
import { Breadcrumb } from '@/components/molecules/breadcrumb';
import { Eyebrow } from '@/components/atoms/eyebrow';
import { FadeIn } from '@/components/atoms/fade-in';
import { FAQPageJsonLd, BreadcrumbJsonLd } from '@/components/molecules/structured-data';

export const metadata: Metadata = pageMetadata({
  title: 'Website Development Cost in India (2026 Guide)',
  description:
    'How much does a website, web app, e-commerce store or mobile app cost in India? Our real price ranges, add-on costs, worked examples and what changes the price.',
  path: '/website-cost-india',
  keywords: [
    'website development cost in India',
    'website cost in India',
    'how much does a website cost in India',
    'e-commerce website cost India',
    'web app development cost India',
    'mobile app development cost India',
  ],
});

/* All prices below come from lib/estimator.ts and lib/maintenance-plans.ts — update them there. */

const range = (min: number, max: number) => `${formatINR(min)} – ${formatINR(max)}`;
const website = PROJECT_BASES.find((b) => b.id === 'website')!;
const rush = TIMELINES.find((t) => t.id === 'rush')!;
const rushPct = Math.round((rush.multiplier - 1) * 100);

const EXAMPLES = [
  { title: 'Business website', who: 'A clinic, studio, school or local service business', base: 'website', features: ['design', 'seo'] },
  { title: 'Online store', who: 'A brand selling products online with its own checkout', base: 'ecommerce', features: ['design', 'payments', 'admin'] },
  { title: 'SaaS / web app MVP', who: 'A startup launching its first version', base: 'webapp', features: ['design', 'auth', 'payments', 'admin'] },
  { title: 'Mobile app', who: 'An iOS and Android app with user accounts', base: 'mobile', features: ['design', 'auth'] },
].map((ex) => ({ ...ex, est: calculateEstimate(ex.base, ex.features, 'flexible') }));

const DRIVERS = [
  { title: 'Number of pages and features', body: 'A 5-page site and a 40-page site are different projects. Every extra feature (accounts, payments, an admin panel) adds design, build and testing time.' },
  { title: 'Custom design vs a starting template', body: 'A design made for your brand takes longer than adapting an existing layout, but it is what makes a site stand out.' },
  { title: 'Content and copy', body: 'Projects move faster, and cost less, when your text, photos and product details are ready before we start.' },
  { title: 'Integrations', body: 'Connecting payment gateways, CRMs, ERPs or other software adds work, especially when the other system is old or poorly documented.' },
  { title: 'Timeline', body: `A normal schedule costs the base price. A rush deadline needs dedicated overtime and adds about ${rushPct}%.` },
  { title: 'Support after launch', body: 'Hosting, updates, backups and fixes are ongoing. Plan for them from the start so the site stays fast and secure.' },
];

const SAVE = [
  'Start with a focused first version and add features once it is live and earning.',
  'Have your text, logo and photos ready before the project starts.',
  'Give one person the final say on design and content decisions.',
  'Choose a normal timeline instead of a rush deadline where you can.',
  'Pick a CMS so your team can update content without paying for every change.',
];

const FAQS = [
  {
    question: 'How much does a website cost in India?',
    answer: `At HN Tech, a business website starts at ${range(website.min, website.max)}. A typical business website with custom design and SEO setup comes to ${range(EXAMPLES[0].est.min, EXAMPLES[0].est.max)}. Online stores, web apps and mobile apps cost more because they include payments, accounts and admin panels.`,
  },
  {
    question: 'How much does an e-commerce website cost in India?',
    answer: `An online store with custom design, a payment gateway and an admin dashboard comes to ${range(EXAMPLES[1].est.min, EXAMPLES[1].est.max)} with us. The final price depends on your product range, integrations and design needs.`,
  },
  {
    question: 'How much does a mobile app cost in India?',
    answer: `A cross-platform iOS and Android app with custom design and user accounts comes to ${range(EXAMPLES[3].est.min, EXAMPLES[3].est.max)} with us. Apps with payments, AI features or complex back ends cost more.`,
  },
  {
    question: 'Are there ongoing costs after launch?',
    answer: `Yes. Your domain and hosting are paid to those providers directly. If you want us to handle updates, security, backups and fixes, our maintenance plans start at ${PLANS[0].price} every 2 months.`,
  },
  {
    question: 'Why do website prices in India vary so much?',
    answer: 'Prices depend on how much is custom-built, how many features you need, who builds it and what support is included. A template set up by a freelancer and a custom-built site with a CMS and ongoing support are very different products.',
  },
  {
    question: 'How do I get an exact price?',
    answer: 'Use our free cost estimator for an instant range, or tell us about your project and we will send a clear scope and a free proposal within 48 hours.',
  },
];

function SectionTitle({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-[#0B111E] sm:text-3xl">{title}</h2>
      {intro && <p className="mt-3 text-base leading-7 text-slate-600">{intro}</p>}
    </div>
  );
}

const thCls = 'px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-600';
const tdCls = 'px-5 py-4 align-top text-sm text-slate-700';

export default function WebsiteCostGuidePage() {
  return (
    <>
      <FAQPageJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Website Cost Guide', url: `${SITE_URL}/website-cost-india` },
      ]} />

      {/* ── Hero ── */}
      <section className="border-b border-[#E2E5F1] bg-[#F5F6FF]">
        <div className="container py-16 sm:py-20">
          <Breadcrumb className="mb-6" />
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-[#0B111E] sm:text-5xl">
            Website development cost in India <span className="text-[#0051FF]">(2026)</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            What websites, online stores, web apps and mobile apps actually cost to build with us, what changes the
            price, and how to plan your budget. Updated November 2026.
          </p>

          {/* Short answer */}
          <div className="mt-10 max-w-3xl rounded-2xl border border-[#0051FF]/20 bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0041CC]">The short answer</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {PROJECT_BASES.map((b) => (
                <li key={b.id} className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-3 text-sm">
                  <span className="font-semibold text-slate-900">{b.name}</span>
                  <span className="shrink-0 font-bold text-[#0041CC]">from {formatINR(b.min)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-600">Starting prices for the core build. Features like payments or an admin panel are added on top.</p>
          </div>
        </div>
      </section>

      <div className="container py-16 sm:py-20">
        <div className="mx-auto max-w-4xl space-y-20">

          {/* ── By project type ── */}
          <FadeIn>
            <section>
              <SectionTitle eyebrow="By project type" title="Price ranges by type of project" intro="The core build: the pages, screens and logic every project of that type needs." />
              <div className="overflow-x-auto rounded-2xl border border-[#E2E5F1]" tabIndex={0} role="region" aria-label="Price ranges by project type">
                <table className="w-full min-w-[560px] border-collapse">
                  <caption className="sr-only">Price ranges by project type, in Indian rupees</caption>
                  <thead className="bg-slate-50">
                    <tr><th scope="col" className={thCls}>Project</th><th scope="col" className={thCls}>What it is</th><th scope="col" className={`${thCls} text-right`}>Price range</th></tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E5F1]">
                    {PROJECT_BASES.map((b) => (
                      <tr key={b.id}>
                        <th scope="row" className={`${tdCls} text-left font-semibold text-slate-900`}>{b.name}</th>
                        <td className={tdCls}>{b.desc}</td>
                        <td className={`${tdCls} whitespace-nowrap text-right font-semibold text-slate-900`}>{range(b.min, b.max)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </FadeIn>

          {/* ── Add-ons ── */}
          <FadeIn>
            <section>
              <SectionTitle eyebrow="Features" title="What features add to the price" intro="Add these to the core build price. Most projects need two or three of them." />
              <div className="overflow-x-auto rounded-2xl border border-[#E2E5F1]" tabIndex={0} role="region" aria-label="Feature add-on costs">
                <table className="w-full min-w-[560px] border-collapse">
                  <caption className="sr-only">Feature add-on costs, in Indian rupees</caption>
                  <thead className="bg-slate-50">
                    <tr><th scope="col" className={thCls}>Feature</th><th scope="col" className={thCls}>What it covers</th><th scope="col" className={`${thCls} text-right`}>Adds</th></tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E5F1]">
                    {FEATURES.map((f) => (
                      <tr key={f.id}>
                        <th scope="row" className={`${tdCls} text-left font-semibold text-slate-900`}>{f.name}</th>
                        <td className={tdCls}>{f.desc}</td>
                        <td className={`${tdCls} whitespace-nowrap text-right font-semibold text-slate-900`}>{range(f.min, f.max)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Need it faster? A rush timeline adds about {rushPct}% for dedicated overtime.
              </p>
            </section>
          </FadeIn>

          {/* ── Examples ── */}
          <FadeIn>
            <section>
              <SectionTitle eyebrow="Real examples" title="What common projects cost" intro="Typical combinations, on a normal timeline. These are the same numbers our estimator gives." />
              <ul className="grid gap-5 sm:grid-cols-2">
                {EXAMPLES.map((ex) => (
                  <li key={ex.title} className="rounded-2xl border border-[#E2E5F1] bg-white p-6">
                    <h3 className="text-lg font-bold text-[#0B111E]">{ex.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{ex.who}</p>
                    <p className="mt-4 text-2xl font-bold tracking-tight text-[#0041CC]">{range(ex.est.min, ex.est.max)}</p>
                    <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
                      <li className="flex gap-2"><Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0051FF]" />{ex.est.base?.name}</li>
                      {ex.est.activeFeatures.map((f) => (
                        <li key={f.id} className="flex gap-2"><Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0051FF]" />{f.name}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          </FadeIn>

          {/* ── Mid-page CTA ── */}
          <div className="flex flex-col items-start gap-5 rounded-2xl bg-[#0051FF] p-8 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xl font-bold">Get a price for your own project</p>
              <p className="mt-1 text-sm text-white/90">Pick your project type and features. It takes about two minutes.</p>
            </div>
            <Link href="/estimate" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#0B111E] transition hover:bg-[#EEF0FF]">
              <Calculator aria-hidden="true" className="h-4 w-4" /> Open the cost estimator
            </Link>
          </div>

          {/* ── Drivers ── */}
          <FadeIn>
            <section>
              <SectionTitle eyebrow="What changes the price" title="Six things that decide your final cost" />
              <ol className="grid gap-px overflow-hidden rounded-2xl border border-[#E2E5F1] bg-[#E2E5F1] sm:grid-cols-2">
                {DRIVERS.map((d, i) => (
                  <li key={d.title} className="bg-white p-6">
                    <p className="text-xs font-bold text-[#0041CC]">{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="mt-2 text-base font-bold text-[#0B111E]">{d.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{d.body}</p>
                  </li>
                ))}
              </ol>
            </section>
          </FadeIn>

          {/* ── Ongoing costs ── */}
          <FadeIn>
            <section>
              <SectionTitle
                eyebrow="After launch"
                title="Ongoing costs to plan for"
                intro="Your domain and hosting are paid to those providers directly, so you always own them. For updates, security and fixes, these are our maintenance plans (billed every 2 months):"
              />
              <ul className="grid gap-5 sm:grid-cols-3">
                {PLANS.map((p) => (
                  <li key={p.id} className="rounded-2xl border border-[#E2E5F1] bg-white p-6">
                    <p className="text-sm font-bold text-[#0B111E]">{p.name}</p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-[#0041CC]">{p.price}</p>
                    <p className="text-xs text-slate-500">every 2 months</p>
                    <p className="mt-3 text-sm text-slate-600">{p.bestFor}</p>
                  </li>
                ))}
              </ul>
              <Link href="/maintenance" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#0041CC] hover:underline">
                Compare maintenance plans <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </section>
          </FadeIn>

          {/* ── Save money ── */}
          <FadeIn>
            <section>
              <SectionTitle eyebrow="Plan your budget" title="How to keep the cost down" />
              <ul className="space-y-3">
                {SAVE.map((tip) => (
                  <li key={tip} className="flex gap-3 text-base text-slate-700">
                    <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[#0051FF]" />{tip}
                  </li>
                ))}
              </ul>
            </section>
          </FadeIn>

          {/* ── FAQ ── */}
          <FadeIn>
            <section>
              <SectionTitle eyebrow="FAQ" title="Common questions about website cost" />
              <div className="divide-y divide-[#E2E5F1] rounded-2xl border border-[#E2E5F1]">
                {FAQS.map((f) => (
                  <details key={f.question} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-[#0B111E]">
                      <h3>{f.question}</h3>
                      <span aria-hidden="true" className="text-xl font-light text-slate-500 transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{f.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </FadeIn>

          {/* ── Final CTA ── */}
          <section className="rounded-2xl border border-[#E2E5F1] bg-[#F5F6FF] p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-[#0B111E] sm:text-3xl">Want an exact price?</h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-slate-600">
              Tell us what you&apos;re building. You&apos;ll get a clear scope and a free proposal within 48 hours.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0051FF] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#0041CC]">
                Get a Free Proposal <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link href="/estimate" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-900 transition hover:border-[#0051FF] hover:text-[#0041CC]">
                Use the Cost Estimator
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
