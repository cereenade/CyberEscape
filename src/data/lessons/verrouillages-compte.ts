import type { Lesson } from "@/lib/types";

export const VERROUILLAGES_COMPTE: Lesson = {
  slug: "verrouillages-compte",
  title: "Enquêter sur les verrouillages de comptes",
  icon: "🔒",
  theme: "soc",
  level: "avance",
  summary: "Lire l'événement 4740, trouver le poste source et distinguer une attaque d'un vieux mot de passe enregistré.",
  duration: "9 min",
  objectives: [
    "Lire un événement 4740",
    "Trouver la source des échecs d'authentification",
    "Reconnaître une pulvérisation de mots de passe",
  ],
  sections: [
    {
      title: "L'événement 4740",
      paragraphs: [
        "Quand un compte du domaine dépasse le seuil d'échecs, il est verrouillé et l'événement 4740 est écrit dans le journal Sécurité.",
        "On le trouve sur les contrôleurs de domaine, en particulier celui qui porte le rôle PDC, qui centralise les verrouillages.",
        "Le champ « Caller Computer Name » indique le poste d'où viennent les échecs.",
      ],
    },
    {
      title: "Compléter avec les échecs",
      paragraphs: [
        "Le 4740 dit qu'un compte est verrouillé. Les 4625 (échec d'ouverture de session) et 4771 (pré-authentification Kerberos refusée) disent comment on y est arrivé.",
        "Regarde l'adresse IP source, le type d'ouverture de session et le code d'erreur.",
      ],
    },
    {
      title: "Attaque ou erreur ?",
      paragraphs: [
        "Un seul compte, un seul poste, en boucle : souvent un vieux mot de passe enregistré (lecteur réseau, téléphone, tâche planifiée, service).",
        "Beaucoup de comptes différents depuis une même source, en peu de temps : signe d'une pulvérisation de mots de passe (password spraying).",
        "Des échecs depuis Internet sur un portail exposé (VPN, messagerie) méritent une alerte même sans verrouillage, car un attaquant prudent reste sous le seuil.",
      ],
      example: "09:01–09:02 : 4740 sur m.durand, l.bernard, s.petit, a.moreau → Caller Computer Name: PC-COMPTA-07",
    },
    {
      title: "Réagir",
      paragraphs: [
        "Isole le poste source et cherche ce qui tourne dessus (processus, tâches, connexions).",
        "Vérifie si un compte visé a réussi à se connecter juste après : un succès au milieu des échecs est le signal le plus grave.",
        "Déverrouille les comptes après l'analyse, réinitialise les mots de passe exposés et renforce la MFA.",
      ],
    },
  ],
  keyPoints: [
    "4740 = compte verrouillé, avec le poste source.",
    "Croise avec 4625 et 4771 pour comprendre les échecs.",
    "Beaucoup de comptes depuis une même source = pulvérisation probable.",
    "Cherche une connexion réussie au milieu des échecs.",
  ],
  quiz: [
    {
      question: "Quel champ du 4740 donne le poste à l'origine du verrouillage ?",
      options: ["Account Domain", "Caller Computer Name", "Logon ID"],
      correct: 1,
      explanation: "C'est le poste qui a envoyé les tentatives échouées.",
    },
    {
      question: "Des dizaines de comptes verrouillés depuis un même poste en deux minutes font penser à…",
      options: ["Une panne de l'horloge", "Une pulvérisation de mots de passe", "Une mise à jour Windows"],
      correct: 1,
      explanation: "Un mot de passe testé sur beaucoup de comptes : c'est le schéma typique du spraying.",
    },
    {
      question: "Quel signal est le plus grave pendant l'enquête ?",
      options: ["Un compte verrouillé de plus", "Une connexion réussie au milieu des échecs", "Un poste éteint"],
      correct: 1,
      explanation: "L'attaquant a peut-être trouvé un mot de passe valide.",
    },
  ],
  sources: [
    { label: "Microsoft Learn : événement 4740", url: "https://learn.microsoft.com/fr-fr/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4740" },
  ],
};
