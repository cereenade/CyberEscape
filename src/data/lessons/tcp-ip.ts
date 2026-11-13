import type { Lesson } from "@/lib/types";

export const TCP_IP: Lesson = {
  slug: "tcp-ip",
  title: "Le modèle TCP/IP et les protocoles",
  icon: "🧱",
  theme: "reseau",
  level: "intermediaire",
  summary: "Comment un message voyage d'une machine à l'autre, couche par couche.",
  duration: "8 min",
  objectives: [
    "Décrire les couches du modèle TCP/IP",
    "Différencier TCP et UDP",
    "Reconnaître les protocoles en clair et leurs équivalents sécurisés",
  ],
  sections: [
    {
      title: "Les couches",
      paragraphs: [
        "Accès réseau (Ethernet, Wi-Fi, adresses MAC) → Internet (IP, routage) → Transport (TCP, UDP, ports) → Application (HTTP, DNS, SMTP…).",
        "Chaque couche ajoute ses informations à l'envoi et les retire à la réception, comme des enveloppes emboîtées.",
      ],
    },
    {
      title: "TCP ou UDP",
      paragraphs: [
        "TCP établit une connexion (poignée de main SYN, SYN-ACK, ACK), garantit l'ordre et la livraison : idéal pour le web ou les mails.",
        "UDP envoie sans connexion ni garantie, mais plus vite : utilisé pour le DNS, la vidéo en direct ou les jeux en ligne.",
      ],
      example: "Client → SYN → Serveur\nClient ← SYN-ACK ← Serveur\nClient → ACK → Serveur   (connexion établie)",
    },
    {
      title: "Le trajet d'une requête web",
      paragraphs: [
        "Requête DNS pour obtenir l'IP du site → connexion TCP sur le port 443 → négociation TLS (chiffrement) → requête HTTP → réponse.",
        "Chaque étape laisse des traces que les analystes peuvent exploiter : journaux DNS, flux réseau, certificats.",
      ],
    },
    {
      title: "Protocoles en clair et sécurisés",
      paragraphs: [
        "Telnet (23), FTP (21) et HTTP (80) transmettent tout en clair, mots de passe compris.",
        "Leurs remplaçants chiffrés : SSH (22), SFTP/FTPS et HTTPS (443). Un protocole en clair encore utilisé est une faiblesse à corriger.",
      ],
    },
  ],
  keyPoints: [
    "4 couches : accès réseau, Internet (IP), transport (TCP/UDP), application.",
    "TCP = fiable avec connexion, UDP = rapide sans garantie.",
    "Une visite web : DNS → TCP → TLS → HTTP.",
    "Telnet, FTP et HTTP sont en clair : préfère SSH, SFTP et HTTPS.",
  ],
  quiz: [
    {
      question: "Quel protocole établit une connexion avec une poignée de main ?",
      options: ["UDP", "TCP", "ICMP"],
      correct: 1,
      explanation: "SYN, SYN-ACK, ACK : c'est le handshake TCP.",
    },
    {
      question: "Par quoi remplacer Telnet ?",
      options: ["FTP", "SSH", "HTTP"],
      correct: 1,
      explanation: "SSH chiffre la session, Telnet envoie tout en clair.",
    },
    {
      question: "Quelle est la première étape quand tu tapes une adresse web ?",
      options: ["La requête HTTP", "La requête DNS", "La négociation TLS"],
      correct: 1,
      explanation: "Il faut d'abord connaître l'adresse IP du site.",
    },
  ],
};
