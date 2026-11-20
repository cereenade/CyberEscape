import type { Lesson } from "@/lib/types";

export const REDOS: Lesson = {
  slug: "redos",
  title: "Le ReDoS : quand une regex fige le serveur",
  icon: "🌀",
  theme: "web",
  level: "intermediaire",
  summary: "Expressions régulières catastrophiques, retour arrière et protections pour garder un serveur réactif.",
  duration: "8 min",
  objectives: [
    "Comprendre le retour arrière des moteurs de regex",
    "Reconnaître un motif dangereux",
    "Appliquer les protections",
  ],
  sections: [
    {
      title: "Le retour arrière",
      paragraphs: [
        "La plupart des moteurs d'expressions régulières (JavaScript, Python, Java…) essaient toutes les façons de faire correspondre un motif avant d'abandonner.",
        "Avec des répétitions imbriquées comme (a+)+, le nombre d'essais double à chaque caractère : une chaîne de 40 caractères peut demander des milliards d'étapes.",
      ],
    },
    {
      title: "Les motifs à risque",
      paragraphs: [
        "Répétition dans une répétition : (\\w+)*, ([a-z0-9]+\\.?)+, (a|aa)+.",
        "Alternatives qui se chevauchent et motifs appliqués à des entrées sans limite de taille.",
        "Dans la salle du formulaire, le motif de validation d'e-mail combinait ces deux défauts : une seule requête a figé le processeur une minute.",
      ],
    },
    {
      title: "Se protéger",
      paragraphs: [
        "Limiter la taille des entrées avant toute analyse (une adresse e-mail fait au plus 254 caractères).",
        "Simplifier les motifs, ou utiliser un moteur à temps linéaire comme RE2, qui ne fait pas de retour arrière.",
        "Fixer un délai maximal d'analyse quand le langage le permet, et passer le code dans un outil qui détecte les regex dangereuses.",
      ],
    },
  ],
  keyPoints: [
    "Répétitions imbriquées = danger.",
    "Le temps explose avec la longueur de l'entrée.",
    "Limiter la taille, simplifier, moteur linéaire, délai maximal.",
    "La validation côté navigateur ne protège pas le serveur.",
  ],
  quiz: [
    {
      question: "Quel motif est le plus dangereux ?",
      options: ["^[a-z]+$", "^(a+)+$", "^\\d{4}$"],
      correct: 1,
      explanation: "La répétition imbriquée provoque un retour arrière exponentiel.",
    },
    {
      question: "Pourquoi ajouter un serveur ne règle pas le ReDoS ?",
      options: ["Parce que chaque requête piégée bloquera aussi le nouveau serveur", "Parce que les serveurs coûtent cher", "Parce que le ReDoS vise le DNS"],
      correct: 0,
      explanation: "Il faut supprimer la cause : le motif.",
    },
    {
      question: "Que garantit un moteur comme RE2 ?",
      options: ["Un chiffrement des motifs", "Un temps d'analyse proportionnel à la taille de l'entrée", "L'absence de bugs"],
      correct: 1,
      explanation: "Pas de retour arrière, donc pas d'explosion.",
    },
  ],
  sources: [
    { label: "OWASP – Regular expression Denial of Service", url: "https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS" },
  ],
};
