export function Marquee({ items }: { items: string[] }) {
  // We duplicate the items once so the continuous scroll works seamlessly
  // (Translating to -50% width covers the first set exactly)
  const repeatedItems = [...items, ...items];

  return (
    <div className="relative flex w-full overflow-hidden border-y border-slate-100 bg-slate-50 py-5">
      <div className="flex w-fit min-w-full shrink-0 animate-marquee items-center gap-16 px-8">
        {repeatedItems.map((item, index) => (
          <div
            key={index}
            className="flex shrink-0 items-center gap-16 text-sm font-bold uppercase tracking-widest text-slate-400"
          >
            <span>{item}</span>
            {/* The dot separator */}
            <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
