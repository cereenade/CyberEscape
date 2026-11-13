import "server-only";
import type { CyberCard, LevelId, Room, RoomContent } from "@/lib/types";
import { LEVELS, ROOMS_PER_LEVEL } from "./meta";
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


/** 40 salles par niveau, réparties en trois fichiers (1–10, 11–20, 21–40). */
const CONTENT: Record<LevelId, RoomContent[]> = {
  facile: [...FACILE, ...FACILE_2, ...FACILE_3],
  moyen: [...MOYEN, ...MOYEN_2, ...MOYEN_3],
  difficile: [...DIFFICILE, ...DIFFICILE_2, ...DIFFICILE_3],
  "tres-difficile": [...TRES_DIFFICILE, ...TRES_DIFFICILE_2, ...TRES_DIFFICILE_3],
  impossible: [...IMPOSSIBLE, ...IMPOSSIBLE_2, ...IMPOSSIBLE_3],
};

export { LEVELS };

export const ROOMS: Room[] = LEVELS.flatMap((level) =>
  CONTENT[level.id].map((room, index) => ({ ...room, level: level.id, index })),
);

export const CARDS: CyberCard[] = ROOMS.map((room) => ({ ...room.card, id: room.id, level: room.level }));

export function getLevelRooms(id: LevelId): Room[] {
  return ROOMS.filter((room) => room.level === id);
}

export function getCard(id: string): CyberCard | undefined {
  return CARDS.find((card) => card.id === id);
}

// Garde-fou : les compteurs affichés côté navigateur (meta.ts) doivent correspondre au contenu réel.
for (const level of LEVELS) {
  const count = CONTENT[level.id].length;
  if (count !== ROOMS_PER_LEVEL) {
    throw new Error(`Le niveau ${level.id} contient ${count} salles au lieu de ${ROOMS_PER_LEVEL} (voir src/data/meta.ts).`);
  }
}
