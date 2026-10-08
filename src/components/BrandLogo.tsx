"use client";

import { useState } from "react";
import Image from "next/image";
import { BrandMark } from "@/components/BrandMark";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * The VIZU DEUTSCH logo in a slim metallic bezel. The artwork is a round emblem,
 * so a circular frame only hides the image's empty corners. If the file fails to
 * load, the typographic BrandMark takes its place.
 */
export function BrandLogo({ className }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className={cn("relative block aspect-square", className)}>
      <span
        aria-hidden="true"
        className="absolute -inset-3 rounded-full bg-[radial-gradient(closest-side,rgb(255_206_0/0.28),rgb(255_206_0/0.08)_60%,transparent)]"
      />
      <span className="relative block size-full rounded-full bg-[conic-gradient(from_210deg,#ffffff,#c3c8d0,#f4f5f7,#a9b0bb,#ffffff,#cdd1d8,#ffffff)] p-[3px] shadow-[0_18px_40px_-14px_rgb(11_21_48/0.55)]">
        {failed ? (
          <BrandMark className="size-full text-[17px]" />
        ) : (
          <Image
            src={site.logo.src}
            width={site.logo.width}
            height={site.logo.height}
            sizes="(min-width: 640px) 152px, 132px"
            alt={site.name}
            loading="eager"
            fetchPriority="high"
            onError={() => setFailed(true)}
            className="size-full rounded-full bg-navy-950 object-contain"
          />
        )}
      </span>
    </span>
  );
}
