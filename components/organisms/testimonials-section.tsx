'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Testimonial } from '@/lib/content';

/* ── Animation variants ────────────────────────────────────────────────── */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

/* ── Quote SVG ─────────────────────────────────────────────────────────── */

function QuoteIcon() {
  return (
    <svg
      width="40"
      height="32"
      viewBox="0 0 40 32"
      fill="none"
      aria-hidden="true"
      className="mb-4 shrink-0"
    >
      <path
        d="M0 32V19.2C0 14.1333 1.33333 9.86667 4 6.4C6.66667 2.93333 10.5333 0.8 15.6 0L17.6 3.6C14.6667 4.4 12.3333 5.86667 10.6 8C8.86667 10.1333 8 12.6667 8 15.6H14.4V32H0ZM22.4 32V19.2C22.4 14.1333 23.7333 9.86667 26.4 6.4C29.0667 2.93333 32.9333 0.8 38 0L40 3.6C37.0667 4.4 34.7333 5.86667 33 8C31.2667 10.1333 30.4 12.6667 30.4 15.6H36.8V32H22.4Z"
        fill="#0051FF"
        fillOpacity="0.18"
      />
    </svg>
  );
}

/* ── Avatar with initials fallback ─────────────────────────────────────── */

function Avatar({ src, name }: { src?: string; name: string }) {
  const [errored, setErrored] = useState(false);

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (errored || !src || src.trim() === '') {
    return (
      <div
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0051FF] text-sm font-bold text-white"
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      width={44}
      height={44}
      className="h-11 w-11 shrink-0 rounded-full object-cover"
      onError={() => setErrored(true)}
    />
  );
}

/* ── Testimonial card ───────────────────────────────────────────────────── */

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.article
      variants={cardVariant}
      className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-md hover:border-slate-200"
    >
      <QuoteIcon />

      <blockquote className="flex-1 text-[0.95rem] leading-7 text-slate-700">
        {testimonial.quote}
      </blockquote>

      <footer className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
        <Avatar src={testimonial.avatar} name={testimonial.name} />
        <div>
          <p className="text-sm font-bold text-slate-900">{testimonial.name}</p>
          <p className="text-xs text-slate-500">
            {testimonial.role}
            {testimonial.company ? ` · ${testimonial.company}` : ''}
          </p>
        </div>
      </footer>
    </motion.article>
  );
}

/* ── Section ────────────────────────────────────────────────────────────── */

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <section className="section">
      <div className="container">
        {/* Heading */}
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0051FF]">
            Social proof
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
            What clients say
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Real words from the founders and teams we&apos;ve worked with.
          </p>
        </div>

        {/* Card grid — 1 col → 2 col md, last card spans on lg for visual balance */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
