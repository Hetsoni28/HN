/** Section label above a heading — one style across the site: short rule + tracked uppercase text. */
export function Eyebrow({
  children,
  dark = false,
  center = false,
  className = '',
}: {
  children: React.ReactNode;
  dark?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] ${
        dark ? 'text-[#7FA6FF]' : 'text-[#0041CC]'
      } ${center ? 'justify-center' : ''} ${className}`.trim()}
    >
      <span aria-hidden="true" className={`h-px w-8 ${dark ? 'bg-[#7FA6FF]' : 'bg-[#0051FF]'}`} />
      {children}
      {center && <span aria-hidden="true" className={`h-px w-8 ${dark ? 'bg-[#7FA6FF]' : 'bg-[#0051FF]'}`} />}
    </p>
  );
}
