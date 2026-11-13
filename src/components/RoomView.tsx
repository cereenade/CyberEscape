"use client";

import { useState } from "react";
import { submitAnswer } from "@/app/actions/game";
import type { PublicRoom, Submission } from "@/lib/types";
import { CyberCardView } from "./CyberCardView";
import { useGame } from "./GameProvider";
import { PuzzleView } from "./puzzles/PuzzleView";

type Phase = "explore" | "card" | "puzzle" | "solved";

interface Props {
  room: PublicRoom;
  /** Appelé au moment où l'énigme est résolue. */
  onSolved: () => void;
  onNext: () => void;
}

export function RoomView({ room, onSolved, onNext }: Props) {
  const { save, collectCard, setStatus } = useGame();
  const card = room.card;

  const [phase, setPhase] = useState<Phase>(() => (save.cards.includes(room.id) ? "puzzle" : "explore"));
  const [showHint, setShowHint] = useState(false);
  const [successText, setSuccessText] = useState("");

  async function handleSubmit(submission: Submission) {
    const result = await submitAnswer(room.id, submission);
    if (result.status) setStatus(result.status);
    return result;
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

      {phase === "card" && (
        <div className="card-found">
          <p className="card-found-label">Tu as trouvé une cyber-carte !</p>
          <CyberCardView card={card} detailed />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              collectCard(room.id).catch(() => undefined);
              setPhase("puzzle");
            }}
          >
            Ajouter à mon deck
          </button>
        </div>
      )}

      {phase === "puzzle" && (
        <>
          <PuzzleView
            puzzle={room.puzzle}
            onSubmit={handleSubmit}
            onSolved={(result) => {
              setSuccessText(result.successText ?? "Salle ouverte !");
              onSolved();
              setPhase("solved");
            }}
          />
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
        </>
      )}

      {phase === "solved" && (
        <div className="success">
          <p className="feedback feedback-success">✅ {successText}</p>
          <button type="button" className="btn btn-primary" onClick={onNext}>
            Porte suivante →
          </button>
        </div>
      )}
    </section>
  );
}
