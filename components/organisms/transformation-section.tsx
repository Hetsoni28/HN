import { FadeIn } from '@/components/atoms/fade-in';
import { BeforeAfterSlider } from '@/components/molecules/before-after-slider';

export function TransformationSection() {
  return (
    <section className="section bg-slate-50 border-y border-slate-200 overflow-hidden">
      <div className="container">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold mt-4 sm:text-4xl">Drag to compare</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
              See how we transform outdated, clunky interfaces into modern, high-converting digital products. Slide to reveal the difference.
            </p>
          </div>
          <div className="mx-auto max-w-5xl">
            <BeforeAfterSlider 
              beforeImage="/images/slider-before.jpg"
              afterImage="/images/slider-after.jpg"
              beforeLabel="Legacy Interface"
              afterLabel="HN Redesign"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
