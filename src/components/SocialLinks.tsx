"use client";

import { motion } from "framer-motion";
import { SocialLinkCard } from "@/components/SocialLinkCard";
import { links } from "@/data/links";
import { useLanguage } from "@/i18n/LanguageProvider";
import { enter, linkDelay } from "@/lib/motion";

export function SocialLinks() {
  const { t } = useLanguage();

  return (
    <section id="links" aria-labelledby="links-heading" className="scroll-mt-6">
      <motion.div {...enter(0.56, { y: 10 })} className="mb-3.5 flex items-end justify-between px-1">
        <h2 id="links-heading" className="text-[11px] font-semibold tracking-[0.22em] text-navy-800/70 uppercase">
          {t.links.heading}
        </h2>
        <span className="text-[11px] font-medium tracking-[0.14em] text-navy-800/50 tabular-nums">
          {t.links.count(links.length)}
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
