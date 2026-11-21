import type { Lesson } from "@/lib/types";

export const DEPOT_GIT_EXPOSE: Lesson = {
  slug: "depot-git-expose",
  title: "Le dossier .git exposé en ligne",
  icon: "🗂️",
  theme: "web",
  level: "intermediaire",
  summary: "Comment un dossier de versions publié par erreur dévoile code et secrets, et comment s'en protéger durablement.",
  duration: "7 min",
  objectives: [
    "Comprendre ce que contient un dossier .git",
    "Mesurer l'impact d'une exposition",
    "Corriger le déploiement et renouveler les secrets",
  ],
  sections: [
    {
      title: "Ce que contient .git",
      paragraphs: [
        "Git range l'historique complet d'un projet dans un dossier caché, .git : chaque version de chaque fichier, les messages de commit, la configuration.",
        "Quand un site est déployé en copiant tout le dossier du projet, .git part avec le reste et devient accessible à l'adresse /.git/.",
      ],
    },
    {
      title: "Pourquoi c'est grave",
      paragraphs: [
        "À partir de ce dossier, on peut reconstituer le code source complet du site.",
        "Les secrets supprimés depuis longtemps restent dans les anciennes versions : mot de passe de base de données, clés d'API, adresses internes.",
        "Le code source aide aussi à trouver d'autres failles plus facilement.",
      ],
    },
    {
      title: "Corriger pour de bon",
      paragraphs: [
        "Bloquer l'accès aux fichiers et dossiers cachés (/.git, /.env…) dans la configuration du serveur web.",
        "Déployer seulement les fichiers utiles (artefact de build, image de conteneur) plutôt qu'une copie du dépôt.",
        "Considérer tous les secrets de l'historique comme compromis : les changer, puis vérifier les journaux d'accès pour savoir si le dossier a été téléchargé.",
      ],
    },
    {
      title: "Prévenir",
      paragraphs: [
        "Scanner les dépôts avec un outil de détection de secrets avant chaque fusion.",
        "Stocker les secrets dans un coffre ou des variables d'environnement, jamais dans le code.",
        "Ajouter un test automatique qui vérifie que /.git/HEAD renvoie bien une erreur en production.",
      ],
    },
  ],
  keyPoints: [
    "Un .git en ligne = tout le code et tout l'historique.",
    "Un secret effacé du code reste dans l'historique.",
    "Bloquer les fichiers cachés et déployer sans .git.",
    "Changer tous les secrets exposés.",
  ],
  quiz: [
    {
      question: "Tu as supprimé un mot de passe du code dans un nouveau commit. Est-il en sécurité ?",
      options: ["Oui, il n'existe plus", "Non, il reste dans l'historique : il faut le changer", "Oui, si le commit est récent"],
      correct: 1,
      explanation: "Les anciennes versions gardent le mot de passe ; seul un nouveau secret est sûr.",
    },
    {
      question: "Quelle est la cause du problème ?",
      options: ["Un mot de passe trop court", "Un déploiement qui copie aussi le dossier .git", "Un certificat expiré"],
      correct: 1,
      explanation: "Le dossier n'aurait jamais dû être déployé.",
    },
    {
      question: "Quel test automatique repère ce problème en production ?",
      options: ["Vérifier que /.git/HEAD renvoie une erreur", "Vérifier que la page d'accueil renvoie 200", "Vérifier la date du certificat"],
      correct: 0,
      explanation: "Si ce fichier répond, le dossier est exposé.",
    },
  ],
  sources: [
    { label: "OWASP : Review Old Backup and Unreferenced Files", url: "https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/04-Review_Old_Backup_and_Unreferenced_Files_for_Sensitive_Information" },
    { label: "OWASP : Secrets Management Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html" },
  ],
};
