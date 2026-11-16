import type { Lesson } from "@/lib/types";

export const CHIFFREMENT_HOMOMORPHE: Lesson = {
  slug: "chiffrement-homomorphe",
  title: "Le chiffrement homomorphe",
  icon: "🧪",
  theme: "crypto",
  level: "avance",
  summary: "Calculer sur des données chiffrées sans jamais les voir : principes, familles, usages et limites.",
  duration: "9 min",
  objectives: [
    "Comprendre ce qu'est un calcul homomorphe",
    "Distinguer chiffrement partiellement et totalement homomorphe",
    "Évaluer quand l'utiliser et ses limites",
  ],
  sections: [
    {
      title: "Le principe",
      paragraphs: [
        "Avec un chiffrement classique, il faut déchiffrer pour calculer. Le chiffrement homomorphe permet de faire des opérations directement sur les chiffrés : en déchiffrant le résultat, on obtient le même résultat que sur les données en clair.",
        "Le propriétaire des données garde la clé ; le prestataire calcule sans jamais voir le contenu, comme l'hôpital et serveur-corp.fr dans la salle « Calculer sans regarder ».",
      ],
    },
    {
      title: "Les familles",
      paragraphs: [
        "Partiellement homomorphe : une seule opération. Paillier permet d'additionner des chiffrés ; RSA sans remplissage permet de les multiplier (mais il n'est pas sûr pour un usage réel).",
        "Totalement homomorphe (FHE) : additions et multiplications sans limite. Le premier schéma a été proposé par Craig Gentry en 2009 ; les schémas modernes (BFV, CKKS, TFHE) reposent sur des problèmes de réseaux euclidiens, aussi pensés pour résister aux ordinateurs quantiques.",
      ],
    },
    {
      title: "Usages et limites",
      paragraphs: [
        "Usages : statistiques sur des données de santé, vote électronique, recherche dans des bases chiffrées, apprentissage automatique respectueux de la vie privée.",
        "Limites : calculs beaucoup plus lents, chiffrés volumineux, développement complexe. Le résultat lui-même peut révéler des informations sur une personne s'il est trop précis.",
        "Il se combine souvent avec d'autres techniques : calcul multipartite, enclaves sécurisées, confidentialité différentielle.",
      ],
    },
  ],
  keyPoints: [
    "Calculer sur des données chiffrées, sans les déchiffrer.",
    "Partiellement homomorphe : une opération ; totalement : toutes.",
    "Le prestataire n'a jamais la clé de déchiffrement.",
    "Lent et complexe, et le résultat doit rester peu révélateur.",
  ],
  quiz: [
    {
      question: "Que permet le chiffrement homomorphe ?",
      options: ["Compresser des données", "Calculer sur des données chiffrées", "Casser un chiffrement plus vite"],
      correct: 1,
      explanation: "Les opérations se font sur les chiffrés, sans les ouvrir.",
    },
    {
      question: "Quel schéma permet d'additionner des valeurs chiffrées ?",
      options: ["Paillier", "Base64", "SHA-256"],
      correct: 0,
      explanation: "Paillier est additivement homomorphe. Base64 est un encodage et SHA-256 un hachage.",
    },
    {
      question: "Quel est aujourd'hui le principal frein au chiffrement totalement homomorphe ?",
      options: ["Il est interdit en Europe", "Sa lenteur et la taille des chiffrés", "Il ne fonctionne qu'avec des lettres"],
      correct: 1,
      explanation: "Les performances progressent, mais restent très inférieures au calcul en clair.",
    },
  ],
  sources: [
    { label: "CNIL — Le chiffrement homomorphe (LINC)", url: "https://linc.cnil.fr/fr/le-chiffrement-homomorphe" },
    { label: "Homomorphic Encryption Standardization", url: "https://homomorphicencryption.org/" },
  ],
};
