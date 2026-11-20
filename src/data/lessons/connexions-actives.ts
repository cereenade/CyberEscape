import type { Lesson } from "@/lib/types";

export const CONNEXIONS_ACTIVES: Lesson = {
  slug: "connexions-actives",
  title: "Lire les connexions actives",
  icon: "🔌",
  theme: "reseau",
  level: "intermediaire",
  summary: "netstat et ss : repérer un port en écoute ou une connexion qui n'a rien à faire là.",
  duration: "7 min",
  objectives: [
    "Lancer et lire netstat et ss",
    "Distinguer écoute locale et écoute réseau",
    "Repérer un programme suspect",
  ],
  sections: [
    {
      title: "Les commandes",
      paragraphs: [
        "Sous Linux, « ss -tulpn » liste les ports TCP (t) et UDP (u) en écoute (l), en chiffres (n), avec le programme (p). Sous Windows, « netstat -ano » affiche l'identifiant du processus.",
        "« ss -tn » ou « netstat -an » montre aussi les connexions établies vers l'extérieur.",
      ],
    },
    {
      title: "Lire les colonnes",
      paragraphs: [
        "LISTEN : un programme attend des connexions. ESTABLISHED : une connexion est en cours.",
        "L'adresse locale compte : 127.0.0.1 n'est joignable que depuis la machine ; 0.0.0.0 (ou ::) signifie toutes les interfaces, donc le réseau.",
      ],
    },
    {
      title: "Repérer l'anomalie",
      paragraphs: [
        "Compare la liste avec les services prévus. Dans la salle du serveur web, un programme « kworkerd » écoutait sur 4444 : port non prévu, nom qui imite un processus du noyau.",
        "Note le PID, regarde le chemin du programme, son parent et sa date de création, puis isole la machine si le doute persiste.",
      ],
    },
  ],
  keyPoints: [
    "ss -tulpn (Linux) et netstat -ano (Windows).",
    "LISTEN = en écoute, ESTABLISHED = connexion en cours.",
    "127.0.0.1 = local seulement ; 0.0.0.0 = tout le réseau.",
    "Tout port non prévu doit être expliqué ou fermé.",
  ],
  quiz: [
    {
      question: "Un service écoute sur 127.0.0.1:5432. Il est joignable :",
      options: ["Depuis tout Internet", "Seulement depuis la machine elle-même", "Depuis le réseau local seulement"],
      correct: 1,
      explanation: "127.0.0.1 est l'adresse de bouclage locale.",
    },
    {
      question: "Que signifie l'état ESTABLISHED ?",
      options: ["Le port est fermé", "Une connexion est en cours", "Le programme attend des connexions"],
      correct: 1,
      explanation: "LISTEN attend, ESTABLISHED échange.",
    },
    {
      question: "Quelle option de ss affiche le programme qui ouvre le port ?",
      options: ["-p", "-n", "-u"],
      correct: 0,
      explanation: "-p (process) indique le programme et son PID.",
    },
  ],
  sources: [
    { label: "Page de manuel de ss (man7.org)", url: "https://man7.org/linux/man-pages/man8/ss.8.html" },
  ],
};
