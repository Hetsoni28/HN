'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
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
// The headline is the likely LCP element: keep it visible from the first paint and only slide it in.
const headline: Variants = {
  hidden: { y: 28 },
  show:   { y: 0, transition: { duration: 0.65 } },
};

const HERO_VIDEO = '/video/Digital_studio_product_video_loop_20261002013835.mp4';

const services = ['Web', 'Mobile', 'AI', 'SaaS', 'Software'];

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // The 3 MB loop is only visible on desktop (lg+). Load it after the page has finished loading so it
  // never competes with the LCP image, and skip it for reduced-motion and data-saver visitors.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!desktop || reduceMotion || saveData) return;

    const start = () => setVideoSrc(HERO_VIDEO);
    if (document.readyState === 'complete') {
      const t = setTimeout(start, 300);
      return () => clearTimeout(t);
    }
    window.addEventListener('load', start, { once: true });
    return () => window.removeEventListener('load', start);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.defaultMuted = true;
    video.muted = true;
    video.play().catch(() => {
      // Autoplay blocked: the static mockup image underneath stays visible
    });
  }, [videoSrc]);

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
              Web &amp; App Development Company in India
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={headline}
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
              HN Tech is your full-stack technology and digital services partner. We architect and build high-performance websites, custom SaaS platforms, mobile applications, and AI solutions for ambitious businesses worldwide.
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
                alt="Web dashboard, mobile app and AI features built by HN Tech"
                fill
                sizes="(min-width: 1280px) 530px, 45vw"
                className="object-cover"
              />
              {/* Video overlay — loaded after page load on desktop only, fades in once playing */}
              {videoSrc && (
                <video
                  ref={videoRef}
                  src={videoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                  tabIndex={-1}
                  onPlaying={() => setVideoPlaying(true)}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:hidden ${
                    videoPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}

              {/* Subtle bottom gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
