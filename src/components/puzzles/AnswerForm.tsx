"use client";

import { useState } from "react";
import { isCorrectAnswer } from "@/lib/text";

interface Props {
  answers: string[];
  label: string;
  placeholder?: string;
  strict?: boolean;
  onSolved: () => void;
}

export function AnswerForm({ answers, label, placeholder = "Ta réponse", strict = false, onSolved }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isCorrectAnswer(value, answers, strict)) {
      setError(false);
      onSolved();
    } else {
      setError(true);
    }
  }

  return (
    <form className="answer-form" onSubmit={handleSubmit}>
      <label className="answer-label" htmlFor="answer">
        {label}
      </label>
      <div className="answer-row">
        <input
          id="answer"
          className="input"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setError(false);
          }}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
        />
        <button type="submit" className="btn btn-primary">
          Valider
        </button>
      </div>
      {error && (
        <p className="feedback feedback-error" role="alert">
          Accès refusé. Ce n&apos;est pas la bonne réponse.
        </p>
      )}
    </form>
  );
}
