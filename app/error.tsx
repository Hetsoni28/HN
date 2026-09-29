'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[HN Global Error]', error);
  }, [error]);

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-white">
      <div className="container py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 border border-red-200">
          <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>

        <h1 className="mt-7 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
          Something went wrong.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-slate-500">
          An unexpected error occurred. Our team has been notified. Please try again or return home.
        </p>
        {error.digest && (
          <p className="mt-3 text-xs text-slate-300">Error ID: {error.digest}</p>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={reset}
            className="rounded-xl bg-[#0051FF] px-8 py-4 text-base font-bold text-white transition hover:bg-[#0040CC]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-xl border border-[#E2E5F1] bg-white px-8 py-4 text-base font-semibold text-slate-700 transition hover:border-[#0051FF]/30 hover:text-[#0051FF]"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
