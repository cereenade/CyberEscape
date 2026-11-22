import type { Lesson } from "@/lib/types";

export const COMPARAISON_LAXISTE: Lesson = {
  slug: "comparaison-laxiste",
  title: "La comparaison laxiste (type juggling)",
  icon: "⚖️",
  theme: "web",
  level: "intermediaire",
  summary: "Quand un langage convertit les types avant de comparer, deux valeurs différentes peuvent devenir « égales » : comprendre et corriger.",
  duration: "7 min",
  objectives: [
    "Comprendre la différence entre == et ===",
    "Reconnaître le piège des hachages « 0e… »",
    "Écrire une vérification de mot de passe fiable",
  ],
  sections: [
    {
      title: "Comparer avec ou sans le type",
      paragraphs: [
        "En PHP (et en JavaScript), == compare deux valeurs après les avoir converties dans un type commun. === exige en plus que le type soit identique.",
        "Ces conversions automatiques donnent parfois des résultats surprenants, surtout entre chaînes et nombres.",
      ],
    },
    {
      title: "Le piège des chaînes « 0e »",
      paragraphs: [
        "Dans les versions anciennes de PHP, une chaîne comme « 0e1234 » était lue comme un nombre en notation scientifique : 0 × 10^1234, donc 0.",
        "Deux hachages MD5 différents qui commencent par 0e suivi uniquement de chiffres étaient alors jugés égaux avec ==.",
      ],
      example: "\"0e462097431906509019562988736854\" == \"0e830400451993494058024219903391\"  → vrai (PHP < 8)\nmême comparaison avec ===                                                    → faux",
    },
    {
      title: "Corriger le code",
      paragraphs: [
        "Toujours utiliser la comparaison stricte (===) pour des secrets, et hash_equals() pour comparer deux jetons en temps constant.",
        "Pour les mots de passe, ne pas utiliser MD5 : password_hash() pour stocker, password_verify() pour vérifier.",
      ],
    },
    {
      title: "Le chercher en audit",
      paragraphs: [
        "En revue de code autorisée, repère les == sur des mots de passe, jetons ou hachages, ainsi que les fonctions de tri ou de recherche en mode non strict (in_array sans le troisième paramètre).",
        "Des outils d'analyse statique signalent ces comparaisons automatiquement.",
      ],
    },
  ],
  keyPoints: [
    "== convertit les types, === non.",
    "Des hachages « 0e… » pouvaient être égaux avec ==.",
    "Secrets : ===, hash_equals(), password_verify().",
    "MD5 ne convient pas aux mots de passe.",
  ],
  quiz: [
    {
      question: "Quelle comparaison vérifie aussi le type en PHP ?",
      options: ["==", "===", "="],
      correct: 1,
      explanation: "=== compare la valeur et le type.",
    },
    {
      question: "Pourquoi « 0e123 » == « 0e456 » était-il vrai ?",
      options: ["Les deux sont lus comme 0 en notation scientifique", "Ils ont la même longueur", "PHP ignore les chiffres"],
      correct: 0,
      explanation: "0 × 10^123 et 0 × 10^456 valent tous deux 0.",
    },
    {
      question: "Quelle fonction utiliser pour vérifier un mot de passe ?",
      options: ["md5() puis ==", "password_verify()", "strcmp() sur le texte clair"],
      correct: 1,
      explanation: "Elle compare correctement avec un hachage lent et salé.",
    },
  ],
  sources: [
    { label: "PHP – Opérateurs de comparaison", url: "https://www.php.net/manual/fr/language.operators.comparison.php" },
    { label: "PHP – password_verify", url: "https://www.php.net/manual/fr/function.password-verify.php" },
  ],
};
