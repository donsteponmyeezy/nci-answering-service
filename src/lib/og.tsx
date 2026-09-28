import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Branded share card. Brand green field, white copy, NCI wordmark drawn in text
 * (the only logo asset is a small webp, which would blur at share size). Fonts
 * fall back to the OG runtime's sans; keep copy short so it never wraps past 3 lines.
 */
export function renderOgImage({ eyebrow, headline, subhead }: { eyebrow: string; headline: string; subhead: string }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "linear-gradient(135deg, #038855 0%, #00784A 100%)", color: "#fff", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontSize: 72, fontWeight: 800, letterSpacing: -2 }}>NCI</span>
            <span style={{ fontSize: 18, letterSpacing: 6, opacity: 0.9 }}>ANSWERING SERVICE</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span style={{ fontSize: 24, letterSpacing: 4, textTransform: "uppercase", opacity: 0.85 }}>{eyebrow}</span>
          <span style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.08, maxWidth: 1000 }}>{headline}</span>
          <span style={{ fontSize: 28, opacity: 0.9, maxWidth: 960 }}>{subhead}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, opacity: 0.9 }}>
          <span>HIPAA-compliant · No contracts · 24/7</span>
          <span>914-333-9348</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
