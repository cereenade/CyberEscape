import type { CyberCard } from "@/lib/types";

export const CARDS: CyberCard[] = [
  {
    id: "code-source",
    title: "Le code source",
    category: "Web",
    icon: "🧾",
    summary: "Tout ce qu'un site envoie à ton navigateur peut être lu par n'importe qui.",
    details: [
      "Une page web est du code HTML, CSS et JavaScript envoyé à ton navigateur.",
      "Tu peux le lire avec Ctrl+U (afficher la source) ou F12 (outils de développement).",
      "Les commentaires <!-- ... --> ne s'affichent pas à l'écran, mais ils restent visibles dans le code.",
      "Règle d'or : on ne met jamais de mot de passe ou de clé secrète dans le code envoyé au navigateur.",
    ],
    hint: "Les développeurs pressés laissent parfois des notes dans les commentaires HTML…",
  },
  {
    id: "cesar",
    title: "Le chiffre de César",
    category: "Crypto",
    icon: "🏛️",
    summary: "Décaler chaque lettre de l'alphabet : le plus vieux chiffrement connu.",
    details: [
      "Jules César décalait chaque lettre de 3 rangs : A devient D, B devient E…",
      "Pour déchiffrer, on applique le décalage inverse.",
      "Il n'existe que 25 décalages possibles : on peut tous les tester en quelques secondes (attaque par force brute).",
      "C'est pour ça qu'on utilise aujourd'hui des algorithmes modernes comme AES.",
    ],
    hint: "César aimait le chiffre 3. Essaie de reculer chaque lettre de 3 rangs.",
  },
  {
    id: "phishing",
    title: "Le phishing",
    category: "Social",
    icon: "🎣",
    summary: "Un faux message qui se fait passer pour un vrai pour te voler tes accès.",
    details: [
      "Le phishing (hameçonnage) imite un service connu pour te pousser à cliquer ou à donner ton mot de passe.",
      "Signes typiques : urgence (« votre compte sera supprimé »), menace, fautes, adresse d'expéditeur bizarre.",
      "Vérifie toujours le vrai domaine : « serveur-c0rp.com » n'est pas « serveur-corp.fr ».",
      "Le texte d'un lien peut mentir : regarde l'adresse réelle avant de cliquer.",
    ],
    hint: "Compare l'adresse de l'expéditeur et l'adresse réelle du lien avec le vrai domaine : serveur-corp.fr.",
  },
  {
    id: "base64",
    title: "Base64",
    category: "Crypto",
    icon: "🔤",
    summary: "Un encodage, pas un chiffrement : tout le monde peut le décoder.",
    details: [
      "Base64 transforme des données en texte avec 64 caractères (A–Z, a–z, 0–9, + et /).",
      "On le reconnaît souvent au signe = à la fin.",
      "Il n'y a aucune clé : n'importe qui peut le décoder en un clic.",
      "Encoder n'est pas protéger : un secret en Base64 n'est pas un secret.",
    ],
    hint: "Cette chaîne finit par « == » : c'est du Base64. Utilise le décodeur.",
  },
  {
    id: "mot-de-passe",
    title: "Les mots de passe robustes",
    category: "Mots de passe",
    icon: "🔑",
    summary: "La longueur bat la complexité : une phrase de passe est plus solide qu'un mot tordu.",
    details: [
      "Les pirates testent d'abord les mots de passe connus et leurs variantes (P@ssw0rd, Admin2024!…).",
      "Chaque caractère ajouté multiplie le nombre de combinaisons à tester.",
      "Une phrase de passe de plusieurs mots au hasard est longue et facile à retenir.",
      "Un mot de passe différent par site, et un gestionnaire de mots de passe pour tout retenir.",
    ],
    hint: "Cherche le plus long, celui qui n'est pas une variante d'un mot connu.",
  },
];

export function getCard(id: string): CyberCard | undefined {
  return CARDS.find((card) => card.id === id);
}
