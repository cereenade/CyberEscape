/**
 * Informations publiques sur le jeu, utilisables partout (y compris dans le navigateur).
 * Le contenu des salles, lui, reste sur le serveur (src/data/game.ts) pour ne pas exposer les réponses.
 */
import type { Level, LevelId } from "@/lib/types";

export const LEVELS: Level[] = [
  {
    id: "facile",
    name: "Facile",
    icon: "🟢",
    tagline: "Les bons réflexes",
    description: "Mots de passe, faux mails, SMS piégés, Wi-Fi public : les pièges du quotidien.",
  },
  {
    id: "moyen",
    name: "Moyen",
    icon: "🟡",
    tagline: "Lire les indices",
    description: "Encodages, adresses web, DNS, métadonnées, scans et premiers journaux.",
  },
  {
    id: "difficile",
    name: "Difficile",
    icon: "🟠",
    tagline: "Penser comme un attaquant",
    description: "Chiffrements, hachage, failles web (SQL, XSS, CSRF) et configurations dangereuses.",
  },
  {
    id: "tres-difficile",
    name: "Très difficile",
    icon: "🔴",
    tagline: "Dans la peau d'un analyste SOC",
    description: "XOR, JWT, YARA, SIEM, macros, beaconing et analyse de trafic.",
  },
  {
    id: "impossible",
    name: "Impossible",
    icon: "💀",
    tagline: "Réservé aux experts",
    description: "Énigmes en plusieurs couches, enquêtes complètes, SSRF, deepfakes et la chasse finale.",
  },
];

/**
 * Nombre de salles par niveau (vérifié au démarrage du serveur par src/data/game.ts).
 * À mettre à jour à chaque ajout de salles.
 */
export const ROOM_COUNTS: Record<LevelId, number> = {
  facile: 101,
  moyen: 101,
  difficile: 101,
  "tres-difficile": 101,
  impossible: 101,
};

export function roomCount(levelId: LevelId): number {
  return ROOM_COUNTS[levelId];
}

export const TOTAL_ROOMS = LEVELS.reduce((sum, level) => sum + ROOM_COUNTS[level.id], 0);
/** Une carte par salle. */
export const TOTAL_CARDS = TOTAL_ROOMS;

/** Jetons gratuits par jour (non cumulables). */
export const TOKENS_PER_DAY = 5;

export const PLANS = {
  etudiant: { name: "Étudiant", price: "2,99 €", description: "Pour les élèves et étudiants, sur vérification de l'adresse e-mail de l'école." },
  standard: { name: "Standard", price: "4,99 €", description: "Pour tout le monde." },
} as const;

export type PaidPlan = keyof typeof PLANS;

export function getLevel(id: string): Level | undefined {
  return LEVELS.find((level) => level.id === id);
}

/** Niveau d'une salle à partir de son identifiant (ex. « tres-difficile-12 » → « tres-difficile »). */
export function levelOfRoom(roomId: string): LevelId | undefined {
  return LEVELS.find((level) => roomId.startsWith(`${level.id}-`) && /^\d+$/.test(roomId.slice(level.id.length + 1)))?.id;
}
