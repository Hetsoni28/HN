import { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 max-w-3xl ${className}`.trim()}>
      {eyebrow && (
        <span className="inline-block rounded-full bg-[#0051FF]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#0051FF]">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">{description}</p>
      )}
    </div>
  );
}
