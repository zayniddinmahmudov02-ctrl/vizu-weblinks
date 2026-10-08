"use client";

import { motion } from "framer-motion";
import { BrandLogo } from "@/components/BrandLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { site } from "@/data/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { enter } from "@/lib/motion";

/** Renders the institute name with the V-I-Z-U initials subtly emphasized. */
function FullName() {
  return site.fullName.split(" ").map((word, i) => {
    const isInitial = /^[VIZU]/.test(word);
    return (
      <span key={word}>
        {i > 0 && " "}
        {isInitial ? (
          <>
            <span className="font-semibold text-navy-900">{word[0]}</span>
            {word.slice(1)}
          </>
        ) : (
          word
        )}
      </span>
    );
  });
}

export function Hero() {
  const { locale, t } = useLanguage();

  return (
    <header className="relative flex flex-col items-center text-center">
      <a
        href="#links"
        className="sr-only z-50 rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {t.skipToLinks}
      </a>

      <motion.div
        {...enter(0, { y: 0 })}
        className="mb-8 flex w-full items-center justify-between gap-3 sm:mb-10"
      >
        <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-navy-800/70 uppercase">
          <span aria-hidden="true" className="h-2.5 w-4 shrink-0 rounded-[2px] tricolor-y" />
          {t.header.hubLabel}
        </span>
        <LanguageSwitcher />
      </motion.div>

      <h1 className="flex flex-col items-center">
        <motion.span {...enter(0.1, { y: 0, scale: 0.9 })} className="block">
          <BrandLogo className="w-[132px] sm:w-[152px]" />
        </motion.span>
        <motion.span
          {...enter(0.24, { y: 14 })}
          lang="de"
          className="mt-6 block max-w-[19rem] text-[13px] leading-relaxed font-normal tracking-[0.06em] text-balance text-slate-ink sm:max-w-none sm:text-sm"
        >
          <FullName />
        </motion.span>
      </h1>

      <motion.div {...enter(0.3, { y: 0 })} aria-hidden="true" className="mt-5 flex gap-1">
        <span className="h-[2px] w-5 rounded-full bg-de-black" />
        <span className="h-[2px] w-5 rounded-full bg-de-red" />
        <span className="h-[2px] w-5 rounded-full bg-de-gold" />
      </motion.div>

      <motion.p
        {...enter(0.36, { y: 16 })}
        lang={locale}
        className="mt-5 max-w-[22rem] text-base leading-snug font-semibold tracking-tight text-balance text-navy-900 sm:text-lg"
      >
        {t.tagline}
      </motion.p>
    </header>
  );
}
