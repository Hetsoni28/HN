import Link from 'next/link';
import Image from 'next/image';
import type { Project, PortableTextContent } from '@/lib/content';
import { urlFor } from '@/sanity/lib/image';
import { FadeIn } from '@/components/atoms/fade-in';
import { PlainTextRenderer, PortableTextRenderer } from '@/components/molecules/portable-text-renderer';

/* Reusable left-label / right-content section */
interface CaseStudyTextSectionProps {
  eyebrow: string;
  title: string;
  portable?: PortableTextContent;
  plain?: string;
  bg?: 'white' | 'surface';
  highlight?: boolean; /* wraps content in a left-border box */
}

export function CaseStudyTextSection({
  eyebrow, title, portable, plain, bg = 'white', highlight = false,
}: CaseStudyTextSectionProps) {
  if (!portable?.length && !plain) return null;

  const content = portable?.length
    ? <PortableTextRenderer value={portable} />
    : <PlainTextRenderer text={plain!} />;

  return (
    <section className={`section ${bg === 'surface' ? 'bg-[#EEF0FF]' : 'bg-white'}`}>
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="lg:col-span-4 lg:pr-8">
            {eyebrow && (
              <span className="mb-4 inline-block rounded-full bg-[#0051FF]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#0051FF]">
                {eyebrow}
              </span>
            )}
            <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">{title}</h2>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:col-span-8">
            <div className="max-w-3xl">
              {highlight
                ? <div className="rounded-2xl border-l-4 border-[#0051FF] bg-[#0051FF]/5 p-6 md:p-8">{content}</div>
                : content}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* Features checklist */
export function CaseStudyFeatures({ project }: { project: Project }) {
  if (!project.features?.length) return null;
  return (
    <section className="section bg-white">
      <div className="container">
        <FadeIn>
          <h2 className="mt-5 text-3xl font-bold text-slate-900 md:text-4xl">
            What {project.title} does.
          </h2>
        </FadeIn>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.features.map((f, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="flex items-start gap-4 rounded-2xl border border-[#E2E5F1] bg-white p-6 transition hover:border-[#0051FF]/30 hover:shadow-md">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0051FF]">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-sm font-semibold leading-6 text-slate-700">{f}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* UI Screens — shows actual Sanity gallery images, or placeholder tiles */
export function CaseStudyScreens({ project }: { project: Project }) {
  if (project.gallery?.length) {
    return (
      <section className="section bg-[#EEF0FF]">
        <div className="container">
          <FadeIn>
            <h2 className="mt-5 text-3xl font-bold text-slate-900 md:text-4xl">Interface preview.</h2>
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((img, i) => (
              <FadeIn key={img.asset?._ref || i} delay={i * 0.08}>
                <div className="aspect-[4/3] relative rounded-2xl border border-[#E2E5F1] overflow-hidden bg-white shadow-sm">
                  <Image
                    src={urlFor(img).width(800).height(600).url()}
                    alt={img.alt || Screenshot }
                    fill
                    className="object-cover"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const screens = [
    { label: 'Dashboard',   bg: 'from-[#EEF0FF] to-[#E2E5F1]' },
    { label: 'Detail View', bg: 'from-[#E8EDFF] to-[#EEF0FF]' },
    { label: 'Mobile View', bg: 'from-[#F5F6FF] to-[#EEF0FF]' },
  ];
  return (
    <section className="section bg-[#EEF0FF]">
      <div className="container">
        <FadeIn>
          <h2 className="mt-5 text-3xl font-bold text-slate-900 md:text-4xl">Interface preview.</h2>
        </FadeIn>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {screens.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08}>
              <div className={`aspect-[4/3] rounded-2xl border border-[#E2E5F1] bg-gradient-to-br ${s.bg} flex items-center justify-center`}>
                <div className="text-center text-[#0051FF]/30">
                  <svg className="mx-auto mb-2 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <span className="text-xs font-semibold">{s.label}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-slate-400">
          Upload real screenshots via Sanity CMS -&gt; Gallery field
        </p>
      </div>
    </section>
  );
}

/* Technology pills */
export function CaseStudyTechnology({ project }: { project: Project }) {
  if (!project.technology?.length) return null;
  return (
    <section className="section bg-[#EEF0FF]">
      <div className="container">
        <FadeIn>
          <h2 className="mt-5 text-3xl font-bold text-slate-900 md:text-4xl">Stack used.</h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.technology.map((t) => (
              <span key={t} className="rounded-xl border border-[#E2E5F1] bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
                {t}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* Next project transition */
export function CaseStudyNext({ next, currentSlug }: { next: Project | null; currentSlug: string }) {
  if (!next || next.slug.current === currentSlug) return null;
  return (
    <section className="section bg-[#EEF0FF]">
      <div className="container text-center">
        <FadeIn>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Next Project</div>
          <Link href={`/work/${next.slug.current}`} className="group mt-6 block">
            <h2 className="text-4xl font-bold text-slate-900 transition group-hover:text-[#0051FF] md:text-6xl">
              {next.title}
              <span className="ml-3 inline-block translate-x-0 text-[#0051FF] opacity-50 transition group-hover:translate-x-3 group-hover:opacity-100">ΓåÆ</span>
            </h2>
            {next.category && <p className="mt-3 text-slate-500">{next.category}</p>}
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

/* Bottom CTA */
export function CaseStudyCta({ project }: { project: Project }) {
  return (
    <section className="section bg-[#0051FF]">
      <div className="container text-center">
        <FadeIn>
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Want to build something like{' '}
            <span className="text-[#00D2FF]">{project.title}?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
            Tell us your idea. We&apos;ll send you a clear plan and proposal within 48 hours ΓÇö no obligations.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-10 py-4 text-base font-bold text-[#0051FF] transition hover:bg-blue-50"
            >
              Get a Free Proposal ΓåÆ
            </Link>
            <Link
              href="/work"
              className="rounded-xl border border-white/30 bg-transparent px-10 py-4 text-base text-white transition hover:bg-white/10"
            >
              See more work
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
