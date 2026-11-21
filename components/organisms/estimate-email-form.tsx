'use client';

import { useActionState, useEffect, useRef } from 'react';
import { emailEstimate, type EstimateFormState } from '@/app/(main)/estimate/actions';
import { trackEvent } from '@/lib/analytics';

const initialState: EstimateFormState = { status: 'idle' };

const inputCls = (error?: string) =>
  `w-full rounded-xl border px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-[#0051FF]/20 ${
    error ? 'border-red-400 bg-red-50 focus:border-red-400' : 'border-[#E2E5F1] bg-white text-slate-800 focus:border-[#0051FF]'
  }`;

/** "Get this estimate by email": sends the current selections; the server recalculates the price. */
export function EstimateEmailForm({
  base, features, timeline, budget, rangeLabel,
}: {
  base: string;
  features: string[];
  timeline: string;
  budget: string;
  rangeLabel: string;
}) {
  const [state, action, pending] = useActionState(emailEstimate, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (state.status === 'success') {
      trackEvent('generate_lead', { form: 'estimator', project_type: base });
      doneRef.current?.focus();
    } else if (state.status === 'error' && state.errors) {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }
    // base is read at submit time only; re-running on base changes would double-count
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (state.status === 'success') {
    return (
      <div role="status" className="rounded-2xl border border-green-200 bg-green-50 p-6">
        <p ref={doneRef} tabIndex={-1} className="text-base font-bold text-green-800 outline-none">
          {state.visitorEmailed ? 'Sent! Check your inbox.' : 'Thanks, we’ve got your estimate.'}
        </p>
        <p className="mt-2 text-sm leading-6 text-green-800">
          {state.visitorEmailed
            ? <>We&apos;ve emailed your estimate to <strong>{state.email}</strong>. Our team will also reply within 48 hours.</>
            : <>Our team will email you at <strong>{state.email}</strong> within 48 hours with your estimate and next steps.</>}
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} noValidate className="rounded-2xl border border-[#E2E5F1] bg-white p-6">
      {/* Selections (prices are recalculated on the server) */}
      <input type="hidden" name="base" value={base} />
      {features.map((f) => <input key={f} type="hidden" name="features" value={f} />)}
      <input type="hidden" name="timeline" value={timeline} />
      <input type="hidden" name="budget" value={budget} />
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] opacity-0">
        <label htmlFor="est-website">Leave this empty</label>
        <input id="est-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-sm text-slate-600">
        We&apos;ll send your estimate (<strong className="text-slate-900">{rangeLabel}</strong>) and reply with next steps within 48 hours.
      </p>

      {state.status === 'error' && state.message && (
        <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{state.message}</p>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="est-name" className="mb-1.5 block text-sm font-semibold text-slate-700">
            Your name<span aria-hidden="true" className="ml-0.5 text-[#0051FF]">*</span>
          </label>
          <input id="est-name" name="name" type="text" autoComplete="name" required
            aria-invalid={state.errors?.name ? true : undefined}
            aria-describedby={state.errors?.name ? 'est-name-error' : undefined}
            className={inputCls(state.errors?.name)} />
          {state.errors?.name && <p id="est-name-error" className="mt-1.5 text-xs font-medium text-red-600">{state.errors.name}</p>}
        </div>
        <div>
          <label htmlFor="est-email" className="mb-1.5 block text-sm font-semibold text-slate-700">
            Email<span aria-hidden="true" className="ml-0.5 text-[#0051FF]">*</span>
          </label>
          <input id="est-email" name="email" type="email" autoComplete="email" required
            aria-invalid={state.errors?.email ? true : undefined}
            aria-describedby={state.errors?.email ? 'est-email-error' : undefined}
            className={inputCls(state.errors?.email)} />
          {state.errors?.email && <p id="est-email-error" className="mt-1.5 text-xs font-medium text-red-600">{state.errors.email}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="est-phone" className="mb-1.5 block text-sm font-semibold text-slate-700">
            Phone / WhatsApp <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <input id="est-phone" name="phone" type="tel" autoComplete="tel" className={inputCls()} />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0051FF] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#0041CC] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? 'Sending…' : 'Email me this estimate →'}
      </button>
      <p className="mt-3 text-xs text-slate-500">No spam. We only use your details to reply about this project.</p>
    </form>
  );
}
