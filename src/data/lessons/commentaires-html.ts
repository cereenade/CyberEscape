import type { Lesson } from "@/lib/types";

export const COMMENTAIRES_HTML: Lesson = {
  slug: "commentaires-html",
  title: "Ce que le code source dévoile",
  icon: "💬",
  theme: "web",
  level: "intermediaire",
  summary: "Commentaires HTML, notes internes et chaînes encodées : tout ce qui est envoyé au navigateur est lisible par tous.",
  duration: "6 min",
  objectives: [
    "Savoir lire le code source d'une page",
    "Repérer les informations sensibles laissées dans les commentaires",
    "Mettre en place les bonnes pratiques de mise en ligne",
  ],
  sections: [
    {
      title: "Invisible ne veut pas dire secret",
      paragraphs: [
        "Un commentaire HTML s'écrit <!-- ... -->. Le navigateur ne l'affiche pas, mais il le reçoit avec le reste de la page.",
        "N'importe qui peut le lire avec « Afficher le code source » ou les outils de développement du navigateur.",
        "Il en va de même pour les fichiers JavaScript et CSS : tout ce qui part vers le navigateur est public.",
      ],
    },
    {
      title: "Ce qu'on y trouve parfois",
      paragraphs: [
        "Des notes de développeurs : « TODO retirer avant la mise en ligne », des noms d'environnements de test, des chemins vers des pages d'administration.",
        "Des identifiants de test, des clés d'API ou des adresses internes oubliées.",
        "Des informations « cachées » en Base64 : comme dans la salle, cHJlcHJvZA== se décode en un clic et donne preprod.",
      ],
    },
    {
      title: "Les bonnes pratiques",
      paragraphs: [
        "Retirer automatiquement les commentaires et minifier le code au moment de la mise en ligne.",
        "Ne jamais mettre de secret côté navigateur : une clé d'API sensible reste sur le serveur.",
        "Relire le code source de ses propres pages avant publication, et intégrer cette vérification dans les revues de code.",
      ],
    },
  ],
  keyPoints: [
    "Tout ce qui est envoyé au navigateur peut être lu.",
    "Un commentaire HTML est invisible à l'écran, pas dans le code source.",
    "Base64 est un encodage, pas une protection.",
    "Les commentaires internes se retirent automatiquement à la mise en ligne.",
  ],
  quiz: [
    {
      question: "Un commentaire HTML est-il visible par les visiteurs ?",
      options: ["Non, jamais", "Oui, dans le code source de la page", "Seulement pour les administrateurs"],
      correct: 1,
      explanation: "Il n'est pas affiché, mais il est envoyé à chaque visiteur.",
    },
    {
      question: "Un développeur « cache » un mot de passe en Base64 dans un commentaire. C'est…",
      options: ["Sûr, Base64 est un chiffrement", "Inutile : Base64 se décode sans clé", "Sûr si le commentaire est en bas de page"],
      correct: 1,
      explanation: "Base64 est un encodage réversible par tout le monde.",
    },
    {
      question: "Quelle est la meilleure pratique ?",
      options: ["Retirer automatiquement les commentaires lors de la mise en ligne", "Écrire les commentaires en anglais", "Mettre les commentaires dans un fichier CSS"],
      correct: 0,
      explanation: "Une étape automatique évite d'oublier une note interne.",
    },
  ],
  sources: [
    { label: "OWASP : Review Webpage Content for Information Leakage", url: "https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/05-Review_Web_Page_Content_for_Information_Leakage" },
  ],
};
