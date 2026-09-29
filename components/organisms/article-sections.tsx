import Link from 'next/link';
import type { BlogPost } from '@/lib/content';
import { FadeIn } from '@/components/atoms/fade-in';
import { Eyebrow } from '@/components/atoms/eyebrow';
import { PortableTextRenderer, PlainTextRenderer } from '@/components/molecules/portable-text-renderer';
import { Breadcrumb } from '@/components/molecules/breadcrumb';

function formatDate(iso?: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric',
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

/* ── Article Hero ── */
export function ArticleHero({ post }: { post: BlogPost }) {
  return (
    <section className="section bg-[#EEF0FF] pb-0">
      <div className="container">
        <FadeIn>
          <Breadcrumb label={post.title} className="mb-6" />

          {/* Category + tags */}
          <div className="flex flex-wrap items-center gap-2">
            {post.category && (
              <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${categoryColor(post.category)}`}>
                {post.category}
              </span>
            )}
            {post.tags?.map((t) => (
              <span key={t} className="rounded-full border border-[#E2E5F1] bg-white px-3 py-1 text-[10px] font-semibold text-slate-500">
                {t}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-500">{post.excerpt}</p>
          )}

          {/* Meta strip */}
          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-[#E2E5F1] pt-7">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0051FF] to-[#00D2FF] text-sm font-bold text-white">
                {post.author?.name.split(' ').map((n) => n[0]).join('') ?? 'HN'}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{post.author?.name ?? 'HN'}</div>
                <div className="text-xs text-slate-400">{post.author?.role ?? 'HN Studio'}</div>
              </div>
            </div>
            <div className="h-6 w-px bg-[#E2E5F1]" />
            {post.publishedAt && (
              <div className="text-sm text-slate-500">{formatDate(post.publishedAt)}</div>
            )}
            {post.readTime && (
              <>
                <div className="h-6 w-px bg-[#E2E5F1]" />
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.readTime} min read
                </div>
              </>
            )}
          </div>
        </FadeIn>

        {/* Cover image placeholder */}
        <FadeIn delay={0.15}>
          <div className="mt-12 aspect-[21/9] w-full overflow-hidden rounded-t-3xl border border-[#E2E5F1] border-b-0 bg-gradient-to-br from-[#EEF0FF] via-[#E8EDFF] to-[#E2E5F1]">
            <div className="flex h-full items-center justify-center text-[#0051FF]/20">
              <div className="text-center">
                <svg className="mx-auto h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.7}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest">Add cover image in Sanity</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Article Body + Sidebar ── */
export function ArticleBody({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  const hasContent = post.content && post.content.length > 0;

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-[1fr_300px]">

          {/* Main content */}
          <div>
            {hasContent ? (
              <PortableTextRenderer
                value={post.content!}
                className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-[#0051FF] prose-a:no-underline hover:prose-a:underline prose-code:text-[#0051FF] prose-code:bg-[#EEF0FF] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-blockquote:border-l-[#0051FF] prose-blockquote:not-italic prose-blockquote:text-slate-600"
              />
            ) : (
              /* Placeholder content for fallback articles */
              <div className="space-y-6 text-base leading-8 text-slate-600">
                <p className="text-lg font-semibold text-slate-800">
                  {post.excerpt}
                </p>
                <div className="rounded-2xl border-l-4 border-[#0051FF] bg-[#EEF0FF] p-6">
                  <p className="text-sm font-semibold text-[#0051FF]">Full article coming soon</p>
                  <p className="mt-1 text-sm text-slate-600">
                    This insight is being written. Add the full content via Sanity Studio → Insights → {post.title}.
                  </p>
                </div>
                <p>
                  We publish new insights on AI, SaaS, web development, and product thinking every week. Subscribe to get notified when this article goes live.
                </p>
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2 border-t border-[#E2E5F1] pt-8">
                {post.tags.map((t) => (
                  <span key={t} className="rounded-lg border border-[#E2E5F1] bg-[#EEF0FF] px-3 py-1.5 text-xs font-semibold text-slate-600">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Author card */}
            {post.author && (
              <div className="mt-12 flex gap-5 rounded-2xl border border-[#E2E5F1] bg-[#EEF0FF] p-7">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0051FF] to-[#00D2FF] text-lg font-bold text-white">
                  {post.author.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{post.author.name}</div>
                  <div className="text-xs text-[#0051FF]">{post.author.role ?? 'HN Studio'}</div>
                  <p className="mt-2 text-sm text-slate-500">
                    Building digital products at HN — websites, web apps, SaaS, and AI solutions. Co-founder of HN Studio.
                  </p>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-10 rounded-2xl bg-[#0051FF] p-8 text-center">
              <h3 className="text-xl font-bold text-white">Want to build something like this?</h3>
              <p className="mt-2 text-sm text-white/70">Talk to Het and Neel — get a free proposal within 48 hours.</p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#0051FF] transition hover:bg-blue-50"
              >
                Start a Project →
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {/* Share */}
            <div className="rounded-2xl border border-[#E2E5F1] bg-white p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Share this article</div>
              <div className="mt-4 flex gap-2">
                {[
                  { label: 'Twitter', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://hn.studio/insights/${post.slug.current}`)}` },
                  { label: 'LinkedIn', href: `https://linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://hn.studio/insights/${post.slug.current}`)}&title=${encodeURIComponent(post.title)}` },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-xl border border-[#E2E5F1] py-2.5 text-center text-xs font-bold text-slate-600 transition hover:border-[#0051FF]/30 hover:text-[#0051FF]"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Related posts */}
            {related.length > 0 && (
              <div className="rounded-2xl border border-[#E2E5F1] bg-white p-6">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Related Insights</div>
                <div className="mt-4 space-y-4">
                  {related.map((r) => (
                    <Link key={r._id} href={`/insights/${r.slug.current}`} className="group block">
                      <div className="text-sm font-semibold text-slate-800 transition group-hover:text-[#0051FF] line-clamp-2">{r.title}</div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                        {r.readTime && <span>{r.readTime} min</span>}
                        {r.publishedAt && <span>·</span>}
                        {r.publishedAt && <span>{formatDate(r.publishedAt)}</span>}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* More insights */}
            <Link
              href="/insights"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E2E5F1] bg-white py-3 text-sm font-semibold text-slate-600 transition hover:border-[#0051FF]/30 hover:text-[#0051FF]"
            >
              ← All Insights
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
