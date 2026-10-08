import { cn } from "@/lib/cn";

const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SEGMENT = CIRCUMFERENCE / 3;
const RING = ["var(--color-de-black)", "var(--color-de-red)", "var(--color-de-gold)"];

/** Circular VIZU DEUTSCH emblem: metallic bezel, tricolor ring, navy core. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="VIZU DEUTSCH Logo"
      className={cn("relative grid aspect-square place-items-center rounded-full", className)}
    >
      {/* Metallic bezel */}
      <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_210deg,#ffffff,#c3c8d0,#f4f5f7,#a9b0bb,#ffffff,#cdd1d8,#ffffff)] shadow-[0_18px_40px_-14px_rgb(11_21_48/0.45),inset_0_1px_1px_rgb(255_255_255/0.9)]" />
      {/* Rotating light catch on the bezel */}
      <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgb(255_255_255/0.85)_40deg,transparent_80deg)] opacity-60" />

      <svg className="absolute inset-[5%] -rotate-90" viewBox="0 0 100 100" fill="none">
        {RING.map((color, i) => (
          <circle
            key={color}
            cx="50"
            cy="50"
            r={RADIUS}
            stroke={color}
            strokeWidth="2.6"
            strokeDasharray={`${SEGMENT - 1.4} ${CIRCUMFERENCE}`}
            strokeDashoffset={-i * SEGMENT}
          />
        ))}
      </svg>

      <div className="navy-surface absolute inset-[13%] grid place-items-center rounded-full">
        <div className="flex flex-col items-center leading-none">
          <span className="text-[1.9em] font-extrabold tracking-[-0.04em] text-white">VD</span>
          <span className="mt-[0.35em] h-[2px] w-[1.6em] rounded-full tricolor" />
        </div>
      </div>
    </div>
  );
}
