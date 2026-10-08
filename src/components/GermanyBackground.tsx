"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { GermanyFlag } from "@/components/GermanyFlag";
import {
  BerlinSkyline,
  BrandenburgGate,
  CologneCathedral,
  Neuschwanstein,
} from "@/components/landmarks";

const PARTICLES = [
  { top: "14%", left: "12%", size: 3, delay: "0s", mobile: true },
  { top: "22%", left: "84%", size: 2, delay: "-4s", mobile: false },
  { top: "41%", left: "6%", size: 2, delay: "-8s", mobile: true },
  { top: "56%", left: "91%", size: 3, delay: "-2s", mobile: false },
  { top: "68%", left: "18%", size: 2, delay: "-12s", mobile: false },
  { top: "33%", left: "70%", size: 2, delay: "-16s", mobile: true },
];

/**
 * Fixed, decorative backdrop: metallic light, a waving flag, German landmarks
 * and a Berlin skyline. Everything is low-opacity and sits behind the content.
 */
export function GermanyBackground() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const skylineY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : -24]);
  const gateY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : -56]);
  const landmarkY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : -36]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Soft light pools (radial gradients are far cheaper than blur filters) */}
      <div className="absolute -top-1/4 left-1/2 h-[70vh] w-[120vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.9),transparent)] md:animate-drift" />
      <div className="absolute top-[38%] -left-1/3 h-[60vh] w-[80vw] rounded-full bg-[radial-gradient(closest-side,rgb(255_206_0/0.08),transparent)] md:animate-float" />
      <div className="absolute -right-1/4 bottom-[8%] h-[55vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,rgb(31_47_94/0.10),transparent)] md:animate-float [animation-delay:-6s]" />

      {/* Moving metallic reflection */}
      <div className="absolute inset-y-[-20%] left-[-20%] hidden w-[60%] bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.45),transparent)] md:block md:animate-sheen" />

      {/* Waving flag, fading out from the top-right corner */}
      <div className="absolute -top-10 -right-24 rotate-[-8deg] animate-float-slow sm:-top-16 sm:-right-20">
        <GermanyFlag className="h-[150px] w-[250px] opacity-[0.11] [mask-image:radial-gradient(ellipse_at_80%_20%,#000_25%,transparent_72%)] sm:h-[270px] sm:w-[440px] sm:opacity-[0.14] sm:blur-[1px]" />
      </div>

      {/* Landmark collage */}
      <motion.div style={{ y: landmarkY }} className="absolute inset-0">
        <CologneCathedral className="absolute top-[52%] -left-12 h-[240px] w-auto text-navy-900 opacity-[0.04] sm:top-[16%] sm:left-[3%] sm:h-[380px] sm:opacity-[0.045]" />
        <Neuschwanstein className="absolute top-[30%] -right-20 w-[220px] text-navy-900 opacity-[0.04] sm:top-[44%] sm:right-[3%] sm:w-[330px] sm:opacity-[0.05]" />
      </motion.div>

      {/* Floating light particles */}
      {PARTICLES.map((p) => (
        <span
          key={`${p.top}-${p.left}`}
          className={`absolute animate-float-slow ${p.mobile ? "" : "hidden md:block"}`}
          style={{ top: p.top, left: p.left, animationDelay: p.delay }}
        >
          <span
            className="block rounded-full bg-white shadow-[0_0_10px_2px_rgb(255_255_255/0.8)] animate-twinkle"
            style={{ width: p.size, height: p.size, animationDelay: p.delay }}
          />
        </span>
      ))}

      {/* Berlin skyline — slow horizontal drift + scroll parallax */}
      <div className="absolute -inset-x-[3%] bottom-0 animate-skyline">
        <motion.div style={{ y: skylineY }}>
          <BerlinSkyline className="h-[150px] w-full text-navy-900 opacity-[0.04] sm:h-[200px] sm:opacity-[0.05]" />
        </motion.div>
      </div>

      {/* Brandenburger Tor — nearest layer, strongest parallax */}
      <motion.div style={{ y: gateY }} className="absolute inset-x-0 -bottom-2">
        <BrandenburgGate className="h-[130px] w-full text-navy-900 opacity-[0.07] sm:h-[180px] sm:opacity-[0.085]" />
      </motion.div>

      {/* Fine grain + German accent line */}
      <div className="noise absolute inset-0 opacity-[0.35] mix-blend-multiply" />
      <div className="tricolor absolute inset-x-0 top-0 h-[3px]" />
    </motion.div>
  );
}
