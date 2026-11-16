import type { Lesson } from "@/lib/types";

export const X_FORWARDED_FOR: Lesson = {
  slug: "x-forwarded-for",
  title: "X-Forwarded-For : à qui faire confiance ?",
  icon: "🎭",
  theme: "web",
  level: "intermediaire",
  summary: "Comment les proxys transmettent l'adresse du client, pourquoi cet en-tête se falsifie et comment l'utiliser sans risque.",
  duration: "7 min",
  objectives: [
    "Comprendre le rôle de X-Forwarded-For derrière un proxy",
    "Identifier les contrôles qu'un en-tête falsifié peut contourner",
    "Configurer une confiance limitée aux proxys connus",
  ],
  sections: [
    {
      title: "Le rôle de l'en-tête",
      paragraphs: [
        "Derrière un répartiteur de charge ou un CDN, l'application voit l'adresse du proxy, pas celle du visiteur. Le proxy ajoute donc X-Forwarded-For avec l'adresse d'origine.",
        "Chaque proxy traversé ajoute une adresse à droite de la liste. La version normalisée de cet en-tête s'appelle Forwarded (RFC 7239).",
      ],
    },
    {
      title: "Pourquoi il ment facilement",
      paragraphs: [
        "C'est un simple en-tête HTTP : le client peut l'envoyer lui-même avec la valeur qu'il veut, comme « 127.0.0.1 ».",
        "Si l'application lui fait confiance, l'attaquant contourne une liste d'adresses autorisées (salle « L'adresse qui mentait »), une limite de tentatives par IP ou fausse les journaux.",
      ],
    },
    {
      title: "Bien s'en servir",
      paragraphs: [
        "Déclare la liste des proxys de confiance dans le serveur ou le framework, et ne lis l'en-tête que pour les requêtes qui viennent d'eux.",
        "Garde l'adresse ajoutée par ton dernier proxy de confiance (la plus à droite après eux), jamais la première de la liste.",
        "Protège les pages sensibles par un filtrage réseau et une authentification forte, pas seulement par l'adresse IP.",
      ],
    },
  ],
  keyPoints: [
    "X-Forwarded-For transmet l'adresse du client derrière un proxy.",
    "N'importe quel client peut écrire cet en-tête.",
    "Ne lui faire confiance que s'il vient d'un proxy connu.",
    "Une adresse IP ne remplace pas une authentification.",
  ],
  quiz: [
    {
      question: "Qui peut écrire l'en-tête X-Forwarded-For ?",
      options: ["Seulement le proxy", "N'importe quel client", "Seulement le navigateur Chrome"],
      correct: 1,
      explanation: "C'est un en-tête HTTP comme un autre : rien n'empêche un client de l'ajouter.",
    },
    {
      question: "Quelle adresse de la liste ne faut-il jamais croire aveuglément ?",
      options: ["La première, écrite par le client", "Celle ajoutée par ton proxy de confiance", "Aucune, elles sont toutes signées"],
      correct: 0,
      explanation: "La première valeur peut avoir été inventée par le client.",
    },
    {
      question: "Quelle est la bonne protection pour une page d'administration ?",
      options: ["Vérifier que X-Forwarded-For vaut 127.0.0.1", "Filtrer au niveau réseau et exiger une authentification forte", "Changer l'adresse de la page"],
      correct: 1,
      explanation: "Plusieurs couches solides valent mieux qu'un en-tête modifiable.",
    },
  ],
  sources: [
    { label: "RFC 7239 — Forwarded HTTP Extension", url: "https://www.rfc-editor.org/rfc/rfc7239" },
    { label: "MDN — X-Forwarded-For", url: "https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/X-Forwarded-For" },
  ],
};
