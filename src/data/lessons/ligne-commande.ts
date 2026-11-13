import type { Lesson } from "@/lib/types";

export const LIGNE_COMMANDE: Lesson = {
  slug: "ligne-commande",
  title: "Premiers pas en ligne de commande",
  icon: "⌨️",
  theme: "systeme",
  level: "debutant",
  summary: "Naviguer, lire et chercher dans des fichiers : les commandes de base de tout analyste.",
  duration: "8 min",
  objectives: [
    "Se déplacer dans les dossiers et comprendre les chemins",
    "Lire et chercher dans des fichiers de journaux",
    "Enchaîner les commandes avec des tubes",
  ],
  sections: [
    {
      title: "Se déplacer",
      paragraphs: [
        "pwd affiche le dossier courant, ls liste son contenu (ls -a montre aussi les fichiers cachés, qui commencent par un point), cd change de dossier.",
        "« .. » désigne le dossier parent et « . » le dossier courant. Un chemin absolu commence par / ; un chemin relatif part d'où l'on est.",
      ],
      example: "pwd\nls -la\ncd /var/log\ncd ..",
    },
    {
      title: "Lire un fichier",
      paragraphs: [
        "cat affiche tout le fichier, less permet de le parcourir, head et tail montrent le début et la fin.",
        "tail -f suit un journal en direct : idéal pour voir arriver des événements.",
      ],
    },
    {
      title: "Chercher",
      paragraphs: [
        "grep affiche les lignes qui contiennent un motif : -i ignore la casse, -c compte, -v inverse.",
        "Les expressions régulières décrivent des motifs : \\d pour un chiffre, + pour « une ou plusieurs fois », ^ et $ pour le début et la fin de ligne.",
      ],
      example: "grep \"Failed password\" /var/log/auth.log | wc -l",
    },
    {
      title: "Enchaîner",
      paragraphs: [
        "Le tube « | » envoie la sortie d'une commande à la suivante. sort trie, uniq -c compte les doublons, wc -l compte les lignes.",
        "Exemple classique : extraire les IP d'un journal, les trier et compter les plus fréquentes.",
      ],
      example: "grep \"Failed\" auth.log | awk '{print $11}' | sort | uniq -c | sort -nr | head",
    },
  ],
  keyPoints: [
    "pwd, ls, cd pour se déplacer ; « .. » remonte d'un dossier.",
    "cat, less, head, tail pour lire.",
    "grep et les expressions régulières pour chercher.",
    "Le tube | enchaîne les commandes.",
  ],
  quiz: [
    {
      question: "Quelle commande affiche aussi les fichiers cachés ?",
      options: ["ls", "ls -a", "cd -h"],
      correct: 1,
      explanation: "-a affiche les fichiers dont le nom commence par un point.",
    },
    {
      question: "Que fait « grep -c erreur app.log » ?",
      options: ["Supprime les erreurs", "Compte les lignes contenant « erreur »", "Crée un fichier"],
      correct: 1,
      explanation: "-c compte au lieu d'afficher.",
    },
    {
      question: "Depuis /var/www/site, « cd ../.. » mène à…",
      options: ["/var", "/var/www", "/"],
      correct: 0,
      explanation: "site → www → var.",
    },
  ],
};
