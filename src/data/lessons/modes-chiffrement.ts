import type { Lesson } from "@/lib/types";

export const MODES_CHIFFREMENT: Lesson = {
  slug: "modes-chiffrement",
  title: "Modes de chiffrement et attaques cryptographiques",
  icon: "⚙️",
  theme: "crypto",
  level: "avance",
  summary: "AES est solide ; ce sont souvent les modes, les nonces et les constructions qui cèdent.",
  duration: "11 min",
  objectives: [
    "Comparer ECB, CBC, CTR et GCM",
    "Comprendre les oracles de padding, le retournement de bits et la réutilisation de nonce",
    "Choisir des constructions sûres (AEAD, HMAC)",
  ],
  sections: [
    {
      title: "Les modes",
      paragraphs: [
        "ECB chiffre chaque bloc séparément : les motifs restent visibles. CBC chaîne les blocs avec un vecteur d'initialisation.",
        "CTR transforme AES en chiffrement par flot ; GCM ajoute une vérification d'intégrité (chiffrement authentifié, AEAD).",
      ],
    },
    {
      title: "Sans intégrité, on modifie",
      paragraphs: [
        "En CBC sans MAC, inverser un bit du chiffré inverse le même bit du bloc suivant : on peut transformer « user » en « admi » puis « admin ».",
        "Si le serveur révèle si le remplissage est valide, l'oracle de padding permet même de tout déchiffrer.",
      ],
    },
    {
      title: "Les nonces",
      paragraphs: [
        "En CTR ou GCM, réutiliser un nonce avec la même clé fait se répéter le flot : C1 ⊕ C2 = M1 ⊕ M2. En GCM, cela compromet aussi l'authentification.",
        "Un nonce doit être unique pour chaque message chiffré avec une clé donnée.",
      ],
    },
    {
      title: "Les bonnes constructions",
      paragraphs: [
        "Pour chiffrer : un mode AEAD (AES-GCM, ChaCha20-Poly1305). Pour authentifier avec un hash : HMAC, jamais hash(secret || message), vulnérable à l'extension de longueur.",
        "Pour l'aléa : un générateur cryptographique (CSPRNG), jamais Math.random().",
      ],
    },
  ],
  keyPoints: [
    "ECB laisse voir les motifs ; préférer un mode AEAD.",
    "Chiffrer sans authentifier permet de modifier les messages.",
    "Un nonce ne se réutilise jamais avec la même clé.",
    "HMAC pour authentifier, CSPRNG pour l'aléa.",
  ],
  quiz: [
    {
      question: "Pourquoi voit-on encore le dessin d'une image chiffrée en ECB ?",
      options: ["AES est cassé", "Des blocs identiques donnent des chiffrés identiques", "L'image n'est pas chiffrée"],
      correct: 1,
      explanation: "Les zones uniformes forment les mêmes blocs chiffrés.",
    },
    {
      question: "SHA-256(secret || message) comme signature est vulnérable à…",
      options: ["L'extension de longueur", "La force brute uniquement", "Rien"],
      correct: 0,
      explanation: "On peut prolonger le message sans connaître le secret ; HMAC corrige ça.",
    },
    {
      question: "Quel mode offre chiffrement et intégrité ?",
      options: ["ECB", "CBC", "GCM"],
      correct: 2,
      explanation: "GCM est un mode authentifié (AEAD).",
    },
  ],
};
