'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Accordion({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-bold sm:text-xl">{question}</span>
        <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-xl font-light text-slate-500 transition-transform duration-300 sm:ml-6">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 leading-8 text-slate-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
