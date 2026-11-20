import type { Lesson } from "@/lib/types";

export const CRYPTO_AGILITE: Lesson = {
  slug: "crypto-agilite",
  title: "La crypto-agilité",
  icon: "🔄",
  theme: "crypto",
  level: "avance",
  summary: "Inventaire, centralisation, étiquetage : pouvoir changer d'algorithme sans réécrire le système.",
  duration: "9 min",
  objectives: [
    "Comprendre pourquoi les algorithmes doivent pouvoir changer",
    "Construire un inventaire cryptographique",
    "Concevoir une architecture crypto-agile",
  ],
  sections: [
    {
      title: "Pourquoi changer d'algorithme ?",
      paragraphs: [
        "Les algorithmes vieillissent : MD5 et SHA-1 sont cassés pour les signatures, les clés RSA courtes ne suffisent plus, et l'ordinateur quantique menace RSA et les courbes elliptiques.",
        "Des données chiffrées aujourd'hui peuvent être stockées puis déchiffrées plus tard (« récolter maintenant, déchiffrer plus tard ») : il faut migrer avant.",
      ],
    },
    {
      title: "L'inventaire d'abord",
      paragraphs: [
        "Recenser tous les usages : TLS, VPN, signatures de code, chiffrement des bases, jetons, certificats, matériel (HSM, cartes).",
        "Pour chacun : algorithme, taille de clé, durée de vie des données protégées, bibliothèque utilisée, responsable.",
      ],
    },
    {
      title: "Une architecture agile",
      paragraphs: [
        "Le code appelle une bibliothèque ou un service central ; l'algorithme est un paramètre de configuration, pas une ligne écrite en dur dans des centaines de fichiers.",
        "Chaque donnée chiffrée ou signée porte l'identifiant de son algorithme, pour faire cohabiter ancien et nouveau pendant la transition.",
        "Les protocoles négocient l'algorithme, et le mode hybride (classique + post-quantique) sécurise la période de migration.",
      ],
    },
  ],
  keyPoints: [
    "Tout algorithme finira par devoir être remplacé.",
    "L'inventaire cryptographique est la première étape.",
    "Crypto centralisée et configurable, jamais en dur.",
    "Étiqueter les données et prévoir le mode hybride.",
  ],
  quiz: [
    {
      question: "Quelle est la première étape vers la crypto-agilité ?",
      options: ["Inventorier les usages cryptographiques", "Inventer un algorithme maison", "Supprimer les certificats"],
      correct: 0,
      explanation: "On ne migre bien que ce que l'on connaît.",
    },
    {
      question: "Pourquoi étiqueter chaque donnée avec son algorithme ?",
      options: ["Pour faire joli", "Pour faire cohabiter ancien et nouvel algorithme pendant la transition", "Pour la compresser"],
      correct: 1,
      explanation: "Le système sait comment relire chaque donnée.",
    },
    {
      question: "Que signifie « récolter maintenant, déchiffrer plus tard » ?",
      options: ["Stocker des données chiffrées pour les casser quand ce sera possible", "Sauvegarder ses clés", "Une méthode de compression"],
      correct: 0,
      explanation: "D'où l'urgence de migrer les données à longue durée de vie.",
    },
  ],
  sources: [
    { label: "NIST – Post-Quantum Cryptography", url: "https://csrc.nist.gov/projects/post-quantum-cryptography" },
  ],
};
