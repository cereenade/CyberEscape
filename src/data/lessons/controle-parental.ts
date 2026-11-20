import type { Lesson } from "@/lib/types";

export const CONTROLE_PARENTAL: Lesson = {
  slug: "controle-parental",
  title: "Le contrôle parental",
  icon: "🧸",
  theme: "bases",
  level: "debutant",
  summary: "Profils enfant, achats bloqués, filtres et dialogue : accompagner un enfant sur ses premiers écrans.",
  duration: "5 min",
  objectives: [
    "Connaître les réglages de contrôle parental disponibles",
    "Choisir les bons réglages selon l'âge",
    "Comprendre que le dialogue reste indispensable",
  ],
  sections: [
    {
      title: "Pourquoi un contrôle parental ?",
      paragraphs: [
        "Une tablette ou un téléphone donne accès à tout Internet : vidéos inadaptées, inconnus dans les jeux, achats intégrés.",
        "Comme dans la salle de la tablette du petit frère, quelques minutes suffisent pour télécharger des applis inconnues ou dépenser de l'argent réel.",
      ],
    },
    {
      title: "Les réglages utiles",
      paragraphs: [
        "Les systèmes proposent des outils gratuits : Temps d'écran sur iPhone et iPad, Family Link sur Android, profils enfant sur les consoles et les box.",
        "Tu peux bloquer ou soumettre à validation les achats et les nouvelles applis, filtrer les contenus selon l'âge, limiter le temps d'écran et restreindre les discussions aux amis connus.",
      ],
    },
    {
      title: "Les limites des outils",
      paragraphs: [
        "Un enfant curieux trouve parfois comment contourner un réglage, surtout s'il connaît le mot de passe du compte parent : garde-le pour toi.",
        "Aucun filtre n'est parfait. Le plus important est que l'enfant sache qu'il peut venir en parler, sans peur d'être puni, s'il voit ou reçoit quelque chose de gênant.",
      ],
    },
  ],
  keyPoints: [
    "Le compte de l'enfant reste rattaché à celui d'un parent.",
    "Achats et nouvelles applis : accord d'un adulte obligatoire.",
    "Filtres selon l'âge et discussions limitées aux contacts connus.",
    "Le dialogue complète toujours les réglages.",
  ],
  quiz: [
    {
      question: "Qui doit connaître le mot de passe du compte parent ?",
      options: ["Toute la famille, enfants compris", "Seulement les parents", "Personne, on le laisse par défaut"],
      correct: 1,
      explanation: "Si l'enfant le connaît, il peut tout désactiver.",
    },
    {
      question: "Que faire contre les achats intégrés surprises ?",
      options: ["Les bloquer ou exiger l'accord d'un parent", "Retirer la carte bancaire du portefeuille", "Rien, ils sont toujours gratuits"],
      correct: 0,
      explanation: "Le réglage d'achat avec validation parentale évite les factures surprises.",
    },
    {
      question: "Un enfant voit une vidéo choquante malgré le filtre. Que doit-il savoir ?",
      options: ["Qu'il sera privé de tablette", "Qu'il peut en parler à un adulte sans être puni", "Qu'il doit supprimer l'appli en secret"],
      correct: 1,
      explanation: "La confiance permet de réagir vite.",
    },
  ],
  sources: [
    { label: "Je protège mon enfant (gouvernement)", url: "https://www.jeprotegemonenfant.gouv.fr/" },
  ],
};
