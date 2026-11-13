"use client";

import { useState } from "react";
import { getCard } from "@/data/game";
import type { Room } from "@/lib/types";
import { CyberCardView } from "./CyberCardView";
import { useGame } from "./GameProvider";
import { PuzzleView } from "./puzzles/PuzzleView";

type Phase = "explore" | "card" | "puzzle" | "solved";

interface Props {
  room: Room;
  /** Appelé au moment où l'énigme est résolue. */
  onSolved: () => void;
  onNext: () => void;
}

export function RoomView({ room, onSolved, onNext }: Props) {
  const { save, collectCard, solveRoom } = useGame();
  const card = getCard(room.id);

  const [phase, setPhase] = useState<Phase>(() => (save.cards.includes(room.id) ? "puzzle" : "explore"));
  const [showHint, setShowHint] = useState(false);

  function handleSolved() {
    onSolved();
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
          <PuzzleView puzzle={room.puzzle} onSolved={handleSolved} />
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
          <button type="button" className="btn btn-primary" onClick={onNext}>
            Porte suivante →
          </button>
        </div>
      )}
    </section>
  );
}
