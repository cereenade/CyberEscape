import type { CyberCard, Level, LevelId, Room, RoomContent } from "@/lib/types";
import { DIFFICILE } from "./levels/difficile";
import { FACILE } from "./levels/facile";
import { IMPOSSIBLE } from "./levels/impossible";
import { MOYEN } from "./levels/moyen";
import { TRES_DIFFICILE } from "./levels/tres-difficile";

export const LEVELS: Level[] = [
  {
    id: "facile",
    name: "Facile",
    icon: "🟢",
    tagline: "Les bons réflexes",
    description: "Mots de passe, faux mails, clés USB : les pièges du quotidien.",
  },
  {
    id: "moyen",
    name: "Moyen",
    icon: "🟡",
    tagline: "Lire les indices",
    description: "Encodages, adresses web, en-têtes de mails et premiers journaux.",
  },
  {
    id: "difficile",
    name: "Difficile",
    icon: "🟠",
    tagline: "Penser comme un attaquant",
    description: "Chiffrements, hachage, failles web et configurations dangereuses.",
  },
  {
    id: "tres-difficile",
    name: "Très difficile",
    icon: "🔴",
    tagline: "Dans la peau d'un analyste SOC",
    description: "XOR, jetons JWT, logs d'attaque, exfiltration et processus suspects.",
  },
  {
    id: "impossible",
    name: "Impossible",
    icon: "💀",
    tagline: "Réservé aux experts",
    description: "Énigmes en plusieurs couches, enquêtes complètes et le boss final.",
  },
];

const CONTENT: Record<LevelId, RoomContent[]> = {
  facile: FACILE,
  moyen: MOYEN,
  difficile: DIFFICILE,
  "tres-difficile": TRES_DIFFICILE,
  impossible: IMPOSSIBLE,
};

export const ROOMS: Room[] = LEVELS.flatMap((level) =>
  CONTENT[level.id].map((room, index) => ({ ...room, level: level.id, index })),
);

export const CARDS: CyberCard[] = ROOMS.map((room) => ({ ...room.card, id: room.id, level: room.level }));

export function getLevel(id: string): Level | undefined {
  return LEVELS.find((level) => level.id === id);
}

export function getLevelRooms(id: LevelId): Room[] {
  return ROOMS.filter((room) => room.level === id);
}

export function getCard(id: string): CyberCard | undefined {
  return CARDS.find((card) => card.id === id);
}
