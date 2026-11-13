import type { Lesson } from "@/lib/types";

export const OWASP: Lesson = {
  slug: "owasp",
  title: "L'OWASP Top 10",
  icon: "🔟",
  theme: "web",
  level: "avance",
  summary: "Les dix grandes familles de failles des applications web, et comment s'en protéger.",
  duration: "9 min",
  objectives: [
    "Connaître les grandes catégories de l'OWASP Top 10",
    "Relier chaque catégorie à des exemples concrets",
    "Associer chaque risque à sa parade principale",
  ],
  sections: [
    {
      title: "Qu'est-ce que l'OWASP ?",
      paragraphs: [
        "L'OWASP est une fondation à but non lucratif qui publie des ressources libres sur la sécurité des applications. Son Top 10 classe les risques les plus critiques du web, et sert de référence aux développeurs et aux auditeurs.",
      ],
    },
    {
      title: "Contrôle d'accès et authentification",
      paragraphs: [
        "Défaillance du contrôle d'accès (le risque n°1) : IDOR, accès à des pages admin, élévation de droits. Parade : vérifier les droits côté serveur à chaque requête, refuser par défaut.",
        "Défaillances d'identification et d'authentification : mots de passe faibles acceptés, pas de protection contre la force brute, sessions mal gérées. Parade : MFA, limitation des tentatives, sessions sûres.",
      ],
    },
    {
      title: "Injections et données",
      paragraphs: [
        "Injection : SQL, commandes système, XSS, injection de template. Parade : requêtes préparées, validation des entrées, échappement des sorties.",
        "Défaillances cryptographiques : données sensibles en clair, algorithmes obsolètes (MD5, SHA-1), HTTP au lieu de HTTPS.",
      ],
    },
    {
      title: "Configuration, composants et conception",
      paragraphs: [
        "Mauvaise configuration : messages d'erreur trop bavards, comptes par défaut, stockage cloud public, en-têtes de sécurité absents.",
        "Composants vulnérables et obsolètes : une bibliothèque pas à jour avec une faille connue (CVE). Défaillances d'intégrité : mises à jour ou dépendances non vérifiées (chaîne d'approvisionnement).",
        "Conception non sécurisée : une logique métier pensée sans la sécurité dès le départ.",
      ],
    },
    {
      title: "Journalisation et SSRF",
      paragraphs: [
        "Carences de journalisation et de surveillance : une attaque qui passe inaperçue faute de logs ou d'alertes.",
        "SSRF : forcer le serveur à faire des requêtes vers des ressources internes, comme les métadonnées du cloud.",
      ],
    },
  ],
  keyPoints: [
    "Le contrôle d'accès défaillant est le risque web n°1 : vérifier les droits côté serveur, toujours.",
    "Injections → requêtes préparées et échappement.",
    "Garder ses dépendances à jour et vérifier leur intégrité.",
    "Sans journaux ni alertes, une attaque réussie peut passer inaperçue pendant des mois.",
  ],
  quiz: [
    {
      question: "Quel risque arrive en tête de l'OWASP Top 10 ?",
      options: ["L'injection", "La défaillance du contrôle d'accès", "Le DDoS"],
      correct: 1,
      explanation: "Les problèmes de droits d'accès sont les plus répandus.",
    },
    {
      question: "Une bibliothèque avec une CVE connue jamais mise à jour relève de…",
      options: ["Composants vulnérables et obsolètes", "Injection", "SSRF"],
      correct: 0,
      explanation: "Utiliser des composants non corrigés expose aux failles publiques.",
    },
    {
      question: "Des messages d'erreur qui affichent la requête SQL complète sont…",
      options: ["Une bonne pratique", "Une mauvaise configuration de sécurité", "Obligatoires"],
      correct: 1,
      explanation: "Ils donnent de précieuses informations aux attaquants.",
    },
  ],
};
