import type { Lesson } from "@/lib/types";

export const GMSA: Lesson = {
  slug: "gmsa",
  title: "Les comptes de service gérés (gMSA)",
  icon: "🤖",
  theme: "infra",
  level: "avance",
  summary: "Remplacer les vieux comptes de service aux mots de passe éternels par des comptes dont l'annuaire gère lui-même le secret.",
  duration: "8 min",
  objectives: [
    "Comprendre les risques des comptes de service classiques",
    "Savoir comment fonctionne un gMSA",
    "Planifier une migration sans coupure",
  ],
  sections: [
    {
      title: "Le problème des comptes de service",
      paragraphs: [
        "Les services (sauvegarde, base de données, supervision) tournent souvent avec un compte de domaine créé il y a des années.",
        "Son mot de passe est rarement changé, parfois connu de plusieurs personnes ou écrit dans un script.",
        "Comme ces comptes ont un SPN, n'importe quel utilisateur du domaine peut demander un ticket Kerberos et tenter de casser le mot de passe hors ligne (Kerberoasting).",
      ],
    },
    {
      title: "Ce qu'apporte un gMSA",
      paragraphs: [
        "Un compte de service géré de groupe (gMSA) a un mot de passe de 240 caractères généré par l'Active Directory.",
        "Ce mot de passe est renouvelé automatiquement, tous les 30 jours par défaut, sans intervention humaine.",
        "Seuls les serveurs listés dans l'attribut PrincipalsAllowedToRetrieveManagedPassword peuvent le récupérer. Personne n'a besoin de le connaître.",
      ],
    },
    {
      title: "Migrer pas à pas",
      paragraphs: [
        "Créer une fois la clé racine KDS du domaine, qui sert à calculer les mots de passe.",
        "Créer le gMSA en autorisant uniquement les serveurs concernés, puis l'installer et le tester sur chacun.",
        "Basculer le service sur le gMSA, vérifier qu'il fonctionne, puis désactiver l'ancien compte et effacer son mot de passe des scripts.",
      ],
    },
    {
      title: "Garder le contrôle",
      paragraphs: [
        "Limiter strictement la liste des serveurs autorisés à lire le mot de passe : la lecture de l'attribut msDS-ManagedPassword par un autre compte doit être surveillée.",
        "Inventorier les comptes de service restants et prioriser ceux qui ont des droits élevés.",
        "Pour un service sur une seule machine, un compte de service géré autonome ou le nouveau dMSA (Windows Server 2025) sont aussi possibles.",
      ],
    },
  ],
  keyPoints: [
    "Les comptes de service classiques sont une cible de Kerberoasting.",
    "Un gMSA a un mot de passe long, aléatoire et renouvelé automatiquement.",
    "Seuls les serveurs autorisés récupèrent le mot de passe.",
    "Migrer service par service, puis désactiver l'ancien compte.",
  ],
  quiz: [
    {
      question: "Qui choisit le mot de passe d'un gMSA ?",
      options: ["L'administrateur", "L'Active Directory, automatiquement", "L'utilisateur du service"],
      correct: 1,
      explanation: "Il est généré et renouvelé par l'annuaire.",
    },
    {
      question: "Pourquoi les vieux comptes de service sont-ils une cible ?",
      options: ["Ils n'ont jamais de SPN", "Leurs mots de passe anciens peuvent être cassés hors ligne après une demande de ticket", "Ils ne peuvent pas se connecter"],
      correct: 1,
      explanation: "C'est le principe du Kerberoasting.",
    },
    {
      question: "Quelle étape vient en tout premier ?",
      options: ["Désactiver l'ancien compte", "Créer la clé racine KDS du domaine", "Configurer le service"],
      correct: 1,
      explanation: "Sans elle, aucun gMSA ne peut être créé.",
    },
  ],
  sources: [
    { label: "Microsoft Learn : Group Managed Service Accounts Overview", url: "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/group-managed-service-accounts-overview" },
  ],
};
