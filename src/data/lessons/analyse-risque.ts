import type { Lesson } from "@/lib/types";

export const ANALYSE_RISQUE: Lesson = {
  slug: "analyse-risque",
  title: "Analyser et traiter les risques",
  icon: "🎯",
  theme: "grc",
  level: "intermediaire",
  summary: "Vraisemblance, gravité, matrice et options de traitement : la mécanique d'une analyse de risque.",
  duration: "9 min",
  objectives: [
    "Évaluer un risque par sa vraisemblance et sa gravité",
    "Connaître les quatre options de traitement",
    "Situer ISO 27005 et EBIOS Risk Manager",
  ],
  sections: [
    {
      title: "Qu'est-ce qu'un risque ?",
      paragraphs: [
        "Un risque, c'est un événement redouté (fuite de données, arrêt de la production) causé par une menace qui exploite une vulnérabilité.",
        "On l'évalue selon deux axes : sa vraisemblance (est-ce probable ?) et sa gravité (quel impact pour l'activité ?).",
      ],
    },
    {
      title: "La matrice",
      paragraphs: [
        "En croisant vraisemblance et gravité sur des échelles de 1 à 4, on place chaque risque dans une matrice : les risques en haut à droite sont prioritaires.",
        "L'impact se mesure en termes métier : argent, image, juridique, sécurité des personnes, pas seulement en termes techniques.",
      ],
      example: "Rançongiciel sur le serveur de production : vraisemblance 3/4, gravité 4/4 → risque élevé, à traiter en priorité",
    },
    {
      title: "Quatre façons de traiter",
      paragraphs: [
        "Réduire (ajouter des mesures), transférer (assurance, sous-traitance), éviter (renoncer à l'activité risquée), accepter (en connaissance de cause).",
        "Le risque qui reste après traitement, le risque résiduel, est formellement accepté par la direction.",
      ],
    },
    {
      title: "Les méthodes",
      paragraphs: [
        "ISO/IEC 27005 donne les lignes directrices de la gestion des risques liée à ISO 27001.",
        "EBIOS Risk Manager, la méthode de l'ANSSI, construit des scénarios d'attaque réalistes à partir des sources de risque et des valeurs métier.",
      ],
    },
  ],
  keyPoints: [
    "Risque = menace × vulnérabilité, évalué en vraisemblance et gravité.",
    "La matrice fait ressortir les priorités.",
    "Réduire, transférer, éviter ou accepter.",
    "ISO 27005 et EBIOS RM structurent la démarche.",
  ],
  quiz: [
    {
      question: "Souscrire une cyber-assurance, c'est…",
      options: ["Réduire le risque", "Transférer le risque", "Éviter le risque"],
      correct: 1,
      explanation: "Une partie des conséquences financières est transférée à l'assureur.",
    },
    {
      question: "Qui accepte le risque résiduel ?",
      options: ["La direction", "Le pentesteur", "Le fournisseur cloud"],
      correct: 0,
      explanation: "C'est une décision de gouvernance.",
    },
    {
      question: "Quelle méthode d'analyse de risque est publiée par l'ANSSI ?",
      options: ["EBIOS Risk Manager", "PTES", "CVSS"],
      correct: 0,
      explanation: "Elle construit des scénarios d'attaque réalistes.",
    },
  ],
  sources: [
    { label: "ANSSI – La méthode EBIOS Risk Manager", url: "https://cyber.gouv.fr/la-methode-ebios-risk-manager" },
    { label: "ISO/IEC 27005 – Gestion des risques liés à la sécurité de l'information", url: "https://www.iso.org/standard/80585.html" },
  ],
};
