/**
 * lib/security.ts — server-side input sanitization and validation utilities.
 * All functions run server-side only (in Server Actions / Route Handlers).
 */

/**
 * Strip HTML tags and dangerous characters from a string.
 * Used before storing or sending user-provided text.
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')                        // strip HTML tags
    .replace(/[<>"'`]/g, (c) => ({                  // escape remaining specials
      '<': '&lt;', '>': '&gt;', '"': '&quot;',
      "'": '&#x27;', '`': '&#x60;',
    }[c] ?? c))
    .replace(/javascript:/gi, '')                   // strip JS protocol
    .replace(/on\w+\s*=/gi, '')                     // strip event handlers
    .trim();
}
