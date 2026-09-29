import { FadeIn } from '@/components/atoms/fade-in';
import { Button } from '@/components/atoms/button';
export function AboutSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid items-start gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">

          {/* ── Left — visual card ── */}
          <FadeIn>
            <div className="relative pb-6 pr-6">
              {/* Main blue card */}
              <div className="flex aspect-[9/10] sm:aspect-square w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0051FF] via-[#0070F3] to-[#0B111E]">
                <div className="flex h-full w-full flex-col justify-between p-8 sm:p-12">
                  {/* Top label */}
                  <div className="text-[10px] font-bold uppercase tracking-widest text-blue-200">
                    Est. 2024 — India
                  </div>

                  {/* Monogram */}
                  <div className="mt-auto">
                    <div className="text-[100px] font-black leading-[0.8] text-white">H</div>
                    <div className="text-[100px] font-black leading-[0.8] text-white">N</div>
                    <div className="mt-8 text-sm font-medium leading-relaxed text-blue-200">
                      Het Soni & Neel Patel<br />Digital Product Studio
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute bottom-0 right-0 rounded-2xl bg-white px-5 py-4 shadow-2xl shadow-slate-200/50">
                <div className="text-sm font-bold text-slate-900">100% Remote</div>
                <div className="mt-0.5 text-xs text-slate-500">Build from anywhere</div>
              </div>
            </div>
          </FadeIn>

          {/* ── Right — copy ── */}
          <FadeIn delay={0.2}>

            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
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
