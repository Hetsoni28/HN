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
    <section className="relative min-h-[100svh] overflow-hidden bg-white">

      {/* ── 1. High-Resolution Ultra-Sharp Artwork Layer ── */}
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
          transform: 'translate3d(0,0,0)',
        }}
        className="object-cover object-[90%_center] md:object-[95%_center] xl:object-right contrast-[1.04] brightness-[1.02] saturate-[1.02] transition-all duration-300"
      />

      {/* ── 2. Pure White Left Text Safety Gradient (Zero Gray Mud, Zero Haze on Artwork) ── */}
      {/* Mobile: Top-to-bottom pure white fade; Desktop: Pure white 0-30% transitioning cleanly to 100% visible artwork on right */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_40%,rgba(255,255,255,0.85)_65%,rgba(255,255,255,0.20)_85%,transparent_100%)] md:bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_24%,rgba(255,255,255,0.95)_38%,rgba(255,255,255,0.60)_52%,rgba(255,255,255,0.10)_66%,transparent_80%)]" />

      {/* ── 3. Left Content (100% Crystal-Clear Typography & CTAs) ── */}
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
          <motion.p variants={item} className="mt-5 max-w-sm text-base leading-7 text-slate-600 sm:max-w-md font-medium">
            We help businesses, startups, and brands to build powerful
            digital products that grow your business.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button href="/estimate" variant="primary" className="rounded-full px-7 py-3.5 text-sm sm:px-8 sm:py-4 sm:text-base shadow-lg shadow-blue-500/25">
              Calculate Project Cost
              <span aria-hidden="true"> →</span>
            </Button>
            <Button 
              href="/work" 
              variant="secondary" 
              className="rounded-full px-7 py-3.5 text-sm sm:px-8 sm:py-4 sm:text-base font-bold shadow-sm"
            >
              View Our Work
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-200/90 pt-8 sm:gap-8 sm:mt-14"
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
                <div className="mt-0.5 text-[10px] leading-snug text-slate-600 font-medium sm:text-xs">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}
