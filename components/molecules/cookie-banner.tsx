'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('hn-cookie-consent');
    if (!consent) {
      // Small delay to let the site load before popping up
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('hn-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('hn-cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 right-6 z-[100] max-w-sm rounded-3xl bg-[#0B111E] p-7 text-white shadow-2xl ring-1 ring-white/10 sm:bottom-8 sm:right-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0051FF] text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base font-bold">We respect your privacy</h3>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            We use cookies to improve your experience and analyze site traffic. We don&apos;t sell your data. Read our <a href="/privacy-policy" className="text-[#00D2FF] hover:underline">Privacy Policy</a>.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={handleAccept}
              className="flex-1 rounded-xl bg-[#0051FF] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-[#003ED9] active:scale-[0.98]"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-white/20 active:scale-[0.98]"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
