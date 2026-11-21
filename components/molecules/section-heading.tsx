import { ReactNode } from 'react';
import { Eyebrow } from '@/components/atoms/eyebrow';

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
      {eyebrow && <Eyebrow center={className.includes('text-center')}>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-[#0B111E] sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">{description}</p>
      )}
    </div>
  );
}
