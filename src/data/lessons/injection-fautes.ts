import type { Lesson } from "@/lib/types";

export const INJECTION_FAUTES: Lesson = {
  slug: "injection-fautes",
  title: "L'injection de fautes matérielles",
  icon: "⚡",
  theme: "crypto",
  level: "avance",
  summary: "Glitch de tension, d'horloge ou laser : comment une faute provoquée casse une puce sécurisée, et comment les puces s'en défendent.",
  duration: "9 min",
  objectives: [
    "Connaître les principales techniques d'injection de fautes",
    "Comprendre l'attaque de Bellcore sur RSA-CRT",
    "Citer les contre-mesures matérielles et logicielles",
  ],
  sections: [
    {
      title: "Perturber pour tromper",
      paragraphs: [
        "Une puce exécute des instructions à un rythme précis. Une baisse brève de tension, une impulsion d'horloge trop courte, un flash laser ou une impulsion électromagnétique peuvent fausser une instruction.",
        "Résultat : un test est sauté, une valeur est corrompue, une boucle s'arrête trop tôt.",
      ],
      example: "if (pin_ok) { ouvrir(); }\n→ un glitch au bon moment peut faire exécuter ouvrir() même si pin_ok est faux.",
    },
    {
      title: "L'attaque de Bellcore",
      paragraphs: [
        "RSA est souvent accéléré avec le théorème des restes chinois (CRT) : on calcule séparément modulo p et modulo q.",
        "Si une faute touche un seul des deux calculs, la signature fausse permet, avec un simple PGCD, de retrouver p ou q, donc la clé privée (Boneh, DeMillo, Lipton, 1997).",
      ],
    },
    {
      title: "Les contre-mesures",
      paragraphs: [
        "Matériel : capteurs de tension, de fréquence, de lumière et de température ; blindage ; la puce s'efface ou se bloque en cas d'anomalie.",
        "Logiciel : vérifier une signature avant de l'envoyer, faire les tests critiques deux fois de façon différente, utiliser des valeurs booléennes difficiles à fausser (pas simplement 0 et 1), compteurs d'intégrité du flot d'exécution.",
      ],
    },
    {
      title: "Évaluer et certifier",
      paragraphs: [
        "Les cartes à puce et éléments sécurisés sont évalués par des laboratoires agréés selon les Critères communs, avec des profils qui incluent ces attaques.",
        "En France, l'ANSSI délivre ces certifications. Pour un produit, choisir un composant certifié est la protection la plus réaliste.",
      ],
    },
  ],
  keyPoints: [
    "Une faute provoquée peut sauter un test ou fausser un calcul.",
    "Une seule signature RSA-CRT fausse peut révéler la clé (Bellcore).",
    "Vérifier avant d'envoyer, doubler les tests, capteurs matériels.",
    "Préférer des composants certifiés Critères communs.",
  ],
  quiz: [
    {
      question: "Que peut provoquer un glitch de tension bien placé ?",
      options: ["Le saut d'une instruction de vérification", "Un chiffrement plus fort", "Une mise à jour automatique"],
      correct: 0,
      explanation: "La puce peut exécuter la suite comme si le test avait réussi.",
    },
    {
      question: "Quelle contre-mesure bloque l'attaque de Bellcore ?",
      options: ["Allonger la clé RSA", "Vérifier la signature avant de la renvoyer", "Changer le code PIN"],
      correct: 1,
      explanation: "Une signature fausse n'est jamais publiée.",
    },
    {
      question: "Pourquoi un code PIN plus long ne suffit-il pas ?",
      options: ["La faute saute la vérification elle-même", "Les PIN longs sont interdits", "Il en faut un plus court"],
      correct: 0,
      explanation: "Si le test est sauté, la valeur du code n'a plus d'importance.",
    },
  ],
  sources: [
    { label: "ANSSI – Certification Critères communs", url: "https://cyber.gouv.fr/produits-services-qualifies" },
    { label: "Boneh, DeMillo, Lipton – On the Importance of Checking Cryptographic Protocols for Faults", url: "https://crypto.stanford.edu/~dabo/papers/faults.ps.gz" },
  ],
};
