import type { Lesson } from "@/lib/types";

export const GOUVERNANCE: Lesson = {
  slug: "gouvernance",
  title: "Risques, normes et réglementations",
  icon: "📑",
  theme: "grc",
  level: "intermediaire",
  summary: "EBIOS, ISO 27001, NIS 2, RGPD : le cadre qui organise la sécurité d'une organisation.",
  duration: "9 min",
  objectives: [
    "Comprendre la démarche d'analyse de risque",
    "Situer ISO 27001, NIS 2 et le RGPD",
    "Connaître les obligations de notification d'incident",
  ],
  sections: [
    {
      title: "Partir des risques",
      paragraphs: [
        "On ne peut pas tout protéger au même niveau : on part des valeurs métier (ce qui compte pour l'activité) et des menaces réalistes.",
        "EBIOS Risk Manager, la méthode de l'ANSSI, construit des scénarios d'attaque et aboutit à un plan de traitement priorisé. STRIDE aide à lister les menaces d'une application dès sa conception.",
      ],
    },
    {
      title: "ISO 27001",
      paragraphs: [
        "Cette norme internationale décrit un système de management de la sécurité : analyse de risques, mesures, contrôle, amélioration continue.",
        "La certification est délivrée par un organisme indépendant après audit, et souvent exigée par les grands clients.",
      ],
    },
    {
      title: "NIS 2 et le RGPD",
      paragraphs: [
        "NIS 2 impose des mesures de sécurité et la déclaration des incidents importants (alerte précoce sous 24 h, notification sous 72 h) à de nombreux secteurs.",
        "Le RGPD impose de notifier la CNIL sous 72 h en cas de violation de données personnelles, et de prévenir les personnes si le risque est élevé.",
      ],
    },
    {
      title: "L'amélioration continue",
      paragraphs: [
        "Planifier, faire, vérifier, améliorer : les audits, exercices et retours d'expérience nourrissent le cycle.",
        "La direction est responsable : la sécurité n'est pas qu'un sujet technique.",
      ],
    },
  ],
  keyPoints: [
    "On protège d'abord ce qui compte pour l'activité.",
    "ISO 27001 = un système de management certifiable.",
    "NIS 2 : alerte sous 24 h ; RGPD : CNIL sous 72 h.",
    "Un cycle d'amélioration continue piloté par la direction.",
  ],
  quiz: [
    {
      question: "Par quoi commence une analyse de risque EBIOS ?",
      options: ["Les valeurs métier", "L'achat d'un pare-feu", "Le choix d'un antivirus"],
      correct: 0,
      explanation: "On protège d'abord ce qui compte pour l'activité.",
    },
    {
      question: "Délai de notification d'une violation de données personnelles à la CNIL ?",
      options: ["24 heures", "72 heures", "1 mois"],
      correct: 1,
      explanation: "72 heures après en avoir pris connaissance.",
    },
    {
      question: "ISO 27001 est…",
      options: ["Un antivirus", "Une norme de management de la sécurité", "Un protocole réseau"],
      correct: 1,
      explanation: "Elle organise la gestion de la sécurité et se certifie.",
    },
  ],
};
