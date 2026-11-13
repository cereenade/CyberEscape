"use client";

import type { User } from "@supabase/supabase-js";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AUTH_ENABLED } from "@/lib/supabase/config";
import { getBrowserSupabase } from "@/lib/supabase/client";

export interface Profile {
  pseudo: string;
  createdAt: string;
}

interface AuthContextValue {
  /** `false` si Supabase n'est pas configuré : le site marche alors sans comptes. */
  enabled: boolean;
  /** `true` tant qu'on ne sait pas encore si quelqu'un est connecté. */
  loading: boolean;
  user: User | null;
  profile: Profile | null;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(AUTH_ENABLED);

  useEffect(() => {
    const supabase = getBrowserSupabase();
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const userId = user?.id;

  const refreshProfile = useCallback(async () => {
    const supabase = getBrowserSupabase();
    if (!supabase || !userId) {
      setProfile(null);
      return;
    }
    const { data } = await supabase.from("profiles").select("pseudo, created_at").eq("id", userId).maybeSingle();
    setProfile(data ? { pseudo: data.pseudo as string, createdAt: data.created_at as string } : null);
  }, [userId]);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const signOut = useCallback(async () => {
    const supabase = getBrowserSupabase();
    if (supabase) await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ enabled: AUTH_ENABLED, loading, user, profile, refreshProfile, signOut }),
    [loading, user, profile, refreshProfile, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé dans <AuthProvider>.");
  return context;
}
