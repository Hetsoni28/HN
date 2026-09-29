import * as React from 'react';

/**
 * VisuallyHidden — renders children only for screen readers.
 * Use when an element needs a label for AT but the visual context makes it obvious.
 *
 * @example
 * <button>
 *   <svg aria-hidden="true" ... />
 *   <VisuallyHidden>Close menu</VisuallyHidden>
 * </button>
 */
export function VisuallyHidden({
  children,
  as = 'span',
}: {
  children: React.ReactNode;
  as?: React.ElementType;
}) {
  const Component = as;
  return (
    <Component className="sr-only">
      {children}
    </Component>
  );
}
