import { useId, type SVGProps } from "react";

/**
 * Flat silhouettes of German landmarks for the decorative background.
 * They render in `currentColor`; windows are punched out with an SVG mask.
 */
type LandmarkProps = Omit<SVGProps<SVGSVGElement>, "ref">;

const FAR_BUILDINGS: Array<[x: number, w: number, h: number]> = [
  [0, 60, 70], [64, 40, 112], [108, 70, 86], [182, 36, 132], [222, 52, 92],
  [340, 78, 102], [424, 48, 142], [476, 64, 96], [548, 40, 74],
  [900, 52, 88], [956, 70, 122], [1236, 44, 128], [1284, 60, 98],
  [1348, 46, 138], [1398, 42, 84],
];

/** Berlin skyline: city blocks, Fernsehturm and Reichstag. */
export function BerlinSkyline(props: LandmarkProps) {
  return (
    <svg viewBox="0 0 1440 240" preserveAspectRatio="xMidYMax slice" fill="currentColor" {...props}>
      {FAR_BUILDINGS.map(([x, w, h]) => (
        <rect key={x} x={x} y={240 - h} width={w} height={h} />
      ))}
      {/* Fernsehturm */}
      <rect x="298" y="0" width="4" height="62" />
      <circle cx="300" cy="80" r="20" />
      <rect x="289" y="98" width="22" height="6" rx="2" />
      <path d="M295 104h10l4 136h-18z" />
      {/* Reichstag */}
      <rect x="1060" y="168" width="24" height="72" />
      <rect x="1196" y="168" width="24" height="72" />
      <rect x="1060" y="182" width="160" height="58" />
      <path d="M1102 182a38 38 0 0 1 76 0z" />
    </svg>
  );
}

/** Brandenburger Tor with its side wings and the Quadriga. */
export function BrandenburgGate(props: LandmarkProps) {
  return (
    <svg viewBox="0 0 1440 240" preserveAspectRatio="xMidYMax slice" fill="currentColor" {...props}>
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
    </svg>
  );
}

/** Kölner Dom: twin gothic spires around the west facade. */
export function CologneCathedral(props: LandmarkProps) {
  const maskId = useId();
  return (
    <svg viewBox="0 0 200 420" fill="currentColor" {...props}>
      <mask id={maskId}>
        <g fill="#fff">
          {[0, 100].map((o) => (
            <g key={o} transform={`translate(${o} 0)`}>
              <rect x="22" y="150" width="56" height="270" />
              <rect x="30" y="110" width="40" height="45" />
              <path d="M30 112 50 8l20 104Z" />
              <rect x="48.5" y="0" width="3" height="12" />
              <path d="m22 150 4-30 4 30Zm48 0 4-30 4 30ZM28 114l3-22 3 22Zm38 0 3-22 3 22Z" />
            </g>
          ))}
          <rect x="78" y="250" width="44" height="170" />
          <path d="M78 252 100 205l22 47Z" />
          <rect x="99" y="194" width="2" height="12" />
        </g>
        <g fill="#000">
          {[0, 100].map((o) => (
            <g key={o} transform={`translate(${o} 0)`}>
              <path d="M38 330v-62q0-14 12-22 12 8 12 22v62Z" />
              <path d="M42 214v-30q0-8 8-12 8 4 8 12v30Z" />
              <path d="M46 92h8v-14q-4-8-8 0Z" />
            </g>
          ))}
          <circle cx="100" cy="274" r="11" />
          <path d="M88 420v-58q0-16 12-24 12 8 12 24v58Z" />
        </g>
      </mask>
      <rect width="200" height="420" mask={`url(#${maskId})`} />
    </svg>
  );
}

/** Schloss Neuschwanstein on its rock, with slender towers and gatehouse. */
export function Neuschwanstein(props: LandmarkProps) {
  const maskId = useId();
  return (
    <svg viewBox="0 0 360 260" fill="currentColor" {...props}>
      <mask id={maskId}>
        <g fill="#fff">
          <path d="M0 260c30-30 60-46 96-54 44-8 124-10 174-4 40 6 70 28 90 58Z" />
          {/* Palas */}
          <rect x="150" y="96" width="96" height="110" />
          <path d="M146 98 198 64l52 34Z" />
          <rect x="176" y="74" width="8" height="26" />
          <path d="M173 76 180 54l7 22Z" />
          <rect x="212" y="72" width="8" height="28" />
          <path d="M209 74 216 50l7 24Z" />
          {/* Slender tower */}
          <rect x="246" y="60" width="16" height="146" />
          <path d="M243 62 254 14l11 48Z" />
          <rect x="242" y="82" width="24" height="5" />
          {/* Round tower */}
          <rect x="118" y="70" width="26" height="136" />
          <path d="M114 72 131 22l17 50Z" />
          {/* Left wing */}
          <rect x="72" y="136" width="48" height="70" />
          <path d="M68 138 96 112l28 26Z" />
          <rect x="80" y="118" width="8" height="20" />
          <path d="M77 120 84 100l7 20Z" />
          {/* Gatehouse */}
          <rect x="262" y="138" width="56" height="68" />
          {[262, 278, 294].map((x) => (
            <rect key={x} x={x} y="130" width="7" height="9" />
          ))}
          <rect x="310" y="118" width="12" height="88" />
          <path d="M307 120 316 96l9 24Z" />
        </g>
        <g fill="#000">
          {[110, 140, 170].flatMap((y) =>
            [158, 176, 194, 212, 230].map((x) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="7" height="12" rx="3.5" />
            )),
          )}
          <rect x="127" y="100" width="6" height="10" rx="3" />
          <rect x="251" y="100" width="5" height="10" rx="2.5" />
          <path d="M282 206v-22q0-10 10-10t10 10v22Z" />
        </g>
      </mask>
      <rect width="360" height="260" mask={`url(#${maskId})`} />
    </svg>
  );
}
