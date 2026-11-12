import { ImageResponse } from "next/og";
import { hero, personal } from "@/data/personal";

export const alt = `${personal.name} · ${personal.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview image, generated at build time in the same style as the hero.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, fontWeight: 700, letterSpacing: 1, color: "#111" }}>
          {personal.logo}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: "#f2f2f2",
              borderRadius: 999,
              padding: "8px 18px",
              fontSize: 22,
              color: "#4a4a4a",
            }}
          >
            {`> ${hero.label}`}
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 28, fontSize: 92, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
            <span style={{ color: "#111" }}>{hero.headingLine1}</span>
            <span style={{ color: "#777" }}>{hero.headingLine2}</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#737373" }}>
          <span>{personal.name}</span>
          <span>{personal.title}</span>
        </div>
      </div>
    ),
    size
  );
}
