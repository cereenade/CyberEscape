import type { Lesson } from "@/lib/types";

export const TTL_PAQUETS: Lesson = {
  slug: "ttl-paquets",
  title: "Le TTL : la durée de vie d'un paquet",
  icon: "⏳",
  theme: "reseau",
  level: "intermediaire",
  summary: "Un petit compteur dans chaque paquet IP, qui évite les boucles et trahit souvent le système d'origine.",
  duration: "6 min",
  objectives: [
    "Comprendre le rôle du TTL",
    "Deviner un système à partir d'un TTL reçu",
    "Connaître les limites de cette méthode",
  ],
  sections: [
    {
      title: "Un compteur qui descend",
      paragraphs: [
        "Chaque paquet IP porte un champ TTL (Time To Live, appelé Hop Limit en IPv6). Chaque routeur traversé lui retire 1.",
        "Arrivé à 0, le paquet est détruit et le routeur renvoie un message ICMP « temps dépassé ». Sans cela, un paquet pourrait tourner en boucle pour toujours.",
        "Traceroute utilise justement ce mécanisme : il envoie des paquets avec un TTL de 1, 2, 3… pour découvrir chaque routeur du chemin.",
      ],
    },
    {
      title: "Lire le système d'origine",
      paragraphs: [
        "Chaque système part d'une valeur par défaut : souvent 64 pour Linux et macOS, 128 pour Windows, 255 pour beaucoup d'équipements réseau.",
        "On remonte à la valeur de départ la plus proche au-dessus du TTL reçu. La différence donne le nombre de routeurs traversés.",
      ],
      example: "TTL=127 → départ à 128 (Windows), un routeur traversé. TTL=60 → départ à 64 (Linux), quatre routeurs.",
    },
    {
      title: "Les limites",
      paragraphs: [
        "Les valeurs par défaut se modifient en une ligne de configuration, et un pare-feu ou un équilibreur peut répondre à la place du serveur.",
        "C'est un indice, pas une preuve : croise-le avec l'inventaire, les bannières et les journaux.",
        "Côté défense, un TTL inattendu (un « Windows » derrière un serveur Linux) peut signaler un équipement intermédiaire ou une machine non inventoriée.",
      ],
    },
  ],
  keyPoints: [
    "Chaque routeur retire 1 au TTL ; à 0, le paquet est détruit.",
    "64 ≈ Linux/macOS, 128 ≈ Windows, 255 ≈ équipement réseau.",
    "C'est un indice qui se falsifie facilement.",
  ],
  quiz: [
    {
      question: "Que se passe-t-il quand le TTL atteint 0 ?",
      options: ["Le paquet est détruit", "Le paquet repart à 255", "Le paquet est chiffré"],
      correct: 0,
      explanation: "Le routeur le jette et prévient l'expéditeur par ICMP.",
    },
    {
      question: "Un ping répond avec TTL=63. Quel système est le plus probable ?",
      options: ["Windows", "Linux ou macOS", "Un routeur à 255"],
      correct: 1,
      explanation: "Départ à 64, un routeur traversé.",
    },
    {
      question: "Quel outil s'appuie sur le TTL pour découvrir le chemin réseau ?",
      options: ["Traceroute", "WHOIS", "grep"],
      correct: 0,
      explanation: "Il augmente le TTL d'un à chaque envoi.",
    },
  ],
  sources: [{ label: "RFC 791 — Internet Protocol", url: "https://www.rfc-editor.org/rfc/rfc791" }],
};
