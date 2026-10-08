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

- **Links** — [src/data/links.ts](src/data/links.ts): URL, icon, `external`, `featured`, plus the teacher CV URL.
- **UI copy (UZ / DE / EN)** — [src/i18n/translations.ts](src/i18n/translations.ts), including link titles and descriptions.
- **Brand data** (name, full institute name, logo path, CEFR levels) — [src/data/site.ts](src/data/site.ts).

Default language is Uzbek; the visitor's choice is remembered in `localStorage`.
To add a language: add its code to `locales` in [src/i18n/config.ts](src/i18n/config.ts) and a matching
`Dictionary` in `translations.ts` — TypeScript flags any missing string.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://links.vizu-deutsch.com`) so canonical and Open Graph URLs
are absolute. On Vercel the production URL is detected automatically when the variable is not set.

## Structure

```
src/
  app/          layout (metadata, font), page, globals.css, icon.svg, apple-icon, opengraph-image
  components/   Hero, BrandLogo (+ BrandMark fallback), LanguageSwitcher, ProfileCard,
                SocialLinks, SocialLinkCard, LevelStaircase, TeacherSection, Footer,
                GermanyBackground, GermanyFlag, landmarks, Providers, icons/BrandIcons
  data/         links.ts, site.ts
  i18n/         config.ts, translations.ts, LanguageProvider.tsx
  lib/          motion.ts (shared animation presets), cn.ts
public/photo/   logo (served as AVIF/WebP via next/image)
```

Animations respect `prefers-reduced-motion` (flag, parallax and the staircase ball stop; the ball rests on C1).
Heavier ambient motion (light pools, sheen, extra particles) runs only from tablet width up.
