import type { Lesson } from "@/lib/types";

export const ARNAQUES_QUOTIDIEN: Lesson = {
  slug: "arnaques-quotidien",
  title: "Achats, annonces et faux services",
  icon: "🛍️",
  theme: "humain",
  level: "debutant",
  summary: "Faux sites marchands, faux acheteurs, faux services clients : les arnaques de la vie de tous les jours.",
  duration: "6 min",
  objectives: [
    "Vérifier un site marchand avant d'acheter",
    "Vendre en ligne sans se faire piéger",
    "Trouver le vrai contact d'une entreprise ou d'une administration",
  ],
  sections: [
    {
      title: "Le faux site marchand",
      paragraphs: [
        "Un prix 80 % moins cher sur un site créé il y a quelques jours, sans avis indépendant : c'est presque toujours une arnaque.",
        "Vérifie les mentions légales, les avis sur d'autres sites, et fuis les paiements par virement ou carte cadeau uniquement.",
      ],
    },
    {
      title: "Le faux acheteur",
      paragraphs: [
        "Sur les sites d'annonces, le faux acheteur envoie un lien de « paiement sécurisé » qui demande ta carte bancaire pour te payer.",
        "Pour recevoir de l'argent, on ne donne jamais son numéro de carte : reste dans la messagerie et le paiement du site.",
      ],
    },
    {
      title: "Les faux services et fausses démarches",
      paragraphs: [
        "Des numéros surtaxés se font passer pour des services clients, et des sites copient l'administration pour facturer des démarches gratuites.",
        "Les démarches officielles se font sur des sites en .gouv.fr ; le contact d'une entreprise se trouve sur son site officiel.",
      ],
    },
    {
      title: "Les petits montants",
      paragraphs: [
        "1,99 € de frais de livraison, 35 € d'amende : le petit montant endort la méfiance, mais le vrai but est de voler ta carte.",
        "Les SMS frauduleux se signalent gratuitement au 33700.",
      ],
    },
  ],
  keyPoints: [
    "Prix incroyable + site récent = arnaque.",
    "Recevoir de l'argent ne demande jamais ta carte bancaire.",
    "Démarches officielles uniquement en .gouv.fr.",
    "Les SMS frauduleux se signalent au 33700.",
  ],
  quiz: [
    {
      question: "Un acheteur t'envoie un lien pour « recevoir le paiement » qui demande ta carte. C'est…",
      options: ["Normal", "Une arnaque", "Une option payante du site"],
      correct: 1,
      explanation: "Recevoir de l'argent ne nécessite jamais ton numéro de carte.",
    },
    {
      question: "À quel numéro transférer un SMS frauduleux ?",
      options: ["17", "33700", "112"],
      correct: 1,
      explanation: "Le 33700 est le service de signalement des spams SMS et vocaux.",
    },
    {
      question: "Par quoi se termine l'adresse d'un site de démarches officielles ?",
      options: [".gouv.fr", ".com", ".info"],
      correct: 0,
      explanation: "Les autres peuvent être des intermédiaires payants ou des arnaques.",
    },
  ],
};
