import type { Lesson } from "@/lib/types";

export const METADONNEES_CLOUD: Lesson = {
  slug: "metadonnees-cloud",
  title: "Le service de métadonnées cloud (IMDS)",
  icon: "☁️",
  theme: "soc",
  level: "avance",
  summary: "Protéger et surveiller l'adresse 169.254.169.254, porte d'entrée vers les identifiants des machines cloud.",
  duration: "9 min",
  objectives: [
    "Comprendre le rôle de l'IMDS",
    "Expliquer le lien entre SSRF et vol d'identifiants",
    "Détecter et bloquer les abus",
  ],
  sections: [
    {
      title: "À quoi sert l'IMDS",
      paragraphs: [
        "Chez les grands fournisseurs cloud, une machine virtuelle interroge une adresse locale (169.254.169.254) pour connaître sa configuration.",
        "Si un rôle est attaché à la machine, l'IMDS fournit des identifiants temporaires pour appeler les API du cloud.",
      ],
    },
    {
      title: "Le scénario d'attaque",
      paragraphs: [
        "Une faille SSRF permet de faire envoyer par l'application une requête vers une adresse choisie.",
        "Si l'IMDS répond sans contrôle, l'attaquant lit les identifiants du rôle et les utilise depuis sa propre machine, comme dans la salle.",
      ],
    },
    {
      title: "Durcir",
      paragraphs: [
        "Sur AWS, imposer IMDSv2 : il faut d'abord obtenir un jeton par une requête PUT avec un en-tête dédié, et la limite de sauts réseau bloque les conteneurs qui relaient.",
        "Appliquer le moindre privilège au rôle de la machine, et désactiver l'IMDS si elle n'en a pas besoin. Azure et Google Cloud exigent aussi un en-tête spécifique (Metadata, Metadata-Flavor).",
      ],
    },
    {
      title: "Détecter",
      paragraphs: [
        "Côté EDR : un processus inattendu (serveur web, interpréteur) qui contacte 169.254.169.254.",
        "Côté journaux cloud : des identifiants d'un rôle de machine utilisés depuis une IP extérieure au fournisseur. Certains services de détection cloud ont une alerte dédiée.",
        "Réponse : révoquer les sessions du rôle, corriger la faille, puis rechercher ce qui a été fait avec ces identifiants.",
      ],
    },
  ],
  keyPoints: [
    "L'IMDS peut fournir des identifiants temporaires.",
    "SSRF + IMDS non protégé = vol d'identifiants.",
    "IMDSv2, moindre privilège, et alerte sur l'usage hors du cloud.",
  ],
  quiz: [
    {
      question: "Quelle est l'adresse classique de l'IMDS ?",
      options: ["127.0.0.1", "169.254.169.254", "10.0.0.1"],
      correct: 1,
      explanation: "C'est une adresse link-local joignable depuis la machine.",
    },
    {
      question: "Pourquoi IMDSv2 gêne-t-il une SSRF simple ?",
      options: ["Il exige un jeton obtenu par une requête PUT avec un en-tête", "Il chiffre la réponse en Base64", "Il change d'adresse chaque jour"],
      correct: 0,
      explanation: "Une SSRF simple ne maîtrise souvent ni la méthode ni les en-têtes.",
    },
    {
      question: "Quel signal indique un vol d'identifiants de rôle ?",
      options: ["Leur usage depuis une IP hors du cloud", "Un redémarrage de la machine", "Une mise à jour du système"],
      correct: 0,
      explanation: "Ces identifiants ne devraient servir que depuis la machine.",
    },
  ],
  sources: [
    { label: "AWS — Utiliser IMDSv2", url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html" },
    { label: "Microsoft — Azure Instance Metadata Service", url: "https://learn.microsoft.com/fr-fr/azure/virtual-machines/instance-metadata-service" },
  ],
};
