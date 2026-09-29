'use client';

import { useEffect, useRef } from 'react';

/**
 * FadeIn — lightweight scroll-triggered fade using IntersectionObserver + CSS.
 * No Framer Motion dependency → smaller JS bundle for Server-Component-heavy pages.
 *
 * Framer Motion is still available for interactive client components that need it
 * (e.g. InsightsGrid, WorkFilter). Only the scroll-trigger wrapper is replaced.
 */
export function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect user's reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}s`;
          el.classList.add('fade-in--visible');
          observer.disconnect();
        }
      },
      { rootMargin: '-40px 0px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`fade-in-root ${className}`}>
      {children}
    </div>
  );
}
