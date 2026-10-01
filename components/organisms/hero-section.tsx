'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/button';
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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion: only autoplay when reduced motion is NOT requested
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (videoRef.current && !prefersReducedMotion) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback: video remains paused on poster frame if blocked
      });
    }
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-white">

      {/* ── 1. Poster / Static Fallback Layer (Loads instantly, respects motion-reduce) ── */}
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
          filter: 'brightness(1.06) contrast(1.04) saturate(1.03)',
        }}
        className="object-cover object-[85%_center] sm:object-[88%_center] md:object-[95%_center] xl:object-right transition-opacity duration-300"
      />

      {/* ── 2. Native HTML5 Hero Video (Plays local MP4 loop, clean right visual zone) ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-mockup.png"
        aria-hidden="true"
        tabIndex={-1}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[82%_center] sm:object-[86%_center] md:object-[93%_center] xl:object-[center_right] motion-reduce:hidden transition-all duration-300"
        style={{
          filter: 'brightness(1.06) contrast(1.04) saturate(1.03)',
        }}
      >
        <source src="/video/Digital_studio_product_video_loop_20261002013835.mp4" type="video/mp4" />
      </video>

      {/* ── 3. Subtle Ambient Depth Glows (Behind Right Artwork) ── */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        {/* Electric blue depth glow behind laptop visual */}
        <div
          className="absolute right-[20%] top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_78%_50%,rgba(0,81,255,0.08)_0%,transparent_70%)] blur-2xl"
          style={{ transform: 'translate3d(0,-50%,0)' }}
        />
        {/* Cyan ambient glow bottom right */}
        <div
          className="absolute right-[8%] bottom-[20%] h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle_at_90%_70%,rgba(0,210,255,0.06)_0%,transparent_70%)] blur-2xl"
          style={{ transform: 'translate3d(0,0,0)' }}
        />
      </div>

      {/* ── 4. Subtle Readability Gradient Overlay ── */}
      {/* Mobile: Top-to-bottom clean fade protecting headline & CTA; Desktop: Left-to-right calm zone (0%-45%) fading cleanly into rich video on the right */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.96)_40%,rgba(255,255,255,0.85)_65%,rgba(255,255,255,0.30)_85%,transparent_100%)] md:bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.98)_20%,rgba(255,255,255,0.95)_32%,rgba(255,255,255,0.72)_44%,rgba(255,255,255,0.22)_54%,transparent_65%)] xl:bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.98)_18%,rgba(255,255,255,0.95)_28%,rgba(255,255,255,0.65)_38%,rgba(255,255,255,0.18)_48%,transparent_58%)]" 
      />

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
