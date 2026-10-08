"use client";

import { motion } from "framer-motion";
import { footerLinks } from "@/data/links";
import { site } from "@/data/site";
import { reveal } from "@/lib/motion";

export function Footer() {
  return (
    <motion.footer
      {...reveal(0.1)}
      className="navy-surface relative overflow-hidden rounded-3xl px-6 pt-7 pb-6 text-center text-white"
    >
      <span aria-hidden="true" className="tricolor absolute inset-x-0 top-0 h-[3px]" />

      <p className="text-lg font-extrabold tracking-[0.18em]">{site.name}</p>
      <p lang="de" className="mt-1.5 text-sm text-white/65">
        {site.tagline}
      </p>

      <nav aria-label="Soziale Kanäle" className="mt-5">
        <ul className="flex items-center justify-center gap-3">
          {footerLinks.map(({ id, title, url, icon: Icon }) => (
            <li key={id}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${id === "website" ? "Website" : title} (öffnet in neuem Tab)`}
                className="grid size-11 place-items-center rounded-full bg-white/8 text-white/85 ring-1 ring-white/12 transition-[background-color,color,transform] duration-200 outline-none hover:-translate-y-0.5 hover:bg-white/15 hover:text-de-gold focus-visible:ring-2 focus-visible:ring-de-gold active:scale-95"
              >
                <Icon aria-hidden className="size-[18px]" strokeWidth={1.8} />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <p className="mt-6 border-t border-white/10 pt-4 text-xs text-white/50">
        © {site.year} {site.name}
      </p>
    </motion.footer>
  );
}
