"use client";

import { useState } from "react";
import { decodeBase64 } from "@/lib/crypto";
import { AnswerForm } from "./AnswerForm";

interface Props {
  encoded: string;
  answer: string;
  onSolved: () => void;
}

export function Base64Puzzle({ encoded, answer, onSolved }: Props) {
  const [input, setInput] = useState("");
  const decoded = input ? decodeBase64(input) : "";

  return (
    <div className="puzzle">
      <p className="puzzle-intro">Sur le post-it :</p>
      <p className="cipher-text">{encoded}</p>

      <div className="tool">
        <label className="tool-label" htmlFor="b64">
          Décodeur Base64 — colle le texte ici :
        </label>
        <input
          id="b64"
          className="input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Texte en Base64"
          autoComplete="off"
          spellCheck={false}
        />
        <p className="cipher-text cipher-output" aria-live="polite">
          {decoded === null ? "⚠️ Ce n'est pas du Base64 valide." : decoded || "…"}
        </p>
      </div>

      <AnswerForm expected={answer} label="Code du coffre" onSolved={onSolved} />
    </div>
  );
}
