import type { Lesson } from "@/lib/types";

export const LAPS: Lesson = {
  slug: "laps",
  title: "Windows LAPS : un mot de passe local unique par poste",
  icon: "🔑",
  theme: "infra",
  level: "avance",
  summary: "Le même mot de passe administrateur local partout, c'est un passe-partout pour l'attaquant. LAPS casse ce lien.",
  duration: "7 min",
  objectives: [
    "Comprendre le risque d'un mot de passe local partagé",
    "Savoir ce que fait Windows LAPS",
    "Déployer et surveiller LAPS correctement",
  ],
  sections: [
    {
      title: "Le passe-partout",
      paragraphs: [
        "Quand tous les postes sont installés depuis la même image, le compte administrateur local a souvent le même mot de passe partout.",
        "Un attaquant qui récupère son empreinte sur un seul poste peut la rejouer (pass-the-hash) sur tous les autres. C'est un mouvement latéral express.",
      ],
      example: "Dans la salle « Le même mot de passe partout », l'attaquant passe d'un poste à 300 en une heure.",
    },
    {
      title: "Ce que fait Windows LAPS",
      paragraphs: [
        "Windows LAPS (Local Administrator Password Solution) est intégré à Windows. Il génère un mot de passe aléatoire pour chaque machine et le renouvelle selon une durée choisie.",
        "Le mot de passe est sauvegardé dans l'Active Directory ou dans Microsoft Entra ID, et peut être chiffré. Il peut aussi être changé automatiquement après utilisation.",
        "Il peut également gérer le mot de passe du compte DSRM des contrôleurs de domaine.",
      ],
    },
    {
      title: "Bien le déployer",
      paragraphs: [
        "Limite la lecture du mot de passe à un petit groupe d'administrateurs, et vérifie qui a ce droit dans l'annuaire.",
        "Active le chiffrement et la journalisation des lectures, puis surveille les consultations inhabituelles.",
        "Remplace l'ancienne version (Legacy LAPS) par la version intégrée, et complète avec d'autres mesures : restreindre les connexions réseau des comptes locaux, modèle d'administration en tiers.",
      ],
    },
  ],
  keyPoints: [
    "Un mot de passe local identique = rebond sur tout le parc.",
    "LAPS : unique, aléatoire, renouvelé et sauvegardé dans l'annuaire.",
    "Restreindre et journaliser qui peut lire les mots de passe.",
  ],
  quiz: [
    {
      question: "Quel risque LAPS réduit-il principalement ?",
      options: ["Le phishing", "Le mouvement latéral avec un mot de passe local partagé", "Les attaques DDoS"],
      correct: 1,
      explanation: "Une empreinte volée ne sert plus que sur une machine.",
    },
    {
      question: "Où Windows LAPS peut-il sauvegarder les mots de passe ?",
      options: ["Dans un fichier texte partagé", "Dans l'Active Directory ou Entra ID", "Dans le BIOS"],
      correct: 1,
      explanation: "L'annuaire stocke le mot de passe avec des droits de lecture contrôlés.",
    },
    {
      question: "Quelle bonne pratique accompagne LAPS ?",
      options: ["Donner le droit de lecture à tous", "Journaliser et restreindre les lectures de mots de passe", "Désactiver la rotation"],
      correct: 1,
      explanation: "Le droit de lecture devient un accès précieux à surveiller.",
    },
  ],
  sources: [{ label: "Microsoft Learn — Windows LAPS", url: "https://learn.microsoft.com/windows-server/identity/laps/laps-overview" }],
};
