interface ServiceCardProps {
  index: number;
  title: string;
  description: string;
}

export function ServiceCard({ index, title, description }: ServiceCardProps) {
  return (
    <article className="card p-7 transition hover:-translate-y-1 hover:border-blue-200">
      {/* Number */}
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF3FF] font-bold text-[#0051FF]">
        {String(index + 1).padStart(2, '0')}
      </div>

      <h3 className="mt-5 text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </article>
  );
}
