import type { Lesson } from "@/lib/types";

export const INFRA_IAM: Lesson = {
  slug: "infra-iam",
  title: "Identités et accès (IAM)",
  icon: "🪪",
  theme: "infra",
  level: "intermediaire",
  summary: "Qui a accès à quoi, pourquoi, et pour combien de temps : la gestion des identités au quotidien.",
  duration: "9 min",
  objectives: [
    "Appliquer le moindre privilège et la séparation des tâches",
    "Gérer le cycle de vie des comptes (arrivée, mobilité, départ)",
    "Protéger les comptes à privilèges",
  ],
  sections: [
    {
      title: "Le moindre privilège",
      paragraphs: [
        "Chaque compte n'a que les droits nécessaires à sa mission, ni plus, ni plus longtemps.",
        "La séparation des tâches évite qu'une seule personne puisse, par exemple, créer un fournisseur et valider son paiement.",
      ],
    },
    {
      title: "Le cycle de vie des comptes",
      paragraphs: [
        "Arrivée : droits selon le rôle. Changement de poste : retrait des anciens droits (sinon ils s'accumulent). Départ : désactivation le jour même.",
        "Une revue régulière des droits, validée par les responsables, repère les accès devenus inutiles et les comptes orphelins.",
      ],
    },
    {
      title: "Authentification forte",
      paragraphs: [
        "La double authentification est indispensable pour les accès distants, la messagerie et les comptes sensibles.",
        "Les méthodes résistantes au phishing (clés FIDO2, passkeys) sont à privilégier pour les administrateurs.",
      ],
    },
    {
      title: "Les comptes à privilèges",
      paragraphs: [
        "Comptes d'administration séparés des comptes de bureautique, utilisés depuis des postes dédiés, avec un modèle par niveaux pour l'annuaire.",
        "Une solution de gestion des accès à privilèges (PAM) peut délivrer les droits à la demande, pour une durée limitée, et enregistrer les sessions. Les comptes de service utilisent des mots de passe longs et gérés automatiquement.",
      ],
    },
  ],
  keyPoints: [
    "Moindre privilège et séparation des tâches.",
    "Arrivée, mobilité, départ : chaque étape met à jour les droits.",
    "MFA partout, résistante au phishing pour les admins.",
    "Comptes admin séparés, droits temporaires (PAM), comptes de service gérés.",
  ],
  quiz: [
    {
      question: "Un salarié change de service. Que faire de ses anciens droits ?",
      options: ["Les garder au cas où", "Les retirer", "Les donner à son remplaçant"],
      correct: 1,
      explanation: "Sinon les droits s'accumulent au fil des années.",
    },
    {
      question: "Quand désactiver le compte d'une personne qui quitte l'entreprise ?",
      options: ["Le jour de son départ", "Un an après", "Jamais"],
      correct: 0,
      explanation: "Un compte orphelin est une porte ouverte.",
    },
    {
      question: "Que permet une solution PAM ?",
      options: ["Donner des droits d'admin temporaires et tracés", "Envoyer des mails", "Chiffrer les disques"],
      correct: 0,
      explanation: "Les privilèges ne sont accordés que quand c'est nécessaire.",
    },
  ],
  sources: [
    { label: "ANSSI – Recommandations relatives à l'authentification multifacteur et aux mots de passe", url: "https://messervices.cyber.gouv.fr" },
    { label: "CIS Controls – Account and Access Control Management", url: "https://www.cisecurity.org/controls" },
  ],
};
