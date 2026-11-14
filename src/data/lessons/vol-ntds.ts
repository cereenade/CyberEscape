import type { Lesson } from "@/lib/types";

export const VOL_NTDS: Lesson = {
  slug: "vol-ntds",
  title: "Détecter et gérer le vol de NTDS.dit",
  icon: "🗄️",
  theme: "soc",
  level: "avance",
  summary: "La base Active Directory contient les hachages de tous les comptes : repère les copies suspectes et réagis correctement.",
  duration: "10 min",
  objectives: [
    "Savoir ce que contient NTDS.dit",
    "Repérer les méthodes de copie dans les journaux",
    "Conduire la réponse après une extraction",
  ],
  sections: [
    {
      title: "Le coffre-fort du domaine",
      paragraphs: [
        "NTDS.dit est la base Active Directory stockée sur chaque contrôleur de domaine.",
        "Elle contient les hachages des mots de passe de tous les comptes, y compris krbtgt et les administrateurs.",
        "Avec ces hachages, un attaquant peut se faire passer pour n'importe qui dans le domaine.",
      ],
    },
    {
      title: "Comment elle est copiée",
      paragraphs: [
        "Le fichier est verrouillé pendant que Windows tourne. Les attaquants utilisent donc des outils d'administration détournés.",
        "ntdsutil avec l'option IFM crée une copie complète, prévue à l'origine pour installer un contrôleur depuis un support.",
        "Un cliché instantané (shadow copy) permet aussi de copier le fichier verrouillé, ainsi que la ruche SYSTEM nécessaire pour le déchiffrer.",
        "La réplication (DCSync) récupère les mêmes secrets à distance, sans toucher au fichier.",
      ],
      example: "ntdsutil \"ac i ntds\" \"ifm\" \"create full C:\\Windows\\Temp\\x\" q q",
    },
    {
      title: "Ce qu'il faut surveiller",
      paragraphs: [
        "Création de processus (4688 ou Sysmon 1) : ntdsutil, vssadmin, diskshadow lancés sur un contrôleur de domaine.",
        "Fichiers .dit ou ruche SYSTEM qui apparaissent hors de leur emplacement normal.",
        "Comptes de service qui agissent à des heures inhabituelles ou depuis un poste inhabituel.",
      ],
    },
    {
      title: "Réagir",
      paragraphs: [
        "Isole la machine et cherche si les fichiers sont sortis (partages, transferts réseau).",
        "Considère tous les mots de passe du domaine comme compromis.",
        "Réinitialise krbtgt deux fois, avec un délai entre les deux, pour invalider les tickets forgés.",
        "Réinitialise les comptes à privilèges et les comptes de service, puis renforce la surveillance des contrôleurs.",
      ],
    },
  ],
  keyPoints: [
    "NTDS.dit = les hachages de tout le domaine.",
    "ntdsutil IFM, clichés instantanés et DCSync sont les méthodes classiques.",
    "Surveille les créations de processus sur les contrôleurs de domaine.",
    "Après un vol : krbtgt réinitialisé deux fois et comptes sensibles changés.",
  ],
  quiz: [
    {
      question: "Que contient NTDS.dit ?",
      options: ["Les journaux d'événements", "Les hachages des mots de passe du domaine", "Les mises à jour Windows"],
      correct: 1,
      explanation: "C'est la base Active Directory.",
    },
    {
      question: "Pourquoi la ruche SYSTEM est-elle souvent copiée en même temps ?",
      options: ["Elle contient la clé qui permet de déchiffrer la base", "Elle accélère la copie", "Elle cache la copie"],
      correct: 0,
      explanation: "Sans elle, les hachages restent chiffrés.",
    },
    {
      question: "Combien de fois réinitialiser krbtgt après une compromission ?",
      options: ["Une fois", "Deux fois, avec un délai entre les deux", "Jamais"],
      correct: 1,
      explanation: "L'ancien mot de passe reste valide une fois : il faut deux changements.",
    },
  ],
};
