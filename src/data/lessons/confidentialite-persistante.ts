import type { Lesson } from "@/lib/types";

export const CONFIDENTIALITE_PERSISTANTE: Lesson = {
  slug: "confidentialite-persistante",
  title: "La confidentialité persistante (Forward Secrecy)",
  icon: "🔐",
  theme: "crypto",
  level: "avance",
  summary: "Pourquoi les clés éphémères protègent le trafic passé même si la clé d'un serveur est volée un jour.",
  duration: "9 min",
  objectives: [
    "Distinguer l'échange de clés RSA et l'échange (EC)DHE",
    "Expliquer ce que protège la confidentialité persistante",
    "Savoir quoi faire après le vol d'une clé de serveur",
  ],
  sections: [
    {
      title: "Le problème de l'échange de clés RSA",
      paragraphs: [
        "Dans les anciennes versions de TLS, le client choisissait un secret, le chiffrait avec la clé publique du serveur et l'envoyait. Tout le trafic dépendait donc de la clé privée du serveur.",
        "Un attaquant qui enregistre le trafic pendant des années et vole la clé un jour peut tout déchiffrer après coup : c'est le scénario « enregistrer maintenant, déchiffrer plus tard ».",
      ],
    },
    {
      title: "Les clés éphémères",
      paragraphs: [
        "Avec Diffie-Hellman éphémère (DHE ou ECDHE sur courbes elliptiques), client et serveur créent pour chaque session une paire de clés temporaire, oubliée après usage.",
        "La clé à long terme du serveur ne sert plus qu'à signer l'échange pour prouver son identité. La voler permet d'usurper le serveur à l'avenir, pas de relire le passé.",
        "TLS 1.3 a supprimé l'échange de clés RSA : la confidentialité persistante y est obligatoire. Le protocole Signal va plus loin en renouvelant les clés à chaque message (double ratchet).",
      ],
    },
    {
      title: "Après le vol d'une clé",
      paragraphs: [
        "Même avec la confidentialité persistante, une clé volée est grave : révoque le certificat, génère une nouvelle clé (idéalement dans un HSM) et cherche comment elle a fui.",
        "Vérifie aussi les tickets de reprise de session TLS : mal gérés (clé de ticket jamais changée), ils peuvent affaiblir la protection.",
        "Dans la salle « La clé volée trop tard », le trafic passé reste illisible, mais le certificat doit être remplacé.",
      ],
    },
  ],
  keyPoints: [
    "Échange de clés RSA : une clé volée ouvre tout l'historique.",
    "(EC)DHE : clés de session éphémères, le passé reste protégé.",
    "TLS 1.3 impose la confidentialité persistante.",
    "Une clé volée se révoque et se remplace dans tous les cas.",
  ],
  quiz: [
    {
      question: "Quel échange de clés offre la confidentialité persistante ?",
      options: ["L'échange de clés RSA", "ECDHE", "Aucun"],
      correct: 1,
      explanation: "ECDHE crée des clés temporaires à chaque session.",
    },
    {
      question: "Avec la confidentialité persistante, que permet le vol de la clé privée du serveur ?",
      options: ["Déchiffrer tout le trafic passé", "Se faire passer pour le serveur à l'avenir", "Rien du tout"],
      correct: 1,
      explanation: "La clé signe : elle permet l'usurpation, pas le déchiffrement du passé.",
    },
    {
      question: "Quelle version de TLS rend la confidentialité persistante obligatoire ?",
      options: ["TLS 1.0", "TLS 1.2", "TLS 1.3"],
      correct: 2,
      explanation: "TLS 1.3 n'accepte plus que des échanges (EC)DHE.",
    },
  ],
  sources: [
    { label: "RFC 8446 — TLS 1.3", url: "https://www.rfc-editor.org/rfc/rfc8446" },
    { label: "ANSSI — Recommandations de sécurité relatives à TLS", url: "https://cyber.gouv.fr/publications/recommandations-de-securite-relatives-tls" },
  ],
};
