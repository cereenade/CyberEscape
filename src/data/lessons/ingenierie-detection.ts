import type { Lesson } from "@/lib/types";

export const INGENIERIE_DETECTION: Lesson = {
  slug: "ingenierie-detection",
  title: "Ingénierie de détection et chasse aux menaces",
  icon: "🧭",
  theme: "soc",
  level: "avance",
  summary: "Concevoir des détections solides, chasser sans attendre l'alerte, et mesurer sa couverture.",
  duration: "11 min",
  objectives: [
    "Construire une détection à partir d'une technique ATT&CK",
    "Mener une chasse guidée par une hypothèse",
    "Mesurer et améliorer la couverture des journaux",
  ],
  sections: [
    {
      title: "Du comportement à la règle",
      paragraphs: [
        "On part d'une technique (ex. certutil utilisé pour télécharger), on identifie les journaux qui la montrent, puis on écrit la requête (KQL, SPL, Sigma).",
        "Une bonne détection vise le comportement, pas un indicateur fragile comme une IP ou un hash (pyramide de la douleur).",
      ],
      example: "DeviceProcessEvents\n| where FileName =~ \"certutil.exe\" and ProcessCommandLine has \"urlcache\"",
    },
    {
      title: "La chasse",
      paragraphs: [
        "Une chasse part d'une hypothèse (« un attaquant utilise WMI pour se déplacer »), cherche les traces, puis confirme ou infirme.",
        "Chaque chasse produit quelque chose : une nouvelle règle, un angle mort découvert, une procédure améliorée.",
      ],
    },
    {
      title: "Des signaux plus fins",
      paragraphs: [
        "L'analyse comportementale (UEBA) compare chaque utilisateur à son habitude : volume, horaires, ressources.",
        "Les leurres (honeytokens, fichiers canaris) donnent des alertes presque sans faux positif.",
      ],
    },
    {
      title: "La couverture",
      paragraphs: [
        "Une source silencieuse est un angle mort total : on surveille l'arrivée de chaque source attendue.",
        "Cartographier ses détections sur ATT&CK (et ses défenses sur D3FEND) montre ce qui est réellement couvert.",
      ],
    },
  ],
  keyPoints: [
    "Détecter le comportement plutôt que l'indicateur.",
    "Chasser à partir d'une hypothèse et transformer les découvertes en règles.",
    "UEBA et leurres pour des signaux plus fiables.",
    "Surveiller les sources silencieuses et cartographier la couverture.",
  ],
  quiz: [
    {
      question: "Quelle détection est la plus robuste ?",
      options: ["Bloquer une IP précise", "Détecter un comportement (ex. certutil qui télécharge)", "Bloquer un hash"],
      correct: 1,
      explanation: "L'attaquant change facilement d'IP ou de hash, moins de comportement.",
    },
    {
      question: "Par quoi commence une chasse aux menaces ?",
      options: ["Par une alerte", "Par une hypothèse", "Par un redémarrage"],
      correct: 1,
      explanation: "On cherche sans attendre que quelque chose sonne.",
    },
    {
      question: "Pourquoi les honeytokens génèrent-ils peu de faux positifs ?",
      options: ["Personne de légitime ne doit les utiliser", "Ils sont chiffrés", "Ils sont rares"],
      correct: 0,
      explanation: "Toute utilisation trahit un intrus.",
    },
  ],
};
