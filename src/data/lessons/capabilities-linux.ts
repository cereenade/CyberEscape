import type { Lesson } from "@/lib/types";

export const CAPABILITIES_LINUX: Lesson = {
  slug: "capabilities-linux",
  title: "Les capabilities Linux",
  icon: "🧩",
  theme: "systeme",
  level: "intermediaire",
  summary: "Découper les pouvoirs de root en petits morceaux : une bonne idée, à condition de ne pas donner les mauvais.",
  duration: "7 min",
  objectives: [
    "Comprendre ce que sont les capabilities",
    "Distinguer les capacités anodines des dangereuses",
    "Auditer et nettoyer un serveur",
  ],
  sections: [
    {
      title: "Root découpé en morceaux",
      paragraphs: [
        "Historiquement, un programme était soit tout-puissant (root ou SUID root), soit limité. Les capabilities découpent les pouvoirs de root en une quarantaine de droits séparés.",
        "Exemple : cap_net_bind_service permet d'écouter sur un port inférieur à 1024 sans être root. C'est plus sûr qu'un serveur web lancé en root.",
      ],
    },
    {
      title: "Les capacités à surveiller",
      paragraphs: [
        "Certaines capacités suffisent à redevenir root : cap_setuid (changer d'identité), cap_sys_admin (presque tout), cap_dac_override (ignorer les droits des fichiers), cap_sys_ptrace (lire la mémoire des autres processus).",
        "Sur un interpréteur (python, perl, node) ou un éditeur, elles sont très dangereuses : n'importe quel utilisateur qui le lance peut s'en servir.",
      ],
      example: "/usr/bin/python3.11 cap_setuid=ep → à retirer immédiatement.",
    },
    {
      title: "Auditer et corriger",
      paragraphs: [
        "La commande getcap -r / liste tous les fichiers qui ont des capacités. Compare le résultat à une référence connue.",
        "Retire une capacité inutile avec setcap -r, et accorde le strict minimum (moindre privilège).",
        "Pour les services, préfère les options de systemd (CapabilityBoundingSet, AmbientCapabilities) et surveille les changements avec auditd ou un EDR.",
      ],
    },
  ],
  keyPoints: [
    "Les capabilities remplacent avantageusement le SUID root… si elles sont bien choisies.",
    "cap_setuid, cap_sys_admin, cap_dac_override sur un interpréteur ≈ root.",
    "Audit régulier avec getcap, nettoyage avec setcap -r.",
  ],
  quiz: [
    {
      question: "À quoi sert cap_net_bind_service ?",
      options: ["Écouter sur un port inférieur à 1024", "Lire tous les fichiers", "Changer d'utilisateur"],
      correct: 0,
      explanation: "Un serveur web peut ainsi utiliser le port 443 sans être root.",
    },
    {
      question: "Quelle situation est la plus risquée ?",
      options: ["ping avec cap_net_raw", "python avec cap_setuid", "un serveur web avec cap_net_bind_service"],
      correct: 1,
      explanation: "Un interpréteur qui peut changer d'UID permet de devenir root.",
    },
    {
      question: "Quelle commande liste les capacités des fichiers ?",
      options: ["getcap", "chmod", "whoami"],
      correct: 0,
      explanation: "getcap -r / parcourt tout le système.",
    },
  ],
  sources: [{ label: "capabilities(7) — Linux manual page", url: "https://man7.org/linux/man-pages/man7/capabilities.7.html" }],
};
