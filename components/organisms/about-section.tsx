import { FadeIn } from '@/components/atoms/fade-in';
import Link from 'next/link';

const pillars = ['Product Design', 'Engineering', 'AI'];

const stats = [
  { value: '50+', label: 'Projects' },
  { value: '3+', label: 'Years' },
  { value: '100%', label: 'Satisfaction' },
];

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
              Small team.<br />
              <span className="gradient-text">Big product</span><br />
              thinking.
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
            <p className="text-lg leading-8 text-slate-500 sm:text-xl sm:leading-9">
              HN is a digital product studio focused on turning ambitious ideas into useful,
              scalable technology. We work with startups, businesses, and founders who care
              about building things that actually work.
            </p>

            <p className="mt-5 text-base leading-7 text-slate-400">
              Every product we ship is designed with intention, engineered for performance,
              and built to evolve. We do not hand off and disappear — we stay in it with you.
            </p>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-100 pt-10">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-3xl font-black text-[#0B111E] sm:text-4xl">{value}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0051FF] transition-all hover:gap-3"
            >
              Meet the team →
            </Link>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
