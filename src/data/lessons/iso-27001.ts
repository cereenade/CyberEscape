import type { Lesson } from "@/lib/types";

export const ISO_27001: Lesson = {
  slug: "iso-27001",
  title: "ISO 27001 et la certification",
  icon: "📑",
  theme: "grc",
  level: "intermediaire",
  summary: "Le système de management de la sécurité de l'information, ses 93 mesures et le chemin vers la certification.",
  duration: "9 min",
  objectives: [
    "Comprendre ce qu'est un SMSI",
    "Connaître la structure de l'annexe A (version 2022)",
    "Savoir comment se déroule une certification",
  ],
  sections: [
    {
      title: "Un système de management",
      paragraphs: [
        "ISO/IEC 27001 ne liste pas seulement des mesures techniques : elle décrit un système de management de la sécurité de l'information (SMSI).",
        "Il suit la logique d'amélioration continue : planifier, mettre en œuvre, vérifier, améliorer, avec l'engagement de la direction.",
      ],
    },
    {
      title: "L'annexe A",
      paragraphs: [
        "La version 2022 regroupe 93 mesures en quatre thèmes : organisationnelles (37), liées aux personnes (8), physiques (14) et technologiques (34).",
        "Elle remplace les 114 mesures en 14 domaines de la version 2013. La norme ISO/IEC 27002 détaille comment appliquer chaque mesure.",
      ],
    },
    {
      title: "La déclaration d'applicabilité",
      paragraphs: [
        "À partir de l'analyse de risques, l'organisation indique pour chaque mesure si elle s'applique, et justifie les exclusions : c'est la déclaration d'applicabilité (SoA).",
        "Le périmètre du SMSI peut couvrir toute l'entreprise ou seulement une activité, un site, un service.",
      ],
    },
    {
      title: "La certification",
      paragraphs: [
        "Un organisme accrédité réalise un audit en deux étapes (documentation, puis mise en œuvre). Le certificat est valable trois ans, avec des audits de surveillance annuels.",
        "Avant cela : audits internes et revue de direction obligatoires.",
      ],
    },
  ],
  keyPoints: [
    "ISO 27001 = un système de management, pas une simple checklist.",
    "Annexe A 2022 : 93 mesures en 4 thèmes.",
    "Déclaration d'applicabilité fondée sur l'analyse de risques.",
    "Certificat de 3 ans, audits de surveillance annuels.",
  ],
  quiz: [
    {
      question: "Combien de mesures compte l'annexe A d'ISO 27001:2022 ?",
      options: ["14", "93", "114"],
      correct: 1,
      explanation: "93 mesures en 4 thèmes (114 dans la version 2013).",
    },
    {
      question: "Que contient la déclaration d'applicabilité ?",
      options: ["Les mesures retenues ou exclues, avec justification", "La liste des salariés", "Le budget marketing"],
      correct: 0,
      explanation: "Elle découle de l'analyse de risques.",
    },
    {
      question: "Combien de temps dure un certificat ISO 27001 ?",
      options: ["1 an", "3 ans", "À vie"],
      correct: 1,
      explanation: "Avec des audits de surveillance chaque année.",
    },
  ],
  sources: [
    { label: "ISO/IEC 27001:2022", url: "https://www.iso.org/standard/27001" },
  ],
};
