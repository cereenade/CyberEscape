import type { Lesson } from "@/lib/types";

export const INFRA_DURCISSEMENT: Lesson = {
  slug: "infra-durcissement",
  title: "Le durcissement des systèmes",
  icon: "🔩",
  theme: "infra",
  level: "intermediaire",
  summary: "Réduire la surface d'attaque d'un système en retirant tout ce qui n'est pas indispensable.",
  duration: "8 min",
  objectives: [
    "Comprendre le principe du durcissement",
    "Utiliser les référentiels CIS et ANSSI",
    "Vérifier et maintenir une configuration durcie",
  ],
  sections: [
    {
      title: "Le principe",
      paragraphs: [
        "Une installation par défaut active beaucoup de fonctions inutiles. Chacune est une porte d'entrée possible.",
        "Durcir, c'est désactiver les services inutiles, supprimer les comptes par défaut, appliquer des paramètres sûrs et limiter les droits.",
      ],
    },
    {
      title: "Les référentiels",
      paragraphs: [
        "Les CIS Benchmarks décrivent, système par système (Windows, Linux, navigateurs, cloud), les réglages recommandés.",
        "L'ANSSI publie aussi des guides de configuration (Linux, Active Directory, Windows) adaptés au contexte français.",
      ],
    },
    {
      title: "Exemples concrets",
      paragraphs: [
        "Désactiver SMBv1, LLMNR et les protocoles anciens ; interdire la connexion SSH directe en root ; activer le pare-feu local ; chiffrer les disques ; limiter les macros Office.",
        "Retirer les droits d'administrateur local aux utilisateurs, et utiliser un mot de passe administrateur local unique par poste (Windows LAPS).",
      ],
      example: "# /etc/ssh/sshd_config\nPermitRootLogin no\nPasswordAuthentication no",
    },
    {
      title: "Garder le cap",
      paragraphs: [
        "On définit une configuration de référence (image maîtresse, stratégies de groupe, Ansible…) appliquée à toutes les machines.",
        "Des outils d'audit vérifient régulièrement les écarts : une configuration se dégrade avec le temps.",
      ],
    },
  ],
  keyPoints: [
    "Tout ce qui est inutile est retiré ou désactivé.",
    "CIS Benchmarks et guides ANSSI donnent les réglages.",
    "Pas d'admin local pour les utilisateurs, mot de passe local unique par poste.",
    "Configuration de référence + audit régulier des écarts.",
  ],
  quiz: [
    {
      question: "Quel est l'objectif du durcissement ?",
      options: ["Rendre le système plus rapide", "Réduire la surface d'attaque", "Ajouter des fonctions"],
      correct: 1,
      explanation: "Moins de fonctions exposées, moins de portes d'entrée.",
    },
    {
      question: "Quel outil Windows gère un mot de passe administrateur local unique par poste ?",
      options: ["LAPS", "Paint", "BitLocker"],
      correct: 0,
      explanation: "Un mot de passe volé sur un poste ne sert plus sur les autres.",
    },
    {
      question: "Quels documents décrivent les réglages recommandés système par système ?",
      options: ["Les CIS Benchmarks", "Le RGPD", "Le Top 10 OWASP"],
      correct: 0,
      explanation: "Ils existent pour Windows, Linux, le cloud, les navigateurs…",
    },
  ],
  sources: [
    { label: "CIS Benchmarks", url: "https://www.cisecurity.org/cis-benchmarks" },
    { label: "ANSSI – Publications et guides", url: "https://messervices.cyber.gouv.fr" },
  ],
};
