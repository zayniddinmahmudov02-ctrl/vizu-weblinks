"use client";

import { motion } from "framer-motion";
import { locales, localeLabels } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.header.languageLabel}
      className="glass flex items-center gap-0.5 rounded-full p-1"
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            aria-label={localeLabels[code].name}
            title={localeLabels[code].name}
            onClick={() => setLocale(code)}
            className={cn(
              "relative isolate h-8 min-w-10 rounded-full px-2.5 text-[11px] font-bold tracking-[0.14em] outline-none transition-colors duration-200",
              "focus-visible:ring-2 focus-visible:ring-navy-900 focus-visible:ring-offset-1",
              active ? "text-white" : "text-navy-800/60 hover:text-navy-900",
            )}
          >
            {active && (
              <motion.span
                layoutId="locale-pill"
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-full bg-navy-900 shadow-[0_4px_10px_-4px_rgb(11_21_48/0.6)]"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
            <span className="relative">{localeLabels[code].short}</span>
          </button>
        );
      })}
    </div>
  );
}
