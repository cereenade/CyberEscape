import type { Lesson } from "@/lib/types";

export const WINDOWS: Lesson = {
  slug: "windows",
  title: "Windows pour l'analyste",
  icon: "🪟",
  theme: "systeme",
  level: "avance",
  summary: "Processus, registre, journaux d'événements, Sysmon et Active Directory : enquêter sur un parc Windows.",
  duration: "9 min",
  objectives: [
    "Repérer un processus ou un arbre de processus suspect",
    "Connaître les emplacements de persistance Windows",
    "Exploiter les journaux d'événements et Sysmon",
  ],
  sections: [
    {
      title: "Les processus",
      paragraphs: [
        "Chaque processus a un parent. Un arbre normal : explorer.exe lance Word. Un arbre suspect : winword.exe lance cmd.exe qui lance powershell.exe (une macro piégée).",
        "Un nom de processus système (svchost.exe, lsass.exe) lancé depuis un autre dossier que C:\\Windows\\System32 est un imposteur.",
      ],
      example: "winword.exe\n └─ cmd.exe /c powershell -enc …   ← suspect",
    },
    {
      title: "La persistance",
      paragraphs: [
        "Clés Run du registre (HKCU et HKLM\\…\\CurrentVersion\\Run), tâches planifiées (schtasks), services, dossier Démarrage, abonnements WMI.",
        "Chaque emplacement doit être vérifié lors d'un nettoyage, sinon le malware revient au redémarrage.",
      ],
    },
    {
      title: "Les journaux d'événements",
      paragraphs: [
        "Journal Sécurité : 4624 connexion réussie, 4625 échec, 4672 privilèges admin, 4720 compte créé, 4732 ajout à un groupe, 4769 ticket Kerberos, 1102 journal effacé.",
        "Sysmon (outil gratuit de Microsoft) ajoute des détails précieux : 1 création de processus avec ligne de commande, 3 connexion réseau, 11 création de fichier, 13 modification du registre.",
      ],
    },
    {
      title: "Active Directory",
      paragraphs: [
        "L'Active Directory gère les comptes et les droits de toutes les machines d'une entreprise. Le groupe « Admins du domaine » contrôle tout : c'est la cible n°1 des attaquants.",
        "Attaques courantes : password spraying, Kerberoasting (casser les mots de passe des comptes de service), pass-the-hash, golden ticket.",
      ],
    },
  ],
  keyPoints: [
    "Un document Office qui lance cmd ou PowerShell est un signal d'alerte majeur.",
    "Persistance Windows : clés Run, tâches planifiées, services, dossier Démarrage.",
    "4624/4625 connexions, 4720 compte créé, 1102 journaux effacés.",
    "Sysmon 1 = processus, 3 = réseau : indispensable pour un SOC.",
  ],
  quiz: [
    {
      question: "winword.exe qui lance powershell.exe, c'est…",
      options: ["Normal", "Très suspect (macro malveillante probable)", "Une mise à jour"],
      correct: 1,
      explanation: "Word n'a aucune raison légitime de lancer PowerShell.",
    },
    {
      question: "Quel Event ID signale l'effacement du journal de sécurité ?",
      options: ["4624", "1102", "4720"],
      correct: 1,
      explanation: "Un attaquant efface souvent ses traces : 1102 le trahit.",
    },
    {
      question: "Quel événement Sysmon enregistre une connexion réseau ?",
      options: ["1", "3", "11"],
      correct: 1,
      explanation: "1 = processus, 3 = réseau, 11 = fichier.",
    },
  ],
};
