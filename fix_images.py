import re

# Patch case-study-hero.tsx
with open('components/organisms/case-study-hero.tsx', 'r', encoding='utf-8') as f:
    hero_text = f.read()

if 'import Image from' not in hero_text:
    hero_text = hero_text.replace(
        "import type { Project } from '@/lib/content';",
        "import type { Project } from '@/lib/content';\nimport Image from 'next/image';\nimport { urlFor } from '@/sanity/lib/image';"
    )

new_hero_image = '''        {/* Hero image */}
        <FadeIn delay={0.2}>
          <div className="mt-12 aspect-[16/9] w-full overflow-hidden rounded-t-3xl border border-white/20 border-b-0 bg-white/10 backdrop-blur-sm sm:mt-16 sm:aspect-[21/9] relative">
            {project.heroImage ? (
              <Image
                src={urlFor(project.heroImage).width(1920).height(1080).url()}
                alt={project.heroImage.alt || project.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-white/40 sm:gap-4">
                <svg className="h-10 w-10 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
                </svg>
                <span className="text-xs font-semibold uppercase tracking-widest sm:text-sm">{project.title} — Preview</span>
                <span className="hidden text-xs text-white/20 sm:block">Add screenshot via Sanity CMS -&gt; heroImage field</span>
              </div>
            )}
          </div>
        </FadeIn>'''

hero_text = re.sub(r'        \{\/\* Hero image \*\/}.*?<\/FadeIn>', new_hero_image, hero_text, flags=re.DOTALL)
with open('components/organisms/case-study-hero.tsx', 'w', encoding='utf-8') as f:
    f.write(hero_text)


# Patch case-study-sections.tsx
with open('components/organisms/case-study-sections.tsx', 'r', encoding='utf-8') as f:
    sec_text = f.read()

if 'import Image from' not in sec_text:
    sec_text = sec_text.replace(
        "import type { Project, PortableTextContent } from '@/lib/content';",
        "import type { Project, PortableTextContent } from '@/lib/content';\nimport Image from 'next/image';\nimport { urlFor } from '@/sanity/lib/image';"
    )

new_screens = '''export function CaseStudyScreens({ project }: { project: Project }) {
    if (!project.gallery?.length) {
      const screens = [
        { label: 'Dashboard',    bg: 'from-[#EEF0FF] to-[#E2E5F1]' },
        { label: 'Detail View',  bg: 'from-[#E8EDFF] to-[#EEF0FF]' },
        { label: 'Mobile View',  bg: 'from-[#F5F6FF] to-[#EEF0FF]' },
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
                  <div className={spect-[4/3] rounded-2xl border border-[#E2E5F1] bg-gradient-to-br  flex items-center justify-center}>
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
                    alt={img.alt || f"Screenshot {i + 1}"}
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
}'''

sec_text = re.sub(r'export function CaseStudyScreens.*?\}', new_screens, sec_text, flags=re.DOTALL)
with open('components/organisms/case-study-sections.tsx', 'w', encoding='utf-8') as f:
    f.write(sec_text)
