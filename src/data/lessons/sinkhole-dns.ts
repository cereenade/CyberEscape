import type { Lesson } from "@/lib/types";

export const SINKHOLE_DNS: Lesson = {
  slug: "sinkhole-dns",
  title: "Le sinkhole DNS : piéger les malwares",
  icon: "🕳️",
  theme: "soc",
  level: "avance",
  summary: "Rediriger les domaines malveillants vers une adresse contrôlée pour couper les malwares et repérer les postes infectés.",
  duration: "8 min",
  objectives: [
    "Comprendre le principe d'un sinkhole DNS",
    "Lire un journal de résolveur pour trouver les postes infectés",
    "Connaître les limites de la technique",
  ],
  sections: [
    {
      title: "Le principe",
      paragraphs: [
        "Un malware contacte souvent son serveur de commande par un nom de domaine. Si le résolveur DNS de l'entreprise répond par une adresse piège contrôlée par les défenseurs, le malware ne joint plus son serveur.",
        "On le met en place avec des zones de réponse personnalisées (RPZ) sur le résolveur, un pare-feu DNS ou un service de filtrage, alimentés par des listes d'indicateurs.",
      ],
    },
    {
      title: "Trouver les postes infectés",
      paragraphs: [
        "Chaque requête vers un domaine piégé est un indice : le poste qui la pose exécute probablement le malware.",
        "Dans le journal du résolveur, regarde l'adresse du client, pas l'adresse renvoyée (qui est celle du piège). Dans la salle « Le domaine détourné », c'est 10.20.4.37 qui revient toutes les cinq minutes : un beaconing typique.",
        "Le serveur piège peut aussi journaliser les connexions reçues pour confirmer les postes concernés.",
      ],
    },
    {
      title: "Limites et bonnes pratiques",
      paragraphs: [
        "Un malware qui utilise une adresse IP en dur, un DNS chiffré vers l'extérieur (DoH) ou des domaines générés en masse peut échapper au sinkhole : bloque le DNS sortant non autorisé.",
        "Le sinkhole ne nettoie rien : il signale. Chaque poste repéré doit être isolé, analysé et remis en état.",
        "À l'échelle d'Internet, chercheurs et autorités reprennent parfois des domaines de botnets pour les neutraliser, comme le domaine « interrupteur » de WannaCry en 2017.",
      ],
    },
  ],
  keyPoints: [
    "Un sinkhole répond aux domaines malveillants par une adresse piège.",
    "Le client qui interroge le domaine est le poste à investiguer.",
    "Bloquer le DNS sortant non autorisé rend le sinkhole efficace.",
    "Il détecte et freine, mais ne remplace pas la réponse à incident.",
  ],
  quiz: [
    {
      question: "Dans un journal de résolveur, quel champ désigne le poste infecté ?",
      options: ["L'adresse renvoyée par le sinkhole", "L'adresse du client qui pose la question", "Le nom du serveur DNS"],
      correct: 1,
      explanation: "L'adresse renvoyée est celle du piège, la même pour tous.",
    },
    {
      question: "Quelle technique permet de faire un sinkhole sur un résolveur interne ?",
      options: ["Les zones RPZ", "Le NAT", "Le RAID 5"],
      correct: 0,
      explanation: "Les Response Policy Zones réécrivent les réponses pour des domaines listés.",
    },
    {
      question: "Qu'est-ce qui peut contourner un sinkhole interne ?",
      options: ["Un malware qui utilise le DNS de l'entreprise", "Un malware qui joint une adresse IP en dur", "Un poste éteint"],
      correct: 1,
      explanation: "Sans requête DNS, le résolveur n'a rien à détourner.",
    },
  ],
  sources: [
    { label: "ANSSI — Bonnes pratiques pour les noms de domaine", url: "https://cyber.gouv.fr/publications/bonnes-pratiques-pour-lacquisition-et-lexploitation-de-noms-de-domaine" },
    { label: "MITRE D3FEND — DNS Denylisting", url: "https://d3fend.mitre.org/technique/d3f:DNSDenylisting/" },
  ],
};
