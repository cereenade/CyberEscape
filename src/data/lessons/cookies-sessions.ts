import type { Lesson } from "@/lib/types";

export const COOKIES_SESSIONS: Lesson = {
  slug: "cookies-sessions",
  title: "Cookies et sessions",
  icon: "🍪",
  theme: "web",
  level: "debutant",
  summary: "Comment un site se souvient que tu es connecté, et pourquoi c'est une cible.",
  duration: "6 min",
  objectives: [
    "Comprendre le rôle d'un cookie de session",
    "Connaître les attributs Secure, HttpOnly et SameSite",
    "Savoir pourquoi un cookie volé vaut un mot de passe",
  ],
  sections: [
    {
      title: "Se souvenir de toi",
      paragraphs: [
        "HTTP ne garde aucune mémoire d'une requête à l'autre. Après ta connexion, le site te donne un cookie de session : un identifiant que ton navigateur renvoie à chaque page.",
        "Tant que ce cookie est valide, le site te considère comme connecté.",
      ],
      example: "Set-Cookie: session=8f3a9c…; Secure; HttpOnly; SameSite=Lax",
    },
    {
      title: "Les attributs qui protègent",
      paragraphs: [
        "Secure : envoyé seulement en HTTPS. HttpOnly : inaccessible au JavaScript, donc à une faille XSS.",
        "SameSite : pas envoyé lors des requêtes venant d'autres sites, ce qui limite le CSRF.",
      ],
    },
    {
      title: "Le vol de session",
      paragraphs: [
        "Un cookie de session volé (malware, faux site relais) permet de se connecter sans mot de passe ni double authentification.",
        "Se déconnecter invalide la session ; en cas de doute, on révoque toutes les sessions depuis les réglages du compte.",
      ],
    },
    {
      title: "Les autres cookies",
      paragraphs: [
        "Les cookies publicitaires et de mesure suivent ta navigation de site en site. En Europe, tu peux les refuser aussi facilement que les accepter.",
        "Les navigateurs orientés vie privée bloquent par défaut une grande partie de ces traceurs.",
      ],
    },
  ],
  keyPoints: [
    "Le cookie de session prouve que tu es connecté.",
    "Secure, HttpOnly et SameSite protègent ce cookie.",
    "Un cookie volé contourne mot de passe et MFA.",
    "« Tout refuser » garde les cookies nécessaires au fonctionnement.",
  ],
  quiz: [
    {
      question: "Quel attribut empêche le JavaScript de lire un cookie ?",
      options: ["Secure", "HttpOnly", "Path"],
      correct: 1,
      explanation: "HttpOnly le rend invisible pour document.cookie.",
    },
    {
      question: "Un pirate a volé ton cookie de session. Que fais-tu ?",
      options: ["Rien, il n'a pas le mot de passe", "Je révoque toutes mes sessions", "Je vide mon historique"],
      correct: 1,
      explanation: "Le cookie lui suffit : il faut l'invalider.",
    },
    {
      question: "SameSite aide surtout contre…",
      options: ["Le CSRF", "La force brute", "Le phishing par SMS"],
      correct: 0,
      explanation: "Le cookie n'accompagne plus les requêtes forgées par un autre site.",
    },
  ],
};
