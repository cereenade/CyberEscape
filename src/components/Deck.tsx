"use client";

import { useState } from "react";
import { CARDS } from "@/data/cards";
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
      <div className="deck-grid">
        {CARDS.map((card) =>
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
      {save.cards.length > 0 && (
        <button
          type="button"
          className="btn btn-ghost btn-small reset"
          onClick={() => {
            if (window.confirm("Effacer ta progression et recommencer à zéro ?")) resetGame();
          }}
        >
          Réinitialiser la partie
        </button>
      )}
    </>
  );
}
