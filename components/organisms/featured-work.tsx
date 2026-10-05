import Link from 'next/link';
import Image from 'next/image';
import { FadeIn } from '@/components/atoms/fade-in';
import { Button } from '@/components/atoms/button';
import { SectionHeading } from '@/components/molecules/section-heading';
import { urlFor } from '@/sanity/lib/image';

export type WorkProject = {
  slug: { current: string } | string;
  title: string;
  category?: string;
  shortDescription?: string;
  technology?: string[];
};

const fallback: WorkProject[] = [
  {
    slug: { current: 'data-insight' },
    title: 'Data Insight',
    category: 'AI / SaaS',
    shortDescription: 'AI-powered analytics platform for business data exploration and real-time reporting.',
    technology: ['Next.js', 'FastAPI', 'PostgreSQL', 'OpenAI'],
  },
  {
    slug: { current: 'smartdrive-x' },
    title: 'SmartDrive X',
    category: 'Web Application',
    shortDescription: 'Full-stack car rental management covering vehicles, bookings, invoices and payments.',
    technology: ['Laravel', 'MySQL', 'Bootstrap', 'Razorpay'],
  },
  {
    slug: { current: 'medimind-ai' },
    title: 'MediMind AI',
    category: 'AI Product',
    shortDescription: 'Local-first AI healthcare assistant using secure APIs and large language models.',
    technology: ['FastAPI', 'Ollama', 'MySQL', 'JWT'],
  },
];

function getSlug(s: WorkProject['slug']): string {
  return typeof s === 'string' ? s : s.current;
}

export function FeaturedWork({ projects }: { projects: WorkProject[] }) {
  const list = projects.length ? projects : fallback;

  return (
    <section className="section bg-[#EEF0FF]">
      <div className="container">
        <FadeIn>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Featured Work"
              title="Real products. Real engineering."
              description="A growing collection of HN projects across SaaS, AI and web applications."
              className="mb-0"
            />
            <Button href="/work" variant="secondary" className="shrink-0">
              All projects →
            </Button>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {list.map((p, i) => {
            const slug = getSlug(p.slug);
            return (
              <FadeIn key={slug} delay={i * 0.1}>
                <Link
                  href={`/work/${slug}`}
                  className="group block overflow-hidden rounded-2xl border border-[#E2E5F1] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#0051FF]/30 hover:shadow-xl hover:shadow-[#0051FF]/8"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video relative overflow-hidden bg-[#EEF0FF]">
                    {(p as any).heroImage ? (
                      <Image
                        src={urlFor((p as any).heroImage).width(600).height(338).url()}
                        alt={(p as any).heroImage.alt || p.title}
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
                  {/* Body */}
                  <div className="p-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0051FF]">
                      {p.category || 'Digital Product'}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-slate-900">{p.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{p.shortDescription || ''}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(p.technology || []).slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-[#E2E5F1] bg-[#EEF0FF] px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
