"use client";

import { useState } from "react";
import { isCorrectAnswer } from "@/lib/text";

interface Props {
  expected: string;
  label: string;
  placeholder?: string;
  onSolved: () => void;
}

export function AnswerForm({ expected, label, placeholder = "Ta réponse", onSolved }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isCorrectAnswer(value, expected)) {
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
          Accès refusé. Ce n&apos;est pas le bon mot.
        </p>
      )}
    </form>
  );
}
