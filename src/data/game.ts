import "server-only";
import type { CyberCard, LevelId, Room, RoomContent } from "@/lib/types";
import { LEVELS, ROOM_COUNTS } from "./meta";
import { DIFFICILE } from "./levels/difficile";
import { DIFFICILE_2 } from "./levels/difficile-2";
import { DIFFICILE_3 } from "./levels/difficile-3";
import { DIFFICILE_4 } from "./levels/difficile-4";
import { DIFFICILE_5 } from "./levels/difficile-5";
import { DIFFICILE_6 } from "./levels/difficile-6";
import { DIFFICILE_7 } from "./levels/difficile-7";
import { FACILE } from "./levels/facile";
import { FACILE_2 } from "./levels/facile-2";
import { FACILE_3 } from "./levels/facile-3";
import { FACILE_4 } from "./levels/facile-4";
import { FACILE_5 } from "./levels/facile-5";
import { FACILE_6 } from "./levels/facile-6";
import { FACILE_7 } from "./levels/facile-7";
import { IMPOSSIBLE } from "./levels/impossible";
import { IMPOSSIBLE_2 } from "./levels/impossible-2";
import { IMPOSSIBLE_3 } from "./levels/impossible-3";
import { IMPOSSIBLE_4 } from "./levels/impossible-4";
import { IMPOSSIBLE_5 } from "./levels/impossible-5";
import { IMPOSSIBLE_6 } from "./levels/impossible-6";
import { IMPOSSIBLE_7 } from "./levels/impossible-7";
import { MOYEN } from "./levels/moyen";
import { MOYEN_2 } from "./levels/moyen-2";
import { MOYEN_3 } from "./levels/moyen-3";
import { MOYEN_4 } from "./levels/moyen-4";
import { MOYEN_5 } from "./levels/moyen-5";
import { MOYEN_6 } from "./levels/moyen-6";
import { MOYEN_7 } from "./levels/moyen-7";
import { TRES_DIFFICILE } from "./levels/tres-difficile";
import { TRES_DIFFICILE_2 } from "./levels/tres-difficile-2";
import { TRES_DIFFICILE_3 } from "./levels/tres-difficile-3";
import { TRES_DIFFICILE_4 } from "./levels/tres-difficile-4";
import { TRES_DIFFICILE_5 } from "./levels/tres-difficile-5";
import { TRES_DIFFICILE_6 } from "./levels/tres-difficile-6";
import { TRES_DIFFICILE_7 } from "./levels/tres-difficile-7";

/**
 * Salles de chaque niveau, dans l'ordre de jeu, réparties en fichiers
 * (1–10, 11–20, 21–40, puis 20 salles par fichier : 41–60, 61–80, 81–100…).
 * La salle « sortie du niveau » reste toujours la dernière : les nouvelles salles s'insèrent avant elle.
 */
const CONTENT: Record<LevelId, RoomContent[]> = {
  facile: withExitLast([...FACILE, ...FACILE_2, ...FACILE_3, ...FACILE_4, ...FACILE_5, ...FACILE_6, ...FACILE_7], "facile-100"),
  moyen: withExitLast([...MOYEN, ...MOYEN_2, ...MOYEN_3, ...MOYEN_4, ...MOYEN_5, ...MOYEN_6, ...MOYEN_7], "moyen-100"),
  difficile: withExitLast([...DIFFICILE, ...DIFFICILE_2, ...DIFFICILE_3, ...DIFFICILE_4, ...DIFFICILE_5, ...DIFFICILE_6, ...DIFFICILE_7], "difficile-100"),
  "tres-difficile": withExitLast(
    [...TRES_DIFFICILE, ...TRES_DIFFICILE_2, ...TRES_DIFFICILE_3, ...TRES_DIFFICILE_4, ...TRES_DIFFICILE_5, ...TRES_DIFFICILE_6, ...TRES_DIFFICILE_7],
    "tres-difficile-100",
  ),
  impossible: withExitLast([...IMPOSSIBLE, ...IMPOSSIBLE_2, ...IMPOSSIBLE_3, ...IMPOSSIBLE_4, ...IMPOSSIBLE_5, ...IMPOSSIBLE_6, ...IMPOSSIBLE_7], "impossible-100"),
};

/** Place la salle de sortie à la fin, même si des salles plus récentes ont été ajoutées après elle dans les fichiers. */
function withExitLast(rooms: RoomContent[], exitId: string): RoomContent[] {
  const exit = rooms.find((room) => room.id === exitId);
  return exit ? [...rooms.filter((room) => room.id !== exitId), exit] : rooms;
}

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
  if (count !== ROOM_COUNTS[level.id]) {
    throw new Error(`Le niveau ${level.id} contient ${count} salles au lieu de ${ROOM_COUNTS[level.id]} (voir src/data/meta.ts).`);
  }
}
