"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { teacherProfileUrl } from "@/data/links";
import { teacher } from "@/data/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { reveal } from "@/lib/motion";

export function TeacherSection() {
  const { t } = useLanguage();

  return (
    <motion.section
      {...reveal(0.1)}
      aria-labelledby="teacher-heading"
      className="glass rounded-3xl p-5 sm:p-6"
    >
      <div className="flex items-center gap-3.5">
        <div
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-full bg-[conic-gradient(from_200deg,#fff,#c3c8d0,#f4f5f7,#a9b0bb,#fff)] p-[3px] shadow-[0_10px_24px_-12px_rgb(11_21_48/0.5)]"
        >
          <span className="navy-surface grid size-full place-items-center rounded-full text-sm font-bold tracking-tight text-white">
            {teacher.initials}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-de-amber uppercase">
            {t.teacher.eyebrow}
          </p>
          <h2 id="teacher-heading" className="mt-0.5 text-base leading-snug font-bold tracking-tight text-navy-900 sm:text-lg">
            {teacher.name}
          </h2>
        </div>
      </div>

      <p className="mt-3.5 text-sm leading-relaxed text-slate-ink">{t.teacher.bio}</p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-4">
        <ul className="flex flex-wrap gap-1.5" aria-label={t.teacher.focusLabel}>
          {t.teacher.focus.map((item) => (
            <li
              key={item}
              className="rounded-full border border-navy-900/10 bg-white/60 px-2.5 py-1 text-[11px] font-medium text-navy-800"
            >
              {item}
            </li>
          ))}
        </ul>

        <a
          href={teacherProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-navy-900 px-4.5 text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgb(11_21_48/0.7)] transition-[background-color,transform] duration-200 outline-none hover:-translate-y-0.5 hover:bg-navy-800 focus-visible:ring-2 focus-visible:ring-navy-900 focus-visible:ring-offset-2 focus-visible:ring-offset-silver-200 active:scale-[0.97]"
        >
          {t.teacher.cta}
          <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          <span className="sr-only"> {t.links.opensInNewTab}</span>
        </a>
      </div>
    </motion.section>
  );
}
