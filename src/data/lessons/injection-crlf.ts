import type { Lesson } from "@/lib/types";

export const INJECTION_CRLF: Lesson = {
  slug: "injection-crlf",
  title: "L'injection CRLF et les en-têtes HTTP",
  icon: "↩️",
  theme: "web",
  level: "intermediaire",
  summary: "Deux caractères invisibles suffisent à ajouter de faux en-têtes à une réponse : comprendre et bloquer.",
  duration: "7 min",
  objectives: [
    "Comprendre le rôle de CR et LF dans HTTP",
    "Repérer une tentative d'injection dans les journaux",
    "Appliquer les bonnes défenses",
  ],
  sections: [
    {
      title: "CR, LF et le format HTTP",
      paragraphs: [
        "En HTTP/1.1, chaque ligne d'en-tête se termine par deux caractères : CR (retour chariot, %0D) et LF (saut de ligne, %0A). Une ligne vide sépare les en-têtes du corps.",
        "Si une application recopie une entrée utilisateur dans un en-tête (Location pour une redirection, Set-Cookie) sans filtrer ces caractères, l'entrée peut créer de nouvelles lignes.",
      ],
    },
    {
      title: "Les conséquences",
      paragraphs: [
        "Ajout d'un faux cookie chez la victime, redirection forcée, ou même une réponse entière fabriquée (HTTP response splitting).",
        "Les mêmes caractères glissés dans un journal créent de fausses lignes et brouillent l'enquête (injection de journaux).",
      ],
      example: "Paramètre décodé : lang=fr\\r\\nSet-Cookie: admin=1 → une ligne Set-Cookie apparaît dans la réponse.",
    },
    {
      title: "Détecter et se défendre",
      paragraphs: [
        "Dans les journaux, cherche %0D, %0A, leur double encodage (%250D) ou leur version Base64 dans les paramètres.",
        "Refuse ou supprime CR et LF dans toute valeur destinée à un en-tête ou à un journal. Les frameworks récents le font déjà : utilise leurs fonctions au lieu d'assembler les en-têtes à la main.",
        "Garde les serveurs et bibliothèques à jour, et place un WAF en filet de sécurité, pas en seule protection.",
      ],
    },
  ],
  keyPoints: [
    "CR LF (%0D%0A) termine chaque ligne d'en-tête HTTP.",
    "Une entrée non filtrée peut ajouter des en-têtes ou des lignes de journal.",
    "Défense : rejeter CR/LF et laisser le framework construire les en-têtes.",
  ],
  quiz: [
    {
      question: "Que représente %0D%0A ?",
      options: ["Une espace", "Un retour chariot suivi d'un saut de ligne", "Un point-virgule"],
      correct: 1,
      explanation: "C'est la fin de ligne en HTTP.",
    },
    {
      question: "Quel en-tête est une cible fréquente pour placer un faux cookie ?",
      options: ["Set-Cookie", "Accept-Language", "Content-Length"],
      correct: 0,
      explanation: "Il dépose un cookie dans le navigateur.",
    },
    {
      question: "Quelle est la meilleure défense ?",
      options: ["Masquer les erreurs", "Rejeter CR et LF dans les valeurs d'en-tête", "Passer en HTTP/1.0"],
      correct: 1,
      explanation: "Sans ces caractères, impossible de créer une nouvelle ligne.",
    },
  ],
  sources: [{ label: "OWASP — CRLF Injection", url: "https://owasp.org/www-community/vulnerabilities/CRLF_Injection" }],
};
