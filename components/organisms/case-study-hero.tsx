import type { Project } from '@/lib/content';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { FadeIn } from '@/components/atoms/fade-in';
import { Button } from '@/components/atoms/button';
import { Breadcrumb } from '@/components/molecules/breadcrumb';

export function CaseStudyHero({ project }: { project: Project }) {
  return (
    <section className="section relative overflow-hidden bg-[#0051FF] pb-16 sm:pb-24 lg:pb-32 min-h-[70vh] flex flex-col justify-center">
      {/* Background Image */}
      {project.heroImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(project.heroImage).url()}
            alt={project.heroImage.alt || project.title}
            fill
            quality={100}
            className="object-cover object-center"
            priority
          />
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-slate-900/50" />
        </div>
      )}

      {/* Cyan glow (only if no background image to avoid muddying the image) */}
      {!project.heroImage && (
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#00D2FF] opacity-20 blur-3xl z-0" />
      )}

      <div className="container relative z-10">
        <FadeIn>
          {/* Breadcrumb */}
          <Breadcrumb label={project.title} className="mb-6 text-white/80 [&_a]:text-white/60 [&_a:hover]:text-white [&_svg]:text-white/40 [&_span:last-child>span]:text-white" />

          <div className="flex flex-wrap gap-2">
            {project.industry && (
              <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow-sm backdrop-blur-md">
                {project.industry}
              </span>
            )}
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-md">
            {project.title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90 sm:mt-8 sm:text-xl sm:leading-9 drop-shadow">
            {project.shortDescription}
          </p>

          {/* Meta strip */}
          <div className="mt-10 flex flex-wrap gap-6 border-t border-white/20 pt-8 sm:mt-14 sm:gap-12 sm:pt-10">
            {[
              { label: 'Timeline', value: project.timeline ?? '—' },
              { label: 'Role',     value: project.role ?? 'Full-Stack Development' },
              { label: 'Stack',    value: `${project.technology?.length ?? 0} technologies` },
            ].map((m) => (
              <div key={m.label}>
                <div className="text-xs font-bold uppercase tracking-widest text-white/60 drop-shadow-sm">{m.label}</div>
                <div className="mt-1 text-sm font-semibold text-white sm:text-base drop-shadow-sm">{m.value}</div>
              </div>
            ))}
            {project.liveUrl && (
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-white/60 drop-shadow-sm">Live</div>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="mt-1 block text-sm font-semibold text-[#00D2FF] hover:text-white hover:underline sm:text-base drop-shadow-sm transition-colors">
                  View Site ↗
                </a>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

import { WhatsAppButton } from '@/components/atoms/whatsapp-button';

export function CaseStudyOverview({ project }: { project: Project }) {
  const waMessage = [
    `Hi HN Tech! I just viewed your "${project.title}" case study.`,
    project.category ? `It's a ${project.category} project` : '',
    project.industry ? `in the ${project.industry} industry` : '',
    `and I'm interested in building something similar. Can we discuss my requirements?`,
  ].filter(Boolean).join(' ');

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
