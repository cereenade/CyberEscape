import type { Lesson } from "@/lib/types";

export const VEX: Lesson = {
  slug: "vex",
  title: "Le VEX : dire si une faille vous touche vraiment",
  icon: "📑",
  theme: "grc",
  level: "avance",
  summary: "SBOM, statuts VEX et justifications : communiquer l'exploitabilité réelle d'une vulnérabilité.",
  duration: "9 min",
  objectives: [
    "Distinguer SBOM et VEX",
    "Connaître les statuts VEX et leurs justifications",
    "Intégrer le VEX dans la gestion des vulnérabilités",
  ],
  sections: [
    {
      title: "Du SBOM au VEX",
      paragraphs: [
        "Le SBOM liste les composants d'un logiciel. Quand une faille sort dans un composant, tous les produits qui le contiennent semblent concernés.",
        "Pourtant, souvent, la fonction vulnérable n'est pas utilisée. Le VEX (Vulnerability Exploitability eXchange) sert à le dire de façon fiable et lisible par les machines.",
      ],
    },
    {
      title: "Statuts et justifications",
      paragraphs: [
        "Quatre statuts : not_affected (non concerné), affected (concerné, avec les mesures à prendre), fixed (corrigé), under_investigation (en cours d'analyse).",
        "Un « non concerné » doit être justifié : composant absent, code vulnérable absent, code jamais exécuté, entrée impossible à contrôler par un attaquant, ou protection déjà en place.",
        "Formats courants : CSAF, CycloneDX et OpenVEX.",
      ],
    },
    {
      title: "Dans la pratique",
      paragraphs: [
        "Comme dans la salle de la faille qui ne touchait personne : repérer les produits concernés via le SBOM, analyser l'atteignabilité, publier le VEX, puis le réévaluer à chaque version.",
        "Côté client, les outils de scan qui lisent le VEX filtrent les faux positifs et concentrent l'effort sur les vraies expositions.",
        "Un VEX engage l'éditeur : une affirmation fausse expose ses clients. L'analyse doit être documentée et revue.",
      ],
    },
  ],
  keyPoints: [
    "SBOM = ce qu'il y a dedans ; VEX = ce qui est réellement exploitable.",
    "4 statuts : not_affected, affected, fixed, under_investigation.",
    "Tout « non concerné » est justifié.",
    "Le VEX se met à jour à chaque version.",
  ],
  quiz: [
    {
      question: "Que décrit un SBOM ?",
      options: ["L'exploitabilité des failles", "La liste des composants d'un logiciel", "Le plan de continuité"],
      correct: 1,
      explanation: "Le VEX vient compléter le SBOM.",
    },
    {
      question: "Quel statut VEX choisir pendant l'analyse ?",
      options: ["fixed", "under_investigation", "not_affected"],
      correct: 1,
      explanation: "On ne conclut pas avant d'avoir analysé.",
    },
    {
      question: "Un statut not_affected doit-il être justifié ?",
      options: ["Non, jamais", "Oui, par exemple « code vulnérable jamais exécuté »", "Seulement si un client le demande"],
      correct: 1,
      explanation: "La justification rend le VEX vérifiable.",
    },
  ],
  sources: [
    { label: "CISA – Software Bill of Materials (SBOM)", url: "https://www.cisa.gov/sbom" },
    { label: "Spécification OpenVEX", url: "https://github.com/openvex/spec" },
  ],
};
