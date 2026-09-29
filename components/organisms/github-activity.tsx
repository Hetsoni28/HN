'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Commit {
  repo: string;
  message: string;
  date: string;
}

// ─── Relative-time helper (no date-fns) ───────────────────────────────────────
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? '' : 's'} ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-4 animate-pulse"
        >
          <span className="h-2 w-2 shrink-0 rounded-full bg-green-500/30" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/4 rounded bg-white/10" />
            <div className="h-3 w-2/3 rounded bg-white/10" />
          </div>
          <div className="h-3 w-16 rounded bg-white/10" />
        </div>
      ))}
    </div>
  );
}

// ─── Stagger animation variants ──────────────────────────────────────────────
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

// ─── Component ────────────────────────────────────────────────────────────────
export function GithubActivity() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/github')
      .then((r) => {
        if (!r.ok) throw new Error('API error');
        return r.json();
      })
      .then((data: Commit[]) => {
        setCommits(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section
      className="section"
      style={{ background: '#0B111E' }}
      aria-label="Live GitHub activity"
    >
      <div className="container">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="mb-1 text-xs font-bold uppercase tracking-widest"
              style={{ color: '#0051FF' }}
            >
              Open source
            </p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Built in public
            </h2>
          </div>
          <p className="max-w-xs text-sm text-slate-400">
            Live commit feed pulled straight from GitHub — no manual updates needed.
          </p>
        </div>

        {/* Feed */}
        {loading ? (
          <Skeleton />
        ) : error || commits.length === 0 ? (
          <p className="text-sm text-slate-500">
            Could not load recent commits. Check back soon.
          </p>
        ) : (
          <motion.ul
            className="space-y-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {commits.map((c, i) => (
              <motion.li key={i} variants={item}>
                <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3 transition hover:border-white/10 hover:bg-white/[0.07]">
                  {/* Green live dot */}
                  <span className="h-2 w-2 shrink-0 rounded-full bg-green-400" />

                  {/* Repo name */}
                  <span
                    className="shrink-0 text-sm font-semibold"
                    style={{ color: '#0051FF' }}
                  >
                    {c.repo.split('/')[1] ?? c.repo}
                  </span>

                  {/* Commit message */}
                  <span className="flex-1 truncate text-sm text-slate-300">
                    {c.message.length > 60
                      ? c.message.slice(0, 60) + '…'
                      : c.message}
                  </span>

                  {/* Time ago */}
                  <span className="ml-auto shrink-0 text-xs text-slate-500">
                    {timeAgo(c.date)}
                  </span>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}

        {/* GitHub profile link */}
        <div className="mt-8 flex justify-center">
          <a
            href="https://github.com/Hetsoni28"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-slate-300 transition hover:border-[#0051FF]/50 hover:text-white"
          >
            <svg
              className="h-4 w-4 transition group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
            </svg>
            View all on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
