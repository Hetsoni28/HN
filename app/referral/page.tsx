import type { Metadata } from 'next';
import Link from 'next/link';
import { FadeIn } from '@/components/atoms/fade-in';
import { ReferralForm } from './referral-form';

/* ── Metadata ── */
export const metadata: Metadata = {
  title: 'Refer a Friend, Earn ₹5,000 | HN Referral Program',
  description:
    'Know someone who needs a website or app? Refer them to HN and earn ₹5,000 when they sign a contract. No limits — refer as many as you like.',
  keywords: [
    'referral program',
    'earn money',
    'refer a friend',
    'web development referral',
  ],
};

/* ── Static data ── */
const STEPS = [
  {
    n: '01',
    title: 'Submit the form',
    body: "Fill in your friend's details below. Takes 60 seconds.",
  },
  {
    n: '02',
    title: 'We reach out',
    body: 'We contact your friend, understand their project, and send a proposal within 48 hours.',
  },
  {
    n: '03',
    title: 'You get paid',
    body: 'Once they sign a contract, we transfer ₹5,000 directly to your bank account or UPI.',
  },
];

const FAQS = [
  {
    q: 'When do I get paid?',
    a: 'Within 7 days of your referred friend signing a contract with HN.',
  },
  {
    q: 'Is there a limit?',
    a: 'No limit — refer 10 friends, earn ₹50,000.',
  },
  {
    q: "What if my friend doesn't sign?",
    a: "No worries, no payment — but we'll do our best to win them over!",
  },
  {
    q: 'How do I receive the money?',
    a: "We pay via UPI or bank transfer. We'll ask for your details when the referral converts.",
  },
  {
    q: 'Can I refer more than one person?',
    a: 'Absolutely. Each successful referral earns you ₹5,000.',
  },
];

const PILLS = [
  '₹5,000 per referral',
  'No limit on referrals',
  'Paid on contract signing',
];

export default function ReferralPage() {
  return (
    <main>

      {/* ══════════════════════════════════════
          A) Hero
      ══════════════════════════════════════ */}
      <section className="bg-[#EEF0FF] px-4 py-20 sm:py-28">
        <div className="container mx-auto max-w-4xl text-center">
          <FadeIn>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Refer a Friend.
              <br />
              Earn{' '}
              <span className="bg-gradient-to-r from-[#0051FF] to-[#4D8AFF] bg-clip-text text-transparent">
                ₹5,000.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              Know someone who needs a great website or app? Send them our way. When they sign a
              contract with HN, you get ₹5,000. No limits — refer as many friends as you like.
            </p>

            {/* Stat pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {PILLS.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center rounded-full border border-[#0051FF]/20 bg-white px-4 py-2 text-sm font-semibold text-[#0051FF] shadow-sm"
                >
                  {pill}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════
          B) How it works
      ══════════════════════════════════════ */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="container mx-auto max-w-5xl">
          <FadeIn>
            <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
              Three simple steps
            </h2>
          </FadeIn>

          <div className="grid items-stretch gap-8 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <FadeIn key={step.n} delay={i * 0.1} className="flex">
                <div className="relative flex w-full flex-col gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-7 transition hover:border-[#0051FF]/20 hover:bg-[#EEF3FF]/40">
                  <span className="text-4xl font-extrabold leading-none text-[#0051FF]/15">
                    {step.n}
                  </span>
                  <h3 className="text-base font-bold text-gray-900">{step.title}</h3>
                  <p className="mt-auto text-sm leading-relaxed text-gray-500">{step.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          C) The Form
      ══════════════════════════════════════ */}
      <section className="bg-gray-50 px-4 py-16 sm:py-20">
        <div className="container mx-auto max-w-3xl">
          <FadeIn>
            <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-[#0051FF]">
              Ready to refer?
            </p>
            <h2 className="mb-10 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
              Submit a referral
            </h2>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 sm:p-10">
              <ReferralForm />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════
          D) FAQs
      ══════════════════════════════════════ */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="container mx-auto max-w-2xl">
          <FadeIn>
            <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-[#0051FF]">
              FAQs
            </p>
            <h2 className="mb-10 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
              Common questions
            </h2>
          </FadeIn>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <FadeIn key={faq.q} delay={i * 0.06}>
                <div className="rounded-xl border border-gray-100 bg-gray-50 px-6 py-5">
                  <p className="font-semibold text-gray-900">{faq.q}</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{faq.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          E) Bottom CTA
      ══════════════════════════════════════ */}
      <section className="bg-[#EEF0FF] px-4 py-14 text-center">
        <FadeIn>
          <p className="text-base text-gray-600">
            Questions about the program?{' '}
            <Link
              href="/contact"
              className="font-semibold text-[#0051FF] transition hover:underline"
            >
              Contact us →
            </Link>
          </p>
        </FadeIn>
      </section>

    </main>
  );
}
