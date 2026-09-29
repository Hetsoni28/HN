import Link from 'next/link';

/* ─── Shared icon ─── */
function StateIcon({ variant }: { variant: 'empty' | 'offline' | 'image' | 'form' }) {
  const icons = {
    empty: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
    ),
    offline: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    ),
    image: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    ),
    form: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
    ),
  };

  return (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
      {icons[variant]}
    </svg>
  );
}

/* ─── Empty State ─── */
export function EmptyState({
  title = 'Nothing here yet',
  description = 'Content will appear here once it has been added.',
  action,
}: {
  title?: string;
  description?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E2E5F1] bg-[#EEF0FF] px-8 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#E2E5F1] bg-white text-[#0051FF]/40">
        <StateIcon variant="empty" />
      </div>
      <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-xs text-sm text-slate-500">{description}</p>
      {action && (
        <Link
          href={action.href}
          className="mt-6 rounded-xl bg-[#0051FF] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#0040CC]"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

/* ─── CMS Unavailable State ─── */
export function CmsUnavailableState({ context = 'content' }: { context?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 px-8 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-200 bg-white text-amber-500">
        <StateIcon variant="offline" />
      </div>
      <h3 className="mt-5 text-lg font-bold text-slate-900">Content temporarily unavailable</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        We couldn&apos;t load the {context} from our CMS right now. This is usually temporary — please refresh the page or check back shortly.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 rounded-xl border border-amber-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-amber-300"
      >
        Refresh page
      </button>
    </div>
  );
}

/* ─── Image Failure State ─── */
export function ImageFailState({
  alt = 'Image',
  className = '',
}: {
  alt?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center bg-[#EEF0FF] text-[#0051FF]/30 ${className}`}>
      <StateIcon variant="image" />
      <span className="mt-2 text-xs font-semibold text-slate-400">{alt}</span>
    </div>
  );
}

/* ─── Form Error State ─── */
export function FormErrorState({
  message = 'Something went wrong. Please try again.',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-red-200 bg-red-50 p-5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
        <StateIcon variant="form" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-red-700">Submission failed</p>
        <p className="mt-1 text-sm text-red-600">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-3 text-sm font-semibold text-red-700 underline underline-offset-2 hover:text-red-800"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Empty Project State ─── */
export function EmptyProjectsState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E2E5F1] bg-white px-8 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#0051FF]/40">
        <StateIcon variant="empty" />
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
