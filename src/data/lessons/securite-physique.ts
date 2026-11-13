import type { Lesson } from "@/lib/types";

export const SECURITE_PHYSIQUE: Lesson = {
  slug: "securite-physique",
  title: "La sécurité physique et le bureau",
  icon: "🚪",
  theme: "bases",
  level: "debutant",
  summary: "Le plus court chemin vers un ordinateur passe souvent par la porte d'entrée.",
  duration: "6 min",
  objectives: [
    "Repérer les intrusions physiques les plus courantes",
    "Appliquer les règles du bureau rangé et de l'écran verrouillé",
    "Jeter et imprimer les documents sans créer de fuite",
  ],
  sections: [
    {
      title: "Entrer sans badge",
      paragraphs: [
        "Le talonnage (tailgating) consiste à entrer juste derrière quelqu'un qui a badgé. Il exploite la politesse : on tient la porte à la personne chargée de cartons.",
        "La règle est simple : chacun badge, et les visiteurs passent par l'accueil. Accompagner poliment quelqu'un à l'accueil n'a rien d'impoli.",
      ],
    },
    {
      title: "Le poste de travail",
      paragraphs: [
        "Une session ouverte sans surveillance, c'est quelques secondes pour brancher une clé piégée ou envoyer un mail en ton nom. Windows + L verrouille l'écran instantanément.",
        "Le soir, rien de confidentiel ne reste visible : documents rangés, clés USB et portables sous clé, aucun mot de passe affiché.",
      ],
    },
    {
      title: "Papier, imprimantes et poubelles",
      paragraphs: [
        "Les documents oubliés à l'imprimante et les poubelles sont des mines d'or (dumpster diving). L'impression sécurisée ne libère le document qu'à ton badge.",
        "Les documents sensibles se détruisent au broyeur à coupe croisée.",
      ],
    },
    {
      title: "En déplacement",
      paragraphs: [
        "Dans le train, ton écran et tes appels sont publics : un filtre de confidentialité rend l'écran illisible de côté.",
        "Ne laisse jamais un portable seul dans une chambre d'hôtel ou une voiture : quelques minutes d'accès physique suffisent pour le piéger.",
      ],
    },
  ],
  keyPoints: [
    "Chacun badge, les visiteurs passent par l'accueil.",
    "Windows + L à chaque fois qu'on quitte son poste.",
    "Bureau rangé le soir, documents sensibles au broyeur.",
    "Un appareil sans surveillance peut être piégé en quelques minutes.",
  ],
  quiz: [
    {
      question: "Un livreur chargé attend derrière la porte à badge. Tu…",
      options: ["Lui tiens la porte", "L'accompagnes à l'accueil", "Lui prêtes ton badge"],
      correct: 1,
      explanation: "Tu restes aimable tout en gardant l'accès contrôlé.",
    },
    {
      question: "Quelle option évite les documents oubliés à l'imprimante ?",
      options: ["Imprimer en noir et blanc", "L'impression sécurisée par badge", "Imprimer recto verso"],
      correct: 1,
      explanation: "Le document ne sort qu'en ta présence.",
    },
    {
      question: "Que faire d'un relevé bancaire professionnel inutile ?",
      options: ["Le déchirer en deux", "Le mettre au recyclage", "Le passer au broyeur"],
      correct: 2,
      explanation: "Seul le broyeur le rend illisible.",
    },
  ],
};
