import type { Lesson } from "@/lib/types";

export const WEB_AVANCE: Lesson = {
  slug: "web-avance",
  title: "Attaques web avancées",
  icon: "🧨",
  theme: "web",
  level: "avance",
  summary: "Request smuggling, empoisonnement de cache, pollution de prototype : quand les failles se cachent entre les briques.",
  duration: "10 min",
  objectives: [
    "Comprendre les failles nées du désaccord entre deux composants",
    "Reconnaître l'empoisonnement de cache et la pollution de prototype",
    "Connaître les bonnes pratiques de défense",
  ],
  sections: [
    {
      title: "Quand deux serveurs ne sont pas d'accord",
      paragraphs: [
        "Un proxy et un serveur qui ne découpent pas les requêtes de la même façon (Content-Length contre Transfer-Encoding) permettent de cacher une requête dans une autre : c'est le request smuggling.",
        "Défense : même interprétation partout, rejet des requêtes ambiguës, HTTP/2 de bout en bout.",
      ],
    },
    {
      title: "L'empoisonnement de cache",
      paragraphs: [
        "Si un en-tête non pris en compte par le cache (X-Forwarded-Host…) modifie la réponse, le pirate peut faire mettre en cache une page piégée servie à tous.",
        "Défense : ne pas utiliser d'en-têtes non fiables dans la réponse, ou les inclure dans la clé de cache.",
      ],
    },
    {
      title: "La pollution de prototype",
      paragraphs: [
        "En JavaScript, tous les objets héritent d'un prototype commun. Une fusion naïve d'objets peut copier la clé __proto__ envoyée par l'utilisateur.",
        "Une propriété ajoutée au prototype (isAdmin: true) apparaît alors sur tous les objets.",
      ],
      example: "{\"__proto__\": {\"isAdmin\": true}}",
    },
    {
      title: "SSRF, XXE et désérialisation",
      paragraphs: [
        "Ces failles ont un point commun : le serveur fait confiance à une donnée qui lui fait accomplir une action (requête interne, lecture de fichier, création d'objet).",
        "Défense commune : listes blanches, désactivation des fonctionnalités dangereuses, formats de données simples.",
      ],
    },
  ],
  keyPoints: [
    "Les failles avancées naissent souvent entre deux composants.",
    "Un cache doit tenir compte de tout ce qui modifie la réponse.",
    "Filtrer __proto__, constructor et prototype.",
    "Ne jamais laisser une donnée décider seule d'une action du serveur.",
  ],
  quiz: [
    {
      question: "Le request smuggling naît…",
      options: ["D'un mot de passe faible", "D'un désaccord sur la longueur des requêtes", "D'un certificat expiré"],
      correct: 1,
      explanation: "Le proxy voit une requête, le serveur en voit deux.",
    },
    {
      question: "Quelle clé est utilisée pour la pollution de prototype ?",
      options: ["__proto__", "id", "admin"],
      correct: 0,
      explanation: "Elle mène au prototype commun de tous les objets.",
    },
    {
      question: "Une page piégée est servie à tous les visiteurs depuis le cache. C'est…",
      options: ["Un empoisonnement de cache", "Un DDoS", "Une XSS réfléchie"],
      correct: 0,
      explanation: "La réponse piégée a été stockée puis redistribuée.",
    },
  ],
};
