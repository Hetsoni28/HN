interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline-white';
}

export function Tag({ children, variant = 'default' }: TagProps) {
  const classes: Record<string, string> = {
    default:       'bg-slate-100 text-slate-600',
    'outline-white': 'border border-white/15 text-white',
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${classes[variant]}`}
    >
      {children}
    </span>
  );
}
