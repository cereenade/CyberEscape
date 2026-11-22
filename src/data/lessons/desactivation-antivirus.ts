import type { Lesson } from "@/lib/types";

export const DESACTIVATION_ANTIVIRUS: Lesson = {
  slug: "desactivation-antivirus",
  title: "Détecter la désactivation de l'antivirus",
  icon: "🛡️",
  theme: "soc",
  level: "avance",
  summary: "Exclusions ajoutées, protection coupée : lire les événements Microsoft Defender qui précèdent souvent un rançongiciel.",
  duration: "8 min",
  objectives: [
    "Connaître les événements Defender 5001 et 5007",
    "Reconstituer une séquence d'affaiblissement des défenses",
    "Mettre en place détection et prévention",
  ],
  sections: [
    {
      title: "Une étape classique des attaques",
      paragraphs: [
        "Avant de déposer leur charge, beaucoup d'attaquants affaiblissent les défenses : c'est la technique MITRE ATT&CK T1562.001 (Impair Defenses : désactiver ou modifier les outils).",
        "Ils ajoutent une exclusion sur un dossier, coupent la protection en temps réel ou arrêtent le service.",
      ],
    },
    {
      title: "Les événements à surveiller",
      paragraphs: [
        "Journal Microsoft-Windows-Windows Defender/Operational : 5001 = protection en temps réel désactivée ; 5007 = configuration modifiée (le détail montre l'ancienne et la nouvelle valeur, par exemple une exclusion).",
        "5010 et 5012 signalent la désactivation de l'analyse des logiciels espions et des virus. Côté processus, des commandes Set-MpPreference ou Add-MpPreference sont aussi parlantes.",
      ],
      example: "02:13:52 5007 Exclusion ajoutée : C:\\Users\\Public\n02:14:09 5001 Protection en temps réel désactivée\n02:16:40 Sysmon 11 Fichier créé C:\\Users\\Public\\upd.exe\n02:19:03 EDR Renommage massif (.locked)",
    },
    {
      title: "Trier et réagir",
      paragraphs: [
        "Un 5001 ou 5007 hors fenêtre de maintenance, sans ticket de changement, mérite une enquête immédiate. Une exclusion sur un dossier public ou temporaire est un signal fort.",
        "Si la séquence est suivie d'une création de fichier dans le dossier exclu, isole le poste et cherche le compte et le processus à l'origine du changement.",
      ],
    },
    {
      title: "Prévenir",
      paragraphs: [
        "La protection contre les falsifications (Tamper Protection) empêche de modifier Defender localement, même en administrateur.",
        "Gère les exclusions de façon centralisée, limite les droits administrateur locaux et crée une règle SIEM sur 5001/5007/5010/5012.",
      ],
    },
  ],
  keyPoints: [
    "Affaiblir l'antivirus précède souvent le rançongiciel (T1562.001).",
    "5001 = temps réel coupé ; 5007 = configuration modifiée.",
    "Exclusion + fichier créé dans le dossier exclu = alerte forte.",
    "Tamper Protection et exclusions centralisées.",
  ],
  quiz: [
    {
      question: "Quel événement indique que la protection en temps réel est coupée ?",
      options: ["5001", "4624", "7045"],
      correct: 0,
      explanation: "5001 dans le journal opérationnel de Defender.",
    },
    {
      question: "Que révèle souvent un 5007 juste avant une alerte ?",
      options: ["Une mise à jour des signatures", "Une exclusion ajoutée pour cacher un fichier", "Un redémarrage normal"],
      correct: 1,
      explanation: "5007 détaille le changement de configuration, comme une nouvelle exclusion.",
    },
    {
      question: "Quelle fonctionnalité empêche de désactiver Defender localement ?",
      options: ["Le mode avion", "La protection contre les falsifications (Tamper Protection)", "Le pare-feu"],
      correct: 1,
      explanation: "Elle bloque les modifications de Defender, même par un administrateur local.",
    },
  ],
  sources: [
    { label: "Microsoft – Event IDs de Microsoft Defender Antivirus", url: "https://learn.microsoft.com/fr-fr/defender-endpoint/troubleshoot-microsoft-defender-antivirus" },
    { label: "MITRE ATT&CK – T1562.001", url: "https://attack.mitre.org/techniques/T1562/001/" },
  ],
};
