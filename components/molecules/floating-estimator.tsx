'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingEstimator() {
  const pathname = usePathname();

  // Hide the floating widget if we are already on the estimate page
  if (pathname === '/estimate') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ duration: 0.4, delay: 1 }}
        className="fixed bottom-6 left-6 z-40 hidden md:block"
      >
        <Link 
          href="/estimate"
          className="group relative flex items-center gap-3 rounded-full bg-white px-5 py-3.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-1 ring-slate-900/5 transition-all hover:scale-105 hover:shadow-[0_8px_30px_rgb(0,81,255,0.2)]"
        >
          {/* Animated pulse ring */}
          <div className="absolute left-2.5 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-[#0051FF]/20 group-hover:animate-ping" />
          
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#0051FF] text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          
          <div className="flex flex-col pr-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Want to know?</span>
            <span className="text-sm font-bold text-slate-900">Calculate Cost</span>
          </div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
