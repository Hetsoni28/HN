'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Button } from '@/components/atoms/button';

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

const services = ['Web', 'Mobile', 'AI', 'SaaS', 'Software'];

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
    <section className="relative min-h-[100svh] overflow-hidden flex items-center">

      {/* ── Full hero background image ── */}
      <Image
        src="/hero-bg.jpg"
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden="true"
      />

      {/* ── Overlay so text stays readable ── */}
      <div className="absolute inset-0 bg-white/60" />

      <div className="container relative z-10 py-28 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16 items-center">

          {/* ── LEFT — Text content (55%) ── */}
          <motion.div variants={container} initial="hidden" animate="show">

            {/* Eyebrow */}
            <motion.p
              variants={item}
              className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-[#0051FF]"
            >
              Digital Product Studio
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="text-5xl font-black uppercase leading-[1.0] tracking-tight text-[#0B111E] sm:text-6xl xl:text-[4.5rem]"
            >
              Building Digital<br />
              Products From<br />
              <span className="gradient-text">Ideas to Scale.</span>
            </motion.h1>

            {/* Supporting */}
            <motion.p
              variants={item}
              className="mt-6 max-w-lg text-base leading-7 text-slate-500 sm:text-lg sm:leading-8"
            >
              HN designs and develops modern websites, applications, AI solutions,
              SaaS platforms, and custom software for businesses and ambitious ideas.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              <Button
                href="/contact"
                variant="primary"
                className="rounded-full px-8 py-4 text-sm font-bold"
              >
                Start a Project →
              </Button>
              <Button
                href="/work"
                variant="secondary"
                className="rounded-full px-8 py-4 text-sm font-bold"
              >
                View Our Work →
              </Button>
            </motion.div>

            {/* Service strip */}
            <motion.div
              variants={item}
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-slate-100 pt-8"
            >
              {services.map((s, i) => (
                <span key={s} className="flex items-center gap-6">
                  <span className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                    {s}
                  </span>
                  {i < services.length - 1 && (
                    <span className="h-1 w-1 rounded-full bg-slate-200" aria-hidden="true" />
                  )}
                </span>
              ))}
            </motion.div>

          </motion.div>

          {/* ── RIGHT — Premium Visual (45%) ── */}
          <motion.div
            initial={{ opacity: 0, x: 48, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Outer glow behind the frame */}
            <div className="absolute inset-0 -m-4 rounded-3xl bg-[#0051FF]/8 blur-3xl" />

            {/* Main media frame */}
            <div
              className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-[0_24px_64px_rgba(0,81,255,0.10),0_8px_24px_rgba(0,0,0,0.08)]"
              style={{ aspectRatio: '4/3' }}
            >
              {/* Static poster fallback */}
              <Image
                src="/hero-mockup.png"
                alt="HN digital product preview"
                fill
                priority
                fetchPriority="high"
                sizes="45vw"
                className="object-cover"
              />
              {/* Video overlay */}
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
                className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
              >
                <source src="/video/Digital_studio_product_video_loop_20261002013835.mp4" type="video/mp4" />
              </video>

              {/* Subtle bottom gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
            </div>



            {/* Floating stat — top right */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="absolute -right-5 -top-5 rounded-2xl bg-[#0051FF] px-5 py-3 shadow-lg shadow-[#0051FF]/30"
            >
              <div className="text-2xl font-black text-white">99%</div>
              <div className="mt-0.5 text-xs text-white/75">Client Satisfaction</div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
