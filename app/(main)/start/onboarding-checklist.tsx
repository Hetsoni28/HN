'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FadeIn } from '@/components/atoms/fade-in';

/* ── Types ── */
interface ChecklistItem {
  id: string;
  label: string;
}

interface Category {
  id: string;
  number: string;
  title: string;
  items: ChecklistItem[];
}

/* ── Data ── */
const CATEGORIES: Category[] = [
  {
    id: 'brand',
    number: '01',
    title: 'Brand & Identity',
    items: [
      { id: 'brand-1', label: 'Logo files (SVG or PNG with transparent background)' },
      { id: 'brand-2', label: 'Brand colour codes (HEX or Pantone)' },
      { id: 'brand-3', label: 'Brand font names or files (if custom)' },
      { id: 'brand-4', label: 'Any existing brand guidelines document' },
      { id: 'brand-5', label: 'Competitor websites you like/dislike' },
    ],
  },
  {
    id: 'content',
    number: '02',
    title: 'Content & Copy',
    items: [
      { id: 'content-1', label: 'Final website copy (About, Services, Team sections)' },
      { id: 'content-2', label: 'Team member photos (minimum 800×800px)' },
      { id: 'content-3', label: 'Product/service photography or stock photo budget confirmed' },
      { id: 'content-4', label: 'Testimonials from past clients (name, company, quote)' },
      { id: 'content-5', label: 'Blog posts or articles to migrate (if any)' },
    ],
  },
  {
    id: 'technical',
    number: '03',
    title: 'Technical Access',
    items: [
      { id: 'tech-1', label: 'Domain registrar login (GoDaddy, Namecheap, etc.)' },
      { id: 'tech-2', label: 'Existing hosting provider access (if migrating)' },
      { id: 'tech-3', label: 'Google Analytics / Search Console access' },
      { id: 'tech-4', label: 'Social media account access (if we\'re integrating)' },
      { id: 'tech-5', label: 'Any third-party API keys needed (payment gateway, CRM, etc.)' },
    ],
  },
  {
    id: 'business',
    number: '04',
    title: 'Business Details',
    items: [
      { id: 'biz-1', label: 'Legal business name and registered address' },
      { id: 'biz-2', label: 'GST number (if applicable)' },
      { id: 'biz-3', label: 'Contact email and phone for the website' },
      { id: 'biz-4', label: 'Social media profile URLs' },
      { id: 'biz-5', label: 'Business hours and service area' },
    ],
  },
  {
    id: 'clarity',
    number: '05',
    title: 'Project Clarity',
    items: [
      { id: 'clarity-1', label: 'List of all pages/features required' },
      { id: 'clarity-2', label: 'Reference websites you love (3–5 links)' },
      { id: 'clarity-3', label: 'Launch deadline confirmed' },
      { id: 'clarity-4', label: 'Point of contact named (who approves decisions?)' },
      { id: 'clarity-5', label: 'Feedback turnaround time agreed (we recommend 48h)' },
    ],
  },
];

const TOTAL_ITEMS = CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0);

const NEXT_STEPS = [
  {
    step: '01',
    title: 'Kickoff Call',
    description:
      'We schedule a 45-min video call to align on vision, timeline, and deliverables.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Design Sprint',
    description:
      'We deliver wireframes and design mockups within the first week for your approval.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Build & Ship',
    description:
      'We build in 2-week sprints and keep you updated daily via Slack or WhatsApp.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
];

/* ── Component ── */
export function OnboardingChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const completedCount = checked.size;
  const progressPct = Math.round((completedCount / TOTAL_ITEMS) * 100);

  return (
    <>
      {/* ── Progress Bar ── */}
      <FadeIn>
        <div className="mb-10 rounded-2xl border border-[#E2E5F1] bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-[#0B111E]">
              {completedCount} of {TOTAL_ITEMS} items completed
            </span>
            <span className="text-sm font-bold text-[#0051FF]">{progressPct}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-[#EEF0FF]">
            <div
              className="h-full rounded-full bg-[#0051FF] transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
              role="progressbar"
              aria-valuenow={progressPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${completedCount} of ${TOTAL_ITEMS} checklist items completed`}
            />
          </div>
          {completedCount === TOTAL_ITEMS && (
            <p className="mt-3 text-sm font-semibold text-emerald-600">
              🎉 You&apos;re fully prepared! Send us your materials and let&apos;s get started.
            </p>
          )}
        </div>
      </FadeIn>

      {/* ── Checklist Cards ── */}
      <div className="space-y-6">
        {CATEGORIES.map((cat, catIdx) => {
          const catChecked = cat.items.filter((item) => checked.has(item.id)).length;
          const catComplete = catChecked === cat.items.length;

          return (
            <FadeIn key={cat.id} delay={catIdx * 0.08}>
              <div
                className={`rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 ${
                  catComplete ? 'border-emerald-200 bg-emerald-50/30' : 'border-[#E2E5F1]'
                }`}
              >
                {/* Card header */}
                <div className="mb-5 flex items-start gap-4">
                  {/* Numbered badge */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0051FF] text-xs font-black text-white">
                    {cat.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#0B111E]">{cat.title}</h3>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {catChecked} / {cat.items.length} complete
                    </p>
                  </div>
                  {catComplete && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Items */}
                <ul className="space-y-3">
                  {cat.items.map((item) => {
                    const isChecked = checked.has(item.id);
                    return (
                      <li key={item.id}>
                        <label
                          className={`flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-colors duration-150 hover:bg-[#EEF0FF]/60 ${
                            isChecked ? 'bg-emerald-50' : ''
                          }`}
                        >
                          <div className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggle(item.id)}
                              className="peer sr-only"
                              aria-label={item.label}
                            />
                            <div
                              className={`h-5 w-5 rounded-md border-2 transition-all duration-150 ${
                                isChecked
                                  ? 'border-emerald-500 bg-emerald-500'
                                  : 'border-[#C8D0E7] bg-white peer-focus-visible:border-[#0051FF] peer-focus-visible:ring-2 peer-focus-visible:ring-[#0051FF]/30'
                              }`}
                            >
                              {isChecked && (
                                <svg className="h-full w-full p-0.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span
                            className={`text-sm leading-relaxed transition-all duration-150 ${
                              isChecked
                                ? 'text-emerald-700 line-through decoration-emerald-400'
                                : 'text-[#0B111E]'
                            }`}
                          >
                            {item.label}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </FadeIn>
          );
        })}
      </div>

      {/* ── What Happens Next ── */}
      <FadeIn>
        <section className="mt-20">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#0B111E] sm:text-4xl">
              What Happens Next
            </h2>
            <p className="mt-3 text-base text-slate-500">
              Once you&apos;ve sent us your materials, here&apos;s how things unfold.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {NEXT_STEPS.map((s, i) => (
              <FadeIn key={s.step} delay={i * 0.1}>
                <div className="flex h-full flex-col rounded-2xl border border-[#E2E5F1] bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#0051FF]">
                      {s.icon}
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-[#0051FF]">
                      Step {s.step}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[#0B111E]">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{s.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* ── CTA ── */}
      <FadeIn>
        <section className="mt-16 rounded-2xl bg-[#0051FF] p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to send us your materials?
          </h2>
          <p className="mt-3 text-base text-white/70">
            The faster you share, the faster we ship.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#0051FF] transition hover:bg-blue-50"
            >
              Contact us
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Still have questions? Book a call
            </Link>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
