"use client";

import { useState } from "react";
import { getCard } from "@/data/cards";
import type { Room } from "@/lib/types";
import { CyberCardView } from "./CyberCardView";
import { useGame } from "./GameProvider";
import { PuzzleRenderer } from "./puzzles/PuzzleRenderer";

type Phase = "explore" | "card" | "puzzle" | "solved";

export function RoomView({ room }: { room: Room }) {
  const { save, collectCard, solveRoom, goToNextRoom } = useGame();
  const card = getCard(room.cardId);

  const [phase, setPhase] = useState<Phase>(() => {
    if (save.solvedRooms.includes(room.id)) return "solved";
    if (save.cards.includes(room.cardId)) return "puzzle";
    return "explore";
  });
  const [showHint, setShowHint] = useState(false);

  function handleSolved() {
    solveRoom(room.id);
    setPhase("solved");
  }

  return (
    <section className="room">
      <h1 className="room-title">{room.name}</h1>
      <p className="room-story">{room.story}</p>

      {phase === "explore" && (
        <button type="button" className="btn btn-primary" onClick={() => setPhase("card")}>
          🔍 Explorer la salle
        </button>
      )}

      {phase === "card" && card && (
        <div className="card-found">
          <p className="card-found-label">Tu as trouvé une cyber-carte !</p>
          <CyberCardView card={card} detailed />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              collectCard(card.id);
              setPhase("puzzle");
            }}
          >
            Ajouter à mon deck
          </button>
        </div>
      )}

      {phase === "puzzle" && (
        <>
          <PuzzleRenderer puzzle={room.puzzle} onSolved={handleSolved} />
          {card && (
            <div className="hint">
              {showHint ? (
                <p>
                  <strong>
                    {card.icon} {card.title} :
                  </strong>{" "}
                  {card.hint}
                </p>
              ) : (
                <button type="button" className="btn btn-ghost btn-small" onClick={() => setShowHint(true)}>
                  🃏 Utiliser la carte « {card.title} »
                </button>
              )}
            </div>
          )}
        </>
      )}

      {phase === "solved" && (
        <div className="success">
          <p className="feedback feedback-success">✅ {room.successText}</p>
          <button type="button" className="btn btn-primary" onClick={goToNextRoom}>
            Porte suivante →
          </button>
        </div>
      )}
    </section>
  );
}
