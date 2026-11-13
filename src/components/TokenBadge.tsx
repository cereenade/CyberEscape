"use client";

import Link from "next/link";
import { useGame } from "./GameProvider";

/** Jetons restants aujourd'hui (ou « illimité » pour les abonnés). */
export function TokenBadge() {
  const { status, loaded } = useGame();
  if (!loaded || !status.loggedIn) return null;
  if (status.premium) return <span className="token-badge token-badge-premium">∞ Illimité</span>;
  return (
    <Link href="/abonnement" className="token-badge" title="Jetons du jour : 1 jeton par salle réussie, remis à zéro à minuit">
      🪙 {status.tokensLeft}/{status.tokensPerDay}
    </Link>
  );
}
