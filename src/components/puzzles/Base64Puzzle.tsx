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
  // Le texte décodé n'est lisible que si on a collé la chaîne du post-it.
  const looksWrong = decoded !== "" && (decoded === null || !/^[\x20-\x7e]+$/.test(decoded));

  return (
    <div className="puzzle">
      <p className="puzzle-intro">Sur le post-it :</p>
      <p className="cipher-text">{encoded}</p>

      <div className="tool">
        <label className="tool-label" htmlFor="b64">
          Décodeur Base64 : colle ici le texte <strong>du post-it</strong>, le décodeur affiche ce qu&apos;il cache.
        </label>
        <div className="answer-row">
          <input
            id="b64"
            className="input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Texte en Base64 (ex. celui du post-it)"
            autoComplete="off"
            spellCheck={false}
          />
          <button type="button" className="btn btn-ghost" onClick={() => setInput(encoded)}>
            Coller le post-it
          </button>
        </div>
        <p className="tool-label">Résultat décodé :</p>
        <p className="cipher-text cipher-output" aria-live="polite">
          {decoded || "…"}
        </p>
        {looksWrong && (
          <p className="feedback feedback-error" role="alert">
            Résultat illisible : ce texte n&apos;est pas du Base64. Colle bien la chaîne du post-it.
          </p>
        )}
      </div>

      <AnswerForm expected={answer} label="Code du coffre (le mot décodé)" onSolved={onSolved} />
    </div>
  );
}
