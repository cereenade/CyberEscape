"use client";

import { useState } from "react";
import type { Submission } from "@/lib/types";

interface Props {
  question: string;
  /** Étapes déjà mélangées par le serveur. */
  items: string[];
  pending: boolean;
  onSubmit: (submission: Submission) => void;
  onChange: () => void;
}

/** Cliquer sur les étapes dans le bon ordre. */
export function OrderPuzzle({ question, items, pending, onSubmit, onChange }: Props) {
  const [sequence, setSequence] = useState<string[]>([]);

  function add(item: string) {
    onChange();
    setSequence((prev) => [...prev, item]);
  }

  return (
    <div className="puzzle-body">
      <p className="puzzle-intro">{question}</p>
      <p className="muted small">Clique sur les étapes dans l&apos;ordre.</p>

      <div className="choices">
        {items
          .filter((item) => !sequence.includes(item))
          .map((item) => (
            <button key={item} type="button" className="choice" onClick={() => add(item)}>
              {item}
            </button>
          ))}
      </div>

      {sequence.length > 0 && (
        <ol className="order-sequence">
          {sequence.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      )}

      <div className="actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onSubmit({ kind: "order", sequence })}
          disabled={pending || sequence.length !== items.length}
        >
          Valider l&apos;ordre
        </button>
        {sequence.length > 0 && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setSequence([]);
              onChange();
            }}
          >
            Recommencer
          </button>
        )}
      </div>
    </div>
  );
}
