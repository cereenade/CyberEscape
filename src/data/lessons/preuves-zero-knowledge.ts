import type { Lesson } from "@/lib/types";

export const PREUVES_ZERO_KNOWLEDGE: Lesson = {
  slug: "preuves-zero-knowledge",
  title: "Les preuves à divulgation nulle de connaissance",
  icon: "🕵️",
  theme: "crypto",
  level: "avance",
  summary: "Prouver qu'une affirmation est vraie sans rien révéler d'autre : principes, usages et limites.",
  duration: "10 min",
  objectives: [
    "Connaître les trois propriétés d'une preuve à divulgation nulle",
    "Distinguer preuves interactives et non interactives",
    "Situer leurs usages pour la vie privée",
  ],
  sections: [
    {
      title: "L'idée",
      paragraphs: [
        "Une preuve à divulgation nulle de connaissance (ZKP) permet à un prouveur de convaincre un vérificateur qu'une affirmation est vraie, sans lui transmettre autre chose.",
        "Image classique : la caverne d'Ali Baba, où l'on montre qu'on connaît le mot magique sans le prononcer.",
      ],
    },
    {
      title: "Trois propriétés",
      paragraphs: [
        "Complétude : une affirmation vraie est acceptée.",
        "Solidité : une affirmation fausse est rejetée, sauf avec une probabilité négligeable.",
        "Divulgation nulle : le vérificateur n'apprend rien de plus que « c'est vrai ».",
      ],
    },
    {
      title: "Interactif ou non",
      paragraphs: [
        "Les premières preuves étaient interactives : échange de défis et de réponses répétés.",
        "Les zk-SNARK et zk-STARK produisent une preuve courte, vérifiable par tous. Certains SNARK demandent une cérémonie d'initialisation de confiance, les STARK non.",
      ],
    },
    {
      title: "Usages et limites",
      paragraphs: [
        "Vérification d'âge sans date de naissance, comme dans la salle, identité numérique, authentification sans envoyer le secret.",
        "Elles servent la minimisation des données voulue par le RGPD.",
        "Limites : complexité, calcul coûteux pour le prouveur, et une erreur d'implémentation ou de circuit peut annuler toute la sécurité. Préfère des bibliothèques auditées.",
      ],
    },
  ],
  keyPoints: [
    "Complétude, solidité, divulgation nulle.",
    "SNARK/STARK : preuves non interactives et courtes.",
    "Puissant pour la vie privée, délicat à implémenter.",
  ],
  quiz: [
    {
      question: "Quelle propriété empêche de faire accepter une affirmation fausse ?",
      options: ["La complétude", "La solidité", "La divulgation nulle"],
      correct: 1,
      explanation: "La solidité protège le vérificateur.",
    },
    {
      question: "Que garantit la divulgation nulle ?",
      options: ["Le vérificateur n'apprend que la vérité de l'affirmation", "La preuve est très courte", "La preuve est rapide à calculer"],
      correct: 0,
      explanation: "Rien d'autre ne fuit.",
    },
    {
      question: "Quel type de preuve ne nécessite pas d'initialisation de confiance ?",
      options: ["zk-SNARK classique", "zk-STARK", "Preuve par mot de passe"],
      correct: 1,
      explanation: "Les STARK reposent sur des hypothèses transparentes.",
    },
  ],
  sources: [
    { label: "CNIL — Vérification de l'âge en ligne", url: "https://www.cnil.fr/fr/verification-de-lage-en-ligne-trouver-lequilibre-entre-protection-des-mineurs-et-respect-de-la-vie-privee" },
    { label: "ZKProof — Ressources de standardisation", url: "https://zkproof.org/" },
  ],
};
