"use client";

import { useState } from "react";
import type { ChoiceOption } from "@/lib/types";

interface Props {
  question: string;
  options: ChoiceOption[];
  onSolved: () => void;
}

export function ChoicePuzzle({ question, options, onSolved }: Props) {
  const [wrongPick, setWrongPick] = useState<ChoiceOption | null>(null);

  function choose(option: ChoiceOption) {
    if (option.correct) {
      setWrongPick(null);
      onSolved();
    } else {
      setWrongPick(option);
    }
  }

  return (
    <div className="puzzle-body">
      <p className="puzzle-intro">{question}</p>
      <div className="choices">
        {options.map((option) => (
          <button
            key={option.label}
            type="button"
            className={wrongPick === option ? "choice choice-wrong" : "choice"}
            onClick={() => choose(option)}
          >
            <code>{option.label}</code>
          </button>
        ))}
      </div>
      {wrongPick && (
        <p className="feedback feedback-error" role="alert">
          Mauvais choix : {wrongPick.explanation}
        </p>
      )}
    </div>
  );
}
