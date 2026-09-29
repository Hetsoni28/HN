import { FadeIn } from '@/components/atoms/fade-in';
import { Button } from '@/components/atoms/button';

export function FinalCta() {
  return (
    <section className="section">
      <div className="container">
        <FadeIn>
          {/* Full-width Primary blue card — correct use of brand primary */}
          <div className="relative overflow-hidden rounded-3xl bg-[#0051FF] px-8 py-20 text-center text-white md:px-20">

            {/* Subtle inner glow */}
            <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-[#00D2FF]/20 blur-3xl" />

            <div className="relative z-10">
              <h2 className="mx-auto max-w-3xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                Have something<br />worth{' '}
                <span className="text-[#00D2FF]">building?</span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/80 sm:mt-6 sm:text-lg sm:leading-8">
                Tell us what you&apos;re trying to create. We&apos;ll give you honest
                feedback, a clear plan, and a proposal — no fluff, no hard sell.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  href="/contact"
                  className="w-full bg-white px-10 py-5 text-base font-bold text-[#0051FF] hover:bg-blue-50 sm:w-auto"
                >
                  Start a Project →
                </Button>
                <Button
                  href="/work"
                  className="w-full border border-white/30 bg-transparent px-10 py-5 text-base text-white hover:border-white/60 hover:bg-white/10 sm:w-auto"
                >
                  See our work first
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
