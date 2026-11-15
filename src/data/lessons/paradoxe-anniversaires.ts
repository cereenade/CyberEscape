import type { Lesson } from "@/lib/types";

export const PARADOXE_ANNIVERSAIRES: Lesson = {
  slug: "paradoxe-anniversaires",
  title: "Le paradoxe des anniversaires et les collisions",
  icon: "🎂",
  theme: "crypto",
  level: "avance",
  summary: "Pourquoi une empreinte de n bits ne résiste aux collisions que jusqu'à environ 2^(n/2) essais.",
  duration: "8 min",
  objectives: [
    "Comprendre le paradoxe des anniversaires",
    "Calculer la résistance réelle d'une empreinte",
    "Choisir une taille d'empreinte adaptée",
  ],
  sections: [
    {
      title: "23 personnes suffisent",
      paragraphs: [
        "Dans un groupe de 23 personnes, il y a déjà plus d'une chance sur deux que deux d'entre elles partagent le même anniversaire. Avec 70 personnes, c'est presque certain.",
        "L'intuition se trompe car on ne cherche pas quelqu'un né un jour précis, mais n'importe quelle paire : avec 23 personnes, il y a déjà 253 paires possibles.",
      ],
    },
    {
      title: "La règle des 2^(n/2)",
      paragraphs: [
        "Pour une fonction qui donne des empreintes de n bits, trouver une empreinte précise (seconde préimage) demande environ 2^n essais.",
        "Mais trouver deux entrées quelconques qui donnent la même empreinte (collision) n'en demande qu'environ 2^(n/2).",
      ],
      example: "64 bits → environ 2^32 essais (quelques milliards) : faisable sur un ordinateur ordinaire.",
    },
    {
      title: "Conséquences pratiques",
      paragraphs: [
        "MD5 (128 bits) et SHA-1 (160 bits) sont cassés : des collisions réelles ont été produites, bien plus vite encore que la borne théorique.",
        "Pour signer, identifier des fichiers ou dédupliquer de façon sûre, utilise au moins SHA-256 (128 bits de résistance aux collisions).",
        "Le même raisonnement vaut pour les identifiants aléatoires et les nonces : trop courts, ils finissent par se répéter.",
      ],
    },
  ],
  keyPoints: [
    "Collision sur n bits ≈ 2^(n/2) essais.",
    "Une empreinte de 64 bits n'offre qu'environ 2^32 de résistance.",
    "SHA-256 au minimum quand les collisions comptent.",
  ],
  quiz: [
    {
      question: "Combien d'essais faut-il environ pour une collision sur 128 bits ?",
      options: ["2^128", "2^64", "2^32"],
      correct: 1,
      explanation: "La moitié des bits : 2^64.",
    },
    {
      question: "Pourquoi le paradoxe surprend-il ?",
      options: ["Parce qu'on compte les paires, pas les personnes", "Parce que les anniversaires sont rares", "Parce qu'il est faux"],
      correct: 0,
      explanation: "Le nombre de paires grandit beaucoup plus vite que le groupe.",
    },
    {
      question: "Quelle fonction choisir pour résister aux collisions ?",
      options: ["MD5", "SHA-1", "SHA-256"],
      correct: 2,
      explanation: "MD5 et SHA-1 ont des collisions connues.",
    },
  ],
};
