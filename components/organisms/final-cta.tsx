import Link from 'next/link';
import { FadeIn } from '@/components/atoms/fade-in';

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#0051FF]">

      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      <div className="container relative z-10 py-40 text-center">
        <FadeIn>


          {/* Eyebrow */}
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-white/70">
            Have an idea?
          </p>

          {/* Headline */}
          <h2 className="mx-auto max-w-4xl text-5xl font-black uppercase leading-[1.0] tracking-tight text-white md:text-7xl">
            Let&apos;s build<br />
            <span className="text-white/90">something great.</span>
          </h2>

          {/* Supporting copy */}
          <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-white/75">
            Tell us what you&apos;re building, what you&apos;re solving, or where you&apos;re trying to go.
            We&apos;ll respond within 24 hours with honest advice and a clear plan.
          </p>

          {/* CTAs */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#0051FF] transition-all hover:bg-blue-50 hover:gap-3"
            >
              Start a Project →
            </Link>
            <Link
              href="mailto:contact.hnsolutions@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-8 py-4 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10 hover:gap-3"
            >
              contact.hnsolutions@gmail.com
            </Link>
          </div>

          {/* Fine print */}
          <p className="mt-10 text-sm text-white/50">
            No commitment. No agency fluff. Just a straightforward conversation.
          </p>

        </FadeIn>
      </div>
    </section>
  );
}
