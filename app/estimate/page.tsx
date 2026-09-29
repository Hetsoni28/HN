import type { Metadata } from 'next';
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
      <section className="section bg-[#EEF0FF] pb-12 sm:pb-20">
        <div className="container">
          <FadeIn>
            <Breadcrumb className="mb-6" />
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
              Get an instant project <span className="gradient-text">estimate.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
              No hidden fees, no sales traps. Select what you need below to get a realistic, transparent budget range for your project based on current Indian market rates.
            </p>
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
