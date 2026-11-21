import type { Lesson } from "@/lib/types";

export const ALWAYS_INSTALL_ELEVATED: Lesson = {
  slug: "always-install-elevated",
  title: "AlwaysInstallElevated : l'installateur trop puissant",
  icon: "📦",
  theme: "systeme",
  level: "intermediaire",
  summary: "Un réglage Windows qui transforme chaque paquet MSI en ticket d'entrée administrateur : le comprendre, le repérer, le désactiver.",
  duration: "6 min",
  objectives: [
    "Comprendre l'effet de la stratégie AlwaysInstallElevated",
    "Savoir la repérer dans le registre",
    "Mettre en place une alternative sûre pour installer des logiciels",
  ],
  sections: [
    {
      title: "Un réglage pensé pour dépanner",
      paragraphs: [
        "Windows Installer peut, grâce à la stratégie AlwaysInstallElevated, installer des paquets .msi avec les droits SYSTEM, même lancés par un utilisateur standard.",
        "Le but initial : permettre aux utilisateurs d'installer des logiciels sans appeler le support.",
      ],
    },
    {
      title: "Pourquoi c'est dangereux",
      paragraphs: [
        "La stratégie s'applique quand la valeur vaut 1 à la fois dans HKLM et dans HKCU (SOFTWARE\\Policies\\Microsoft\\Windows\\Installer).",
        "N'importe quel paquet MSI, y compris un paquet fabriqué par un utilisateur malveillant, s'exécute alors avec les pleins pouvoirs.",
        "C'est l'une des premières vérifications des auditeurs lors d'un test d'élévation de privilèges Windows.",
      ],
    },
    {
      title: "Repérer et corriger",
      paragraphs: [
        "Vérifier les deux clés sur un échantillon de postes, ou mieux, dans les rapports de conformité du parc.",
        "Désactiver la stratégie dans la GPO concernée (Configuration ordinateur et Configuration utilisateur) : corriger seulement un poste ne suffit pas, la GPO la réappliquerait.",
        "Pour les installations légitimes, utiliser un outil de déploiement centralisé ou un catalogue de logiciels validés.",
      ],
    },
  ],
  keyPoints: [
    "AlwaysInstallElevated = tout MSI en SYSTEM.",
    "Dangereux quand la valeur vaut 1 dans HKLM ET HKCU.",
    "Se corrige dans la GPO, pas poste par poste.",
    "Les installations passent par un outil de déploiement maîtrisé.",
  ],
  quiz: [
    {
      question: "Quand la stratégie est-elle effective ?",
      options: ["Quand la valeur vaut 1 dans HKLM seulement", "Quand la valeur vaut 1 dans HKLM et dans HKCU", "Quand le poste a plus de 8 Go de mémoire"],
      correct: 1,
      explanation: "Les deux valeurs doivent être activées.",
    },
    {
      question: "Quel est le risque principal ?",
      options: ["Un ralentissement des installations", "Un utilisateur standard peut obtenir les droits SYSTEM", "La perte des mises à jour Windows"],
      correct: 1,
      explanation: "Un paquet MSI fabriqué sur mesure s'exécute avec les pleins pouvoirs.",
    },
    {
      question: "Où corriger durablement ce réglage ?",
      options: ["Dans la GPO qui l'applique", "Dans le pare-feu", "Dans le navigateur"],
      correct: 0,
      explanation: "Sinon la valeur est réappliquée au prochain rafraîchissement des stratégies.",
    },
  ],
  sources: [
    { label: "Microsoft Learn : AlwaysInstallElevated", url: "https://learn.microsoft.com/fr-fr/windows/win32/msi/alwaysinstallelevated" },
  ],
};
