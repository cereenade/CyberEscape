import type { Lesson } from "@/lib/types";

export const SITEMAP: Lesson = {
  slug: "sitemap",
  title: "Le sitemap.xml, une carte du site pour tous",
  icon: "🗺️",
  theme: "web",
  level: "intermediaire",
  summary: "Un fichier utile au référencement… qui révèle aussi les pages oubliées. Le lire et le garder propre.",
  duration: "6 min",
  objectives: [
    "Savoir ce qu'est un sitemap et où le trouver",
    "Repérer ce qu'il révèle sur un site",
    "Le publier sans exposer de pages sensibles",
  ],
  sections: [
    {
      title: "À quoi sert un sitemap",
      paragraphs: [
        "Le sitemap est un fichier XML qui liste les adresses d'un site, parfois avec leur date de mise à jour. Il aide les moteurs de recherche à tout indexer.",
        "On le trouve souvent à /sitemap.xml. Le fichier robots.txt peut indiquer son emplacement avec une ligne « Sitemap: ».",
      ],
    },
    {
      title: "Ce qu'il révèle",
      paragraphs: [
        "Il est souvent généré automatiquement par le CMS. Une page de test, une préproduction ou un espace d'administration peut s'y retrouver par erreur.",
        "Lors d'une reconnaissance, c'est l'un des premiers fichiers lus : il donne la carte du site sans rien deviner.",
      ],
      example: "<url><loc>https://www.serveur-corp.fr/preprod-admin/</loc></url>",
    },
    {
      title: "Le garder propre",
      paragraphs: [
        "N'y mets que des pages destinées au public. Exclus les environnements de test, les pages internes et les documents privés.",
        "Ne compte pas sur la discrétion : une page sensible doit être protégée par une authentification, ou ne pas être en ligne du tout.",
        "Vérifie le sitemap après chaque mise en production, comme le robots.txt.",
      ],
    },
  ],
  keyPoints: [
    "Le sitemap est public et lisible par tous.",
    "Généré automatiquement, il peut lister des pages oubliées.",
    "Une page cachée n'est pas une page protégée.",
  ],
  quiz: [
    {
      question: "À quoi sert principalement un sitemap ?",
      options: ["À protéger le site", "À aider les moteurs de recherche à trouver les pages", "À chiffrer les pages"],
      correct: 1,
      explanation: "C'est un outil de référencement.",
    },
    {
      question: "Quel fichier peut indiquer où se trouve le sitemap ?",
      options: ["robots.txt", "security.txt", ".htaccess"],
      correct: 0,
      explanation: "La directive « Sitemap: » y est courante.",
    },
    {
      question: "Comment protéger une page d'administration listée par erreur ?",
      options: ["Changer son nom", "La retirer du sitemap et l'authentifier", "L'ajouter au robots.txt"],
      correct: 1,
      explanation: "Seule une vraie authentification protège la page.",
    },
  ],
  sources: [{ label: "Protocole Sitemaps", url: "https://www.sitemaps.org/protocol.html" }],
};
