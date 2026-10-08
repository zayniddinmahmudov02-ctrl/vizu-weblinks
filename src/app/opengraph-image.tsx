import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.fullName}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read once at module scope so the image stays prerendered at build time.
const logoData = await readFile(join(process.cwd(), "public", site.logo.src), "base64");
const logoSrc = `data:image/jpeg;base64,${logoData}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(165deg, #F6F7F9 0%, #E5E7EB 45%, #D9DCE1 100%)",
          color: "#0B1530",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 10, display: "flex" }}>
          <div style={{ flex: 1, background: "#121212" }} />
          <div style={{ flex: 1, background: "#DD0000" }} />
          <div style={{ flex: 1, background: "#FFCE00" }} />
        </div>

        <div
          style={{
            width: 252,
            height: 252,
            borderRadius: 999,
            padding: 5,
            display: "flex",
            background: "linear-gradient(135deg, #FFFFFF, #C3C8D0 55%, #F4F5F7)",
            boxShadow: "0 24px 48px -18px rgba(11,21,48,0.55)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
          <img src={logoSrc} width={242} height={242} alt="" style={{ borderRadius: 999 }} />
        </div>

        <div style={{ marginTop: 40, fontSize: 30, letterSpacing: 2, color: "#4A5468" }}>{site.fullName}</div>
        <div style={{ marginTop: 26, display: "flex", gap: 6 }}>
          <div style={{ width: 36, height: 3, background: "#121212" }} />
          <div style={{ width: 36, height: 3, background: "#DD0000" }} />
          <div style={{ width: 36, height: 3, background: "#FFCE00" }} />
        </div>
        <div style={{ marginTop: 26, fontSize: 40, color: "#0B1530" }}>{site.ogTagline}</div>
      </div>
    ),
    size,
  );
}
