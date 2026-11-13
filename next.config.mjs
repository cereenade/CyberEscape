/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Pas d'ESLint dans le projet pour l'instant : on ne bloque pas le build.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
