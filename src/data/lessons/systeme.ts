import type { Lesson } from "@/lib/types";

export const SYSTEME: Lesson = {
  slug: "systeme",
  title: "Systèmes et journaux",
  icon: "🖥️",
  summary: "Permissions, processus et logs : là où les traces d'une attaque se cachent.",
  duration: "7 min",
  sections: [
    {
      title: "Les permissions",
      paragraphs: [
        "Sous Linux, chaque fichier a des droits pour trois catégories : le propriétaire, le groupe et les autres. r = lire, w = écrire, x = exécuter.",
        "Principe du moindre privilège : chaque compte n'a que les droits dont il a vraiment besoin. Un compte administrateur ne sert qu'à l'administration.",
      ],
      example: "-rwxr-x---  propriétaire : tout ; groupe : lire + exécuter ; autres : rien",
    },
    {
      title: "Les processus",
      paragraphs: [
        "Un processus est un programme en cours d'exécution. Les malwares imitent souvent le nom de processus système (svchost.exe) pour se cacher.",
        "Vérifier le chemin d'un processus, son parent et sa signature permet de repérer les imposteurs.",
      ],
    },
    {
      title: "Les journaux (logs)",
      paragraphs: [
        "Les systèmes enregistrent leurs événements : connexions, erreurs, commandes lancées. C'est la première source d'information d'un analyste.",
        "Sous Linux : /var/log/auth.log pour les connexions. Sous Windows : l'Observateur d'événements, avec des Event IDs (4624 connexion réussie, 4625 échec, 4720 compte créé).",
      ],
    },
    {
      title: "Lire une attaque dans les logs",
      paragraphs: [
        "Des échecs en série depuis une même IP, suivis d'un succès : force brute réussie. Puis souvent : élévation de privilèges, création de compte, tâche planifiée (persistance).",
        "Toujours tout remettre sur la même heure (UTC) pour reconstituer la chronologie.",
      ],
    },
  ],
  quiz: [
    {
      question: "Dans « -rwxrwxrwx », qui peut modifier le fichier ?",
      options: ["Seulement le propriétaire", "Seulement le groupe", "Tout le monde"],
      correct: 2,
      explanation: "Le dernier bloc (autres) contient w : n'importe qui peut écrire.",
    },
    {
      question: "Quel Event ID Windows correspond à un échec de connexion ?",
      options: ["4624", "4625", "4720"],
      correct: 1,
      explanation: "4624 = réussite, 4625 = échec, 4720 = compte créé.",
    },
    {
      question: "svchost.exe lancé depuis C:\\Users\\Public\\, c'est…",
      options: ["Normal", "Très suspect", "Une mise à jour"],
      correct: 1,
      explanation: "Le vrai svchost.exe se trouve dans C:\\Windows\\System32.",
    },
  ],
};
