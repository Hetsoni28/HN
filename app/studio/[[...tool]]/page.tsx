'use client';

import Link from 'next/link';
import { NextStudio } from 'next-sanity/studio';
import config, { isSanityConfigured } from '../../../sanity.config';

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center select-none font-sans">
        <div className="max-w-md w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-100">
            Sanity Studio Unavailable
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            The studio cannot be initialized because{' '}
            <code className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-xs text-amber-300">
              NEXT_PUBLIC_SANITY_PROJECT_ID
            </code>{' '}
            is missing or unconfigured in the environment.
          </p>
          <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 text-left">
            <p className="text-xs font-semibold text-zinc-300">Required Environment Setup:</p>
            <ul className="mt-1.5 space-y-1 font-mono text-xs text-zinc-400">
              <li>NEXT_PUBLIC_SANITY_PROJECT_ID=...</li>
              <li>NEXT_PUBLIC_SANITY_DATASET=production</li>
            </ul>
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            The public website remains fully operational using built-in fallback content.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 rounded-lg bg-zinc-800 px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-zinc-700"
            >
              Return Home
            </Link>
            <a
              href="https://www.sanity.io/manage"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg bg-amber-500 px-4 py-2.5 text-xs font-medium text-black transition-colors hover:bg-amber-400"
            >
              Sanity Dashboard &rarr;
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}

