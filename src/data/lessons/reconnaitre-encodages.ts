import type { Lesson } from "@/lib/types";

export const RECONNAITRE_ENCODAGES: Lesson = {
  slug: "reconnaitre-encodages",
  title: "Reconnaître un encodage d'un coup d'œil",
  icon: "🔍",
  theme: "crypto",
  level: "debutant",
  summary: "Base64, hexadécimal, binaire, Base32, URL, morse : les indices qui trahissent chaque format.",
  duration: "7 min",
  objectives: [
    "Identifier les encodages les plus courants à leur alphabet",
    "Savoir dans quel ordre défaire plusieurs couches",
    "Ne pas confondre encodage, chiffrement et hachage",
  ],
  sections: [
    {
      title: "Les alphabets",
      paragraphs: [
        "Binaire : seulement 0 et 1, souvent par groupes de 8. Hexadécimal : 0-9 et a-f, souvent par paires. Décimal ASCII : nombres entre 32 et 126.",
        "Base64 : lettres, chiffres, + et /, avec parfois = à la fin. Base32 : majuscules et chiffres 2 à 7, avec des =. URL : des %XX.",
      ],
      example: "Base64 : YWRtaW4=\nHex : 61 64 6d 69 6e\nBase32 : MFSG22LO\nURL : %61%64%6d%69%6e",
    },
    {
      title: "Les substitutions de lettres",
      paragraphs: [
        "César, ROT13 et Atbash gardent la longueur des mots, les espaces et les majuscules : le texte ressemble à une langue inconnue.",
        "ROT13 appliqué deux fois redonne le texte ; Atbash aussi (A↔Z).",
      ],
    },
    {
      title: "Plusieurs couches",
      paragraphs: [
        "On défait toujours la dernière couche ajoutée en premier, comme on retire des poupées russes.",
        "Après chaque étape, on observe le résultat : son alphabet indique la couche suivante.",
      ],
    },
    {
      title: "Encoder n'est pas protéger",
      paragraphs: [
        "Un encodage se défait sans clé : il ne cache rien. Le chiffrement exige une clé ; le hachage est à sens unique.",
        "Voir du Base64 dans une configuration ne veut pas dire que le secret est protégé.",
      ],
    },
  ],
  keyPoints: [
    "Chaque encodage a un alphabet reconnaissable.",
    "Les substitutions gardent la forme des mots.",
    "On défait les couches dans l'ordre inverse.",
    "Encodage ≠ chiffrement ≠ hachage.",
  ],
  quiz: [
    {
      question: "« Q1lCRVI= » est probablement du…",
      options: ["Binaire", "Base64", "Morse"],
      correct: 1,
      explanation: "Lettres, chiffres et un = final : signature du Base64.",
    },
    {
      question: "Une chaîne de majuscules, de chiffres de 2 à 7 et de « = » évoque…",
      options: ["Base32", "Hexadécimal", "ROT13"],
      correct: 0,
      explanation: "Base32 n'utilise que A-Z et 2-7.",
    },
    {
      question: "Un mot de passe stocké en Base64 est-il protégé ?",
      options: ["Oui", "Non, n'importe qui peut le décoder", "Seulement s'il est long"],
      correct: 1,
      explanation: "Un encodage se défait sans clé.",
    },
  ],
};
