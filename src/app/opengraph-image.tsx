import { renderOgImage, OG_SIZE } from "@/lib/og";

export const runtime = "edge";
export const alt = "NCI Answering Service — HIPAA-compliant medical answering for 25+ years";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ eyebrow: "NCI Answering Service", headline: "Compassionate medical answering for 25+ years", subhead: "Hospitals, practices, and professionals. Answered by people, never a bot." });
}
