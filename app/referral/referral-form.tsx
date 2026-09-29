'use client';

import { useActionState } from 'react';
import { submitReferral, type FormState } from './actions';

const initialState: FormState = { status: 'idle' };

export function ReferralForm() {
  const [state, formAction, isPending] = useActionState(submitReferral, initialState);

  /* ── Success state ── */
  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EEF3FF] text-4xl">
          🎉
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Referral submitted!</h3>
          <p className="mt-3 max-w-md text-base text-gray-500 leading-relaxed">
            We&apos;ll reach out to{' '}
            <span className="font-semibold text-[#0051FF]">{state.friendName}</span> and keep you
            posted. Your{' '}
            <span className="font-semibold text-gray-900">₹5,000 reward</span> will be processed
            once they sign a contract.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
          <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Referral received — thank you!
        </div>
      </div>
    );
  }

  /* ── Input field helper ── */
  const inputCls = (error?: string) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition
    focus:ring-2 focus:ring-[#0051FF]/30 focus:border-[#0051FF]
    ${error ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'}`;

  const labelCls = 'block text-sm font-semibold text-gray-700 mb-1.5';
  const errorCls = 'mt-1.5 text-xs text-red-500 font-medium';

  return (
    <form action={formAction} noValidate className="space-y-8">

      {/* ── Global error message ── */}
      {state.status === 'error' && state.message && !state.errors && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {state.message}
        </div>
      )}

      {/* ─── Section A: Your Details ─── */}
      <div>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0051FF] text-sm font-bold text-white">
            1
          </div>
          <h3 className="text-base font-bold text-gray-900">Your Details</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Referrer Name */}
          <div className="sm:col-span-2 md:col-span-1">
            <label htmlFor="referrerName" className={labelCls}>
              Your Full Name <span className="text-[#0051FF]">*</span>
            </label>
            <input
              id="referrerName"
              name="referrerName"
              type="text"
              autoComplete="name"
              placeholder="Het Soni"
              className={inputCls(state.errors?.referrerName)}
            />
            {state.errors?.referrerName && (
              <p className={errorCls}>{state.errors.referrerName}</p>
            )}
          </div>

          {/* Referrer Email */}
          <div>
            <label htmlFor="referrerEmail" className={labelCls}>
              Your Email <span className="text-[#0051FF]">*</span>
            </label>
            <input
              id="referrerEmail"
              name="referrerEmail"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={inputCls(state.errors?.referrerEmail)}
            />
            {state.errors?.referrerEmail && (
              <p className={errorCls}>{state.errors.referrerEmail}</p>
            )}
          </div>

          {/* Referrer Phone (optional) */}
          <div>
            <label htmlFor="referrerPhone" className={labelCls}>
              Your Phone{' '}
              <span className="text-xs font-normal text-gray-400">(optional)</span>
            </label>
            <input
              id="referrerPhone"
              name="referrerPhone"
              type="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210"
              className={inputCls(state.errors?.referrerPhone)}
            />
            {state.errors?.referrerPhone && (
              <p className={errorCls}>{state.errors.referrerPhone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-200" />

      {/* ─── Section B: Friend's Details ─── */}
      <div>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0051FF] text-sm font-bold text-white">
            2
          </div>
          <h3 className="text-base font-bold text-gray-900">Your Friend&apos;s Details</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Friend Name */}
          <div>
            <label htmlFor="friendName" className={labelCls}>
              Friend&apos;s Full Name <span className="text-[#0051FF]">*</span>
            </label>
            <input
              id="friendName"
              name="friendName"
              type="text"
              placeholder="Neel Patel"
              className={inputCls(state.errors?.friendName)}
            />
            {state.errors?.friendName && (
              <p className={errorCls}>{state.errors.friendName}</p>
            )}
          </div>

          {/* Friend Email */}
          <div>
            <label htmlFor="friendEmail" className={labelCls}>
              Friend&apos;s Email <span className="text-[#0051FF]">*</span>
            </label>
            <input
              id="friendEmail"
              name="friendEmail"
              type="email"
              placeholder="friend@example.com"
              className={inputCls(state.errors?.friendEmail)}
            />
            {state.errors?.friendEmail && (
              <p className={errorCls}>{state.errors.friendEmail}</p>
            )}
          </div>

          {/* Friend Company (optional) */}
          <div className="sm:col-span-2">
            <label htmlFor="friendCompany" className={labelCls}>
              Friend&apos;s Company / Business{' '}
              <span className="text-xs font-normal text-gray-400">(optional)</span>
            </label>
            <input
              id="friendCompany"
              name="friendCompany"
              type="text"
              placeholder="Acme Pvt Ltd"
              className={inputCls(state.errors?.friendCompany)}
            />
            {state.errors?.friendCompany && (
              <p className={errorCls}>{state.errors.friendCompany}</p>
            )}
          </div>

          {/* Friend Need — what kind of project */}
          <div className="sm:col-span-2">
            <label htmlFor="friendNeed" className={labelCls}>
              What kind of project do they need?{' '}
              <span className="text-[#0051FF]">*</span>
            </label>
            <textarea
              id="friendNeed"
              name="friendNeed"
              rows={4}
              placeholder="e.g. They run a restaurant and need a modern website with an online menu and reservation booking."
              className={`${inputCls(state.errors?.friendNeed)} resize-none`}
            />
            {state.errors?.friendNeed && (
              <p className={errorCls}>{state.errors.friendNeed}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Honeypot (hidden) ── */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden opacity-0"
      />

      {/* ── Submit ── */}
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
          By submitting, you confirm you have your friend&apos;s consent to share their contact details.
        </p>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex shrink-0 items-center gap-2.5 rounded-xl bg-[#0051FF] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#0040CC] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting…
            </>
          ) : (
            <>
              Submit Referral
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </>
          )}
        </button>
      </div>

    </form>
  );
}
