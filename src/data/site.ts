function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const site = {
  name: "VIZU DEUTSCH",
  title: "VIZU DEUTSCH | Deutsch lernen",
  description:
    "VIZU DEUTSCH — Deutsch lernen, Kurse, digitale Lernangebote und offizielle Kanäle.",
  tagline: "Deutsch lernen. Zukunft gestalten.",
  intro: "Deutsch lernen mit einem modernen, digitalen Bildungssystem.",
  highlights: ["Online-Kurse", "Video-Lektionen", "Community"],
  year: 2026,
  colors: {
    silver: "#E5E7EB",
    navy: "#0B1530",
  },
} as const;

export const teacher = {
  name: "Zayniddinkhuja Makhmudov",
  initials: "ZM",
  eyebrow: "Über den Dozenten",
  bio: "Dozent für Deutsch und Germanistik. Verbindet fundierte Sprachvermittlung mit modernen, digitalen Lernmethoden — für einen klaren Weg zur deutschen Sprache.",
  focus: ["Deutsch", "Germanistik", "Moderne Bildung"],
  cta: "Profil ansehen",
} as const;
