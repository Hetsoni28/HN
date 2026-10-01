<div align="center">
  <a href="https://hn.studio">
    <img src="public/hn-logo.svg" alt="HN Studio Logo" width="120" />
  </a>

  <br />
  <br />

  <h1 align="center">HN — Digital Product Studio</h1>

  <p align="center">
    A world-class digital storefront built for uncompromising performance, scalability, and design excellence.
    <br />
    <br />
    <a href="https://hn-tawny.vercel.app"><strong>Explore the live site →</strong></a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Sanity_CMS-F03E2F?style=for-the-badge&logo=sanity" alt="Sanity CMS" />
    <img src="https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel" alt="Vercel" />
  </p>
</div>

<hr />

##  The Vision

HN Studio is a two-person digital agency delivering high-end websites, web applications, and AI integrations. This repository houses our digital storefront—a masterclass in modern web engineering. Built on the bleeding edge of the React ecosystem, it achieves perfect Lighthouse scores, seamless headless CMS integration, and fluid micro-interactions without sacrificing SEO or accessibility.

## 𓅗 Architectural Highlights

- **Edge-Optimized Rendering:** 100% Statically Generated (SSG) with Next.js 16 App Router for zero-latency page loads.
- **Resilient Content Mesh:** Integrated with Sanity CMS. Features a fallback content engine that guarantees the site never renders empty, even during CMS downtime or initial setup.
- **Atomic Design System:** UI components are strictly categorized into `atoms`, `molecules`, and `organisms`, ensuring perfect reusability and isolated testing.
- **Fluid Motion Engine:** Orchestrated scroll reveals and route transitions powered by Framer Motion, automatically optimized to pause for `prefers-reduced-motion` user preferences.
- **Isolated CMS Environment:** Next.js Route Groups `(main)` isolate the public storefront from the embedded Sanity Studio (`/studio`), preventing layout collision and keeping the admin panel pure.
- **Fort Knox Security:** Custom edge proxy (`proxy.ts`) enforcing rigorous Content Security Policies (CSP), frame denial, and rate-limiting on server actions.

## 𓇂 Project Topology

```text
HN/
├── app/                  # Next.js App Router
│   ├└ (main)/           # Public-facing storefront pages (Home, Work, Contact, etc.)
│   └└ studio/           # Embedded Sanity CMS Admin Dashboard
├── components/           # UI Engine (Strict Atomic Design)
│   ├└ atoms/            # Single-purpose elements (Buttons, Icons, Tags)
│   ├└ molecules/        # Composed components (Cards, Form Fields)
│   └└ organisms/        # Distinct page sections (Navbar, Hero, Footer)
├── lib/                  # Core Utilities (Content Fallbacks, Typings, Fonts)
├── sanity/               # Headless CMS Schema & Client Configuration
├── styles/               # Global CSS & Tailwind configuration
├── next.config.ts        # Next.js Build & Header configurations
└── proxy.ts              # Edge Middleware (Security, CSP & Rate Limiting)
```

## 🚀 Quick Start

Experience the development environment locally.

### 1. Clone & Install
```bash
git clone https://github.com/Hetsoni28/HN.git
cd HN
npm install
```

### 2. Environment Configuration
Duplicate the example environment file:
```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity CMS Project ID |
| `RESEND_API_KEY` | Resend API key for the contact and referral forms |
| `CONTACT_EMAIL` | The inbox receiving form submissions |

### 3. Ignite the Server
``bbash
npm run dev
```
Navigate to **[http://localhost:3009](http://localhost:3009)** to view the application. Access the built-in CMS Studio at `/studio`.

## 🛡 Enterprise-Grade Security

- **Edge Rate Limiting:** All form submissions are rate-limited per IP address natively at the edge.
- **Input Sanitization:** Contact form pipelines utilize Zod for rigorous schema validation and a custom HTML stripper to prevent XSS.
- **Hardened Headers:** `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and a strict `Content-Security-Policy` dynamically generated in `proxy.ts`.

## ☁️ Deployment

Designed for seamless deployment on Vercel. 

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FHetsoni28%2FHN)

---
<div align="center">
  <p>Engineered with precision by <strong>Het Soni</strong> & <strong>Neel Patel</strong>.</p>
</div>