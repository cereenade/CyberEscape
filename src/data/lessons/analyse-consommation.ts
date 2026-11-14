import type { Lesson } from "@/lib/types";

export const ANALYSE_CONSOMMATION: Lesson = {
  slug: "analyse-consommation",
  title: "Les attaques par analyse de consommation",
  icon: "⚡",
  theme: "crypto",
  level: "avance",
  summary: "Un algorithme solide peut fuir sa clé par le courant qu'il consomme. Découvre SPA, DPA et les contre-mesures.",
  duration: "10 min",
  objectives: [
    "Comprendre ce qu'est un canal auxiliaire physique",
    "Distinguer SPA et DPA",
    "Connaître les contre-mesures matérielles et logicielles",
  ],
  sections: [
    {
      title: "Quand l'exécution parle",
      paragraphs: [
        "Un circuit électronique ne consomme pas la même énergie selon les opérations et les données qu'il traite.",
        "En mesurant ce courant avec un oscilloscope, on obtient une courbe qui reflète le calcul en cours.",
        "Ces attaques visent surtout les objets physiques : cartes à puce, modules de sécurité, objets connectés.",
      ],
    },
    {
      title: "SPA et DPA",
      paragraphs: [
        "L'analyse simple (SPA) lit une seule courbe. Si le code fait une opération différente selon un bit de la clé, cette différence se voit.",
        "L'analyse différentielle (DPA), publiée par Kocher, Jaffe et Jun en 1999, compare statistiquement des milliers de courbes pour retrouver la clé morceau par morceau.",
        "D'autres canaux existent : rayonnement électromagnétique, temps d'exécution, son.",
      ],
    },
    {
      title: "Les contre-mesures",
      paragraphs: [
        "Masquage : les données sont mélangées à un aléa différent à chaque exécution, la consommation ne dépend plus directement de la clé.",
        "Code sans branchement ni accès mémoire dépendant de la clé : le profil reste le même.",
        "Matériel : bruit ajouté, ordre des opérations aléatoire, logique équilibrée.",
        "Agrandir la clé ne protège pas : la fuite vient de l'implémentation.",
      ],
    },
    {
      title: "Faire évaluer",
      paragraphs: [
        "Les produits sensibles (paiement, identité) passent des évaluations en laboratoire, comme les Critères communs ou les certifications de paiement.",
        "En France, l'ANSSI délivre des certifications pour ces produits de sécurité.",
      ],
    },
  ],
  keyPoints: [
    "La consommation électrique peut révéler une clé.",
    "SPA : une courbe ; DPA : des statistiques sur des milliers de courbes.",
    "Masquage et exécution constante sont les principales défenses.",
    "Une clé plus longue ne corrige pas une implémentation qui fuit.",
  ],
  quiz: [
    {
      question: "Que mesure une attaque DPA ?",
      options: ["Le temps de réponse d'un site web", "La consommation électrique sur de nombreuses exécutions", "La taille des fichiers chiffrés"],
      correct: 1,
      explanation: "Elle compare statistiquement des milliers de courbes.",
    },
    {
      question: "À quoi sert le masquage ?",
      options: ["À cacher le nom de l'algorithme", "À rendre la consommation indépendante de la clé", "À compresser les données"],
      correct: 1,
      explanation: "Un aléa différent à chaque exécution brouille la relation avec la clé.",
    },
    {
      question: "Passer d'AES-128 à AES-256 suffit-il contre la DPA ?",
      options: ["Oui", "Non, l'implémentation fuit toujours", "Seulement sur carte à puce"],
      correct: 1,
      explanation: "La fuite vient de l'exécution, pas de la longueur de la clé.",
    },
  ],
};
