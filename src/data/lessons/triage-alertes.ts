import type { Lesson } from "@/lib/types";

export const TRIAGE_ALERTES: Lesson = {
  slug: "triage-alertes",
  title: "Trier et traiter les alertes",
  icon: "🚦",
  theme: "soc",
  level: "intermediaire",
  summary: "Prioriser, enquêter, contenir : le quotidien d'un analyste face à un flot d'alertes.",
  duration: "9 min",
  objectives: [
    "Prioriser les alertes selon l'impact et la confiance",
    "Gérer les faux positifs sans créer d'angle mort",
    "Utiliser playbooks, SOAR et isolement de poste",
  ],
  sections: [
    {
      title: "Prioriser",
      paragraphs: [
        "On croise la criticité de l'actif (contrôleur de domaine, serveur de paie) avec la gravité du comportement et la confiance dans l'alerte.",
        "Une activité en cours (chiffrement, exfiltration) passe avant une tentative déjà bloquée.",
      ],
    },
    {
      title: "Les faux positifs",
      paragraphs: [
        "Trop de faux positifs épuisent l'équipe et noient les vraies alertes.",
        "On ajuste par une exclusion précise (hash, signature, chemin), jamais en désactivant la règle ou en excluant largement.",
      ],
    },
    {
      title: "Les procédures",
      paragraphs: [
        "Un playbook décrit les étapes pour chaque type d'alerte ; un SOAR en automatise une partie (recherche, blocage, enrichissement).",
        "Les étapes clés sont toujours les mêmes : qualifier, délimiter le périmètre, contenir, éradiquer, documenter.",
      ],
    },
    {
      title: "Contenir sans détruire les preuves",
      paragraphs: [
        "L'isolement par l'EDR coupe le poste du réseau tout en laissant l'analyste enquêter à distance.",
        "On évite d'éteindre une machine compromise : la mémoire contient des preuves. On révoque aussi les sessions et identifiants concernés.",
      ],
    },
  ],
  keyPoints: [
    "Priorité = criticité de l'actif × gravité × confiance.",
    "Exclusions précises, jamais de règle désactivée par lassitude.",
    "Playbooks et SOAR pour aller vite sans rien oublier.",
    "Isoler plutôt qu'éteindre, révoquer les sessions.",
  ],
  quiz: [
    {
      question: "Quelle alerte traiter en premier ?",
      options: ["Phishing bloqué par la passerelle", "Chiffrement massif en cours sur un serveur", "Connexion VPN réussie habituelle"],
      correct: 1,
      explanation: "Une activité destructrice en cours sur un actif critique.",
    },
    {
      question: "Une règle sonne 40 fois par jour sur un script légitime. Tu…",
      options: ["Désactives la règle", "Ajoutes une exclusion précise pour ce script", "Exclus tout PowerShell"],
      correct: 1,
      explanation: "La règle reste efficace pour tout le reste.",
    },
    {
      question: "Pourquoi isoler un poste plutôt que l'éteindre ?",
      options: ["Pour garder la mémoire et enquêter à distance", "Pour économiser l'électricité", "Ce n'est pas possible"],
      correct: 0,
      explanation: "Les preuves en mémoire sont préservées.",
    },
  ],
};
