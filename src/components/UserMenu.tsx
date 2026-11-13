"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthProvider";
import { useGame } from "./GameProvider";
import { type ThemeChoice, applyTheme, readTheme } from "./theme";

const THEMES: { id: ThemeChoice; label: string; icon: string }[] = [
  { id: "dark", label: "Sombre", icon: "🌙" },
  { id: "light", label: "Clair", icon: "☀️" },
  { id: "system", label: "Système", icon: "💻" },
];

/** Menu déroulant du compte : profil, liens, apparence et déconnexion. */
export function UserMenu() {
  const { user, profile, signOut } = useAuth();
  const { status } = useGame();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeChoice>("dark");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setTheme(readTheme()), []);

  // Ferme le menu au changement de page, au clic à l'extérieur et avec Échap.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!user) return null;
  const pseudo = profile?.pseudo ?? "Mon compte";

  function chooseTheme(choice: ThemeChoice) {
    setTheme(choice);
    applyTheme(choice);
  }

  async function handleSignOut() {
    setOpen(false);
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="user-menu" ref={ref}>
      <button
        type="button"
        className={open ? "nav-link user-menu-trigger active" : "nav-link user-menu-trigger"}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="avatar avatar-small" aria-hidden>
          {pseudo.slice(0, 1).toUpperCase()}
        </span>
        {pseudo}
        <span className="user-menu-caret" aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <div className="user-menu-panel" role="menu">
          <div className="user-menu-head">
            <strong>{pseudo}</strong>
            <span className="muted small">{user.email}</span>
            <span className="user-menu-plan">
              {status.isAdmin ? "🛠️ Administratrice · illimité" : status.premium ? "∞ Illimité" : `🪙 ${status.tokensLeft}/${status.tokensPerDay} jetons aujourd'hui`}
            </span>
          </div>

          <Link href="/compte" className="user-menu-item" role="menuitem">
            👤 Mon compte
          </Link>
          <Link href="/deck" className="user-menu-item" role="menuitem">
            🃏 Mon deck
          </Link>
          <Link href="/abonnement" className="user-menu-item" role="menuitem">
            💳 {status.premium && !status.isAdmin ? "Mon abonnement" : "Offres et abonnement"}
          </Link>
          {status.isAdmin && (
            <Link href="/admin" className="user-menu-item" role="menuitem">
              🛠️ Administration
            </Link>
          )}

          <div className="user-menu-section">
            <span className="muted small">Apparence</span>
            <div className="theme-switch" role="radiogroup" aria-label="Apparence">
              {THEMES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={theme === item.id}
                  className={theme === item.id ? "theme-option active" : "theme-option"}
                  onClick={() => chooseTheme(item.id)}
                >
                  <span aria-hidden>{item.icon}</span> {item.label}
                </button>
              ))}
            </div>
          </div>

          <button type="button" className="user-menu-item user-menu-logout" role="menuitem" onClick={handleSignOut}>
            ↪ Se déconnecter
          </button>
        </div>
      )}
    </div>
  );
}
