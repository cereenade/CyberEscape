import type { Lesson } from "@/lib/types";

export const PASS_THE_TICKET: Lesson = {
  slug: "pass-the-ticket",
  title: "Le pass-the-ticket Kerberos",
  icon: "🎫",
  theme: "soc",
  level: "avance",
  summary: "Rejouer un ticket Kerberos volé en mémoire : comprendre l'attaque, la repérer dans les journaux et s'en protéger.",
  duration: "9 min",
  objectives: [
    "Rappeler le rôle du TGT et des tickets de service",
    "Repérer les indices d'un ticket rejoué",
    "Connaître les protections Active Directory",
  ],
  sections: [
    {
      title: "Kerberos en bref",
      paragraphs: [
        "À la connexion, le contrôleur de domaine délivre un TGT (événement 4768). Avec ce TGT, le poste demande un ticket de service pour chaque serveur visité (événement 4769).",
        "Les tickets restent en mémoire sur le poste le temps de leur validité (souvent 10 heures pour un TGT).",
      ],
    },
    {
      title: "L'attaque",
      paragraphs: [
        "Un attaquant administrateur d'un poste peut extraire de la mémoire les tickets des utilisateurs connectés, puis les importer sur une autre machine (MITRE ATT&CK T1550.003).",
        "Il accède alors aux ressources au nom de la victime, sans connaître son mot de passe et sans nouvelle authentification.",
      ],
    },
    {
      title: "Les indices dans les journaux",
      paragraphs: [
        "Des 4769 pour un compte depuis une adresse où ce compte n'a jamais obtenu de TGT (pas de 4768 associé) sont le signal principal.",
        "D'autres pistes : un compte actif alors que la personne est absente, un ticket utilisé depuis deux machines en même temps, des ouvertures de session réseau (4624 type 3) sans connexion interactive préalable.",
      ],
      example: "11/22 09:41 4769 Compte=a.martin Service=cifs/FS-01 IP=10.0.8.23\n11/15 08:02 4768 Compte=a.martin IP=10.0.1.14   ← dernier TGT, sur son poste habituel",
    },
    {
      title: "Réagir et prévenir",
      paragraphs: [
        "Isole la machine d'où viennent les requêtes, réinitialise le mot de passe du compte et purge ses tickets (klist purge sur les postes concernés, fermeture des sessions).",
        "En prévention : groupe Protected Users, Credential Guard, postes d'administration dédiés (modèle de tiers) et pas de connexion d'administrateurs du domaine sur des postes ordinaires.",
      ],
    },
  ],
  keyPoints: [
    "4768 = TGT, 4769 = ticket de service.",
    "Pass-the-ticket = rejouer un ticket volé en mémoire (T1550.003).",
    "Indice clé : 4769 sans 4768 depuis la même adresse.",
    "Protected Users, Credential Guard, postes d'administration dédiés.",
  ],
  quiz: [
    {
      question: "Quel événement correspond à la délivrance d'un TGT ?",
      options: ["4768", "4769", "4625"],
      correct: 0,
      explanation: "4768 = demande de TGT ; 4769 = demande de ticket de service.",
    },
    {
      question: "Quel indice suggère un pass-the-ticket ?",
      options: ["Un 4768 depuis le poste habituel", "Des 4769 depuis une adresse sans 4768 pour ce compte", "Un échec de mot de passe"],
      correct: 1,
      explanation: "Le ticket est utilisé sans avoir été obtenu normalement à cet endroit.",
    },
    {
      question: "Quelle mesure complique le vol de tickets en mémoire ?",
      options: ["Credential Guard", "Un fond d'écran d'entreprise", "Allonger le nom des comptes"],
      correct: 0,
      explanation: "Credential Guard isole les secrets d'authentification du reste du système.",
    },
  ],
  sources: [
    { label: "MITRE ATT&CK – T1550.003 Pass the Ticket", url: "https://attack.mitre.org/techniques/T1550/003/" },
    { label: "Microsoft – Événement 4769", url: "https://learn.microsoft.com/fr-fr/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4769" },
  ],
};
