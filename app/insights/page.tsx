import type { Metadata } from 'next';
import { getPosts } from '@/lib/content';
import { FadeIn } from '@/components/atoms/fade-in';
import { Eyebrow } from '@/components/atoms/eyebrow';
import { Breadcrumb } from '@/components/molecules/breadcrumb';
import { InsightsGrid } from '@/components/organisms/insights-grid';

export const metadata: Metadata = {
  title: 'Insights — HN',
  description: 'Practical articles on AI, SaaS, web development, product thinking, and digital products — written by the engineers at HN Studio.',
};

export default async function InsightsPage() {
  const posts = await getPosts();

  return (
    <>
      {/* Hero */}
      <section className="section bg-[#EEF0FF]">
        <div className="container">
          <FadeIn>
            <Breadcrumb className="mb-6" />
            <Eyebrow>Insights</Eyebrow>
            <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h1 className="max-w-2xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
                Thinking out{' '}
                <span className="gradient-text">loud.</span>
              </h1>
              <p className="max-w-md text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
                Practical articles on AI, SaaS, web development, and product thinking — written by the engineers at HN Studio.
              </p>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.1}>
            <div className="mt-10 flex flex-wrap gap-6 border-t border-[#E2E5F1] pt-6 sm:mt-12 sm:gap-8 sm:pt-8">
              {[
                { value: `${posts.length}+`, label: 'Articles published' },
                { value: '6',               label: 'Topic categories' },
                { value: 'Weekly',          label: 'New content' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-xl font-bold text-[#0051FF] sm:text-2xl">{s.value}</div>
                  <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 sm:text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Grid (client — handles filtering) */}
      <InsightsGrid initialPosts={posts} />

      {/* CTA */}
      <section className="section bg-[#0051FF]">
        <div className="container text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Get new insights weekly.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/70 sm:mt-5 sm:text-lg">
              No trend-chasing, no AI-generated filler. Just practical thinking from two engineers in the field.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-10 py-4 text-base font-bold text-[#0051FF] transition hover:bg-blue-50"
            >
              Follow our work →
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
