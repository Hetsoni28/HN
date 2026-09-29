interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, className = '' }: EyebrowProps) {
  return (
    <span className={`eyebrow ${className}`.trim()}>
      {children}
    </span>
  );
}
