# HN — Digital Product Studio

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Sanity CMS](https://img.shields.io/badge/Sanity-CMS-F03E2F?style=for-the-badge&logo=sanity)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer)

A high-performance, modern digital product studio website built with the **Next.js App Router**, **Sanity CMS**, and **Tailwind CSS**. This platform serves as the digital storefront for HN (Het & Neel), showcasing case studies, services, insights, and providing a seamless contact pipeline.

## 🚀 Features

- **Blazing Fast Performance**: 100% statically generated (SSG) pages utilizing Next.js 16 and Turbopack.
- **Robust CMS Integration**: Powered by Sanity CMS for managing case studies, services, blog posts, and FAQs, complete with a fallback content system if the CMS is empty.
- **Fluid Animations**: Scroll-triggered reveal animations and page transitions powered by Framer Motion.
- **Atomic Design Architecture**: Components organized strictly into Atoms, Molecules, and Organisms for extreme reusability and clean code.
- **Secure Contact Pipeline**: Integrated with Resend for transactional emails, protected by edge-level rate limiting and input sanitization.
- **Production-Grade Security**: Custom Next.js proxy (`proxy.ts`) enforcing strict Content-Security-Policy (CSP), XSS protection, and frame denial.
- **Type-Safe**: 100% strict TypeScript codebase with zero `any` leaks.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **CMS**: [Sanity](https://www.sanity.io/) (v3)
- **Emails**: [Resend](https://resend.com/)
- **Validation**: [Zod](https://zod.dev/)

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (Pages, Layouts, API routes)
├── components/           # UI Components (Atomic Design)
│   ├── atoms/            # Base elements (Buttons, Tags, Icons)
│   ├── molecules/        # UI groups (Cards, Breadcrumbs, NavLinks)
│   └── organisms/        # Page sections (Navbar, Footer, Hero, ContactForm)
├── lib/                  # Utilities, Types, and CMS Fallback Content
├── sanity/               # Sanity CMS configuration and schema definitions
├── scripts/              # Build scripts and data seeders
├── styles/               # Global CSS and Tailwind directives
├── next.config.ts        # Next.js configuration and headers
└── proxy.ts              # Edge-level proxy for security headers & rate limiting
```

## 💻 Local Development

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- A Sanity.io account
- A Resend account (for contact form functionality)

### 1. Clone the repository
```bash
git clone https://github.com/Hetsoni28/HN.git
cd HN
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Copy the example environment file and fill in your keys:
```bash
cp .env.example .env.local
```
Inside `.env.local`, you will need to provide:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `RESEND_API_KEY`
- `CONTACT_EMAIL`

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. To access the Sanity CMS Studio, navigate to [http://localhost:3000/studio](http://localhost:3000/studio).

## 🚀 Deployment

This project is optimized for deployment on **Vercel**. 

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Add the environment variables from your `.env.local` file into the Vercel dashboard.
4. Deploy!

## 🔐 Security

- **Rate Limiting**: The contact form and API routes are rate-limited to prevent spam.
- **Input Sanitization**: All form inputs are sanitized to strip HTML/scripts before processing.
- **Headers**: Strict security headers are enforced globally via `proxy.ts`.

---
*Designed and engineered by Het Soni & Neel Patel.*
