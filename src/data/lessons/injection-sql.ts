import type { Lesson } from "@/lib/types";

export const INJECTION_SQL: Lesson = {
  slug: "injection-sql",
  title: "L'injection SQL en profondeur",
  icon: "💉",
  theme: "web",
  level: "intermediaire",
  summary: "Comment une simple apostrophe peut vider une base de données, et comment l'en empêcher pour de bon.",
  duration: "9 min",
  objectives: [
    "Comprendre pourquoi l'injection SQL fonctionne",
    "Distinguer injection classique, par UNION et aveugle",
    "Corriger avec des requêtes préparées",
  ],
  sections: [
    {
      title: "Le principe",
      paragraphs: [
        "Quand une requête est construite en collant le texte saisi, ce texte peut devenir du code SQL.",
        "La saisie ' OR '1'='1 transforme une condition de connexion en condition toujours vraie.",
      ],
      example: "SELECT * FROM users WHERE login = '' OR '1'='1' --' AND pass = '…'",
    },
    {
      title: "Les variantes",
      paragraphs: [
        "UNION : ajouter les résultats d'une autre requête (souvent la table des utilisateurs) à ceux affichés par la page.",
        "Aveugle : sans erreur visible, on pose des questions oui/non (page différente, ou délai avec SLEEP) pour extraire les données petit à petit.",
      ],
    },
    {
      title: "La vraie correction",
      paragraphs: [
        "Les requêtes préparées envoient la requête et les données séparément : les données ne peuvent jamais devenir du code.",
        "Filtrer les apostrophes ou cacher les erreurs ne corrige rien : ce sont des pansements contournables.",
      ],
      example: "db.query(\"SELECT * FROM users WHERE login = ?\", [login])",
    },
    {
      title: "Limiter les dégâts",
      paragraphs: [
        "Le compte utilisé par l'application ne doit avoir que les droits nécessaires (pas d'administrateur de base).",
        "Les mots de passe stockés doivent être hachés avec un algorithme lent (Argon2, bcrypt).",
      ],
    },
  ],
  keyPoints: [
    "L'injection naît du mélange entre code et données.",
    "UNION affiche d'autres tables, l'aveugle extrait par questions oui/non.",
    "Requêtes préparées = vraie correction.",
    "Moindre privilège et mots de passe hachés limitent l'impact.",
  ],
  quiz: [
    {
      question: "La page s'affiche avec AND 1=1 et reste vide avec AND 1=2. C'est…",
      options: ["Une injection SQL aveugle", "Un bug d'affichage", "Une attaque XSS"],
      correct: 0,
      explanation: "La base exécute la condition ajoutée.",
    },
    {
      question: "Quelle correction est la bonne ?",
      options: ["Supprimer les apostrophes", "Requêtes préparées", "Masquer les erreurs"],
      correct: 1,
      explanation: "Les données ne sont plus jamais interprétées comme du code.",
    },
    {
      question: "À quoi sert « -- » dans une injection ?",
      options: ["À multiplier", "À mettre la fin de la requête en commentaire", "À chiffrer"],
      correct: 1,
      explanation: "La suite de la requête d'origine est ignorée.",
    },
  ],
};
