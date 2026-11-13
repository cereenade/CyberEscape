"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getLevelRooms } from "@/data/game";
import { EMPTY_SAVE, clearSave, loadSave, writeSave } from "@/lib/storage";
import type { GameSave, LevelId } from "@/lib/types";

interface GameContextValue {
  save: GameSave;
  /** `false` tant que la sauvegarde n'a pas été lue (évite un flash au chargement). */
  loaded: boolean;
  collectCard: (cardId: string) => void;
  solveRoom: (roomId: string) => void;
  completeLesson: (slug: string) => void;
  /** Rejoue un niveau : ses salles redeviennent à résoudre, les cartes restent. */
  resetLevel: (levelId: LevelId) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

function addUnique(list: string[], value: string): string[] {
  return list.includes(value) ? list : [...list, value];
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [save, setSave] = useState<GameSave>(EMPTY_SAVE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSave(loadSave());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) writeSave(save);
  }, [save, loaded]);

  const collectCard = useCallback((cardId: string) => {
    setSave((prev) => ({ ...prev, cards: addUnique(prev.cards, cardId) }));
  }, []);

  const solveRoom = useCallback((roomId: string) => {
    setSave((prev) => ({ ...prev, solvedRooms: addUnique(prev.solvedRooms, roomId) }));
  }, []);

  const completeLesson = useCallback((slug: string) => {
    setSave((prev) => ({ ...prev, lessonsDone: addUnique(prev.lessonsDone, slug) }));
  }, []);

  const resetLevel = useCallback((levelId: LevelId) => {
    const ids = new Set(getLevelRooms(levelId).map((room) => room.id));
    setSave((prev) => ({ ...prev, solvedRooms: prev.solvedRooms.filter((id) => !ids.has(id)) }));
  }, []);

  const resetGame = useCallback(() => {
    clearSave();
    setSave(EMPTY_SAVE);
  }, []);

  const value = useMemo<GameContextValue>(
    () => ({ save, loaded, collectCard, solveRoom, completeLesson, resetLevel, resetGame }),
    [save, loaded, collectCard, solveRoom, completeLesson, resetLevel, resetGame],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame doit être utilisé dans <GameProvider>.");
  return context;
}
