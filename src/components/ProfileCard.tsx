"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { enter } from "@/lib/motion";

export function ProfileCard() {
  const { t } = useLanguage();

  return (
    <motion.section
      {...enter(0.46, { y: 22 })}
      aria-labelledby="profile-heading"
      className="glass relative overflow-hidden rounded-3xl px-6 pt-6 pb-5"
    >
      <span aria-hidden="true" className="tricolor absolute inset-x-6 top-0 h-[2px] rounded-b-full" />

      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-de-amber uppercase">
          {t.profile.eyebrow}
        </p>
        <p className="hidden text-[11px] font-semibold tracking-[0.2em] text-navy-800/60 uppercase sm:block">
          {t.profile.meta}
        </p>
      </div>

      <h2 id="profile-heading" className="mt-3 text-lg font-bold tracking-tight text-navy-900">
        {site.name}
      </h2>
      <p className="mt-1.5 text-[15px] leading-relaxed text-slate-ink">{t.profile.intro}</p>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label={t.profile.highlightsLabel}>
        {t.profile.highlights.map((item) => (
          <li
            key={item}
            className="rounded-full border border-navy-900/10 bg-white/60 px-3 py-1 text-xs font-medium text-navy-800"
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.section>
  );
}
