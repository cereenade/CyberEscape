import type { Lesson } from "@/lib/types";

export const SSL_STRIPPING_HSTS: Lesson = {
  slug: "ssl-stripping-hsts",
  title: "SSL stripping et HSTS",
  icon: "🔓",
  theme: "web",
  level: "intermediaire",
  summary: "Comment un attaquant garde une connexion en clair, et comment HSTS force le navigateur à rester en HTTPS.",
  duration: "8 min",
  objectives: [
    "Comprendre pourquoi la première requête http est fragile",
    "Expliquer le principe du SSL stripping",
    "Configurer HSTS et connaître le préchargement",
  ],
  sections: [
    {
      title: "La première requête",
      paragraphs: [
        "Quand tu tapes serveur-corp.fr sans https://, le navigateur commence souvent par une requête http.",
        "Le site répond par une redirection vers https. Mais cette toute première requête circule en clair.",
      ],
    },
    {
      title: "Le principe du SSL stripping",
      paragraphs: [
        "Un attaquant placé entre toi et le site (faux point d'accès Wi-Fi, réseau local compromis) intercepte cette requête.",
        "Il parle en HTTPS avec le vrai site, mais te répond en http. Tu vois la page normale, sans cadenas : tes identifiants passent en clair.",
        "Le seul indice visible est l'absence de https et de cadenas dans la barre d'adresse.",
      ],
    },
    {
      title: "HSTS, la parade",
      paragraphs: [
        "L'en-tête Strict-Transport-Security indique au navigateur : « pour ce domaine, toujours HTTPS, pendant telle durée ».",
        "Après une première visite, le navigateur transforme lui-même tout lien http en https, sans passer par le réseau.",
        "Avec HSTS, une erreur de certificat devient bloquante : l'utilisateur ne peut plus cliquer sur « continuer quand même ».",
      ],
      example: "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload",
    },
    {
      title: "Le préchargement",
      paragraphs: [
        "HSTS ne protège pas la toute première visite. La liste de préchargement, intégrée aux navigateurs, comble ce trou.",
        "Avant de s'y inscrire, il faut que tous les sous-domaines fonctionnent en HTTPS : la sortie de la liste prend du temps.",
      ],
    },
  ],
  keyPoints: [
    "Une simple redirection http → https ne suffit pas.",
    "Le SSL stripping garde la victime en http sans qu'elle s'en rende compte.",
    "HSTS force le HTTPS côté navigateur.",
    "Le préchargement protège aussi la première visite.",
  ],
  quiz: [
    {
      question: "Pourquoi une redirection http → https ne suffit-elle pas ?",
      options: ["Elle est trop lente", "La requête http initiale peut être interceptée", "Elle n'est pas compatible avec les mobiles"],
      correct: 1,
      explanation: "L'attaquant agit avant que la redirection n'arrive.",
    },
    {
      question: "Que fait l'en-tête Strict-Transport-Security ?",
      options: ["Il chiffre les cookies", "Il oblige le navigateur à n'utiliser que HTTPS pour ce domaine", "Il bloque les scripts externes"],
      correct: 1,
      explanation: "Le navigateur convertit lui-même http en https.",
    },
    {
      question: "Quel est l'intérêt de la liste de préchargement HSTS ?",
      options: ["Protéger la toute première visite", "Accélérer le chargement des pages", "Remplacer le certificat TLS"],
      correct: 0,
      explanation: "Le navigateur connaît la règle avant même la première connexion.",
    },
  ],
  sources: [
    { label: "RFC 6797 : HTTP Strict Transport Security (HSTS)", url: "https://www.rfc-editor.org/rfc/rfc6797" },
    { label: "Liste de préchargement HSTS", url: "https://hstspreload.org/" },
  ],
};
