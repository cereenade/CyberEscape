import type { Lesson } from "@/lib/types";

export const ASYMETRIQUE: Lesson = {
  slug: "asymetrique",
  title: "Clés publiques, signatures et certificats",
  icon: "🔏",
  theme: "crypto",
  level: "intermediaire",
  summary: "Comment deux inconnus peuvent communiquer en secret et prouver qui ils sont.",
  duration: "9 min",
  objectives: [
    "Comprendre le rôle des clés publique et privée",
    "Savoir ce que garantit une signature numérique",
    "Comprendre la chaîne de confiance des certificats",
  ],
  sections: [
    {
      title: "Deux clés liées",
      paragraphs: [
        "Ce qui est chiffré avec la clé publique ne se déchiffre qu'avec la clé privée. La clé publique se partage, la privée ne quitte jamais son propriétaire.",
        "RSA et les courbes elliptiques (ECDSA, Ed25519) sont les algorithmes les plus courants.",
      ],
    },
    {
      title: "La signature",
      paragraphs: [
        "On signe avec sa clé privée ; tout le monde vérifie avec la clé publique.",
        "Une signature valide prouve l'origine (authenticité) et l'absence de modification (intégrité), mais ne cache pas le contenu.",
      ],
    },
    {
      title: "Les certificats",
      paragraphs: [
        "Un certificat lie une clé publique à une identité (un nom de domaine), et il est signé par une autorité de certification.",
        "Le navigateur fait confiance à quelques autorités racines ; un certificat auto-signé ou expiré déclenche un avertissement à ne jamais ignorer machinalement.",
      ],
    },
    {
      title: "Les pièges",
      paragraphs: [
        "RSA « de manuel », sans remplissage (OAEP, PSS), est vulnérable.",
        "En ECDSA, réutiliser le nombre aléatoire de signature révèle la clé privée. On utilise des bibliothèques éprouvées, jamais une implémentation maison.",
      ],
    },
  ],
  keyPoints: [
    "Clé publique pour chiffrer ou vérifier, clé privée pour déchiffrer ou signer.",
    "Une signature prouve origine et intégrité.",
    "Un certificat lie une clé à un nom, garanti par une autorité.",
    "Jamais de cryptographie maison.",
  ],
  quiz: [
    {
      question: "Pour envoyer un message secret à Alice, on chiffre avec…",
      options: ["Sa clé publique", "Sa clé privée", "Notre clé privée"],
      correct: 0,
      explanation: "Seule sa clé privée pourra le déchiffrer.",
    },
    {
      question: "Une signature numérique garantit…",
      options: ["La confidentialité", "L'origine et l'intégrité", "La rapidité"],
      correct: 1,
      explanation: "Elle ne cache pas le contenu.",
    },
    {
      question: "Qui signe le certificat d'un site web ?",
      options: ["Le visiteur", "Une autorité de certification", "Le navigateur"],
      correct: 1,
      explanation: "Le navigateur vérifie cette signature grâce aux autorités racines.",
    },
  ],
};
