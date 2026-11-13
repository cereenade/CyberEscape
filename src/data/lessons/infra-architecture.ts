import type { Lesson } from "@/lib/types";

export const INFRA_ARCHITECTURE: Lesson = {
  slug: "infra-architecture",
  title: "Les briques d'un système d'information",
  icon: "🏗️",
  theme: "infra",
  level: "debutant",
  summary: "Postes, serveurs, annuaire, réseau, cloud : savoir ce qu'on protège avant de le protéger.",
  duration: "7 min",
  objectives: [
    "Identifier les grandes briques d'un système d'information",
    "Comprendre pourquoi l'inventaire est la première mesure de sécurité",
    "Repérer les éléments les plus critiques",
  ],
  sections: [
    {
      title: "Les briques",
      paragraphs: [
        "Postes de travail et téléphones, serveurs (fichiers, applications, bases de données), annuaire (souvent Active Directory ou Entra ID), réseau (switchs, routeurs, pare-feux, Wi-Fi) et services cloud (messagerie, stockage, applications SaaS).",
        "Autour : sauvegardes, supervision, et les accès des prestataires.",
      ],
    },
    {
      title: "On ne protège que ce qu'on connaît",
      paragraphs: [
        "L'inventaire des matériels, logiciels, comptes et flux est la base de toute sécurité : un serveur oublié n'est ni mis à jour ni surveillé.",
        "C'est aussi la première mesure des référentiels comme le guide d'hygiène informatique de l'ANSSI ou les CIS Controls.",
      ],
    },
    {
      title: "Les joyaux de la couronne",
      paragraphs: [
        "Certains éléments donnent les clés de tout le reste : l'annuaire, les comptes d'administration, les sauvegardes, la console de virtualisation.",
        "Ce sont les cibles prioritaires des attaquants, donc celles qu'on protège en premier.",
      ],
    },
    {
      title: "Penser en flux",
      paragraphs: [
        "Qui doit parler à qui ? Un poste de comptabilité n'a aucune raison de se connecter à un automate industriel.",
        "Cartographier les flux permet ensuite de segmenter le réseau et de détecter les connexions anormales.",
      ],
    },
  ],
  keyPoints: [
    "Postes, serveurs, annuaire, réseau, cloud, sauvegardes.",
    "L'inventaire est la première mesure de sécurité.",
    "Annuaire, comptes admin, sauvegardes et virtualisation sont critiques.",
    "Cartographier les flux pour pouvoir segmenter.",
  ],
  quiz: [
    {
      question: "Quelle est la première mesure de sécurité d'une infrastructure ?",
      options: ["Acheter un pare-feu", "Faire l'inventaire", "Changer les fonds d'écran"],
      correct: 1,
      explanation: "On ne protège pas ce qu'on ne connaît pas.",
    },
    {
      question: "Quel élément donne souvent accès à tout le reste ?",
      options: ["L'imprimante de l'accueil", "L'annuaire et les comptes d'administration", "Le Wi-Fi invité"],
      correct: 1,
      explanation: "C'est la cible prioritaire des attaquants.",
    },
    {
      question: "Pourquoi cartographier les flux réseau ?",
      options: ["Pour segmenter et détecter l'anormal", "Pour accélérer Internet", "Ce n'est pas utile"],
      correct: 0,
      explanation: "On ne peut filtrer que ce qu'on a identifié.",
    },
  ],
  sources: [
    { label: "ANSSI – Guides MesServicesCyber (dont le guide d'hygiène informatique)", url: "https://messervices.cyber.gouv.fr" },
    { label: "CIS Critical Security Controls", url: "https://www.cisecurity.org/controls" },
  ],
};
