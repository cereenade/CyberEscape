import type { Lesson } from "@/lib/types";

export const RESEAU: Lesson = {
  slug: "reseau",
  title: "Les réseaux",
  icon: "📡",
  summary: "Adresses IP, ports, DNS, pare-feu : comment les machines se parlent, et comment on les attaque.",
  duration: "7 min",
  sections: [
    {
      title: "Adresses IP et ports",
      paragraphs: [
        "Une adresse IP identifie une machine sur un réseau (ex. 192.168.1.10). Un port identifie un service sur cette machine.",
        "Ports à connaître : 22 (SSH), 53 (DNS), 80 (HTTP), 443 (HTTPS), 3306 (MySQL), 3389 (bureau à distance Windows).",
      ],
      example: "203.0.113.45:443 → la machine 203.0.113.45, service HTTPS",
    },
    {
      title: "Le DNS, l'annuaire d'Internet",
      paragraphs: [
        "Le DNS traduit un nom (serveur-corp.fr) en adresse IP. Sans lui, il faudrait retenir des suites de chiffres.",
        "Comme il est rarement bloqué, les attaquants s'en servent parfois pour faire sortir des données en douce (exfiltration DNS).",
      ],
    },
    {
      title: "Le pare-feu",
      paragraphs: [
        "Il filtre le trafic selon des règles : source, destination, port, autoriser ou refuser.",
        "Bonne pratique : tout refuser par défaut, et n'ouvrir que le strict nécessaire. 0.0.0.0/0 signifie « tout Internet ».",
      ],
    },
    {
      title: "Les attaques réseau",
      paragraphs: [
        "L'homme du milieu (MITM) : l'attaquant se place entre toi et le site, par exemple sur un faux Wi-Fi public.",
        "Le scan de ports : chercher les services ouverts pour trouver une porte d'entrée. Le déni de service (DDoS) : saturer un serveur pour le rendre indisponible.",
      ],
    },
  ],
  quiz: [
    {
      question: "Quel port utilise HTTPS par défaut ?",
      options: ["80", "443", "22"],
      correct: 1,
      explanation: "80 est HTTP en clair, 22 est SSH.",
    },
    {
      question: "À quoi sert le DNS ?",
      options: ["À chiffrer les mails", "À traduire un nom de domaine en adresse IP", "À bloquer les virus"],
      correct: 1,
      explanation: "C'est l'annuaire d'Internet.",
    },
    {
      question: "Une règle de pare-feu « ALLOW 0.0.0.0/0 → base de données 3306 » est…",
      options: ["Sans danger", "Dangereuse : la base est ouverte à tout Internet", "Obligatoire"],
      correct: 1,
      explanation: "0.0.0.0/0 veut dire n'importe qui. Une base de données doit rester interne.",
    },
  ],
};
