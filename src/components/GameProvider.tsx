"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getLevelRooms } from "@/data/game";
import { EMPTY_SAVE, clearSave, loadSave, writeSave } from "@/lib/storage";
import { getBrowserSupabase } from "@/lib/supabase/client";
import type { GameSave, LevelId } from "@/lib/types";
import { useAuth } from "./AuthProvider";

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

function union(a: string[], b: string[]): string[] {
  return Array.from(new Set([...a, ...b]));
}

interface RemoteProgress {
  cards: string[] | null;
  solved_rooms: string[] | null;
  lessons_done: string[] | null;
}

/** Délai avant d'envoyer la progression au serveur (évite une requête par clic). */
const SYNC_DELAY_MS = 800;

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [save, setSave] = useState<GameSave>(EMPTY_SAVE);
  const [loaded, setLoaded] = useState(false);
  const { user } = useAuth();
  const userId = user?.id ?? null;
  /** Compte dont la progression en ligne a déjà été fusionnée avec la progression locale. */
  const [syncedUserId, setSyncedUserId] = useState<string | null>(null);

  useEffect(() => {
    setSave(loadSave());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) writeSave(save);
  }, [save, loaded]);

  // Connexion : on fusionne la progression du navigateur avec celle du compte.
  // Déconnexion : on vide la progression locale (elle reste sauvegardée sur le compte).
  useEffect(() => {
    if (!loaded) return;
    const supabase = getBrowserSupabase();
    if (!supabase) return;

    if (!userId) {
      if (syncedUserId) {
        clearSave();
        setSave(EMPTY_SAVE);
        setSyncedUserId(null);
      }
      return;
    }
    if (userId === syncedUserId) return;

    let cancelled = false;
    supabase
      .from("progress")
      .select("cards, solved_rooms, lessons_done")
      .eq("user_id", userId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.warn("Synchronisation de la progression impossible :", error.message);
          return;
        }
        const remote = (data ?? { cards: [], solved_rooms: [], lessons_done: [] }) as RemoteProgress;
        setSave((prev) => ({
          ...prev,
          cards: union(prev.cards, remote.cards ?? []),
          solvedRooms: union(prev.solvedRooms, remote.solved_rooms ?? []),
          lessonsDone: union(prev.lessonsDone, remote.lessons_done ?? []),
        }));
        setSyncedUserId(userId);
      });
    return () => {
      cancelled = true;
    };
  }, [loaded, userId, syncedUserId]);

  // Une fois synchronisé, chaque changement est envoyé au compte.
  useEffect(() => {
    if (!syncedUserId || syncedUserId !== userId) return;
    const supabase = getBrowserSupabase();
    if (!supabase) return;

    const timer = window.setTimeout(() => {
      supabase
        .from("progress")
        .upsert({
          user_id: syncedUserId,
          cards: save.cards,
          solved_rooms: save.solvedRooms,
          lessons_done: save.lessonsDone,
          updated_at: new Date().toISOString(),
        })
        .then(({ error }) => {
          if (error) console.warn("Sauvegarde en ligne impossible :", error.message);
        });
    }, SYNC_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [save, syncedUserId, userId]);

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
