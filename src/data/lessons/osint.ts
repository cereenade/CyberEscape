import type { Lesson } from "@/lib/types";

export const OSINT: Lesson = {
  slug: "osint",
  title: "Reconnaissance et OSINT",
  icon: "🔭",
  summary: "Avant d'attaquer, on observe. Découvre ce qu'on peut apprendre sans rien pirater.",
  duration: "6 min",
  sections: [
    {
      title: "L'OSINT, c'est quoi ?",
      paragraphs: [
        "OSINT signifie Open Source Intelligence : le renseignement à partir de sources publiques (sites, réseaux sociaux, registres, moteurs de recherche).",
        "C'est la première étape de la Cyber Kill Chain : la reconnaissance. Les défenseurs l'utilisent aussi pour savoir ce que leur organisation expose.",
      ],
    },
    {
      title: "Ce qu'on trouve en ligne",
      paragraphs: [
        "Organigrammes et noms d'employés (réseaux professionnels), formats d'adresses mail, technologies utilisées (offres d'emploi), sous-domaines, documents oubliés.",
        "Le fichier robots.txt et les dépôts de code publics révèlent parfois des chemins cachés ou des secrets.",
      ],
      example: "robots.txt\nDisallow: /panel-admin-x9/   ← une page qu'on préférerait cacher",
    },
    {
      title: "La reconnaissance technique",
      paragraphs: [
        "Requêtes DNS pour lister les serveurs, scans de ports (nmap) pour voir les services ouverts et leurs versions.",
        "Une version vulnérable repérée lors d'un scan devient une porte d'entrée. Scanner une machine sans autorisation est illégal.",
      ],
    },
    {
      title: "Se protéger",
      paragraphs: [
        "Limiter les informations publiques, sensibiliser les employés, surveiller les fuites de secrets, fermer les services inutiles.",
        "Faire régulièrement sa propre reconnaissance pour voir son organisation avec les yeux d'un attaquant.",
      ],
    },
  ],
  quiz: [
    {
      question: "À quelle étape de la Kill Chain correspond l'OSINT ?",
      options: ["La reconnaissance", "L'exploitation", "L'exfiltration"],
      correct: 0,
      explanation: "On récolte des informations avant de préparer l'attaque.",
    },
    {
      question: "Le fichier robots.txt…",
      options: ["Protège les pages listées", "Est public et peut révéler des chemins sensibles", "Bloque les pirates"],
      correct: 1,
      explanation: "C'est une simple demande aux robots, lisible par tous.",
    },
    {
      question: "Scanner les ports d'un serveur qui ne t'appartient pas, sans autorisation…",
      options: ["Est toujours autorisé", "Est illégal", "Est obligatoire"],
      correct: 1,
      explanation: "En France, l'accès ou la tentative d'accès frauduleux est puni par la loi. On ne teste que ce qu'on a le droit de tester.",
    },
  ],
};
