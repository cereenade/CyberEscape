import type { Lesson } from "@/lib/types";

export const QUOTED_PRINTABLE: Lesson = {
  slug: "quoted-printable",
  title: "Lire le quoted-printable dans un mail",
  icon: "✉️",
  theme: "crypto",
  level: "intermediaire",
  summary: "Les « =C3=A9 » dans la source d'un mail ne sont pas du chiffrement : apprends à les décoder pour analyser un message suspect.",
  duration: "6 min",
  objectives: [
    "Reconnaître le quoted-printable dans la source d'un mail",
    "Décoder un « =XX » en caractère",
    "Comprendre pourquoi les analystes doivent le lire",
  ],
  sections: [
    {
      title: "Pourquoi cet encodage existe",
      paragraphs: [
        "Les mails ont été pensés pour du texte simple. Pour faire passer des accents et des caractères spéciaux, la norme MIME (RFC 2045) propose le quoted-printable.",
        "Il s'annonce par l'en-tête « Content-Transfer-Encoding: quoted-printable ». Le texte reste presque lisible, seuls les caractères spéciaux sont transformés.",
      ],
    },
    {
      title: "Comment le décoder",
      paragraphs: [
        "Un « = » suivi de deux chiffres hexadécimaux représente un octet. En UTF-8, « é » occupe deux octets : =C3=A9. « à » donne =C3=A0, « è » donne =C3=A8.",
        "Un « = » seul en fin de ligne est une coupure douce : la ligne continue juste après. « =3D » représente le signe égal lui-même.",
        "Dans la salle « Le mail aux signes égal », « s=C3=A9curit=C3=A9 » se lit donc « sécurité ».",
      ],
    },
    {
      title: "Ce que ça change pour l'analyste",
      paragraphs: [
        "Les attaquants s'en servent parfois pour découper un mot ou une adresse et passer sous le radar d'un filtre naïf.",
        "Les bons outils d'analyse décodent automatiquement la source. Ne te fie pas à une simple recherche de mot dans le texte brut.",
      ],
    },
  ],
  keyPoints: [
    "Le quoted-printable est un encodage, pas un chiffrement.",
    "=XX = un octet en hexadécimal ; =C3=A9 = « é » en UTF-8.",
    "Un « = » en fin de ligne signifie que la ligne continue.",
    "Décode toujours la source avant de chercher des indices.",
  ],
  quiz: [
    {
      question: "Que représente « =C3=A9 » en UTF-8 ?",
      options: ["La lettre « é »", "Un mot de passe chiffré", "Une fin de mail"],
      correct: 0,
      explanation: "Ce sont les deux octets du caractère « é ».",
    },
    {
      question: "Quel en-tête annonce cet encodage ?",
      options: ["Content-Type: image/png", "Content-Transfer-Encoding: quoted-printable", "Received: from"],
      correct: 1,
      explanation: "Content-Transfer-Encoding indique comment le corps est encodé.",
    },
    {
      question: "Que signifie un « = » tout seul en fin de ligne ?",
      options: ["Que le mail est piégé", "Que la ligne continue sur la suivante", "Que le texte est chiffré"],
      correct: 1,
      explanation: "C'est une coupure douce, ajoutée pour limiter la longueur des lignes.",
    },
  ],
  sources: [
    { label: "RFC 2045 — MIME, section 6.7 (Quoted-Printable)", url: "https://www.rfc-editor.org/rfc/rfc2045" },
  ],
};
