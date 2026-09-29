export function AvailabilityBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2.5 rounded-full border border-slate-200/60 bg-white/80 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.15em] text-slate-900 shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:border-[#0051FF]/30 hover:shadow-md ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0051FF] opacity-40"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0051FF]"></span>
      </span>
      <span>Available for work</span>
    </div>
  );
}
