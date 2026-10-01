import type { Metadata } from 'next';
import { ContactForm } from '@/components/organisms/contact-form';
import { FadeIn } from '@/components/atoms/fade-in';
import { Breadcrumb } from '@/components/molecules/breadcrumb';
import { WhatsAppButton } from '@/components/atoms/whatsapp-button';

export const metadata: Metadata = {
  title: 'Contact — HN',
  description: 'Start your project with HN. Tell us what you want to build and we\'ll get back to you within 24–48 hours.',
};

const CONTACT_DETAILS = [
  {
    label: 'Email',
    value: 'contact.hnsolutions@gmail.com',
    href: 'mailto:contact.hnsolutions@gmail.com',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: 'Response Time',
    value: 'Within 24–48 hours',
    href: null,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Based in',
    value: 'India · Available worldwide',
    href: null,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
];

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const project = params.project ? String(params.project) : undefined;

  return (
    <>
      {/* Hero */}
      <section className="section bg-[#EEF0FF]">
        <div className="container">
          <FadeIn>
            <Breadcrumb className="mb-6" />
            <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
              Let&apos;s build something{' '}
              <span className="gradient-text">great together.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
              Fill in the form and we&apos;ll get back to you within 24–48 hours with a clear plan and honest proposal.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section bg-white">
        <div className="container">
          {/* Mobile: form stacks above sidebar; lg: side-by-side */}
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">

            {/* Form */}
            <FadeIn>
              <ContactForm initialProject={project} />
            </FadeIn>

            {/* Side info */}
            <FadeIn delay={0.1}>
              <div className="space-y-5 lg:sticky lg:top-28">


                {/* Contact details */}
                <div className="rounded-2xl border border-[#E2E5F1] bg-[#EEF0FF] p-7">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#0051FF]">Contact</div>
                  <div className="mt-5 space-y-4">
                    {CONTACT_DETAILS.map((c) => (
                      <div key={c.label} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E2E5F1] bg-white text-[#0051FF]">
                          {c.icon}
                        </div>
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{c.label}</div>
                          {c.href ? (
                            <a href={c.href} className="text-sm font-semibold text-slate-800 hover:text-[#0051FF]">{c.value}</a>
                          ) : (
                            <div className="text-sm font-semibold text-slate-800">{c.value}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 border-t border-[#E2E5F1] pt-6">
                    <WhatsAppButton fullWidth />
                  </div>
                </div>

                {/* What happens next */}
                <div className="rounded-2xl border border-[#E2E5F1] bg-white p-7">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#0051FF]">What Happens Next</div>
                  <ol className="mt-5 space-y-4">
                    {[
                      'We review your inquiry within 24h',
                      'We send you an initial response with clarifying questions',
                      'We schedule a free 60-min Discovery call',
                      'You receive a proposal with clear scope and pricing',
                    ].map((step, i) => (
                      <li key={step} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-[11px] font-black text-[#0051FF]">
                          {i + 1}
                        </span>
                        <span className="text-sm leading-6 text-slate-600">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Founder note */}
                <div className="rounded-2xl border border-[#E2E5F1] bg-white p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#0051FF] to-[#0070F3] text-xs font-bold text-white">HS</div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#0070F3] to-[#00D2FF] text-xs font-bold text-white">NP</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Het & Neel</div>
                      <div className="text-xs text-slate-400">Reply personally to every inquiry</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm italic leading-6 text-slate-500">
                    &ldquo;We read every message ourselves. No bots, no sales team — just two engineers who want to help you build something great.&rdquo;
                  </p>
                </div>

              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
