import type { Lesson } from "@/lib/types";

export const CACHE_CONTROL: Lesson = {
  slug: "cache-control",
  title: "Cache-Control : ne pas garder les pages privées",
  icon: "🗄️",
  theme: "web",
  level: "intermediaire",
  summary: "Comment l'en-tête Cache-Control décide de ce que le navigateur et les proxys gardent, et pourquoi les pages sensibles doivent être en no-store.",
  duration: "7 min",
  objectives: [
    "Lire les principales directives de Cache-Control",
    "Choisir la bonne valeur selon le type de page",
    "Repérer une page sensible mal protégée",
  ],
  sections: [
    {
      title: "À quoi sert le cache",
      paragraphs: [
        "Pour aller plus vite, le navigateur garde une copie des pages et des fichiers. Des serveurs intermédiaires (proxys, CDN) peuvent aussi en garder une.",
        "C'est le serveur qui indique ce qui peut être gardé, avec l'en-tête de réponse Cache-Control.",
      ],
    },
    {
      title: "Les directives à connaître",
      paragraphs: [
        "no-store : aucune copie, nulle part. private : seul le navigateur de l'utilisateur peut garder la page, pas un proxy partagé. public : tout le monde peut la garder. max-age=N : durée de validité en secondes.",
        "no-cache ne veut pas dire « pas de cache » : la copie peut être gardée, mais doit être revalidée auprès du serveur avant usage.",
      ],
      example: "Cache-Control: public, max-age=86400   → logo, feuille de style\nCache-Control: no-store                 → facture, profil, messagerie",
    },
    {
      title: "Le risque pour les pages sensibles",
      paragraphs: [
        "Sur un ordinateur partagé, le bouton « Précédent » peut réafficher une page privée après la déconnexion si elle est restée en cache.",
        "Pire : une page personnelle marquée public peut être servie par un CDN à d'autres visiteurs. Le guide de test OWASP vérifie ce point.",
      ],
    },
    {
      title: "Bonnes pratiques",
      paragraphs: [
        "Toutes les réponses authentifiées qui contiennent des données personnelles : Cache-Control: no-store.",
        "Fichiers statiques (images, scripts versionnés) : cache long et public. Côté utilisateur, sur un poste partagé, déconnecte-toi et ferme le navigateur.",
      ],
    },
  ],
  keyPoints: [
    "Cache-Control dit qui peut garder une copie, et combien de temps.",
    "no-store pour toute page avec des données personnelles.",
    "no-cache = revalider, pas « ne rien garder ».",
    "public sur une page privée peut la faire servir à d'autres.",
  ],
  quiz: [
    {
      question: "Quelle valeur convient à une page de facture ?",
      options: ["public, max-age=86400", "no-store", "Aucun en-tête"],
      correct: 1,
      explanation: "no-store interdit toute copie de la page.",
    },
    {
      question: "Que signifie no-cache ?",
      options: ["Ne jamais garder de copie", "Garder une copie mais la revalider avant usage", "Garder la page une heure"],
      correct: 1,
      explanation: "C'est no-store qui interdit le stockage.",
    },
    {
      question: "Quel est le risque d'une page de profil marquée public ?",
      options: ["Aucun", "Un proxy ou CDN peut la servir à d'autres visiteurs", "Elle s'affiche plus lentement"],
      correct: 1,
      explanation: "public autorise les caches partagés à la garder et la redistribuer.",
    },
  ],
  sources: [
    { label: "RFC 9111 – HTTP Caching", url: "https://www.rfc-editor.org/rfc/rfc9111" },
    { label: "MDN – Cache-Control", url: "https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Cache-Control" },
  ],
};
