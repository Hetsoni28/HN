import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProjectBySlug, getProjects } from '@/lib/content';
import { CaseStudyHero, CaseStudyOverview } from '@/components/organisms/case-study-hero';
import {
  CaseStudyTextSection,
  CaseStudyFeatures,
  CaseStudyScreens,
  CaseStudyTechnology,
  CaseStudyNext,
  CaseStudyCta,
} from '@/components/organisms/case-study-sections';
import { BreadcrumbJsonLd } from '@/components/molecules/structured-data';
import { pageMetadata, cmsTitle, SITE_URL } from '@/lib/seo';

/* ── ISR — rebuild every 1 hour at most ── */
export const revalidate = 3600;

/* ── Static params ── */
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug.current }));
}

/* ── SEO ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) return { title: 'Project not found' };
  return pageMetadata({
    title: cmsTitle(p.seoTitle ?? p.title),
    description: p.seoDescription ?? p.shortDescription ?? `${p.title} case study by HN Tech.`,
    path: `/work/${slug}`,
    ownImage: true,
    openGraph: { title: `${p.title} | Case Study` },
  });
}

/* ── Page ── */
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const all = await getProjects();
  const idx = all.findIndex((p) => p.slug.current === slug);
  const next = idx === -1 ? null : all[(idx + 1) % all.length];

  return (
    <article>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Work', url: `${SITE_URL}/work` },
        { name: project.title, url: `${SITE_URL}/work/${slug}` },
      ]} />
      <CaseStudyHero    project={project} />
      <CaseStudyOverview project={project} />

      <CaseStudyTextSection
        eyebrow="Challenge" title="The problem we solved."
        portable={project.challenge} plain={project.challengeText}
        bg="surface"
      />
      <CaseStudyTextSection
        eyebrow="Approach" title="How we tackled it."
        portable={project.approach} plain={project.approachText}
        bg="white"
      />
      <CaseStudyTextSection
        eyebrow="Solution" title="What we built."
        portable={project.solution} plain={project.solutionText}
        bg="surface"
      />

      <CaseStudyFeatures  project={project} />
      <CaseStudyScreens   project={project} />

      <CaseStudyTextSection
        eyebrow="Architecture" title="How it's built."
        portable={project.architecture} plain={project.architectureText}
        bg="white"
      />

      <CaseStudyTechnology project={project} />

      <CaseStudyTextSection
        eyebrow="Results" title="Outcomes & impact."
        portable={project.results} plain={project.resultsText}
        bg="white" highlight
      />

      <CaseStudyNext next={next} currentSlug={slug} />
      <CaseStudyCta  project={project} />
    </article>
  );
}
