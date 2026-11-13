"use client";

import { useState } from "react";
import type { ChoiceOption } from "@/lib/types";

interface Props {
  question: string;
  options: ChoiceOption[];
  onSolved: () => void;
}

/** Cocher toutes les bonnes réponses, et seulement elles. */
export function MultiPuzzle({ question, options, onSolved }: Props) {
  const [selected, setSelected] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<{ missing: number; wrong: ChoiceOption[] } | null>(null);

  function toggle(index: number) {
    setFeedback(null);
    setSelected((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  }

  function check() {
    const wrong = selected.filter((i) => !options[i].correct).map((i) => options[i]);
    const missing = options.filter((o, i) => o.correct && !selected.includes(i)).length;
    if (wrong.length === 0 && missing === 0) {
      setFeedback(null);
      onSolved();
    } else {
      setFeedback({ missing, wrong });
    }
  }

  return (
    <div className="puzzle-body">
      <p className="puzzle-intro">{question}</p>
      <p className="muted small">Plusieurs réponses possibles.</p>
      <div className="choices">
        {options.map((option, index) => (
          <button
            key={option.label}
            type="button"
            className={selected.includes(index) ? "choice choice-selected" : "choice"}
            aria-pressed={selected.includes(index)}
            onClick={() => toggle(index)}
          >
            <span className="checkbox" aria-hidden>
              {selected.includes(index) ? "☑" : "☐"}
            </span>{" "}
            {option.label}
          </button>
        ))}
      </div>
      <button type="button" className="btn btn-primary multi-submit" onClick={check} disabled={selected.length === 0}>
        Valider ma sélection
      </button>
      {feedback && (
        <div className="feedback feedback-error" role="alert">
          {feedback.wrong.map((option) => (
            <p key={option.label}>
              ✗ <strong>{option.label}</strong> : {option.explanation}
            </p>
          ))}
          {feedback.missing > 0 && (
            <p>
              Il manque encore {feedback.missing} bonne{feedback.missing > 1 ? "s" : ""} réponse
              {feedback.missing > 1 ? "s" : ""}.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
