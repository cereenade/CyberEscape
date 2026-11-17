import type { Lesson } from "@/lib/types";

export const INVITATIONS_AGENDA: Lesson = {
  slug: "invitations-agenda",
  title: "Les invitations d'agenda piégées",
  icon: "📅",
  theme: "humain",
  level: "debutant",
  summary: "Faux rendez-vous, liens dans les rappels : protéger son agenda des invitations indésirables.",
  duration: "5 min",
  objectives: [
    "Reconnaître une invitation d'agenda frauduleuse",
    "Réagir sans confirmer son adresse",
    "Régler son agenda pour filtrer les inconnus",
  ],
  sections: [
    {
      title: "Comment le faux rendez-vous arrive",
      paragraphs: [
        "Une invitation d'agenda est un simple message. Certaines applis l'ajoutent automatiquement à ton calendrier, même si l'expéditeur t'est inconnu.",
        "Résultat : un événement apparaît tout seul, comme le faux « colis bloqué » de la salle, avec un lien dans sa description.",
      ],
    },
    {
      title: "Pourquoi c'est efficace",
      paragraphs: [
        "Ton agenda inspire confiance : on pense que ce qui s'y trouve vient de toi ou d'un collègue.",
        "Les rappels sonnent au bon moment et créent une urgence, comme un SMS d'alerte.",
      ],
    },
    {
      title: "Les bons réflexes",
      paragraphs: [
        "Ne clique pas sur le lien et ne réponds pas : accepter ou refuser peut confirmer à l'escroc que ton adresse est active.",
        "Supprime l'événement, ou signale-le comme spam si ton appli le propose.",
      ],
    },
    {
      title: "Les bons réglages",
      paragraphs: [
        "Dans les paramètres de ton agenda, choisis d'ajouter seulement les invitations des expéditeurs connus ou celles que tu as acceptées.",
        "Au travail, préviens le service informatique : il peut bloquer l'expéditeur pour tout le monde.",
      ],
    },
  ],
  keyPoints: [
    "Un événement que tu n'as pas créé peut venir d'un inconnu.",
    "Pas de clic, pas de réponse : supprime ou signale.",
    "Limite l'ajout automatique aux expéditeurs connus.",
  ],
  quiz: [
    {
      question: "Un événement inconnu avec un lien apparaît dans ton agenda. Que fais-tu ?",
      options: ["Je clique pour voir", "Je le supprime sans cliquer", "J'accepte pour arrêter les rappels"],
      correct: 1,
      explanation: "Supprimer sans cliquer retire le piège sans rien confirmer.",
    },
    {
      question: "Pourquoi éviter de répondre « Refuser » à une invitation piégée ?",
      options: ["Ça peut confirmer que ton adresse est active", "Ça supprime ton agenda", "Ça n'a aucun effet"],
      correct: 0,
      explanation: "Une réponse prévient l'expéditeur que l'adresse est lue.",
    },
    {
      question: "Quel réglage limite ces invitations ?",
      options: ["Ajouter toutes les invitations automatiquement", "N'ajouter que celles des expéditeurs connus", "Désactiver les rappels"],
      correct: 1,
      explanation: "Les inconnus n'atterrissent plus directement dans ton calendrier.",
    },
  ],
  sources: [
    { label: "Cybermalveillance.gouv.fr — Hameçonnage", url: "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/fiches-reflexes/hameconnage-phishing" },
  ],
};
