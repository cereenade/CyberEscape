import type { Lesson } from "@/lib/types";

export const REVENTE_BILLETS: Lesson = {
  slug: "revente-billets",
  title: "Acheter un billet d'occasion sans se faire avoir",
  icon: "🎟️",
  theme: "humain",
  level: "debutant",
  summary: "Concerts, matchs, festivals : comment éviter les faux billets et les billets vendus plusieurs fois.",
  duration: "6 min",
  objectives: [
    "Comprendre pourquoi un billet PDF peut être vendu plusieurs fois",
    "Reconnaître les signaux d'une arnaque au billet",
    "Utiliser les solutions de revente sûres",
  ],
  sections: [
    {
      title: "Le problème du billet copiable",
      paragraphs: [
        "Un billet électronique, c'est souvent un code-barres ou un QR code. Un PDF ou une capture d'écran se copie à l'infini.",
        "À l'entrée, seul le premier code scanné passe. Les autres acheteurs restent dehors, sans recours.",
      ],
    },
    {
      title: "Les signaux d'alerte",
      paragraphs: [
        "Un prix très bas pour un événement complet, une forte pression (« plein de gens sont intéressés »), un vendeur pressé.",
        "Un paiement sans protection : virement « entre proches », coupons prépayés, cryptomonnaie. Une fois l'argent parti, il ne revient pas.",
        "Un refus de passer par la plateforme officielle, ou un lien vers un site qui imite la billetterie.",
      ],
      example: "Dans la salle « Les places du concert complet », le message piégé cumule prix cassé, urgence et paiement par coupon.",
    },
    {
      title: "Revendre et acheter en sécurité",
      paragraphs: [
        "Passe par la bourse de revente de l'organisateur ou de la billetterie : l'ancien billet est annulé et un nouveau est créé à ton nom.",
        "Si tu achètes à un particulier malgré tout, préfère un paiement qui offre un recours et vérifie que le billet est transféré dans ton appli.",
        "Victime ? Garde les échanges, signale l'annonce à la plateforme et rends-toi sur cybermalveillance.gouv.fr pour être guidé.",
      ],
    },
  ],
  keyPoints: [
    "Un billet PDF peut être vendu dix fois.",
    "Prix cassé + urgence + paiement sans recours = arnaque probable.",
    "La revente officielle annule l'ancien billet et en crée un nouveau.",
  ],
  quiz: [
    {
      question: "Pourquoi un billet en PDF est-il risqué à l'achat entre particuliers ?",
      options: ["Il est toujours faux", "Il peut avoir été copié et vendu à plusieurs personnes", "Il ne peut pas être scanné"],
      correct: 1,
      explanation: "Seul le premier scanné entre.",
    },
    {
      question: "Quel moyen de paiement est le plus risqué ?",
      options: ["Le paiement sur la bourse officielle", "Les coupons prépayés", "La carte bancaire sur la billetterie"],
      correct: 1,
      explanation: "Un coupon payé ne se récupère pas.",
    },
    {
      question: "Que fait la revente officielle ?",
      options: ["Elle annule l'ancien billet et en crée un nouveau", "Elle envoie le même PDF", "Elle double le prix"],
      correct: 0,
      explanation: "Tu es sûr d'avoir un billet valide à ton nom.",
    },
  ],
  sources: [{ label: "Cybermalveillance.gouv.fr", url: "https://www.cybermalveillance.gouv.fr/" }],
};
