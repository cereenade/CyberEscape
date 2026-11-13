import type { GameSave } from "./types";

const STORAGE_KEY = "cyberescape-save-v1";

export const EMPTY_SAVE: GameSave = {
  version: 1,
  currentRoom: 0,
  cards: [],
  solvedRooms: [],
};

export function loadSave(): GameSave {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_SAVE;
    const parsed = JSON.parse(raw) as Partial<GameSave>;
    if (parsed.version !== 1) return EMPTY_SAVE;
    return {
      version: 1,
      currentRoom: typeof parsed.currentRoom === "number" ? parsed.currentRoom : 0,
      cards: Array.isArray(parsed.cards) ? parsed.cards : [],
      solvedRooms: Array.isArray(parsed.solvedRooms) ? parsed.solvedRooms : [],
    };
  } catch {
    return EMPTY_SAVE;
  }
}

export function writeSave(save: GameSave): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
  } catch {
    // Stockage indisponible (navigation privée, etc.) : on joue sans sauvegarde.
  }
}

export function clearSave(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
