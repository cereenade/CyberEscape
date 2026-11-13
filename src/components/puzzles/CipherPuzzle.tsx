"use client";

import { useState } from "react";
import { caesar } from "@/lib/crypto";
import { AnswerForm } from "./AnswerForm";

interface Props {
  ciphertext: string;
  answer: string;
  onSolved: () => void;
}

export function CipherPuzzle({ ciphertext, answer, onSolved }: Props) {
  const [shift, setShift] = useState(0);
  const decoded = caesar(ciphertext, -shift);

  return (
    <div className="puzzle">
      <p className="puzzle-intro">Message intercepté :</p>
      <p className="cipher-text">{ciphertext}</p>

      <div className="tool">
        <label className="tool-label" htmlFor="shift">
          Décodeur de César — décalage : <strong>{shift}</strong>
        </label>
        <input
          id="shift"
          type="range"
          min={0}
          max={25}
          value={shift}
          onChange={(event) => setShift(Number(event.target.value))}
          className="range"
        />
        <p className="cipher-text cipher-output" aria-live="polite">
          {decoded}
        </p>
      </div>

      <AnswerForm expected={answer} label="Quelle est la clé de la porte ?" onSolved={onSolved} />
    </div>
  );
}
