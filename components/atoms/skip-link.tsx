'use client';

/**
 * SkipLink — accessibility component that allows keyboard users to
 * skip the navigation and jump directly to main content.
 * Visually hidden until focused (Tab key).
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only
        fixed left-4 top-4 z-[9999]
        rounded-xl bg-[#0051FF] px-6 py-3
        text-sm font-bold text-white
        shadow-lg outline-none
        focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0051FF]
      "
    >
      Skip to main content
    </a>
  );
}
