import type { Lesson } from "@/lib/types";

export const APPLIS_OFFICIELLES: Lesson = {
  slug: "applis-officielles",
  title: "Installer ses applis en sécurité",
  icon: "📲",
  theme: "bases",
  level: "debutant",
  summary: "Pourquoi les boutiques officielles protègent mieux, et comment repérer une appli douteuse avant de l'installer.",
  duration: "5 min",
  objectives: [
    "Comprendre les risques d'une appli installée hors boutique",
    "Repérer une appli douteuse avant de l'installer",
    "Garder les protections du téléphone activées",
  ],
  sections: [
    {
      title: "Ce que font les boutiques officielles",
      paragraphs: [
        "L'App Store et Google Play analysent les applis avant de les publier, et retirent celles qui se révèlent dangereuses.",
        "Ce contrôle n'est pas parfait, mais il élimine une grande partie des logiciels espions et des fausses applis.",
      ],
    },
    {
      title: "Le piège du fichier d'installation",
      paragraphs: [
        "Sur Android, une appli peut s'installer depuis un fichier APK reçu par lien ou par message. Ce fichier ne passe par aucun contrôle.",
        "Les escrocs promettent une avant-première, une version gratuite d'une appli payante ou une mise à jour urgente, et te demandent d'autoriser les « sources inconnues ».",
        "Une fois installée, une appli piégée peut lire tes SMS (et donc tes codes de connexion), afficher de fausses pages bancaires ou t'espionner.",
      ],
    },
    {
      title: "Vérifier avant d'installer",
      paragraphs: [
        "Même dans une boutique officielle, regarde le nom exact de l'éditeur, le nombre de téléchargements et les avis récents.",
        "Méfie-toi d'une lampe torche ou d'un jeu qui demande l'accès à tes SMS, à tes contacts ou à l'accessibilité.",
        "Laisse activées les protections intégrées (Google Play Protect, blocage des sources inconnues).",
      ],
    },
  ],
  keyPoints: [
    "Installe tes applis uniquement depuis les boutiques officielles.",
    "Un fichier APK reçu par lien est un signal d'alerte.",
    "Ne désactive jamais une protection pour une promesse alléchante.",
    "Vérifie l'éditeur et les permissions demandées.",
  ],
  quiz: [
    {
      question: "On te propose d'installer un jeu en avant-première depuis un lien direct. Que fais-tu ?",
      options: ["Tu l'installes vite avant la fin de l'offre", "Tu attends sa sortie sur la boutique officielle", "Tu désactives l'antivirus pour que ça marche"],
      correct: 1,
      explanation: "Un fichier hors boutique n'est contrôlé par personne : attends la vraie sortie.",
    },
    {
      question: "Pourquoi les escrocs demandent-ils d'autoriser les « sources inconnues » ?",
      options: ["Pour accélérer le téléchargement", "Pour installer une appli qui n'a passé aucun contrôle", "Pour économiser de la batterie"],
      correct: 1,
      explanation: "Cette protection bloque justement les applis non vérifiées.",
    },
    {
      question: "Une appli lampe torche demande l'accès à tes SMS. C'est…",
      options: ["Normal, toutes les applis le demandent", "Suspect : elle n'en a aucun besoin", "Obligatoire pour allumer le flash"],
      correct: 1,
      explanation: "Une permission sans rapport avec la fonction de l'appli doit t'alerter.",
    },
  ],
  sources: [
    { label: "ANSSI : Recommandations de sécurité relatives aux ordiphones", url: "https://cyber.gouv.fr/publications/recommandations-de-securite-relatives-aux-ordiphones" },
    { label: "Cybermalveillance.gouv.fr : Sécuriser son smartphone", url: "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/bonnes-pratiques/securite-smartphones-tablettes" },
  ],
};
