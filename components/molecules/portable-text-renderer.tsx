'use client';

import { PortableText as PT } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

const components = {
  block: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    normal: ({ children, value }: { children?: React.ReactNode; value?: any }) => {
      const text = value?.children?.[0]?.text?.trim();
      if (text === '↓' || text === '->' || text === '→') {
        return (
          <div className="my-2 flex text-[#0051FF]/40">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </div>
        );
      }
      return <p className="mt-5 text-lg leading-relaxed text-slate-600 first:mt-0">{children}</p>;
    },
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-12 text-3xl font-bold tracking-tight text-slate-900 first:mt-0">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-10 text-2xl font-bold tracking-tight text-slate-900 first:mt-0">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-8 border-l-4 border-[#0051FF] bg-[#0051FF]/5 py-3 pl-6 pr-4 text-lg font-medium italic text-slate-800 rounded-r-xl">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-slate-900">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href?: string };
      children?: React.ReactNode;
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-[#0051FF] underline decoration-[#0051FF]/30 hover:decoration-[#0051FF]"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mt-5 space-y-2 text-slate-600">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mt-5 space-y-2 text-slate-600 list-decimal list-inside">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-3 text-lg leading-relaxed">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0051FF]" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-lg leading-relaxed">{children}</li>
    ),
  },
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: { value: any }) => {
      if (!value?.asset) return null;
      return (
        <div className="my-8 overflow-hidden rounded-2xl">
          <Image
            src={urlFor(value).width(1200).quality(90).url()}
            alt={value.alt || ''}
            width={1200}
            height={675}
            className="w-full object-cover"
          />
        </div>
      );
    },
  },
};

interface PortableTextRendererProps {
  value: PortableTextBlock[];
  className?: string;
}

export function PortableTextRenderer({ value, className = '' }: PortableTextRendererProps) {
  return (
    <div className={className}>
      <PT value={value} components={components} />
    </div>
  );
}

/* Plain text fallback renderer — used when Sanity is not connected */
export function PlainTextRenderer({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const paragraphs = text.split('\n\n').filter(Boolean);
  return (
    <div className={className}>
      {paragraphs.map((p, i) => {
        const trimmed = p.trim();
        if (trimmed === '↓' || trimmed === '->' || trimmed === '→') {
          return (
            <div key={i} className="my-2 flex text-[#0051FF]/40">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </div>
          );
        }
        return (
          <p key={i} className="mt-5 text-lg leading-relaxed text-slate-600 first:mt-0">
            {p}
          </p>
        );
      })}
    </div>
  );
}
