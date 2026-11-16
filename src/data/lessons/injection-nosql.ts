import type { Lesson } from "@/lib/types";

export const INJECTION_NOSQL: Lesson = {
  slug: "injection-nosql",
  title: "L'injection NoSQL",
  icon: "🍃",
  theme: "web",
  level: "intermediaire",
  summary: "Pas de SQL ne veut pas dire pas d'injection : comment les bases de documents se font piéger, et comment valider les entrées.",
  duration: "7 min",
  objectives: [
    "Comprendre comment une requête NoSQL est construite",
    "Voir comment un opérateur injecté change son sens",
    "Mettre en place une validation stricte des entrées",
  ],
  sections: [
    {
      title: "Des requêtes sous forme d'objets",
      paragraphs: [
        "Les bases de documents stockent des objets JSON. Une recherche de compte ressemble souvent à un objet contenant le nom d'utilisateur et le mot de passe attendus.",
        "Ces bases proposent aussi des opérateurs (comparaison, expressions régulières…) qui s'écrivent eux aussi comme des objets, souvent avec des clés commençant par $.",
      ],
    },
    {
      title: "Comment l'injection fonctionne",
      paragraphs: [
        "Si l'application place directement les données reçues dans la requête, un client peut envoyer un objet avec un opérateur au lieu d'un texte.",
        "La condition « mot de passe égal à… » devient alors une condition toujours vraie : c'est le scénario de la salle « La base sans tables ».",
        "Certaines bases acceptent aussi du code JavaScript dans les requêtes : il faut désactiver cette possibilité si elle n'est pas utilisée.",
      ],
    },
    {
      title: "Se protéger",
      paragraphs: [
        "Valide chaque champ avec un schéma : type attendu (chaîne, nombre), longueur, format. Un mot de passe doit être une chaîne, jamais un objet.",
        "Supprime ou refuse les clés commençant par $ ou contenant un point dans les données venues du client, et utilise les fonctions de requête de la bibliothèque plutôt que de construire des requêtes à la main.",
        "Donne au compte de l'application uniquement les droits dont il a besoin sur la base.",
      ],
    },
  ],
  keyPoints: [
    "Les bases NoSQL ont aussi leurs injections.",
    "Le danger : un objet avec opérateur à la place d'une valeur simple.",
    "Valider le type de chaque champ bloque l'essentiel des attaques.",
    "Moindre privilège pour le compte de l'application sur la base.",
  ],
  quiz: [
    {
      question: "Une base NoSQL est-elle à l'abri des injections ?",
      options: ["Oui, sans SQL rien n'est injectable", "Non, des opérateurs peuvent être injectés", "Oui, si elle est hébergée dans le cloud"],
      correct: 1,
      explanation: "L'injection change seulement de forme.",
    },
    {
      question: "Quel type doit avoir un champ mot de passe reçu par l'API ?",
      options: ["N'importe lequel", "Un objet", "Une chaîne de caractères"],
      correct: 2,
      explanation: "Refuser les objets empêche d'y glisser un opérateur.",
    },
    {
      question: "Quelle mesure est la plus efficace ?",
      options: ["Valider les entrées avec un schéma strict", "Cacher le nom de la base", "Mettre le site en HTTPS uniquement"],
      correct: 0,
      explanation: "La validation bloque les données inattendues avant la requête.",
    },
  ],
  sources: [
    { label: "OWASP — Testing for NoSQL Injection", url: "https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/05.6-Testing_for_NoSQL_Injection" },
    { label: "OWASP — Input Validation Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html" },
  ],
};
