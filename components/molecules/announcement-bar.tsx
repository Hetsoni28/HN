import Link from 'next/link';

export function AnnouncementBar() {
  return (
    <div className="bg-[#0051FF] px-4 py-2.5 text-center text-xs font-semibold text-white sm:text-sm">
      <span className="opacity-90">🚀 Have a project in mind?</span>{' '}
      <Link 
        href="/estimate" 
        className="ml-1 inline-block font-bold underline decoration-white/40 underline-offset-4 transition-all hover:decoration-white"
      >
        Get an instant cost estimate &rarr;
      </Link>
    </div>
  );
}
