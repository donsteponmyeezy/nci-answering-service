import type { Metadata } from "next";
import { SITE } from "./site";

type Args = { title: string; description: string; path: string; noindex?: boolean };

/**
 * Metadata factory. Title ≤ 60 and description ≤ 155 are warned in dev so the
 * SERP snippet is never truncated by accident. OG images come from the co-located
 * opengraph-image.tsx via Next's auto-discovery; do not set openGraph.images here.
 */
export function createMetadata({ title, description, path, noindex }: Args): Metadata {
  if (process.env.NODE_ENV !== "production") {
    if (title.length > 60) console.warn(`[seo] title > 60 chars (${title.length}): ${title}`);
    if (description.length > 155) console.warn(`[seo] description > 155 chars (${description.length}): ${path}`);
  }
  const url = `${SITE.domain}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: { type: "website", title, description, url, siteName: SITE.name, locale: "en_US" },
    twitter: { card: "summary_large_image", title, description },
  };
}
