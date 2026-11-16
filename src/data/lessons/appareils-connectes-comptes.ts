import type { Lesson } from "@/lib/types";

export const APPAREILS_CONNECTES_COMPTES: Lesson = {
  slug: "appareils-connectes-comptes",
  title: "Surveiller les appareils connectés à tes comptes",
  icon: "📱",
  theme: "bases",
  level: "debutant",
  summary: "Où trouver la liste des sessions ouvertes, comment repérer un intrus et quoi faire ensuite.",
  duration: "5 min",
  objectives: [
    "Trouver la liste des appareils connectés à un compte",
    "Repérer une session suspecte",
    "Réagir dans le bon ordre",
  ],
  sections: [
    {
      title: "Une liste souvent oubliée",
      paragraphs: [
        "Messageries, réseaux sociaux, mails et comptes de jeux affichent les appareils et sessions ouverts, souvent dans « Sécurité » ou « Appareils ».",
        "On y voit le type d'appareil, la ville approximative et la dernière activité.",
      ],
    },
    {
      title: "Repérer un intrus",
      paragraphs: [
        "Un appareil que tu ne possèdes pas, une ville où tu n'es jamais allé ou un ancien téléphone revendu : ce sont des sessions à couper.",
        "La ville est approximative (elle dépend de l'adresse IP), mais un appareil inconnu reste un vrai signal, comme la tablette à Lyon de la salle « L'appareil que tu ne connais pas ».",
      ],
    },
    {
      title: "Réagir et prévenir",
      paragraphs: [
        "Déconnecte la session suspecte, change ton mot de passe, puis active la double authentification.",
        "Prends l'habitude d'ouvrir cette liste une fois par mois, et après chaque perte ou revente d'un appareil.",
      ],
    },
  ],
  keyPoints: [
    "Chaque compte important a une liste de sessions ouvertes.",
    "Un appareil inconnu doit être déconnecté sans attendre.",
    "Ensuite : nouveau mot de passe et double authentification.",
    "Un coup d'œil régulier suffit à repérer les intrus.",
  ],
  quiz: [
    {
      question: "Où trouves-tu généralement la liste des appareils connectés ?",
      options: ["Dans les réglages de sécurité du compte", "Dans tes photos", "Sur la facture de ton opérateur"],
      correct: 0,
      explanation: "Elle est souvent appelée « Appareils » ou « Sessions actives ».",
    },
    {
      question: "Tu vois un appareil inconnu. Quelle réaction est la plus complète ?",
      options: ["Le laisser, ce n'est sûrement rien", "Le déconnecter, changer le mot de passe et activer la double authentification", "Supprimer l'appli de ton téléphone"],
      correct: 1,
      explanation: "Tu coupes l'accès et tu empêches l'intrus de revenir.",
    },
    {
      question: "Quand vérifier cette liste ?",
      options: ["Jamais", "Régulièrement, et après la perte ou la revente d'un appareil", "Uniquement le jour de ton anniversaire"],
      correct: 1,
      explanation: "Les sessions oubliées restent ouvertes tant que tu ne les coupes pas.",
    },
  ],
  sources: [
    { label: "Cybermalveillance.gouv.fr — Piratage de compte", url: "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/fiches-reflexes/piratage-de-compte" },
  ],
};
