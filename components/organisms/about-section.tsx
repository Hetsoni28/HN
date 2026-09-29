import { FadeIn } from '@/components/atoms/fade-in';
import { Button } from '@/components/atoms/button';
import { Eyebrow } from '@/components/atoms/eyebrow';

export function AboutSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* ── Left — visual card ── */}
          <FadeIn>
            {/*
              pb-6 pr-6 gives the floating badge room so it never clips.
              The badge uses absolute -bottom-6 -right-6, so we mirror
              the offset here as padding.
            */}
            <div className="relative pb-6 pr-6">
              {/* Main blue card */}
              <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#0051FF] via-[#0070F3] to-[#0B111E]">
                <div className="flex flex-col justify-between gap-12 p-10 sm:p-12">

                  {/* Top label */}
                  <div className="text-xs font-bold uppercase tracking-widest text-blue-200">
                    Est. 2024 — India
                  </div>

                  {/* Monogram */}
                  <div>
                    <div className="text-[80px] font-bold leading-none text-white">H</div>
                    <div className="text-[80px] font-bold leading-none text-white">N</div>
                    <div className="mt-6 text-base font-medium leading-snug text-blue-200">
                      Het Soni &amp; Neel Patel<br />Digital Studio
                    </div>
                  </div>

                  {/* Decorative bar grid */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-2 rounded-full bg-white/20" />
                    <div className="h-2 rounded-full bg-white/12" />
                    <div className="h-2 rounded-full bg-white/6" />
                  </div>
                </div>
              </div>

              {/* Floating badge — absolutely positioned at bottom-right */}
              <div className="absolute bottom-0 right-0 rounded-2xl bg-white px-5 py-4 shadow-2xl shadow-slate-200">
                <div className="text-sm font-bold text-slate-900">100% Remote</div>
                <div className="mt-0.5 text-xs text-slate-500">Build from anywhere</div>
              </div>
            </div>
          </FadeIn>

          {/* ── Right — copy ── */}
          <FadeIn delay={0.2}>
            <Eyebrow>About HN</Eyebrow>

            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Two engineers who refuse to ship mediocre products.
            </h2>

            <div className="mt-6 space-y-4 text-lg leading-8 text-slate-600">
              <p>
                HN is a digital product studio founded by Het Soni (Full Stack Developer) and Neel Patel (Web Developer) — two engineers obsessed with the craft of building software that actually works, looks great, and stands up over time.
              </p>
              <p>
                By cutting out agency overhead and unnecessary layers, we work
                directly with you to ship higher-quality products in less time.
                No account managers. No bait-and-switch. Just two engineers
                who care.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/about" variant="primary">
                Meet the team →
              </Button>
              <Button href="/contact" variant="secondary">
                Work with us
              </Button>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
