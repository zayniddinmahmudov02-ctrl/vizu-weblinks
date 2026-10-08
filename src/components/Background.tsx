"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const PARTICLES = [
  { top: "14%", left: "12%", size: 3, delay: "0s" },
  { top: "22%", left: "84%", size: 2, delay: "1.4s" },
  { top: "41%", left: "6%", size: 2, delay: "2.6s" },
  { top: "56%", left: "91%", size: 3, delay: "0.8s" },
  { top: "68%", left: "18%", size: 2, delay: "3.2s" },
  { top: "33%", left: "70%", size: 2, delay: "4.1s" },
];

const FAR_BUILDINGS: Array<[x: number, w: number, h: number]> = [
  [0, 60, 70], [64, 40, 112], [108, 70, 86], [182, 36, 132], [222, 52, 92],
  [340, 78, 102], [424, 48, 142], [476, 64, 96], [548, 40, 74],
  [900, 52, 88], [956, 70, 122], [1236, 44, 128], [1284, 60, 98],
  [1348, 46, 138], [1398, 42, 84],
];

/** Decorative, fixed backdrop: metallic light, Berlin lines, German glyphs, skyline. */
export function Background() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const farY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : -24]);
  const nearY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : -56]);

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
      <div className="absolute top-[38%] -left-1/3 h-[60vh] w-[80vw] rounded-full bg-[radial-gradient(closest-side,rgb(255_206_0/0.10),transparent)] md:animate-float" />
      <div className="absolute -right-1/4 bottom-[8%] h-[55vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,rgb(31_47_94/0.10),transparent)] md:animate-float [animation-delay:-6s]" />

      {/* Moving metallic reflection */}
      <div className="absolute inset-y-[-20%] left-[-20%] hidden w-[60%] bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.45),transparent)] md:block md:animate-sheen" />

      {/* Berlin map-inspired lines: Ringbahn loop, the Spree, radial avenues */}
      <svg
        className="absolute -top-28 -right-40 h-[560px] w-[560px] rotate-[-8deg] text-navy-900 opacity-[0.09] sm:-right-24"
        viewBox="0 0 560 560"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeWidth="1.5"
          d="M280 78c62 2 120 26 150 70 22 34 18 66 38 98 26 42 22 98-8 140-36 50-104 82-176 84-80 2-152-30-186-86-26-42-20-92-2-130 14-30 6-62 22-94 28-54 90-84 162-82Z"
        />
        <path
          strokeWidth="1"
          strokeDasharray="2 7"
          d="M248 128c54 4 100 22 128 56s30 86 4 128c-30 46-88 70-148 66-56-4-104-34-122-82-16-42 0-90 34-124 26-28 64-46 104-44Z"
        />
        <path
          strokeWidth="2.5"
          strokeLinecap="round"
          d="M20 330c60-18 98-8 140 6s86 14 120-12 66-52 116-46 80 30 140 20"
        />
        <path strokeWidth="1" d="M280 20v520M40 280h480M90 90l380 380M470 90 90 470" opacity="0.5" />
        <circle cx="280" cy="280" r="4" fill="currentColor" stroke="none" />
      </svg>

      {/* German typographic glyphs */}
      <span className="glyph-outline absolute top-[6%] -left-6 text-[150px] leading-none font-extrabold select-none sm:text-[220px]">
        ß
      </span>
      <span className="glyph-outline absolute top-[44%] -right-4 text-[130px] leading-none font-extrabold select-none sm:right-[4%] sm:text-[200px]">
        Ä
      </span>
      <span className="glyph-outline absolute top-[72%] left-[2%] hidden text-[180px] leading-none font-extrabold select-none sm:block">
        Ü
      </span>

      {/* Floating particles (desktop only) */}
      {PARTICLES.map((p) => (
        <span
          key={`${p.top}-${p.left}`}
          className="absolute hidden rounded-full bg-white shadow-[0_0_10px_2px_rgb(255_255_255/0.8)] md:block md:animate-twinkle"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size, animationDelay: p.delay }}
        />
      ))}

      {/* Berlin skyline — far layer: Fernsehturm, Reichstag, city blocks */}
      <motion.svg
        style={{ y: farY }}
        className="absolute inset-x-0 bottom-0 h-[150px] w-full text-navy-900 sm:h-[200px]"
        viewBox="0 0 1440 240"
        preserveAspectRatio="xMidYMax slice"
        fill="currentColor"
      >
        <g opacity="0.05">
          {FAR_BUILDINGS.map(([x, w, h]) => (
            <rect key={x} x={x} y={240 - h} width={w} height={h} />
          ))}
          <rect x="298" y="0" width="4" height="62" />
          <circle cx="300" cy="80" r="20" />
          <rect x="289" y="98" width="22" height="6" rx="2" />
          <path d="M295 104h10l4 136h-18z" />
          <rect x="1060" y="168" width="24" height="72" />
          <rect x="1196" y="168" width="24" height="72" />
          <rect x="1060" y="182" width="160" height="58" />
          <path d="M1102 182a38 38 0 0 1 76 0z" />
        </g>
      </motion.svg>

      {/* Near layer: Brandenburger Tor */}
      <motion.svg
        style={{ y: nearY }}
        className="absolute inset-x-0 -bottom-2 h-[130px] w-full text-navy-900 sm:h-[180px]"
        viewBox="0 0 1440 240"
        preserveAspectRatio="xMidYMax slice"
        fill="currentColor"
      >
        <g opacity="0.085">
          <rect x="0" y="236" width="1440" height="4" />
          <rect x="516" y="178" width="76" height="58" />
          <rect x="510" y="170" width="88" height="10" />
          <rect x="848" y="178" width="76" height="58" />
          <rect x="842" y="170" width="88" height="10" />
          <rect x="588" y="226" width="264" height="10" />
          {[606, 650, 694, 734, 778, 822].map((x) => (
            <rect key={x} x={x} y="140" width="12" height="86" />
          ))}
          <rect x="596" y="124" width="248" height="18" />
          <rect x="626" y="108" width="188" height="18" />
          <rect x="676" y="98" width="88" height="12" />
          {[690, 703, 727, 740].map((x) => (
            <rect key={x} x={x} y="84" width="10" height="15" rx="3" />
          ))}
          <rect x="715" y="66" width="10" height="33" rx="3" />
          <rect x="719" y="54" width="2" height="14" />
        </g>
      </motion.svg>

      {/* Fine grain + German accent line */}
      <div className="noise absolute inset-0 opacity-[0.35] mix-blend-multiply" />
      <div className="tricolor absolute inset-x-0 top-0 h-[3px]" />
    </motion.div>
  );
}
