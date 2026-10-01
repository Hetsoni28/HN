import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Proxy — runs before every request (Node.js runtime).
 *
 * Responsibilities:
 *  1. Content-Security-Policy header
 *  2. Additional security headers (complements next.config.ts)
 *  3. Simple edge-level rate limit on the /api and Server Action routes
 */

/* ── In-memory rate-limit store ── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function edgeRateLimit(ip: string, limit = 10, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) ?? { count: 0, resetAt: now + windowMs };
  if (now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  if (entry.count >= limit) return true;
  rateLimitMap.set(ip, { ...entry, count: entry.count + 1 });
  return false;
}

/* ── CSP directives ── */
function buildCSP(): string {
  const directives: Record<string, string> = {
    'default-src':     "'self'",
    'script-src':      "'self' 'unsafe-inline' 'unsafe-eval'",
    'style-src':       "'self' 'unsafe-inline'",
    'img-src':         "'self' data: blob: https://cdn.sanity.io",
    'font-src':        "'self' data:",
    'connect-src':     "'self' https://cdn.sanity.io https://api.sanity.io https://api.resend.com",
    'frame-src':       "'none'",
    'object-src':      "'none'",
    'base-uri':        "'self'",
    'form-action':     "'self'",
    'frame-ancestors': "'none'",
    'upgrade-insecure-requests': '',
  };

  return Object.entries(directives)
    .map(([k, v]) => (v ? `${k} ${v}` : k))
    .join('; ');
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? request.headers.get('x-real-ip')
    ?? '127.0.0.1';

  /* ── Rate limit: Server Actions (POST to any page) & API routes ── */
  const isServerAction = request.method === 'POST' && !pathname.startsWith('/_next');
  const isApiRoute = pathname.startsWith('/api/');

  if (isServerAction || isApiRoute) {
    const limited = edgeRateLimit(ip, 5, 60_000);
    if (limited) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please wait a moment.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
          },
        }
      );
    }
  }

  /* ── Apply security headers to all responses ── */
  const response = NextResponse.next();
  const headers = response.headers;

  headers.set('Content-Security-Policy', buildCSP());
  headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon.svg|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico|.*\\.webp|.*\\.avif).*)',
  ],
};
