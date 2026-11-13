"use client";

import { useState } from "react";
import type { Submission } from "@/lib/types";

interface Props {
  question: string;
  options: string[];
  pending: boolean;
  onSubmit: (submission: Submission) => void;
}

export function ChoicePuzzle({ question, options, pending, onSubmit }: Props) {
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <div className="puzzle-body">
      <p className="puzzle-intro">{question}</p>
      <div className="choices">
        {options.map((label, index) => (
          <button
            key={label}
            type="button"
            className={picked === index ? "choice choice-selected" : "choice"}
            disabled={pending}
            onClick={() => {
              setPicked(index);
              onSubmit({ kind: "choice", index });
            }}
          >
            <code>{label}</code>
          </button>
        ))}
      </div>
    </div>
  );
}
