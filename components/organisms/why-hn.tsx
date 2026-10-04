import { FadeIn } from '@/components/atoms/fade-in';

const principles = [
  {
    number: '01',
    title: 'Product First',
    desc: 'We focus on what the product needs to achieve, not just what it needs to look like. Every design and engineering decision starts with the user and the business goal.',
  },
  {
    number: '02',
    title: 'Built to Scale',
    desc: 'Architecture and engineering decisions are made with future growth in mind. We build systems that handle 100 users today and 10 million tomorrow without a rewrite.',
  },
  {
    number: '03',
    title: 'Performance Matters',
    desc: 'Fast interfaces, efficient systems and optimized experiences. Sub-2s load times, 95+ Lighthouse scores, and global CDN delivery built in from day one.',
  },
  {
    number: '04',
    title: 'Long-Term Thinking',
    desc: 'We build products designed to evolve beyond the initial launch. Clean code, full documentation, and a long-term roadmap — we are in it with you.',
  },
];

export function WhyHN() {
  return (
    <section className="section bg-white">
      <div className="container">

        <FadeIn>
          <div className="mb-16 max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#0051FF]">
              Why HN
            </p>
            <h2 className="text-4xl font-black uppercase leading-tight tracking-tight text-[#0B111E] sm:text-5xl">
              Engineering with<br />
              <span className="gradient-text">intention.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-px bg-slate-100 border border-slate-100 rounded-2xl overflow-hidden sm:grid-cols-2">
          {principles.map(({ number, title, desc }, i) => (
            <FadeIn key={number} delay={i * 0.08}>
              <div className="bg-white p-8 sm:p-10 h-full">
                <span className="text-xs font-black tracking-[0.2em] text-[#0051FF]">
                  {number}
                </span>
                <h3 className="mt-4 text-xl font-black text-[#0B111E] sm:text-2xl">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
                  {desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
