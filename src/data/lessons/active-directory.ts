import type { Lesson } from "@/lib/types";

export const ACTIVE_DIRECTORY: Lesson = {
  slug: "active-directory",
  title: "Active Directory : attaques et défenses",
  icon: "🏰",
  theme: "systeme",
  level: "avance",
  summary: "L'annuaire qui gouverne le parc Windows est la cible numéro un des attaquants.",
  duration: "12 min",
  objectives: [
    "Comprendre les attaques Kerberos les plus courantes",
    "Connaître DCSync, golden et silver tickets",
    "Mettre en place le modèle par niveaux et la surveillance",
  ],
  sections: [
    {
      title: "Kerberos ciblé",
      paragraphs: [
        "Kerberoasting : demander des tickets de service pour casser hors ligne le mot de passe des comptes de service.",
        "AS-REP roasting : même idée sur les comptes sans pré-authentification. Parades : mots de passe longs (gMSA), pré-authentification exigée.",
      ],
    },
    {
      title: "Les tickets forgés",
      paragraphs: [
        "Avec le hash du compte krbtgt, un golden ticket donne accès à tout le domaine ; avec le hash d'un compte de service, un silver ticket donne accès à ce service.",
        "Après compromission, on réinitialise deux fois le mot de passe krbtgt.",
      ],
    },
    {
      title: "Se faire passer pour un contrôleur",
      paragraphs: [
        "DCSync abuse des droits de réplication pour récupérer tous les hashs ; DCShadow injecte des modifications en se faisant passer pour un contrôleur.",
        "Les services de certificats (AD CS) mal configurés et les Shadow Credentials permettent aussi d'usurper des identités.",
      ],
    },
    {
      title: "Défendre l'annuaire",
      paragraphs: [
        "Modèle par niveaux : les comptes administrateurs du domaine ne se connectent qu'aux contrôleurs, jamais aux postes utilisateurs.",
        "Cartographier les chemins d'attaque (BloodHound), supprimer la délégation non contrainte, auditer AD CS, surveiller 4662, 4769, 5136.",
      ],
    },
  ],
  keyPoints: [
    "Comptes de service : mots de passe longs ou gMSA.",
    "Golden ticket = krbtgt compromis : double réinitialisation.",
    "DCSync et AD CS mal configuré mènent au domaine entier.",
    "Modèle par niveaux et chemins d'attaque cassés.",
  ],
  quiz: [
    {
      question: "Le Kerberoasting vise…",
      options: ["Les comptes de service", "Les imprimantes", "Les pare-feux"],
      correct: 0,
      explanation: "On casse hors ligne leurs tickets de service.",
    },
    {
      question: "Après un golden ticket, que faire du mot de passe krbtgt ?",
      options: ["Rien", "Le réinitialiser deux fois", "Le noter"],
      correct: 1,
      explanation: "Deux réinitialisations invalident les anciens tickets.",
    },
    {
      question: "Un administrateur du domaine doit se connecter…",
      options: ["Sur n'importe quel poste", "Seulement aux contrôleurs et systèmes de même niveau", "Depuis son téléphone perso"],
      correct: 1,
      explanation: "Sinon ses identifiants peuvent être volés sur un poste compromis.",
    },
  ],
};
