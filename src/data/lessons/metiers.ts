import type { Lesson } from "@/lib/types";

export const METIERS: Lesson = {
  slug: "metiers",
  title: "Les métiers de la cybersécurité",
  icon: "🧑‍💻",
  theme: "bases",
  level: "debutant",
  summary: "Qui fait quoi en cyber : de l'analyste SOC au pentesteur, en passant par le RSSI.",
  duration: "5 min",
  objectives: [
    "Découvrir les grandes familles de métiers en cybersécurité",
    "Comprendre la différence entre équipes rouges, bleues et violettes",
    "Savoir par où commencer pour se former",
  ],
  sections: [
    {
      title: "Défendre : la blue team",
      paragraphs: [
        "L'analyste SOC surveille les alertes, enquête sur les incidents et déclenche la réponse. Il travaille avec un SIEM, un EDR et beaucoup de journaux.",
        "Autour de lui : l'ingénieur détection (qui écrit les règles), le threat hunter (qui chasse les menaces cachées) et l'analyste forensique (qui reconstitue une attaque après coup).",
      ],
    },
    {
      title: "Attaquer pour protéger : la red team",
      paragraphs: [
        "Le pentesteur (testeur d'intrusion) attaque un système avec l'autorisation de son propriétaire pour trouver les failles avant les vrais pirates.",
        "La red team va plus loin : elle simule un attaquant réel sur toute l'organisation, humains compris. La purple team fait travailler rouges et bleus ensemble pour améliorer la détection.",
      ],
    },
    {
      title: "Piloter et construire",
      paragraphs: [
        "Le RSSI (responsable de la sécurité des systèmes d'information) définit la stratégie, les règles et le budget sécurité.",
        "L'architecte et l'ingénieur sécurité conçoivent des systèmes sûrs dès le départ. Le consultant GRC (gouvernance, risques, conformité) s'assure du respect des normes comme ISO 27001 ou le RGPD.",
      ],
    },
    {
      title: "Se former",
      paragraphs: [
        "Les bases en réseau, système (Linux, Windows) et un langage de script (Python, Bash) sont utiles partout.",
        "Les plateformes de challenges (CTF), les cours en ligne gratuits et les certifications d'entrée de gamme permettent de progresser en pratiquant, comme dans CyberEscape.",
      ],
    },
  ],
  keyPoints: [
    "Blue team = défense (SOC, détection, forensique). Red team = attaque autorisée (pentest).",
    "La purple team fait collaborer les deux pour mieux détecter.",
    "Le RSSI pilote la stratégie sécurité d'une organisation.",
    "Réseau, système et scripting sont les bases de presque tous les métiers cyber.",
  ],
  quiz: [
    {
      question: "Qui surveille les alertes de sécurité au quotidien ?",
      options: ["Le pentesteur", "L'analyste SOC", "Le RSSI"],
      correct: 1,
      explanation: "L'analyste SOC trie et analyse les alertes en continu.",
    },
    {
      question: "Un pentest se fait…",
      options: ["Sans prévenir personne", "Avec l'autorisation du propriétaire du système", "Uniquement la nuit"],
      correct: 1,
      explanation: "Sans autorisation, c'est une intrusion illégale.",
    },
    {
      question: "La purple team sert à…",
      options: ["Faire travailler attaquants et défenseurs ensemble", "Gérer le budget", "Réparer les ordinateurs"],
      correct: 0,
      explanation: "Rouges et bleus partagent leurs résultats pour améliorer la défense.",
    },
  ],
};
