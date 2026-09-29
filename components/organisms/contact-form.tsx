'use client';

import { useActionState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitInquiry, type FormState } from '@/app/contact/actions';

const PROJECT_TYPES = [
  'Website', 'Web Application', 'Mobile Application',
  'AI Solution', 'SaaS Platform', 'E-Commerce',
  'Custom Software', 'UI/UX Design', 'Other',
];

const BUDGETS = [
  'Under ₹50,000',
  '₹50,000 – ₹1,50,000',
  '₹1,50,000 – ₹5,00,000',
  '₹5,00,000 – ₹15,00,000',
  '₹15,00,000+',
  'Not sure yet',
];

const TIMELINES = [
  'As soon as possible',
  '1 – 2 months',
  '2 – 4 months',
  '4 – 6 months',
  '6+ months',
  'Flexible',
];

const initialState: FormState = { status: 'idle' };

function Field({
  label, required, error, children,
}: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}{required && <span className="ml-0.5 text-[#0051FF]">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
          <svg className="h-3 w-3 shrink-0" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 110 14A7 7 0 018 1zm0 3.5a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 4.5zm0 7a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls = (error?: string) =>
  `w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#0051FF]/20 ${
    error
      ? 'border-red-400 bg-red-50 focus:border-red-400'
      : 'border-[#E2E5F1] bg-white text-slate-800 placeholder:text-slate-300 focus:border-[#0051FF]'
  }`;

export function ContactForm() {
  const [state, action, pending] = useActionState(submitInquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  if (state.status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-3xl border border-[#E2E5F1] bg-white p-14 text-center"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EEF0FF]">
          <svg className="h-10 w-10 text-[#0051FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="mt-6 text-2xl font-bold text-slate-900">We got your message!</h2>
        <p className="mt-3 max-w-sm text-slate-500">
          Expect a reply from Het or Neel within 24–48 hours. We&apos;ve also sent a confirmation to your email.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-8 rounded-xl border border-[#E2E5F1] px-6 py-2.5 text-sm font-semibold text-slate-600 hover:border-[#0051FF]/30 hover:text-[#0051FF]"
        >
          Send another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} action={action} noValidate>
      {/* Honeypot — visually hidden from humans, visible to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] opacity-0">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-6 rounded-3xl border border-[#E2E5F1] bg-white p-8 lg:p-10">

        <AnimatePresence>
          {state.status === 'error' && state.message && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {state.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* About You */}
        <div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#0051FF]">About You</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" required error={state.errors?.name}>
              <input name="name" type="text" autoComplete="name"
                className={inputCls(state.errors?.name)} required />
            </Field>
            <Field label="Email Address" required error={state.errors?.email}>
              <input name="email" type="email" autoComplete="email"
                className={inputCls(state.errors?.email)} required />
            </Field>
            <Field label="Phone Number" error={state.errors?.phone}>
              <input name="phone" type="tel" autoComplete="tel"
                className={inputCls(state.errors?.phone)} />
            </Field>
            <Field label="Company / Organisation" error={state.errors?.company}>
              <input name="company" type="text"

                className={inputCls(state.errors?.company)} />
            </Field>
          </div>
        </div>

        <div className="border-t border-[#E2E5F1]" />

        {/* Your Project */}
        <div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#0051FF]">Your Project</p>
          <div className="space-y-4">
            <Field label="Project Type" required error={state.errors?.projectType}>
              <select name="projectType" defaultValue="" className={`${inputCls(state.errors?.projectType)} cursor-pointer`} required>
                <option value="" disabled>Select a project type…</option>
                {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>

            <Field label="Project Description" required error={state.errors?.description}>
              <textarea
                name="description" rows={5}
                className={`${inputCls(state.errors?.description)} resize-none`}
                required
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Budget Range" required error={state.errors?.budget}>
                <select name="budget" defaultValue="" className={`${inputCls(state.errors?.budget)} cursor-pointer`} required>
                  <option value="" disabled>Select a range…</option>
                  {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </Field>
              <Field label="Ideal Timeline" required error={state.errors?.timeline}>
                <select name="timeline" defaultValue="" className={`${inputCls(state.errors?.timeline)} cursor-pointer`} required>
                  <option value="" disabled>Select a timeline…</option>
                  {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={pending}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#0051FF] px-8 py-4 text-base font-bold text-white transition hover:bg-[#0040CC] focus:outline-none focus:ring-4 focus:ring-[#0051FF]/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? (
            <>
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending…
            </>
          ) : (
            'Send Inquiry →'
          )}
        </button>

        <p className="text-center text-xs text-slate-400">
          We reply within 24–48 hours. No spam, ever.
        </p>
      </div>
    </form>
  );
}
