import type { Lesson } from "@/lib/types";

export const COMPTES_INUTILISES: Lesson = {
  slug: "comptes-inutilises",
  title: "Faire le ménage dans ses comptes",
  icon: "🗃️",
  theme: "bases",
  level: "debutant",
  summary: "Retrouver ses vieux comptes en ligne, les supprimer et réduire les données qui peuvent fuir.",
  duration: "5 min",
  objectives: [
    "Comprendre pourquoi un compte oublié reste un risque",
    "Retrouver ses anciens comptes",
    "Supprimer un compte ou demander l'effacement de ses données",
  ],
  sections: [
    {
      title: "Un compte oublié n'est pas un compte vide",
      paragraphs: [
        "Chaque inscription laisse des traces : ton e-mail, souvent ton nom, parfois ton adresse, ta date de naissance ou une carte bancaire.",
        "Si le site se fait pirater des années plus tard, ces données fuient, même si tu ne t'y connectes plus depuis longtemps.",
        "Et si tu utilisais le même mot de passe ailleurs, la fuite peut ouvrir tes autres comptes.",
      ],
    },
    {
      title: "Retrouver ses comptes",
      paragraphs: [
        "Cherche dans ta boîte mail des mots comme « Bienvenue », « Confirme ton inscription » ou « Ta commande ».",
        "Ton gestionnaire de mots de passe ou celui du navigateur liste aussi les sites où tu as un compte.",
        "Regarde dans les réglages de tes comptes Google, Apple ou Facebook : la liste des applis connectées « avec » eux.",
      ],
    },
    {
      title: "Supprimer ou demander l'effacement",
      paragraphs: [
        "La plupart des sites proposent une suppression dans les réglages du compte, parfois cachée dans « Confidentialité ».",
        "Si rien n'est prévu, le RGPD te donne le droit de demander l'effacement de tes données. La CNIL propose des modèles de courrier.",
        "Pour les comptes que tu gardes : retire la carte bancaire enregistrée, mets un mot de passe unique et active la double authentification.",
      ],
    },
  ],
  keyPoints: [
    "Moins de comptes = moins de données exposées.",
    "Ta boîte mail est la meilleure carte de tes anciens comptes.",
    "Le RGPD te permet de demander l'effacement de tes données.",
    "Les comptes gardés : mot de passe unique et pas de carte enregistrée inutile.",
  ],
  quiz: [
    {
      question: "Tu ne te connectes plus à un vieux forum depuis 5 ans. Tes données y sont-elles protégées ?",
      options: ["Oui, le compte est en veille", "Non, elles peuvent fuir si le site est piraté", "Oui, elles sont effacées automatiquement après un an"],
      correct: 1,
      explanation: "Le compte existe toujours, avec tes données, tant que tu ne le supprimes pas.",
    },
    {
      question: "Le site ne propose pas de bouton de suppression. Que peux-tu faire ?",
      options: ["Rien, c'est définitif", "Demander l'effacement de tes données au titre du RGPD", "Changer ton adresse e-mail"],
      correct: 1,
      explanation: "Le droit à l'effacement s'applique aux sites qui traitent les données de personnes en Europe.",
    },
    {
      question: "Quel est le meilleur endroit pour retrouver tes anciennes inscriptions ?",
      options: ["Ta boîte mail", "Ton répertoire de contacts", "Ta galerie photo"],
      correct: 0,
      explanation: "Les mails de bienvenue et de confirmation gardent la trace de tes comptes.",
    },
  ],
  sources: [
    { label: "CNIL : Le droit à l'effacement", url: "https://www.cnil.fr/fr/le-droit-leffacement-supprimer-vos-donnees-en-ligne" },
  ],
};
