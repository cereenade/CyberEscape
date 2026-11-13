import type { Lesson } from "@/lib/types";

export const SAUVEGARDES: Lesson = {
  slug: "sauvegardes",
  title: "Sauvegardes et continuité",
  icon: "💾",
  theme: "bases",
  level: "debutant",
  summary: "La dernière ligne de défense quand tout le reste a échoué.",
  duration: "5 min",
  objectives: [
    "Appliquer la règle 3-2-1",
    "Comprendre pourquoi une sauvegarde hors ligne résiste aux rançongiciels",
    "Vérifier qu'une sauvegarde fonctionne vraiment",
  ],
  sections: [
    {
      title: "Pourquoi sauvegarder",
      paragraphs: [
        "Panne de disque, vol, incendie, erreur humaine ou rançongiciel : un jour, des données disparaîtront.",
        "Une sauvegarde récente et testée transforme une catastrophe en simple contretemps.",
      ],
    },
    {
      title: "La règle 3-2-1",
      paragraphs: [
        "3 copies des données, sur 2 supports différents, dont 1 hors site ou hors ligne.",
        "Certaines organisations ajoutent un « 1 » (copie immuable, impossible à modifier) et un « 0 » (zéro erreur à la restauration) : la règle 3-2-1-1-0.",
      ],
    },
    {
      title: "Face au rançongiciel",
      paragraphs: [
        "Les rançongiciels cherchent et chiffrent aussi les sauvegardes accessibles depuis le réseau.",
        "Une copie déconnectée ou immuable est la seule garantie de pouvoir restaurer sans payer. Mais attention : avec la double extorsion, les données ont pu être volées avant.",
      ],
    },
    {
      title: "Tester, encore et toujours",
      paragraphs: [
        "Une sauvegarde jamais testée est une sauvegarde qui n'existe peut-être pas.",
        "On définit aussi la perte de données acceptable (RPO) et le temps de remise en service visé (RTO) : ce sont eux qui fixent la fréquence des sauvegardes.",
      ],
    },
  ],
  keyPoints: [
    "3 copies, 2 supports, 1 hors site ou hors ligne.",
    "Un rançongiciel chiffre tout ce qui est accessible depuis le réseau.",
    "Une sauvegarde non testée n'est pas une sauvegarde.",
    "Le RPO fixe la perte de données acceptable, le RTO la durée d'interruption visée.",
  ],
  quiz: [
    {
      question: "Que signifie le « 1 » de la règle 3-2-1 ?",
      options: ["1 seul support", "1 copie hors site ou hors ligne", "1 sauvegarde par an"],
      correct: 1,
      explanation: "Une copie à l'extérieur survit à un incendie ou à un rançongiciel.",
    },
    {
      question: "Pourquoi une sauvegarde sur un disque réseau toujours connecté est-elle fragile ?",
      options: ["Elle est trop lente", "Un rançongiciel peut la chiffrer aussi", "Elle prend trop de place"],
      correct: 1,
      explanation: "Tout ce qui est accessible depuis le réseau peut être chiffré.",
    },
    {
      question: "Quelle est la meilleure façon de savoir si une sauvegarde fonctionne ?",
      options: ["Regarder sa taille", "Faire un test de restauration", "Lui faire confiance"],
      correct: 1,
      explanation: "Seule une restauration prouve que la sauvegarde est utilisable.",
    },
  ],
};
