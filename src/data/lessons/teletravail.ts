import type { Lesson } from "@/lib/types";

export const TELETRAVAIL: Lesson = {
  slug: "teletravail",
  title: "Télétravail et outils collaboratifs",
  icon: "🏠",
  theme: "bases",
  level: "debutant",
  summary: "Travailler de chez soi ou d'ailleurs, sans ouvrir de brèche dans l'entreprise.",
  duration: "7 min",
  objectives: [
    "Sécuriser son poste et sa connexion à la maison",
    "Partager des fichiers et son écran sans fuite",
    "Utiliser l'IA et le cloud sans exposer de données confidentielles",
  ],
  sections: [
    {
      title: "La maison, une extension du bureau",
      paragraphs: [
        "La box doit être à jour, avec un mot de passe Wi-Fi long et l'administration protégée. Les objets connectés vont de préférence sur un réseau invité.",
        "L'ordinateur professionnel est réservé au travail : pas de jeux, pas de logiciels piratés, pas de prêt aux enfants.",
      ],
    },
    {
      title: "Se connecter à l'entreprise",
      paragraphs: [
        "Le VPN de l'entreprise, avec double authentification, chiffre la connexion vers les ressources internes.",
        "Hors de chez soi, on préfère la 4G/5G partagée au Wi-Fi public, et on ne laisse jamais le poste sans surveillance.",
      ],
    },
    {
      title: "Visio et partage d'écran",
      paragraphs: [
        "Partage une fenêtre plutôt que tout l'écran, et active le mode Ne pas déranger : une notification peut afficher un code ou un message privé.",
        "Vérifie ce qui est visible derrière toi et ferme les documents confidentiels avant la réunion.",
      ],
    },
    {
      title: "Cloud, liens et IA",
      paragraphs: [
        "Un lien « toute personne disposant du lien » est public. Partage avec des personnes nommées et une date d'expiration.",
        "Ce que tu colles dans un outil d'IA en ligne sort de l'entreprise : utilise les outils validés, ou anonymise d'abord le texte.",
      ],
    },
  ],
  keyPoints: [
    "Box à jour, réseau invité pour les objets, poste pro réservé au travail.",
    "VPN + double authentification pour accéder à l'interne.",
    "Partager une fenêtre, pas tout l'écran.",
    "Pas de données confidentielles dans des outils non validés.",
  ],
  quiz: [
    {
      question: "Pendant une visio, quel partage est le plus sûr ?",
      options: ["L'écran entier", "Une seule fenêtre", "La webcam du voisin"],
      correct: 1,
      explanation: "Les autres fenêtres et notifications restent privées.",
    },
    {
      question: "Un lien « toute personne disposant du lien » est…",
      options: ["Réservé à l'entreprise", "Accessible à n'importe qui qui l'obtient", "Chiffré de bout en bout"],
      correct: 1,
      explanation: "Il peut être transféré ou fuiter : c'est un lien public.",
    },
    {
      question: "Avant de demander à une IA en ligne de résumer un contrat client, il faut…",
      options: ["Rien de spécial", "Utiliser un outil validé ou anonymiser le texte", "Le coller en plusieurs fois"],
      correct: 1,
      explanation: "Sinon les données confidentielles quittent l'entreprise.",
    },
  ],
};
