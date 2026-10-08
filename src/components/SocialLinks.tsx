"use client";

import { motion } from "framer-motion";
import { SocialLinkCard } from "@/components/SocialLinkCard";
import { links } from "@/data/links";
import { enter, linkDelay } from "@/lib/motion";

export function SocialLinks() {
  return (
    <section id="links" aria-labelledby="links-heading" className="scroll-mt-6">
      <motion.div {...enter(0.56, { y: 10 })} className="mb-3.5 flex items-end justify-between px-1">
        <h2 id="links-heading" className="text-[11px] font-semibold tracking-[0.22em] text-navy-800/70 uppercase">
          Offizielle Kanäle
        </h2>
        <span className="text-[11px] font-medium tracking-[0.14em] text-navy-800/50 tabular-nums">
          {String(links.length).padStart(2, "0")} Links
        </span>
      </motion.div>

      <ul className="flex flex-col gap-3">
        {links.map((link, index) => (
          <SocialLinkCard key={link.id} link={link} index={index} delay={linkDelay(index)} />
        ))}
      </ul>
    </section>
  );
}
