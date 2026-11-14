import type { Lesson } from "@/lib/types";

export const AFFECTATION_DE_MASSE: Lesson = {
  slug: "affectation-de-masse",
  title: "L'affectation de masse",
  icon: "🧩",
  theme: "web",
  level: "intermediaire",
  summary: "Quand une API enregistre tous les champs reçus, un utilisateur peut changer son rôle ou son solde. Voici comment l'éviter.",
  duration: "7 min",
  objectives: [
    "Reconnaître une affectation de masse",
    "Comprendre pourquoi les frameworks y exposent",
    "Mettre en place une liste blanche de champs",
  ],
  sections: [
    {
      title: "Le principe",
      paragraphs: [
        "Pour gagner du temps, certains codes copient directement tout le contenu d'une requête dans l'objet enregistré en base.",
        "Le formulaire n'affiche que nom et ville, mais l'objet contient aussi rôle, solde ou statut. Rien n'empêche d'ajouter ces champs à la main dans la requête.",
      ],
      example: "{\"nom\": \"Inès\", \"ville\": \"Lyon\", \"role\": \"admin\"}",
    },
    {
      title: "Pourquoi c'est fréquent",
      paragraphs: [
        "Beaucoup de frameworks proposent une liaison automatique des données : pratique, mais dangereuse si on ne la limite pas.",
        "Le champ sensible est invisible dans l'interface : on oublie qu'il existe côté serveur.",
        "C'est une forme de contrôle d'accès cassé, l'une des familles de failles web les plus courantes.",
      ],
    },
    {
      title: "Se protéger",
      paragraphs: [
        "Définis une liste blanche des champs modifiables pour chaque action, côté serveur.",
        "Utilise des objets dédiés aux entrées (DTO) au lieu de l'objet de la base.",
        "Les champs sensibles (rôle, droits, solde) se modifient par des actions séparées, réservées aux bonnes personnes.",
        "Teste-le : ajoute un champ inattendu dans une requête et vérifie qu'il est ignoré ou refusé.",
      ],
    },
  ],
  keyPoints: [
    "Ne jamais enregistrer tous les champs reçus sans filtrer.",
    "Liste blanche de champs, côté serveur.",
    "Les champs sensibles ont leurs propres actions protégées.",
  ],
  quiz: [
    {
      question: "D'où vient l'affectation de masse ?",
      options: ["D'un mot de passe faible", "D'un serveur qui enregistre tous les champs reçus", "D'un certificat expiré"],
      correct: 1,
      explanation: "Le serveur accepte des champs que l'utilisateur ne devrait pas toucher.",
    },
    {
      question: "Quelle est la meilleure défense ?",
      options: ["Cacher le champ dans le formulaire", "Une liste blanche de champs modifiables côté serveur", "Renommer le champ role"],
      correct: 1,
      explanation: "Seuls les champs autorisés sont pris en compte.",
    },
    {
      question: "Cacher un champ dans l'interface suffit-il ?",
      options: ["Oui", "Non, la requête peut être modifiée à la main", "Oui, si le site est en HTTPS"],
      correct: 1,
      explanation: "Tout ce qui vient du client peut être modifié.",
    },
  ],
  sources: [{ label: "OWASP : Mass Assignment Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html" }],
};
