# VIZU DEUTSCH — Link Hub

The official one-page link hub for VIZU DEUTSCH: brand, official channels and a short teacher profile.

Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS 4, Framer Motion, Lucide.

## Scripts

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build && npm run start
```

## Editing content

- **Links** — [src/data/links.ts](src/data/links.ts): title, description, URL, icon, `external`, `featured`.
- **Brand texts & teacher profile** — [src/data/site.ts](src/data/site.ts).

Components never hardcode links; they read from these two files.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://links.vizu-deutsch.com`) so canonical and Open Graph URLs
are absolute. On Vercel the production URL is detected automatically when the variable is not set.

## Structure

```
src/
  app/          layout (metadata, font), page, globals.css, icon.svg, apple-icon, opengraph-image
  components/   Background, BrandMark, Hero, ProfileCard, SocialLinks, SocialLinkCard,
                AboutTeacher, Footer, Providers, icons/BrandIcons
  data/         links.ts, site.ts
  lib/          motion.ts (shared animation presets), cn.ts
```

Animations respect `prefers-reduced-motion`; decorative background motion is disabled on mobile.
