import type { Lesson } from "@/lib/types";

export const CANAUX_NOMMES: Lesson = {
  slug: "canaux-nommes",
  title: "Détecter les canaux nommés suspects",
  icon: "🔀",
  theme: "soc",
  level: "avance",
  summary: "Les named pipes servent aux processus Windows pour communiquer… et aux attaquants pour se déplacer discrètement.",
  duration: "8 min",
  objectives: [
    "Comprendre ce qu'est un canal nommé",
    "Exploiter les événements Sysmon 17 et 18",
    "Distinguer le normal du suspect",
  ],
  sections: [
    {
      title: "Un tuyau entre processus",
      paragraphs: [
        "Un canal nommé (named pipe) est un tuyau de communication identifié par un nom, comme \\\\.\\pipe\\spoolss. Deux processus peuvent s'y parler, sur la même machine ou à travers le réseau via SMB.",
        "Windows et les logiciels légitimes en créent en permanence : impression, services, antivirus, navigateurs.",
      ],
    },
    {
      title: "Pourquoi les attaquants les aiment",
      paragraphs: [
        "Les outils de prise de contrôle à distance (C2) s'en servent pour relier plusieurs machines compromises sans ouvrir de nouvelle connexion vers Internet.",
        "Les outils d'exécution à distance, légitimes ou détournés, créent aussi des canaux reconnaissables (PSEXESVC pour PsExec).",
      ],
    },
    {
      title: "Détecter avec Sysmon et l'EDR",
      paragraphs: [
        "Sysmon journalise la création (événement 17) et la connexion (événement 18) d'un canal, avec le processus responsable.",
        "Signaux d'alerte : nom aléatoire ou imitant un nom légitime, processus inattendu (rundll32, Office, PowerShell), outil d'administration hors de son contexte, connexion SMB entre deux postes utilisateurs.",
        "Construis une référence des canaux normaux de ton parc, puis alerte sur les écarts. Croise toujours avec l'arbre de processus et les flux réseau.",
      ],
      example: "Événement 17 : rundll32.exe crée \\\\.\\pipe\\a7f3c9e1 sans ligne de commande → à investiguer.",
    },
  ],
  keyPoints: [
    "Les canaux nommés sont partout : le contexte fait la différence.",
    "Sysmon 17 = création, 18 = connexion.",
    "Nom aléatoire + processus inattendu + trafic SMB poste à poste = alerte.",
  ],
  quiz: [
    {
      question: "Quel événement Sysmon signale la création d'un canal nommé ?",
      options: ["1", "17", "4624"],
      correct: 1,
      explanation: "17 pour la création, 18 pour la connexion.",
    },
    {
      question: "Lequel est le plus suspect ?",
      options: ["spoolsv.exe et son canal habituel", "rundll32.exe qui crée un canal au nom aléatoire", "Un antivirus qui crée son canal connu"],
      correct: 1,
      explanation: "Processus détourné et nom généré : signature d'un implant.",
    },
    {
      question: "Pourquoi un attaquant utilise-t-il un canal nommé entre deux postes ?",
      options: ["Pour éviter d'ouvrir une nouvelle connexion vers Internet", "Pour accélérer l'impression", "Pour chiffrer le disque"],
      correct: 0,
      explanation: "Il relaie ses commandes en interne, plus discrètement.",
    },
  ],
  sources: [{ label: "Microsoft Sysinternals — Sysmon", url: "https://learn.microsoft.com/sysinternals/downloads/sysmon" }],
};
