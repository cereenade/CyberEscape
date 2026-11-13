import type { Lesson } from "@/lib/types";

export const CRYPTO_FUTUR: Lesson = {
  slug: "crypto-futur",
  title: "Cryptographie de demain",
  icon: "⚛️",
  theme: "crypto",
  level: "avance",
  summary: "Ordinateurs quantiques, preuves à divulgation nulle, partage de secret : la crypto qui arrive.",
  duration: "9 min",
  objectives: [
    "Comprendre la menace quantique et la migration post-quantique",
    "Découvrir les preuves à divulgation nulle",
    "Connaître le partage de secret et les HSM",
  ],
  sections: [
    {
      title: "La menace quantique",
      paragraphs: [
        "Un grand ordinateur quantique casserait RSA et les courbes elliptiques grâce à l'algorithme de Shor. Le chiffrement symétrique (AES-256) résiste beaucoup mieux.",
        "Des données volées aujourd'hui pourraient être déchiffrées plus tard : c'est l'attaque « stocker maintenant, déchiffrer plus tard ».",
      ],
    },
    {
      title: "La migration post-quantique",
      paragraphs: [
        "Le NIST a normalisé de nouveaux algorithmes : ML-KEM pour l'échange de clés, ML-DSA et SLH-DSA pour les signatures.",
        "La migration commence par l'inventaire de la cryptographie utilisée, puis souvent par des modes hybrides (classique + post-quantique).",
      ],
    },
    {
      title: "Prouver sans révéler",
      paragraphs: [
        "Une preuve à divulgation nulle convainc qu'une affirmation est vraie (« j'ai plus de 18 ans ») sans rien révéler d'autre.",
        "Elle sert à l'identité numérique, à la vérification d'âge, à certaines blockchains.",
      ],
    },
    {
      title: "Protéger les clés maîtresses",
      paragraphs: [
        "Le partage de secret de Shamir découpe une clé en n parts dont k suffisent à la reconstituer, sans qu'une part seule ne révèle quoi que ce soit.",
        "Les HSM génèrent et utilisent les clés sans jamais les exposer, même aux administrateurs.",
      ],
    },
  ],
  keyPoints: [
    "Le quantique menace RSA et ECC, beaucoup moins AES-256.",
    "Migration : inventaire, puis algorithmes post-quantiques (ML-KEM, ML-DSA).",
    "Une preuve à divulgation nulle ne révèle que l'affirmation prouvée.",
    "Shamir et les HSM protègent les clés les plus sensibles.",
  ],
  quiz: [
    {
      question: "Quel type d'algorithme est le plus menacé par l'ordinateur quantique ?",
      options: ["Le chiffrement symétrique AES-256", "Le chiffrement asymétrique RSA", "Le hachage SHA-3"],
      correct: 1,
      explanation: "L'algorithme de Shor casse la factorisation et le logarithme discret.",
    },
    {
      question: "Par quoi commence une migration post-quantique ?",
      options: ["Par l'inventaire de la cryptographie utilisée", "Par l'achat d'un ordinateur quantique", "Par la suppression d'AES"],
      correct: 0,
      explanation: "On ne peut migrer que ce qu'on connaît.",
    },
    {
      question: "Une clé est partagée en 5 parts, seuil 3. Avec 2 parts, on apprend…",
      options: ["La moitié de la clé", "Rien du tout", "Toute la clé"],
      correct: 1,
      explanation: "Sous le seuil, le partage de Shamir ne révèle aucune information.",
    },
  ],
};
