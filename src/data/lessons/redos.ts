import type { Lesson } from "@/lib/types";

export const REDOS: Lesson = {
  slug: "redos",
  title: "Le ReDoS : déni de service par expression régulière",
  icon: "🌀",
  theme: "web",
  level: "intermediaire",
  summary: "Comment une regex mal écrite peut bloquer un serveur, et comment écrire des validations sûres.",
  duration: "7 min",
  objectives: [
    "Comprendre le retour arrière catastrophique",
    "Repérer les motifs dangereux",
    "Mettre en place des protections",
  ],
  sections: [
    {
      title: "Le retour arrière",
      paragraphs: [
        "La plupart des moteurs de regex essaient une piste, puis reviennent en arrière quand elle échoue.",
        "Avec des quantificateurs imbriqués comme (a+)+ ou des alternatives qui se chevauchent, le nombre de pistes explose sur une saisie qui échoue presque.",
      ],
    },
    {
      title: "L'effet sur un service",
      paragraphs: [
        "Une seule requête peut occuper un cœur de processeur pendant des secondes ou des minutes.",
        "Sur un serveur à un seul fil d'exécution (comme Node.js), tout le site peut se figer, comme dans la salle.",
      ],
    },
    {
      title: "Repérer les motifs à risque",
      paragraphs: [
        "Quantificateurs imbriqués : (x+)+, (x*)*, (x+)*.",
        "Alternatives qui se recouvrent sous un quantificateur, comme (a|aa)+.",
        "Des outils d'analyse statique et des linters signalent ces motifs.",
      ],
    },
    {
      title: "Se protéger",
      paragraphs: [
        "Limite la taille des saisies avant toute regex.",
        "Simplifie les expressions, ou utilise un moteur à temps linéaire comme RE2.",
        "Fixe un délai maximal d'évaluation quand le langage le permet, et surveille les requêtes anormalement longues.",
      ],
    },
  ],
  keyPoints: [
    "Quantificateurs imbriqués = danger.",
    "Une requête peut figer un serveur.",
    "Taille limitée, regex simple, moteur linéaire ou délai maximal.",
  ],
  quiz: [
    {
      question: "Quel motif est typique du ReDoS ?",
      options: ["^[a-z]+$", "(a+)+$", "^\\d{4}$"],
      correct: 1,
      explanation: "Les quantificateurs imbriqués multiplient les retours arrière.",
    },
    {
      question: "Pourquoi limiter la longueur des champs aide-t-il ?",
      options: ["Ça accélère le réseau", "Moins de caractères = beaucoup moins de combinaisons", "Ça chiffre la saisie"],
      correct: 1,
      explanation: "Le temps explose avec la longueur de la saisie.",
    },
    {
      question: "Qu'apporte un moteur comme RE2 ?",
      options: ["Il est plus joli", "Il garantit un temps linéaire", "Il accepte plus de syntaxe"],
      correct: 1,
      explanation: "Il ne fait pas de retour arrière.",
    },
  ],
  sources: [
    { label: "OWASP — Regular expression Denial of Service", url: "https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS" },
    { label: "RE2 — Syntaxe", url: "https://github.com/google/re2/wiki/Syntax" },
  ],
};
