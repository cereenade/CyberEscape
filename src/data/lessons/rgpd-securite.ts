import type { Lesson } from "@/lib/types";

export const RGPD_SECURITE: Lesson = {
  slug: "rgpd-securite",
  title: "Le RGPD pour les équipes sécurité",
  icon: "🇪🇺",
  theme: "grc",
  level: "intermediaire",
  summary: "Ce que le règlement européen sur les données personnelles exige concrètement des équipes cyber.",
  duration: "9 min",
  objectives: [
    "Connaître les grands principes du RGPD",
    "Comprendre l'obligation de sécurité (article 32)",
    "Savoir réagir à une violation de données",
  ],
  sections: [
    {
      title: "Les principes",
      paragraphs: [
        "Les données personnelles doivent être collectées pour un but précis, limitées au nécessaire, exactes, conservées pour une durée limitée et protégées.",
        "Chaque traitement est inscrit au registre des traitements tenu par l'organisation.",
      ],
    },
    {
      title: "L'obligation de sécurité",
      paragraphs: [
        "L'article 32 impose des mesures adaptées au risque : pseudonymisation et chiffrement, confidentialité, intégrité, disponibilité, capacité de restaurer, tests réguliers des mesures.",
        "La protection des données dès la conception (privacy by design) s'applique aussi aux projets techniques.",
      ],
    },
    {
      title: "L'AIPD",
      paragraphs: [
        "Pour un traitement susceptible d'engendrer un risque élevé pour les personnes (données de santé à grande échelle, surveillance…), une analyse d'impact (AIPD) est obligatoire avant sa mise en œuvre.",
        "La CNIL publie la liste des traitements concernés et un outil gratuit pour la réaliser.",
      ],
    },
    {
      title: "La violation de données",
      paragraphs: [
        "En cas de violation, notification à la CNIL dans les 72 heures, sauf si elle est peu susceptible d'engendrer un risque ; information des personnes si le risque est élevé ; inscription au registre des violations dans tous les cas.",
        "Les sanctions peuvent atteindre 20 millions d'euros ou 4 % du chiffre d'affaires annuel mondial.",
      ],
    },
  ],
  keyPoints: [
    "Finalité, minimisation, durée limitée, sécurité.",
    "Article 32 : mesures adaptées au risque, testées régulièrement.",
    "AIPD obligatoire pour les traitements à risque élevé.",
    "Violation : CNIL sous 72 h, personnes si risque élevé, registre toujours.",
  ],
  quiz: [
    {
      question: "Quel article du RGPD impose la sécurité des traitements ?",
      options: ["L'article 32", "L'article 1", "L'article 99"],
      correct: 0,
      explanation: "Il liste notamment chiffrement, disponibilité et tests réguliers.",
    },
    {
      question: "Sous quel délai notifier une violation à la CNIL ?",
      options: ["24 heures", "72 heures", "1 mois"],
      correct: 1,
      explanation: "72 heures après en avoir pris connaissance.",
    },
    {
      question: "Quand une AIPD est-elle obligatoire ?",
      options: ["Pour tout traitement", "Pour un traitement à risque élevé pour les personnes", "Jamais"],
      correct: 1,
      explanation: "Elle se fait avant la mise en œuvre du traitement.",
    },
  ],
  sources: [
    { label: "CNIL – Le règlement général sur la protection des données", url: "https://www.cnil.fr/fr/reglement-europeen-protection-donnees" },
    { label: "CNIL – Notifier une violation de données personnelles", url: "https://www.cnil.fr/fr/notifier-une-violation-de-donnees-personnelles" },
  ],
};
