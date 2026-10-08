"use client";

import { useRef, useState, type PointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { HubLink } from "@/data/links";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";

type Ripple = { id: number; x: number; y: number; size: number };

interface SocialLinkCardProps {
  link: HubLink;
  index: number;
  delay: number;
}

export function SocialLinkCard({ link, index, delay }: SocialLinkCardProps) {
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();
  const text = t.links.items[link.id];
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const nextRippleId = useRef(0);
  const Icon = link.icon;
  const featured = link.featured ?? false;

  function spawnRipple(event: PointerEvent<HTMLAnchorElement>) {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ripple: Ripple = {
      id: nextRippleId.current++,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      size: Math.max(rect.width, rect.height) * 1.4,
    };
    setRipples((current) => [...current, ripple]);
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
    >
      <motion.a
        href={link.url}
        {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
        onPointerDown={spawnRipple}
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
        className={cn(
          "group relative isolate flex min-h-[72px] items-center gap-3.5 overflow-hidden rounded-2xl py-3.5 pr-4 pl-3.5 outline-none sm:gap-4 sm:pl-4",
          "transition-[border-color,box-shadow] duration-300",
          "focus-visible:ring-2 focus-visible:ring-navy-900 focus-visible:ring-offset-2 focus-visible:ring-offset-silver-200",
          featured
            ? "navy-surface text-white hover:shadow-[0_24px_48px_-18px_rgb(11_21_48/0.7)]"
            : "glass text-navy-900 hover:border-white hover:shadow-[inset_0_1px_0_rgb(255_255_255),0_20px_40px_-18px_rgb(11_21_48/0.35)]",
        )}
      >
        {/* Hover highlight */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            featured
              ? "bg-[linear-gradient(110deg,transparent_20%,rgb(255_206_0/0.16)_60%,rgb(221_0_0/0.10))]"
              : "bg-[linear-gradient(110deg,transparent_25%,rgb(255_206_0/0.14)_65%,rgb(221_0_0/0.06))]",
          )}
        />
        {/* German accent bar */}
        <span
          aria-hidden="true"
          className="tricolor-y absolute inset-y-3 left-0 w-[3px] origin-center scale-y-0 rounded-r-full transition-transform duration-300 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100"
        />

        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute -z-10 rounded-full",
              featured ? "bg-white/25" : "bg-navy-900/10",
            )}
            style={{
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            onAnimationComplete={() =>
              setRipples((current) => current.filter((r) => r.id !== ripple.id))
            }
          />
        ))}

        <span
          aria-hidden="true"
          className={cn(
            "hidden w-5 shrink-0 text-[11px] font-semibold tabular-nums min-[360px]:block",
            featured ? "text-white/45" : "text-navy-900/35",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-xl transition-transform duration-300 ease-out group-hover:scale-[1.06]",
            featured
              ? "bg-white/10 text-de-gold ring-1 ring-white/15"
              : "bg-navy-900 text-white shadow-[0_6px_14px_-6px_rgb(11_21_48/0.6)]",
          )}
        >
          <Icon aria-hidden className="size-5" strokeWidth={1.8} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[15px] leading-snug font-semibold tracking-tight text-pretty sm:text-base">
            {text.title}
          </span>
          <span
            className={cn(
              "mt-0.5 block text-[13px] leading-snug text-pretty sm:text-sm",
              featured ? "text-white/70" : "text-slate-ink",
            )}
          >
            {text.description}
          </span>
        </span>

        <ArrowUpRight
          aria-hidden
          strokeWidth={2}
          className={cn(
            "size-[18px] shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1 group-active:translate-x-1.5",
            featured ? "text-de-gold" : "text-navy-900/60",
          )}
        />
        {link.external && <span className="sr-only"> {t.links.opensInNewTab}</span>}
      </motion.a>
    </motion.li>
  );
}
