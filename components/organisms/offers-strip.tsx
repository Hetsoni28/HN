'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const OFFERS = [
  {
    tag: 'Earn Money',
    title: 'Refer a Friend,\nEarn ₹5,000',
    description:
      'Know someone who needs a website or app? Send them our way — and get ₹5,000 cash when they sign a contract. No cap on referrals.',
    cta: 'Start Referring →',
    href: '/referral',
    gradient: 'from-[#0051FF] to-[#0070F3]',
    tagColor: 'bg-white/20 text-white',
    accent: '#60a5fa',
  },
  {
    tag: 'Always-On Support',
    title: 'Keep Your Site\nRunning Perfectly',
    description:
      'Monthly maintenance plans starting at ₹8,000/mo. Security patches, performance monitoring, content updates — we handle it all so you don\'t have to.',
    cta: 'See Plans →',
    href: '/maintenance',
    gradient: 'from-[#0B111E] to-[#111827]',
    tagColor: 'bg-emerald-500/20 text-emerald-400',
    accent: '#34d399',
  },
  {
    tag: 'Make the Right Call',
    title: 'HN vs Freelancer\nvs Big Agency',
    description:
      'Confused about who to hire? Our no-BS comparison breaks down cost, quality, timelines, and accountability — so you pick the right fit.',
    cta: 'Compare Now →',
    href: '/compare',
    gradient: 'from-[#0B111E] to-[#111827]',
    tagColor: 'bg-violet-500/20 text-violet-400',
    accent: '#a78bfa',
  },
  {
    tag: 'New Clients',
    title: 'Ready to Start?\nHere\'s Your Checklist',
    description:
      'Before we kick off, use our 25-point onboarding checklist to get everything ready — brand files, access, content, and more.',
    cta: 'Get Prepared →',
    href: '/start',
    gradient: 'from-[#0B111E] to-[#111827]',
    tagColor: 'bg-amber-500/20 text-amber-400',
    accent: '#fbbf24',
  },
];

export function OffersStrip() {
  return (
    <section className="section bg-slate-50">
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#0051FF]">
            Built for you
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
            More ways HN works for you
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
            Beyond building your product — here&apos;s how we help you save money, stay supported, and make better decisions.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OFFERS.map((offer, i) => (
            <motion.div
              key={offer.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                href={offer.href}
                className={`group flex h-full flex-col rounded-2xl bg-gradient-to-br ${offer.gradient} p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20`}
              >
                {/* Tag */}
                <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${offer.tagColor}`}>
                  {offer.tag}
                </span>

                {/* Title */}
                <h3 className="mt-5 whitespace-pre-line text-xl font-bold leading-snug text-white">
                  {offer.title}
                </h3>

                {/* Description */}
                <p className="mt-3 flex-1 text-sm leading-7 text-white/60">
                  {offer.description}
                </p>

                {/* CTA */}
                <div
                  className="mt-6 inline-flex items-center text-sm font-semibold transition-all duration-200 group-hover:gap-2"
                  style={{ color: offer.accent }}
                >
                  {offer.cta}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
