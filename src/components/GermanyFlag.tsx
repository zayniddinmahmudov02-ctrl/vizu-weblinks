import { cn } from "@/lib/cn";

const SLICES = 20;
const WAVE_SECONDS = 7;

/**
 * Black–red–gold fabric that ripples in place.
 * The flag is cut into vertical slices, each running the same transform-only
 * wave with a phase offset, so the motion stays on the compositor.
 */
export function GermanyFlag({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("flex", className)}>
      {Array.from({ length: SLICES }, (_, i) => {
        const delay = `${(-i * WAVE_SECONDS) / SLICES}s`;
        return (
          <span
            key={i}
            className="tricolor-y relative -mx-px h-full flex-1 animate-flag-wave"
            style={{ animationDelay: delay }}
          >
            <span
              className="absolute inset-0 bg-navy-950 animate-flag-shade"
              style={{ animationDelay: delay }}
            />
          </span>
        );
      })}
    </div>
  );
}
