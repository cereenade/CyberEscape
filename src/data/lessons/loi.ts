import type { Lesson } from "@/lib/types";

export const LOI: Lesson = {
  slug: "loi",
  title: "Le cadre légal : ce qu'on a le droit de faire",
  icon: "⚖️",
  theme: "bases",
  level: "debutant",
  summary: "Pirater, même « pour voir », est un délit. Voici les règles à connaître avant de pratiquer.",
  duration: "5 min",
  objectives: [
    "Connaître les principales infractions informatiques en France",
    "Savoir où pratiquer légalement",
    "Comprendre ce qu'est la divulgation responsable",
  ],
  sections: [
    {
      title: "Ce que dit la loi",
      paragraphs: [
        "En France, les articles 323-1 et suivants du Code pénal punissent l'accès ou le maintien frauduleux dans un système informatique, même sans rien casser.",
        "Entraver le fonctionnement d'un système (par exemple un DDoS), modifier ou supprimer des données, ou détenir des outils dans le but d'attaquer sont aussi des délits.",
      ],
    },
    {
      title: "L'autorisation change tout",
      paragraphs: [
        "Un test d'intrusion est légal uniquement avec l'accord écrit du propriétaire du système, qui précise le périmètre et la durée.",
        "Tester le site d'une entreprise « pour l'aider » sans son accord reste illégal, même avec de bonnes intentions.",
      ],
    },
    {
      title: "Où s'entraîner légalement",
      paragraphs: [
        "Les plateformes de CTF, les laboratoires volontairement vulnérables et ta propre machine virtuelle sont faits pour ça.",
        "Les programmes de bug bounty autorisent la recherche de failles sur certains sites, en respectant strictement leurs règles.",
      ],
    },
    {
      title: "Trouver une faille par hasard",
      paragraphs: [
        "La divulgation responsable consiste à prévenir discrètement l'organisation concernée, sans exploiter la faille ni la rendre publique, et à lui laisser le temps de corriger.",
        "En France, l'ANSSI peut servir d'intermédiaire pour signaler une vulnérabilité.",
      ],
    },
  ],
  keyPoints: [
    "Accéder à un système sans autorisation est un délit, même sans dégâts.",
    "Un pentest exige l'accord écrit du propriétaire, avec un périmètre défini.",
    "On s'entraîne sur des CTF, des labs ou ses propres machines.",
    "Une faille trouvée par hasard se signale discrètement : c'est la divulgation responsable.",
  ],
  quiz: [
    {
      question: "Tu testes le site de ton lycée sans autorisation, sans rien casser. C'est…",
      options: ["Légal, puisqu'il n'y a pas de dégâts", "Illégal : c'est un accès frauduleux", "Légal si tu préviens après"],
      correct: 1,
      explanation: "L'accès frauduleux est puni même sans dégradation.",
    },
    {
      question: "Que faut-il pour qu'un test d'intrusion soit légal ?",
      options: ["Un bon ordinateur", "L'accord écrit du propriétaire du système", "Un VPN"],
      correct: 1,
      explanation: "L'autorisation, avec un périmètre clair, est indispensable.",
    },
    {
      question: "Tu trouves une faille par hasard. Le bon réflexe ?",
      options: ["La publier sur les réseaux", "Prévenir discrètement l'organisation", "L'exploiter pour prouver qu'elle existe"],
      correct: 1,
      explanation: "C'est le principe de la divulgation responsable.",
    },
  ],
};
