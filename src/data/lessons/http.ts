import type { Lesson } from "@/lib/types";

export const HTTP: Lesson = {
  slug: "http",
  title: "HTTP en détail : requêtes, réponses, en-têtes",
  icon: "📨",
  theme: "web",
  level: "debutant",
  summary: "Ce qui se passe vraiment quand tu ouvres une page web, ligne par ligne.",
  duration: "6 min",
  objectives: [
    "Lire une requête et une réponse HTTP",
    "Connaître les méthodes et les codes de réponse principaux",
    "Comprendre le rôle des en-têtes et des cookies",
  ],
  sections: [
    {
      title: "Une requête",
      paragraphs: [
        "Le navigateur envoie une méthode, un chemin et des en-têtes. GET demande une ressource, POST envoie des données (un formulaire, par exemple).",
        "Les en-têtes donnent le contexte : le site visé (Host), le navigateur utilisé (User-Agent), les cookies de session (Cookie).",
      ],
      example: "GET /jeu HTTP/1.1\nHost: cyber-escape.fr\nUser-Agent: Mozilla/5.0 …\nCookie: session=7f3a91",
    },
    {
      title: "Une réponse",
      paragraphs: [
        "Le serveur répond par un code, des en-têtes, puis le contenu. Les codes se lisent par famille : 2xx succès, 3xx redirection, 4xx erreur du client, 5xx erreur du serveur.",
        "À connaître : 200 OK, 301/302 redirection, 401 non authentifié, 403 interdit, 404 introuvable, 500 erreur interne.",
      ],
      example: "HTTP/1.1 200 OK\nContent-Type: text/html\nSet-Cookie: session=7f3a91; HttpOnly; Secure",
    },
    {
      title: "Cookies et sessions",
      paragraphs: [
        "HTTP ne se souvient de rien : le serveur dépose un cookie (Set-Cookie) que le navigateur renvoie ensuite à chaque requête.",
        "Les attributs HttpOnly (illisible par JavaScript), Secure (envoyé seulement en HTTPS) et SameSite (limite les envois depuis d'autres sites) protègent le cookie de session.",
      ],
    },
    {
      title: "Ce qu'un analyste en retient",
      paragraphs: [
        "Dans les journaux d'un serveur web, la méthode, le chemin, le code de réponse et le User-Agent suffisent souvent à repérer une attaque : des centaines de 404 (scan), un 200 sur un chemin sensible, un User-Agent d'outil automatique.",
      ],
    },
  ],
  keyPoints: [
    "GET lit, POST envoie. Les en-têtes donnent le contexte de la requête.",
    "2xx succès, 3xx redirection, 4xx erreur du client, 5xx erreur du serveur.",
    "401 = pas connecté, 403 = connecté mais interdit.",
    "Un cookie de session doit être HttpOnly, Secure et SameSite.",
  ],
  quiz: [
    {
      question: "Quelle méthode HTTP sert à envoyer un formulaire ?",
      options: ["GET", "POST", "HEAD"],
      correct: 1,
      explanation: "POST transporte des données dans le corps de la requête.",
    },
    {
      question: "Un code 500 signifie…",
      options: ["Page introuvable", "Erreur côté serveur", "Accès interdit"],
      correct: 1,
      explanation: "Les codes 5xx indiquent un problème du serveur.",
    },
    {
      question: "L'attribut HttpOnly sur un cookie empêche…",
      options: ["JavaScript de le lire", "Le serveur de le lire", "Son envoi en HTTPS"],
      correct: 0,
      explanation: "Il limite les dégâts d'une faille XSS en cachant le cookie aux scripts.",
    },
  ],
};
