import Link from 'next/link';
import type { Project } from '@/lib/content';
import { FadeIn } from '@/components/atoms/fade-in';
import { Button } from '@/components/atoms/button';
import { Breadcrumb } from '@/components/molecules/breadcrumb';

export function CaseStudyHero({ project }: { project: Project }) {
  return (
    <section className="section relative overflow-hidden bg-[#0051FF] pb-0">
      {/* Cyan glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#00D2FF] opacity-20 blur-3xl" />

      <div className="container relative z-10">
        <FadeIn>
          {/* Breadcrumb */}
          <Breadcrumb label={project.title} className="mb-6 text-white/60 [&_a]:text-white/40 [&_a:hover]:text-white [&_svg]:text-white/20 [&_span:last-child>span]:text-white" />

          <div className="flex flex-wrap gap-2">
            {project.industry && (
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white/70">
                {project.industry}
              </span>
            )}
          </div>

          <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            {project.title}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-white/70 sm:mt-6 sm:text-lg sm:leading-8">
            {project.shortDescription}
          </p>

          {/* Meta strip */}
          <div className="mt-8 flex flex-wrap gap-6 border-t border-white/20 pt-6 sm:mt-12 sm:gap-10 sm:pt-8">
            {[
              { label: 'Timeline', value: project.timeline ?? '—' },
              { label: 'Role',     value: project.role ?? 'Full-Stack Development' },
              { label: 'Stack',    value: `${project.technology?.length ?? 0} technologies` },
            ].map((m) => (
              <div key={m.label}>
                <div className="text-xs font-bold uppercase tracking-widest text-white/40">{m.label}</div>
                <div className="mt-1 text-sm font-semibold text-white sm:text-base">{m.value}</div>
              </div>
            ))}
            {project.liveUrl && (
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-white/40">Live</div>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="mt-1 block text-sm font-semibold text-[#00D2FF] hover:underline sm:text-base">
                  View Site ↗
                </a>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Hero image */}
        <FadeIn delay={0.2}>
          <div className="mt-12 aspect-[16/9] w-full overflow-hidden rounded-t-3xl border border-white/20 border-b-0 bg-white/10 backdrop-blur-sm sm:mt-16 sm:aspect-[21/9]">
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-white/40 sm:gap-4">
              <svg className="h-10 w-10 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
              </svg>
              <span className="text-xs font-semibold uppercase tracking-widest sm:text-sm">{project.title} — Preview</span>
              <span className="hidden text-xs text-white/20 sm:block">Add screenshot via Sanity CMS → heroImage field</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

import { WhatsAppButton } from '@/components/atoms/whatsapp-button';

export function CaseStudyOverview({ project }: { project: Project }) {
  const waMessage = `Hi HN Studio, I saw the ${project.title} project and I'm interested in building something similar.`;

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-[2fr_1fr]">
          <FadeIn>
            <h2 className="mt-5 text-3xl font-bold text-slate-900 md:text-4xl">
              What is {project.title}?
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{project.shortDescription}</p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="rounded-2xl border border-[#E2E5F1] bg-[#EEF0FF] p-7">
              <div className="text-xs font-bold uppercase tracking-widest text-[#0051FF]">Quick Facts</div>
              <div className="mt-5 space-y-4">
                {[
                  { label: 'Category', value: project.category ?? 'Digital Product' },
                  { label: 'Industry', value: project.industry ?? '—' },
                  { label: 'Timeline', value: project.timeline ?? '—' },
                  { label: 'Our Role', value: project.role ?? 'Full-Stack Development' },
                ].map((f) => (
                  <div key={f.label} className="flex justify-between gap-4 border-b border-[#E2E5F1] pb-4 last:border-0 last:pb-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{f.label}</span>
                    <span className="text-right text-sm font-semibold text-slate-900">{f.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-3">
                <Button href={`/contact?project=${encodeURIComponent(project.title)}`} variant="primary" fullWidth>Start a similar project →</Button>
                <WhatsAppButton message={waMessage} fullWidth />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
