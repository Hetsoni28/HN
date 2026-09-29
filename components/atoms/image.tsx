import NextImage from 'next/image';

/**
 * Opinionated next/image wrapper that enforces:
 * - Required alt text
 * - Sensible defaults (lazy loading, modern formats via next.config)
 * - A consistent blur-up placeholder pattern
 */
export function Image({
  src,
  alt,
  width,
  height,
  fill,
  className = '',
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const common = {
    src,
    alt,
    className,
    priority,
    sizes,
    placeholder: 'blur' as const,
    // Lightweight 1×1 blue-tinted data URI for the blur placeholder
    blurDataURL:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  };

  if (fill) {
    return <NextImage {...common} fill />;
  }

  return <NextImage {...common} width={width ?? 800} height={height ?? 600} />;
}
