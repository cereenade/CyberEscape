import type { Lesson } from "@/lib/types";

export const CONTINUITE_ACTIVITE: Lesson = {
  slug: "continuite-activite",
  title: "Continuité d'activité et gestion de crise",
  icon: "🧯",
  theme: "grc",
  level: "intermediaire",
  summary: "Continuer à fonctionner pendant une cyberattaque : BIA, RTO, RPO, PCA, PRA et cellule de crise.",
  duration: "9 min",
  objectives: [
    "Réaliser une analyse d'impact sur l'activité (BIA)",
    "Comprendre RTO et RPO",
    "Distinguer PCA et PRA et organiser une cellule de crise",
  ],
  sections: [
    {
      title: "Le BIA",
      paragraphs: [
        "L'analyse d'impact sur l'activité identifie les processus critiques et mesure ce que coûte leur arrêt dans le temps : 1 heure, 1 jour, 1 semaine.",
        "Elle dit quelles activités redémarrer en premier.",
      ],
    },
    {
      title: "RTO et RPO",
      paragraphs: [
        "RTO (durée maximale d'interruption admissible) : en combien de temps le service doit être rétabli.",
        "RPO (perte de données maximale admissible) : jusqu'à quand on peut revenir en arrière. Un RPO de 4 heures impose des sauvegardes au moins toutes les 4 heures.",
      ],
      example: "Paie : RTO 48 h, RPO 24 h\nSite de vente : RTO 2 h, RPO 15 min",
    },
    {
      title: "PCA et PRA",
      paragraphs: [
        "Le plan de continuité d'activité (PCA) décrit comment continuer à travailler pendant la crise, parfois en mode dégradé (papier, solutions de secours).",
        "Le plan de reprise d'activité (PRA) décrit comment restaurer les systèmes. La norme ISO 22301 encadre le management de la continuité.",
      ],
    },
    {
      title: "La cellule de crise",
      paragraphs: [
        "Direction, technique, communication, juridique, métiers : chacun a un rôle et un remplaçant, des moyens de communication hors du système d'information touché, et une main courante.",
        "Les exercices réguliers sont la seule façon de vérifier que tout cela fonctionne.",
      ],
    },
  ],
  keyPoints: [
    "Le BIA dit ce qui est critique et à quelle vitesse redémarrer.",
    "RTO = durée d'arrêt admissible ; RPO = perte de données admissible.",
    "PCA pour continuer, PRA pour restaurer ; ISO 22301.",
    "Cellule de crise préparée et exercée.",
  ],
  quiz: [
    {
      question: "Un RPO de 1 heure signifie…",
      options: ["Le service redémarre en 1 heure", "On accepte de perdre au plus 1 heure de données", "La crise dure 1 heure"],
      correct: 1,
      explanation: "Les sauvegardes doivent donc être au moins horaires.",
    },
    {
      question: "Quel plan décrit comment continuer à travailler pendant la crise ?",
      options: ["Le PCA", "Le PRA", "La PSSI"],
      correct: 0,
      explanation: "Le PRA, lui, décrit la restauration des systèmes.",
    },
    {
      question: "Pourquoi prévoir des moyens de communication hors du SI ?",
      options: ["Parce que le SI peut être indisponible ou compromis", "Pour économiser", "Ce n'est pas utile"],
      correct: 0,
      explanation: "La messagerie habituelle peut être chiffrée ou surveillée par l'attaquant.",
    },
  ],
  sources: [
    { label: "ISO 22301 – Management de la continuité d'activité", url: "https://www.iso.org/standard/75106.html" },
    { label: "ANSSI – Publications sur la gestion de crise cyber", url: "https://messervices.cyber.gouv.fr" },
  ],
};
