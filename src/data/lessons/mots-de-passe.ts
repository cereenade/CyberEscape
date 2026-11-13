import type { Lesson } from "@/lib/types";

export const MOTS_DE_PASSE: Lesson = {
  slug: "mots-de-passe",
  title: "Mots de passe et authentification",
  icon: "🔑",
  theme: "bases",
  level: "debutant",
  summary: "Comment les mots de passe sont cassés, et comment les rendre vraiment solides.",
  duration: "6 min",
  objectives: [
    "Comprendre comment les pirates devinent les mots de passe",
    "Créer une phrase de passe solide",
    "Utiliser un gestionnaire de mots de passe et la double authentification",
  ],
  sections: [
    {
      title: "Comment un pirate devine un mot de passe",
      paragraphs: [
        "Force brute : essayer toutes les combinaisons. Attaque par dictionnaire : essayer les mots de passe les plus courants et leurs variantes (Soleil2026!, P@ssw0rd).",
        "Credential stuffing : réessayer sur d'autres sites les identifiants volés lors d'une fuite.",
      ],
    },
    {
      title: "La longueur avant tout",
      paragraphs: [
        "Chaque caractère ajouté multiplie le nombre de combinaisons. Une phrase de passe de 4 ou 5 mots au hasard est à la fois longue et facile à retenir.",
        "Évite les informations personnelles (prénom, date de naissance, nom de ton chat) : elles se trouvent souvent sur les réseaux sociaux.",
      ],
      example: "Faible : Marie1998!\nSolide : Nuage-Velo-Citron-Tempete-92",
    },
    {
      title: "Un mot de passe par service",
      paragraphs: [
        "Si tu réutilises un mot de passe, une seule fuite suffit à ouvrir tous tes comptes.",
        "Un gestionnaire de mots de passe génère et retient un mot de passe différent pour chaque site. Tu n'as plus qu'un seul mot de passe maître à retenir.",
      ],
    },
    {
      title: "La double authentification (MFA)",
      paragraphs: [
        "On combine deux types de preuves : ce que tu sais (mot de passe), ce que tu as (téléphone, clé de sécurité), ce que tu es (empreinte).",
        "Même avec ton mot de passe, le pirate est bloqué sans le second facteur. Les applications d'authentification et les clés physiques sont plus sûres que les SMS.",
      ],
    },
    {
      title: "Côté serveur : hacher et saler",
      paragraphs: [
        "Un site sérieux ne stocke jamais ton mot de passe en clair, mais son hash, calculé avec un algorithme lent comme bcrypt ou Argon2.",
        "Un sel aléatoire est ajouté pour que deux mots de passe identiques ne donnent pas le même hash.",
      ],
    },
  ],
  keyPoints: [
    "La longueur compte plus que la complexité : vise une phrase de passe de plusieurs mots.",
    "Un mot de passe différent par service, grâce à un gestionnaire.",
    "La double authentification bloque l'attaquant même si ton mot de passe fuite.",
    "Côté serveur, un mot de passe se stocke haché et salé, avec bcrypt ou Argon2.",
  ],
  quiz: [
    {
      question: "Quel mot de passe est le plus solide ?",
      options: ["Tr0ub4dor&3", "chien-lampe-orage-violon", "Azerty2026!"],
      correct: 1,
      explanation: "La phrase de passe est la plus longue et n'est pas une variante d'un mot connu.",
    },
    {
      question: "Qu'est-ce que le credential stuffing ?",
      options: [
        "Réutiliser des identifiants volés sur d'autres sites",
        "Remplir un formulaire très vite",
        "Chiffrer un mot de passe deux fois",
      ],
      correct: 0,
      explanation: "C'est pour ça qu'il faut un mot de passe différent par site.",
    },
    {
      question: "Mot de passe + code dans une application d'authentification, c'est…",
      options: ["Une seule preuve", "De la double authentification", "Un mot de passe faible"],
      correct: 1,
      explanation: "Ce que tu sais + ce que tu as : deux familles de preuves différentes.",
    },
    {
      question: "Pourquoi ajoute-t-on un sel avant de hacher un mot de passe ?",
      options: [
        "Pour qu'il soit plus court",
        "Pour que deux mots de passe identiques donnent des hashs différents",
        "Pour pouvoir le déchiffrer plus tard",
      ],
      correct: 1,
      explanation: "Le sel rend les tables précalculées inutiles et cache les mots de passe identiques.",
    },
  ],
};
