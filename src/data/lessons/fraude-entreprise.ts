import type { Lesson } from "@/lib/types";

export const FRAUDE_ENTREPRISE: Lesson = {
  slug: "fraude-entreprise",
  title: "Les fraudes qui visent les entreprises",
  icon: "🏦",
  theme: "humain",
  level: "intermediaire",
  summary: "Fraude au président, faux fournisseur, boîte mail détournée : comment l'argent quitte les entreprises.",
  duration: "8 min",
  objectives: [
    "Comprendre le déroulement d'une compromission de messagerie (BEC)",
    "Mettre en place des procédures de validation des paiements",
    "Repérer les règles de transfert malveillantes",
  ],
  sections: [
    {
      title: "La compromission de messagerie",
      paragraphs: [
        "Le pirate vole les identifiants d'une boîte mail (souvent par phishing), puis observe les échanges pendant des semaines.",
        "Il crée des règles qui transfèrent ou cachent les mails contenant « facture » ou « virement », pour intervenir au bon moment.",
      ],
    },
    {
      title: "Le changement de coordonnées bancaires",
      paragraphs: [
        "« Nous avons changé de banque, merci de payer désormais sur ce RIB » : le mail vient parfois de la vraie boîte du fournisseur, piratée.",
        "Tout changement de RIB se vérifie par téléphone, au numéro connu du fournisseur, jamais celui donné dans le mail.",
      ],
    },
    {
      title: "La fraude au président",
      paragraphs: [
        "Un faux dirigeant demande un virement urgent et confidentiel. L'urgence et le secret servent à empêcher toute vérification.",
        "Les voix et vidéos peuvent aujourd'hui être imitées (deepfakes) : la procédure doit primer sur l'apparence.",
      ],
    },
    {
      title: "Les procédures qui protègent",
      paragraphs: [
        "Double validation des virements importants, rappel systématique des fournisseurs, délai de vérification pour tout changement de RIB.",
        "Côté technique : MFA résistante au phishing, alerte sur les règles de transfert externes, DMARC strict.",
      ],
    },
  ],
  keyPoints: [
    "Le mail peut venir de la vraie boîte du fournisseur, piratée.",
    "Un changement de RIB se vérifie par téléphone, au numéro connu.",
    "Urgence + confidentialité = signal d'alerte.",
    "Double validation des paiements et surveillance des règles de transfert.",
  ],
  quiz: [
    {
      question: "Un fournisseur annonce un nouveau RIB par mail. Que fais-tu ?",
      options: ["Tu mets à jour", "Tu appelles le fournisseur au numéro habituel", "Tu réponds au mail pour confirmer"],
      correct: 1,
      explanation: "Répondre au mail peut atterrir chez le pirate ; seul un appel au numéro connu est sûr.",
    },
    {
      question: "Une règle de boîte mail transfère tout ce qui contient « virement » vers l'extérieur. C'est…",
      options: ["Un réglage normal", "Un signe de compromission", "Une sauvegarde"],
      correct: 1,
      explanation: "C'est typique de la préparation d'une fraude au virement.",
    },
    {
      question: "Quelle mesure résiste même à un deepfake vocal du PDG ?",
      options: ["Reconnaître sa voix", "Une procédure de double validation", "Lui poser une question sur la météo"],
      correct: 1,
      explanation: "La procédure ne dépend pas de l'apparence ou de la voix.",
    },
  ],
};
