import type { Metadata } from 'next';
import Link from 'next/link';
import { FadeIn } from '@/components/atoms/fade-in';
import { Button } from '@/components/atoms/button';

export const metadata: Metadata = {
  title: 'Website Maintenance Plans | HN — Keep Your Product Running Perfectly',
  description:
    'Bi-monthly website and app maintenance plans from HN. We handle updates, security patches, performance monitoring, and bug fixes so you can focus on your business.',
  keywords: [
    'website maintenance plan',
    'bi-monthly website support',
    'web app maintenance India',
  ],
};

/* ── Data ── */

const TRUST_PILLS = [
  '99.9% uptime goal',
  '48h response time',
  'Flexible, no lock-in',
];

type Plan = {
  id: 'starter' | 'growth' | 'scale';
  name: string;
  price: string;
  popular: boolean;
  features: string[];
  bestFor: string;
};

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '₹8,000',
    popular: false,
    features: [
      'Security updates & patches (every 2 months)',
      'CMS content updates (up to 4 updates)',
      'Uptime monitoring (24/7 alerts)',
      'Performance report (every 2 months)',
      'Email support (72h response)',
    ],
    bestFor: 'Small business websites',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '₹18,000',
    popular: true,
    features: [
      'Everything in Starter, plus:',
      'Priority bug fixes (48h response)',
      'CMS content updates (up to 12 updates)',
      'Google Analytics insights report',
      'Minor design tweaks (up to 2h)',
      'WhatsApp support',
    ],
    bestFor: 'Growing startups and e-commerce',
  },
  {
    id: 'scale',
    name: 'Scale',
    price: '₹35,000',
    popular: false,
    features: [
      'Everything in Growth, plus:',
      'Dedicated engineer (4h included)',
      'Feature additions (up to 4h dev time)',
      'Detailed performance reports',
      'Database backups & optimisation',
      'Phone + WhatsApp support (24h response)',
      'Strategy call included',
    ],
    bestFor: 'SaaS platforms and web apps',
  },
];

const INCLUDED = [
  { label: 'SSL & Security Monitoring' },
  { label: 'Performance Optimisation' },
  { label: 'Regular Backups' },
  { label: 'Bi-Monthly Reports' },
  { label: 'Dependency Updates' },
  { label: 'Downtime Alerts' },
];

const STEPS = [
  {
    num: '01',
    title: 'Choose a plan',
    body: 'Pick the plan that fits your current needs. You can upgrade any time.',
  },
  {
    num: '02',
    title: 'We audit your site',
    body: 'In the first week, we run a full audit and fix any existing issues at no extra charge.',
  },
  {
    num: '03',
    title: 'Ongoing care',
    body: 'Every 2 months, we handle updates, monitor performance, and send you a detailed report.',
  },
];

const FAQS = [
  {
    q: 'Can I cancel anytime?',
    a: "Yes — all plans are flexible. Cancel with 30 days' notice, no questions asked.",
  },
  {
    q: 'What if I need more work than the plan covers?',
    a: 'Any extra work beyond plan limits is billed at our standard hourly rate of ₹3,500/hr.',
  },
  {
    q: "Do you work on sites you didn't build?",
    a: 'Yes, after an initial audit (₹5,000 one-time fee) to understand your codebase.',
  },
  {
    q: 'How do I pay?',
    a: 'Invoice every 2 months via bank transfer or UPI. Auto-pay setup available.',
  },
];

/* ── Page ── */

export default function MaintenancePage() {
  return (
    <>
      {/* ── A) Hero ── */}
      <section className="section bg-[#EEF0FF]">
        <div className="container text-center">
          <FadeIn>
            <h1 className="mx-auto max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              Your Product Deserves
              <br />
              Expert Aftercare.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">
              Most agencies disappear after launch. We don&apos;t. Our maintenance plans keep your
              website and app fast, secure, and always up-to-date — so you can focus on growing
              your business.
            </p>

            {/* Trust pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {TRUST_PILLS.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-2 rounded-full border border-[#0051FF]/20 bg-white px-5 py-2 text-sm font-semibold text-[#0051FF]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0051FF]" aria-hidden="true" />
                  {pill}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── B) Pricing Plans ── */}
      <section className="section">
        <div className="container">
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold md:text-5xl">Simple, transparent pricing.</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
                No hidden fees. No long-term contracts. Just reliable care for your product.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 lg:grid-cols-3">
            {PLANS.map((plan, i) => {
              const isPopular = plan.popular;
              return (
                <FadeIn key={plan.id} delay={i * 0.08}>
                  <div
                    className={[
                      'relative flex h-full flex-col rounded-2xl p-8 transition duration-300',
                      isPopular
                        ? 'bg-[#0051FF] text-white shadow-2xl shadow-[#0051FF]/30 scale-[1.02]'
                        : 'border border-[#E2E5F1] bg-white hover:border-[#0051FF]/30 hover:shadow-xl hover:shadow-[#0051FF]/8',
                    ].join(' ')}
                  >
                    {/* Popular badge */}
                    {isPopular && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-xs font-bold text-[#0051FF] shadow-md">
                        Most Popular
                      </span>
                    )}

                    {/* Plan name */}
                    <div
                      className={[
                        'text-xs font-bold uppercase tracking-widest',
                        isPopular ? 'text-white/60' : 'text-slate-400',
                      ].join(' ')}
                    >
                      {plan.name}
                    </div>

                    {/* Price */}
                    <div className="mt-3 flex items-end gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span
                        className={[
                          'mb-1 text-sm',
                          isPopular ? 'text-white/70' : 'text-slate-400',
                        ].join(' ')}
                      >
                        / 2 months
                      </span>
                    </div>

                    {/* Divider */}
                    <div
                      className={[
                        'my-6 h-px w-full',
                        isPopular ? 'bg-white/20' : 'bg-[#E2E5F1]',
                      ].join(' ')}
                    />

                    {/* Features */}
                    <ul className="flex-1 space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm leading-6">
                          <span
                            className={[
                              'mt-0.5 shrink-0 font-bold',
                              isPopular ? 'text-white' : 'text-[#0051FF]',
                            ].join(' ')}
                            aria-hidden="true"
                          >
                            ✓
                          </span>
                          <span className={isPopular ? 'text-white/90' : 'text-slate-600'}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Best for */}
                    <div
                      className={[
                        'mt-6 rounded-xl px-4 py-3 text-xs font-medium',
                        isPopular ? 'bg-white/15 text-white/80' : 'bg-[#EEF0FF] text-[#0051FF]',
                      ].join(' ')}
                    >
                      Best for: {plan.bestFor}
                    </div>

                    {/* CTA */}
                    <div className="mt-6">
                      {isPopular ? (
                        <Link
                          href={`/contact?plan=${plan.id}`}
                          className="flex w-full items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#0051FF] transition hover:bg-blue-50"
                        >
                          Get Started →
                        </Link>
                      ) : (
                        <Link
                          href={`/contact?plan=${plan.id}`}
                          className="flex w-full items-center justify-center rounded-xl bg-[#0051FF] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#0040CC]"
                        >
                          Get Started →
                        </Link>
                      )}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── C) What's Always Included ── */}
      <section className="section bg-[#F5F6FF]">
        <div className="container">
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold md:text-5xl">What&apos;s always included.</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
                Every plan — no matter the size — comes with these baseline protections.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.06}>
                <div className="flex items-center gap-4 rounded-2xl border border-[#E2E5F1] bg-white p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0051FF]/10">
                    <svg className="h-5 w-5 text-[#0051FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  <span className="font-semibold text-slate-800">{item.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── D) How It Works ── */}
      <section className="section">
        <div className="container">
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold md:text-5xl">How it works.</h2>
            </div>
          </FadeIn>

          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.1}>
                <div className="relative flex flex-col rounded-2xl border border-[#E2E5F1] bg-white p-8">
                  {/* Step number */}
                  <div className="mb-5 text-5xl font-bold text-[#EEF0FF]">{step.num}</div>
                  <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{step.body}</p>

                  {/* Connector line (desktop only, not on last) */}
                  {i < STEPS.length - 1 && (
                    <div
                      className="absolute right-0 top-1/2 hidden h-px w-8 translate-x-full bg-[#E2E5F1] md:block"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── E) FAQ ── */}
      <section className="section bg-[#F5F6FF]">
        <div className="container">
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold md:text-5xl">Frequently asked questions.</h2>
            </div>
          </FadeIn>

          <div className="mx-auto max-w-3xl divide-y divide-[#E2E5F1] rounded-2xl border border-[#E2E5F1] bg-white overflow-hidden">
            {FAQS.map((faq, i) => (
              <FadeIn key={faq.q} delay={i * 0.06}>
                <div className="px-8 py-6">
                  <h3 className="font-bold text-slate-900">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-500">{faq.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── F) Bottom CTA ── */}
      <section className="section bg-[#EEF0FF]">
        <div className="container text-center">
          <FadeIn>
            <h2 className="text-4xl font-bold text-[#0B111E] md:text-5xl">
              Not sure which plan?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-slate-500">
              Tell us about your project and we&apos;ll recommend the right fit.
            </p>
            <div className="mt-8">
              <Button href="/contact" className="bg-[#0051FF] px-10 py-4 text-base text-white hover:bg-[#0040CC]">
                Get a recommendation →
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
