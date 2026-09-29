# Sanity setup for HN

1. Create a Sanity project and a `production` dataset.
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` to the project ID.
4. Set `NEXT_PUBLIC_SANITY_DATASET=production`.
5. Run `npm install` and `npm run dev`.
6. Open `/studio` to manage content.

Schemas included:
- Project
- Service
- Team Member
- Testimonial
- FAQ
- Blog Post
- Site Settings

The public website has safe static fallbacks when no Sanity project ID is configured, so the UI can be developed before the CMS is connected.
