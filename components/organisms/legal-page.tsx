import Link from 'next/link';
import { FadeIn } from '@/components/atoms/fade-in';
import { Breadcrumb } from '@/components/molecules/breadcrumb';

interface LegalSection {
  heading: string;
  content: string | string[];
}

interface LegalPageLayoutProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

export function LegalPageLayout({
  eyebrow,
  title,
  lastUpdated,
  intro,
  sections,
}: LegalPageLayoutProps) {
  return (
    <>
      {/* Hero */}
      <section className="section bg-[#EEF0FF]">
        <div className="container">
          <FadeIn>
            <Breadcrumb className="mb-6" />
            {eyebrow && (
              <span className="inline-block rounded-full bg-[#0051FF]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#0051FF]">
                {eyebrow}
              </span>
            )}
            <h1 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">{title}</h1>
            <p className="mt-4 text-sm text-slate-400">
              Last updated:{' '}
              <time dateTime={lastUpdated}>
                {new Date(lastUpdated).toLocaleDateString('en-IN', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </time>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Body */}
      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            {/* Intro */}
            <FadeIn>
              <p className="text-lg leading-8 text-slate-600">{intro}</p>
            </FadeIn>

            {/* Sections */}
            <div className="mt-12 space-y-12">
              {sections.map((sec, i) => (
                <FadeIn key={sec.heading} delay={i * 0.04}>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{sec.heading}</h2>
                    <div className="mt-4 space-y-4">
                      {(Array.isArray(sec.content) ? sec.content : [sec.content]).map(
                        (para, j) => (
                          <p key={j} className="text-base leading-8 text-slate-600">
                            {para}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Contact note */}
            <FadeIn>
              <div className="mt-16 rounded-2xl border border-[#E2E5F1] bg-[#EEF0FF] p-8">
                <h3 className="text-base font-bold text-slate-900">Questions?</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  If you have any questions about this policy, please email us at{' '}
                  <a href="mailto:contact.hnsolutions@gmail.com" className="font-semibold text-[#0051FF] hover:underline">
                    contact.hnsolutions@gmail.com
                  </a>{' '}
                  or reach out via our{' '}
                  <Link href="/contact" className="font-semibold text-[#0051FF] hover:underline">
                    contact form
                  </Link>
                  .
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
