'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/button';
import { AvailabilityBadge } from '@/components/atoms/availability-badge';
import { AnimatedCounter } from '@/components/molecules/animated-counter';

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
    <section className="relative min-h-[100svh] overflow-hidden bg-[#F4F8FF]">

      {/* ── 1. High-Resolution Artwork Layer (Shifted right to 55% visual zone) ── */}
      <Image
        src="/hero-mockup.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        fetchPriority="high"
        unoptimized
        sizes="100vw"
        style={{
          imageRendering: '-webkit-optimize-contrast',
          filter: 'brightness(1.02) contrast(1.04) saturate(1.04)',
          transform: 'translate3d(0,0,0)',
        }}
        className="object-cover object-[92%_center] md:object-[95%_center] xl:object-right transition-all duration-300"
      />

      {/* ── 2. Subtle Premium Ambient Depth Glows (Behind Right Artwork) ── */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        {/* Subtle electric blue depth glow behind laptop visual */}
        <div
          className="absolute right-[22%] top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_78%_50%,rgba(0,81,255,0.08)_0%,transparent_70%)] blur-2xl"
          style={{ transform: 'translate3d(0,-50%,0)' }}
        />
        {/* Subtle cyan ambient glow bottom right */}
        <div
          className="absolute right-[10%] bottom-[20%] h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle_at_90%_70%,rgba(0,210,255,0.06)_0%,transparent_70%)] blur-2xl"
          style={{ transform: 'translate3d(0,0,0)' }}
        />
      </div>

      {/* ── 3. Exact Left Readability Gradient Overlay ── */}
      {/* Mobile: Top-to-bottom soft gradient; Desktop: Exact 0% - 66% white-to-transparent mask */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.98)_35%,rgba(255,255,255,0.90)_55%,rgba(255,255,255,0.30)_78%,transparent_100%)] md:bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.98)_22%,rgba(255,255,255,0.92)_34%,rgba(255,255,255,0.70)_43%,rgba(255,255,255,0.25)_53%,rgba(255,255,255,0)_66%)]" />

      {/* ── Content ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container relative z-10 flex min-h-[100svh] flex-col justify-center py-28 sm:py-32"
      >
        <div className="max-w-lg sm:max-w-xl md:max-w-2xl">
          
          <motion.div variants={item} className="mb-6">
            <AvailabilityBadge />
          </motion.div>

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
            <Button href="/estimate" variant="primary" className="rounded-full px-7 py-3.5 text-sm sm:px-8 sm:py-4 sm:text-base">
              Calculate Project Cost
              <span aria-hidden="true"> →</span>
            </Button>
            <Button 
              href="/work" 
              variant="secondary" 
              className="rounded-full px-7 py-3.5 text-sm sm:px-8 sm:py-4 sm:text-base font-bold"
            >
              View Our Work
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-200 pt-8 sm:gap-8 sm:mt-14"
          >
            {[
              { value: 15, suffix: '+', label: 'Projects Shipped' },
              { value: 100, suffix: '%', label: 'On-Time Delivery' },
              { value: 2, suffix: 'x', label: 'Faster to Market' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-[#0051FF] sm:text-3xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} duration={1.5} />
                </div>
                <div className="mt-0.5 text-[10px] leading-snug text-slate-500 sm:text-xs">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}
