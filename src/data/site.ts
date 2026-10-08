function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

/** Language-independent brand data. UI copy lives in src/i18n/translations.ts. */
export const site = {
  name: "VIZU DEUTSCH",
  /** What the VIZU acronym stands for — always shown in German. */
  fullName: "Visuales Institut für Zukunft und Unterricht",
  title: "VIZU DEUTSCH | Deutsch lernen",
  description:
    "VIZU DEUTSCH — Deutsch lernen, Kurse, digitale Lernangebote und offizielle Kanäle.",
  ogTagline: "Deutsch lernen. Neue Perspektiven schaffen.",
  logo: {
    src: "/photo/photo_2026-08-31_09-47-38.jpg",
    width: 640,
    height: 640,
  },
  year: 2026,
  colors: {
    silver: "#E5E7EB",
    navy: "#0B1530",
  },
} as const;

export const teacher = {
  name: "Zayniddinkhuja Makhmudov",
  initials: "ZM",
} as const;

export const levels = ["A1", "A2", "B1", "B2", "C1"] as const;
