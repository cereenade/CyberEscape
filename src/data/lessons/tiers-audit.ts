import type { Lesson } from "@/lib/types";

export const TIERS_AUDIT: Lesson = {
  slug: "tiers-audit",
  title: "Fournisseurs, audits et contrôle",
  icon: "🤝",
  theme: "grc",
  level: "avance",
  summary: "Votre sécurité dépend aussi de vos prestataires : évaluer, contractualiser, auditer et piloter.",
  duration: "9 min",
  objectives: [
    "Comprendre le risque lié aux tiers",
    "Intégrer la sécurité dans les contrats",
    "Distinguer les types d'audits et suivre les écarts",
  ],
  sections: [
    {
      title: "Le risque tiers",
      paragraphs: [
        "Infogérants, éditeurs SaaS, prestataires de paie : beaucoup d'attaques passent par un fournisseur qui a accès au système d'information ou aux données.",
        "On classe les fournisseurs selon leur criticité (accès, données, dépendance) pour adapter le niveau d'exigence.",
      ],
    },
    {
      title: "Évaluer avant de signer",
      paragraphs: [
        "Questionnaire de sécurité, certifications (ISO 27001, SecNumCloud pour le cloud qualifié par l'ANSSI), localisation des données, gestion des sous-traitants.",
        "Le contrat précise les exigences : notification des incidents, droit d'audit, réversibilité, clauses RGPD de sous-traitance.",
      ],
    },
    {
      title: "Les audits",
      paragraphs: [
        "Audit organisationnel (procédures, gouvernance), audit de configuration, audit de code, test d'intrusion : chacun répond à une question différente.",
        "Audit interne pour s'améliorer, audit externe ou de certification pour démontrer sa conformité.",
      ],
    },
    {
      title: "Suivre les écarts",
      paragraphs: [
        "Chaque constat devient une action avec un responsable, une échéance et un suivi dans un plan d'action.",
        "Des indicateurs (taux de correctifs appliqués, comptes à privilèges revus, fournisseurs évalués) permettent de rendre compte à la direction.",
      ],
    },
  ],
  keyPoints: [
    "Les fournisseurs sont une porte d'entrée fréquente.",
    "Évaluer, puis inscrire les exigences dans le contrat.",
    "Chaque type d'audit répond à une question précise.",
    "Constats → plan d'action suivi et indicateurs.",
  ],
  quiz: [
    {
      question: "Quelle clause contractuelle permet de vérifier un prestataire ?",
      options: ["Le droit d'audit", "La clause de confidentialité du logo", "Le délai de paiement"],
      correct: 0,
      explanation: "Avec la notification d'incidents et la réversibilité.",
    },
    {
      question: "Que désigne SecNumCloud ?",
      options: ["Une qualification ANSSI pour les offres cloud", "Un antivirus", "Une loi européenne"],
      correct: 0,
      explanation: "Elle garantit un haut niveau de sécurité de l'offre cloud.",
    },
    {
      question: "Que devient un constat d'audit ?",
      options: ["Une action avec responsable et échéance", "Un simple commentaire", "Rien"],
      correct: 0,
      explanation: "Sans suivi, l'audit n'améliore rien.",
    },
  ],
  sources: [
    { label: "ANSSI – Qualification SecNumCloud", url: "https://cyber.gouv.fr" },
    { label: "CNIL – Sous-traitants : obligations", url: "https://www.cnil.fr/fr/reglement-europeen-protection-donnees" },
  ],
};
