import type { Lesson } from "@/lib/types";

export const COLIS_NON_COMMANDES: Lesson = {
  slug: "colis-non-commandes",
  title: "Les colis non commandés (brushing)",
  icon: "📦",
  theme: "humain",
  level: "debutant",
  summary: "Un objet reçu sans l'avoir commandé : comprendre l'arnaque au brushing et savoir comment réagir.",
  duration: "5 min",
  objectives: [
    "Comprendre pourquoi des vendeurs envoient des colis gratuits",
    "Savoir ce que ce colis révèle sur tes données",
    "Connaître les bons réflexes après réception",
  ],
  sections: [
    {
      title: "Le principe du brushing",
      paragraphs: [
        "Sur certains sites marchands, un avis compte davantage s'il vient d'un « achat vérifié ». Des vendeurs peu scrupuleux achètent donc leurs propres produits et les envoient à de vraies adresses.",
        "Ils publient ensuite des avis élogieux au nom des destinataires. Le colis coûte peu, l'avis rapporte beaucoup.",
      ],
      example: "Une petite lampe arrive à ton nom. Trois jours plus tard, un avis cinq étoiles « signé » de toi apparaît sur le site.",
    },
    {
      title: "Ce que ça révèle",
      paragraphs: [
        "Pour t'envoyer un colis, le vendeur a ton nom et ton adresse : ces informations ont fuité (fuite de données, revente de fichiers clients).",
        "Parfois, un compte marchand à ton nom a même été créé ou détourné pour passer la commande.",
      ],
    },
    {
      title: "Les pièges qui s'y greffent",
      paragraphs: [
        "Certains colis contiennent un QR code « pour remercier l'expéditeur » ou « suivre ta livraison » : il peut mener vers un site qui vole tes identifiants.",
        "D'autres escrocs envoient ensuite un SMS réclamant des frais pour « garder » le colis. Tu n'as rien à payer pour un objet que tu n'as pas commandé.",
      ],
    },
    {
      title: "Les bons réflexes",
      paragraphs: [
        "Signale le colis et l'éventuel faux avis au site marchand. Change le mot de passe de ton compte et active la double authentification.",
        "Vérifie si ton adresse mail apparaît dans une fuite connue et surveille tes relevés bancaires quelques semaines.",
      ],
    },
  ],
  keyPoints: [
    "Un colis non commandé sert souvent à publier de faux avis en ton nom.",
    "Il prouve que ton nom et ton adresse circulent.",
    "Ne scanne aucun QR code du colis et ne paie aucun frais.",
    "Signale, change ton mot de passe, surveille tes comptes.",
  ],
  quiz: [
    {
      question: "Pourquoi un vendeur t'enverrait-il un objet gratuitement ?",
      options: ["Par erreur de stock", "Pour publier un faux avis « achat vérifié » à ton nom", "Pour te faire gagner un concours"],
      correct: 1,
      explanation: "C'est le principe du brushing : l'avis vérifié a plus de valeur que l'objet.",
    },
    {
      question: "Un SMS te demande 1,99 € pour garder le colis. Que fais-tu ?",
      options: ["Je paie, c'est peu", "Je ne paie rien et je supprime le SMS", "Je réponds pour négocier"],
      correct: 1,
      explanation: "Tu ne dois rien pour un objet non commandé : c'est une tentative d'arnaque à la carte bancaire.",
    },
    {
      question: "Quelle action est la plus utile après réception ?",
      options: ["Scanner le QR code du colis", "Changer le mot de passe de ton compte marchand et signaler le colis", "Publier une photo du colis"],
      correct: 1,
      explanation: "Tu reprends le contrôle du compte et le site peut supprimer les faux avis.",
    },
  ],
  sources: [
    { label: "Cybermalveillance.gouv.fr – Arnaques", url: "https://www.cybermalveillance.gouv.fr/" },
  ],
};
