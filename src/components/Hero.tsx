"use client";

import { motion } from "framer-motion";
import { BrandMark } from "@/components/BrandMark";
import { site } from "@/data/site";
import { enter } from "@/lib/motion";

export function Hero() {
  return (
    <header className="flex flex-col items-center text-center">
      <motion.div
        {...enter(0, { y: 0 })}
        className="mb-10 flex w-full items-center justify-between text-[11px] font-semibold tracking-[0.22em] text-navy-800/70 uppercase"
      >
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-4 rounded-[2px] tricolor-y" />
          Offizieller Link Hub
        </span>
        <span className="glass rounded-full px-2.5 py-1 tracking-[0.18em]">DE</span>
      </motion.div>

      <motion.div {...enter(0.1, { y: 0, scale: 0.88 })}>
        <BrandMark className="w-28 text-[17px] sm:w-32 sm:text-[19px]" />
      </motion.div>

      <motion.h1 {...enter(0.22, { y: 18 })} className="mt-7 flex flex-col items-center">
        <span className="metal-text text-[2.75rem] leading-none font-extrabold tracking-[-0.03em] sm:text-5xl">
          VIZU
        </span>{" "}
        <span className="mt-2 text-sm font-semibold tracking-[0.62em] text-navy-800 [margin-right:-0.62em]">
          DEUTSCH
        </span>
      </motion.h1>

      <motion.p
        {...enter(0.34, { y: 18 })}
        lang="de"
        className="mt-5 text-base font-medium text-slate-ink sm:text-lg"
      >
        {site.tagline}
      </motion.p>
    </header>
  );
}
