import type { CyberCard, Level, LevelId, Room, RoomContent } from "@/lib/types";
import { DIFFICILE } from "./levels/difficile";
import { DIFFICILE_2 } from "./levels/difficile-2";
import { DIFFICILE_3 } from "./levels/difficile-3";
import { FACILE } from "./levels/facile";
import { FACILE_2 } from "./levels/facile-2";
import { FACILE_3 } from "./levels/facile-3";
import { IMPOSSIBLE } from "./levels/impossible";
import { IMPOSSIBLE_2 } from "./levels/impossible-2";
import { IMPOSSIBLE_3 } from "./levels/impossible-3";
import { MOYEN } from "./levels/moyen";
import { MOYEN_2 } from "./levels/moyen-2";
import { MOYEN_3 } from "./levels/moyen-3";
import { TRES_DIFFICILE } from "./levels/tres-difficile";
import { TRES_DIFFICILE_2 } from "./levels/tres-difficile-2";
import { TRES_DIFFICILE_3 } from "./levels/tres-difficile-3";

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

/** 40 salles par niveau, réparties en trois fichiers (1–10, 11–20, 21–40). */
const CONTENT: Record<LevelId, RoomContent[]> = {
  facile: [...FACILE, ...FACILE_2, ...FACILE_3],
  moyen: [...MOYEN, ...MOYEN_2, ...MOYEN_3],
  difficile: [...DIFFICILE, ...DIFFICILE_2, ...DIFFICILE_3],
  "tres-difficile": [...TRES_DIFFICILE, ...TRES_DIFFICILE_2, ...TRES_DIFFICILE_3],
  impossible: [...IMPOSSIBLE, ...IMPOSSIBLE_2, ...IMPOSSIBLE_3],
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
