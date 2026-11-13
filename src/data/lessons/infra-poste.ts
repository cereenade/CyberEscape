import type { Lesson } from "@/lib/types";

export const INFRA_POSTE: Lesson = {
  slug: "infra-poste",
  title: "Le poste de travail sécurisé",
  icon: "💻",
  theme: "infra",
  level: "intermediaire",
  summary: "Le poste utilisateur est la première cible : chiffrement, EDR, contrôle des applications et des périphériques.",
  duration: "8 min",
  objectives: [
    "Connaître les protections essentielles d'un poste",
    "Comprendre le rôle d'un EDR",
    "Limiter l'exécution de programmes non autorisés",
  ],
  sections: [
    {
      title: "Les bases",
      paragraphs: [
        "Système et logiciels à jour, utilisateur sans droits d'administrateur, pare-feu local actif, verrouillage automatique de session.",
        "Chiffrement du disque (BitLocker, FileVault, LUKS) : un portable volé ne livre pas ses données.",
      ],
    },
    {
      title: "L'EDR",
      paragraphs: [
        "Un EDR (Endpoint Detection and Response) surveille en continu les processus, fichiers et connexions du poste.",
        "Il détecte les comportements suspects (Word qui lance PowerShell, chiffrement massif) et permet d'isoler le poste à distance.",
      ],
    },
    {
      title: "Contrôler ce qui s'exécute",
      paragraphs: [
        "Le contrôle d'applications (AppLocker, WDAC) n'autorise que les programmes approuvés, ce qui bloque la plupart des malwares.",
        "Bloquer les macros des documents venant d'Internet et les scripts inutiles réduit fortement les infections par mail.",
      ],
    },
    {
      title: "Les périphériques et la navigation",
      paragraphs: [
        "Contrôle des clés USB et des nouveaux périphériques ; navigateur à jour avec extensions validées.",
        "Le tout piloté de façon centralisée (MDM, stratégies de groupe) pour que chaque poste reste conforme.",
      ],
    },
  ],
  keyPoints: [
    "À jour, sans droits admin, disque chiffré, session verrouillée.",
    "L'EDR détecte les comportements et isole le poste.",
    "Contrôle d'applications et macros bloquées.",
    "Gestion centralisée pour garder les postes conformes.",
  ],
  quiz: [
    {
      question: "Que protège le chiffrement du disque ?",
      options: ["Les données d'un portable perdu ou volé", "La connexion Wi-Fi", "Les mails envoyés"],
      correct: 0,
      explanation: "Sans la clé, le disque est illisible.",
    },
    {
      question: "Word lance PowerShell. Quel outil le repère ?",
      options: ["Un EDR", "Un traitement de texte", "Un disque dur"],
      correct: 0,
      explanation: "L'EDR surveille les relations entre processus.",
    },
    {
      question: "Que fait le contrôle d'applications ?",
      options: ["Il n'autorise que les programmes approuvés", "Il accélère le démarrage", "Il sauvegarde les fichiers"],
      correct: 0,
      explanation: "Un malware inconnu ne peut pas s'exécuter.",
    },
  ],
  sources: [
    { label: "ANSSI – Guides MesServicesCyber (dont le guide d'hygiène informatique)", url: "https://messervices.cyber.gouv.fr" },
    { label: "CIS Benchmarks – systèmes d'exploitation", url: "https://www.cisecurity.org/cis-benchmarks" },
  ],
};
