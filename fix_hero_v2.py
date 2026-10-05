import re

with open('components/organisms/case-study-hero.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

if 'import Image from' not in text:
    text = text.replace(
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

text = re.sub(r'        \{\/\* Hero image \*\/}.*?<\/FadeIn>', new_hero_image, text, flags=re.DOTALL)

with open('components/organisms/case-study-hero.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
