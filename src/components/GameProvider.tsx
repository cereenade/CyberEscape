"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { collectCard as collectCardAction, completeLesson as completeLessonAction, getStatus, resetProgress } from "@/app/actions/game";
import { TOKENS_PER_DAY } from "@/data/meta";
import type { PlayerStatus, Progress } from "@/lib/types";
import { useAuth } from "./AuthProvider";

interface GameContextValue {
  /** Progression du compte (vide si personne n'est connecté). */
  save: Progress;
  /** Connexion, abonnement et jetons du jour. */
  status: PlayerStatus;
  /** `false` tant que l'état n'a pas été lu sur le serveur (évite un flash au chargement). */
  loaded: boolean;
  /** Met à jour l'état après une réponse du serveur. */
  setStatus: (status: PlayerStatus) => void;
  refresh: () => Promise<void>;
  collectCard: (roomId: string) => Promise<void>;
  completeLesson: (slug: string) => Promise<void>;
  resetGame: () => Promise<void>;
}

const GUEST: PlayerStatus = {
  loggedIn: false,
  premium: false,
  plan: null,
  tokensLeft: 0,
  tokensPerDay: TOKENS_PER_DAY,
  progress: { cards: [], solvedRooms: [], lessonsDone: [] },
};

const GameContext = createContext<GameContextValue | null>(null);

/**
 * Toute la progression est gérée par le serveur : le navigateur ne fait que l'afficher.
 * Impossible donc de tricher en modifiant le stockage local ou en écrivant directement dans la base.
 */
export function GameProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const userId = user?.id ?? null;
  const [status, setStatus] = useState<PlayerStatus>(GUEST);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setStatus(await getStatus());
    } catch {
      setStatus(GUEST);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!userId) {
      setStatus(GUEST);
      setLoaded(true);
      return;
    }
    setLoaded(false);
    refresh();
  }, [loading, userId, refresh]);

  const collectCard = useCallback(async (roomId: string) => {
    setStatus(await collectCardAction(roomId));
  }, []);

  const completeLesson = useCallback(async (slug: string) => {
    setStatus(await completeLessonAction(slug));
  }, []);

  const resetGame = useCallback(async () => {
    setStatus(await resetProgress());
  }, []);

  const value = useMemo<GameContextValue>(
    () => ({ save: status.progress, status, loaded, setStatus, refresh, collectCard, completeLesson, resetGame }),
    [status, loaded, refresh, collectCard, completeLesson, resetGame],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame doit être utilisé dans <GameProvider>.");
  return context;
}
