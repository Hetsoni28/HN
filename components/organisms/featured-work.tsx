import Link from 'next/link';
import { FadeIn } from '@/components/atoms/fade-in';
import { Button } from '@/components/atoms/button';
import { SectionHeading } from '@/components/molecules/section-heading';

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
                  <div className="aspect-[16/10] overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-br from-[#EEF0FF] via-[#E2E5F1] to-[#F5F8FF] p-6 transition duration-500 group-hover:scale-[1.03]">
                      <div className="flex h-full items-end">
                        <span className="text-2xl font-bold text-[#0051FF]">{p.title}</span>
                      </div>
                    </div>
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
