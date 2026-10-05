import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ── Images ──────────────────────────────────────────────────────────────
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: '**.sanity.io' },
    ],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    qualities: [25, 50, 75, 100],
  },

  // ── Compression ──────────────────────────────────────────────────────────
  compress: true,

  // ── PoweredByHeader ──────────────────────────────────────────────────────
  poweredByHeader: false,

  // ── Strict mode ──────────────────────────────────────────────────────────
  reactStrictMode: true,

  // ── Security & cache headers ─────────────────────────────────────────────
  async headers() {
    return [
      {
        // Fonts & images in public/
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Default security headers on all pages
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },

  // ── Canonical service & case-study redirects ─────────────────────────────
  async redirects() {
    return [
      // Legacy service slugs -> canonical service routes
      { source: '/services/web-development', destination: '/services/websites', permanent: true },
      { source: '/services/web-app-development', destination: '/services/web-applications', permanent: true },
      { source: '/services/saas-development', destination: '/services/saas-platforms', permanent: true },
      { source: '/services/mobile-app-development', destination: '/services/mobile-applications', permanent: true },
      { source: '/services/ai-development', destination: '/services/ai-solutions', permanent: true },

      // Legacy case-study slugs -> canonical case-study routes
      { source: '/work/urbanfit-app', destination: '/work/fittrack-pro', permanent: true },
      { source: '/work/nexusecom', destination: '/work/nexus-ecommerce', permanent: true },
      { source: '/work/fintech-vault', destination: '/work/financeflow', permanent: true },
    ];
  },

  // ── Experimental ─────────────────────────────────────────────────────────
  experimental: {
    // Optimise package imports — tree-shake large icon/animation libs
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};

export default nextConfig;
