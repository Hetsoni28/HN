import type { Metadata } from 'next';
import Image from 'next/image';
import { FadeIn } from '@/components/atoms/fade-in';
import { Breadcrumb } from '@/components/molecules/breadcrumb';
import { CostEstimator } from '@/components/organisms/cost-estimator';

export const metadata: Metadata = {
  title: 'Project Cost Estimator — HN',
  description: 'Get an instant, realistic budget estimate for your next web or mobile app project.',
};

export default function EstimatePage() {
  return (
    <>
      <section className="relative overflow-hidden section bg-white">
        {/* Full-section background image */}
        <Image
          src="/images/estimator-hero.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/40 sm:bg-gradient-to-r sm:from-white sm:via-white/70 sm:to-transparent" />

        <div className="container relative z-10 py-16 sm:py-24">
          <FadeIn>
            <Breadcrumb className="mb-6" />
            <div className="mt-5 flex flex-col gap-5">
              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
                Get an instant project <span className="gradient-text">estimate.</span>
              </h1>
              <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                No hidden fees, no sales traps. Select what you need below to get a realistic, transparent budget range for your project based on current Indian market rates.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section bg-slate-50 border-t border-[#E2E5F1]">
        <div className="container">
          <FadeIn>
            <CostEstimator />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
