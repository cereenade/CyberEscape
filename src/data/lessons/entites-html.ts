import type { Lesson } from "@/lib/types";

export const ENTITES_HTML: Lesson = {
  slug: "entites-html",
  title: "Les entités HTML et l'échappement",
  icon: "🔣",
  theme: "web",
  level: "intermediaire",
  summary: "&lt;, &amp;, &#83; : comment le HTML représente les caractères spéciaux, et pourquoi c'est la base de la protection contre les XSS.",
  duration: "6 min",
  objectives: [
    "Lire les entités nommées et numériques",
    "Comprendre le lien entre échappement et XSS",
    "Décoder un texte caché dans des entités",
  ],
  sections: [
    {
      title: "Deux familles d'entités",
      paragraphs: [
        "Les entités nommées remplacent les caractères qui ont un sens en HTML : &lt; pour <, &gt; pour >, &amp; pour &, &quot; pour les guillemets.",
        "Les entités numériques désignent n'importe quel caractère par son code : &#83; en décimal ou &#x53; en hexadécimal donnent « S ».",
        "Dans la salle « Le commentaire étrange », &#83;&#79;&#67; s'affiche donc « SOC ».",
      ],
    },
    {
      title: "L'échappement contre les XSS",
      paragraphs: [
        "Si un site affiche tel quel un commentaire contenant <script>, le navigateur l'exécute : c'est une faille XSS.",
        "En transformant < et > en &lt; et &gt; avant l'affichage, le navigateur montre le texte sans l'interpréter. Les frameworks modernes le font par défaut.",
        "Attention au contexte : dans un attribut, un script ou une URL, les règles d'échappement ne sont pas les mêmes.",
      ],
    },
    {
      title: "Les entités côté analyste",
      paragraphs: [
        "Des pages de phishing encodent leur texte en entités pour échapper aux filtres qui cherchent des mots précis.",
        "Pour analyser un code source suspect, décode les entités (outil de décodage HTML ou table ASCII) avant de conclure.",
      ],
    },
  ],
  keyPoints: [
    "&lt; &gt; &amp; &quot; : les entités nommées essentielles.",
    "&#NN; (décimal) et &#xNN; (hexadécimal) désignent un caractère par son code.",
    "Échapper selon le contexte est la base de la défense contre les XSS.",
    "Un texte en entités peut cacher un mot aux filtres naïfs.",
  ],
  quiz: [
    {
      question: "Quel caractère représente « &lt; » ?",
      options: ["<", ">", "&"],
      correct: 0,
      explanation: "lt signifie « less than », plus petit que.",
    },
    {
      question: "Que donne « &#65; » ?",
      options: ["Le chiffre 6", "La lettre A", "Un espace"],
      correct: 1,
      explanation: "65 est le code ASCII de « A ».",
    },
    {
      question: "Pourquoi échapper < et > avant d'afficher un commentaire ?",
      options: ["Pour gagner de la place", "Pour que le navigateur affiche le texte au lieu d'exécuter du code", "Pour chiffrer le commentaire"],
      correct: 1,
      explanation: "C'est la protection de base contre les failles XSS.",
    },
  ],
  sources: [
    { label: "OWASP — Cross Site Scripting Prevention Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html" },
    { label: "MDN — Entité (glossaire)", url: "https://developer.mozilla.org/fr/docs/Glossary/Entity" },
  ],
};
