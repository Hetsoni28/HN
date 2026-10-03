import { FadeIn } from '@/components/atoms/fade-in';
import Link from 'next/link';

const pillars = ['Product Design', 'Engineering', 'AI & Automation'];


export function AboutSection() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center">

          {/* ── Left — large typography ── */}
          <FadeIn>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-[#0051FF]">
              About HN
            </p>

            <h2 className="text-5xl font-black uppercase leading-[1.0] tracking-tight text-[#0B111E] sm:text-6xl xl:text-7xl">
              Premium<br />
              <span className="text-[#0051FF]">Engineering.</span><br />
              Real Results.
            </h2>

            {/* Pillars */}
            <div className="mt-10 flex flex-wrap gap-3">
              {pillars.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-[#0051FF]/20 bg-[#0051FF]/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#0051FF]"
                >
                  {p}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* ── Right — copy + stats ── */}
          <FadeIn delay={0.15}>
            <p className="text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
              HN is a premium technology company that designs and engineers digital
              products for ambitious businesses. We partner with startups, scale-ups,
              and enterprises who demand software that performs at the highest level.
            </p>

            <p className="mt-5 text-base leading-7 text-slate-400">
              Every solution we deliver is architected for scale, built for longevity,
              and crafted to drive measurable business results. We don&apos;t just ship —
              we own outcomes alongside our clients.
            </p>


            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0051FF] transition-all hover:gap-3"
            >
              Learn about us →
            </Link>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
