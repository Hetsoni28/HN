import type { Metadata } from 'next';
import { FadeIn } from '@/components/atoms/fade-in';
import { OnboardingChecklist } from './onboarding-checklist';

export const metadata: Metadata = {
  title: 'Getting Started | HN — What to Prepare Before We Begin',
  description:
    'A complete onboarding checklist for new HN clients. Know exactly what to prepare before your project kicks off.',
};

export default function StartPage() {
  return (
    <>
      {/* ── A) Hero ── */}
      <section className="bg-[#EEF0FF] py-20 sm:py-28">
        <div className="container">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-[#0B111E] sm:text-5xl md:text-6xl">
                Before We Build,
                <br />
                Let&apos;s Get Ready.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                This checklist covers everything we need before your project kicks off. The more
                prepared you are, the faster we ship.
              </p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#0051FF]/20 bg-white px-4 py-2 text-sm font-medium text-[#0051FF]">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0115.186 0z"
                  />
                </svg>
                Bookmark this page — you can come back to it any time.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── B) The Checklist ── */}
      <section className="section bg-[#F5F6FF]">
        <div className="container">
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[#0B111E] sm:text-4xl">
                Your Onboarding Checklist
              </h2>
              <p className="mt-3 text-base text-slate-500">
                Tick off each item as you gather it. Check back anytime.
              </p>
            </div>
          </FadeIn>

          <div className="mx-auto max-w-3xl">
            <OnboardingChecklist />
          </div>
        </div>
      </section>
    </>
  );
}
