import type { Lesson } from "@/lib/types";

export const LIENS_DE_SUIVI: Lesson = {
  slug: "liens-de-suivi",
  title: "Ce que cachent les liens de suivi",
  icon: "🔗",
  theme: "web",
  level: "intermediaire",
  summary: "Les liens des mails contiennent souvent ton identité, juste encodée : savoir les lire et les partager sans risque.",
  duration: "6 min",
  objectives: [
    "Repérer les paramètres de suivi dans une adresse",
    "Décoder un identifiant simplement encodé",
    "Partager un lien sans transmettre ton identité",
  ],
  sections: [
    {
      title: "Des paramètres qui t'identifient",
      paragraphs: [
        "Après le ? d'une adresse viennent des paramètres : nom=valeur, séparés par &. Les mails marketing en ajoutent pour savoir qui a cliqué (u=, id=, email=, utm_…).",
        "Les paramètres utm_ décrivent la campagne. D'autres désignent directement le destinataire.",
      ],
    },
    {
      title: "Encodé n'est pas chiffré",
      paragraphs: [
        "Ces identifiants sont souvent juste encodés en Base64 ou en hexadécimal. Il n'y a aucune clé : n'importe qui peut les décoder en une seconde.",
        "Un Base64 se reconnaît à ses lettres majuscules et minuscules, ses chiffres et parfois des = à la fin.",
      ],
      example: "https://www.boutique-exemple.fr/promo?u=bGVhQGV4YW1wbGUuY29t\nu décodé (Base64) → lea@example.com",
    },
    {
      title: "Les liens qui connectent directement",
      paragraphs: [
        "Certains liens contiennent un jeton qui connecte à ton compte sans mot de passe (gérer ses abonnements, voir sa commande).",
        "Transférer un tel lien, c'est donner l'accès à ton compte à la personne qui le reçoit.",
      ],
    },
    {
      title: "Partager proprement",
      paragraphs: [
        "Pour partager une page, copie l'adresse sans ce qui suit le ? (ou retire les paramètres qui te désignent).",
        "Côté site, un identifiant de suivi devrait être un numéro aléatoire sans signification, jamais l'adresse mail encodée.",
      ],
    },
  ],
  keyPoints: [
    "Les paramètres après le ? peuvent t'identifier.",
    "Base64 et hexadécimal se décodent sans clé.",
    "Certains liens donnent accès à ton compte : ne les transfère pas.",
    "Partage l'adresse sans ses paramètres.",
  ],
  quiz: [
    {
      question: "Un identifiant en Base64 est-il protégé ?",
      options: ["Oui, c'est du chiffrement", "Non, n'importe qui peut le décoder", "Oui, si la valeur est longue"],
      correct: 1,
      explanation: "Base64 est un encodage, sans aucune clé.",
    },
    {
      question: "Comment partager une page reçue par mail ?",
      options: ["Transférer le mail entier", "Copier l'adresse sans les paramètres de suivi", "Copier le lien tel quel"],
      correct: 1,
      explanation: "Tu partages la page sans transmettre ton identité ni un éventuel jeton de connexion.",
    },
    {
      question: "Que décode bGVhQGV4YW1wbGUuY29t (Base64) ?",
      options: ["lea@example.com", "promo2026", "Rien, c'est aléatoire"],
      correct: 0,
      explanation: "C'est l'adresse mail du destinataire, simplement encodée.",
    },
  ],
  sources: [
    { label: "CNIL – Traceurs et e-mails", url: "https://www.cnil.fr/" },
    { label: "RFC 4648 – Base64", url: "https://www.rfc-editor.org/rfc/rfc4648" },
  ],
};
