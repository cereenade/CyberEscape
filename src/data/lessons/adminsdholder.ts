import type { Lesson } from "@/lib/types";

export const ADMINSDHOLDER: Lesson = {
  slug: "adminsdholder",
  title: "AdminSDHolder et SDProp",
  icon: "🛡️",
  theme: "soc",
  level: "avance",
  summary: "Le modèle de droits des comptes privilégiés d'Active Directory, comment il est détourné pour persister, et comment le surveiller.",
  duration: "8 min",
  objectives: [
    "Comprendre le rôle d'AdminSDHolder et de SDProp",
    "Reconnaître une persistance via AdminSDHolder",
    "Mettre en place la détection et la remédiation",
  ],
  sections: [
    {
      title: "Un modèle pour les comptes protégés",
      paragraphs: [
        "AdminSDHolder est un objet situé dans CN=System de chaque domaine. Sa liste de contrôle d'accès sert de modèle pour les groupes protégés : Admins du domaine, Administrateurs de l'entreprise, Opérateurs de compte, etc.",
        "Toutes les 60 minutes par défaut, le processus SDProp, sur le contrôleur de domaine qui détient le rôle PDC, recopie cette liste sur chaque membre des groupes protégés.",
        "Ces comptes reçoivent aussi l'attribut adminCount = 1.",
      ],
    },
    {
      title: "Le détournement",
      paragraphs: [
        "Si un attaquant obtient un jour assez de droits pour modifier AdminSDHolder, il peut y ajouter une entrée qui lui donne le contrôle total.",
        "Même si l'équipe nettoie les comptes privilégiés, SDProp réapplique ces droits dans l'heure : c'est une persistance très discrète.",
        "Les comptes retirés d'un groupe protégé gardent souvent adminCount = 1 et des droits figés : à vérifier aussi.",
      ],
    },
    {
      title: "Détecter",
      paragraphs: [
        "Activer l'audit des modifications d'objets d'annuaire et surveiller l'événement 5136 sur CN=AdminSDHolder, attribut nTSecurityDescriptor.",
        "Comparer régulièrement la liste de contrôle d'accès d'AdminSDHolder à une référence connue.",
        "Toute modification de cet objet doit être rare, planifiée et documentée : sinon, c'est une alerte de haute priorité.",
      ],
    },
    {
      title: "Remédier",
      paragraphs: [
        "Retirer l'entrée ajoutée sur AdminSDHolder, puis forcer ou attendre un passage de SDProp.",
        "Enquêter sur le compte à l'origine de la modification : comment a-t-il obtenu ce droit ?",
        "Réduire le nombre de comptes capables de modifier les objets du conteneur System (modèle de tiering).",
      ],
    },
  ],
  keyPoints: [
    "AdminSDHolder = modèle de droits recopié toutes les heures par SDProp.",
    "Une entrée ajoutée sur AdminSDHolder se propage à tous les comptes protégés.",
    "Surveiller l'événement 5136 sur cet objet.",
    "Corriger le modèle, puis enquêter sur l'origine.",
  ],
  quiz: [
    {
      question: "Que fait SDProp ?",
      options: ["Il supprime les comptes inactifs", "Il recopie les droits d'AdminSDHolder sur les comptes protégés", "Il sauvegarde l'annuaire"],
      correct: 1,
      explanation: "Par défaut toutes les 60 minutes.",
    },
    {
      question: "Pourquoi cette persistance est-elle redoutable ?",
      options: ["Elle chiffre les disques", "Les droits reviennent tout seuls après un nettoyage des comptes", "Elle désactive l'antivirus"],
      correct: 1,
      explanation: "Tant que le modèle n'est pas corrigé, SDProp réapplique les droits.",
    },
    {
      question: "Quel événement surveiller ?",
      options: ["4624 sur les postes de travail", "5136 sur CN=AdminSDHolder", "7045 sur les serveurs web"],
      correct: 1,
      explanation: "5136 signale une modification d'objet de l'annuaire.",
    },
  ],
  sources: [
    { label: "Microsoft Learn : Appendix C – Protected Accounts and Groups in Active Directory", url: "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/appendix-c--protected-accounts-and-groups-in-active-directory" },
    { label: "ANSSI : Points de contrôle Active Directory", url: "https://www.cert.ssi.gouv.fr/uploads/ad_checklist.html" },
  ],
};
