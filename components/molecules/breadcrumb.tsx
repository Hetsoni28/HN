'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/* Map raw path segments → readable labels */
const LABELS: Record<string, string> = {
  work:     'Work',
  services: 'Services',
  about:    'About',
  contact:  'Contact',
  process:  'Process',
  insights: 'Insights',
};

function toLabel(segment: string): string {
  if (LABELS[segment]) return LABELS[segment];
  /* kebab-case / slug → Title Case */
  return segment
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

interface Crumb {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  /** Override the last crumb label (e.g. project title from server data) */
  label?: string;
  className?: string;
}

export function Breadcrumb({ label, className = '' }: BreadcrumbProps) {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);

  const crumbs: Crumb[] = [
    { label: 'Home', href: '/' },
    ...segments.map((seg, i) => ({
      label: i === segments.length - 1 && label ? label : toLabel(seg),
      href: '/' + segments.slice(0, i + 1).join('/'),
    })),
  ];

  if (crumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-1.5 text-sm ${className}`}>
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={crumb.href} className="flex items-center gap-1.5">
            {i > 0 && (
              <svg className="h-3 w-3 shrink-0 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            )}
            {isLast ? (
              <span className="font-semibold text-slate-900 truncate max-w-[200px]">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="text-slate-400 hover:text-[#0051FF] transition-colors">
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
