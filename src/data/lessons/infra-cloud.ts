import type { Lesson } from "@/lib/types";

export const INFRA_CLOUD: Lesson = {
  slug: "infra-cloud",
  title: "Sécuriser le cloud et les conteneurs",
  icon: "☁️",
  theme: "infra",
  level: "avance",
  summary: "Responsabilité partagée, configuration en code, conteneurs et Kubernetes : les règles du jeu dans le cloud.",
  duration: "10 min",
  objectives: [
    "Comprendre le modèle de responsabilité partagée",
    "Éviter les erreurs de configuration les plus courantes",
    "Sécuriser images de conteneurs et clusters Kubernetes",
  ],
  sections: [
    {
      title: "Qui protège quoi ?",
      paragraphs: [
        "Le fournisseur sécurise l'infrastructure (centres de données, matériel, hyperviseur). Le client reste responsable de ses données, de ses identités et de sa configuration.",
        "Plus on monte vers le SaaS, plus le fournisseur prend en charge ; mais les accès et les données restent toujours à la charge du client.",
      ],
    },
    {
      title: "Les erreurs classiques",
      paragraphs: [
        "Stockage laissé public, clés d'accès dans du code, comptes trop puissants, journaux d'audit désactivés, absence de MFA sur la console.",
        "Les outils de gestion de la posture (CSPM) et les règles de conformité automatisées repèrent ces écarts en continu.",
      ],
    },
    {
      title: "L'infrastructure en code",
      paragraphs: [
        "Terraform ou équivalents décrivent l'infrastructure dans des fichiers : on peut relire, versionner et analyser la sécurité avant le déploiement.",
        "Les secrets ne sont jamais écrits dans ces fichiers : ils viennent d'un coffre-fort de secrets.",
      ],
    },
    {
      title: "Conteneurs et Kubernetes",
      paragraphs: [
        "Images minimales et analysées, pas de conteneur privilégié, exécution sans root, pas de secret dans l'image.",
        "Dans Kubernetes : contrôle d'accès RBAC au plus juste, politiques réseau entre services, mises à jour régulières du cluster.",
      ],
    },
  ],
  keyPoints: [
    "Données, identités et configuration restent à la charge du client.",
    "Stockage public et clés exposées : les erreurs les plus fréquentes.",
    "Infrastructure en code relue et analysée, secrets dans un coffre-fort.",
    "Conteneurs minimaux, non privilégiés ; RBAC et politiques réseau dans Kubernetes.",
  ],
  quiz: [
    {
      question: "Dans le cloud, qui est responsable de la configuration des accès ?",
      options: ["Le fournisseur", "Le client", "Personne"],
      correct: 1,
      explanation: "C'est le cœur du modèle de responsabilité partagée.",
    },
    {
      question: "Où stocker les secrets d'une infrastructure décrite en code ?",
      options: ["Dans les fichiers Terraform", "Dans un coffre-fort de secrets", "Dans un mail"],
      correct: 1,
      explanation: "Les fichiers de code sont partagés et versionnés.",
    },
    {
      question: "Quel réglage éviter pour un conteneur ?",
      options: ["Le mode privilégié", "Une image minimale", "Un utilisateur non root"],
      correct: 0,
      explanation: "Un conteneur privilégié peut prendre le contrôle de l'hôte.",
    },
  ],
  sources: [
    { label: "CIS Benchmarks – fournisseurs cloud et Kubernetes", url: "https://www.cisecurity.org/cis-benchmarks" },
    { label: "Kubernetes – Security Checklist", url: "https://kubernetes.io/docs/concepts/security/security-checklist/" },
  ],
};
