"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ROOMS } from "@/data/rooms";
import { EMPTY_SAVE, clearSave, loadSave, writeSave } from "@/lib/storage";
import type { GameSave } from "@/lib/types";

interface GameContextValue {
  save: GameSave;
  /** `false` tant que la sauvegarde n'a pas été lue (évite un flash au chargement). */
  loaded: boolean;
  isFinished: boolean;
  collectCard: (cardId: string) => void;
  solveRoom: (roomId: string) => void;
  goToNextRoom: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

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
    setSave((prev) =>
      prev.cards.includes(cardId) ? prev : { ...prev, cards: [...prev.cards, cardId] },
    );
  }, []);

  const solveRoom = useCallback((roomId: string) => {
    setSave((prev) =>
      prev.solvedRooms.includes(roomId)
        ? prev
        : { ...prev, solvedRooms: [...prev.solvedRooms, roomId] },
    );
  }, []);

  const goToNextRoom = useCallback(() => {
    setSave((prev) => ({ ...prev, currentRoom: Math.min(prev.currentRoom + 1, ROOMS.length) }));
  }, []);

  const resetGame = useCallback(() => {
    clearSave();
    setSave(EMPTY_SAVE);
  }, []);

  const value = useMemo<GameContextValue>(
    () => ({
      save,
      loaded,
      isFinished: save.currentRoom >= ROOMS.length,
      collectCard,
      solveRoom,
      goToNextRoom,
      resetGame,
    }),
    [save, loaded, collectCard, solveRoom, goToNextRoom, resetGame],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame doit être utilisé dans <GameProvider>.");
  return context;
}
