import type { Lesson } from "@/lib/types";

export const ZERO_TRUST: Lesson = {
  slug: "zero-trust",
  title: "Le modèle Zero Trust",
  icon: "🚫",
  theme: "infra",
  level: "avance",
  summary: "Ne jamais faire confiance par défaut, même à l'intérieur du réseau : vérifier chaque accès.",
  duration: "9 min",
  objectives: [
    "Comprendre pourquoi le modèle du périmètre ne suffit plus",
    "Connaître les principes du Zero Trust (NIST SP 800-207)",
    "Identifier les briques concrètes d'une démarche Zero Trust",
  ],
  sections: [
    {
      title: "La fin du château fort",
      paragraphs: [
        "L'ancien modèle protégeait un périmètre : dehors danger, dedans confiance. Avec le cloud, le télétravail et les attaques internes, ce périmètre a disparu.",
        "Un attaquant qui entre par un poste compromis profite de cette confiance interne pour se déplacer.",
      ],
    },
    {
      title: "Les principes",
      paragraphs: [
        "Le NIST les décrit dans la publication SP 800-207 : aucune confiance implicite liée à l'emplacement réseau, chaque accès à une ressource est authentifié et autorisé, session par session.",
        "La décision tient compte de l'identité, de l'état de l'appareil, du contexte et de la sensibilité de la ressource, avec le moindre privilège.",
      ],
    },
    {
      title: "Les briques concrètes",
      paragraphs: [
        "Identité forte (MFA résistante au phishing), appareils gérés et conformes, accès conditionnel, micro-segmentation, accès aux applications sans VPN complet (ZTNA).",
        "Journalisation et analyse continue pour réévaluer la confiance pendant la session.",
      ],
    },
    {
      title: "Une démarche, pas un produit",
      paragraphs: [
        "Aucun boîtier ne rend une entreprise « Zero Trust » du jour au lendemain : c'est une transformation progressive.",
        "On commence souvent par les identités et les applications les plus sensibles.",
      ],
    },
  ],
  keyPoints: [
    "Plus de confiance implicite liée au réseau.",
    "Chaque accès vérifié : identité, appareil, contexte.",
    "MFA forte, appareils conformes, accès conditionnel, micro-segmentation.",
    "Une démarche progressive, pas un produit.",
  ],
  quiz: [
    {
      question: "Quel est le principe central du Zero Trust ?",
      options: ["Faire confiance au réseau interne", "Ne jamais faire confiance par défaut, vérifier chaque accès", "Supprimer les mots de passe"],
      correct: 1,
      explanation: "L'emplacement réseau ne donne plus de confiance.",
    },
    {
      question: "Quelle publication du NIST décrit l'architecture Zero Trust ?",
      options: ["SP 800-207", "ISO 22301", "RFC 1918"],
      correct: 0,
      explanation: "NIST Special Publication 800-207.",
    },
    {
      question: "Peut-on devenir « Zero Trust » en achetant un seul produit ?",
      options: ["Oui", "Non, c'est une démarche progressive", "Seulement dans le cloud"],
      correct: 1,
      explanation: "Il faut faire évoluer identités, appareils, réseau et applications.",
    },
  ],
  sources: [
    { label: "NIST SP 800-207 – Zero Trust Architecture", url: "https://csrc.nist.gov/pubs/sp/800/207/final" },
  ],
};
