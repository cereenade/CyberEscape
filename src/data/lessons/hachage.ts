import type { Lesson } from "@/lib/types";

export const HACHAGE: Lesson = {
  slug: "hachage",
  title: "Le hachage et le stockage des mots de passe",
  icon: "#️⃣",
  theme: "crypto",
  level: "intermediaire",
  summary: "Pourquoi MD5 ne suffit pas, à quoi sert le sel et comment les pirates cassent les hashs.",
  duration: "7 min",
  objectives: [
    "Comprendre les propriétés d'une fonction de hachage",
    "Expliquer les attaques par dictionnaire et par tables arc-en-ciel",
    "Choisir un bon algorithme pour stocker des mots de passe",
  ],
  sections: [
    {
      title: "Les propriétés d'un hash",
      paragraphs: [
        "Un hash a toujours la même taille, quel que soit le texte d'entrée. Le même texte donne toujours le même hash, et le moindre changement donne un hash totalement différent.",
        "Il est impossible de remonter du hash au texte : on ne « déchiffre » pas un hash, on le devine.",
      ],
      example: "MD5(\"bonjour\") = f02368945726d5fc2a14eb576f7276c0\nMD5(\"Bonjour\") = un hash complètement différent",
    },
    {
      title: "Comment on « casse » un hash",
      paragraphs: [
        "Le pirate calcule le hash de millions de mots de passe probables (dictionnaire, variantes) et compare. Une carte graphique calcule des milliards de hashs MD5 par seconde.",
        "Les tables arc-en-ciel stockent à l'avance les hashs de mots courants : il suffit de chercher le hash volé dans la table.",
      ],
    },
    {
      title: "Le sel",
      paragraphs: [
        "On ajoute au mot de passe une valeur aléatoire propre à chaque utilisateur (le sel) avant de hacher. Deux mots de passe identiques donnent alors des hashs différents, et les tables précalculées deviennent inutiles.",
      ],
    },
    {
      title: "Le bon algorithme",
      paragraphs: [
        "MD5, SHA-1 et SHA-256 sont conçus pour être rapides : parfaits pour vérifier un fichier, mauvais pour des mots de passe.",
        "bcrypt, scrypt et Argon2 sont volontairement lents et intègrent le sel. On règle leur coût pour que chaque essai prenne du temps au pirate.",
      ],
    },
  ],
  keyPoints: [
    "Un hash ne se déchiffre pas : on le devine en testant des mots de passe.",
    "Le sel rend les tables arc-en-ciel inutiles et cache les mots de passe identiques.",
    "Pour les mots de passe : bcrypt, scrypt ou Argon2, jamais MD5 ou SHA-1.",
    "Les hashs rapides (SHA-256) servent à vérifier l'intégrité des fichiers.",
  ],
  quiz: [
    {
      question: "Pourquoi MD5 est-il mauvais pour stocker des mots de passe ?",
      options: ["Il est trop lent", "Il est trop rapide à calculer pour un pirate", "Il est réversible"],
      correct: 1,
      explanation: "Sa rapidité permet de tester des milliards de mots de passe par seconde.",
    },
    {
      question: "Le sel sert à…",
      options: ["Rendre le hash plus court", "Rendre unique le hash de chaque utilisateur", "Déchiffrer le hash"],
      correct: 1,
      explanation: "Même mot de passe, sels différents, hashs différents.",
    },
    {
      question: "Quel algorithme choisir pour des mots de passe ?",
      options: ["SHA-1", "Argon2", "Base64"],
      correct: 1,
      explanation: "Argon2 est lent, salé et recommandé.",
    },
  ],
};
