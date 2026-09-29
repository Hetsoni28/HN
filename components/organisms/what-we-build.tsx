import { FadeIn } from '@/components/atoms/fade-in';
import { SectionHeading } from '@/components/molecules/section-heading';

const pillars = [
  {
    icon: '◈',
    title: 'Websites & Platforms',
    bg: 'bg-[#EEF3FF]',
    border: 'border-[#DCE5FF]',
    accent: 'text-[#0051FF]',
    check: '#0051FF',
    features: ['Marketing & corporate sites', 'E-commerce stores', 'CMS-powered platforms', 'Landing pages'],
  },
  {
    icon: '◉',
    title: 'Web & Mobile Apps',
    bg: 'bg-[#EDF5FF]',
    border: 'border-[#C8DFFF]',
    accent: 'text-[#0070F3]',
    check: '#0070F3',
    features: ['SaaS dashboards', 'CRM & ERP tools', 'Cross-platform mobile', 'B2B portals'],
  },
  {
    icon: '◆',
    title: 'AI & Automation',
    bg: 'bg-[#E6FAFE]',
    border: 'border-[#B3EEFF]',
    accent: 'text-[#0070F3]',
    check: '#00D2FF',
    features: ['LLM-powered features', 'Workflow automation', 'AI chatbots & agents', 'Data pipelines'],
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
