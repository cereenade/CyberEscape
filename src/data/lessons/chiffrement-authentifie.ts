import type { Lesson } from "@/lib/types";

export const CHIFFREMENT_AUTHENTIFIE: Lesson = {
  slug: "chiffrement-authentifie",
  title: "Le chiffrement authentifié (AEAD)",
  icon: "🔏",
  theme: "crypto",
  level: "avance",
  summary: "Pourquoi chiffrer ne suffit pas, et comment AES-GCM ou ChaCha20-Poly1305 protègent à la fois la confidentialité et l'intégrité.",
  duration: "9 min",
  objectives: [
    "Comprendre la malléabilité des modes de chiffrement par flot",
    "Savoir ce qu'apporte un mode AEAD",
    "Éviter les erreurs d'usage, à commencer par le nonce réutilisé",
  ],
  sections: [
    {
      title: "Chiffrer n'empêche pas de modifier",
      paragraphs: [
        "En AES-CTR (et dans tout chiffrement par flot), le chiffré est le clair combiné par XOR à un flux de clé. Changer un bit du chiffré change exactement le même bit du clair.",
        "Un attaquant qui connaît la forme du message peut donc le modifier sans connaître la clé : c'est la malléabilité.",
      ],
      example: "Clair connu : « VIREMENT 100 »\nL'attaquant applique au chiffré un XOR entre « 1 » et « 9 » à la bonne position\n→ déchiffré : « VIREMENT 900 »",
    },
    {
      title: "Ce qu'apporte l'AEAD",
      paragraphs: [
        "Un mode AEAD (Authenticated Encryption with Associated Data) chiffre et calcule une étiquette d'authentification. À la réception, la moindre modification rend l'étiquette invalide et le message est rejeté.",
        "Les données associées (en-têtes, identifiant de session) restent lisibles mais sont protégées par la même étiquette.",
      ],
    },
    {
      title: "Les modes à utiliser",
      paragraphs: [
        "AES-GCM (rapide avec l'accélération matérielle) et ChaCha20-Poly1305 (rapide en logiciel) sont les standards, utilisés par TLS 1.3.",
        "Si l'unicité du nonce est difficile à garantir, des variantes résistantes comme AES-GCM-SIV limitent les dégâts.",
      ],
    },
    {
      title: "Les erreurs à éviter",
      paragraphs: [
        "Ne jamais réutiliser un nonce avec la même clé : en GCM, cela révèle le XOR des clairs et permet de forger des étiquettes.",
        "Ne jamais utiliser le clair avant d'avoir vérifié l'étiquette, et préférer une bibliothèque reconnue (libsodium, API de la plateforme) à un assemblage maison.",
      ],
    },
  ],
  keyPoints: [
    "CTR et les chiffrements par flot sont malléables.",
    "L'AEAD ajoute une étiquette qui détecte toute modification.",
    "AES-GCM et ChaCha20-Poly1305, comme dans TLS 1.3.",
    "Un nonce unique par message et par clé, toujours.",
  ],
  quiz: [
    {
      question: "En AES-CTR, que provoque l'inversion d'un bit du chiffré ?",
      options: ["Un message illisible", "L'inversion du même bit dans le clair", "Une erreur de déchiffrement"],
      correct: 1,
      explanation: "C'est la malléabilité du chiffrement par flot.",
    },
    {
      question: "Quel mode protège aussi l'intégrité ?",
      options: ["AES-ECB", "AES-CTR", "AES-GCM"],
      correct: 2,
      explanation: "GCM ajoute une étiquette d'authentification.",
    },
    {
      question: "Quelle erreur casse la sécurité de GCM ?",
      options: ["Réutiliser un nonce avec la même clé", "Utiliser une clé de 256 bits", "Chiffrer des messages courts"],
      correct: 0,
      explanation: "Le nonce réutilisé permet de forger des étiquettes.",
    },
  ],
  sources: [
    { label: "RFC 5116 – Interface AEAD", url: "https://www.rfc-editor.org/rfc/rfc5116" },
    { label: "ANSSI – Guide des mécanismes cryptographiques", url: "https://cyber.gouv.fr/publications/mecanismes-cryptographiques" },
  ],
};
