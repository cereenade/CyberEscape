import type { Lesson } from "@/lib/types";

export const PRIVILEGES_LINUX: Lesson = {
  slug: "privileges-linux",
  title: "L'élévation de privilèges sous Linux",
  icon: "🐧",
  theme: "systeme",
  level: "intermediaire",
  summary: "Comment un simple utilisateur devient root, et comment fermer ces portes.",
  duration: "9 min",
  objectives: [
    "Repérer les mauvaises configurations sudo et SUID",
    "Trouver les secrets laissés sur un système",
    "Durcir un serveur Linux contre ces techniques",
  ],
  sections: [
    {
      title: "sudo et SUID",
      paragraphs: [
        "sudo -l liste les commandes autorisées en root. find, vim, less ou tar peuvent lancer un shell : les autoriser en sudo revient à donner root.",
        "Un programme SUID (le « s » dans -rwsr-xr-x) s'exécute avec les droits de son propriétaire. find / -perm -4000 les liste pour les auditer.",
      ],
      example: "sudo -l\n(root) NOPASSWD: /usr/bin/find\nfind / -perm -4000 -type f 2>/dev/null",
    },
    {
      title: "Les secrets oubliés",
      paragraphs: [
        "Historique des commandes (.bash_history), fichiers de configuration, scripts de sauvegarde : les mots de passe en clair y traînent souvent.",
        "Une clé privée SSH lisible par tous (644 au lieu de 600) n'est plus privée.",
      ],
    },
    {
      title: "Tâches et chemins",
      paragraphs: [
        "Un script lancé par root via cron, mais modifiable par un utilisateur, est une porte vers root.",
        "Un script root qui appelle une commande sans chemin complet peut être détourné via le PATH.",
      ],
    },
    {
      title: "Durcir",
      paragraphs: [
        "Moindre privilège pour sudo, audit régulier des SUID, droits stricts sur les scripts et les clés, mises à jour du noyau.",
        "auditd et l'envoi des journaux au SIEM permettent de détecter les tentatives.",
      ],
    },
  ],
  keyPoints: [
    "Un programme capable de lancer un shell ne doit pas être autorisé en sudo.",
    "Les fichiers SUID s'auditent régulièrement.",
    "Pas de mot de passe en clair dans l'historique ou les scripts ; clés privées en 600.",
    "Chemins complets et droits stricts dans les tâches root.",
  ],
  quiz: [
    {
      question: "sudo -l affiche « (root) NOPASSWD: /usr/bin/vim ». Risque ?",
      options: ["Aucun, c'est un éditeur", "Élevé : vim peut lancer un shell root", "Seulement si vim est à jour"],
      correct: 1,
      explanation: "Depuis vim, :!sh ouvre un shell avec les droits de root.",
    },
    {
      question: "Quels droits pour une clé privée SSH ?",
      options: ["600", "644", "777"],
      correct: 0,
      explanation: "Seul le propriétaire peut la lire et l'écrire.",
    },
    {
      question: "Que signifie le « s » dans -rwsr-xr-x ?",
      options: ["Fichier secret", "Bit SUID", "Fichier sauvegardé"],
      correct: 1,
      explanation: "Le programme s'exécute avec les droits de son propriétaire.",
    },
  ],
};
