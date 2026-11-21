'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, animate, useMotionValue, useTransform, type MotionValue } from 'framer-motion';

interface WelcomeScreenProps {
  onComplete: () => void;
}

/* ── Network geometry (SVG units) ── */
const VB_W = 600;
const VB_H = 440;
const CX = 300;
const CY = 220;
const ORBIT = 165;
const SERVICES = ['Web', 'Mobile', 'SaaS', 'AI', 'Design', 'Cloud'];
const angle = (i: number) => (-90 + i * 60) * (Math.PI / 180);
const NODES = SERVICES.map((label, i) => ({
  label,
  x: CX + ORBIT * Math.cos(angle(i)),
  y: CY + ORBIT * Math.sin(angle(i)),
  lx: CX + (ORBIT + 46) * Math.cos(angle(i)),
  ly: CY + (ORBIT + 46) * Math.sin(angle(i)) + 5,
}));

const CONNECT_SECONDS = 1.6;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_CURTAIN = [0.76, 0, 0.24, 1] as const;

/** One spoke + service node; draws and fills as the connect progress passes its slot. */
function Spoke({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const n = NODES[i];
  const start = (i / NODES.length) * 0.85;
  const end = start + 0.85 / NODES.length + 0.05;
  const draw = useTransform(progress, [start, end], [0, 1]);
  const lit = useTransform(progress, [end - 0.04, end], [0, 1]);
  const labelColor = useTransform(lit, [0, 1], ['#94A3B8', '#0B111E']);

  return (
    <g>
      <line x1={CX} y1={CY} x2={n.x} y2={n.y} stroke="#E2E5F1" strokeWidth={1.5} strokeDasharray="3 6" />
      <motion.line x1={CX} y1={CY} x2={n.x} y2={n.y} stroke="#0051FF" strokeWidth={2.5} strokeLinecap="round" style={{ pathLength: draw }} />
      <circle cx={n.x} cy={n.y} r={22} fill="#FFFFFF" stroke="#E2E5F1" strokeWidth={1.5} />
      <motion.circle cx={n.x} cy={n.y} r={22} fill="#0051FF" style={{ opacity: lit }} />
      <motion.circle cx={n.x} cy={n.y} r={6} fill="#FFFFFF" style={{ opacity: lit }} />
      <motion.text
        x={n.lx} y={n.ly} textAnchor="middle"
        className="text-[15px] font-semibold"
        style={{ fill: labelColor, fontFamily: 'var(--font-space-grotesk)' }}
      >
        {n.label}
      </motion.text>
    </g>
  );
}

/**
 * One-time intro for Human Network Tech: the HN node connects to its six services, pulses once,
 * then the screen closes into the HN node to reveal the site. No input needed; "Skip intro" or
 * Escape leaves early.
 */
export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const done = useRef(false);
  const [phase, setPhase] = useState<'intro' | 'connected' | 'leaving'>('intro');

  // Hydrated: drop the CSS fail-safe that hides a server-rendered intro whose scripts never ran
  useEffect(() => {
    if (rootRef.current) rootRef.current.style.animation = 'none';
  }, []);

  // Connect the network, then pulse, then open
  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: CONNECT_SECONDS,
      delay: 0.4,
      ease: [0.45, 0, 0.25, 1],
      onComplete: () => setPhase((cur) => (cur === 'intro' ? 'connected' : cur)),
    });
    return () => controls.stop();
  }, [progress]);

  useEffect(() => {
    if (phase !== 'connected') return;
    const t = setTimeout(() => setPhase('leaving'), 500);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setPhase('leaving'); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    onComplete();
  };

  return (
    <motion.div
      ref={rootRef}
      id="hn-welcome"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Human Network Tech"
      className="fixed inset-0 z-[9999] overflow-hidden bg-white select-none"
      initial={{ clipPath: 'circle(150% at 50% 50%)' }}
      animate={{ clipPath: phase === 'leaving' ? 'circle(0% at 50% 50%)' : 'circle(150% at 50% 50%)' }}
      transition={{ duration: 0.85, ease: EASE_CURTAIN }}
      onAnimationComplete={() => { if (phase === 'leaving') finish(); }}
    >
      {/* Corners */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-8">
        <div className="flex items-center gap-3">
          <Image src="/hn-logo.png" alt="" width={44} height={39} priority className="h-auto w-10" />
          <span className="text-xs leading-tight text-slate-500">
            Made by<br /><span className="font-semibold text-[#0B111E]">Human Network Tech</span>
          </span>
        </div>
        <button
          onClick={() => setPhase('leaving')}
          className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#0051FF] hover:text-[#0041CC]"
        >
          Skip intro →
        </button>
      </div>
      <p className="absolute bottom-0 left-0 p-5 text-xs leading-tight text-slate-500 sm:p-8">
        <span className="font-semibold text-[#0B111E]">2026</span><br />Web · Apps · AI · Ahmedabad
      </p>

      {/* Title + network */}
      <motion.div
        className="flex h-full flex-col items-center justify-center px-4"
        animate={phase === 'leaving' ? { scale: 0.94, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: EASE_CURTAIN }}
      >
        <motion.h1
          className="text-center font-black uppercase leading-[0.95] tracking-tight text-[#0B111E]"
          style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(2.25rem, 7vw, 5.25rem)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          Connect the network
        </motion.h1>
        <motion.p
          className="mt-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-500 sm:text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Human · Network · Tech
        </motion.p>

        <motion.div
          className="relative mt-4 w-full max-w-[540px]"
          style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
        >
          <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="h-full w-full overflow-visible" aria-hidden="true">
            {NODES.map((_, i) => <Spoke key={i} i={i} progress={progress} />)}

            <circle cx={CX} cy={CY} r={46} fill="#0051FF" />
            <text x={CX} y={CY + 9} textAnchor="middle" className="fill-white text-[26px] font-black" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              HN
            </text>
            {phase !== 'intro' && (
              <motion.circle
                cx={CX} cy={CY} r={46} fill="none" stroke="#0051FF" strokeWidth={2}
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2.4, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />
            )}
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
