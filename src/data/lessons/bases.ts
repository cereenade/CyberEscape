import type { Lesson } from "@/lib/types";

export const BASES: Lesson = {
  slug: "bases",
  title: "Les bases de la cybersécurité",
  icon: "🛡️",
  theme: "bases",
  level: "debutant",
  summary: "Ce qu'on protège, contre qui, et pourquoi tout le monde est concerné.",
  duration: "5 min",
  objectives: [
    "Expliquer ce que protège la cybersécurité (confidentialité, intégrité, disponibilité)",
    "Distinguer menace, vulnérabilité et risque",
    "Appliquer les réflexes d'hygiène numérique de base",
  ],
  sections: [
    {
      title: "Ce qu'on protège : le triangle CIA",
      paragraphs: [
        "La cybersécurité protège trois propriétés des informations, souvent résumées par l'acronyme anglais CIA.",
        "Confidentialité : seules les personnes autorisées peuvent lire une donnée. Intégrité : personne ne peut la modifier sans qu'on le sache. Disponibilité : elle reste accessible quand on en a besoin.",
        "Chaque attaque vise au moins l'une des trois : une fuite de données touche la confidentialité, un rançongiciel touche la disponibilité.",
      ],
    },
    {
      title: "Menace, vulnérabilité, risque",
      paragraphs: [
        "Une vulnérabilité est une faiblesse (un logiciel pas à jour, un mot de passe faible). Une menace est quelqu'un ou quelque chose qui peut l'exploiter (un pirate, un malware).",
        "Le risque, c'est la combinaison des deux : la probabilité qu'une menace exploite une vulnérabilité, multipliée par l'impact si ça arrive.",
      ],
    },
    {
      title: "Pourquoi tout le monde est une cible",
      paragraphs: [
        "La plupart des attaques sont automatisées : des robots testent des millions de comptes et de machines au hasard.",
        "Ton compte peut servir à rebondir vers d'autres, ta machine à envoyer du spam, tes données à être revendues. L'humain reste souvent le maillon le plus facile à piéger.",
      ],
    },
    {
      title: "Les réflexes d'hygiène numérique",
      paragraphs: [
        "Des mots de passe longs et uniques, la double authentification, des mises à jour régulières, des sauvegardes, et de la méfiance face aux messages urgents.",
        "Ces quelques gestes bloquent l'immense majorité des attaques courantes.",
      ],
    },
  ],
  keyPoints: [
    "La cybersécurité protège la confidentialité, l'intégrité et la disponibilité des données.",
    "Risque = une menace qui exploite une vulnérabilité, avec un impact.",
    "La plupart des attaques sont automatisées : tout le monde est une cible.",
    "Mots de passe uniques, double authentification, mises à jour et sauvegardes bloquent la majorité des attaques.",
  ],
  quiz: [
    {
      question: "Un rançongiciel bloque l'accès à tous les fichiers. Quelle propriété est d'abord touchée ?",
      options: ["La confidentialité", "L'intégrité", "La disponibilité"],
      correct: 2,
      explanation: "Les fichiers ne sont plus accessibles : c'est la disponibilité qui est touchée.",
    },
    {
      question: "Un logiciel qui n'a pas été mis à jour depuis deux ans, c'est…",
      options: ["Une menace", "Une vulnérabilité", "Un risque nul"],
      correct: 1,
      explanation: "C'est une faiblesse exploitable : une vulnérabilité.",
    },
    {
      question: "Pourquoi un particulier sans « rien d'important » peut-il être attaqué ?",
      options: [
        "Il ne peut pas l'être",
        "Parce que les attaques sont souvent automatisées et que ses comptes ont de la valeur",
        "Seulement s'il est célèbre",
      ],
      correct: 1,
      explanation: "Les robots attaquent au hasard, et tout compte ou appareil peut être revendu ou réutilisé.",
    },
  ],
};
