import type { Lesson } from "@/lib/types";

export const SECURITY_TXT: Lesson = {
  slug: "security-txt",
  title: "Le fichier security.txt",
  icon: "📄",
  theme: "web",
  level: "intermediaire",
  summary: "Un petit fichier standard qui permet aux chercheurs de te signaler une faille au bon endroit.",
  duration: "6 min",
  objectives: [
    "Savoir à quoi sert security.txt",
    "Connaître son emplacement et ses champs principaux",
    "Rédiger un fichier security.txt simple",
  ],
  sections: [
    {
      title: "Pourquoi ce fichier",
      paragraphs: [
        "Un chercheur qui trouve une faille veut souvent prévenir le site. Sans contact clair, il abandonne, ou publie sans prévenir.",
        "Le fichier security.txt, normalisé dans la RFC 9116, donne un moyen de contact officiel pour la sécurité.",
      ],
    },
    {
      title: "Où le placer",
      paragraphs: [
        "Il se trouve à l'adresse /.well-known/security.txt, servie en HTTPS.",
        "Le dossier /.well-known/ est un emplacement standard qui regroupe des fichiers de configuration publics.",
      ],
      example: "https://serveur-corp.fr/.well-known/security.txt",
    },
    {
      title: "Les champs",
      paragraphs: [
        "Deux champs sont obligatoires : Contact (une adresse e-mail ou une page) et Expires (une date limite de validité).",
        "Champs utiles en plus : Encryption (clé pour chiffrer le signalement), Policy (politique de divulgation), Preferred-Languages, Acknowledgments.",
        "Le champ Expires oblige à relire le fichier régulièrement : un contact périmé ne sert à rien.",
      ],
      example: "Contact: mailto:securite@serveur-corp.fr\nExpires: 2027-12-31T23:00:00Z\nPreferred-Languages: fr, en",
    },
    {
      title: "Et derrière le fichier",
      paragraphs: [
        "Le fichier ne suffit pas : quelqu'un doit lire la boîte de contact et répondre.",
        "Accuse réception rapidement, remercie le chercheur et tiens-le au courant de la correction.",
      ],
    },
  ],
  keyPoints: [
    "security.txt indique comment signaler une faille.",
    "Emplacement : /.well-known/security.txt.",
    "Contact et Expires sont obligatoires.",
    "Une boîte de contact doit être surveillée.",
  ],
  quiz: [
    {
      question: "Où place-t-on le fichier security.txt ?",
      options: ["/security.txt dans un dossier caché /admin", "/.well-known/security.txt", "Dans le code source de la page d'accueil"],
      correct: 1,
      explanation: "C'est l'emplacement défini par la norme.",
    },
    {
      question: "Quels champs sont obligatoires ?",
      options: ["Contact et Expires", "Policy et Hiring", "Encryption et Canonical"],
      correct: 0,
      explanation: "Un moyen de contact et une date de validité.",
    },
    {
      question: "À quoi sert le champ Expires ?",
      options: ["À bloquer le site après cette date", "À éviter qu'un fichier périmé reste en ligne", "À limiter la durée des signalements"],
      correct: 1,
      explanation: "Il oblige à vérifier régulièrement que les informations sont à jour.",
    },
  ],
  sources: [{ label: "RFC 9116 : A File Format to Aid in Security Vulnerability Disclosure", url: "https://www.rfc-editor.org/rfc/rfc9116" }],
};
