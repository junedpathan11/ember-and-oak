import type { MetadataRoute } from "next";
import site from "@/content/site";
import { siteUrl } from "@/lib/seo";

/** Static sitemap generated from the nav defined in site.ts. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return site.nav.map((link) => ({
    url: link.href === "/" ? siteUrl : `${siteUrl}${link.href}`,
    lastModified,
    changeFrequency: link.href === "/" ? "monthly" : "yearly",
    priority: link.href === "/" ? 1 : 0.8,
  }));
}
