import type { Lesson } from "@/lib/types";

export const FAUX_AVIS: Lesson = {
  slug: "faux-avis",
  title: "Repérer les faux avis en ligne",
  icon: "⭐",
  theme: "humain",
  level: "debutant",
  summary: "Avis achetés, robots, copies : les signaux qui trahissent des étoiles trop parfaites.",
  duration: "5 min",
  objectives: [
    "Comprendre pourquoi de faux avis existent",
    "Repérer les signaux d'alerte",
    "Savoir où signaler une pratique trompeuse",
  ],
  sections: [
    {
      title: "Pourquoi de faux avis ?",
      paragraphs: [
        "Les avis influencent énormément les achats. Certaines boutiques en achètent par paquets, ou les font écrire par des robots, pour paraître sérieuses.",
        "Les fausses boutiques s'en servent aussi pour rassurer avant d'encaisser un paiement… sans jamais livrer.",
      ],
    },
    {
      title: "Les signaux d'alerte",
      paragraphs: [
        "Beaucoup d'avis publiés le même jour, des phrases presque identiques, aucun détail concret sur le produit.",
        "Des profils sans photo, sans historique, qui n'ont jamais rien noté d'autre. Une note parfaite sur un vendeur apparu il y a une semaine.",
        "Comme dans la salle des cinq étoiles, les avis nuancés à 2 ou 3 étoiles, avec des détails précis, sont souvent les plus fiables.",
      ],
    },
    {
      title: "Que faire ?",
      paragraphs: [
        "Croise les sources : avis sur plusieurs sites, ancienneté de la boutique, mentions légales, moyens de paiement protégés.",
        "En France, publier ou commander de faux avis est une pratique commerciale trompeuse : tu peux la signaler sur SignalConso.",
      ],
    },
  ],
  keyPoints: [
    "Avis identiques et datés du même jour = signal fort.",
    "Les avis moyens et détaillés sont les plus utiles.",
    "Vérifie la boutique ailleurs avant de payer.",
    "Signale les pratiques trompeuses sur SignalConso.",
  ],
  quiz: [
    {
      question: "Lequel de ces avis semble le plus authentique ?",
      options: ["« Top top top !!! »", "« Ça charge bien, mais le câble est court et la livraison a pris 9 jours. »", "« Meilleur produit du monde, je recommande ! »"],
      correct: 1,
      explanation: "Un avis précis et nuancé ressemble à une vraie expérience.",
    },
    {
      question: "Dix avis 5 étoiles presque identiques le même jour, c'est :",
      options: ["Un signe de succès", "Un signe probable d'avis achetés ou générés", "Normal pendant les soldes"],
      correct: 1,
      explanation: "Les avis authentiques sont variés et étalés dans le temps.",
    },
    {
      question: "Où signaler une boutique qui publie de faux avis ?",
      options: ["Sur SignalConso", "Dans les commentaires de la boutique", "Nulle part, c'est légal"],
      correct: 0,
      explanation: "La DGCCRF traite ces signalements.",
    },
  ],
  sources: [
    { label: "SignalConso (DGCCRF)", url: "https://signal.conso.gouv.fr/" },
  ],
};
