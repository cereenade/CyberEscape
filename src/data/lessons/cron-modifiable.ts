import type { Lesson } from "@/lib/types";

export const CRON_MODIFIABLE: Lesson = {
  slug: "cron-modifiable",
  title: "Les tâches cron trop ouvertes",
  icon: "⏰",
  theme: "systeme",
  level: "intermediaire",
  summary: "Un script lancé par root mais modifiable par tous ouvre la porte à l'élévation de privilèges : repérer et corriger.",
  duration: "7 min",
  objectives: [
    "Lire une ligne de crontab",
    "Repérer un script ou un dossier aux droits trop larges",
    "Sécuriser les tâches planifiées d'un serveur Linux",
  ],
  sections: [
    {
      title: "Comment fonctionne cron",
      paragraphs: [
        "cron lance des commandes à heure fixe. Les tâches système se trouvent dans /etc/crontab et /etc/cron.d, avec une colonne qui indique l'utilisateur qui les exécute.",
        "Les cinq premiers champs donnent le moment : minute, heure, jour du mois, mois, jour de la semaine.",
      ],
      example: "0 0 * * * root /opt/scripts/sauvegarde.sh\n→ tous les jours à minuit, root lance sauvegarde.sh",
    },
    {
      title: "Le problème des droits",
      paragraphs: [
        "Si le script appelé est modifiable par d'autres utilisateurs (-rwxrwxrwx, ou propriétaire non root), n'importe lequel d'entre eux peut y ajouter des commandes.",
        "À la prochaine exécution, root les lancera avec tous ses droits. Le même risque existe si le dossier parent est modifiable : on peut remplacer le fichier entier.",
      ],
    },
    {
      title: "Corriger",
      paragraphs: [
        "Le script et ses dossiers appartiennent à root (chown root:root) avec des droits stricts (chmod 700 ou 750, dossier en 755 au maximum).",
        "Utiliser des chemins absolus dans le script, et faire tourner la tâche avec un compte dédié aux droits minimum quand root n'est pas nécessaire.",
      ],
    },
    {
      title: "Surveiller",
      paragraphs: [
        "Un audit régulier liste les fichiers appelés par cron et leurs droits. auditd peut alerter sur toute écriture dans /etc/cron* et dans les scripts concernés.",
        "Les guides de durcissement (ANSSI, CIS) incluent ces vérifications.",
      ],
    },
  ],
  keyPoints: [
    "Une tâche cron root exécute ce que contient le script, quel qu'en soit l'auteur.",
    "Script et dossier modifiables par d'autres = élévation de privilèges.",
    "root:root, droits 700/750, chemins absolus.",
    "Surveiller les écritures dans /etc/cron* et les scripts.",
  ],
  quiz: [
    {
      question: "Que signifie « 0 0 * * * root /opt/x.sh » ?",
      options: ["root lance x.sh chaque jour à minuit", "x.sh est supprimé chaque jour", "x.sh tourne toutes les minutes"],
      correct: 0,
      explanation: "Minute 0, heure 0, tous les jours, en tant que root.",
    },
    {
      question: "Pourquoi un script cron en -rwxrwxrwx est-il dangereux ?",
      options: ["Il est plus lent", "Tout utilisateur peut y ajouter des commandes que root exécutera", "Il ne s'exécute pas"],
      correct: 1,
      explanation: "Le dernier groupe rwx donne l'écriture à tout le monde.",
    },
    {
      question: "Que faut-il vérifier en plus des droits du script ?",
      options: ["Les droits du dossier qui le contient", "La couleur du terminal", "La taille du fichier"],
      correct: 0,
      explanation: "Un dossier modifiable permet de remplacer le script.",
    },
  ],
  sources: [
    { label: "ANSSI – Recommandations de configuration d'un système GNU/Linux", url: "https://cyber.gouv.fr/publications/recommandations-de-securite-relatives-un-systeme-gnulinux" },
    { label: "man 5 crontab", url: "https://man7.org/linux/man-pages/man5/crontab.5.html" },
  ],
};
