import type { MotionProps } from "framer-motion";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Page-load entrance: fade + slide up (optionally scale). */
export function enter(
  delay = 0,
  { y = 16, scale = 1 }: { y?: number; scale?: number } = {},
): MotionProps {
  return {
    initial: { opacity: 0, y, scale },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.8, delay, ease: EASE_OUT },
  };
}

/** Below-the-fold entrance, triggered once when scrolled into view. */
export function reveal(delay = 0, y = 20): MotionProps {
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -40px 0px" },
    transition: { duration: 0.8, delay, ease: EASE_OUT },
  };
}

/** Link cards stagger in 80ms apart, right after the profile card. */
export const linkDelay = (index: number) => 0.65 + index * 0.08;
