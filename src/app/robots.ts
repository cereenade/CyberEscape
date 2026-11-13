import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Pages personnelles ou techniques : inutile de les indexer.
      disallow: ["/compte", "/auth/", "/reinitialiser-mot-de-passe", "/admin", "/api/", "/etudiant/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
