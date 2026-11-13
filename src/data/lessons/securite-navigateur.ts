import type { Lesson } from "@/lib/types";

export const SECURITE_NAVIGATEUR: Lesson = {
  slug: "securite-navigateur",
  title: "XSS, CSP et CORS",
  icon: "🧱",
  theme: "web",
  level: "intermediaire",
  summary: "Les protections du navigateur et comment les failles de script les contournent.",
  duration: "9 min",
  objectives: [
    "Distinguer XSS réfléchie, stockée et basée sur le DOM",
    "Comprendre la politique de même origine et CORS",
    "Utiliser une Content-Security-Policy",
  ],
  sections: [
    {
      title: "La politique de même origine",
      paragraphs: [
        "Par défaut, une page ne peut pas lire les réponses d'un autre site (protocole + domaine + port).",
        "CORS assouplit cette règle pour une API : Access-Control-Allow-Origin doit lister précisément les sites autorisés, jamais « * » avec des cookies.",
      ],
    },
    {
      title: "Les trois XSS",
      paragraphs: [
        "Réfléchie : le script est dans le lien. Stockée : il est enregistré sur le site (commentaire, profil) et touche tous les visiteurs. DOM : le JavaScript de la page insère lui-même une donnée non fiable.",
        "La parade principale : encoder les données à l'affichage selon le contexte (HTML, attribut, JavaScript) et éviter innerHTML.",
      ],
    },
    {
      title: "La Content-Security-Policy",
      paragraphs: [
        "Cet en-tête liste les sources autorisées pour les scripts, styles, images et connexions.",
        "script-src 'self' bloque les scripts externes ; éviter 'unsafe-inline' (avec des nonces) bloque aussi les scripts injectés dans la page.",
      ],
      example: "Content-Security-Policy: default-src 'self'; script-src 'self'; frame-ancestors 'none'",
    },
    {
      title: "Les autres protections",
      paragraphs: [
        "frame-ancestors 'none' (ou X-Frame-Options) empêche le clickjacking.",
        "rel=\"noopener\" sur les liens externes empêche le tabnabbing.",
      ],
    },
  ],
  keyPoints: [
    "La même origine protège ; CORS l'assouplit avec précaution.",
    "XSS stockée = tous les visiteurs touchés.",
    "Encoder à l'affichage est la parade principale à la XSS.",
    "La CSP limite les dégâts d'une XSS oubliée.",
  ],
  quiz: [
    {
      question: "Un script injecté dans un commentaire s'exécute chez chaque visiteur. C'est une XSS…",
      options: ["Réfléchie", "Stockée", "Aveugle"],
      correct: 1,
      explanation: "Le script est enregistré sur le site.",
    },
    {
      question: "« Access-Control-Allow-Origin: * » sur une API qui utilise les cookies est…",
      options: ["Recommandé", "Dangereux", "Sans effet"],
      correct: 1,
      explanation: "N'importe quel site pourrait lire les réponses.",
    },
    {
      question: "Quelle directive CSP empêche d'afficher le site dans une iframe ?",
      options: ["img-src", "frame-ancestors 'none'", "font-src"],
      correct: 1,
      explanation: "Elle protège contre le clickjacking.",
    },
  ],
};
