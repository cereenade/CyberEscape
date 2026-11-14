import type { Lesson } from "@/lib/types";

export const ATTAQUE_BLEICHENBACHER: Lesson = {
  slug: "attaque-bleichenbacher",
  title: "L'oracle de Bleichenbacher",
  icon: "🧮",
  theme: "crypto",
  level: "avance",
  summary: "Pourquoi un serveur qui dit « remplissage invalide » peut faire tomber du RSA, et comment s'en protéger.",
  duration: "10 min",
  objectives: [
    "Comprendre ce qu'est un oracle de remplissage",
    "Situer l'attaque de Bleichenbacher et ses retours (ROBOT)",
    "Choisir les bonnes protections",
  ],
  sections: [
    {
      title: "Le remplissage PKCS#1 v1.5",
      paragraphs: [
        "Avant d'être chiffré avec RSA, un message est complété par un remplissage de format précis : il commence par les octets 00 02.",
        "En déchiffrant, le serveur vérifie ce format. Le problème commence quand il laisse voir le résultat de cette vérification.",
      ],
    },
    {
      title: "L'idée de l'attaque",
      paragraphs: [
        "En 1998, Daniel Bleichenbacher montre qu'un serveur qui répond différemment selon que le remplissage est valide ou non devient un « oracle ».",
        "Grâce aux propriétés mathématiques de RSA, l'attaquant envoie des versions modifiées d'un message chiffré intercepté et observe les réponses.",
        "Chaque réponse réduit les possibilités. Après de nombreuses requêtes, il retrouve le message en clair, sans jamais connaître la clé privée.",
      ],
    },
    {
      title: "Des fuites partout",
      paragraphs: [
        "L'oracle peut être un message d'erreur, un code de retour, une alerte TLS différente, ou même un temps de réponse.",
        "L'attaque ROBOT (2017) a montré que de nombreux équipements TLS restaient vulnérables, presque vingt ans après.",
      ],
    },
    {
      title: "Se protéger",
      paragraphs: [
        "Pour chiffrer avec RSA, utilise OAEP plutôt que PKCS#1 v1.5.",
        "En TLS, préfère les échanges de clés (EC)DHE : TLS 1.3 a supprimé l'échange de clés RSA.",
        "Si un ancien protocole doit rester, le traitement d'erreur doit être identique et en temps constant, quel que soit le problème.",
        "Agrandir la clé ne change rien : la faille est dans ce que le serveur laisse deviner.",
      ],
    },
  ],
  keyPoints: [
    "Une réponse différente selon la validité du remplissage = oracle.",
    "L'attaque déchiffre sans la clé privée.",
    "Protection : RSA-OAEP, (EC)DHE / TLS 1.3, erreurs uniformes.",
    "La taille de clé n'y est pour rien.",
  ],
  quiz: [
    {
      question: "Qu'est-ce qui rend un serveur vulnérable à l'attaque de Bleichenbacher ?",
      options: ["Une clé RSA de 2048 bits", "Une réponse différente selon que le remplissage est valide ou non", "L'utilisation de HTTPS"],
      correct: 1,
      explanation: "Cette différence observable est l'oracle.",
    },
    {
      question: "Quel remplissage faut-il préférer pour chiffrer avec RSA ?",
      options: ["PKCS#1 v1.5", "Aucun remplissage", "OAEP"],
      correct: 2,
      explanation: "OAEP est conçu pour résister à ce type d'attaque.",
    },
    {
      question: "Doubler la taille de la clé RSA corrige-t-il le problème ?",
      options: ["Oui", "Non, la fuite vient du comportement du serveur", "Seulement en TLS 1.2"],
      correct: 1,
      explanation: "L'attaque exploite l'oracle, pas la taille de la clé.",
    },
  ],
  sources: [
    { label: "RFC 8017 : PKCS #1 v2.2 (RSA, OAEP)", url: "https://www.rfc-editor.org/rfc/rfc8017" },
    { label: "Attaque ROBOT (2017)", url: "https://robotattack.org/" },
  ],
};
