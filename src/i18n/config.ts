export const locales = ["de", "uz", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "uz";

/** Short code shown in the switcher, full name for screen readers / tooltips. */
export const localeLabels: Record<Locale, { short: string; name: string }> = {
  de: { short: "DE", name: "Deutsch" },
  uz: { short: "UZ", name: "O‘zbek" },
  en: { short: "EN", name: "English" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
