'use client';

import { useEffect } from 'react';
import { spaceGrotesk, plusJakarta } from '@/lib/fonts';
import '../styles/globals.css';

/**
 * Last-resort error page for crashes in the root layout itself. It replaces the whole document,
 * so it brings its own <html>, <body>, styles and fonts, and must not depend on the site layout.
 */
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error('[HN Global Error]', error);
  }, [error]);

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${plusJakarta.variable}`}>
      <body>
        <title>Something went wrong | HN Tech</title>
        <main role="alert" className="flex min-h-screen items-center justify-center bg-white px-4">
          <div className="max-w-lg py-24 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#0041CC]">HN Tech</p>
            <h1 className="mt-6 text-3xl font-bold text-slate-900 sm:text-5xl">
              We hit an unexpected problem.
            </h1>
            <p className="mx-auto mt-5 max-w-md text-lg text-slate-500">
              The site couldn&apos;t load. Please try again in a moment. If it keeps happening, email us at{' '}
              <a href="mailto:contact.hnsolutions@gmail.com" className="font-semibold text-[#0041CC] underline">
                contact.hnsolutions@gmail.com
              </a>.
            </p>
            {error.digest && (
              <p className="mt-3 text-xs text-slate-500">Error ID: {error.digest}</p>
            )}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                onClick={retry}
                className="rounded-xl bg-[#0051FF] px-8 py-4 text-base font-bold text-white transition hover:bg-[#0040CC]"
              >
                Try again
              </button>
              {/* Plain <a>: a full page load is the safest way home when the app shell itself failed */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- intentional full reload */}
              <a
                href="/"
                className="rounded-xl border border-[#E2E5F1] bg-white px-8 py-4 text-base font-semibold text-slate-700 transition hover:border-[#0051FF]/30 hover:text-[#0051FF]"
              >
                ← Back to home
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
