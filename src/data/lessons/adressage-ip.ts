import type { Lesson } from "@/lib/types";

export const ADRESSAGE_IP: Lesson = {
  slug: "adressage-ip",
  title: "Adresses IP, masques et services réseau",
  icon: "🧮",
  theme: "reseau",
  level: "debutant",
  summary: "IPv4, IPv6, masques, DHCP, NAT et ARP : ce qui se passe quand on branche un ordinateur.",
  duration: "8 min",
  objectives: [
    "Lire une adresse IP et un masque",
    "Comprendre DHCP, NAT et ARP",
    "Utiliser ping et traceroute",
  ],
  sections: [
    {
      title: "Adresses et masques",
      paragraphs: [
        "Une adresse IPv4 compte 4 nombres de 0 à 255. Le masque (/24) indique la partie réseau : 192.168.1.0/24 contient 254 adresses de machines.",
        "IPv6 utilise 128 bits écrits en hexadécimal ; « :: » abrège une suite de zéros.",
      ],
      example: "192.168.10.25/24 → réseau 192.168.10.0, 254 machines possibles\n2001:db8::1 → adresse IPv6 abrégée",
    },
    {
      title: "Recevoir une adresse : DHCP",
      paragraphs: [
        "En se branchant, la machine demande une configuration : adresse IP, passerelle, serveurs DNS. Le serveur DHCP la lui prête pour une durée (bail).",
        "Un faux serveur DHCP pourrait rediriger tout le trafic : les switchs savent bloquer les serveurs non autorisés (DHCP snooping).",
      ],
    },
    {
      title: "Sortir sur Internet : NAT",
      paragraphs: [
        "Les adresses privées (10.x, 172.16-31.x, 192.168.x) ne circulent pas sur Internet. La box les traduit en une seule adresse publique.",
        "Conséquence : une machine interne n'est pas joignable directement, sauf redirection de port volontaire.",
      ],
    },
    {
      title: "Sur le réseau local : ARP",
      paragraphs: [
        "Pour parler à une IP du réseau local, la machine demande à tous : « qui a cette IP ? ». La réponse donne l'adresse MAC.",
        "ARP ne vérifie rien : de fausses réponses permettent l'empoisonnement ARP. ping teste si une machine répond (ICMP), traceroute (tracert) montre le chemin.",
      ],
    },
  ],
  keyPoints: [
    "Un /24 = 254 machines.",
    "DHCP distribue les adresses, NAT les traduit vers Internet.",
    "ARP relie IP et MAC, sans aucune vérification.",
    "ping et traceroute pour diagnostiquer.",
  ],
  quiz: [
    {
      question: "Combien de machines dans un réseau /24 ?",
      options: ["24", "254", "65 534"],
      correct: 1,
      explanation: "8 bits libres = 256 adresses, moins le réseau et la diffusion.",
    },
    {
      question: "Quel service donne automatiquement une adresse IP ?",
      options: ["DNS", "DHCP", "HTTP"],
      correct: 1,
      explanation: "DHCP fournit adresse, passerelle et DNS.",
    },
    {
      question: "ARP sert à trouver…",
      options: ["L'adresse MAC d'une IP locale", "Le nom d'un site", "Le chemin vers un serveur lointain"],
      correct: 0,
      explanation: "C'est la correspondance IP → MAC sur le réseau local.",
    },
  ],
};
