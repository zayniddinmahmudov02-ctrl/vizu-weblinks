import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
            width: 168,
            height: 168,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #FFFFFF, #C3C8D0 55%, #F4F5F7)",
            boxShadow: "0 24px 48px -18px rgba(11,21,48,0.5)",
          }}
        >
          <div
            style={{
              width: 136,
              height: 136,
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(145deg, #1F2F5E, #0B1530)",
              color: "#FFFFFF",
              fontSize: 56,
              fontWeight: 800,
              letterSpacing: -2,
            }}
          >
            VD
          </div>
        </div>

        <div style={{ marginTop: 44, fontSize: 92, fontWeight: 800, letterSpacing: -3 }}>VIZU</div>
        <div style={{ marginTop: 4, fontSize: 30, fontWeight: 600, letterSpacing: 18, color: "#14214A" }}>
          DEUTSCH
        </div>
        <div style={{ marginTop: 36, fontSize: 34, color: "#4A5468" }}>{site.tagline}</div>
      </div>
    ),
    size,
  );
}
