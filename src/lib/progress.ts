import { ROOMS_PER_LEVEL, levelOfRoom } from "@/data/meta";
import type { LevelId, Progress } from "./types";

export function solvedCount(save: Progress, levelId: LevelId): number {
  return save.solvedRooms.filter((id) => levelOfRoom(id) === levelId).length;
}

export function isLevelComplete(save: Progress, levelId: LevelId): boolean {
  return solvedCount(save, levelId) >= ROOMS_PER_LEVEL;
}

/** Index de la première salle non résolue d'une liste de salles (longueur de la liste si tout est fini). */
export function currentRoomIndex(save: Progress, roomIds: string[]): number {
  const index = roomIds.findIndex((id) => !save.solvedRooms.includes(id));
  return index === -1 ? roomIds.length : index;
}
