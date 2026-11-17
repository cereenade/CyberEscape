import type { Lesson } from "@/lib/types";

export const ADMINSDHOLDER: Lesson = {
  slug: "adminsdholder",
  title: "AdminSDHolder et la persistance dans Active Directory",
  icon: "🛡️",
  theme: "soc",
  level: "avance",
  summary: "Comment le modèle de permissions des comptes protégés peut servir de persistance, et comment le surveiller.",
  duration: "9 min",
  objectives: [
    "Comprendre AdminSDHolder et SDProp",
    "Reconnaître une persistance par ACL",
    "Détecter et corriger une modification",
  ],
  sections: [
    {
      title: "Les comptes protégés",
      paragraphs: [
        "Active Directory protège certains comptes et groupes sensibles : Admins du domaine, Administrateurs de l'entreprise, Opérateurs de sauvegarde…",
        "Leurs permissions sont alignées sur un objet modèle : CN=AdminSDHolder,CN=System,DC=…",
      ],
    },
    {
      title: "Le rôle de SDProp",
      paragraphs: [
        "Environ toutes les 60 minutes, le processus SDProp recopie l'ACL d'AdminSDHolder sur chaque compte protégé.",
        "Si quelqu'un modifie directement les droits d'un admin, ils sont donc écrasés. Ces comptes portent aussi l'attribut adminCount à 1.",
      ],
    },
    {
      title: "Le détournement",
      paragraphs: [
        "Un attaquant qui a déjà des droits élevés ajoute une entrée à l'ACL d'AdminSDHolder pour un compte qu'il contrôle.",
        "SDProp réapplique ce droit sur tous les comptes protégés : retirer le droit d'un seul compte ne sert à rien, comme dans la salle.",
      ],
    },
    {
      title: "Détecter et corriger",
      paragraphs: [
        "Active l'audit des modifications de l'annuaire, puis surveille l'événement 5136 sur l'objet AdminSDHolder (attribut nTSecurityDescriptor).",
        "Compare régulièrement l'ACL à une référence connue. Corrige sur AdminSDHolder lui-même, puis cherche comment l'attaquant a obtenu ces droits.",
      ],
    },
  ],
  keyPoints: [
    "SDProp recopie l'ACL d'AdminSDHolder sur les comptes protégés.",
    "Un droit ajouté sur AdminSDHolder revient tout seul : persistance.",
    "Surveille l'événement 5136 et compare l'ACL à une référence.",
  ],
  quiz: [
    {
      question: "Que fait SDProp ?",
      options: ["Il sauvegarde l'annuaire", "Il recopie l'ACL d'AdminSDHolder sur les comptes protégés", "Il change les mots de passe"],
      correct: 1,
      explanation: "C'est ce qui rend la persistance si tenace.",
    },
    {
      question: "Quel événement signale une modification d'objet de l'annuaire ?",
      options: ["4624", "5136", "4740"],
      correct: 1,
      explanation: "5136 nécessite l'audit des modifications du service d'annuaire.",
    },
    {
      question: "Un droit suspect revient sur un admin après suppression. Où corriger ?",
      options: ["Sur le compte admin uniquement", "Sur l'objet AdminSDHolder", "Sur le poste de l'admin"],
      correct: 1,
      explanation: "Sinon SDProp le réapplique.",
    },
  ],
  sources: [
    { label: "Microsoft — Appendix C: Protected Accounts and Groups in Active Directory", url: "https://learn.microsoft.com/fr-fr/windows-server/identity/ad-ds/plan/security-best-practices/appendix-c--protected-accounts-and-groups-in-active-directory" },
    { label: "ANSSI — Points de contrôle Active Directory", url: "https://www.cert.ssi.gouv.fr/uploads/guide-ad.html" },
  ],
};
