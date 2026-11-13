"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CARDS } from "@/data/game";
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
      </nav>
    </header>
  );
}
