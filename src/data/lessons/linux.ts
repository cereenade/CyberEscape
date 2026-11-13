import type { Lesson } from "@/lib/types";

export const LINUX: Lesson = {
  slug: "linux",
  title: "Linux pour l'analyste",
  icon: "🐧",
  theme: "systeme",
  level: "intermediaire",
  summary: "Les commandes et les fichiers à connaître pour enquêter sur un serveur Linux.",
  duration: "8 min",
  objectives: [
    "Utiliser les commandes de base pour explorer un système",
    "Savoir où chercher les traces d'une intrusion",
    "Repérer les mécanismes de persistance sous Linux",
  ],
  sections: [
    {
      title: "Se repérer",
      paragraphs: [
        "ls -la liste les fichiers (cachés compris) avec leurs droits, cat affiche un fichier, grep cherche un mot, find cherche des fichiers, ps aux liste les processus.",
        "whoami et id indiquent avec quel compte et quels groupes tu travailles. sudo -l liste ce que ton compte peut lancer en root.",
      ],
      example: "grep \"Failed password\" /var/log/auth.log | wc -l\n→ compte les échecs de connexion SSH",
    },
    {
      title: "Les journaux",
      paragraphs: [
        "/var/log/auth.log (ou secure) : connexions et utilisation de sudo. /var/log/syslog : messages du système. Les journaux du serveur web dans /var/log/nginx ou /var/log/apache2.",
        "journalctl interroge les journaux de systemd. last affiche l'historique des connexions.",
      ],
    },
    {
      title: "Les traces d'un attaquant",
      paragraphs: [
        "Fichiers récents dans /tmp ou /dev/shm, processus au nom bizarre ou lancé depuis un dossier inhabituel, connexions sortantes inconnues (ss -tunap).",
        "L'historique des commandes (~/.bash_history) révèle souvent ce qu'a fait l'attaquant, sauf s'il l'a effacé.",
      ],
    },
    {
      title: "La persistance sous Linux",
      paragraphs: [
        "Tâches cron (crontab -l, /etc/cron.*), services systemd ajoutés, clés SSH dans ~/.ssh/authorized_keys, comptes créés ou ajoutés au groupe sudo.",
        "Après un incident, il faut tous les vérifier : changer un mot de passe ne suffit pas si une clé SSH a été ajoutée.",
      ],
    },
  ],
  keyPoints: [
    "ls -la, grep, find, ps aux et ss sont les premiers réflexes d'enquête.",
    "/var/log/auth.log raconte les connexions et l'usage de sudo.",
    "/tmp, les processus inhabituels et l'historique bash trahissent un intrus.",
    "Persistance Linux : cron, systemd, authorized_keys, comptes ajoutés à sudo.",
  ],
  quiz: [
    {
      question: "Quel fichier consulter pour voir les connexions SSH ?",
      options: ["/etc/passwd", "/var/log/auth.log", "/home/README"],
      correct: 1,
      explanation: "auth.log enregistre les authentifications et l'usage de sudo.",
    },
    {
      question: "Où un attaquant peut-il ajouter une clé pour revenir en SSH ?",
      options: ["~/.ssh/authorized_keys", "/var/log/syslog", "/tmp/cache"],
      correct: 0,
      explanation: "Une clé ajoutée là donne un accès sans mot de passe.",
    },
    {
      question: "Quelle commande liste les processus en cours ?",
      options: ["ls -la", "ps aux", "cat"],
      correct: 1,
      explanation: "ps aux affiche tous les processus et leurs utilisateurs.",
    },
  ],
};
