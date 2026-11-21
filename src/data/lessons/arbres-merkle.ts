import type { Lesson } from "@/lib/types";

export const ARBRES_MERKLE: Lesson = {
  slug: "arbres-merkle",
  title: "Les arbres de Merkle",
  icon: "🌳",
  theme: "crypto",
  level: "avance",
  summary: "Résumer des millions de données en une empreinte, prouver l'appartenance d'un élément en quelques hachages, et détecter toute réécriture de l'historique.",
  duration: "9 min",
  objectives: [
    "Comprendre comment se construit un arbre de Merkle",
    "Calculer la taille d'une preuve d'appartenance",
    "Reconnaître les usages en sécurité : Certificate Transparency, Git, journaux infalsifiables",
  ],
  sections: [
    {
      title: "La construction",
      paragraphs: [
        "On commence par calculer l'empreinte (par exemple SHA-256) de chaque donnée : ce sont les feuilles.",
        "On regroupe les feuilles deux par deux et on calcule l'empreinte de chaque paire, puis on recommence étage par étage jusqu'à n'avoir plus qu'une empreinte : la racine.",
        "La racine résume tout l'arbre : si une seule donnée change, toutes les empreintes sur son chemin changent, racine comprise.",
      ],
    },
    {
      title: "La preuve d'appartenance",
      paragraphs: [
        "Pour prouver qu'une donnée fait partie de l'arbre, on fournit seulement les empreintes « sœurs » rencontrées sur le chemin vers la racine.",
        "Le vérificateur recalcule la racine à partir de la donnée et de ces empreintes, puis la compare à la racine qu'il connaît déjà.",
        "Avec n feuilles, il faut environ log₂(n) empreintes : 3 pour 8 entrées, 20 pour un million. C'est ce qui rend la vérification si légère.",
      ],
    },
    {
      title: "Les usages en sécurité",
      paragraphs: [
        "Certificate Transparency : les journaux publics de certificats TLS sont des arbres de Merkle. Un navigateur peut vérifier qu'un certificat y figure, et des observateurs vérifient que le journal n'a pas été réécrit (preuve de cohérence).",
        "Git identifie chaque version par une empreinte qui dépend de tout son contenu et de son historique : modifier un ancien commit change tous les suivants.",
        "Les journaux d'audit infalsifiables, les sauvegardes dédupliquées et les systèmes de fichiers comme ZFS utilisent le même principe pour détecter les altérations.",
      ],
    },
    {
      title: "Les pièges à éviter",
      paragraphs: [
        "Il faut distinguer une feuille d'un nœud interne (par exemple en préfixant 0x00 aux feuilles et 0x01 aux nœuds, comme le fait la RFC 6962), sinon on peut fabriquer de fausses preuves.",
        "La sécurité repose sur la fonction de hachage : une fonction cassée comme MD5 ou SHA-1 affaiblit tout l'arbre.",
        "La racine elle-même doit être publiée ou signée de façon fiable : une racine falsifiée valide un faux arbre.",
      ],
    },
  ],
  keyPoints: [
    "Chaque nœud est l'empreinte de ses enfants ; la racine résume tout.",
    "Une preuve d'appartenance ne demande qu'environ log₂(n) empreintes.",
    "Toute modification d'une donnée change la racine.",
    "Séparer feuilles et nœuds, utiliser un hachage robuste et publier la racine de façon fiable.",
  ],
  quiz: [
    {
      question: "Combien d'empreintes faut-il pour prouver l'appartenance d'un élément dans un arbre de 1 024 feuilles ?",
      options: ["10", "512", "1 024"],
      correct: 0,
      explanation: "log₂(1 024) = 10 : une empreinte sœur par étage.",
    },
    {
      question: "Que se passe-t-il si une seule donnée de l'arbre est modifiée ?",
      options: ["Rien, seule sa feuille change", "Toutes les empreintes jusqu'à la racine changent", "L'arbre devient illisible"],
      correct: 1,
      explanation: "C'est ce qui rend toute réécriture détectable.",
    },
    {
      question: "Quel service public de la sécurité web repose sur des arbres de Merkle ?",
      options: ["Le DNS classique", "Certificate Transparency", "Le protocole FTP"],
      correct: 1,
      explanation: "Les journaux de certificats sont des arbres de Merkle vérifiables (RFC 6962).",
    },
  ],
  sources: [
    { label: "RFC 6962 : Certificate Transparency", url: "https://www.rfc-editor.org/rfc/rfc6962" },
    { label: "RFC 9162 : Certificate Transparency Version 2.0", url: "https://www.rfc-editor.org/rfc/rfc9162" },
  ],
};
