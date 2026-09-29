'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { BlogPost } from '@/lib/content';
import { BLOG_CATEGORIES } from '@/lib/content';
import { FadeIn } from '@/components/atoms/fade-in';
import { Eyebrow } from '@/components/atoms/eyebrow';

/* ── Helpers ── */
function formatDate(iso?: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

function categoryColor(cat?: string) {
  const map: Record<string, string> = {
    'AI':                  'bg-purple-50 text-purple-600 border-purple-200',
    'Web Development':     'bg-blue-50 text-blue-600 border-blue-200',
    'SaaS':                'bg-green-50 text-green-600 border-green-200',
    'Product Development': 'bg-orange-50 text-orange-600 border-orange-200',
    'Technology':          'bg-cyan-50 text-cyan-600 border-cyan-200',
    'HN Updates':          'bg-[#EEF0FF] text-[#0051FF] border-[#E2E5F1]',
  };
  return map[cat ?? ''] ?? 'bg-[#EEF0FF] text-[#0051FF] border-[#E2E5F1]';
}

/* ── Article Card ── */
function ArticleCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link href={`/insights/${post.slug.current}`} className="group block h-full">
      <article className={`h-full overflow-hidden rounded-2xl border border-[#E2E5F1] bg-white transition duration-300 group-hover:border-[#0051FF]/20 group-hover:shadow-xl group-hover:shadow-[#0051FF]/8 ${featured ? 'lg:grid lg:grid-cols-2' : ''}`}>

        {/* Cover image / placeholder */}
        <div className={`relative overflow-hidden bg-gradient-to-br from-[#EEF0FF] to-[#E2E5F1] ${featured ? 'min-h-[240px]' : 'aspect-[16/9]'}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-[#0051FF]/20">
              <svg className="mx-auto h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <span className="mt-2 block text-xs font-semibold uppercase tracking-widest">Insight</span>
            </div>
          </div>
          {/* Category badge */}
          {post.category && (
            <span className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${categoryColor(post.category)}`}>
              {post.category}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col p-6">
          <h2 className={`font-bold text-slate-900 transition group-hover:text-[#0051FF] ${featured ? 'text-xl lg:text-2xl' : 'text-base'}`}>
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500">{post.excerpt}</p>
          )}

          <div className="mt-auto flex items-center justify-between pt-5 border-t border-[#E2E5F1] mt-5">
            <div className="flex items-center gap-2.5">
              {/* Author avatar */}
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#0051FF] to-[#00D2FF] text-[10px] font-bold text-white">
                {post.author?.name.split(' ').map((n) => n[0]).join('') ?? 'HN'}
              </div>
              <span className="text-xs font-semibold text-slate-600">{post.author?.name ?? 'HN'}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              {post.readTime && <span>{post.readTime} min read</span>}
              {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ── Exported: Insights listing page client component ── */
export function InsightsGrid({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [active, setActive] = useState<string>('All');

  const filtered = active === 'All'
    ? initialPosts
    : initialPosts.filter((p) => p.category === active);

  const featured = filtered.find((p) => p.featured) ?? filtered[0];
  const rest = filtered.filter((p) => p._id !== featured?._id);

  return (
    <section className="section bg-white">
      <div className="container">

        {/* Category tabs — horizontal scroll on mobile */}
        <FadeIn>
          <div className="-mx-5 px-5 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition sm:px-5 ${
                    active === cat
                      ? 'bg-[#0051FF] text-white'
                      : 'border border-[#E2E5F1] bg-white text-slate-600 hover:border-[#0051FF]/30 hover:text-[#0051FF]'
                  }`}
                  aria-pressed={active === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Featured post */}
        <AnimatePresence mode="wait">
          {featured && (
            <motion.div
              key={featured._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mt-10"
            >
              <ArticleCard post={featured} featured />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {rest.length > 0 && (
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {rest.map((post, i) => (
                <motion.div
                  key={post._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ArticleCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-24 text-center text-slate-400">
            <p className="text-lg font-semibold">No articles in this category yet.</p>
            <p className="mt-2 text-sm">Check back soon — we publish new insights every week.</p>
          </div>
        )}
      </div>
    </section>
  );
}
