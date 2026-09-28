import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/** Static pages only for now. Add blog/service-area segments here when those routes exist. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/who-we-serve", priority: 0.8, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/find-your-coverage", priority: 0.8, changeFrequency: "monthly" },
    { path: "/make-a-payment", priority: 0.4, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  ];
  return routes.map((r) => ({ url: `${SITE.domain}${r.path === "/" ? "" : r.path}`, lastModified: now, changeFrequency: r.changeFrequency, priority: r.priority }));
}
