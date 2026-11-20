import type { Lesson } from "@/lib/types";

export const DOH_ENTREPRISE: Lesson = {
  slug: "doh-entreprise",
  title: "Le DNS over HTTPS en entreprise",
  icon: "🕶️",
  theme: "soc",
  level: "avance",
  summary: "Confidentialité contre visibilité : garder le contrôle du DNS quand les requêtes passent en HTTPS.",
  duration: "8 min",
  objectives: [
    "Comprendre ce que change DoH",
    "Mesurer son impact sur la détection",
    "Mettre en place une politique DoH maîtrisée",
  ],
  sections: [
    {
      title: "Ce que fait DoH",
      paragraphs: [
        "DNS over HTTPS (RFC 8484) envoie les requêtes DNS dans des connexions HTTPS sur le port 443 : personne sur le trajet ne peut les lire ni les modifier.",
        "Pour un particulier sur un Wi-Fi public, c'est un vrai progrès de confidentialité.",
      ],
    },
    {
      title: "L'angle mort pour le SOC",
      paragraphs: [
        "Si un navigateur ou un malware choisit un résolveur DoH public, ses requêtes ne passent plus par le résolveur de l'entreprise : plus de filtrage DNS, plus de sinkhole, plus de journaux.",
        "Comme dans la salle des requêtes invisibles, le SOC perd un de ses meilleurs capteurs, et le trafic ressemble à de la navigation ordinaire.",
      ],
    },
    {
      title: "Une politique maîtrisée",
      paragraphs: [
        "Configurer les navigateurs par stratégie (GPO, MDM) pour utiliser le résolveur interne, qui peut lui-même proposer DoH ou DoT.",
        "Bloquer au proxy ou au pare-feu les résolveurs DoH publics connus, et créer une alerte sur les tentatives.",
        "Pour les postes nomades, un client VPN ou un agent de sécurité garde le DNS dans le périmètre de l'entreprise.",
      ],
    },
  ],
  keyPoints: [
    "DoH chiffre le DNS dans du HTTPS.",
    "Un résolveur externe contourne filtrage et journaux.",
    "Imposer le résolveur interne par stratégie.",
    "Bloquer et surveiller les résolveurs DoH publics.",
  ],
  quiz: [
    {
      question: "Sur quel port circule DoH ?",
      options: ["53", "443", "853"],
      correct: 1,
      explanation: "DoH utilise HTTPS, donc le port 443 (853 est utilisé par DNS over TLS).",
    },
    {
      question: "Pourquoi DoH vers un résolveur public gêne-t-il le SOC ?",
      options: ["Il ralentit le réseau", "Les requêtes échappent au résolveur interne et à ses journaux", "Il désactive l'antivirus"],
      correct: 1,
      explanation: "Le SOC perd sa visibilité DNS.",
    },
    {
      question: "Quelle mesure garde chiffrement ET visibilité ?",
      options: ["Interdire HTTPS", "Faire utiliser au navigateur le résolveur interne compatible DoH", "Revenir au DNS en clair vers Internet"],
      correct: 1,
      explanation: "Les requêtes restent chiffrées et journalisées par l'entreprise.",
    },
  ],
  sources: [
    { label: "RFC 8484 – DNS Queries over HTTPS", url: "https://www.rfc-editor.org/rfc/rfc8484" },
  ],
};
