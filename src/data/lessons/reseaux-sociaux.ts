import type { Lesson } from "@/lib/types";

export const RESEAUX_SOCIAUX: Lesson = {
  slug: "reseaux-sociaux",
  title: "Réseaux sociaux et messageries",
  icon: "💬",
  theme: "humain",
  level: "debutant",
  summary: "Ce que tu publies et les messages que tu reçois sont les premières armes des escrocs.",
  duration: "7 min",
  objectives: [
    "Régler la confidentialité de ses comptes",
    "Reconnaître les vols de comptes de messagerie",
    "Éviter les arnaques au proche en détresse et aux faux concours",
  ],
  sections: [
    {
      title: "Ce que révèle un profil",
      paragraphs: [
        "Photos de badge, adresse, habitudes, dates de vacances : un profil public sert à préparer des arnaques crédibles ou des cambriolages.",
        "Passe tes comptes en privé, trie tes abonnés, publie tes vacances au retour, et masque la zone autour de chez toi dans les applis de sport.",
      ],
    },
    {
      title: "Les codes qu'on te demande",
      paragraphs: [
        "« Je t'ai envoyé un code par erreur, tu peux me le renvoyer ? » : ce code sert à installer TON compte sur le téléphone du pirate.",
        "Un code reçu par SMS ne se donne jamais, même à un ami. Active la vérification en deux étapes de tes messageries.",
      ],
    },
    {
      title: "Les faux concours et faux cadeaux",
      paragraphs: [
        "Faux votes, abonnements offerts, monnaie de jeu gratuite : ils mènent vers de fausses pages de connexion.",
        "Un compte ami piraté peut t'envoyer ces messages : préviens-le par un autre moyen.",
      ],
    },
    {
      title: "Les urgences inventées",
      paragraphs: [
        "« Maman, j'ai changé de numéro, fais-moi un virement » : l'arnaque au proche en détresse vise des milliers de numéros au hasard.",
        "Rappelle toujours la personne sur son numéro habituel avant tout paiement.",
      ],
    },
  ],
  keyPoints: [
    "Comptes en privé, informations personnelles au minimum.",
    "Un code SMS ne se donne jamais, à personne.",
    "Les faux concours mènent à de fausses pages de connexion.",
    "Une demande d'argent urgente se vérifie par un appel.",
  ],
  quiz: [
    {
      question: "Une amie te demande le code WhatsApp que tu viens de recevoir. C'est probablement…",
      options: ["Une erreur sans gravité", "Une tentative de vol de ton compte", "Une mise à jour de WhatsApp"],
      correct: 1,
      explanation: "Son compte est sans doute piraté et le pirate vise maintenant le tien.",
    },
    {
      question: "Quand publier ses photos de vacances ?",
      options: ["En direct avec la localisation", "Au retour, ou en privé", "La veille du départ"],
      correct: 1,
      explanation: "Personne ne sait que la maison est vide.",
    },
    {
      question: "Un « proche » sur un nouveau numéro demande un virement urgent. Tu…",
      options: ["Fais le virement", "L'appelles sur son ancien numéro", "Envoies tes codes bancaires"],
      correct: 1,
      explanation: "Un appel suffit à démasquer l'arnaque.",
    },
  ],
};
