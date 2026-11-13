import type { Lesson } from "@/lib/types";

export const INCIDENT: Lesson = {
  slug: "incident",
  title: "Malwares et réponse à incident",
  icon: "🚨",
  theme: "soc",
  level: "intermediaire",
  summary: "Les familles de logiciels malveillants, et comment une équipe SOC réagit à une attaque.",
  duration: "8 min",
  objectives: [
    "Connaître les grandes familles de malwares",
    "Comprendre le rôle d'un SOC",
    "Suivre les étapes de la réponse à incident",
  ],
  sections: [
    {
      title: "Les familles de malwares",
      paragraphs: [
        "Virus : s'attache à un fichier et se propage quand on l'ouvre. Ver : se propage seul sur le réseau. Cheval de Troie : se fait passer pour un programme utile.",
        "Rançongiciel : chiffre les fichiers et réclame une rançon. Spyware : espionne. Backdoor : laisse une porte d'entrée cachée à l'attaquant.",
      ],
    },
    {
      title: "Le SOC",
      paragraphs: [
        "Le Security Operations Center surveille en continu le système d'information : il collecte les logs (dans un SIEM), reçoit les alertes des outils de protection (EDR, antivirus, pare-feu) et enquête.",
        "Les analystes trient les alertes, distinguent les faux positifs des vraies attaques, et déclenchent la réponse.",
      ],
    },
    {
      title: "Les étapes de la réponse à incident",
      paragraphs: [
        "Préparation, puis détection et analyse. Ensuite confinement (isoler les machines touchées), éradication (supprimer la menace et ses portes dérobées), restauration (remettre en service proprement).",
        "Enfin le retour d'expérience : comprendre ce qui a échoué et améliorer les défenses.",
      ],
    },
    {
      title: "La Cyber Kill Chain",
      paragraphs: [
        "Ce modèle découpe une attaque en 7 étapes : reconnaissance, armement, livraison, exploitation, installation, commande et contrôle, actions sur l'objectif.",
        "Chaque étape est une chance de détecter et de casser la chaîne. Plus c'est tôt, moins il y a de dégâts.",
      ],
    },
  ],
  keyPoints: [
    "Virus, ver, cheval de Troie, rançongiciel, spyware, backdoor : chaque famille a son mode d'action.",
    "Le SOC surveille, trie les alertes et déclenche la réponse.",
    "Ordre de la réponse : préparer, détecter, confiner, éradiquer, restaurer, tirer les leçons.",
    "Plus la Kill Chain est cassée tôt, moins il y a de dégâts.",
  ],
  quiz: [
    {
      question: "Quel malware se propage tout seul d'une machine à l'autre ?",
      options: ["Le cheval de Troie", "Le ver", "Le spyware"],
      correct: 1,
      explanation: "Le ver n'a besoin de personne pour se propager sur le réseau.",
    },
    {
      question: "Une machine est infectée par un rançongiciel. Quelle étape vient en premier ?",
      options: ["Restaurer les sauvegardes", "Confiner : isoler la machine", "Faire le retour d'expérience"],
      correct: 1,
      explanation: "On isole d'abord pour stopper la propagation, puis on éradique et on restaure.",
    },
    {
      question: "Quelle est la première étape de la Cyber Kill Chain ?",
      options: ["L'exploitation", "La livraison", "La reconnaissance"],
      correct: 2,
      explanation: "L'attaquant commence toujours par étudier sa cible.",
    },
  ],
};
