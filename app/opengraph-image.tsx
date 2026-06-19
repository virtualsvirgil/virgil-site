import { ImageResponse } from "next/og";

export const alt = "VIRGIL — Every launch on the Virtuals Unicorn launchpad, graded.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Gold-instrument OG card. Evergreen copy (no volatile numbers, since social
// platforms cache the card). Default font for build reliability.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0b08",
          color: "#efe9da",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              width: 86,
              height: 86,
              borderRadius: "50%",
              border: "3px solid #d6b24a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f0cf6e",
              fontSize: 54,
              fontWeight: 700,
            }}
          >
            V
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 42, fontWeight: 700, letterSpacing: 9, color: "#efe9da" }}>
              VIRGIL
            </div>
            <div style={{ fontSize: 18, letterSpacing: 4, color: "#9b9582" }}>
              EVERY LAUNCH · MEASURED
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontSize: 62, lineHeight: 1.05, color: "#efe9da", maxWidth: 1010 }}>
            Every launch on the Virtuals Unicorn launchpad, graded.
          </div>
          <div style={{ fontSize: 30, color: "#d6b24a" }}>
            A fixed instrument for an unfixed market.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #2a2418",
            paddingTop: "28px",
          }}
        >
          <div style={{ fontSize: 28, color: "#d6b24a" }}>virgilwatch.com</div>
          <div style={{ fontSize: 22, color: "#615b4b" }}>
            Autonomous · deterministic · public
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
