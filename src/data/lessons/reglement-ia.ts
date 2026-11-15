import type { Lesson } from "@/lib/types";

export const REGLEMENT_IA: Lesson = {
  slug: "reglement-ia",
  title: "Le règlement européen sur l'IA (AI Act)",
  icon: "🤖",
  theme: "grc",
  level: "avance",
  summary: "Une approche par les risques pour encadrer l'intelligence artificielle en Europe, avec des exigences de cybersécurité.",
  duration: "9 min",
  objectives: [
    "Connaître les quatre niveaux de risque de l'AI Act",
    "Identifier un système d'IA à haut risque",
    "Relier le règlement au travail de l'équipe sécurité",
  ],
  sections: [
    {
      title: "Une approche par les risques",
      paragraphs: [
        "Le règlement (UE) 2024/1689, appelé AI Act, est entré en vigueur en août 2024 et s'applique par étapes, depuis 2025.",
        "Risque inacceptable : pratiques interdites, comme la notation sociale ou la manipulation des personnes vulnérables.",
        "Haut risque : obligations fortes. Risque limité : obligation de transparence (chatbots, contenus générés). Risque minimal : pas d'obligation particulière.",
      ],
    },
    {
      title: "Les systèmes à haut risque",
      paragraphs: [
        "On y trouve notamment le recrutement et la gestion des salariés, l'accès au crédit, l'éducation, les infrastructures critiques ou certains usages par les forces de l'ordre.",
        "Ils doivent avoir une gestion des risques, des données de qualité, une documentation, une journalisation, un contrôle humain, ainsi qu'un bon niveau d'exactitude, de robustesse et de cybersécurité.",
      ],
      example: "Un outil qui trie les CV entre dans le haut risque : il influence l'accès à l'emploi.",
    },
    {
      title: "Le rôle de l'équipe sécurité",
      paragraphs: [
        "L'AI Act cite des attaques propres à l'IA : empoisonnement des données, exemples adverses, manipulation du modèle. Elles entrent dans l'analyse de risques.",
        "Avant d'acheter un outil d'IA, vérifie la documentation du fournisseur, les journaux disponibles, le contrôle humain prévu et l'articulation avec le RGPD.",
        "Les amendes peuvent atteindre 35 millions d'euros ou 7 % du chiffre d'affaires mondial pour les pratiques interdites.",
      ],
    },
  ],
  keyPoints: [
    "Quatre niveaux : inacceptable, haut, limité, minimal.",
    "Recrutement, crédit, éducation, infrastructures critiques = haut risque.",
    "Cybersécurité, journalisation et contrôle humain sont obligatoires pour le haut risque.",
  ],
  quiz: [
    {
      question: "Que deviennent les pratiques à risque inacceptable ?",
      options: ["Elles sont interdites", "Elles demandent une simple mention", "Elles sont libres"],
      correct: 0,
      explanation: "La notation sociale, par exemple, est interdite.",
    },
    {
      question: "Un chatbot de service client relève surtout de…",
      options: ["L'interdiction", "L'obligation de transparence", "Aucune règle"],
      correct: 1,
      explanation: "L'utilisateur doit savoir qu'il parle à une IA.",
    },
    {
      question: "Quelle exigence vise un système à haut risque ?",
      options: ["Un logo officiel", "Un contrôle humain et la journalisation", "Un hébergement hors d'Europe"],
      correct: 1,
      explanation: "Il faut pouvoir superviser et retracer ses décisions.",
    },
  ],
  sources: [
    { label: "Règlement (UE) 2024/1689 — EUR-Lex", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj" },
    { label: "CNIL — Intelligence artificielle", url: "https://www.cnil.fr/fr/intelligence-artificielle" },
  ],
};
