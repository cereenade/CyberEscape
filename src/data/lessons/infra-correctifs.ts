import type { Lesson } from "@/lib/types";

export const INFRA_CORRECTIFS: Lesson = {
  slug: "infra-correctifs",
  title: "Gérer les correctifs et les vulnérabilités",
  icon: "🩹",
  theme: "infra",
  level: "debutant",
  summary: "Mettre à jour vite et dans le bon ordre : la défense la plus rentable qui soit.",
  duration: "7 min",
  objectives: [
    "Comprendre le cycle de gestion des vulnérabilités",
    "Prioriser les correctifs",
    "Gérer les systèmes qu'on ne peut pas mettre à jour",
  ],
  sections: [
    {
      title: "Un cycle continu",
      paragraphs: [
        "Inventorier, détecter les vulnérabilités (scanner, avis des éditeurs, alertes du CERT-FR), prioriser, corriger, vérifier.",
        "C'est un processus permanent : de nouvelles failles sont publiées chaque jour.",
      ],
    },
    {
      title: "Prioriser",
      paragraphs: [
        "D'abord les failles déjà exploitées (catalogue KEV de la CISA, alertes du CERT-FR), surtout sur les équipements exposés à Internet : VPN, pare-feux, messagerie.",
        "Ensuite selon la gravité (CVSS), la probabilité d'exploitation (EPSS) et l'importance de l'actif.",
      ],
    },
    {
      title: "Tester sans traîner",
      paragraphs: [
        "On teste les correctifs sur un groupe pilote avant de les déployer partout, pour éviter de casser la production.",
        "Mais les délais doivent rester courts : une faille critique exposée se corrige en jours, pas en mois.",
      ],
    },
    {
      title: "Quand on ne peut pas corriger",
      paragraphs: [
        "Système obsolète, automate industriel, logiciel métier figé : on isole la machine, on limite ses flux, on renforce la surveillance.",
        "Et on planifie son remplacement : un système sans mises à jour est une dette de sécurité.",
      ],
    },
  ],
  keyPoints: [
    "Inventorier, détecter, prioriser, corriger, vérifier, en continu.",
    "Priorité aux failles exploitées sur les équipements exposés.",
    "Groupe pilote, mais délais courts.",
    "Système non corrigeable : isoler, surveiller, remplacer.",
  ],
  quiz: [
    {
      question: "Quelle faille corriger en premier ?",
      options: ["Une faille exploitée sur le VPN exposé", "Une faille faible sur un poste isolé", "Une faille théorique sans exploitation connue"],
      correct: 0,
      explanation: "Exploitée et exposée à Internet : urgence maximale.",
    },
    {
      question: "Pourquoi utiliser un groupe pilote ?",
      options: ["Pour vérifier que le correctif ne casse rien", "Pour retarder les mises à jour", "Pour économiser des licences"],
      correct: 0,
      explanation: "On teste sur quelques machines avant de déployer partout.",
    },
    {
      question: "Un automate ne peut pas être mis à jour. Que faire ?",
      options: ["Rien", "L'isoler, limiter ses flux et surveiller", "Le connecter à Internet"],
      correct: 1,
      explanation: "On réduit son exposition en attendant son remplacement.",
    },
  ],
  sources: [
    { label: "CERT-FR – Alertes et avis de sécurité", url: "https://www.cert.ssi.gouv.fr/" },
    { label: "CISA – Known Exploited Vulnerabilities Catalog", url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog" },
  ],
};
