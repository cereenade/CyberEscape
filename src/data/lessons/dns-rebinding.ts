import type { Lesson } from "@/lib/types";

export const DNS_REBINDING: Lesson = {
  slug: "dns-rebinding",
  title: "Le DNS rebinding",
  icon: "🔁",
  theme: "reseau",
  level: "intermediaire",
  summary: "Comment un site externe peut atteindre un appareil interne via le navigateur, et comment l'en empêcher.",
  duration: "8 min",
  objectives: [
    "Comprendre la politique de même origine",
    "Suivre les étapes d'un DNS rebinding",
    "Protéger les services internes",
  ],
  sections: [
    {
      title: "La même origine… par le nom",
      paragraphs: [
        "Le navigateur laisse une page lire les réponses de son propre domaine. Il compare le nom de domaine, le protocole et le port, pas l'adresse IP derrière.",
        "Si l'adresse d'un domaine change pendant la visite, le navigateur considère qu'il parle toujours au même site.",
      ],
    },
    {
      title: "Le déroulé",
      paragraphs: [
        "L'attaquant sert une page depuis son domaine, avec un TTL DNS très court.",
        "Une fois la réponse DNS expirée, il fait pointer ce domaine vers une adresse interne (routeur, imprimante, service local).",
        "Le script de la page envoie alors ses requêtes à l'appareil interne, avec l'accès réseau de la victime : c'est ce qui est arrivé au routeur dans la salle.",
      ],
    },
    {
      title: "Se protéger",
      paragraphs: [
        "Côté services internes : vérifier l'en-tête Host, exiger une authentification même sur le réseau local, utiliser HTTPS.",
        "Côté réseau : faire filtrer par le résolveur DNS les réponses externes qui renvoient des adresses privées (protection anti-rebinding de nombreuses box et résolveurs).",
        "Les navigateurs récents ajoutent aussi des protections pour l'accès aux réseaux privés, mais elles ne dispensent pas de sécuriser les services.",
      ],
    },
  ],
  keyPoints: [
    "Le navigateur juge l'origine par le nom, pas par l'IP.",
    "TTL court + changement d'adresse = rebinding.",
    "Les services internes sans mot de passe sont les cibles idéales.",
    "Vérifier Host, authentifier, filtrer les IP privées au résolveur.",
  ],
  quiz: [
    {
      question: "Pourquoi l'attaquant utilise-t-il un TTL très court ?",
      options: ["Pour accélérer la page", "Pour que le navigateur redemande vite l'adresse et reçoive la nouvelle", "Pour chiffrer la requête"],
      correct: 1,
      explanation: "Le changement d'adresse doit être pris en compte rapidement.",
    },
    {
      question: "Quelle vérification côté serveur interne bloque l'attaque ?",
      options: ["Vérifier l'en-tête Host attendu", "Changer la couleur de la page", "Désactiver les images"],
      correct: 0,
      explanation: "Le Host contient le domaine de l'attaquant, pas celui du service.",
    },
    {
      question: "Que doit filtrer le résolveur DNS ?",
      options: ["Toutes les réponses", "Les réponses de domaines externes qui pointent vers des adresses privées", "Les domaines en .fr"],
      correct: 1,
      explanation: "C'est la protection anti-rebinding.",
    },
  ],
  sources: [
    { label: "DNS rebinding (Wikipédia)", url: "https://fr.wikipedia.org/wiki/DNS_rebinding" },
  ],
};
