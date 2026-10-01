'use client';

import { FadeIn } from '@/components/atoms/fade-in';
import { ROICalculator } from '@/components/organisms/roi-calculator';

export function ROISection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 px-4 py-20 sm:py-32">
      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#0051FF]">
              ROI Calculator
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Don&apos;t look at it as a cost.<br />
              <span className="text-[#0051FF]">Look at the revenue.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              A confusing, slow website doesn&apos;t just look bad — it actively drains money from your business every single day. See how much a high-performance HN website could make you.
            </p>
          </FadeIn>
        </div>

        <div className="mt-16">
          <FadeIn delay={0.1}>
            <ROICalculator />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
