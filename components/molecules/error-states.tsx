import Link from 'next/link';

/* ─── Empty Project State ─── */
export function EmptyProjectsState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E2E5F1] bg-white px-8 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#0051FF]/40">
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
        </svg>
      </div>
      <h3 className="mt-5 text-lg font-bold text-slate-900">No projects in this category</h3>
      <p className="mt-2 max-w-xs text-sm text-slate-500">
        We&apos;re adding new case studies regularly. Check back soon, or view all projects.
      </p>
      <Link
        href="/work"
        className="mt-6 rounded-xl border border-[#E2E5F1] px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#0051FF]/30 hover:text-[#0051FF]"
      >
        View all projects
      </Link>
    </div>
  );
}
