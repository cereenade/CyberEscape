import type { Lesson } from "@/lib/types";

export const FORENSIQUE_WINDOWS: Lesson = {
  slug: "forensique-windows",
  title: "Forensique Windows : les traces qui restent",
  icon: "🧬",
  theme: "systeme",
  level: "avance",
  summary: "Prefetch, Amcache, registre, navigateur : prouver ce qui s'est passé sur un poste.",
  duration: "11 min",
  objectives: [
    "Connaître les principaux artefacts d'exécution",
    "Retrouver l'origine d'un fichier téléchargé",
    "Préserver les preuves dans le bon ordre",
  ],
  sections: [
    {
      title: "Prouver une exécution",
      paragraphs: [
        "Prefetch (C:\\Windows\\Prefetch) garde le nom des programmes lancés, leur nombre d'exécutions et les dernières dates, même après suppression.",
        "Amcache conserve chemins et hashs SHA-1 ; UserAssist (registre) trace les programmes lancés depuis l'interface.",
      ],
    },
    {
      title: "Retrouver l'origine",
      paragraphs: [
        "L'historique du navigateur (bases SQLite) garde les téléchargements et la page référente.",
        "Le flux Zone.Identifier attaché aux fichiers téléchargés contient souvent l'URL d'origine.",
      ],
      example: "[ZoneTransfer]\nZoneId=3\nHostUrl=https://update-navigateur.example/setup.exe",
    },
    {
      title: "Les journaux et la persistance",
      paragraphs: [
        "Journaux Sécurité (4624, 4688), Système (7045), PowerShell (4104), Sysmon : ils racontent qui a fait quoi.",
        "Persistance : clés Run, tâches planifiées, services, abonnements WMI.",
      ],
    },
    {
      title: "Préserver les preuves",
      paragraphs: [
        "On collecte du plus volatil au moins volatil : mémoire, connexions réseau, processus, puis disque.",
        "Chaque copie est hachée et documentée (chaîne de traçabilité) ; on travaille sur des copies, jamais sur l'original.",
      ],
    },
  ],
  keyPoints: [
    "Prefetch, Amcache et UserAssist prouvent une exécution.",
    "Zone.Identifier et l'historique révèlent l'origine d'un téléchargement.",
    "Journaux et emplacements de persistance complètent le tableau.",
    "Collecte du plus volatil au moins volatil, copies hachées.",
  ],
  quiz: [
    {
      question: "Quel artefact garde le hash SHA-1 des exécutables ?",
      options: ["Prefetch", "Amcache", "La corbeille"],
      correct: 1,
      explanation: "Amcache stocke chemins, dates et hashs.",
    },
    {
      question: "Que collecter en premier sur un poste allumé ?",
      options: ["Le disque dur", "La mémoire vive", "Les imprimantes"],
      correct: 1,
      explanation: "Elle disparaît à l'extinction.",
    },
    {
      question: "Où trouver souvent l'URL d'origine d'un fichier téléchargé ?",
      options: ["Dans le flux Zone.Identifier", "Dans le fond d'écran", "Dans le BIOS"],
      correct: 0,
      explanation: "Windows y note la zone et l'URL de provenance.",
    },
  ],
};
