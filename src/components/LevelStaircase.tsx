"use client";

import { motion, useReducedMotion, type Easing } from "framer-motion";
import { levels } from "@/data/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";
import { enter } from "@/lib/motion";

/* Geometry in px at scale 1. The wrapper scales the whole drawing down on small screens. */
const STEP_W = 52;
const STEP_H = 24;
const BALL = 14;
const HOP_HEIGHT = 22;
const WIDTH = STEP_W * levels.length;
const HEIGHT = STEP_H * levels.length + HOP_HEIGHT + BALL + 8;

const restX = (i: number) => i * STEP_W + STEP_W / 2 - BALL / 2;
const restY = (i: number) => -(i + 1) * STEP_H;

interface Pose {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  opacity: number;
}

/**
 * Builds one loop of the ball's journey as keyframes: fade in on A1, hop step by
 * step (anticipation squash → arc → landing squash → small rebound), pause on C1,
 * fade out and return. Also records when the ball lands on each step.
 */
function buildTimeline() {
  const poses: Pose[] = [];
  const eases: Easing[] = [];
  const durations: number[] = [];
  const landings: number[] = [];
  let time = 0;
  let pose: Pose = { x: restX(0), y: restY(0), scaleX: 1, scaleY: 1, opacity: 0 };
  poses.push(pose);

  const to = (duration: number, ease: Easing, next: Partial<Pose>) => {
    pose = { ...pose, ...next };
    poses.push(pose);
    eases.push(ease);
    durations.push(duration);
    time += duration;
  };

  to(0.35, "easeOut", { opacity: 1 });
  landings.push(time);
  to(0.4, "linear", {});

  for (let i = 0; i < levels.length - 1; i++) {
    const [fromX, toX] = [restX(i), restX(i + 1)];
    const [fromY, toY] = [restY(i), restY(i + 1)];
    to(0.1, "easeOut", { scaleX: 1.14, scaleY: 0.86 });
    to(0.28, "easeOut", { x: (fromX + toX) / 2, y: Math.min(fromY, toY) - HOP_HEIGHT, scaleX: 0.94, scaleY: 1.08 });
    to(0.26, "easeIn", { x: toX, y: toY, scaleX: 1, scaleY: 1 });
    landings.push(time);
    to(0.09, "easeOut", { scaleX: 1.2, scaleY: 0.8 });
    to(0.16, "easeOut", { y: toY - 7, scaleX: 0.97, scaleY: 1.05 });
    to(0.14, "easeIn", { y: toY, scaleX: 1, scaleY: 1 });
    if (i < levels.length - 2) to(0.32, "linear", {});
  }

  to(1.1, "linear", {}); // pause on C1
  to(0.35, "easeIn", { opacity: 0 });
  to(0.05, "linear", { x: restX(0), y: restY(0) }); // back to A1, invisible

  const total = time;
  let elapsed = 0;
  const times = [0, ...durations.map((d) => (elapsed += d) / total)];
  const pick = <K extends keyof Pose>(key: K) => poses.map((p) => p[key]);

  return {
    total,
    times,
    eases,
    keyframes: {
      x: pick("x"),
      y: pick("y"),
      scaleX: pick("scaleX"),
      scaleY: pick("scaleY"),
      opacity: pick("opacity"),
    },
    landings: landings.map((t) => t / total),
  };
}

const TIMELINE = buildTimeline();

/** Glow keyframes for a step: flare up right as the ball lands, then fade. */
function glowFrames(landing: number) {
  const before = Math.max(landing - 0.001, 0);
  const peak = Math.min(landing + 0.03, 1);
  const fade = Math.min(landing + 0.12, 1);
  return { opacity: [0, 0, 1, 0, 0], times: [0, before, peak, fade, 1] };
}

export function LevelStaircase({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();
  const last = levels.length - 1;

  return (
    <motion.div
      {...enter(0.95, { y: 12 })}
      role="img"
      aria-label={t.levels.label}
      className={cn("pointer-events-none select-none", className)}
    >
      <div aria-hidden="true" className="relative animate-float-slow" style={{ width: WIDTH, height: HEIGHT }}>
        {levels.map((level, i) => {
          const glow = glowFrames(TIMELINE.landings[i]);
          return (
            <div
              key={level}
              className="absolute bottom-0 overflow-hidden rounded-t-lg border border-b-0 border-white/90 bg-[linear-gradient(180deg,rgb(255_255_255/0.75),rgb(195_200_208/0.35))] shadow-[inset_0_1px_0_#fff,0_8px_18px_-12px_rgb(11_21_48/0.35)]"
              style={{ left: i * STEP_W, width: STEP_W - 2, height: (i + 1) * STEP_H }}
            >
              <span className="absolute inset-x-0 top-0 h-[2px] bg-navy-900/15" />
              <motion.span
                className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_206_0/0.4),transparent_70%)]"
                initial={{ opacity: 0 }}
                {...(reduceMotion
                  ? { animate: { opacity: i === last ? 1 : 0 } }
                  : {
                      animate: { opacity: glow.opacity },
                      transition: { duration: TIMELINE.total, times: glow.times, repeat: Infinity, ease: "easeOut" },
                    })}
              />
              <span className="relative block pt-1 text-center text-[12px] font-bold tracking-wide text-navy-900/75">
                {level}
              </span>
            </div>
          );
        })}

        {/* Same markup either way (no hydration mismatch); reduced motion just parks the ball on C1. */}
        <motion.span
          className="absolute bottom-0 left-0 will-change-transform"
          style={{ width: BALL, height: BALL, originX: 0.5, originY: 1 }}
          initial={{ x: restX(0), y: restY(0), opacity: 0 }}
          {...(reduceMotion
            ? { animate: { x: restX(last), y: restY(last), opacity: 1 } }
            : {
                animate: TIMELINE.keyframes,
                transition: { duration: TIMELINE.total, times: TIMELINE.times, ease: TIMELINE.eases, repeat: Infinity },
              })}
        >
          <Ball />
        </motion.span>
      </div>
    </motion.div>
  );
}

function Ball() {
  return (
    <span className="block size-full rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff6c8_0%,#ffce00_45%,#b88a00_100%)] shadow-[0_0_14px_3px_rgb(255_206_0/0.55),0_3px_6px_rgb(11_21_48/0.3)]" />
  );
}
