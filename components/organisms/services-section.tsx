'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/atoms/fade-in';
import Link from 'next/link';

const services = [
  {
    number: '01',
    title: 'Product Strategy',
    description:
      'We help you define what to build, why, and how. From market positioning to feature prioritization and product roadmapping — before a single line of code is written.',
    technologies: ['User Research', 'Competitive Analysis', 'Roadmapping', 'Wireframing'],
    deliverables: ['Product Brief', 'Feature Roadmap', 'User Personas', 'MVP Scope'],
  },
  {
    number: '02',
    title: 'UI/UX Design',
    description:
      'Clean, purposeful interfaces designed around real users. From early concepts to polished design systems that your team can build on confidently.',
    technologies: ['Figma', 'Design Systems', 'Prototyping', 'User Testing'],
    deliverables: ['Wireframes', 'UI Design', 'Design System', 'Interactive Prototype'],
  },
  {
    number: '03',
    title: 'Web Development',
    description:
      'High-performance websites and web platforms built with modern technology. Fast, accessible, SEO-ready, and built to last.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Sanity CMS'],
    deliverables: ['Production Website', 'CMS Integration', 'SEO Setup', 'Analytics'],
  },
  {
    number: '04',
    title: 'Mobile Development',
    description:
      'Cross-platform mobile applications built for real user needs. Performant iOS and Android experiences from a single modern codebase.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Native APIs'],
    deliverables: ['iOS & Android App', 'App Store Submission', 'Push Notifications', 'Offline Support'],
  },
  {
    number: '05',
    title: 'AI & Automation',
    description:
      'AI-powered features, intelligent workflows, and LLM integrations that make your product smarter and your business faster.',
    technologies: ['OpenAI', 'LangChain', 'Python', 'Vector DBs', 'MCP'],
    deliverables: ['AI Integration', 'Custom Agents', 'Automation Pipelines', 'API Endpoints'],
  },
  {
    number: '06',
    title: 'SaaS Development',
    description:
      'Scalable subscription platforms with multi-tenancy, billing, user management, and admin dashboards — built to grow with your business.',
    technologies: ['Next.js', 'Stripe', 'Supabase', 'PostgreSQL', 'Auth'],
    deliverables: ['SaaS Platform', 'Billing Integration', 'Admin Dashboard', 'User Onboarding'],
  },
  {
    number: '07',
    title: 'API & Integrations',
    description:
      'Custom APIs, third-party integrations, and backend systems that connect your product to the rest of the world reliably.',
    technologies: ['Node.js', 'FastAPI', 'REST', 'GraphQL', 'Webhooks'],
    deliverables: ['REST/GraphQL API', 'Third-party Integrations', 'API Docs', 'Authentication'],
  },
  {
    number: '08',
    title: 'Maintenance & Evolution',
    description:
      'Long-term partnership to keep your product fast, secure, and evolving. We do not ship and disappear.',
    technologies: ['Monitoring', 'CI/CD', 'Security Audits', 'Performance Tuning'],
    deliverables: ['Monthly Reports', 'Bug Fixes', 'Feature Updates', 'Uptime SLA'],
  },
];

export function ServicesSection() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section className="section bg-[#0B111E]">
      <div className="container">

        <FadeIn>
          <div className="mb-14 max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#0051FF]">
              What We Do
            </p>
            <h2 className="text-4xl font-black uppercase leading-tight tracking-tight text-white sm:text-5xl">
              From idea to<br />
              <span className="gradient-text">production.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1.1fr]">

          {/* ── Left: accordion list ── */}
          <div className="border-t border-white/10">
            {services.map((s, i) => (
              <button
                key={s.number}
                onClick={() => setActive(i)}
                className={`group w-full border-b border-white/10 px-0 py-5 text-left transition-all ${
                  active === i ? 'bg-transparent' : 'hover:bg-white/3'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-5">
                    <span
                      className={`text-xs font-black tracking-widest transition-colors ${
                        active === i ? 'text-[#0051FF]' : 'text-gray-600'
                      }`}
                    >
                      {s.number}
                    </span>
                    <span
                      className={`text-base font-bold transition-colors sm:text-lg ${
                        active === i ? 'text-white' : 'text-gray-400 group-hover:text-white'
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                  <span
                    className={`shrink-0 text-lg transition-all duration-300 ${
                      active === i ? 'rotate-45 text-[#0051FF]' : 'text-gray-600'
                    }`}
                  >
                    +
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* ── Right: detail panel ── */}
          <div className="lg:pl-16 mt-10 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="sticky top-32"
              >
                <p className="text-xs font-black tracking-[0.2em] text-[#0051FF]">
                  {current.number} — {current.title}
                </p>

                <h3 className="mt-4 text-2xl font-black text-white sm:text-3xl">
                  {current.title}
                </h3>

                <p className="mt-4 text-base leading-7 text-gray-400">
                  {current.description}
                </p>

                {/* Technologies */}
                <div className="mt-8">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-600">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {current.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div className="mt-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-600">
                    Deliverables
                  </p>
                  <ul className="space-y-2">
                    {current.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="h-1 w-1 rounded-full bg-[#0051FF]" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0051FF] transition-all hover:gap-3"
                >
                  Start this service →
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
