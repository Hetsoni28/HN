import { FadeIn } from '@/components/atoms/fade-in';
import { SectionHeading } from '@/components/molecules/section-heading';

const groups = [
  {
    cat: 'Frontend',
    color: 'text-[#0051FF]',
    dot: 'bg-[#0051FF]',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    cat: 'Backend',
    color: 'text-[#0070F3]',
    dot: 'bg-[#0070F3]',
    items: ['Node.js', 'NestJS', 'FastAPI', 'REST & GraphQL', 'Prisma'],
  },
  {
    cat: 'Database',
    color: 'text-[#0051FF]',
    dot: 'bg-[#00D2FF]',
    items: ['PostgreSQL', 'MySQL', 'Supabase', 'Redis', 'MongoDB'],
  },
  {
    cat: 'AI & Cloud',
    color: 'text-[#0070F3]',
    dot: 'bg-[#0070F3]',
    items: ['OpenAI', 'LangChain', 'Ollama', 'AWS', 'Vercel', 'Docker'],
  },
];

export function TechSection() {
  return (
    <section className="section bg-white">
      <div className="container">

        {/* Header */}
        <FadeIn>
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionHeading
                eyebrow="Technology"
                title="The right tool for the right job."
                className="mb-0"
              />
            </div>
            <p className="max-w-sm text-slate-500">
              Proven, modern technologies — chosen for performance,
              maintainability, and developer experience.
            </p>
          </div>
        </FadeIn>

        {/* Horizontal rows */}
        <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-[#EEF0FF]">
          {groups.map(({ cat, color, dot, items }, i) => (
            <FadeIn key={cat} delay={i * 0.08}>
              <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:gap-10">
                {/* Category */}
                <div className="flex w-36 shrink-0 items-center gap-2.5">
                  <span className={`h-2 w-2 rounded-full ${dot}`} />
                  <span className={`text-xs font-bold uppercase tracking-widest ${color}`}>
                    {cat}
                  </span>
                </div>
                {/* Pills */}
                <div className="flex flex-wrap gap-2">
                  {items.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:border-[#0051FF]/40 hover:text-[#0051FF]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Metric strip */}
        <FadeIn delay={0.35}>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: 'Languages',   value: '3+',  bg: 'bg-[#EEF3FF]', val: 'text-[#0051FF]' },
              { label: 'Frameworks',  value: '10+', bg: 'bg-[#EEF3FF]', val: 'text-[#0051FF]' },
              { label: 'Databases',   value: '5+',  bg: 'bg-[#EEF3FF]', val: 'text-[#0051FF]' },
              { label: 'Cloud tools', value: '8+',  bg: 'bg-[#EEF3FF]', val: 'text-[#0051FF]' },
            ].map(({ label, value, bg, val }) => (
              <div key={label} className={`rounded-2xl ${bg} p-6 text-center`}>
                <div className={`text-3xl font-bold ${val}`}>{value}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-widest text-slate-500">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
