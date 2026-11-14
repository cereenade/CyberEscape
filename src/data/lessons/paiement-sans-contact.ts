import type { Lesson } from "@/lib/types";

export const PAIEMENT_SANS_CONTACT: Lesson = {
  slug: "paiement-sans-contact",
  title: "Payer sans contact en sécurité",
  icon: "💳",
  theme: "bases",
  level: "debutant",
  summary: "Comment fonctionne le paiement sans contact, quels sont ses vrais risques et que faire si tu perds ta carte.",
  duration: "5 min",
  objectives: [
    "Comprendre les limites du paiement sans contact",
    "Réagir vite en cas de perte ou de vol",
    "Choisir le moyen de paiement le plus protégé",
  ],
  sections: [
    {
      title: "Comment ça marche",
      paragraphs: [
        "La carte communique avec le terminal par radio (NFC), à quelques centimètres seulement.",
        "Sans code, chaque paiement est plafonné (souvent 50 € en France). Après plusieurs paiements ou un certain montant cumulé, la carte redemande le code.",
      ],
    },
    {
      title: "Les vrais risques",
      paragraphs: [
        "Le principal risque, c'est la carte perdue ou volée : quelqu'un peut faire quelques petits achats avant le blocage.",
        "Les histoires de « vol à distance dans le métro » sont très limitées en pratique : il faut être tout près, et un paiement frauduleux reste traçable et contestable.",
      ],
    },
    {
      title: "En cas de perte ou de vol",
      paragraphs: [
        "Fais opposition immédiatement, depuis l'appli de ta banque ou par téléphone.",
        "Vérifie ensuite tes dernières opérations et conteste celles que tu ne reconnais pas auprès de ta banque.",
      ],
      example: "Perte constatée à 8 h 10 → opposition dans l'appli à 8 h 12 → carte bloquée.",
    },
    {
      title: "Le téléphone, encore mieux protégé",
      paragraphs: [
        "Payer avec ton téléphone ou ta montre demande ton code, ton empreinte ou ton visage.",
        "Le vrai numéro de carte n'est pas transmis au commerçant : un numéro de remplacement (jeton) est utilisé.",
        "Beaucoup de banques permettent aussi de désactiver le sans contact ou de bloquer temporairement la carte dans l'appli.",
      ],
    },
  ],
  keyPoints: [
    "Le sans contact est plafonné et redemande le code régulièrement.",
    "Carte perdue = opposition immédiate.",
    "Le paiement par téléphone ajoute une vérification et un jeton.",
  ],
  quiz: [
    {
      question: "Que fais-tu en premier si ta carte disparaît ?",
      options: ["J'attends quelques jours", "Je fais opposition tout de suite", "Je change mon code"],
      correct: 1,
      explanation: "L'opposition bloque la carte immédiatement.",
    },
    {
      question: "Pourquoi le paiement par téléphone est-il mieux protégé ?",
      options: ["Il est plus rapide", "Il demande un déverrouillage et n'envoie pas le vrai numéro de carte", "Il n'a pas de plafond"],
      correct: 1,
      explanation: "Code ou biométrie + jeton à la place du numéro.",
    },
    {
      question: "Que limite le plafond du sans contact ?",
      options: ["Le montant d'un paiement sans code", "Le nombre de cartes par personne", "La durée de vie de la carte"],
      correct: 0,
      explanation: "Au-delà, le code est demandé.",
    },
  ],
};
