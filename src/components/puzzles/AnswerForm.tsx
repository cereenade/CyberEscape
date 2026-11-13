"use client";

import { useState } from "react";
import type { Submission } from "@/lib/types";

interface Props {
  label: string;
  placeholder?: string;
  pending: boolean;
  onSubmit: (submission: Submission) => void;
  onChange: () => void;
}

export function AnswerForm({ label, placeholder = "Ta réponse", pending, onSubmit, onChange }: Props) {
  const [value, setValue] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (value.trim()) onSubmit({ kind: "answer", value: value.slice(0, 300) });
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
          maxLength={300}
          onChange={(event) => {
            setValue(event.target.value);
            onChange();
          }}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
        />
        <button type="submit" className="btn btn-primary" disabled={pending || !value.trim()}>
          Valider
        </button>
      </div>
    </form>
  );
}
