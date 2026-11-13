import { LEVELS, getLevelRooms } from "@/data/game";
import type { GameSave, LevelId } from "./types";

export function solvedCount(save: GameSave, levelId: LevelId): number {
  return getLevelRooms(levelId).filter((room) => save.solvedRooms.includes(room.id)).length;
}

export function isLevelComplete(save: GameSave, levelId: LevelId): boolean {
  return getLevelRooms(levelId).every((room) => save.solvedRooms.includes(room.id));
}

/** Le premier niveau est toujours ouvert ; les suivants s'ouvrent quand le précédent est fini. */
export function isLevelUnlocked(save: GameSave, levelId: LevelId): boolean {
  const index = LEVELS.findIndex((level) => level.id === levelId);
  if (index <= 0) return true;
  return isLevelComplete(save, LEVELS[index - 1].id);
}

/** Index de la première salle non résolue du niveau (10 si tout est fini). */
export function currentRoomIndex(save: GameSave, levelId: LevelId): number {
  const rooms = getLevelRooms(levelId);
  const index = rooms.findIndex((room) => !save.solvedRooms.includes(room.id));
  return index === -1 ? rooms.length : index;
}
