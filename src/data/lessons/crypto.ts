import type { Lesson } from "@/lib/types";

export const CRYPTO: Lesson = {
  slug: "crypto",
  title: "Encoder, chiffrer, hacher",
  icon: "🔐",
  summary: "Trois opérations qu'on confond souvent, et qui n'ont rien à voir.",
  duration: "7 min",
  sections: [
    {
      title: "Encoder : changer de format",
      paragraphs: [
        "Un encodage (Base64, hexadécimal, binaire, URL) change la façon d'écrire une donnée, sans aucune clé. N'importe qui peut le défaire.",
        "Il sert à transporter des données, pas à les protéger. Un mot de passe en Base64 est un mot de passe en clair.",
      ],
      example: "« admin » en Base64 → YWRtaW4=\n« admin » en hexadécimal → 61 64 6d 69 6e",
    },
    {
      title: "Chiffrer : protéger avec une clé",
      paragraphs: [
        "Le chiffrement rend un message illisible sans la clé. Les anciens chiffres (César, Vigenère) se cassent facilement ; les modernes (AES, ChaCha20) sont considérés comme sûrs.",
        "Symétrique : la même clé chiffre et déchiffre. Asymétrique : une clé publique pour chiffrer, une clé privée pour déchiffrer (c'est ce qui permet HTTPS).",
      ],
    },
    {
      title: "Hacher : une empreinte à sens unique",
      paragraphs: [
        "Un hash (MD5, SHA-256, bcrypt) transforme n'importe quel texte en empreinte de taille fixe. On ne peut pas revenir en arrière.",
        "On s'en sert pour stocker les mots de passe et vérifier qu'un fichier n'a pas été modifié : le moindre changement donne un hash totalement différent.",
      ],
    },
    {
      title: "Reconnaître ce qu'on a sous les yeux",
      paragraphs: [
        "Des = à la fin et un mélange de lettres et de chiffres : sûrement du Base64. Uniquement 0–9 et a–f : de l'hexadécimal.",
        "32 caractères hexa : un hash MD5 ; 64 : SHA-256 ; un préfixe $2b$ : bcrypt.",
      ],
    },
  ],
  quiz: [
    {
      question: "« YWRtaW4= » est…",
      options: ["Chiffré, il faut la clé", "Encodé en Base64, tout le monde peut le lire", "Un hash impossible à inverser"],
      correct: 1,
      explanation: "C'est « admin » en Base64 : aucune clé n'est nécessaire.",
    },
    {
      question: "Quelle opération ne peut pas être inversée ?",
      options: ["L'encodage", "Le chiffrement", "Le hachage"],
      correct: 2,
      explanation: "Un hash est à sens unique. Un chiffrement s'inverse avec la clé.",
    },
    {
      question: "Dans le chiffrement asymétrique, avec quoi chiffre-t-on un message pour quelqu'un ?",
      options: ["Sa clé publique", "Sa clé privée", "Son mot de passe"],
      correct: 0,
      explanation: "Tout le monde peut chiffrer avec la clé publique ; seule la clé privée déchiffre.",
    },
  ],
};
