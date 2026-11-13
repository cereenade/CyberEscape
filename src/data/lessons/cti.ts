import type { Lesson } from "@/lib/types";

export const CTI: Lesson = {
  slug: "cti",
  title: "Threat intelligence et indicateurs",
  icon: "🛰️",
  theme: "soc",
  level: "avance",
  summary: "Connaître ses adversaires : sources, IOC, partage et attribution.",
  duration: "7 min",
  objectives: [
    "Comprendre ce qu'est la threat intelligence (CTI)",
    "Utiliser des IOC de façon pertinente",
    "Comprendre les limites de l'attribution",
  ],
  sections: [
    {
      title: "Qu'est-ce que la CTI ?",
      paragraphs: [
        "La threat intelligence est l'information sur les menaces : qui attaque, avec quels outils, quelles techniques, et contre qui. Elle aide à anticiper au lieu de seulement réagir.",
        "Trois niveaux : stratégique (tendances, pour la direction), opérationnel (campagnes, groupes), tactique (IOC et règles pour le SOC).",
      ],
    },
    {
      title: "Les indicateurs de compromission",
      paragraphs: [
        "Hashs de fichiers, adresses IP, domaines, URL, noms de fichiers, clés de registre. On les bloque, et on les recherche dans les journaux passés pour savoir si on a déjà été touché.",
        "Un IOC vieillit vite : une IP malveillante hier peut être réattribuée demain à un service légitime. Il faut dater et vérifier ses indicateurs.",
      ],
    },
    {
      title: "Sources et partage",
      paragraphs: [
        "Rapports d'éditeurs de sécurité, alertes des CERT (comme le CERT-FR), flux partagés entre entreprises du même secteur, plateformes communautaires.",
        "Le partage se fait souvent avec des formats standards et des règles de diffusion (le TLP : vert, ambre, rouge) qui indiquent à qui on peut transmettre l'information.",
      ],
    },
    {
      title: "L'attribution",
      paragraphs: [
        "Dire « c'est tel groupe » est difficile : les outils s'achètent et se partagent, et certains attaquants laissent volontairement de fausses pistes (false flags).",
        "Pour un SOC, savoir comment l'attaquant opère compte généralement plus que savoir exactement qui il est.",
      ],
    },
  ],
  keyPoints: [
    "La CTI aide à anticiper : qui attaque, comment et qui est visé.",
    "Un IOC se bloque, se recherche dans l'historique… et se périme.",
    "Le TLP indique jusqu'où une information peut être partagée.",
    "L'attribution est incertaine : les techniques comptent plus que le nom de l'attaquant.",
  ],
  quiz: [
    {
      question: "Pourquoi rechercher un nouvel IOC dans les journaux passés ?",
      options: ["Pour les supprimer", "Pour savoir si on a déjà été touché", "C'est inutile"],
      correct: 1,
      explanation: "L'attaquant a peut-être agi avant que l'IOC soit connu.",
    },
    {
      question: "À quoi sert le TLP ?",
      options: ["À chiffrer les mails", "À indiquer avec qui on peut partager une information", "À classer les malwares"],
      correct: 1,
      explanation: "Rouge, ambre, vert, blanc/clear : chaque couleur limite la diffusion.",
    },
    {
      question: "Pourquoi l'attribution est-elle difficile ?",
      options: ["Les attaquants signent toujours", "Les outils se partagent et il existe de fausses pistes", "Elle est interdite"],
      correct: 1,
      explanation: "Les false flags et les outils partagés brouillent les pistes.",
    },
  ],
};
