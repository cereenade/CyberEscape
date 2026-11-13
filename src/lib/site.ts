/**
 * Adresse publique du site (sans « / » final).
 * Pour un nom de domaine personnalisé, définis NEXT_PUBLIC_SITE_URL sur Vercel.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://cyber-escape-virid.vercel.app").replace(/\/$/, "");
