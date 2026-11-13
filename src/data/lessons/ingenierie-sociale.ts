import type { Lesson } from "@/lib/types";

export const INGENIERIE_SOCIALE: Lesson = {
  slug: "ingenierie-sociale",
  title: "Ingénierie sociale avancée",
  icon: "🎭",
  theme: "humain",
  level: "intermediaire",
  summary: "Spear phishing, prétexte, fraude au président, deepfakes : quand l'attaque est taillée sur mesure.",
  duration: "7 min",
  objectives: [
    "Comprendre comment un attaquant prépare une attaque ciblée",
    "Reconnaître le prétexte et la fraude au président",
    "Mettre en place des parades organisationnelles",
  ],
  sections: [
    {
      title: "Le spear phishing",
      paragraphs: [
        "Contrairement au phishing de masse, le spear phishing vise une personne précise. L'attaquant utilise son nom, son poste, ses collègues et ses projets trouvés en ligne (OSINT).",
        "Le message est crédible, sans faute, et arrive au bon moment : une facture attendue, un document partagé par un vrai collègue…",
      ],
    },
    {
      title: "Le prétexte",
      paragraphs: [
        "L'attaquant invente un scénario et un rôle : nouveau prestataire, technicien, auditeur, livreur. Il s'appuie sur des détails vrais pour gagner la confiance.",
        "Il peut aussi entrer physiquement dans un bâtiment en suivant quelqu'un qui badge (le « tailgating »).",
      ],
    },
    {
      title: "Fraude au président et deepfakes",
      paragraphs: [
        "Un faux dirigeant demande un virement urgent et confidentiel. Aujourd'hui, la voix ou même la vidéo peuvent être générées par IA.",
        "Autre variante : la fraude au changement de RIB, où un faux fournisseur annonce de nouvelles coordonnées bancaires.",
      ],
    },
    {
      title: "Les parades",
      paragraphs: [
        "Une procédure claire pour toute demande sensible : double validation des virements, rappel au numéro habituel (vérification hors bande), jamais au numéro donné dans le message.",
        "Une culture où l'on a le droit de dire « je vérifie d'abord », même à un chef. Et des sensibilisations régulières, avec des exercices de phishing.",
      ],
    },
  ],
  keyPoints: [
    "Le spear phishing est personnalisé grâce aux informations publiques sur la cible.",
    "Le prétexte, c'est un faux rôle crédible pour obtenir un accès ou une information.",
    "Une voix ou une vidéo peuvent être fausses : toute demande sensible se vérifie hors bande.",
    "Double validation et droit de vérifier sont les meilleures parades.",
  ],
  quiz: [
    {
      question: "Qu'est-ce qui distingue le spear phishing du phishing classique ?",
      options: ["Il est envoyé par SMS", "Il cible une personne précise avec des infos personnalisées", "Il ne contient jamais de lien"],
      correct: 1,
      explanation: "Il est préparé sur mesure grâce à la reconnaissance.",
    },
    {
      question: "Un fournisseur annonce par mail un nouveau RIB. Tu…",
      options: ["Mets à jour le RIB", "Rappelles le fournisseur au numéro habituel pour vérifier", "Réponds au mail pour confirmer"],
      correct: 1,
      explanation: "Le mail peut venir d'un pirate : on vérifie par un autre canal.",
    },
    {
      question: "Suivre quelqu'un qui badge pour entrer dans un bâtiment s'appelle…",
      options: ["Le tailgating", "Le spoofing", "Le baiting"],
      correct: 0,
      explanation: "On profite de la politesse de la personne qui tient la porte.",
    },
  ],
};
