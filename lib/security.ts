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

/**
 * Sanitize an entire FormData object — returns a plain object
 * with all string values sanitized.
 */
export function sanitizeFormData(
  formData: FormData,
  keys: string[],
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of keys) {
    const val = formData.get(key);
    result[key] = typeof val === 'string' ? sanitizeText(val) : '';
  }
  return result;
}

/**
 * Validate that an email address looks legitimate.
 * Zod handles the primary validation; this is a secondary defence.
 */
export function isValidEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return re.test(email) && email.length <= 254;
}

/**
 * Check if a URL is safe to redirect to (prevent open redirect).
 * Only allow relative URLs starting with /.
 */
export function isSafeRedirect(url: string): boolean {
  return url.startsWith('/') && !url.startsWith('//');
}

/**
 * Mask a string for safe logging — shows first 3 + last 2 chars.
 * Use for email addresses, IPs, etc. in server logs.
 */
export function maskForLog(value: string): string {
  if (value.length <= 5) return '***';
  return `${value.slice(0, 3)}***${value.slice(-2)}`;
}
