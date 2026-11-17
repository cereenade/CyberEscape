import type { Lesson } from "@/lib/types";

export const ATTAQUE_BREACH: Lesson = {
  slug: "attaque-breach",
  title: "L'attaque BREACH et les fuites par compression",
  icon: "🗜️",
  theme: "crypto",
  level: "avance",
  summary: "Comment la compression HTTP combinée au chiffrement peut révéler un secret par la taille des réponses.",
  duration: "10 min",
  objectives: [
    "Comprendre pourquoi la longueur fuit de l'information",
    "Identifier les conditions d'une attaque BREACH",
    "Choisir les bonnes contre-mesures",
  ],
  sections: [
    {
      title: "Compression et longueur",
      paragraphs: [
        "Les algorithmes comme DEFLATE remplacent les répétitions par des références : plus un texte se répète, plus il se compresse.",
        "Le chiffrement TLS cache le contenu mais conserve, à peu près, la longueur. La taille chiffrée suit donc la taille compressée.",
      ],
    },
    {
      title: "Les conditions",
      paragraphs: [
        "La réponse est compressée en HTTP (gzip, br).",
        "Elle contient un secret stable, comme un jeton anti-CSRF.",
        "Elle reflète une saisie contrôlée par l'attaquant, et celui-ci peut observer la taille du trafic et faire de nombreuses requêtes.",
      ],
    },
    {
      title: "Le principe",
      paragraphs: [
        "Si la saisie reflétée commence comme le secret, la compression trouve une répétition et la réponse raccourcit d'un octet ou deux.",
        "En testant caractère par caractère, on reconstruit le secret. CRIME (2012) exploitait la compression TLS, BREACH (2013) vise la compression HTTP.",
      ],
    },
    {
      title: "Contre-mesures",
      paragraphs: [
        "Masquer le secret à chaque réponse (par exemple un XOR avec une valeur aléatoire envoyée à côté) : il ne se répète jamais.",
        "Séparer les secrets des données reflétées, limiter le débit, ajouter des contrôles d'origine aux requêtes sensibles.",
        "En dernier recours : désactiver la compression sur les pages qui contiennent des secrets.",
      ],
    },
  ],
  keyPoints: [
    "TLS cache le contenu, pas la longueur.",
    "Secret + saisie reflétée + compression = oracle.",
    "Masquage du jeton, séparation, limitation du débit.",
  ],
  quiz: [
    {
      question: "Pourquoi la taille révèle-t-elle de l'information ?",
      options: ["La compression raccourcit les répétitions", "TLS est cassé", "Le serveur renvoie le secret en clair"],
      correct: 0,
      explanation: "Une bonne devinette se compresse mieux.",
    },
    {
      question: "Que vise BREACH ?",
      options: ["La compression HTTP des réponses", "La poignée de main TLS", "Les certificats"],
      correct: 0,
      explanation: "CRIME visait la compression au niveau TLS.",
    },
    {
      question: "Quelle mesure casse l'oracle sans désactiver la compression ?",
      options: ["Allonger la clé TLS", "Masquer le jeton avec une valeur aléatoire à chaque réponse", "Passer en HTTP/1.0"],
      correct: 1,
      explanation: "Le secret n'apparaît plus deux fois sous la même forme.",
    },
  ],
  sources: [
    { label: "BREACH — Site des chercheurs", url: "https://www.breachattack.com/" },
    { label: "RFC 7457 — Attaques connues sur TLS", url: "https://www.rfc-editor.org/rfc/rfc7457" },
  ],
};
