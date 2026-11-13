import type { Lesson } from "@/lib/types";

export const GRC_INTRODUCTION: Lesson = {
  slug: "grc-introduction",
  title: "C'est quoi la GRC ?",
  icon: "⚖️",
  theme: "grc",
  level: "debutant",
  summary: "Gouvernance, risques, conformité : la partie de la cybersécurité qui organise, décide et rend des comptes.",
  duration: "7 min",
  objectives: [
    "Comprendre les trois piliers de la GRC",
    "Connaître les rôles clés (RSSI, DPO, direction)",
    "Savoir à quoi sert une PSSI",
  ],
  sections: [
    {
      title: "Trois piliers",
      paragraphs: [
        "Gouvernance : qui décide, avec quels objectifs et quels moyens. Risques : identifier ce qui peut mal tourner et choisir comment le traiter. Conformité : respecter les lois, normes et contrats.",
        "La GRC relie la technique aux enjeux de l'entreprise : elle traduit les risques cyber en décisions et en budgets.",
      ],
    },
    {
      title: "Les rôles",
      paragraphs: [
        "La direction porte la responsabilité finale. Le RSSI (responsable de la sécurité des systèmes d'information) pilote la stratégie et conseille la direction.",
        "Le DPO (délégué à la protection des données) veille au respect du RGPD. Chaque métier reste responsable des risques de ses activités.",
      ],
    },
    {
      title: "La PSSI",
      paragraphs: [
        "La politique de sécurité des systèmes d'information fixe les règles : classification des données, gestion des accès, sauvegardes, usage des outils.",
        "Elle se décline en procédures et en une charte informatique signée par les utilisateurs.",
      ],
    },
    {
      title: "Un métier à part entière",
      paragraphs: [
        "Analyste GRC, auditeur, consultant en conformité, risk manager : des profils qui allient technique, juridique et communication.",
        "Le NIST Cybersecurity Framework 2.0 (2024) a d'ailleurs ajouté une fonction « Gouverner » au cœur de son modèle.",
      ],
    },
  ],
  keyPoints: [
    "Gouvernance, risques, conformité.",
    "Direction responsable, RSSI pilote, DPO pour le RGPD.",
    "La PSSI fixe les règles, la charte les rend opposables aux utilisateurs.",
    "Le NIST CSF 2.0 place la gouvernance au centre.",
  ],
  quiz: [
    {
      question: "Qui porte la responsabilité finale de la sécurité ?",
      options: ["Le stagiaire informatique", "La direction", "Le fournisseur d'accès"],
      correct: 1,
      explanation: "Le RSSI conseille et pilote, mais la direction décide et répond.",
    },
    {
      question: "Que fixe une PSSI ?",
      options: ["Les règles de sécurité de l'organisation", "Le salaire du RSSI", "La couleur du logo"],
      correct: 0,
      explanation: "Elle est déclinée en procédures et en charte.",
    },
    {
      question: "Quelle fonction le NIST CSF 2.0 a-t-il ajoutée ?",
      options: ["Gouverner (Govern)", "Chiffrer", "Supprimer"],
      correct: 0,
      explanation: "Elle s'ajoute à Identifier, Protéger, Détecter, Répondre, Rétablir.",
    },
  ],
  sources: [
    { label: "NIST Cybersecurity Framework 2.0", url: "https://www.nist.gov/cyberframework" },
    { label: "CNIL – Le RGPD (dont le rôle du DPO)", url: "https://www.cnil.fr/fr/reglement-europeen-protection-donnees" },
  ],
};
