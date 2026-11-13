"use client";

import { useState } from "react";
import { CARDS, LEVELS } from "@/data/game";
import { CyberCardView, LockedCard } from "./CyberCardView";
import { useGame } from "./GameProvider";

export function Deck() {
  const { save, loaded, resetGame } = useGame();
  const [openId, setOpenId] = useState<string | null>(null);

  if (!loaded) return <p className="loading">Chargement du deck…</p>;

  return (
    <>
      <p className="deck-count">
        {save.cards.length} / {CARDS.length} cartes découvertes
      </p>

      {LEVELS.map((level) => {
        const cards = CARDS.filter((card) => card.level === level.id);
        const owned = cards.filter((card) => save.cards.includes(card.id)).length;
        return (
          <section key={level.id} className="deck-level">
            <h2 className="deck-level-title">
              {level.icon} {level.name} <span className="muted">· {owned}/{cards.length}</span>
            </h2>
            <div className="deck-grid">
              {cards.map((card) =>
                save.cards.includes(card.id) ? (
                  <button
                    key={card.id}
                    type="button"
                    className="deck-item"
                    onClick={() => setOpenId(openId === card.id ? null : card.id)}
                    aria-expanded={openId === card.id}
                  >
                    <CyberCardView card={card} detailed={openId === card.id} />
                  </button>
                ) : (
                  <LockedCard key={card.id} />
                ),
              )}
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
