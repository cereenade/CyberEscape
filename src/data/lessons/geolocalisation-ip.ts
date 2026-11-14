import type { Lesson } from "@/lib/types";

export const GEOLOCALISATION_IP: Lesson = {
  slug: "geolocalisation-ip",
  title: "Les limites de la géolocalisation IP",
  icon: "🗺️",
  theme: "reseau",
  level: "intermediaire",
  summary: "Une adresse IP donne une zone approximative : apprends à interpréter une alerte « connexion depuis une autre ville ».",
  duration: "7 min",
  objectives: [
    "Comprendre comment on géolocalise une adresse IP",
    "Connaître les causes d'erreur",
    "Croiser les indices avant de conclure",
  ],
  sections: [
    {
      title: "D'où vient la position",
      paragraphs: [
        "Les adresses IP sont attribuées par blocs aux fournisseurs d'accès et aux entreprises.",
        "Des bases de données associent ces blocs à un pays, parfois une ville, à partir des registres, des déclarations des opérateurs et de mesures.",
        "Le pays est souvent juste. La ville l'est beaucoup moins, et la rue presque jamais.",
      ],
    },
    {
      title: "Les causes d'erreur",
      paragraphs: [
        "VPN et proxys : la connexion semble venir du serveur de sortie, pas de l'utilisateur.",
        "Réseaux mobiles : les opérateurs font souvent sortir le trafic par quelques grandes villes.",
        "CGNAT : des centaines d'abonnés partagent la même adresse publique.",
        "Bases périmées : un bloc d'adresses peut changer de propriétaire ou de région.",
      ],
      example: "Utilisatrice à Lyon + VPN d'entreprise sorti à Paris → alerte « connexion depuis Paris ».",
    },
    {
      title: "Le « voyage impossible »",
      paragraphs: [
        "Les outils de détection signalent deux connexions trop éloignées pour un temps de trajet trop court.",
        "C'est un bon signal, mais il produit des faux positifs. Garde une liste des sorties VPN et des opérateurs connus de l'entreprise.",
      ],
    },
    {
      title: "Croiser les indices",
      paragraphs: [
        "Avant de conclure, regarde l'appareil, le navigateur, l'heure, l'historique de l'utilisateur et la réussite de la MFA.",
        "En cas de doute, contacte l'utilisateur par un autre canal et révoque les sessions si nécessaire.",
      ],
    },
  ],
  keyPoints: [
    "La géolocalisation IP est approximative.",
    "VPN, réseaux mobiles et CGNAT faussent la ville.",
    "Le voyage impossible est un indice, pas une preuve.",
    "Croise toujours avec d'autres éléments.",
  ],
  quiz: [
    {
      question: "Quelle précision peut-on attendre d'une géolocalisation IP ?",
      options: ["La rue exacte", "Une zone approximative, souvent le pays ou la région", "Le numéro d'appartement"],
      correct: 1,
      explanation: "C'est une estimation à partir des blocs d'adresses.",
    },
    {
      question: "Pourquoi un VPN fausse-t-il la position ?",
      options: ["Il efface l'adresse IP", "La connexion semble venir du serveur VPN", "Il envoie une fausse position GPS"],
      correct: 1,
      explanation: "Le site voit l'adresse du serveur de sortie.",
    },
    {
      question: "Que faire face à une alerte de voyage impossible ?",
      options: ["Bloquer le compte définitivement", "Croiser avec l'appareil, l'heure, la MFA et l'historique", "L'ignorer, c'est toujours faux"],
      correct: 1,
      explanation: "Un seul indice ne suffit pas pour conclure.",
    },
  ],
};
