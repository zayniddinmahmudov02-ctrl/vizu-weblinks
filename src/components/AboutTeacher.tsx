"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getLink } from "@/data/links";
import { teacher } from "@/data/site";
import { reveal } from "@/lib/motion";

export function AboutTeacher() {
  const profile = getLink("teacher");

  return (
    <motion.section
      {...reveal(0.1)}
      aria-labelledby="teacher-heading"
      className="glass rounded-3xl p-6"
    >
      <div className="flex items-center gap-4">
        <div
          aria-hidden="true"
          className="relative grid size-14 shrink-0 place-items-center rounded-full bg-[conic-gradient(from_200deg,#fff,#c3c8d0,#f4f5f7,#a9b0bb,#fff)] p-[3px] shadow-[0_10px_24px_-12px_rgb(11_21_48/0.5)]"
        >
          <span className="navy-surface grid size-full place-items-center rounded-full text-base font-bold tracking-tight text-white">
            {teacher.initials}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-de-amber uppercase">
            {teacher.eyebrow}
          </p>
          <h2 id="teacher-heading" className="mt-1 text-lg leading-snug font-bold tracking-tight text-navy-900">
            {teacher.name}
          </h2>
        </div>
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-slate-ink">{teacher.bio}</p>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Schwerpunkte">
        {teacher.focus.map((item) => (
          <li
            key={item}
            className="rounded-full border border-navy-900/10 bg-white/60 px-3 py-1 text-xs font-medium text-navy-800"
          >
            {item}
          </li>
        ))}
      </ul>

      <a
        href={profile.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-navy-900 px-5 text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgb(11_21_48/0.7)] transition-[background-color,transform] duration-200 outline-none hover:bg-navy-800 focus-visible:ring-2 focus-visible:ring-navy-900 focus-visible:ring-offset-2 focus-visible:ring-offset-silver-200 active:scale-[0.97]"
      >
        {teacher.cta}
        <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        <span className="sr-only"> (öffnet in neuem Tab)</span>
      </a>
    </motion.section>
  );
}
