import type { Lesson } from "@/lib/types";

export const RMM_DETOURNES: Lesson = {
  slug: "rmm-detournes",
  title: "Les outils de télémaintenance détournés",
  icon: "🛠️",
  theme: "soc",
  level: "avance",
  summary: "Quand les attaquants utilisent de vrais logiciels de prise en main à distance : détecter et encadrer les RMM.",
  duration: "9 min",
  objectives: [
    "Comprendre pourquoi les RMM attirent les attaquants",
    "Repérer une installation suspecte",
    "Mettre en place une liste d'outils autorisés",
  ],
  sections: [
    {
      title: "Des outils légitimes",
      paragraphs: [
        "Les logiciels de supervision et de prise en main à distance (RMM) servent tous les jours au support informatique. Ils sont signés, connus, et l'antivirus les laisse passer.",
        "C'est justement ce qui intéresse les attaquants : un accès à distance discret, chiffré, sans écrire de malware.",
      ],
    },
    {
      title: "Les scénarios d'abus",
      paragraphs: [
        "L'arnaque au faux support fait installer l'outil par la victime elle-même au téléphone.",
        "Les groupes de rançongiciels déploient un RMM après l'intrusion pour garder un accès de secours.",
        "Dans la salle du dépanneur, l'outil était installé depuis Téléchargements, sans ticket, vers un serveur de relais inconnu caché en Base64 inversé.",
      ],
    },
    {
      title: "Détecter et encadrer",
      paragraphs: [
        "Tenir la liste des outils de support autorisés et bloquer les autres (contrôle des applications, pare-feu applicatif).",
        "Alerter sur : installation sans ticket, exécution depuis un dossier utilisateur, connexion vers un relais non approuvé, outil inconnu dans le parc.",
        "Vérifier régulièrement l'inventaire logiciel, et former les équipes : le vrai support ne demande jamais d'installer un outil suite à un appel inattendu.",
      ],
    },
  ],
  keyPoints: [
    "Un outil signé n'est pas forcément utilisé honnêtement.",
    "Liste d'outils autorisés + blocage du reste.",
    "Alertes : sans ticket, depuis Téléchargements, relais inconnu.",
    "Formation contre le faux support.",
  ],
  quiz: [
    {
      question: "Pourquoi les antivirus laissent-ils passer les RMM ?",
      options: ["Ce sont des outils légitimes et signés", "Ils sont invisibles", "Ils désactivent l'antivirus"],
      correct: 0,
      explanation: "C'est leur usage qui est malveillant, pas le logiciel.",
    },
    {
      question: "Quel signal est le plus suspect ?",
      options: ["Une installation par le support avec un ticket", "Une installation depuis Téléchargements, sans ticket, vers un relais inconnu", "Une mise à jour de l'outil autorisé"],
      correct: 1,
      explanation: "Aucune justification et une destination inconnue.",
    },
    {
      question: "Quelle mesure de fond réduit le risque ?",
      options: ["Autoriser tous les outils signés", "Tenir une liste d'outils autorisés et bloquer les autres", "Désinstaller l'EDR"],
      correct: 1,
      explanation: "Seuls les outils approuvés peuvent s'exécuter.",
    },
  ],
  sources: [
    { label: "CISA – Malicious use of RMM software (AA23-025A)", url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-025a" },
  ],
};
