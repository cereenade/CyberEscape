import type { Lesson } from "@/lib/types";

export const ADRESSE_BOUCLAGE: Lesson = {
  slug: "adresse-bouclage",
  title: "L'adresse de bouclage et les interfaces d'écoute",
  icon: "🔁",
  theme: "reseau",
  level: "intermediaire",
  summary: "127.0.0.1, ::1, 0.0.0.0 : comprendre où un service écoute et qui peut le joindre.",
  duration: "6 min",
  objectives: [
    "Distinguer bouclage, toutes les interfaces et IP publique",
    "Vérifier sur quelle adresse un service écoute",
    "Réduire l'exposition des services internes",
  ],
  sections: [
    {
      title: "Le bouclage",
      paragraphs: [
        "127.0.0.1 en IPv4 et ::1 en IPv6 désignent la machine elle-même. Le bloc 127.0.0.0/8 entier est réservé à cet usage.",
        "Le nom « localhost » renvoie vers ces adresses. Le trafic ne sort jamais de la machine.",
      ],
    },
    {
      title: "Écouter sur une interface",
      paragraphs: [
        "Un service choisit l'adresse sur laquelle il accepte les connexions.",
        "Sur 127.0.0.1 : seuls les programmes de la machine peuvent s'y connecter. Sur 0.0.0.0 (ou ::) : toutes les interfaces, donc le réseau aussi.",
      ],
    },
    {
      title: "Vérifier",
      paragraphs: [
        "Des commandes comme ss -lntp (Linux) ou netstat -ano (Windows) listent les ports en écoute et leur adresse.",
        "Une base de données affichée en 0.0.0.0:5432 alors qu'elle ne sert que localement est une exposition inutile.",
      ],
    },
    {
      title: "Bonnes pratiques",
      paragraphs: [
        "Fais écouter les services internes sur 127.0.0.1, et ajoute un pare-feu en plus.",
        "Le bouclage n'est pas une protection absolue : un programme malveillant sur la machine, ou une faille SSRF, peut toujours y accéder. Garde l'authentification activée.",
      ],
    },
  ],
  keyPoints: [
    "127.0.0.1 / ::1 = la machine elle-même.",
    "0.0.0.0 = toutes les interfaces, donc exposé au réseau.",
    "Services internes sur le bouclage + pare-feu + authentification.",
  ],
  quiz: [
    {
      question: "Que signifie 0.0.0.0 pour un service en écoute ?",
      options: ["Aucune interface", "Toutes les interfaces", "Uniquement Internet"],
      correct: 1,
      explanation: "Le service accepte les connexions sur chaque interface.",
    },
    {
      question: "Quelle est l'adresse de bouclage en IPv6 ?",
      options: ["::1", "fe80::1", "2001::1"],
      correct: 0,
      explanation: "::1 est l'équivalent de 127.0.0.1.",
    },
    {
      question: "Une base écoute sur 127.0.0.1. Peut-on se passer de mot de passe ?",
      options: ["Oui, c'est inaccessible", "Non, un programme local ou une SSRF peut l'atteindre", "Oui, si le pare-feu est activé"],
      correct: 1,
      explanation: "Le bouclage réduit l'exposition sans la supprimer.",
    },
  ],
  sources: [
    { label: "RFC 6890 — Adresses IP à usage spécial", url: "https://www.rfc-editor.org/rfc/rfc6890" },
    { label: "ANSSI — Recommandations de configuration d'un système GNU/Linux", url: "https://cyber.gouv.fr/publications/recommandations-de-securite-relatives-un-systeme-gnulinux" },
  ],
};
