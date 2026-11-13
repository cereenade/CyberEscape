import type { Lesson } from "@/lib/types";

export const REGLEMENTATIONS_EUROPE: Lesson = {
  slug: "reglementations-europe",
  title: "NIS 2, DORA et Cyber Resilience Act",
  icon: "🏛️",
  theme: "grc",
  level: "avance",
  summary: "Les grandes réglementations européennes de cybersécurité : qui est concerné et ce qu'elles exigent.",
  duration: "10 min",
  objectives: [
    "Situer NIS 2, DORA et le Cyber Resilience Act",
    "Connaître leurs obligations de notification",
    "Savoir où en est l'application en France",
  ],
  sections: [
    {
      title: "NIS 2",
      paragraphs: [
        "La directive (UE) 2022/2555 étend les obligations de cybersécurité à de nombreux secteurs (énergie, santé, transports, numérique, administrations…), avec des entités « essentielles » et « importantes ».",
        "Elle exige des mesures de gestion des risques, engage la responsabilité de la direction et impose de signaler les incidents importants : alerte précoce sous 24 h, notification sous 72 h, rapport final sous un mois.",
      ],
    },
    {
      title: "NIS 2 en France",
      paragraphs: [
        "La France la transpose avec la loi dite « Résilience », qui transpose aussi la directive REC (entités critiques) et le volet directive de DORA. L'ANSSI en est l'autorité nationale.",
        "Le texte, adopté par le Sénat en mars 2025, a été examiné à l'Assemblée nationale en novembre 2026, avec deux ans de retard sur l'échéance européenne. L'ANSSI a déjà publié son référentiel (ReCyF) pour aider les entités à se préparer.",
      ],
    },
    {
      title: "DORA",
      paragraphs: [
        "Le règlement (UE) 2022/2554 sur la résilience opérationnelle numérique du secteur financier s'applique depuis le 17 janvier 2025.",
        "Banques, assurances et leurs prestataires informatiques critiques doivent gérer le risque numérique, notifier les incidents majeurs, tester leur résilience et encadrer leurs sous-traitants.",
      ],
    },
    {
      title: "Le Cyber Resilience Act",
      paragraphs: [
        "Le règlement (UE) 2024/2847 impose des exigences de sécurité aux produits comportant des éléments numériques (logiciels, objets connectés) vendus dans l'UE.",
        "Depuis le 11 septembre 2026, les fabricants doivent signaler les vulnérabilités activement exploitées et les incidents graves ; l'ensemble des exigences s'appliquera le 11 décembre 2027.",
      ],
    },
  ],
  keyPoints: [
    "NIS 2 : nombreux secteurs, direction responsable, incidents en 24 h / 72 h / 1 mois.",
    "En France : loi « Résilience », ANSSI autorité nationale.",
    "DORA : secteur financier, applicable depuis janvier 2025.",
    "CRA : sécurité des produits numériques, signalements depuis septembre 2026.",
  ],
  quiz: [
    {
      question: "Sous quel délai faut-il envoyer une alerte précoce NIS 2 ?",
      options: ["24 heures", "7 jours", "1 an"],
      correct: 0,
      explanation: "Puis une notification sous 72 heures.",
    },
    {
      question: "Quel secteur DORA vise-t-il ?",
      options: ["La santé", "La finance", "L'agriculture"],
      correct: 1,
      explanation: "Banques, assurances et leurs prestataires TIC critiques.",
    },
    {
      question: "Que réglemente le Cyber Resilience Act ?",
      options: ["Les produits comportant des éléments numériques", "Les salaires des RSSI", "Les réseaux sociaux uniquement"],
      correct: 0,
      explanation: "Logiciels et objets connectés vendus dans l'UE.",
    },
  ],
  sources: [
    { label: "Directive NIS 2 – (UE) 2022/2555", url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj" },
    { label: "Règlement DORA – (UE) 2022/2554", url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj" },
    { label: "Commission européenne – Obligations de signalement du Cyber Resilience Act", url: "https://digital-strategy.ec.europa.eu/en/policies/cra-reporting" },
    { label: "ANSSI – NIS 2", url: "https://cyber.gouv.fr" },
  ],
};
