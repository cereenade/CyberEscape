import type { GameSave } from "./types";

const STORAGE_KEY = "cyberescape-save-v2";
const LEGACY_KEYS = ["cyberescape-save-v1"];

export const EMPTY_SAVE: GameSave = {
  version: 2,
  cards: [],
  solvedRooms: [],
  lessonsDone: [],
};

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

export function loadSave(): GameSave {
  try {
    // Les anciennes sauvegardes ne correspondent plus aux salles actuelles.
    LEGACY_KEYS.forEach((key) => window.localStorage.removeItem(key));

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_SAVE;
    const parsed = JSON.parse(raw) as Partial<GameSave>;
    if (parsed.version !== 2) return EMPTY_SAVE;
    return {
      version: 2,
      cards: stringArray(parsed.cards),
      solvedRooms: stringArray(parsed.solvedRooms),
      lessonsDone: stringArray(parsed.lessonsDone),
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
