import type { Lesson } from "@/lib/types";

export const DEFENSE_RESEAU: Lesson = {
  slug: "defense-reseau",
  title: "Pare-feu, VPN et segmentation",
  icon: "🧯",
  theme: "reseau",
  level: "intermediaire",
  summary: "Comment on protège un réseau d'entreprise : filtrer, chiffrer, cloisonner.",
  duration: "7 min",
  objectives: [
    "Comprendre le rôle du pare-feu et du WAF",
    "Savoir ce que protège (et ne protège pas) un VPN",
    "Expliquer la segmentation et le Zero Trust",
  ],
  sections: [
    {
      title: "Le pare-feu",
      paragraphs: [
        "Il autorise ou bloque le trafic selon des règles : source, destination, port, protocole. Bonne pratique : tout refuser par défaut, n'ouvrir que le nécessaire.",
        "Le WAF (pare-feu applicatif web) va plus loin : il inspecte le contenu des requêtes HTTP pour bloquer injections SQL, XSS ou scans connus.",
      ],
    },
    {
      title: "Le VPN",
      paragraphs: [
        "Un VPN crée un tunnel chiffré entre ton appareil et un serveur. Sur un Wi-Fi public, personne ne peut lire ton trafic. En entreprise, il permet d'accéder au réseau interne à distance.",
        "Il ne protège ni du phishing, ni des malwares, et il ne rend pas anonyme : le fournisseur du VPN voit ton trafic.",
      ],
    },
    {
      title: "La segmentation",
      paragraphs: [
        "On découpe le réseau en zones séparées : postes de travail, serveurs, invités, production industrielle. Un pare-feu filtre les échanges entre zones.",
        "Si un poste est compromis, l'attaquant ne peut pas atteindre directement les serveurs sensibles : on limite le mouvement latéral.",
      ],
    },
    {
      title: "Le Zero Trust",
      paragraphs: [
        "Ancien modèle : tout ce qui est « dans » le réseau est de confiance. Zero Trust : on ne fait confiance à personne par défaut, même à l'intérieur.",
        "Chaque accès est vérifié : identité forte (MFA), état de l'appareil, droits minimaux, et tout est journalisé.",
      ],
    },
  ],
  keyPoints: [
    "Pare-feu : tout refuser par défaut. WAF : filtrer les attaques web.",
    "Un VPN chiffre le trafic, mais ne protège ni du phishing ni des malwares.",
    "La segmentation freine le mouvement latéral d'un attaquant.",
    "Zero Trust : chaque accès est vérifié, même depuis l'intérieur du réseau.",
  ],
  quiz: [
    {
      question: "Un VPN te protège…",
      options: ["Du phishing", "De l'écoute de ton trafic sur un Wi-Fi public", "Des virus"],
      correct: 1,
      explanation: "Il chiffre le trafic entre ton appareil et le serveur VPN.",
    },
    {
      question: "À quoi sert la segmentation du réseau ?",
      options: ["À accélérer Internet", "À limiter la propagation d'une attaque", "À supprimer les pare-feu"],
      correct: 1,
      explanation: "Les zones séparées freinent le mouvement latéral.",
    },
    {
      question: "Le principe du Zero Trust, c'est…",
      options: ["Faire confiance au réseau interne", "Vérifier chaque accès, même interne", "Ne plus utiliser de mot de passe"],
      correct: 1,
      explanation: "Aucune confiance implicite, même à l'intérieur.",
    },
  ],
};
