import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface VinylProps {
  spinning: boolean;
  className?: string;
  /** Rendered upright on the (non-rotating) center label, e.g. a play/pause icon. */
  children?: ReactNode;
}

/**
 * A vinyl record. The grooved disc rotates while `spinning` and freezes in place
 * when paused (animation-play-state), while the light reflection stays fixed —
 * the way a real record looks on a turntable.
 */
export function Vinyl({ spinning, className, children }: VinylProps) {
  return (
    <span className={cn("relative grid aspect-square place-items-center rounded-full", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "vinyl absolute inset-0 animate-vinyl rounded-full",
          !spinning && "[animation-play-state:paused]",
        )}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[conic-gradient(from_215deg,transparent_0deg,rgb(255_255_255/0.16)_28deg,transparent_62deg,transparent_180deg,rgb(255_255_255/0.10)_212deg,transparent_246deg)]"
      />
      <span className="relative grid size-[44%] place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--color-accent-blue-light),var(--color-accent-blue)_55%,var(--color-navy-800))] text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.25)]">
        {children}
      </span>
    </span>
  );
}
