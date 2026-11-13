import type { Lesson } from "@/lib/types";

export const CRYPTO_MODERNE: Lesson = {
  slug: "crypto-moderne",
  title: "Cryptographie moderne et certificats",
  icon: "🔏",
  theme: "crypto",
  level: "intermediaire",
  summary: "AES, RSA, signatures et certificats : ce qui protège vraiment tes connexions.",
  duration: "8 min",
  objectives: [
    "Expliquer chiffrement symétrique et asymétrique",
    "Comprendre le fonctionnement de HTTPS",
    "Lire et vérifier un certificat",
  ],
  sections: [
    {
      title: "Symétrique : rapide, mais une clé à partager",
      paragraphs: [
        "AES et ChaCha20 chiffrent avec une même clé dans les deux sens. Ils sont très rapides et considérés comme sûrs.",
        "Le problème : comment partager la clé avec quelqu'un sans qu'elle soit interceptée ?",
      ],
    },
    {
      title: "Asymétrique : une paire de clés",
      paragraphs: [
        "RSA ou les courbes elliptiques utilisent deux clés liées : une publique, que tout le monde peut connaître, et une privée, qu'on garde secrète.",
        "Ce qui est chiffré avec la clé publique ne se déchiffre qu'avec la clé privée. À l'inverse, une signature faite avec la clé privée se vérifie avec la clé publique.",
      ],
    },
    {
      title: "Comment marche HTTPS",
      paragraphs: [
        "Le navigateur et le site utilisent l'asymétrique pour se mettre d'accord sur une clé secrète, puis passent au symétrique pour la suite : le meilleur des deux mondes.",
        "Le certificat du site prouve son identité : il est signé par une autorité de certification à laquelle ton navigateur fait confiance.",
      ],
    },
    {
      title: "Lire un certificat",
      paragraphs: [
        "Trois vérifications : le domaine (CN ou SAN) correspond-il au site ? Qui l'a signé ? Est-il encore dans sa période de validité ?",
        "Auto-signé, expiré ou émis pour un autre domaine : l'alerte du navigateur est justifiée, ne la contourne pas.",
      ],
    },
    {
      title: "Signer pour prouver",
      paragraphs: [
        "La signature numérique garantit qu'un fichier ou un message vient bien de son auteur et n'a pas été modifié.",
        "Les programmes signés, les mises à jour et les mails (DKIM) l'utilisent. Une empreinte SHA-256 publiée permet aussi de vérifier l'intégrité d'un téléchargement.",
      ],
    },
  ],
  keyPoints: [
    "Symétrique (AES) : rapide, une seule clé à partager.",
    "Asymétrique (RSA, courbes elliptiques) : clé publique pour chiffrer, clé privée pour déchiffrer.",
    "HTTPS combine les deux : l'asymétrique pour s'accorder sur une clé, le symétrique pour les données.",
    "Un certificat doit correspondre au domaine, être signé par une autorité reconnue et être valide.",
  ],
  quiz: [
    {
      question: "Avec quelle clé vérifie-t-on une signature numérique ?",
      options: ["La clé privée de l'auteur", "La clé publique de l'auteur", "Une clé AES"],
      correct: 1,
      explanation: "L'auteur signe avec sa clé privée, tout le monde vérifie avec sa clé publique.",
    },
    {
      question: "Pourquoi HTTPS utilise-t-il aussi du chiffrement symétrique ?",
      options: ["Parce qu'il est bien plus rapide", "Parce que l'asymétrique est cassé", "Par habitude"],
      correct: 0,
      explanation: "L'asymétrique sert à échanger une clé, le symétrique chiffre ensuite efficacement les données.",
    },
    {
      question: "Un certificat émis pour www.autre-site.org sur banque-horizon.fr est…",
      options: ["Valide", "Invalide : il ne correspond pas au domaine", "Plus sûr"],
      correct: 1,
      explanation: "Le domaine du certificat doit correspondre au site visité.",
    },
  ],
};
