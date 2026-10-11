# AUDIT SNAPSHOT — HN Digital Studio

Generated: 2026-10-07 | Inspection Mode: Read-Only Audit

---

## 1. Project map

### Folder Tree (up to 4 levels deep)

```text
HN-main/
├── .agents/
│   └── skills/
│       └── brag/
├── .vscode/
│   └── settings.json
├── app/
│   ├── (main)/
│   │   ├── about/
│   │   ├── brief/
│   │   ├── compare/
│   │   ├── contact/
│   │   ├── cookie-policy/
│   │   ├── estimate/
│   │   ├── insights/
│   │   │   └── [slug]/
│   │   ├── maintenance/
│   │   ├── privacy-policy/
│   │   ├── process/
│   │   ├── referral/
│   │   ├── services/
│   │   │   ├── [slug]/
│   │   │   └── [slug]/[city]/
│   │   ├── showreel/
│   │   ├── start/
│   │   ├── terms/
│   │   ├── work/
│   │   │   └── [slug]/
│   │   ├── error.tsx
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── api/
│   │   └── github/
│   │       └── route.ts
│   ├── studio/
│   │   └── [[...tool]]/
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── apple-icon.png
│   ├── icon.png
│   ├── layout.tsx
│   ├── manifest.ts
│   ├── opengraph-image.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   ├── welcome/
│   ├── footer.tsx
│   ├── navbar.tsx
│   ├── project-card.tsx
│   └── section-heading.tsx
├── lib/
│   ├── content.ts
│   ├── fonts.ts
│   ├── locations.ts
│   └── security.ts
├── public/
│   ├── images/
│   ├── video/
│   └── *.png, *.jpg, *.svg
├── sanity/
│   ├── lib/
│   │   ├── client.ts
│   │   └── image.ts
│   └── schemaTypes/
│       ├── blogPost.ts
│       ├── faq.ts
│       ├── index.ts
│       ├── project.ts
│       ├── service.ts
│       ├── siteSettings.ts
│       ├── teamMember.ts
│       └── testimonial.ts
├── scripts/
│   └── generate-seed.ts
├── styles/
│   └── globals.css
├── .env.example
├── .env.local
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── proxy.ts
├── README.md
├── sanity.cli.ts
├── sanity.config.ts
├── SECURITY.md
└── tsconfig.json
```

### File Count & Lines of Code by Type

| File Type | File Count | Total Lines of Code |
| --------- | ---------- | ------------------- |
| `.ts`     | 26         | 2,525               |
| `.tsx`    | 104        | 11,818              |
| `.css`    | 1          | 293                 |
| `.json`   | 11         | 48,259 (incl. lock) |

### Environment & Git Overview

- **Node version**: `v26.4.0`
- **Package manager**: `npm 11.17.0`
- **Git branch**: `main`
- **Total commits**: 217
- **Last 10 commits**:
  - `2a67a24` fix(typography): consolidate ad-hoc font sizes to adhere to cohesive type scale
  - `6ffbb89` feat(team): add LinkedIn profile for Het Soni and update structured data
  - `7168888` fix: restore github route template literals, normalize team linkedin links, and add social schema
  - `0f83037` fix: resolve typescript syntax error in github API route caused by escaped template literals
  - `ef4a3bd` feat(team): add GitHub and LinkedIn profiles for Vraj Prajapati
  - `f9b41b9` feat: make github api fully dynamic, automatically pulling the 3 most recently pushed repos
  - `266a23c` fix: revert to Commits API and support multi-repo array due to Events API stripping payloads
  - `7f7ce6b` feat: switch GitHub API to fetch user events instead of single repo to capture all activity
  - `880a47d` fix(featured-work): add heroImage to WorkProject type and remove unsafe as any casts
  - `3377322` fix: reduce github API cache time from 1 hour to 1 minute

---

## 2. package.json

### Full package.json

```json
{
  "name": "hn-digital-studio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3009",
    "build": "next build",
    "start": "next start --port 3009",
    "lint": "eslint ."
  },
  "dependencies": {
    "@sanity/client": "^8.7.0",
    "@sanity/image-url": "^2.1.1",
    "framer-motion": "^12.0.0",
    "html-to-image": "^1.11.13",
    "jspdf": "^4.2.1",
    "lucide-react": "^0.500.0",
    "next": "^16.0.0",
    "next-sanity": "^13.3.4",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "resend": "^6.30.0",
    "sanity": "^6.16.0",
    "zod": "^4.6.5"
  },
  "devDependencies": {
    "@sanity/vision": "^6.16.0",
    "@tailwindcss/postcss": "^4.1.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^16.0.0",
    "typescript": "^5.7.0"
  }
}
```

### Lockfile Status

- **Lockfile committed**: YES
- **Lockfile name**: `package-lock.json` (git-tracked)

---

## 3. Config files

### `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "**.sanity.io" },
    ],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    qualities: [25, 50, 75, 100],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/services/web-development",
        destination: "/services/websites",
        permanent: true,
      },
      {
        source: "/services/web-app-development",
        destination: "/services/web-applications",
        permanent: true,
      },
      {
        source: "/services/saas-development",
        destination: "/services/saas-platforms",
        permanent: true,
      },
      {
        source: "/services/mobile-app-development",
        destination: "/services/mobile-applications",
        permanent: true,
      },
      {
        source: "/services/ai-development",
        destination: "/services/ai-solutions",
        permanent: true,
      },
      {
        source: "/work/urbanfit-app",
        destination: "/work/fittrack-pro",
        permanent: true,
      },
      {
        source: "/work/nexusecom",
        destination: "/work/nexus-ecommerce",
        permanent: true,
      },
      {
        source: "/work/fintech-vault",
        destination: "/work/financeflow",
        permanent: true,
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
```

### `vercel.json`

`NOT FOUND`

### `proxy.ts` (Custom Edge Middleware)

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

function buildCSP(isDev: boolean): string {
  const directives: Record<string, string> = {
    "default-src": "'self'",
    "script-src": "'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src": "'self' 'unsafe-inline'",
    "img-src": "'self' data: blob: https://cdn.sanity.io",
    "media-src": "'self' data: blob:",
    "font-src": "'self' data:",
    "connect-src": isDev
      ? "'self' ws: wss: http: https: https://cdn.sanity.io https://*.api.sanity.io https://api.resend.com"
      : "'self' https://cdn.sanity.io https://*.api.sanity.io https://api.resend.com",
    "frame-src": "'none'",
    "object-src": "'none'",
    "base-uri": "'self'",
    "form-action": "'self'",
    "frame-ancestors": "'none'",
  };

  if (!isDev) {
    directives["upgrade-insecure-requests"] = "";
  }

  return Object.entries(directives)
    .map(([k, v]) => (v ? `${k} ${v}` : k))
    .join("; ");
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.nextUrl.hostname;
  const isDev =
    process.env.NODE_ENV !== "production" ||
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.endsWith(".local");

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "127.0.0.1";

  const isServerAction =
    request.method === "POST" && !pathname.startsWith("/_next");
  const isApiRoute = pathname.startsWith("/api/");

  if (isServerAction || isApiRoute) {
    const limit = isDev ? 120 : 5;
    const limited = edgeRateLimit(ip, limit, 60_000);
    if (limited) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests. Please wait a moment." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
          },
        },
      );
    }
  }

  const response = NextResponse.next();
  const headers = response.headers;

  headers.set("Content-Security-Policy", buildCSP(isDev));
  if (!isDev) {
    headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload",
    );
  }
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()",
  );
  headers.set("X-XSS-Protection", "1; mode=block");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon.svg|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico|.*\\.webp|.*\\.avif|.*\\.mp4).*)",
  ],
};
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    ".next/types/**/*.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

### `eslint.config.mjs`

```javascript
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "node_modules/**", "out/**"]),
]);
```

### `postcss.config.mjs`

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

### `sanity.config.ts`

```typescript
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const rawDataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();

export const isSanityConfigured = Boolean(
  rawProjectId &&
  rawProjectId !== "placeholder-project-id" &&
  rawProjectId !== "your_project_id_here" &&
  rawProjectId !== "dummy123" &&
  rawProjectId !== "unconfigured" &&
  !rawProjectId.includes("placeholder"),
);

export const projectId = isSanityConfigured ? rawProjectId! : "";
export const dataset = rawDataset || "production";

export default defineConfig({
  name: "hn-studio",
  title: "HN Studio",
  projectId: projectId || "unconfigured",
  dataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
```

### `sanity.cli.ts`

```typescript
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "zpuvaooc",
    dataset: "production",
  },
});
```

### `.gitignore`

```text
node_modules/
.next/
out/
.env*
!.env.example
.DS_Store
*.log
```

### `.env.example` (Variable Names Only)

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_READ_TOKEN`
- `RESEND_API_KEY`
- `CONTACT_EMAIL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `SANITY_REVALIDATE_SECRET`

### Env Files & Git Tracking Status

- `.env.example` — **Git Tracked**
- `.env.local` — **NOT Tracked** (ignored via `.gitignore`)

---

## 4. Environment variables

| Env Variable Name                            | File Where Used                                                                                                                        | Exposure Level | Purpose / Description                                  |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`              | `sanity.config.ts`, `sanity/lib/client.ts`, `scripts/generate-seed.ts`                                                                 | Client-exposed | Sanity CMS Project ID                                  |
| `NEXT_PUBLIC_SANITY_DATASET`                 | `sanity.config.ts`, `sanity/lib/client.ts`, `scripts/generate-seed.ts`                                                                 | Client-exposed | Target Sanity dataset (e.g., `production`)             |
| `NEXT_PUBLIC_SANITY_API_VERSION`             | `sanity/lib/client.ts`                                                                                                                 | Client-exposed | Sanity API version date string                         |
| `SANITY_API_TOKEN` / `SANITY_API_READ_TOKEN` | `sanity/lib/client.ts`                                                                                                                 | Server-only    | Secret token for draft & authenticated content reading |
| `NEXT_PUBLIC_SITE_URL`                       | `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`, `components/molecules/structured-data.tsx`, `app/(main)/insights/[slug]/page.tsx` | Client-exposed | Canonical base URL (default: `https://hntech.in`)      |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`       | `app/layout.tsx`                                                                                                                       | Client-exposed | Verification token for Google Search Console           |
| `RESEND_API_KEY`                             | `app/(main)/contact/actions.ts`, `app/(main)/referral/actions.ts`                                                                      | Server-only    | Secret API key for Resend email transmission           |
| `CONTACT_EMAIL`                              | `app/(main)/contact/actions.ts`, `app/(main)/referral/actions.ts`                                                                      | Server-only    | Target email inbox for contact & referral inquiries    |
| `GITHUB_TOKEN`                               | `app/api/github/route.ts`                                                                                                              | Server-only    | Personal Access Token to authenticate GitHub REST API  |
| `NODE_ENV`                                   | `proxy.ts`, `app/(main)/contact/actions.ts`, `app/(main)/referral/actions.ts`, `components/atoms/external-link.tsx`                    | Built-in       | Runtime environment ('production' / 'development')     |
| `SANITY_REVALIDATE_SECRET`                   | `.env.example` only                                                                                                                    | Server-only    | Documented webhook payload validation secret           |

---

## 5. Routes & pages

### App Router Route Inventory

| Route Path                | Type             | Revalidate                | Client Component ("use client")  | generateMetadata   | loading.tsx | error.tsx              | not-found.tsx              |
| ------------------------- | ---------------- | ------------------------- | -------------------------------- | ------------------ | ----------- | ---------------------- | -------------------------- |
| `/`                       | Static           | —                         | No                               | Static Metadata    | No          | `app/(main)/error.tsx` | `app/(main)/not-found.tsx` |
| `/_not-found`             | Static           | —                         | No                               | Static Metadata    | No          | `app/(main)/error.tsx` | Built-in                   |
| `/about`                  | Static           | —                         | No                               | Static Metadata    | No          | `app/(main)/error.tsx` | `app/(main)/not-found.tsx` |
| `/brief`                  | Static           | —                         | No                               | Static Metadata    | No          | `app/(main)/error.tsx` | `app/(main)/not-found.tsx` |
| `/compare`                | Static           | —                         | No                               | Static Metadata    | No          | `app/(main)/error.tsx` | `app/(main)/not-found.tsx` |
| `/contact`                | Dynamic (Action) | —                         | Sub-tree (`ContactForm`)         | Static Metadata    | No          | `app/(main)/error.tsx` | `app/(main)/not-found.tsx` |
| `/cookie-policy`          | Static           | —                         | No                               | Static Metadata    | No          | `app/(main)/error.tsx` | `app/(main)/not-found.tsx` |
| `/estimate`               | Static           | —                         | Sub-tree (`CostEstimator`)       | Static Metadata    | No          | `app/(main)/error.tsx` | `app/(main)/not-found.tsx` |
| `/insights`               | Static           | —                         | Sub-tree (`InsightsGrid`)        | Static Metadata    | No          | `app/(main)/error.tsx` | `app/(main)/not-found.tsx` |
| `/insights/[slug]`        | SSG (10 paths)   | 1h (`REVALIDATE.DYNAMIC`) | No                               | `generateMetadata` | No          | `app/(main)/error.tsx` | `app/(main)/not-found.tsx` |
| `/maintenance`            | Static           | —                         | No                               | Static Metadata    | No          | `app/(main)/error.tsx` | `app/(main)/not-found.tsx` |
| `/privacy-policy`         | Static           | —                         | No                               | Static Metadata    | No          | `app/(main)/error.tsx` | `app/(main)/not-found.tsx` |
| `/process`                | Static           | —                         | No                               | Static Metadata    | No          | `app/(main)/error.tsx` | `app/(main)/not-found.tsx` |
| `/referral`               | Dynamic (Action) | —                         | Sub-tree (`ReferralForm`)        | Static Metadata    | No          | `app/(main)/error.tsx` | `app/(main)/not-found.tsx` |
| `/services`               | Static           | —                         | Sub-tree (`ServicesSection`)     | Static Metadata    | No          | `app/(main)/error.tsx` | `app/(main)/not-found.tsx` |
| `/services/[slug]`        | SSG (11 paths)   | 1d (`REVALIDATE.STATIC`)  | No                               | `generateMetadata` | No          | `app/(main)/error.tsx` | `app/(main)/not-found.tsx` |
| `/services/[slug]/[city]` | SSG (50 paths)   | 1d (`REVALIDATE.STATIC`)  | No                               | `generateMetadata` | No          | `app/(main)/error.tsx` | `app/(main)/not-found.tsx` |
| `/showreel`               | Static           | —                         | Sub-tree (`ShowreelPlayer`)      | Static Metadata    | No          | `app/(main)/error.tsx` | `app/(main)/not-found.tsx` |
| `/start`                  | Static           | —                         | Sub-tree (`OnboardingChecklist`) | Static Metadata    | No          | `app/(main)/error.tsx` | `app/(main)/not-found.tsx` |
| `/terms`                  | Static           | —                         | No                               | Static Metadata    | No          | `app/(main)/error.tsx` | `app/(main)/not-found.tsx` |
| `/work`                   | Static           | —                         | Sub-tree (`WorkFilter`)          | Static Metadata    | No          | `app/(main)/error.tsx` | `app/(main)/not-found.tsx` |
| `/work/[slug]`            | SSG (6 paths)    | 1h (`REVALIDATE.DYNAMIC`) | No                               | `generateMetadata` | No          | `app/(main)/error.tsx` | `app/(main)/not-found.tsx` |
| `/studio/[[...tool]]`     | Dynamic          | —                         | Yes (`StudioPage`)               | Via `next-sanity`  | No          | No                     | No                         |
| `/api/github`             | Static / ISR     | 1m                        | N/A (Route Handler)              | N/A                | No          | No                     | No                         |

### `npm run build` Route Summary Table

```text
Route (app)                                   Revalidate  Expire
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ƒ /about/opengraph-image-2sch2s
├ ○ /api/github                                       1m      1y
├ ○ /apple-icon.png
├ ○ /brief
├ ○ /compare
├ ƒ /compare/opengraph-image-w8oy9s
├ ƒ /contact
├ ƒ /contact/opengraph-image-w9hfvp
├ ○ /cookie-policy
├ ○ /estimate
├ ○ /icon.png
├ ○ /insights
├   /insights/[slug]
│ ├ ● /insights/saas-ai-analytics-2025
│ ├ ● /insights/nextjs-15-app-router-changes
│ ├ ● /insights/saas-pricing-page-converts
│ └ ● [+7 more paths]
├ ƒ /insights/[slug]/opengraph-image-1dv98n
├ ○ /maintenance
├ ƒ /maintenance/opengraph-image-162e0a
├ ○ /manifest.webmanifest
├ ƒ /opengraph-image
├ ○ /privacy-policy
├ ○ /process
├ ○ /referral
├ ƒ /referral/opengraph-image-1h636h
├ ○ /robots.txt
├ ○ /services
├   /services/[slug]
│ ├ ● /services/websites                              1d      1y
│ ├ ● /services/web-applications                      1d      1y
│ ├ ● /services/mobile-applications                   1d      1y
│ └ ● [+8 more paths]
├   /services/[slug]/[city]
│ ├ ● /services/web-development/ahmedabad
│ ├ ● /services/web-development/surat
│ ├ ● /services/web-development/vadodara
│ └ ● [+47 more paths]
├ ○ /showreel
├ ○ /sitemap.xml
├ ○ /start
├ ƒ /studio/[[...tool]]
├ ○ /terms
├ ○ /work
├   /work/[slug]
│ ├ ● /work/data-insight                              1h      1y
│ ├ ● /work/smartdrive-x                              1h      1y
│ ├ ● /work/medimind-ai                               1h      1y
│ └ ● [+3 more paths]
└ ƒ /work/[slug]/opengraph-image-10couh

ƒ Proxy (Middleware)
○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand

✓ Generating static pages using 11 workers (102/102) in 3.3s
```

**Build Warnings Encountered**:
`⚠ The Edge Runtime is deprecated. You can use the "nodejs" runtime instead. Learn more: https://nextjs.org/docs/messages/edge-runtime-deprecated`

---

## 6. API routes, route handlers & server actions

### Overview Matrix

| Handler               | File Path                        | Methods              | Description                                                                | Validation             | Auth | Rate Limit                        | Origin/CORS                | Third-Party Called | Error Output                           |
| --------------------- | -------------------------------- | -------------------- | -------------------------------------------------------------------------- | ---------------------- | ---- | --------------------------------- | -------------------------- | ------------------ | -------------------------------------- |
| GitHub Route          | `app/api/github/route.ts`        | GET                  | Fetches dynamic commit stream from user repos                              | None                   | No   | In `proxy.ts` (120 dev/5 prod)    | Public                     | GitHub REST API    | HTTP 200 + `FALLBACK_COMMITS`          |
| Contact Action        | `app/(main)/contact/actions.ts`  | Server Action (POST) | Validates lead inquiry & sends email notification with optional attachment | Zod (`InquirySchema`)  | No   | In-memory IP (3/min) + `proxy.ts` | Next.js Server Action CSRF | Resend API         | `{ status: 'error', message, errors }` |
| Referral Action       | `app/(main)/referral/actions.ts` | Server Action (POST) | Validates partner referral & sends notification                            | Zod (`ReferralSchema`) | No   | In-memory IP (3/min) + `proxy.ts` | Next.js Server Action CSRF | Resend API         | `{ status: 'error', message, errors }` |
| Draft/Preview Handler | `NOT FOUND`                      | N/A                  | No dedicated draft mode API route exists                                   | N/A                    | N/A  | N/A                               | N/A                        | N/A                | N/A                                    |
| Revalidate Webhook    | `NOT FOUND`                      | N/A                  | No on-demand revalidation webhook route configured                         | N/A                    | N/A  | N/A                               | N/A                        | N/A                | N/A                                    |

### Contact Form Handler Code (`app/(main)/contact/actions.ts`)

```typescript
"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { Resend } from "resend";
import { sanitizeText } from "@/lib/security";

const InquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").max(254),
  phone: z.string().max(30).optional(),
  company: z.string().max(100).optional(),
  projectType: z.string().min(1, "Please select a project type").max(60),
  description: z
    .string()
    .min(20, "Please describe your project in at least 20 characters")
    .max(3000),
  timeline: z.string().min(1, "Please select a timeline").max(60),
  website: z.string().max(0, "Bot detected"), // Honeypot
});

export type InquiryFormData = z.infer<typeof InquirySchema>;

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof InquiryFormData, string>>;
};

const rateMap = new Map<string, { count: number; resetAt: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip) ?? { count: 0, resetAt: now + 60_000 };
  if (now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (entry.count >= 3) return true;
  rateMap.set(ip, { ...entry, count: entry.count + 1 });
  return false;
}

export async function submitInquiry(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  let ip = "unknown";
  try {
    const headerList = await headers();
    ip = headerList.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  } catch {
    ip = "127.0.0.1";
  }

  if (isRateLimited(ip)) {
    return {
      status: "error",
      message:
        "Too many requests. Please wait a minute before submitting again.",
    };
  }

  const raw = {
    name: sanitizeText(String(formData.get("name") ?? "")),
    email: sanitizeText(String(formData.get("email") ?? "")),
    phone: sanitizeText(String(formData.get("phone") ?? "")),
    company: sanitizeText(String(formData.get("company") ?? "")),
    projectType: sanitizeText(String(formData.get("projectType") ?? "")),
    description: sanitizeText(String(formData.get("description") ?? "")),
    timeline: sanitizeText(String(formData.get("timeline") ?? "")),
    website: String(formData.get("website") ?? ""),
  };

  const parsed = InquirySchema.safeParse(raw);
  if (!parsed.success) {
    const errors: FormState["errors"] = {};
    for (const [key, msgs] of Object.entries(
      parsed.error.flatten().fieldErrors,
    )) {
      errors[key as keyof InquiryFormData] = msgs?.[0];
    }
    return { status: "error", message: "Please fix the errors below.", errors };
  }

  const data = parsed.data;
  const rawFile = formData.get("file") as File | null;
  let fileBase64: string | null = null;
  let fileName = "";
  let fileType = "application/octet-stream";

  if (rawFile && rawFile.size > 0) {
    if (rawFile.size > 5 * 1024 * 1024) {
      return { status: "error", message: "Attachment must be under 5MB." };
    }
    const arrayBuffer = await rawFile.arrayBuffer();
    fileBase64 = Buffer.from(arrayBuffer).toString("base64");
    fileName = rawFile.name;
    fileType = rawFile.type || "application/octet-stream";
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL ?? "contact.hnsolutions@gmail.com";

  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.log("[Contact Form — DEV MODE] Inbound inquiry:", data);
      return { status: "success" };
    }
    return {
      status: "error",
      message: "Email service is temporarily unavailable.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const attachments = fileBase64
      ? [{ filename: fileName, content: fileBase64, contentType: fileType }]
      : undefined;
    const { error: sendError } = await resend.emails.send({
      from: "HN Contact Form <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: data.email,
      subject: `New Inquiry — ${data.projectType} from ${data.name}${fileBase64 ? " 📎" : ""}`,
      attachments,
      html: `...`,
    });
    if (sendError) return { status: "error", message: "Delivery error." };
    return { status: "success" };
  } catch (err) {
    return { status: "error", message: "Unexpected delivery failure." };
  }
}
```

### GitHub Activity Feed Route Handler (`app/api/github/route.ts`)

```typescript
import { NextResponse } from "next/server";

export const revalidate = 60;

interface CommitItem {
  repo: string;
  message: string;
  date: string;
  url: string;
}

const FALLBACK_COMMITS: CommitItem[] = [
  {
    repo: "HN",
    message: "feat: dynamic studio route and atomic design mesh",
    date: "2026-10-06T18:30:00Z",
    url: "https://github.com/Hetsoni28/HN",
  },
  {
    repo: "HN",
    message: "perf: optimising core web vitals and zero-shift layout",
    date: "2026-10-05T14:15:00Z",
    url: "https://github.com/Hetsoni28/HN",
  },
  {
    repo: "HN",
    message: "fix(security): sanitize form payloads and enforce strict CSP",
    date: "2026-10-04T09:45:00Z",
    url: "https://github.com/Hetsoni28/HN",
  },
];

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
};

export async function GET() {
  const token = process.env.GITHUB_TOKEN?.trim();
  const headers: Record<string, string> = {
    "User-Agent": "HN-Digital-Studio/1.0",
    Accept: "application/vnd.github+json",
  };
  if (token) headers.Authorization = "Bearer " + token;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const reposRes = await fetch(
      "https://api.github.com/users/Hetsoni28/repos?sort=pushed&direction=desc&per_page=3",
      { headers, signal: controller.signal, next: { revalidate: 60 } },
    );
    if (!reposRes.ok) throw new Error("Failed to fetch repos");
    const reposData = await reposRes.json();
    const activeRepos = Array.isArray(reposData)
      ? reposData.map((r: { name: string }) => r.name)
      : ["HN"];

    const allCommits: CommitItem[] = [];
    for (const repo of activeRepos) {
      const res = await fetch(
        `https://api.github.com/repos/Hetsoni28/${repo}/commits?per_page=5`,
        { headers, signal: controller.signal, next: { revalidate: 60 } },
      );
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          for (const item of data) {
            if (item?.commit?.message && item?.commit?.author?.date) {
              allCommits.push({
                repo: repo,
                message:
                  item.commit.message.split("\n")[0] || "Update repository",
                date: item.commit.author.date,
                url:
                  typeof item.html_url === "string"
                    ? item.html_url
                    : `https://github.com/Hetsoni28/${repo}`,
              });
            }
          }
        }
      }
    }
    clearTimeout(timeoutId);
    allCommits.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    const finalCommits = allCommits.slice(0, 6);
    return NextResponse.json(
      finalCommits.length ? finalCommits : FALLBACK_COMMITS,
      { status: 200, headers: CACHE_HEADERS },
    );
  } catch {
    clearTimeout(timeoutId);
    return NextResponse.json(FALLBACK_COMMITS, {
      status: 200,
      headers: CACHE_HEADERS,
    });
  }
}
```

### WhatsApp Dynamic Link Builder (`components/molecules/whatsapp-button.tsx`)

```typescript
const WHATSAPP_NUMBER = "917990743263";

function getDynamicMessage(pathname: string): string {
  if (pathname.startsWith("/work/")) {
    const projectName = pathname
      .replace("/work/", "")
      .replace(/\/$/, "")
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return `Hi HN Tech! I just viewed the "${projectName}" case study on your website and I'm interested in building something similar. Can we discuss?`;
  }
  if (pathname.match(/^\/services\/[^/]+\/[^/]+/)) {
    const parts = pathname.split("/").filter(Boolean);
    const service = parts[1]
      ?.split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const city = parts[2]?.charAt(0).toUpperCase() + parts[2]?.slice(1);
    return `Hi HN Tech! I'm looking for ${service} services in ${city}. Can we discuss my project requirements?`;
  }
  if (pathname.startsWith("/services/")) {
    const service = pathname
      .replace("/services/", "")
      .replace(/\/$/, "")
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return `Hi HN Tech! I'm interested in your ${service} service. Can we discuss my project?`;
  }
  if (pathname.startsWith("/contact"))
    return `Hi HN Tech! I just filled out your contact form and wanted to follow up directly on WhatsApp. Can we connect?`;
  if (pathname.startsWith("/compare"))
    return `Hi HN Tech! I was comparing options on your website and I'd like to learn more about working with you. Can we chat?`;
  if (pathname.startsWith("/maintenance"))
    return `Hi HN Tech! I'm interested in one of your website maintenance plans. Can we discuss which plan suits me best?`;
  if (pathname.startsWith("/about"))
    return `Hi HN Tech! I just read about your team and I'd love to discuss a potential project together.`;
  return `Hi HN Tech! I'm interested in discussing a project. Can we connect?`;
}

// Resulting URL format:
// `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(getDynamicMessage(pathname))}`
```

---

## 7. Sanity setup

### Schema Types

1. **`project`**: `title`, `slug`, `category`, `industry`, `featured`, `shortDescription`, `heroImage`, `gallery`, `challenge`, `approach`, `solution`, `architecture`, `results`, `body`, `features`, `technology`, `timeline`, `role`, `liveUrl`, `seoTitle`, `seoDescription`.
2. **`service`**: `title`, `slug`, `icon`, `tagline`, `shortDescription`, `description`, `whatWeProvide`, `features`, `technology`, `order`.
3. **`teamMember`**: `name`, `role`, `tagline`, `bio`, `photo`, `skills`, `github`, `linkedin`, `twitter`, `displayOrder`.
4. **`testimonial`**: `clientName`, `clientRole`, `companyName`, `quote`, `rating`, `avatar`, `project`.
5. **`faq`**: `question`, `answer`, `category`, `displayOrder`.
6. **`blogPost`**: `title`, `slug`, `excerpt`, `coverImage`, `content`, `category`, `tags`, `readTime`, `author`, `featured`, `publishedAt`, `seoTitle`, `seoDescription`.
7. **`siteSettings`**: `siteName`, `tagline`, `email`, `phone`, `address`, `socialLinks`, `announcement`.

### Sanity Client Setup (`sanity/lib/client.ts`)

```typescript
import { createClient } from "next-sanity";

const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_READ_TOKEN;
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const rawDataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();

export const isSanityConfigured = Boolean(
  rawProjectId &&
  rawProjectId !== "placeholder-project-id" &&
  rawProjectId !== "your_project_id_here" &&
  rawProjectId !== "dummy123" &&
  rawProjectId !== "unconfigured" &&
  !rawProjectId.includes("placeholder"),
);

export const client = createClient({
  projectId: isSanityConfigured ? rawProjectId! : "dummy123",
  dataset: rawDataset || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-01",
  useCdn: !token,
  perspective: "published",
  stega: false,
  token, // Undefined in public client
});
```

### Studio Mounting & Access Configuration

- **Mount Path**: `app/studio/[[...tool]]/page.tsx`
- **Base Path**: `/studio` (defined in `sanity.config.ts`)
- **Noindex setting**: Set in `app/robots.ts` (`Disallow: /studio/`) and inherits default `noindex` via `next-sanity/studio` metadata export in `app/studio/[[...tool]]/layout.tsx`.
- **Auth/Access**: Managed via Sanity's third-party OAuth provider (Google, GitHub, email) on sanity.io.

### All GROQ Queries in Codebase (`lib/content.ts`)

1. `*[_type == "project"] | order(_createdAt desc)`
2. `*[_type == "project" && featured == true] | order(_createdAt desc)[0...3]`
3. `*[_type == "project" && slug.current == $slug][0]`
4. `*[_type == "service"] | order(order asc)`
5. `*[_type == "service" && slug.current == $slug][0]`
6. `*[_type == "teamMember"] | order(displayOrder asc)`
7. `*[_type == "faq"] | order(displayOrder asc)`
8. `*[_type == "blogPost" ${filter}] | order(publishedAt desc)` (parameterized with `{ category }`)
9. `*[_type == "blogPost" && featured == true] | order(publishedAt desc)[0...3]`
10. `*[_type == "blogPost" && slug.current == $slug][0]`
11. `*[_type == "blogPost" && _id != $currentId && category == $category] | order(publishedAt desc)[0...3]`

- **User input injection check**: **None**. All queries pass variables (`$slug`, `$category`, `$currentId`) via Sanity's parameterized params object.

### Local Fallback Mesh Architecture

- **Files**: `lib/content.ts` holds in-memory datasets (`FALLBACK_PROJECTS`, `FALLBACK_SERVICES`, `FALLBACK_TEAM`, `FALLBACK_FAQS`, `FALLBACK_POSTS`, `FALLBACK_TESTIMONIALS`).
- **Switching Logic**:

  ```typescript
  if (!hasSanity) return FALLBACK_DATA;
  const data = await client.fetch(...);
  return data.length ? data : FALLBACK_DATA;
  ```

  Guarantees zero blank screens even when Sanity is disconnected, misconfigured, or returning an empty array.

---

## 8. Security quick scans

### Secret Pattern Scan Across Repo & Git History

- `"sk_"`: 0 matches
- `"re_"`: `.env.example:19` (`RESEND_API_KEY=re_****[MASKED]`)
- `"api_key"`: 0 matches
- `"apikey"`: 0 matches
- `"secret"`: `package-lock.json` (Sanity CLI preview secrets references only), `SECURITY.md` notes
- `"token"`: `app/api/github/route.ts:39`, `sanity/lib/client.ts:3`, `.env.example:28`
- `"password"`: `styles/globals.css:100` (`input[type="password"]`), `package-lock.json`
- `"Bearer "`: `app/api/github/route.ts:47` (`headers.Authorization = 'Bearer ' + token;`)
- `"AKIA"`: 0 matches
- `"ghp_"`: 0 matches
- `"eyJ"`: `package-lock.json` (SHA integrity hash)

### Git History `.env*` Audit

`git log --all --full-history --name-only --oneline -- "*.env*"`

- Only `.env.example` has ever been checked in. **Zero production or local secrets exist in git history.**

### Dangerous Sinks Audit

- `dangerouslySetInnerHTML`: 5 matches (all strictly localized to JSON-LD Schema in `components/molecules/structured-data.tsx`)
- `eval(`: 0 matches
- `new Function`: 0 matches
- `innerHTML`: 0 matches
- `document.write`: 0 matches
- `window.open`: 1 match in `components/atoms/whatsapp-button.tsx` with `'noopener,noreferrer'`
- `target="_blank"` without `rel`: **0 matches** (every single link includes `rel="noopener noreferrer"`)
- `localStorage`: Used solely for cookie banner state (`hn-cookie-consent`)
- `sessionStorage`: Used solely for welcome intro playback state (`hn-welcome-played`)
- `console.log`: Present in development mock fallback paths in `contact/actions.ts` and `referral/actions.ts`

### External Domains

- APIs: `api.github.com`, `api.resend.com`, `cdn.sanity.io`, `*.api.sanity.io`
- External links / socials: `github.com`, `linkedin.com`, `wa.me`, `instagram.com`, `twitter.com`
- Portfolio client live demos: `ovow-foods.vercel.app`, `rajeshwari-jewellers.vercel.app`, `rkinteriordesign.co`

### Next.js Image Remote Patterns

Configured in `next.config.ts`:

- `https://cdn.sanity.io`
- `https://**.sanity.io`

### Security Headers Configured

Defined in `next.config.ts` (`headers()`) and `proxy.ts`:

- `Content-Security-Policy`: Custom policy with script-src, style-src, connect-src, frame-ancestors 'none'
- `Strict-Transport-Security`: `max-age=63072000; includeSubDomains; preload` (production HTTPS only)
- `X-Content-Type-Options`: `nosniff`
- `X-Frame-Options`: `DENY`
- `Referrer-Policy`: `strict-origin-when-cross-origin`
- `Permissions-Policy`: `camera=(), microphone=(), geolocation=(), payment=()`
- `X-XSS-Protection`: `1; mode=block`
- `productionBrowserSourceMaps`: `false` (default)

---

## 9. Dependency health

### `npm audit` Summary

- **Total vulnerabilities**: 27 (13 moderate, 14 high, 0 critical)
- **High severity packages**:
  - `adm-zip` (via `@sanity/runtime-cli` / `@module-federation`)
  - `braces` (via `chokidar` / `@sanity/codegen`)
  - `js-yaml` (via `@vercel/frameworks`)
  - `smol-toml` (via `@vercel/frameworks`)
  - `source-map-js`
  - `undici`
- **Assessment**: All high vulnerabilities reside in transitive build/CLI dependencies (`@sanity/cli`, `@sanity/codegen`). Runtime Next.js production dependencies are unaffected.

### `npm outdated` (Top Outdated)

| Package              | Current | Wanted  | Latest  | Location        |
| -------------------- | ------- | ------- | ------- | --------------- |
| `@sanity/client`     | 8.7.0   | 8.9.0   | 8.9.0   | root            |
| `@sanity/vision`     | 6.16.0  | 6.18.0  | 6.18.0  | devDependencies |
| `@types/node`        | 22.20.4 | 22.20.5 | 26.6.4  | devDependencies |
| `eslint`             | 9.39.5  | 9.39.5  | 10.12.0 | devDependencies |
| `eslint-config-next` | 16.3.6  | 16.4.0  | 16.4.0  | devDependencies |
| `framer-motion`      | 12.43.0 | 12.43.0 | 14.0.0  | dependencies    |
| `lucide-react`       | 0.500.0 | 0.500.0 | 1.52.0  | dependencies    |
| `next`               | 16.3.6  | 16.4.0  | 16.4.0  | dependencies    |
| `resend`             | 6.30.0  | 6.32.1  | 6.32.1  | dependencies    |
| `sanity`             | 6.16.0  | 6.18.0  | 6.18.0  | dependencies    |
| `typescript`         | 5.9.3   | 5.9.3   | 7.0.2   | devDependencies |

### `npx depcheck`

- **Unused dependencies**: `lucide-react`, `jspdf`, `html-to-image`
- **Unused devDependencies**: `@tailwindcss/postcss`, `@types/react-dom`
- **Missing explicit dependencies**: `@portabletext/react`, `@portabletext/types` (resolved transitively via `next-sanity`)

---

## 10. Code quality tools

### TypeScript & ESLint

- `npx tsc --noEmit`: **0 errors**
- `npm run lint`: **0 errors, 0 warnings**

### Code Metrics

- **`any` types count**: 4 (in `lib/content.ts` for Sanity assets and `app/api/github/route.ts`)
- **`@ts-ignore` count**: 0
- **`@ts-expect-error` count**: 0
- **`TODO` / `FIXME` count**: 0
- **Files with `"use client"`**: 31 files
- **Components / files over 300 lines**:
  - `lib/content.ts`: 1,075 lines
  - `app/(main)/maintenance/page.tsx`: 403 lines
  - `components/organisms/brief-generator.tsx`: 391 lines
  - `components/organisms/navbar.tsx`: 364 lines
  - `app/(main)/compare/page.tsx`: 343 lines
  - `components/organisms/showreel-player.tsx`: 343 lines
  - `components/organisms/footer.tsx`: 330 lines
  - `app/(main)/start/onboarding-checklist.tsx`: 323 lines
  - `components/organisms/cost-estimator.tsx`: 303 lines
- **Test files**: **0** (`NOT FOUND` — no Jest, Vitest, Playwright, or Cypress test suites configured).

---

## 11. SEO setup

### `app/layout.tsx` Metadata Configuration

```typescript
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hntech.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HN Tech — Digital Products From Ideas to Scale",
    template: "%s — HN Tech",
  },
  description:
    "A premium technology company building websites, web apps, SaaS, mobile apps, and AI solutions.",
  keywords: [
    "HN Tech",
    "technology company",
    "web development",
    "web applications",
    "AI solutions",
    "SaaS development",
    "mobile app development",
    "Next.js agency",
    "software development India",
    "Het Soni",
    "Neel Patel",
    "Vraj Prajapati",
  ],
  authors: [
    { name: "Het Soni" },
    { name: "Neel Patel" },
    { name: "Vraj Prajapati" },
  ],
  creator: "HN Tech",
  publisher: "HN Tech",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "HN Tech",
    title: "HN Tech — Digital Products From Ideas to Scale",
    description:
      "A premium technology company building websites, web apps, SaaS, mobile apps, and AI solutions.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "HN Tech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hetsoni",
    creator: "@hetsoni",
    title: "HN Tech — Digital Products From Ideas to Scale",
    description:
      "A premium technology company building websites, web apps, SaaS, mobile apps, and AI solutions.",
    images: [`${SITE_URL}/opengraph-image.png`],
  },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  alternates: { canonical: SITE_URL },
};
```

### `app/robots.ts`

```typescript
import type { MetadataRoute } from "next";
const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://hntech.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/studio/"] }],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
```

### `app/sitemap.ts`

Generates entries for all core pages (`/`, `/about`, `/services`, `/work`, `/insights`, `/contact`, `/estimate`, `/process`, `/brief`, `/compare`, `/maintenance`, `/start`, `/referral`, `/privacy-policy`, `/terms`, `/cookie-policy`), 11 service slugs, 50 city-specific service pages, 6 case study slugs, and 10 insight blog slugs.

### JSON-LD Structured Data

Implemented via `components/molecules/structured-data.tsx`:

- `OrganizationJsonLd`: Schema.org Organization + Founders (`Het Soni`, `Neel Patel`, `Vraj Prajapati`) + `sameAs` links.
- `WebSiteJsonLd`: Potential search action schema.
- `ArticleJsonLd`: Blog post article metadata.
- `BreadcrumbJsonLd`: Hierarchical breadcrumbs.
- `ServiceJsonLd`: Service catalog schema.

### Vercel Preview Domain Noindex

- Handled at Vercel platform level (`x-robots-tag: noindex` header is sent automatically on non-production Vercel branches, but `hn-tawny.vercel.app` is currently aliased as the primary deployment).

---

## 12. Performance & assets

### Top 20 Largest Files in `/public`

1. `3,143.9 KB` — `public/video/Digital_studio_product_video_loop_20261002013835.mp4`
2. `910.0 KB` — `public/service-maintenance-hero.png`
3. `900.0 KB` — `public/images/websites-hero.png`
4. `892.6 KB` — `public/images/contact-hero.png`
5. `889.2 KB` — `public/images/home-hero.png`
6. `866.1 KB` — `public/og-image.png`
7. `850.1 KB` — `public/images/showreel/before.jpg`
8. `803.0 KB` — `public/service-saas-hero.png`
9. `767.1 KB` — `public/maintenance-hero.png`
10. `736.6 KB` — `public/images/slider-before.jpg`
11. `688.2 KB` — `public/images/insights-hero-new.png`
12. `687.2 KB` — `public/referral-hero.png`
13. `686.6 KB` — `public/process-hero.png`
14. `674.8 KB` — `public/images/estimator-hero.png`
15. `671.3 KB` — `public/hero-bg.jpg`
16. `661.2 KB` — `public/about-hero.png`
17. `646.6 KB` — `public/service-mobileapps-hero.png`
18. `641.4 KB` — `public/start-hero.png`
19. `623.8 KB` — `public/images/showreel/dev.jpg`
20. `618.0 KB` — `public/service-ai-hero.png`

### Asset Types in `/public`

`.mp4`, `.png`, `.jpg`, `.svg`

### Fonts Used

- `Space Grotesk` (`weights: 500, 600, 700`) via `next/font/google` (`--font-space-grotesk`)
- `Plus Jakarta Sans` (`weights: 400, 500, 600, 700`) via `next/font/google` (`--font-plus-jakarta`)
- **Loading strategy**: Self-hosted statically at build time; 0 external runtime requests; zero layout shift.

### Third-Party Scripts

`NOT FOUND` (No Google Tag Manager, Google Analytics, or third-party tracking scripts loaded via `next/script`).

### Heavy Libraries Audit

- `framer-motion`: Imported across 18 interactive components. Tree-shaken via `next.config.ts` (`optimizePackageImports`).
- `jspdf`: Declared in `package.json`, but `NOT IMPORTED` anywhere in project code.
- `html-to-image`: Declared in `package.json`, but `NOT IMPORTED` anywhere in project code.

### Lighthouse Execution

`npx lighthouse https://hntech.in --output=json --quiet --chrome-flags="--headless"`

- **Result**: Unable to run against `https://hntech.in` because `hntech.in` currently yields `NXDOMAIN` (domain not resolved in DNS).

---

## 13. Live site checks (passive, read-only)

### Live Headers Comparison

#### Target: `https://hntech.in`

- **Result**: `ERROR: Could not resolve host: hntech.in` (Domain does not exist in DNS).

#### Target: `https://hn-tawny.vercel.app`

```http
HTTP/1.1 200 OK
Accept-Ranges: bytes
Access-Control-Allow-Origin: *
Age: 0
Cache-Control: public, max-age=0, must-revalidate
Content-Disposition: inline
Content-Length: 227300
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://cdn.sanity.io; media-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https://cdn.sanity.io https://*.api.sanity.io https://api.resend.com; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
Content-Type: text/html; charset=utf-8
Date: Tue, 06 Oct 2026 21:50:35 GMT
Etag: "2c8c8e4070493a2623f1666af46db718"
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
Referrer-Policy: strict-origin-when-cross-origin
Server: Vercel
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch
X-Content-Type-Options: nosniff
X-Dns-Prefetch-Control: on
X-Frame-Options: DENY
X-Matched-Path: /
X-Nextjs-Prerender: 1
X-Nextjs-Stale-Time: 300
X-Vercel-Cache: PRERENDER
X-Xss-Protection: 1; mode=block
```

- **Security Headers Present**: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-XSS-Protection`.

### Live Endpoint Probes on `https://hn-tawny.vercel.app`

- `/studio` -> `HTTP 200 OK` (Loads Sanity studio fallback container)
- `/.env` -> `HTTP 404 Not Found` (Properly blocked)
- `/.git/config` -> `HTTP 404 Not Found` (Properly blocked)
- `/api` -> `HTTP 404 Not Found` (Blocked)
- `/_next/static/chunks` -> `HTTP 404 Not Found` (Directory listing disabled)
- Source Map files (`.map`) -> `HTTP 404 Not Found` (Source maps not exposed)

### Live Robots & Sitemap on Vercel

- `/robots.txt`:

  ```text
  User-Agent: *
  Allow: /
  Disallow: /api/
  Disallow: /studio/
  Host: http://localhost:3000
  Sitemap: http://localhost:3000/sitemap.xml
  ```

  _(Notice `http://localhost:3000` is emitted due to missing `NEXT_PUBLIC_SITE_URL` on Vercel environment)._

### DNS Records (`hntech.in`)

- **MX**: `UnKnown can't find hntech.in: Non-existent domain` (NXDOMAIN)
- **TXT / SPF**: `UnKnown can't find hntech.in: Non-existent domain`
- **DMARC**: `UnKnown can't find _dmarc.hntech.in: Non-existent domain`

---

## 14. Forms & lead flow

### 1. Contact Form Flow (`/contact`)

1. **Client interaction**: User enters name, email, phone, company, project type, timeline, description, and optional file attachment (up to 5MB).
2. **Honeypot protection**: Hidden input `name="website"` must remain empty (`z.string().max(0)`).
3. **Submission**: Dispatched via React Server Action `submitInquiry` (no exposed REST endpoint).
4. **Edge / Action validation**:
   - IP rate check (max 3 submissions per minute).
   - `sanitizeText` strips HTML/scripts from all text inputs.
   - Zod schema validation checks format and length boundaries.
   - File attachment buffer converted to base64.
5. **Email dispatch**: Sent via Resend API (`resend.emails.send`) to `CONTACT_EMAIL` (`contact.hnsolutions@gmail.com`).
6. **Data storage**: **Email only**. No records are saved to Postgres, Sanity, or any database.

### 2. Referral Form Flow (`/referral`)

1. **Client interaction**: User inputs referrer details and referred friend details.
2. **Validation & Protection**: Honeypot field `website` validated with Zod (`ReferralSchema`); IP rate limited to 3/minute.
3. **Email dispatch**: Transmitted via Resend to `CONTACT_EMAIL` with structured summary table.
4. **Data storage**: **Email only**.

### 3. Cost Estimator Flow (`/estimate`)

1. **Client interaction**: Interactive calculator where users toggle project type, feature addons, rush/flexible timelines, and optional budget target.
2. **Processing**: **100% Client-side**. Calculation executed via `useMemo` in `components/organisms/cost-estimator.tsx`.
3. **Dispatch**: Does not call any server action or database. Users are either redirected to `/contact` or prompted to open a pre-filled WhatsApp click-to-chat inquiry link (`https://wa.me/917990743263?text=...`).

---

## 15. Legal & content presence

| Item                      | Present?    | URL / Path                                                    |
| ------------------------- | ----------- | ------------------------------------------------------------- |
| Privacy Policy            | **YES**     | `/privacy-policy` (`app/(main)/privacy-policy/page.tsx`)      |
| Terms of Service          | **YES**     | `/terms` (`app/(main)/terms/page.tsx`)                        |
| Cookie Banner / Consent   | **YES**     | `components/molecules/cookie-banner.tsx` + `/cookie-policy`   |
| Refund / Engagement Terms | **YES**     | Section 2 & 3 in `/terms` (`app/(main)/terms/page.tsx`)       |
| About Page                | **YES**     | `/about` (`app/(main)/about/page.tsx`)                        |
| FAQ                       | **YES**     | Homepage section & `/services/*` (`FALLBACK_FAQS`)            |
| Blog / Insights           | **YES**     | `/insights` (`app/(main)/insights/page.tsx`) with 10 articles |
| Pricing / Packages        | **YES**     | `/maintenance` (tiered retainers), `/estimate` (calculator)   |
| Testimonials              | **YES**     | Homepage & `/about` (`FALLBACK_TESTIMONIALS`)                 |
| Case Studies Count        | **YES (6)** | `/work` (`FALLBACK_PROJECTS`: 6 in-depth case studies)        |
| Careers                   | `NOT FOUND` | No careers page configured                                    |
| 404 Page                  | **YES**     | `app/(main)/not-found.tsx`                                    |
| Company Address / GST     | **Partial** | Address listed as Ahmedabad, Gujarat, India; **No GSTIN**     |

---

## 16. Docs & DevOps

- **README**: Present (`README.md`), includes architecture diagram, tech badges, quick start instructions, and topology overview.
- **Setup Instructions**: Present in `README.md` and `.env.example`.
- **CI/CD Workflows (`.github/workflows`)**: `NOT FOUND` (no GitHub Actions pipelines).
- **Dependabot Configuration**: `NOT FOUND`.
- **Vercel Integration**: Deployed to Vercel preview (`hn-tawny.vercel.app`); deploy button in `README.md`.
- **Monitoring / Error Tracking**: `NOT FOUND` (no Sentry, Datadog, or LogRocket).
- **Analytics**: `NOT FOUND` (no Google Analytics, PostHog, or Vercel Analytics installed).

---

## 17. Your own first impressions

### Top 15 Risks, Bugs, Omissions & Architectural Weaknesses

1. **Production Domain `hntech.in` is NXDOMAIN (Unregistered / Unrouted DNS)**  
   _Paths: [app/layout.tsx](file:///v:/HN-main/app/layout.tsx#L8), [app/sitemap.ts](file:///v:/HN-main/app/sitemap.ts#L5), [.env.example](file:///v:/HN-main/.env.example#L26)_  
   The primary canonical domain configured across metadata, sitemaps, and docs (`https://hntech.in`) does not resolve in DNS. Anyone navigating to it receives a browser DNS resolution error.

2. **`NEXT_PUBLIC_SITE_URL` Defaults to `http://localhost:3000` on Vercel**  
   _Paths: [app/robots.ts](file:///v:/HN-main/app/robots.ts#L3), [app/sitemap.ts](file:///v:/HN-main/app/sitemap.ts#L5)_  
   Live testing of `https://hn-tawny.vercel.app/robots.txt` and `/sitemap.xml` reveals that links and host directives emit `http://localhost:3000` because `NEXT_PUBLIC_SITE_URL` is omitted in Vercel project environment settings.

3. **`proxy.ts` Middleware File Naming Discrepancy**  
   _Path: [proxy.ts](file:///v:/HN-main/proxy.ts)_  
   Standard Next.js requires the root Edge middleware to be named `middleware.ts`. While Next 16 Turbopack supports experimental flags, standard deployments may bypass this file if not named `middleware.ts`.

4. **Hardcoded Sanity Project ID in `sanity.cli.ts`**  
   _Path: [sanity.cli.ts](file:///v:/HN-main/sanity.cli.ts#L5)_  
   `sanity.cli.ts` has `projectId: 'zpuvaooc'` hardcoded, while `sanity.config.ts` reads from `NEXT_PUBLIC_SANITY_PROJECT_ID`. If the project ID changes in the env, CLI tools and runtime will desynchronize.

5. **In-Memory Rate Limiting Ineffective in Serverless / Edge Environments**  
   _Paths: [app/(main)/contact/actions.ts](file:///v:/HN-main/app/%28main%29/contact/actions.ts#L31), [app/(main)/referral/actions.ts](file:///v:/HN-main/app/%28main%29/referral/actions.ts#L31), [proxy.ts](file:///v:/HN-main/proxy.ts#L14)_  
   Using in-memory `Map` instances (`rateMap = new Map()`) provides zero real protection on Vercel, as each serverless function invocation runs in an isolated ephemeral container with its own reset memory space. Upstash Redis or KV is required.

6. **Unused Heavy Dependencies in `package.json`**  
   _Path: [package.json](file:///v:/HN-main/package.json#L15-L17)_  
   `jspdf`, `html-to-image`, and `lucide-react` are installed in dependencies but never imported in application code.

7. **Undeclared PortableText Dependencies**  
   _Path: [components/molecules/portable-text-renderer.tsx](file:///v:/HN-main/components/molecules/portable-text-renderer.tsx#L3-L4)_  
   Directly imports `@portabletext/react` and `@portabletext/types` without listing them in `package.json`. If `next-sanity` alters its transitive dependency tree, builds will fail.

8. **Plain-Text Logging of Inbound Lead Data in Development**  
   _Paths: [app/(main)/contact/actions.ts](file:///v:/HN-main/app/%28main%29/contact/actions.ts#L110), [app/(main)/referral/actions.ts](file:///v:/HN-main/app/%28main%29/referral/actions.ts#L92)_  
   Form handlers log client names, emails, phone numbers, and project scopes directly to stdout when `RESEND_API_KEY` is not set.

9. **Single Point of Failure: Zero Persistent Lead Storage**  
   _Paths: [app/(main)/contact/actions.ts](file:///v:/HN-main/app/%28main%29/contact/actions.ts), [app/(main)/referral/actions.ts](file:///v:/HN-main/app/%28main%29/referral/actions.ts)_  
   Inbound inquiries rely 100% on Resend delivery. If Resend faces an outage, rate limit, or configuration issue, high-value client leads are dropped with no database backup.

10. **Publicly Exposed `/studio` Route Without Pre-Authentication**  
    _Path: [app/studio/[[...tool]]/page.tsx](file:///v:/HN-main/app/studio/%5B%5B...tool%5D%5D/page.tsx)_  
    The CMS admin dashboard endpoint `/studio` is exposed to the public internet on Vercel without an IP gate or basic auth barrier.

11. **Deprecated Next.js Edge Runtime Warning**  
    _Path: [next.config.ts](file:///v:/HN-main/next.config.ts)_  
    Build output reports: `⚠ The Edge Runtime is deprecated. You can use the "nodejs" runtime instead.` Route handlers should migrate to Node.js runtime.

12. **Complete Absence of Automated Tests & CI/CD Pipelines**  
    _Path: Root directory_  
    There are zero unit tests, zero E2E tests, and no `.github/workflows` configuration. Regressions can only be detected via manual clicking.

13. **Missing Production Observability & Error Monitoring**  
    _Path: Root directory_  
    No Sentry, Datadog, or OpenTelemetry instrumentation. Client-side React exceptions or server action crashes in production occur silently.

14. **Lack of Official Business Tax & Registration Identifiers**  
    _Paths: [app/(main)/terms/page.tsx](file:///v:/HN-main/app/%28main%29/terms/page.tsx), [components/organisms/footer.tsx](file:///v:/HN-main/components/organisms/footer.tsx)_  
    No formal GSTIN or registered corporate entity name is published. For enterprise B2B sales in India, missing GST numbers can hinder formal procurement.

15. **SSR `localStorage` Warnings During Build**  
    _Paths: [components/molecules/cookie-banner.tsx](file:///v:/HN-main/components/molecules/cookie-banner.tsx), [components/welcome/WelcomeManager.tsx](file:///v:/HN-main/components/welcome/WelcomeManager.tsx)_  
    Static generation logs emit `ExperimentalWarning: localStorage is not available because --localstorage-file was not provided`, indicating web storage access during server prerendering.
