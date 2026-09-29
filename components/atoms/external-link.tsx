import Link from 'next/link';

/**
 * ExternalLink — safe anchor for links leaving hn.studio.
 * Automatically adds rel="noopener noreferrer" to prevent:
 *  • noopener — stops opened page from accessing window.opener (tabnapping)
 *  • noreferrer — prevents Referer header leaking the origin URL
 *
 * Opens in a new tab by default.
 */
export function ExternalLink({
  href,
  children,
  className = '',
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  // Warn in dev if someone accidentally uses this for internal links
  if (process.env.NODE_ENV === 'development' && href.startsWith('/')) {
    console.warn(
      `[ExternalLink] "${href}" looks like an internal URL. Use Next.js <Link> instead.`
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
    >
      {children}
      {/* Screen-reader hint that this opens in a new tab */}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}
