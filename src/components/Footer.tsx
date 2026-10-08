"use client";

import { motion } from "framer-motion";
import { footerLinks } from "@/data/links";
import { site } from "@/data/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { reveal } from "@/lib/motion";

export function Footer() {
  const { t } = useLanguage();

  return (
    <motion.footer
      {...reveal(0.1)}
      className="navy-surface relative overflow-hidden rounded-3xl px-6 pt-7 pb-6 text-center text-white"
    >
      <span aria-hidden="true" className="tricolor absolute inset-x-0 top-0 h-[3px]" />

      <p className="text-lg font-extrabold tracking-[0.18em]">{site.name}</p>
      <p lang="de" className="mt-1 text-[11px] tracking-[0.06em] text-white/45">
        {site.fullName}
      </p>
      <p className="mt-3 text-sm text-balance text-white/70">{t.tagline}</p>

      <nav aria-label={t.footer.socialLabel} className="mt-5">
        <ul className="flex items-center justify-center gap-3">
          {footerLinks.map(({ id, url, icon: Icon }) => {
            const label = id === "website" ? t.footer.websiteLabel : t.links.items[id].title;
            return (
              <li key={id}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} ${t.links.opensInNewTab}`}
                  className="grid size-11 place-items-center rounded-full bg-white/8 text-white/85 ring-1 ring-white/12 transition-[background-color,color,transform] duration-200 outline-none hover:-translate-y-0.5 hover:bg-white/15 hover:text-de-gold focus-visible:ring-2 focus-visible:ring-de-gold active:scale-95"
                >
                  <Icon aria-hidden className="size-[18px]" strokeWidth={1.8} />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <p className="mt-6 border-t border-white/10 pt-4 text-xs text-white/50">
        © {site.year} {site.name}
      </p>
    </motion.footer>
  );
}
