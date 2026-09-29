'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/button';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const TAGS = ['Modern', 'Responsive', 'Scalable', 'Secure'];

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">

      {/* ── Full-section background image ── */}
      <Image
        src="/hero-mockup.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient overlay — mobile: near-full cover; desktop: left-heavy */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/70 sm:bg-gradient-to-r sm:from-white sm:via-white/92 sm:to-white/20" />

      {/* ── Content ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container relative z-10 flex min-h-[100svh] flex-col justify-center py-28 sm:py-32"
      >
        <div className="max-w-lg sm:max-w-xl md:max-w-2xl">

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-4xl font-bold leading-[1.08] tracking-tight text-[#0B111E] sm:text-5xl md:text-6xl xl:text-[5rem]"
          >
            We Create<br />
            <span className="gradient-text">Website &amp;</span><br />
            Web Application
          </motion.h1>

          {/* Attribute tags */}
          <motion.div variants={item} className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
            {TAGS.map((tag, i, arr) => (
              <span key={tag} className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-700">{tag}</span>
                {i < arr.length - 1 && <span className="text-slate-300" aria-hidden="true">|</span>}
              </span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p variants={item} className="mt-5 max-w-sm text-base leading-7 text-slate-500 sm:max-w-md">
            We help businesses, startups, and brands to build powerful
            digital products that grow your business.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button href="/contact" variant="primary" className="rounded-full px-7 py-3.5 text-sm sm:px-8 sm:py-4 sm:text-base">
              Let&apos;s Build Yours
              <span aria-hidden="true"> →</span>
            </Button>
            <Button href="/work" variant="secondary" className="rounded-full px-7 py-3.5 text-sm sm:px-8 sm:py-4 sm:text-base">
              View Our Work
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-200 pt-8 sm:gap-8 sm:mt-14"
          >
            {[
              { value: '15+',  label: 'Projects Shipped' },
              { value: '100%', label: 'On-Time Delivery' },
              { value: '2x',   label: 'Faster to Market' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-[#0051FF] sm:text-3xl">{s.value}</div>
                <div className="mt-0.5 text-[10px] leading-snug text-slate-500 sm:text-xs">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}
