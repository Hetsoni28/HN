import Image from 'next/image';
import { FadeIn } from '@/components/atoms/fade-in';
import { LIVE_PROJECTS } from '@/lib/live-projects';

/** Thumbnail grid of live client websites; each card opens the site in a new tab. */
export function LiveProjectsGrid() {
  return (
    <div>
      <FadeIn>
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0041CC]">Live websites</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Websites we&apos;ve launched.</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500">
            Real businesses, live today. Tap any project to visit the website.
          </p>
        </div>
      </FadeIn>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {LIVE_PROJECTS.map((p, i) => (
          <li key={p.url} className="h-full">
            <FadeIn delay={(i % 3) * 0.08} className="h-full">
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name} — visit live website (opens in a new tab)`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E5F1] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#0051FF]/30 hover:shadow-xl hover:shadow-[#0051FF]/10"
              >
                {/* Browser-style frame around the screenshot */}
                <div className="flex items-center gap-1.5 border-b border-[#E2E5F1] bg-slate-50 px-3 py-2" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-slate-300" />
                  <span className="h-2 w-2 rounded-full bg-slate-300" />
                  <span className="h-2 w-2 rounded-full bg-slate-300" />
                  <span className="ml-2 truncate text-[11px] text-slate-500">{new URL(p.url).hostname.replace(/^www\./, '')}</span>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EEF0FF]">
                  <Image
                    src={p.image}
                    alt={`${p.name} website homepage`}
                    fill
                    className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="w-fit rounded-full bg-[#EEF0FF] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0041CC]">
                    {p.category}
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-slate-900">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{p.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#0041CC] transition-all group-hover:gap-2.5">
                    Visit website
                    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </span>
                </div>
              </a>
            </FadeIn>
          </li>
        ))}
      </ul>
    </div>
  );
}
