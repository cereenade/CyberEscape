import type { Lesson } from "@/lib/types";

export const PARTAGE_LOCALISATION: Lesson = {
  slug: "partage-localisation",
  title: "Maîtriser le partage de sa position",
  icon: "📍",
  theme: "humain",
  level: "debutant",
  summary: "Partager sa position en direct, c'est pratique : apprends à le faire sans te faire suivre à ton insu.",
  duration: "5 min",
  objectives: [
    "Savoir où se cachent les partages de position",
    "Partager sa position pour une durée limitée",
    "Faire le tri dans les partages oubliés",
  ],
  sections: [
    {
      title: "Où ta position est partagée",
      paragraphs: [
        "Les applis de cartes, de messagerie, de famille ou de sport proposent toutes un partage de position en direct.",
        "Certains objets, comme les traceurs Bluetooth ou les montres connectées, partagent aussi ta position.",
      ],
    },
    {
      title: "Le piège du partage sans fin",
      paragraphs: [
        "Beaucoup d'applis proposent un partage « jusqu'à désactivation ». Une fois l'événement passé, on l'oublie.",
        "Résultat : une personne peut suivre tes trajets pendant des mois, même si vous n'êtes plus proches.",
      ],
      example: "Festival → partage « jusqu'à désactivation » avec un ami → un an plus tard, il voit encore ton point bleu.",
    },
    {
      title: "Les bons réflexes",
      paragraphs: [
        "Choisis toujours une durée limitée : 1 heure, 8 heures, jusqu'à la fin du trajet.",
        "Une fois par mois, ouvre les réglages de localisation de ton téléphone et la liste des personnes qui voient ta position.",
        "Si tu penses être suivi sans ton accord (appli inconnue, traceur glissé dans ton sac), parles-en à une personne de confiance et coupe le partage.",
      ],
    },
  ],
  keyPoints: [
    "Un partage de position doit avoir une fin.",
    "Vérifie régulièrement qui voit ta position.",
    "Les applis et les objets connectés peuvent aussi partager ta position.",
  ],
  quiz: [
    {
      question: "Quelle durée choisir pour partager ta position à un ami ?",
      options: ["Jusqu'à désactivation", "Une durée limitée, le temps du besoin", "Pour toujours, c'est plus simple"],
      correct: 1,
      explanation: "Le partage s'arrête tout seul : pas de risque de l'oublier.",
    },
    {
      question: "À quelle fréquence faire le tri dans tes partages ?",
      options: ["Jamais", "Régulièrement, par exemple une fois par mois", "Seulement si tu changes de téléphone"],
      correct: 1,
      explanation: "Un contrôle régulier fait remonter les partages oubliés.",
    },
    {
      question: "Que révèle un partage de position oublié ?",
      options: ["Rien d'important", "Tes trajets, ton domicile et tes habitudes", "Seulement ta ville"],
      correct: 1,
      explanation: "Une position en direct dit où tu vis, où tu travailles et quand tu n'es pas chez toi.",
    },
  ],
};
