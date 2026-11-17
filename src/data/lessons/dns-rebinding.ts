import type { Lesson } from "@/lib/types";

export const DNS_REBINDING: Lesson = {
  slug: "dns-rebinding",
  title: "Le DNS rebinding",
  icon: "🔄",
  theme: "web",
  level: "intermediaire",
  summary: "Quand un nom de domaine change d'adresse pour faire parler le navigateur à un service interne.",
  duration: "8 min",
  objectives: [
    "Comprendre le lien entre origine et nom de domaine",
    "Décrire les étapes d'un DNS rebinding",
    "Protéger les services internes",
  ],
  sections: [
    {
      title: "L'origine du navigateur",
      paragraphs: [
        "La règle de même origine compare le schéma, le nom et le port. Elle ne regarde pas l'adresse IP derrière le nom.",
        "Si un nom change d'adresse, le navigateur considère toujours que c'est le même site.",
      ],
    },
    {
      title: "Le déroulé",
      paragraphs: [
        "La victime visite une page sur un domaine contrôlé par l'attaquant. Le DNS répond avec son serveur, et un TTL très court.",
        "Quand le TTL expire, le DNS répond avec une adresse interne (routeur, service local). Le script de la page envoie alors ses requêtes vers ce service, en restant sur la même origine.",
      ],
    },
    {
      title: "Les cibles",
      paragraphs: [
        "Interfaces d'administration de routeurs, objets connectés, services de développement sur localhost, API internes sans authentification.",
        "Ces services comptent souvent sur le fait d'être « invisibles depuis Internet ».",
      ],
    },
    {
      title: "Se protéger",
      paragraphs: [
        "Côté service : vérifier l'en-tête Host et refuser les noms inattendus, et exiger une authentification même en interne.",
        "Côté réseau : filtrer les réponses DNS publiques qui pointent vers des adresses privées (protection anti-rebinding des résolveurs).",
        "Les navigateurs ajoutent aussi des protections pour l'accès au réseau privé, mais il ne faut pas compter uniquement sur elles.",
      ],
    },
  ],
  keyPoints: [
    "L'origine dépend du nom, pas de l'IP.",
    "TTL court + changement d'adresse = rebinding.",
    "En-tête Host vérifié, authentification interne, filtrage DNS.",
  ],
  quiz: [
    {
      question: "Sur quoi repose la règle de même origine ?",
      options: ["L'adresse IP", "Le schéma, le nom et le port", "Le certificat uniquement"],
      correct: 1,
      explanation: "C'est pourquoi un changement d'IP passe inaperçu.",
    },
    {
      question: "Pourquoi l'attaquant utilise-t-il un TTL très court ?",
      options: ["Pour changer vite l'adresse renvoyée", "Pour accélérer la page", "Pour chiffrer le DNS"],
      correct: 0,
      explanation: "Le navigateur redemande l'adresse rapidement.",
    },
    {
      question: "Quelle défense côté service est efficace ?",
      options: ["Vérifier l'en-tête Host", "Changer de port", "Masquer le nom du routeur"],
      correct: 0,
      explanation: "Un nom inattendu dans Host trahit le rebinding.",
    },
  ],
  sources: [
    { label: "OWASP — DNS Rebinding", url: "https://owasp.org/www-community/attacks/DNS_Rebinding" },
    { label: "RFC 6454 — The Web Origin Concept", url: "https://www.rfc-editor.org/rfc/rfc6454" },
  ],
};
