import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'white' | 'white-blue';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  disabled?: boolean;
  'aria-label'?: string;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-current'?: 'page' | 'step' | boolean;
  children: React.ReactNode;
}

export function Button({
  href,
  onClick,
  variant = 'primary',
  className = '',
  style,
  type = 'button',
  fullWidth = false,
  disabled = false,
  'aria-label': ariaLabel,
  'aria-expanded': ariaExpanded,
  'aria-controls': ariaControls,
  'aria-current': ariaCurrent,
  children,
}: ButtonProps) {
  const variantClass: Record<ButtonVariant, string> = {
    primary:      'btn-primary',
    secondary:    'btn-secondary',
    white:        'bg-white !text-[#0B111E] [text-shadow:none]',
    'white-blue': 'bg-white !text-[#0051FF] [text-shadow:none]',
  };

  const classes = [
    'btn',
    variantClass[variant],
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href && !disabled) {
    return (
      <Link
        href={href}
        className={classes}
        style={style}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      style={style}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-current={ariaCurrent}
    >
      {children}
    </button>
  );
}
