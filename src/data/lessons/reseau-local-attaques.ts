import type { Lesson } from "@/lib/types";

export const RESEAU_LOCAL_ATTAQUES: Lesson = {
  slug: "reseau-local-attaques",
  title: "Attaques sur le réseau local",
  icon: "🕸️",
  theme: "reseau",
  level: "avance",
  summary: "ARP, LLMNR, IPv6, relais NTLM : ce qu'un attaquant fait une fois branché dans le réseau.",
  duration: "10 min",
  objectives: [
    "Comprendre les attaques par usurpation sur le réseau local",
    "Connaître le relais NTLM et ses parades",
    "Mettre en place les protections réseau adaptées",
  ],
  sections: [
    {
      title: "L'usurpation ARP",
      paragraphs: [
        "De fausses réponses ARP font croire aux postes que la machine du pirate est le routeur : tout le trafic passe par lui.",
        "Parades : inspection ARP dynamique sur les switchs, chiffrement de bout en bout (HTTPS, SMB chiffré).",
      ],
    },
    {
      title: "LLMNR, NBT-NS et IPv6",
      paragraphs: [
        "Quand le DNS échoue, Windows demande au réseau local (LLMNR, NBT-NS) : le pirate répond et récupère le hash NTLM de la victime.",
        "Sur un réseau « IPv4 seulement », de fausses annonces de routeur IPv6 font aussi du pirate la passerelle ou le DNS. Parades : désactiver LLMNR/NBT-NS, RA Guard.",
      ],
    },
    {
      title: "Le relais NTLM",
      paragraphs: [
        "Plutôt que casser le hash, le pirate relaie l'authentification en direct vers un autre serveur et s'y connecte à la place de la victime.",
        "Parades : signature SMB obligatoire, protection étendue (EPA) sur les services web, réduction de NTLM au profit de Kerberos.",
      ],
    },
    {
      title: "Segmenter et contrôler",
      paragraphs: [
        "Le contrôle d'accès réseau (802.1X) empêche un appareil inconnu de se brancher et d'obtenir un accès.",
        "La segmentation (VLAN, pare-feu interne) limite ce qu'un attaquant peut atteindre depuis un poste compromis.",
      ],
    },
  ],
  keyPoints: [
    "ARP et LLMNR font confiance à n'importe quelle réponse.",
    "Désactiver LLMNR/NBT-NS, activer RA Guard et l'inspection ARP.",
    "Signature SMB obligatoire contre le relais NTLM.",
    "802.1X et segmentation limitent l'attaquant branché.",
  ],
  quiz: [
    {
      question: "Que récupère un pirate qui répond aux requêtes LLMNR ?",
      options: ["Le hash NTLM de la victime", "Son adresse postale", "Rien"],
      correct: 0,
      explanation: "La victime tente de s'authentifier auprès de lui.",
    },
    {
      question: "Quelle mesure bloque le relais NTLM vers les partages de fichiers ?",
      options: ["La signature SMB obligatoire", "Un fond d'écran", "Le Wi-Fi invité"],
      correct: 0,
      explanation: "Le pirate ne peut pas signer les messages relayés.",
    },
    {
      question: "Quelle protection filtre les fausses annonces de routeur IPv6 ?",
      options: ["RA Guard", "DMARC", "HSTS"],
      correct: 0,
      explanation: "Elle bloque les annonces venant de ports non autorisés.",
    },
  ],
};
