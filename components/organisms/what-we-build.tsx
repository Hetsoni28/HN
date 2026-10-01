import { FadeIn } from '@/components/atoms/fade-in';
import { SectionHeading } from '@/components/molecules/section-heading';

const pillars = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    title: 'Enterprise Web Architecture',
    bg: 'bg-white',
    border: 'border-gray-200',
    accent: 'text-slate-900',
    check: '#0051FF',
    features: ['High-performance Corporate Platforms', 'Headless CMS Architecture', 'Scalable E-Commerce Infrastructure', 'Global CDN Deployment'],
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    title: 'Custom SaaS & Cloud Native',
    bg: 'bg-white',
    border: 'border-gray-200',
    accent: 'text-slate-900',
    check: '#0051FF',
    features: ['Multi-tenant SaaS Platforms', 'Enterprise CRM & ERP Systems', 'Cross-platform Mobile Engineering', 'Legacy System Modernization'],
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'AI & Data Infrastructure',
    bg: 'bg-white',
    border: 'border-gray-200',
    accent: 'text-slate-900',
    check: '#0051FF',
    features: ['Custom LLM Integrations', 'Automated Enterprise Workflows', 'Secure Data Pipelines', 'Predictive Analytics Agents'],
  },
];

export function WhatWeBuild() {
  return (
    <section className="section">
      <div className="container">
        <FadeIn>
          <SectionHeading
            eyebrow="What We Build"
            title="Full-stack expertise, end to end."
            description="From the first sketch to a live product used by thousands — we cover every layer of the stack."
          />
        </FadeIn>

        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.12}>
              <div
                className={`card h-full border ${p.bg} ${p.border} p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className={`mb-5 text-4xl ${p.accent}`}>{p.icon}</div>
                <h3 className="text-2xl font-bold">{p.title}</h3>
                <ul className="mt-5 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-slate-600">
                      <span style={{ color: p.check }} className="text-xs font-bold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
