import type { Lesson } from "@/lib/types";

export const INFRA_SEGMENTATION: Lesson = {
  slug: "infra-segmentation",
  title: "Segmenter et filtrer le réseau",
  icon: "🧱",
  theme: "infra",
  level: "intermediaire",
  summary: "Découper le réseau en zones pour qu'une machine compromise ne donne pas accès à tout.",
  duration: "8 min",
  objectives: [
    "Comprendre les zones réseau (DMZ, utilisateurs, serveurs, administration)",
    "Appliquer le filtrage entrant et sortant",
    "Sécuriser l'administration avec un bastion",
  ],
  sections: [
    {
      title: "Le réseau à plat, cadeau pour l'attaquant",
      paragraphs: [
        "Dans un réseau sans séparation, un poste infecté peut joindre tous les serveurs : c'est ainsi que les rançongiciels se propagent en quelques heures.",
        "La segmentation limite cette propagation, comme les cloisons étanches d'un navire.",
      ],
    },
    {
      title: "Les zones",
      paragraphs: [
        "DMZ pour les services exposés à Internet, zone utilisateurs, zone serveurs, zone d'administration, zone des sauvegardes, zone industrielle le cas échéant.",
        "Entre les zones, un pare-feu n'autorise que les flux nécessaires, avec une règle finale « tout le reste est interdit ».",
      ],
    },
    {
      title: "Filtrer aussi la sortie",
      paragraphs: [
        "Les serveurs n'ont généralement pas besoin d'accéder librement à Internet. Bloquer la sortie empêche un malware de contacter son serveur de commande ou d'exfiltrer des données.",
        "Le passage par un proxy journalisé permet de contrôler et de tracer ce qui sort.",
      ],
    },
    {
      title: "Administrer depuis un endroit sûr",
      paragraphs: [
        "Les tâches d'administration se font depuis des postes dédiés ou un bastion, jamais depuis le poste où l'on lit ses mails.",
        "Le bastion centralise, authentifie (MFA) et enregistre les sessions d'administration.",
      ],
    },
  ],
  keyPoints: [
    "Un réseau à plat favorise la propagation des attaques.",
    "Zones séparées, flux autorisés au cas par cas, le reste interdit.",
    "Le filtrage sortant bloque C2 et exfiltration.",
    "Administration depuis un poste dédié ou un bastion.",
  ],
  quiz: [
    {
      question: "Où placer un serveur web accessible depuis Internet ?",
      options: ["Dans la zone utilisateurs", "Dans une DMZ", "Avec les sauvegardes"],
      correct: 1,
      explanation: "Une compromission reste isolée du réseau interne.",
    },
    {
      question: "Pourquoi filtrer les connexions sortantes des serveurs ?",
      options: ["Pour empêcher un malware de joindre son serveur de commande", "Pour accélérer les mises à jour", "Ce n'est jamais utile"],
      correct: 0,
      explanation: "Le filtrage sortant bloque aussi l'exfiltration.",
    },
    {
      question: "Que fait un bastion d'administration ?",
      options: ["Il centralise, authentifie et enregistre les sessions admin", "Il remplace l'antivirus", "Il stocke les sauvegardes"],
      correct: 0,
      explanation: "C'est un point de passage unique et contrôlé.",
    },
  ],
  sources: [
    { label: "ANSSI – Guides MesServicesCyber (dont le guide d'hygiène informatique)", url: "https://messervices.cyber.gouv.fr" },
    { label: "CIS Controls – Network Infrastructure Management", url: "https://www.cisecurity.org/controls" },
  ],
};
