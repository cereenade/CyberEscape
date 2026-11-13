import type { Lesson } from "@/lib/types";

export const PHISHING: Lesson = {
  slug: "phishing",
  title: "Phishing et ingénierie sociale",
  icon: "🎣",
  theme: "humain",
  level: "debutant",
  summary: "Les pirates piratent d'abord les humains. Apprends à reconnaître leurs techniques.",
  duration: "6 min",
  objectives: [
    "Reconnaître les leviers de l'ingénierie sociale",
    "Repérer un mail de phishing",
    "Savoir quoi faire face à un message suspect",
  ],
  sections: [
    {
      title: "L'ingénierie sociale",
      paragraphs: [
        "Plutôt que de casser un système, l'attaquant manipule une personne pour qu'elle lui ouvre la porte : donner un mot de passe, cliquer sur un lien, faire un virement.",
        "Les leviers sont toujours les mêmes : l'urgence, la peur, l'autorité, la curiosité ou l'appât du gain.",
      ],
    },
    {
      title: "Reconnaître un mail de phishing",
      paragraphs: [
        "Expéditeur au domaine bizarre ou presque identique (co1is-express.fr), message urgent ou menaçant, demande d'identifiants ou de paiement, lien dont l'adresse réelle ne correspond pas au texte.",
        "Survole un lien sans cliquer pour voir sa vraie destination, et lis le nom de domaine jusqu'au bout.",
      ],
      example: "Texte du lien : https://banque-horizon.fr\nVraie adresse : https://banque-horizon.fr.connexion-secure.xyz",
    },
    {
      title: "Les variantes",
      paragraphs: [
        "Spear phishing : un message ciblé, personnalisé avec des infos sur toi. Smishing : par SMS. Vishing : par téléphone.",
        "Fraude au président : un faux dirigeant exige un virement urgent et confidentiel. Baiting : une clé USB piégée laissée en évidence.",
      ],
    },
    {
      title: "Les bons réflexes",
      paragraphs: [
        "Ne jamais donner un mot de passe par mail ou téléphone : aucun service légitime ne le demande.",
        "En cas de doute, contacte l'organisme par un autre canal (son site officiel, le numéro habituel) et signale le message au service sécurité.",
      ],
    },
  ],
  keyPoints: [
    "L'urgence, la peur, l'autorité et la curiosité sont les leviers favoris des attaquants.",
    "Vérifie toujours le vrai domaine de l'expéditeur et des liens.",
    "Aucun service légitime ne te demande ton mot de passe.",
    "En cas de doute : autre canal pour vérifier, et signalement à l'équipe sécurité.",
  ],
  quiz: [
    {
      question: "Quel levier utilise « Votre compte sera supprimé dans 1 heure » ?",
      options: ["La curiosité", "L'urgence et la peur", "L'appât du gain"],
      correct: 1,
      explanation: "Le but est de te faire agir vite, sans réfléchir.",
    },
    {
      question: "Ton « président » te demande par mail un virement urgent et secret. Que fais-tu ?",
      options: [
        "Je fais le virement, c'est le président",
        "Je réponds au mail pour demander confirmation",
        "Je l'appelle sur son numéro habituel pour vérifier",
      ],
      correct: 2,
      explanation: "Répondre au mail, c'est répondre au pirate. Il faut un autre canal.",
    },
    {
      question: "Un phishing envoyé par SMS s'appelle…",
      options: ["Du vishing", "Du smishing", "Du baiting"],
      correct: 1,
      explanation: "SMS + phishing = smishing. Le vishing passe par la voix (téléphone).",
    },
  ],
};
