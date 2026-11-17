import type { Lesson } from "@/lib/types";

export const DEPOT_GIT_EXPOSE: Lesson = {
  slug: "depot-git-expose",
  title: "Le dossier .git exposé",
  icon: "🗂️",
  theme: "web",
  level: "intermediaire",
  summary: "Pourquoi un dossier .git en ligne livre tout l'historique d'un site, et comment l'éviter.",
  duration: "7 min",
  objectives: [
    "Comprendre ce que contient un dossier .git",
    "Repérer son exposition dans les journaux",
    "Réagir quand un secret a fuité dans l'historique",
  ],
  sections: [
    {
      title: "Ce que contient .git",
      paragraphs: [
        "Git garde dans le dossier caché .git chaque version de chaque fichier, les messages de commit et la configuration du dépôt.",
        "Un fichier supprimé du code reste présent dans l'historique, avec son contenu.",
      ],
    },
    {
      title: "Comment il se retrouve en ligne",
      paragraphs: [
        "Le site est parfois déployé en copiant tout le dossier du projet, .git compris.",
        "Si le serveur web sert les fichiers cachés, n'importe qui peut télécharger /.git/HEAD, /.git/config puis reconstruire le dépôt.",
      ],
    },
    {
      title: "Le repérer",
      paragraphs: [
        "Dans les journaux d'accès, des requêtes vers /.git/ qui répondent 200 sont un signal fort, comme dans la salle.",
        "Une réponse 403 ou 404 montre que l'accès est bien bloqué.",
      ],
    },
    {
      title: "Se protéger et réagir",
      paragraphs: [
        "Déploie seulement les fichiers nécessaires (artefact de build), et bloque l'accès aux fichiers et dossiers commençant par un point.",
        "Garde les secrets hors du code (variables d'environnement, coffre-fort).",
        "Si un secret a fuité : change-le immédiatement. Nettoyer l'historique ne suffit pas, il a pu être copié.",
      ],
    },
  ],
  keyPoints: [
    "Le dossier .git contient tout l'historique, même les fichiers supprimés.",
    "Requêtes /.git/ en 200 dans les journaux = alerte.",
    "Secret exposé = secret à changer, toujours.",
  ],
  quiz: [
    {
      question: "Un mot de passe a été supprimé du code il y a six mois. Est-il encore lisible via .git ?",
      options: ["Non, il est effacé", "Oui, dans l'historique", "Seulement si le site est en PHP"],
      correct: 1,
      explanation: "Chaque ancienne version reste dans l'historique.",
    },
    {
      question: "Quelle réponse à GET /.git/HEAD est inquiétante ?",
      options: ["200", "403", "404"],
      correct: 0,
      explanation: "200 signifie que le fichier est servi.",
    },
    {
      question: "Un secret a fuité dans un dépôt exposé. Quelle est la première action ?",
      options: ["Réécrire l'historique", "Changer le secret", "Renommer le dépôt"],
      correct: 1,
      explanation: "Il a pu être copié : seul le changement le neutralise.",
    },
  ],
  sources: [
    { label: "OWASP — Web Security Testing Guide (fichiers et répertoires oubliés)", url: "https://owasp.org/www-project-web-security-testing-guide/" },
    { label: "Git — Documentation", url: "https://git-scm.com/doc" },
  ],
};
