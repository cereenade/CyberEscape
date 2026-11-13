import type { Lesson } from "@/lib/types";

export const LIRE_JOURNAUX: Lesson = {
  slug: "lire-journaux",
  title: "Lire un journal comme un analyste",
  icon: "📜",
  theme: "soc",
  level: "debutant",
  summary: "Une méthode simple pour transformer des lignes de journaux en une histoire.",
  duration: "7 min",
  objectives: [
    "Lire une ligne de journal web ou d'authentification",
    "Ramener toutes les heures sur le même fuseau",
    "Repérer les signaux classiques (scan, force brute, connexion inhabituelle)",
  ],
  sections: [
    {
      title: "Les champs à repérer",
      paragraphs: [
        "Presque chaque ligne répond aux mêmes questions : quand, qui (compte), d'où (IP), quoi (action), avec quel résultat.",
        "Dans un journal web : IP, date, méthode, chemin, code de réponse (200, 403, 404, 500) et taille.",
      ],
      example: "198.51.100.23 - - [12/Mar/2026:03:14:07 +0100] \"GET /admin/backup.zip HTTP/1.1\" 200 48211337",
    },
    {
      title: "Le temps",
      paragraphs: [
        "Le « Z » signifie UTC. Paris est à UTC+1 en hiver, UTC+2 en été : avant de comparer deux sources, on ramène tout sur le même fuseau.",
        "Des horloges non synchronisées (sans NTP) faussent toute chronologie.",
      ],
    },
    {
      title: "Les signaux classiques",
      paragraphs: [
        "Des centaines de 404 depuis une IP : un scan. Des « Failed password » en rafale : de la force brute. Un succès juste après : une alerte.",
        "Une connexion réussie hors horaires, depuis un pays inhabituel, ou d'un compte de service en interactif mérite une vérification.",
      ],
    },
    {
      title: "Noter au fur et à mesure",
      paragraphs: [
        "On note chaque observation avec son heure et sa source : c'est la base de la chronologie et du rapport.",
        "On distingue les faits (« le compte backup s'est connecté à 03:02 ») des hypothèses (« probablement par force brute »).",
      ],
    },
  ],
  keyPoints: [
    "Quand, qui, d'où, quoi, résultat.",
    "Toutes les heures sur le même fuseau, en UTC de préférence.",
    "Échecs en rafale puis succès = alerte.",
    "Séparer les faits des hypothèses dans ses notes.",
  ],
  quiz: [
    {
      question: "Dans un journal web, que signifie le code 403 ?",
      options: ["Succès", "Accès interdit", "Erreur serveur"],
      correct: 1,
      explanation: "Le serveur refuse l'accès à la ressource.",
    },
    {
      question: "02:30Z correspond à quelle heure à Paris en hiver ?",
      options: ["02:30", "03:30", "04:30"],
      correct: 1,
      explanation: "Paris est à UTC+1 en hiver.",
    },
    {
      question: "50 « Failed password » puis un « Accepted » depuis la même IP évoquent…",
      options: ["Une force brute réussie", "Un utilisateur distrait", "Une mise à jour"],
      correct: 0,
      explanation: "Le succès après la rafale d'échecs est très inquiétant.",
    },
  ],
};
