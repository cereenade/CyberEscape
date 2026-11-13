import type { Lesson } from "@/lib/types";

export const CRYPTANALYSE: Lesson = {
  slug: "cryptanalyse",
  title: "Casser les chiffres classiques",
  icon: "🔍",
  theme: "crypto",
  level: "intermediaire",
  summary: "Force brute, analyse de fréquence, réutilisation de clé : les techniques qui ont cassé César, Vigenère et le XOR.",
  duration: "7 min",
  objectives: [
    "Casser un chiffre de César par force brute",
    "Comprendre l'analyse de fréquence",
    "Expliquer pourquoi réutiliser une clé est dangereux",
  ],
  sections: [
    {
      title: "La force brute",
      paragraphs: [
        "Quand le nombre de clés possibles est petit, on les essaie toutes. César n'a que 25 décalages : quelques secondes suffisent.",
        "C'est pour ça que les chiffrements modernes utilisent des clés de 128 bits ou plus : il faudrait des milliards d'années pour toutes les tester.",
      ],
    },
    {
      title: "L'analyse de fréquence",
      paragraphs: [
        "Dans un texte français, le E est la lettre la plus fréquente, suivie de A, S, I, N, T. Une substitution simple (César, Atbash, alphabet mélangé) garde ces fréquences : la lettre la plus courante du message chiffré est probablement un E.",
        "Pour Vigenère, on devine d'abord la longueur de la clé (les répétitions dans le texte chiffré aident), puis on fait une analyse de fréquence sur chaque colonne.",
      ],
      example: "Texte chiffré : « QRXV DOORQV » → la lettre O revient souvent : peut-être un L ou un E ?",
    },
    {
      title: "La réutilisation de clé",
      paragraphs: [
        "Le masque jetable (one-time pad) est théoriquement incassable : une clé aléatoire aussi longue que le message, utilisée une seule fois.",
        "Mais si la même clé XOR sert pour deux messages, on peut les combiner et retrouver des morceaux de texte clair. Une clé courte répétée (XOR « cyber ») se casse aussi par analyse statistique.",
      ],
    },
    {
      title: "La leçon moderne",
      paragraphs: [
        "La sécurité d'un chiffrement ne doit reposer que sur le secret de la clé, pas sur le secret de la méthode (principe de Kerckhoffs).",
        "On n'invente jamais son propre algorithme : on utilise des standards éprouvés (AES, ChaCha20) via des bibliothèques reconnues.",
      ],
    },
  ],
  keyPoints: [
    "Peu de clés possibles = force brute triviale.",
    "Les substitutions simples gardent les fréquences des lettres : le E se repère vite.",
    "Une clé ne se réutilise jamais, surtout en XOR.",
    "La sécurité repose sur la clé, pas sur le secret de l'algorithme (Kerckhoffs).",
  ],
  quiz: [
    {
      question: "Combien d'essais au maximum pour casser un chiffre de César ?",
      options: ["25", "1 000", "Des milliards"],
      correct: 0,
      explanation: "Il n'existe que 25 décalages utiles.",
    },
    {
      question: "En français, la lettre la plus fréquente est…",
      options: ["Le A", "Le E", "Le Z"],
      correct: 1,
      explanation: "Le E domine largement les textes français.",
    },
    {
      question: "Que dit le principe de Kerckhoffs ?",
      options: [
        "L'algorithme doit rester secret",
        "La sécurité ne doit reposer que sur le secret de la clé",
        "Il faut changer d'algorithme chaque mois",
      ],
      correct: 1,
      explanation: "Un bon chiffrement reste sûr même si tout le monde connaît son fonctionnement.",
    },
  ],
};
