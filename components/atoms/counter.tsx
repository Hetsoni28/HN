'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
  value: string;
  className?: string;
}

/**
 * Atom — Counter
 * Animates a numeric prefix on scroll-into-view.
 * Supports values like "15+", "100%", "3", "2x".
 */
export function Counter({ value, className = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const isNumeric = /^\d+/.test(value);
  const [displayed, setDisplayed] = useState(() => (isNumeric ? '0' : value));

  useEffect(() => {
    if (!isInView) return;

    // Parse numeric part and suffix (e.g. "15+" → 15, "+")
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) return;

    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = 1400;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplayed(`${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return <span ref={ref} className={className}>{displayed}</span>;
}
