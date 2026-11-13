import type { Lesson } from "@/lib/types";

export const SECURITE_CLOUD: Lesson = {
  slug: "securite-cloud",
  title: "Identités et journaux dans le cloud",
  icon: "☁️",
  theme: "soc",
  level: "avance",
  summary: "Dans le cloud, l'identité est le nouveau périmètre : la protéger et la surveiller.",
  duration: "10 min",
  objectives: [
    "Lire les journaux de connexion et d'audit cloud",
    "Réagir à un vol de jeton ou de clé d'accès",
    "Appliquer le moindre privilège aux identités cloud",
  ],
  sections: [
    {
      title: "L'identité au centre",
      paragraphs: [
        "Dans le cloud, il n'y a plus de réseau interne à défendre : celui qui a l'identifiant ou le jeton a l'accès.",
        "MFA résistante au phishing (passkeys), accès conditionnel (appareil conforme, pays) et sessions courtes sont les bases.",
      ],
    },
    {
      title: "Les journaux",
      paragraphs: [
        "Les journaux de connexion (Entra ID…) montrent l'IP, le pays, le client, le résultat de la MFA : un client « python-requests » sur un compte humain ou un voyage impossible sont suspects.",
        "Les journaux d'audit (CloudTrail, Azure Activity Log) listent chaque action : on suit une clé volée par son identifiant.",
      ],
    },
    {
      title: "Jetons et clés volés",
      paragraphs: [
        "Un jeton de rafraîchissement ou un cookie volé contourne mot de passe et MFA : changer le mot de passe ne suffit pas, il faut révoquer les sessions.",
        "Une clé d'accès exposée se révoque immédiatement, puis on retrace ses actions.",
      ],
    },
    {
      title: "Le moindre privilège",
      paragraphs: [
        "Une clé de script avec des droits d'administrateur transforme une petite fuite en catastrophe.",
        "Rôles temporaires plutôt que clés permanentes, droits limités au strict nécessaire, revue régulière des accès.",
      ],
    },
  ],
  keyPoints: [
    "L'identité est le périmètre : MFA forte et accès conditionnel.",
    "Journaux de connexion et d'audit à envoyer au SIEM.",
    "Jeton volé : révoquer les sessions, pas seulement changer le mot de passe.",
    "Droits minimaux et rôles temporaires.",
  ],
  quiz: [
    {
      question: "Un jeton de session a été volé. Changer le mot de passe suffit-il ?",
      options: ["Oui", "Non, il faut aussi révoquer les sessions", "Seulement le lundi"],
      correct: 1,
      explanation: "Le jeton reste valide jusqu'à sa révocation ou son expiration.",
    },
    {
      question: "Où suivre les actions faites avec une clé AWS volée ?",
      options: ["CloudTrail", "Le journal du navigateur", "La corbeille"],
      correct: 0,
      explanation: "Chaque appel d'API y est enregistré avec l'identifiant de la clé.",
    },
    {
      question: "Le script de sauvegarde doit avoir…",
      options: ["Tous les droits", "Seulement l'écriture sur son espace de sauvegarde", "Les droits de l'administrateur"],
      correct: 1,
      explanation: "Une fuite aurait alors un impact limité.",
    },
  ],
};
