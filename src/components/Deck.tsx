"use client";

import { useState } from "react";
import { LEVELS, TOTAL_CARDS, roomCount } from "@/data/meta";
import type { CyberCard } from "@/lib/types";
import { CyberCardView, LockedCard } from "./CyberCardView";
import { useGame } from "./GameProvider";

/** `cards` : les cartes gagnées (les autres ne quittent jamais le serveur). */
export function Deck({ cards: ownedCards }: { cards: CyberCard[] }) {
  const { save, loaded, resetGame } = useGame();
  const [openId, setOpenId] = useState<string | null>(null);

  if (!loaded) return <p className="loading">Chargement du deck…</p>;

  // Après une remise à zéro, `save.cards` est vide : on n'affiche plus rien.
  const owned = ownedCards.filter((card) => save.cards.includes(card.id));

  return (
    <>
      <p className="deck-count">
        {owned.length} / {TOTAL_CARDS} cartes découvertes
      </p>

      {LEVELS.map((level) => {
        const cards = owned.filter((card) => card.level === level.id);
        const locked = Math.max(0, roomCount(level.id) - cards.length);
        return (
          <section key={level.id} className="deck-level">
            <h2 className="deck-level-title">
              {level.icon} {level.name} <span className="muted">· {cards.length}/{roomCount(level.id)}</span>
            </h2>
            <div className="deck-grid">
              {cards.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  className="deck-item"
                  onClick={() => setOpenId(openId === card.id ? null : card.id)}
                  aria-expanded={openId === card.id}
                >
                  <CyberCardView card={card} detailed={openId === card.id} />
                </button>
              ))}
              {Array.from({ length: locked }, (_, i) => (
                <LockedCard key={`locked-${i}`} />
              ))}
            </div>
          </section>
        );
      })}

      {(save.cards.length > 0 || save.lessonsDone.length > 0) && (
        <button
          type="button"
          className="btn btn-ghost btn-small reset"
          onClick={() => {
            if (window.confirm("Effacer toute ta progression (salles, cartes, leçons) ?")) resetGame();
          }}
        >
          Réinitialiser toute la partie
        </button>
      )}
    </>
  );
}
