"use client";

import { useMemo, useState } from "react";

interface Props {
  question: string;
  /** Étapes dans le bon ordre. */
  items: string[];
  onSolved: () => void;
}

/** Mélange stable (toujours le même pour une liste donnée) et jamais identique au bon ordre. */
function shuffle(items: string[]): string[] {
  const score = (text: string) => Array.from(text).reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) % 1_000_003, 7);
  const mixed = [...items].sort((a, b) => score(a) - score(b));
  const same = mixed.every((item, i) => item === items[i]);
  return same ? [...mixed.slice(1), mixed[0]] : mixed;
}

/** Cliquer sur les étapes dans le bon ordre. */
export function OrderPuzzle({ question, items, onSolved }: Props) {
  const pool = useMemo(() => shuffle(items), [items]);
  const [sequence, setSequence] = useState<string[]>([]);
  const [error, setError] = useState(false);

  function add(item: string) {
    setError(false);
    setSequence((prev) => [...prev, item]);
  }

  function check() {
    if (sequence.every((item, i) => item === items[i])) {
      onSolved();
    } else {
      setError(true);
    }
  }

  return (
    <div className="puzzle-body">
      <p className="puzzle-intro">{question}</p>
      <p className="muted small">Clique sur les étapes dans l&apos;ordre.</p>

      <div className="choices">
        {pool
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
        <button type="button" className="btn btn-primary" onClick={check} disabled={sequence.length !== items.length}>
          Valider l&apos;ordre
        </button>
        {sequence.length > 0 && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setSequence([]);
              setError(false);
            }}
          >
            Recommencer
          </button>
        )}
      </div>

      {error && (
        <p className="feedback feedback-error" role="alert">
          Ce n&apos;est pas le bon ordre. Recommence et réfléchis à ce qui doit arriver en premier.
        </p>
      )}
    </div>
  );
}
