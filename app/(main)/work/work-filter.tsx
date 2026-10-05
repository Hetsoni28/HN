'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/lib/content';
import { EmptyProjectsState } from '@/components/molecules/error-states';
import { urlFor } from '@/sanity/lib/image';

const CATEGORIES = [
  'All',
  'Web Application',
  'Mobile',
  'AI Product',
  'AI / SaaS',
  'SaaS',
  'E-Commerce',
];

// Helper to normalize categories for filtering (case insensitive, mapping similar terms)
function normalizeCategory(cat: string) {
  const lower = cat.toLowerCase();
  if (lower.includes('web')) return 'Web Application';
  if (lower.includes('mobile')) return 'Mobile';
  if (lower.includes('ecommerce') || lower.includes('e-commerce')) return 'E-Commerce';
  if (lower.includes('saas') && lower.includes('ai')) return 'AI / SaaS';
  if (lower.includes('saas')) return 'SaaS';
  if (lower.includes('ai')) return 'AI Product';
  return 'Other';
}

export function WorkFilter({ initialProjects }: { initialProjects: Project[] }) {
  const [activeCat, setActiveCat] = useState('All');

  const filtered = initialProjects.filter((p) => {
    if (activeCat === 'All') return true;
    const cat = p.category ? normalizeCategory(p.category) : 'Other';
    return cat === activeCat || (activeCat === 'Other' && !CATEGORIES.includes(cat));
  });

  return (
    <div>
      {/* Category Tabs — scroll horizontally on mobile, wrap on larger screens */}
      <div className="mb-10 -mx-5 px-5 sm:mx-0 sm:px-0 sm:mb-12">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:gap-3 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 sm:px-5 ${
                activeCat === cat
                  ? 'bg-[#0051FF] text-white shadow-md shadow-[#0051FF]/20'
                  : 'bg-[#EEF0FF] text-slate-600 hover:bg-[#E2E5F1] hover:text-[#0051FF]'
              }`}
              aria-pressed={activeCat === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p._id}
              layout
              className="h-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={`/work/${p.slug.current}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#E2E5F1] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#0051FF]/30 hover:shadow-xl hover:shadow-[#0051FF]/10"
              >
                {/* Thumbnail / Image Area */}
                <div className="h-48 relative overflow-hidden bg-[#EEF0FF] rounded-t-3xl">
                  {p.heroImage ? (
                    <Image
                      src={urlFor(p.heroImage).width(600).height(338).url()}
                      alt={p.heroImage.alt || p.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#EEF0FF] via-[#E2E5F1] to-[#F5F8FF] transition duration-500 group-hover:scale-[1.03]">
                      <svg className="h-12 w-12 text-[#0051FF]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="flex flex-1 flex-col p-8">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-[#EEF0FF] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0051FF]">
                      {p.category || 'Digital Product'}
                    </span>
                    <span className="text-slate-300 transition group-hover:text-[#0051FF]">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
                    {p.shortDescription || 'A digital product built by HN.'}
                  </p>

                  {/* Tech stack pills */}
                  <div className="mt-6 flex flex-wrap gap-2 pt-6 border-t border-slate-100">
                    {(p.technology || []).slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-[#E2E5F1] bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                    {(p.technology?.length || 0) > 3 && (
                      <span className="rounded-md border border-[#E2E5F1] bg-[#EEF0FF] px-2.5 py-1 text-[11px] font-medium text-[#0051FF]">
                        +{p.technology!.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <EmptyProjectsState />
      )}
    </div>
  );
}
