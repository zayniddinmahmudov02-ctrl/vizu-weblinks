import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #1F2F5E, #0B1530)",
          color: "#FFFFFF",
          fontSize: 76,
          fontWeight: 800,
          letterSpacing: -3,
          position: "relative",
        }}
      >
        VD
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 12, display: "flex" }}>
          <div style={{ flex: 1, background: "#121212" }} />
          <div style={{ flex: 1, background: "#DD0000" }} />
          <div style={{ flex: 1, background: "#FFCE00" }} />
        </div>
      </div>
    ),
    size,
  );
}
