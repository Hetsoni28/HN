'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

interface WelcomeScreenProps {
  onComplete: () => void;
  isVisible: boolean;
}

export function WelcomeScreen({ onComplete, isVisible }: WelcomeScreenProps) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const logoControls = useAnimation();
  const tagControls = useAnimation();

  useEffect(() => {
    if (!isVisible) return;

    const runSequence = async () => {
      // Logo reveals from left to right as sweep passes
      await logoControls.start({
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        transition: { duration: 0.55, delay: 0.85, ease: [0.33, 1, 0.68, 1] },
      });

      // Tag line fades in
      tagControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: 0.1, ease: 'easeOut' },
      });

      // Hold for 0.5s
      await new Promise((r) => setTimeout(r, 600));

      // Exit: logo drifts up and fades
      await logoControls.start({
        opacity: 0,
        y: -24,
        transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
      });
      tagControls.start({
        opacity: 0,
        transition: { duration: 0.3, ease: 'easeIn' },
      });
    };

    runSequence();

    // Total ~2.6s
    timeoutRef.current = setTimeout(() => {
      onComplete();
    }, 2700);

    return () => clearTimeout(timeoutRef.current);
  }, [isVisible, onComplete, logoControls, tagControls]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="welcome"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* ── Light sweep line ── */}
          <motion.div
            className="pointer-events-none absolute inset-y-0 w-[2px]"
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, #0051FF 20%, #00D2FF 50%, #0051FF 80%, transparent 100%)',
              filter: 'blur(1px)',
            }}
            initial={{ left: '-2px', opacity: 0 }}
            animate={{
              left: ['0%', '50%', '100%'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.0,
              delay: 0.15,
              ease: [0.4, 0, 0.2, 1],
              times: [0, 0.05, 0.92, 1],
            }}
          />

          {/* ── Wide ambient glow traveling with the line ── */}
          <motion.div
            className="pointer-events-none absolute inset-y-0 w-[250px]"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(0,81,255,0.04), rgba(0,210,255,0.07), rgba(0,81,255,0.04), transparent)',
              filter: 'blur(30px)',
            }}
            initial={{ left: '-250px' }}
            animate={{ left: ['0%', '100%'] }}
            transition={{
              duration: 1.0,
              delay: 0.15,
              ease: [0.4, 0, 0.2, 1],
            }}
          />

          {/* ── HN Logo + underline ── */}
          <div className="flex flex-col items-center gap-5">
            {/* Logo — revealed by clip as sweep passes */}
            <motion.div
              animate={logoControls}
              initial={{ clipPath: 'inset(0% 100% 0% 0%)', opacity: 0, y: 0 }}
            >
              <Image
                src="/hn-logo.svg"
                alt="HN"
                width={140}
                height={124}
                priority
                className="h-auto w-[140px]"
              />
            </motion.div>

            {/* Blue gradient accent line under logo */}
            <motion.div
              animate={tagControls}
              initial={{ opacity: 0, y: 6 }}
              className="flex flex-col items-center gap-3"
            >
              <div
                className="h-[2px] w-[80px] rounded-full"
                style={{
                  background: 'linear-gradient(to right, #0051FF, #00D2FF)',
                }}
              />
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.35em]"
                style={{
                  color: 'rgba(0,0,0,0.28)',
                  fontFamily: 'var(--font-space-grotesk)',
                }}
              >
                Digital Product Studio
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
