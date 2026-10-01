import type { Metadata } from 'next';
import { ProcessHero, ProcessSteps, ProcessFaq } from '@/components/organisms/process-steps';
import { FadeIn } from '@/components/atoms/fade-in';
import { Button } from '@/components/atoms/button';

export const metadata: Metadata = {
  title: 'Our Process — HN',
  description: 'A transparent 6-step process: Discover, Plan, Design, Build, Launch, Evolve. Know exactly what happens at every stage of your project with HN.',
};

export default function ProcessPage() {
  return (
    <>
      <ProcessHero />
      <ProcessSteps />
      <ProcessFaq />

      {/* CTA */}
      <section className="section bg-[#0051FF]">
        <div className="container text-center">
          <FadeIn>
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Ready to start Step 01?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
              The Discover call is free and takes 60 minutes. Come with your idea — we&apos;ll handle the rest.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                href="/contact"
                className="bg-white px-10 py-4 text-base font-bold text-[#0051FF] hover:bg-blue-50"
              >
                Book a Discovery Call →
              </Button>
              <Button
                href="/work"
                className="border border-white/30 bg-transparent px-10 py-4 text-base text-white hover:bg-white/10"
              >
                See Our Work First
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
