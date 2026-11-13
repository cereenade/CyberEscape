"use client";

import { useState } from "react";
import type { Submission } from "@/lib/types";

interface Props {
  question: string;
  options: string[];
  pending: boolean;
  onSubmit: (submission: Submission) => void;
  onChange: () => void;
}

/** Cocher toutes les bonnes réponses, et seulement elles. */
export function MultiPuzzle({ question, options, pending, onSubmit, onChange }: Props) {
  const [selected, setSelected] = useState<number[]>([]);

  function toggle(index: number) {
    onChange();
    setSelected((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  }

  return (
    <div className="puzzle-body">
      <p className="puzzle-intro">{question}</p>
      <p className="muted small">Plusieurs réponses possibles.</p>
      <div className="choices">
        {options.map((label, index) => (
          <button
            key={label}
            type="button"
            className={selected.includes(index) ? "choice choice-selected" : "choice"}
            aria-pressed={selected.includes(index)}
            onClick={() => toggle(index)}
          >
            <span className="checkbox" aria-hidden>
              {selected.includes(index) ? "☑" : "☐"}
            </span>{" "}
            {label}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-primary multi-submit"
        onClick={() => onSubmit({ kind: "multi", indices: selected })}
        disabled={pending || selected.length === 0}
      >
        Valider ma sélection
      </button>
    </div>
  );
}
