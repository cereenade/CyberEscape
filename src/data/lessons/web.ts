import type { Lesson } from "@/lib/types";

export const WEB: Lesson = {
  slug: "web",
  title: "Le web et ses failles",
  icon: "🌐",
  theme: "web",
  level: "intermediaire",
  summary: "HTTP, cookies et les grandes failles des sites : injection SQL, XSS, IDOR.",
  duration: "8 min",
  objectives: [
    "Comprendre le dialogue HTTP entre navigateur et serveur",
    "Expliquer l'injection SQL, le XSS et l'IDOR",
    "Connaître les parades de chaque faille",
  ],
  sections: [
    {
      title: "HTTP et HTTPS",
      paragraphs: [
        "Ton navigateur et un site discutent avec le protocole HTTP : tu envoies une requête (GET /page), le serveur répond (200 OK, 404 introuvable, 403 interdit…).",
        "HTTPS ajoute une couche de chiffrement : personne sur le réseau ne peut lire ou modifier l'échange. Le certificat prouve l'identité du site.",
      ],
    },
    {
      title: "Cookies et sessions",
      paragraphs: [
        "HTTP ne se souvient de rien entre deux pages. Le serveur dépose donc un cookie, un petit texte que ton navigateur renvoie à chaque requête.",
        "Tout ce qui est stocké chez l'utilisateur peut être modifié par lui : un site ne doit jamais faire confiance à un cookie sans le vérifier.",
      ],
    },
    {
      title: "L'injection SQL",
      paragraphs: [
        "Quand un site colle ta saisie directement dans une requête de base de données, une apostrophe bien placée permet de réécrire la requête.",
        "La parade : les requêtes préparées, qui séparent toujours le code SQL des données saisies.",
      ],
      example: "SELECT * FROM users WHERE login='' OR 1=1 --' AND pass='...'\n→ la condition est toujours vraie, le reste est ignoré",
    },
    {
      title: "La faille XSS",
      paragraphs: [
        "Si un site affiche ce que tapent les visiteurs sans le filtrer, on peut y glisser du JavaScript qui s'exécutera chez tous les autres visiteurs.",
        "La parade : échapper les caractères spéciaux (< > \" ') avant d'afficher une saisie.",
      ],
    },
    {
      title: "Contrôle d'accès : IDOR et traversée de répertoires",
      paragraphs: [
        "IDOR : changer un identifiant dans l'URL (/factures/1042 → 1043) donne accès aux données d'un autre, car le serveur ne vérifie pas à qui elles appartiennent.",
        "Traversée de répertoires : utiliser ../ dans un nom de fichier pour sortir du dossier prévu et lire des fichiers système.",
      ],
    },
  ],
  keyPoints: [
    "Tout ce qui vient du navigateur (formulaires, cookies, URL) peut être modifié par l'utilisateur.",
    "Injection SQL → requêtes préparées. XSS → échappement des sorties.",
    "IDOR → vérifier les droits côté serveur à chaque requête.",
    "HTTPS chiffre l'échange, mais ne garantit pas que le site est honnête.",
  ],
  quiz: [
    {
      question: "Que signifie un code de réponse HTTP 403 ?",
      options: ["Page introuvable", "Accès interdit", "Tout va bien"],
      correct: 1,
      explanation: "403 = Forbidden. 404 = introuvable, 200 = OK.",
    },
    {
      question: "Quelle est la meilleure protection contre l'injection SQL ?",
      options: ["Les requêtes préparées", "Un mot de passe plus long", "HTTPS"],
      correct: 0,
      explanation: "Elles empêchent la saisie d'être interprétée comme du code SQL.",
    },
    {
      question: "Un commentaire contenant <script> s'exécute chez les visiteurs. C'est une faille…",
      options: ["IDOR", "XSS", "SQL"],
      correct: 1,
      explanation: "Du script injecté dans une page : cross-site scripting.",
    },
    {
      question: "En changeant ?id=57 en ?id=58, tu vois le profil d'un autre. C'est…",
      options: ["Une IDOR", "Du phishing", "Normal"],
      correct: 0,
      explanation: "Le serveur ne vérifie pas que l'objet t'appartient : Insecure Direct Object Reference.",
    },
  ],
};
