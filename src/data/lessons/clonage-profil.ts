import type { Lesson } from "@/lib/types";

export const CLONAGE_PROFIL: Lesson = {
  slug: "clonage-profil",
  title: "Quand quelqu'un clone ton profil",
  icon: "👥",
  theme: "humain",
  level: "debutant",
  summary: "Un faux compte avec ton nom et ta photo piège tes proches : comment ça marche et comment réagir.",
  duration: "5 min",
  objectives: [
    "Distinguer un clonage de profil d'un piratage de compte",
    "Réagir vite pour protéger tes proches",
    "Réduire ce qu'un cloneur peut copier",
  ],
  sections: [
    {
      title: "Un clone, pas un piratage",
      paragraphs: [
        "Le cloneur ne connaît pas ton mot de passe. Il crée un nouveau compte en recopiant ce qui est public : ta photo, ton nom, quelques publications.",
        "Ton vrai compte reste intact, mais le faux peut faire beaucoup de dégâts en ton nom.",
      ],
    },
    {
      title: "Ce que le clone cherche",
      paragraphs: [
        "Il invite tes amis, qui acceptent en croyant à un nouveau compte. Puis vient la demande : un prêt urgent, une carte cadeau, ou un code reçu par SMS « envoyé par erreur ».",
        "Ce code sert souvent à voler le compte de messagerie de la victime : l'arnaque se propage ainsi d'ami en ami.",
      ],
      example: "« Coucou, c'est moi, j'ai changé de compte. Je suis bloquée à l'étranger, tu peux m'avancer 200 € ? »",
    },
    {
      title: "Réagir dans le bon ordre",
      paragraphs: [
        "Préviens d'abord tes proches par un autre canal (appel, autre messagerie) : c'est eux qui sont en danger immédiat.",
        "Signale ensuite le faux profil au réseau social comme usurpation d'identité. Demande à tes amis de le signaler aussi : ça accélère sa suppression.",
      ],
    },
    {
      title: "Rendre le clonage moins efficace",
      paragraphs: [
        "Rends ta liste d'amis privée : c'est elle qui permet au clone de savoir qui inviter.",
        "Limite les publications publiques et rappelle à tes proches une règle simple : une demande d'argent ou de code se vérifie toujours par un appel.",
      ],
    },
  ],
  keyPoints: [
    "Le clonage copie ton profil public, sans toucher à ton compte.",
    "Le clone demande de l'argent ou des codes à tes proches.",
    "Préviens tes proches, puis signale le faux compte.",
    "Une liste d'amis privée rend le clonage bien moins efficace.",
  ],
  quiz: [
    {
      question: "Le cloneur a-t-il besoin de ton mot de passe ?",
      options: ["Oui, toujours", "Non, il recopie ce qui est public", "Seulement pour la photo"],
      correct: 1,
      explanation: "Il crée un nouveau compte à partir de tes informations publiques.",
    },
    {
      question: "Quel réglage limite le plus l'efficacité d'un clone ?",
      options: ["Une liste d'amis privée", "Un pseudo plus long", "Changer de photo chaque semaine"],
      correct: 0,
      explanation: "Sans ta liste d'amis, le clone ne sait pas qui inviter.",
    },
    {
      question: "Un « ami » te demande le code qu'il t'aurait envoyé par erreur. Que fais-tu ?",
      options: ["Je le lui donne", "Je l'appelle pour vérifier et je ne transmets rien", "Je le publie en commentaire"],
      correct: 1,
      explanation: "Un code reçu par SMS ne se partage jamais : il sert souvent à voler un compte.",
    },
  ],
  sources: [
    { label: "Cybermalveillance.gouv.fr – Usurpation d'identité", url: "https://www.cybermalveillance.gouv.fr/" },
  ],
};
