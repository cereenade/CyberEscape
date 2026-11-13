const isProd = process.env.NODE_ENV === "production";

/**
 * Politique de sécurité du contenu (CSP) : le navigateur refuse tout script, style ou connexion
 * qui ne vient pas du site lui-même ou de Supabase. Limite fortement l'impact d'une faille XSS.
 * ('unsafe-inline' reste nécessaire pour les petits scripts que Next.js insère dans la page.)
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://checkout.stripe.com https://billing.stripe.com",
  "upgrade-insecure-requests",
].join("; ");

/** En-têtes de sécurité envoyés avec chaque page (un site de cyber se doit de montrer l'exemple). */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  // En développement, Next.js a besoin d'eval() : la CSP n'est appliquée qu'en production.
  ...(isProd ? [{ key: "Content-Security-Policy", value: contentSecurityPolicy }] : []),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    // Pas d'ESLint dans le projet pour l'instant : on ne bloque pas le build.
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
