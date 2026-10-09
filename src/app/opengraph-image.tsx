import { renderOgImage, OG_SIZE } from "@/lib/og";

export const runtime = "edge";
export const alt = "Next Call In (NCI) — HIPAA-compliant medical answering for 25+ years";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ eyebrow: "Next Call In (NCI)", headline: "Compassionate medical answering for 25+ years", subhead: "Hospitals, practices, and professionals. Answered by people, never a bot." });
}
