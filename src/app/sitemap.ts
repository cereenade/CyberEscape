import type { MetadataRoute } from "next";
import { LEVELS } from "@/data/game";
import { LESSONS } from "@/data/lessons";
import { SITE_URL } from "@/lib/site";

/** Liste des pages publiques, pour aider les moteurs de recherche à trouver le site. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/jeu", "/cours", "/deck", "/inscription", "/connexion", "/mentions-legales", "/confidentialite", "/conditions"];
  return [
    ...pages.map((path) => ({ url: `${SITE_URL}${path}`, priority: path === "" ? 1 : 0.6 })),
    ...LEVELS.map((level) => ({ url: `${SITE_URL}/jeu/${level.id}`, priority: 0.8 })),
    ...LESSONS.map((lesson) => ({ url: `${SITE_URL}/cours/${lesson.slug}`, priority: 0.7 })),
  ];
}
