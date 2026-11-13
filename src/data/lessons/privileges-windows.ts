import type { Lesson } from "@/lib/types";

export const PRIVILEGES_WINDOWS: Lesson = {
  slug: "privileges-windows",
  title: "L'élévation de privilèges sous Windows",
  icon: "🪟",
  theme: "systeme",
  level: "intermediaire",
  summary: "Services mal configurés, DLL, pilotes vulnérables : les chemins vers SYSTEM.",
  duration: "9 min",
  objectives: [
    "Repérer les services et chemins mal configurés",
    "Comprendre le détournement et le chargement latéral de DLL",
    "Connaître les protections modernes de Windows",
  ],
  sections: [
    {
      title: "Les services",
      paragraphs: [
        "Un service qui tourne en SYSTEM avec un exécutable modifiable par les utilisateurs : il suffit de remplacer le fichier.",
        "Un chemin avec espaces et sans guillemets (C:\\Program Files\\Outil Sauvegarde\\svc.exe) peut lancer C:\\Program Files\\Outil.exe à la place.",
      ],
    },
    {
      title: "Les DLL",
      paragraphs: [
        "Windows cherche les DLL dans un ordre précis, en commençant par le dossier du programme.",
        "Le chargement latéral (sideloading) copie un programme signé avec une DLL malveillante du même nom : le code tourne sous couvert d'un processus légitime.",
      ],
    },
    {
      title: "Les illusions de sécurité",
      paragraphs: [
        "La politique d'exécution PowerShell se contourne en une option : ce n'est pas une barrière de sécurité.",
        "Les vraies protections : AppLocker ou WDAC, journalisation PowerShell (4104), AMSI et un EDR.",
      ],
    },
    {
      title: "Au niveau du noyau",
      paragraphs: [
        "Les attaquants chargent parfois un vieux pilote signé mais vulnérable (BYOVD) pour désactiver l'EDR depuis le noyau.",
        "La liste de blocage des pilotes vulnérables, HVCI et la protection de LSASS (RunAsPPL) compliquent fortement ces attaques.",
      ],
    },
  ],
  keyPoints: [
    "Services : exécutables protégés en écriture, chemins entre guillemets.",
    "Le sideloading cache du code malveillant dans un processus signé.",
    "La politique d'exécution PowerShell n'est pas une protection.",
    "Blocage des pilotes vulnérables, HVCI, LSASS protégé.",
  ],
  quiz: [
    {
      question: "Pourquoi un chemin de service sans guillemets est-il dangereux ?",
      options: ["Windows peut lancer un autre exécutable au niveau d'un espace", "Le service est plus lent", "Il n'y a aucun danger"],
      correct: 0,
      explanation: "Windows teste chaque portion du chemin coupée aux espaces.",
    },
    {
      question: "La politique d'exécution PowerShell « Restricted »…",
      options: ["Bloque tous les attaquants", "Se contourne facilement, ce n'est pas une barrière", "Désinstalle PowerShell"],
      correct: 1,
      explanation: "-ExecutionPolicy Bypass suffit.",
    },
    {
      question: "Le DLL sideloading est efficace parce que…",
      options: ["Le code tourne dans un programme signé et légitime", "Les DLL sont chiffrées", "Windows n'utilise pas de DLL"],
      correct: 0,
      explanation: "Le processus paraît digne de confiance.",
    },
  ],
};
