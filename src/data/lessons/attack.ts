import type { Lesson } from "@/lib/types";

export const ATTACK: Lesson = {
  slug: "attack",
  title: "MITRE ATT&CK en pratique",
  icon: "🗺️",
  theme: "soc",
  level: "avance",
  summary: "Le langage commun des SOC : tactiques, techniques et comment s'en servir pour mieux détecter.",
  duration: "8 min",
  objectives: [
    "Lire la matrice ATT&CK (tactiques et techniques)",
    "Classer une action d'attaquant dans la bonne tactique",
    "Utiliser ATT&CK pour mesurer sa couverture de détection",
  ],
  sections: [
    {
      title: "Tactiques et techniques",
      paragraphs: [
        "Une tactique est l'objectif de l'attaquant à un moment donné (le « pourquoi ») ; une technique est le moyen d'y arriver (le « comment »). Chaque technique a un identifiant, comme T1059 (interpréteurs de commandes).",
        "Les principales tactiques : reconnaissance, accès initial, exécution, persistance, élévation de privilèges, contournement des défenses, accès aux identifiants, découverte, mouvement latéral, collecte, commande et contrôle, exfiltration, impact.",
      ],
    },
    {
      title: "Exemples de classement",
      paragraphs: [
        "Un mail piégé → accès initial (T1566, phishing). Une macro qui lance PowerShell → exécution (T1059). Une clé Run ajoutée → persistance (T1547). Un dump de LSASS → accès aux identifiants (T1003).",
        "Une connexion RDP vers un autre serveur → mouvement latéral. Des fichiers envoyés vers un serveur externe → exfiltration. Des fichiers chiffrés → impact.",
      ],
    },
    {
      title: "À quoi ça sert",
      paragraphs: [
        "Décrire un incident avec un vocabulaire partagé dans un rapport. Comparer les techniques d'un groupe d'attaquants à ses propres détections.",
        "Repérer les « trous » : les techniques qu'aucune règle ne détecte encore, pour prioriser le travail de l'équipe détection.",
      ],
    },
    {
      title: "La pyramide de la douleur",
      paragraphs: [
        "Bloquer un hash ou une IP gêne peu l'attaquant : il en change en une minute. Détecter ses techniques (TTP) l'oblige à changer toute sa façon de travailler.",
        "Plus une détection vise le haut de la pyramide (comportements), plus elle est durable.",
      ],
    },
  ],
  keyPoints: [
    "Tactique = objectif, technique = moyen (identifiant T1xxx).",
    "Phishing → accès initial, clé Run → persistance, dump LSASS → accès aux identifiants.",
    "ATT&CK sert à écrire les rapports et à repérer les trous de détection.",
    "Détecter les comportements (TTP) gêne bien plus l'attaquant que bloquer des IOC.",
  ],
  quiz: [
    {
      question: "Ajouter une clé Run dans le registre correspond à la tactique…",
      options: ["Exfiltration", "Persistance", "Reconnaissance"],
      correct: 1,
      explanation: "Le but est de se relancer à chaque démarrage.",
    },
    {
      question: "Dans ATT&CK, une technique décrit…",
      options: ["L'objectif de l'attaquant", "Le moyen utilisé pour atteindre l'objectif", "Le nom du groupe d'attaquants"],
      correct: 1,
      explanation: "La tactique est le pourquoi, la technique le comment.",
    },
    {
      question: "Qu'est-ce qui gêne le plus un attaquant ?",
      options: ["Qu'on bloque l'IP de son serveur", "Qu'on détecte sa technique", "Qu'on bloque un hash"],
      correct: 1,
      explanation: "C'est le sommet de la pyramide de la douleur.",
    },
  ],
};
