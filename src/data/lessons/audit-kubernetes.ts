import type { Lesson } from "@/lib/types";

export const AUDIT_KUBERNETES: Lesson = {
  slug: "audit-kubernetes",
  title: "Enquêter avec les journaux d'audit Kubernetes",
  icon: "☸️",
  theme: "soc",
  level: "avance",
  summary: "Lire les journaux d'audit de l'API Kubernetes pour repérer un compte volé, un shell dans un pod ou un vol de secrets.",
  duration: "9 min",
  objectives: [
    "Comprendre ce qu'enregistre l'audit Kubernetes",
    "Repérer les actions suspectes dans un journal",
    "Mettre en place une politique d'audit utile",
  ],
  sections: [
    {
      title: "Ce que contient le journal",
      paragraphs: [
        "Toute action sur un cluster passe par l'API Kubernetes. Le journal d'audit enregistre pour chaque appel : l'identité (utilisateur ou compte de service), le verbe (get, list, create, delete…), la ressource visée, l'espace de noms, l'adresse source et le code de réponse.",
        "Les comptes de service (system:serviceaccount:<espace>:<nom>) sont les identités des applications : leur comportement est en général très prévisible.",
      ],
    },
    {
      title: "Les signaux à surveiller",
      paragraphs: [
        "Un « exec » ou « attach » sur un pod de production : quelqu'un ouvre un terminal dans un conteneur. Dans la salle « La commande dans le conteneur », c'est le compte de l'appli web qui le fait sur la base de paiement : très suspect.",
        "La lecture ou la liste des secrets, la création de rôles ou de liaisons de rôles (RBAC), la création de pods privilégiés ou montant le disque de l'hôte.",
        "Des appels refusés (403) en rafale : quelqu'un explore ses droits avec un jeton volé.",
      ],
    },
    {
      title: "Bien configurer l'audit",
      paragraphs: [
        "Définis une politique d'audit : niveau détaillé pour les secrets, exec et RBAC, niveau réduit pour le bruit (lectures de santé).",
        "Envoie les journaux hors du cluster, vers le SIEM, pour qu'un attaquant ne puisse pas les effacer.",
        "Réduis les droits des comptes de service et désactive le montage automatique de leur jeton quand l'application n'en a pas besoin.",
      ],
    },
  ],
  keyPoints: [
    "Le journal d'audit trace chaque appel à l'API du cluster.",
    "exec dans un pod, accès aux secrets et changements RBAC sont prioritaires.",
    "Un compte de service qui sort de ses habitudes est un signal fort.",
    "Journaux envoyés au SIEM, droits des comptes de service minimaux.",
  ],
  quiz: [
    {
      question: "Que révèle un « exec » sur un pod dans le journal d'audit ?",
      options: ["Un redémarrage automatique", "L'ouverture d'une commande ou d'un terminal dans le conteneur", "Une mise à jour d'image"],
      correct: 1,
      explanation: "La sous-ressource exec sert à lancer une commande dans un conteneur.",
    },
    {
      question: "Pourquoi envoyer ces journaux hors du cluster ?",
      options: ["Pour gagner de la place", "Pour qu'un attaquant qui contrôle le cluster ne puisse pas les effacer", "Parce que Kubernetes ne sait pas les stocker"],
      correct: 1,
      explanation: "Des preuves conservées ailleurs restent fiables.",
    },
    {
      question: "Quelle action d'un compte de service applicatif est la plus suspecte ?",
      options: ["Lire sa propre configuration", "Lister tous les secrets du cluster", "Répondre à une sonde de santé"],
      correct: 1,
      explanation: "Une application n'a normalement besoin que de ses propres secrets.",
    },
  ],
  sources: [
    { label: "Kubernetes — Auditing", url: "https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/" },
    { label: "ANSSI — Recommandations de sécurité relatives au déploiement de conteneurs Docker", url: "https://cyber.gouv.fr/publications/recommandations-de-securite-relatives-au-deploiement-de-conteneurs-docker" },
  ],
};
