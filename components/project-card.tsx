import Link from 'next/link';

interface ProjectCardProps {
  slug: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
}

export function ProjectCard({
  slug,
  title,
  category,
  description,
  tech,
}: ProjectCardProps) {
  return (
    <Link
      href={`/work/${slug}`}
      className="card group overflow-hidden transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100"
    >
      {/* Thumbnail */}
      <div className="aspect-[16/10] bg-gradient-to-br from-[#0B111E] via-[#0B4DDB] to-[#00D2FF] p-7">
        <div className="flex h-full items-end rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur">
          <span className="text-2xl font-bold text-white">{title}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="text-xs font-bold uppercase tracking-wider text-[#0051FF]">
          {category}
        </div>
        <h3 className="mt-2 text-2xl font-bold">{title}</h3>
        <p className="mt-3 leading-7 text-slate-600">{description}</p>

        {/* Tech tags */}
        <div className="mt-5 flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 font-bold text-[#0051FF]">View case study →</div>
      </div>
    </Link>
  );
}
