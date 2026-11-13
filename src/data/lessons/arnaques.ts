import type { Lesson } from "@/lib/types";

export const ARNAQUES: Lesson = {
  slug: "arnaques",
  title: "Arnaques en ligne et fraudes courantes",
  icon: "🪤",
  theme: "humain",
  level: "debutant",
  summary: "Faux support, faux cadeaux, faux colis : les arnaques du quotidien et comment les éviter.",
  duration: "6 min",
  objectives: [
    "Reconnaître les arnaques les plus répandues",
    "Comprendre le scénario type d'une fraude",
    "Savoir réagir si tu t'es fait avoir",
  ],
  sections: [
    {
      title: "Le faux support technique",
      paragraphs: [
        "Une fenêtre bloque ton écran : « Virus détecté ! Appelez immédiatement ce numéro. » Au téléphone, un faux technicien te fait installer un logiciel de prise en main à distance, puis te demande de payer.",
        "Aucune entreprise (Microsoft, Apple, ta banque) n'affiche de numéro à appeler dans une alerte de navigateur. Ferme l'onglet, ou redémarre si l'écran est bloqué.",
      ],
    },
    {
      title: "Les faux cadeaux et faux gains",
      paragraphs: [
        "« Félicitations, vous avez gagné un iPhone ! Payez juste 2 € de frais de port. » Le but : récupérer ta carte bancaire, souvent pour un abonnement caché.",
        "Si tu n'as participé à aucun concours, tu n'as rien gagné.",
      ],
    },
    {
      title: "Les faux colis et fausses amendes",
      paragraphs: [
        "SMS ou mails imitant un transporteur, l'assurance maladie ou une amende : une petite somme à payer, un lien vers une page qui copie le vrai site.",
        "Va toujours sur le site ou l'appli officielle en tapant l'adresse toi-même, jamais via le lien reçu.",
      ],
    },
    {
      title: "Si tu t'es fait avoir",
      paragraphs: [
        "Fais opposition à ta carte auprès de ta banque, change les mots de passe concernés et désinstalle tout logiciel de prise en main à distance.",
        "Signale l'arnaque sur la plateforme officielle de l'État (cybermalveillance.gouv.fr) et porte plainte si tu as perdu de l'argent.",
      ],
    },
  ],
  keyPoints: [
    "Une alerte de navigateur avec un numéro à appeler est toujours une arnaque.",
    "Pas de concours, pas de gain : un cadeau qui demande de payer est un piège.",
    "Tape toi-même l'adresse des sites officiels au lieu de cliquer sur un lien reçu.",
    "Victime ? Opposition bancaire, changement de mots de passe, signalement et plainte.",
  ],
  quiz: [
    {
      question: "Une page affiche « Virus détecté, appelez le 01 23 45 67 89 ». Tu…",
      options: ["Appelles vite", "Fermes l'onglet : c'est une arnaque", "Paies l'antivirus proposé"],
      correct: 1,
      explanation: "Les vraies alertes de sécurité n'affichent jamais de numéro à appeler.",
    },
    {
      question: "Tu as « gagné un iPhone », il faut payer 2 € de frais. C'est…",
      options: ["Une bonne affaire", "Une arnaque pour récupérer ta carte", "Un vrai concours"],
      correct: 1,
      explanation: "Les petits frais servent à voler les données bancaires ou à souscrire un abonnement caché.",
    },
    {
      question: "Tu as donné ta carte bancaire sur un faux site. Première chose à faire ?",
      options: ["Attendre de voir", "Faire opposition auprès de ta banque", "Supprimer le mail"],
      correct: 1,
      explanation: "L'opposition bloque immédiatement la carte.",
    },
  ],
};
