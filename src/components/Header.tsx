"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CARDS } from "@/data/game";
import { useAuth } from "./AuthProvider";
import { useGame } from "./GameProvider";

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/jeu", label: "Jouer" },
  { href: "/cours", label: "Cours" },
  { href: "/deck", label: "Mon deck" },
];

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const { save, loaded } = useGame();
  const auth = useAuth();

  return (
    <header className="header">
      <Link href="/" className="logo">
        <span className="logo-mark">&gt;_</span> CyberEscape
      </Link>
      <nav className="nav" aria-label="Navigation principale">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} className={isActive(pathname, link.href) ? "nav-link active" : "nav-link"}>
            {link.label}
            {link.href === "/deck" && loaded && (
              <span className="badge">
                {save.cards.length}/{CARDS.length}
              </span>
            )}
          </Link>
        ))}

        {/* Toujours visibles : sans Supabase, les pages expliquent que les comptes arrivent bientôt. */}
        {!auth.loading && (
          <span className="nav-account">
            {auth.user ? (
              <Link href="/compte" className={isActive(pathname, "/compte") ? "nav-link active" : "nav-link"}>
                <span className="avatar avatar-small" aria-hidden>
                  {(auth.profile?.pseudo ?? "?").slice(0, 1).toUpperCase()}
                </span>
                {auth.profile?.pseudo ?? "Mon compte"}
              </Link>
            ) : (
              <>
                <Link href="/connexion" className={isActive(pathname, "/connexion") ? "nav-link active" : "nav-link"}>
                  Connexion
                </Link>
                <Link href="/inscription" className="btn btn-primary btn-small">
                  S&apos;inscrire
                </Link>
              </>
            )}
          </span>
        )}
      </nav>
    </header>
  );
}
