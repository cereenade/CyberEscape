import type { Lesson } from "@/lib/types";

export const API_CLOUD: Lesson = {
  slug: "api-cloud",
  title: "Sécurité des API et du cloud",
  icon: "☁️",
  theme: "web",
  level: "avance",
  summary: "Clés d'accès, stockage public, métadonnées, permissions : les erreurs qui coûtent cher dans le cloud.",
  duration: "8 min",
  objectives: [
    "Comprendre les risques propres aux API",
    "Repérer les mauvaises configurations cloud les plus courantes",
    "Appliquer le principe du moindre privilège dans le cloud",
  ],
  sections: [
    {
      title: "Les API, des portes d'entrée",
      paragraphs: [
        "Une API expose des données et des actions à d'autres programmes. Chaque point d'accès doit vérifier qui appelle (authentification) et ce qu'il a le droit de faire (autorisation).",
        "Erreurs fréquentes : IDOR (changer un identifiant pour accéder aux données d'autrui), réponses qui renvoient trop de champs, absence de limitation du nombre de requêtes, introspection GraphQL laissée ouverte.",
      ],
    },
    {
      title: "Les clés et les secrets",
      paragraphs: [
        "Une clé d'API ou une clé d'accès cloud publiée dans un dépôt de code est exploitée en quelques minutes par des robots.",
        "Les secrets se rangent dans des variables d'environnement ou un coffre (gestionnaire de secrets), avec des droits minimaux, et se révoquent immédiatement en cas de fuite.",
      ],
    },
    {
      title: "Les mauvaises configurations cloud",
      paragraphs: [
        "Stockage public par erreur (un bucket accessible à tous), base de données exposée à Internet, rôles trop puissants, journaux désactivés.",
        "Le modèle de responsabilité partagée : le fournisseur sécurise l'infrastructure, mais la configuration, les accès et les données restent ta responsabilité.",
      ],
    },
    {
      title: "SSRF et métadonnées",
      paragraphs: [
        "Dans le cloud, l'adresse 169.254.169.254 donne à une machine ses informations, et parfois des identifiants temporaires. Une faille SSRF permet à un attaquant de les lire.",
        "Parades : bloquer les adresses internes dans les requêtes sortantes, protéger le service de métadonnées (IMDSv2 chez AWS), donner aux machines des rôles minimaux.",
      ],
    },
  ],
  keyPoints: [
    "Chaque point d'API vérifie l'authentification ET l'autorisation.",
    "Une clé publiée est compromise : on la révoque tout de suite.",
    "Dans le cloud, la configuration et les accès sont de ta responsabilité.",
    "SSRF + métadonnées cloud = vol d'identifiants : bloque les adresses internes.",
  ],
  quiz: [
    {
      question: "Qui est responsable de la configuration d'un stockage cloud ?",
      options: ["Le fournisseur cloud", "Le client qui l'utilise", "Personne"],
      correct: 1,
      explanation: "C'est le modèle de responsabilité partagée.",
    },
    {
      question: "À quoi correspond l'adresse 169.254.169.254 dans le cloud ?",
      options: ["Au DNS public", "Au service de métadonnées de la machine", "À la box internet"],
      correct: 1,
      explanation: "Elle est visée par les attaques SSRF.",
    },
    {
      question: "Une API renvoie le mot de passe haché de chaque utilisateur dans son profil public. C'est…",
      options: ["Normal", "Une exposition excessive de données", "Une bonne pratique de transparence"],
      correct: 1,
      explanation: "Une API ne doit renvoyer que les champs strictement nécessaires.",
    },
  ],
};
