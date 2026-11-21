import type { Lesson } from "@/lib/types";

export const JOURNAL_ACCES_WEB: Lesson = {
  slug: "journal-acces-web",
  title: "Lire le journal d'accès d'un serveur web",
  icon: "📜",
  theme: "web",
  level: "intermediaire",
  summary: "Décortiquer une ligne d'access.log, reconnaître un scan et réagir sans paniquer.",
  duration: "7 min",
  objectives: [
    "Lire chaque champ d'une ligne de journal d'accès",
    "Reconnaître un scan de fichiers oubliés",
    "Savoir quoi vérifier et comment réagir",
  ],
  sections: [
    {
      title: "Anatomie d'une ligne",
      paragraphs: [
        "Une ligne de journal d'accès contient l'adresse IP du visiteur, la date et l'heure, la méthode (GET, POST), la page demandée, le code de réponse, la taille de la réponse et souvent le User-Agent.",
        "Exemple : 203.0.113.45 - [21/Nov 10:02:03] \"GET /admin/\" 404.",
      ],
    },
    {
      title: "Les codes de réponse à connaître",
      paragraphs: [
        "200 : la page existe et a été envoyée. 301/302 : redirection. 403 : accès interdit. 404 : page introuvable. 500 : erreur du serveur.",
        "Quelques 404 isolées sont normales (lien cassé, vieille image). Des dizaines en quelques secondes depuis une même adresse, beaucoup moins.",
      ],
    },
    {
      title: "Reconnaître un scan",
      paragraphs: [
        "Un scanner teste une liste de chemins classiques : /admin, /backup.zip, /.env, /.git/, /old/… à toute vitesse.",
        "Le signe le plus inquiétant n'est pas la 404, mais une réponse 200 sur un fichier sensible : il a peut-être été téléchargé.",
        "Le User-Agent peut aider, mais il se falsifie facilement : fie-toi surtout au rythme et aux chemins demandés.",
      ],
    },
    {
      title: "Réagir",
      paragraphs: [
        "Vérifier qu'aucune page sensible n'a répondu 200 et, si c'est le cas, traiter le fichier exposé (retrait, changement des secrets).",
        "Limiter le nombre de requêtes par adresse, ou bloquer l'adresse si le scan continue.",
        "Centraliser les journaux pour repérer les scans sur plusieurs serveurs à la fois.",
      ],
    },
  ],
  keyPoints: [
    "Une ligne = qui, quand, quoi, et avec quel résultat.",
    "Une rafale de 404 sur des chemins sensibles signale un scan.",
    "Une 200 sur un fichier sensible est le vrai signal d'alarme.",
    "Limiter le débit et centraliser les journaux.",
  ],
  quiz: [
    {
      question: "Que signifie le code 404 ?",
      options: ["Accès interdit", "Page introuvable", "Erreur du serveur"],
      correct: 1,
      explanation: "La page demandée n'existe pas.",
    },
    {
      question: "Lors d'un scan, quelle réponse doit t'inquiéter le plus ?",
      options: ["Une 404 sur /admin/", "Une 200 sur /backup.zip", "Une 404 sur une vieille image"],
      correct: 1,
      explanation: "Le fichier existe et a probablement été téléchargé.",
    },
    {
      question: "Peut-on se fier au User-Agent pour identifier un scanner ?",
      options: ["Oui, il est impossible à modifier", "Pas totalement : il se falsifie facilement", "Oui, s'il contient le mot Mozilla"],
      correct: 1,
      explanation: "Le rythme et les chemins demandés sont des indices plus fiables.",
    },
  ],
  sources: [
    { label: "Apache : Log Files", url: "https://httpd.apache.org/docs/current/logs.html" },
    { label: "RFC 9110 : HTTP Semantics (codes de réponse)", url: "https://www.rfc-editor.org/rfc/rfc9110" },
  ],
};
