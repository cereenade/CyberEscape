"use client";

import { useState } from "react";

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: "current-password" | "new-password";
  hint?: string;
}

/** Champ mot de passe avec bouton « Afficher ». */
export function PasswordField({ id, label, value, onChange, autoComplete, hint }: Props) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="password-row">
        <input
          id={id}
          className="input"
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          required
        />
        <button
          type="button"
          className="btn btn-ghost btn-small"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        >
          {visible ? "Masquer" : "Afficher"}
        </button>
      </div>
      {hint && <p className="field-hint">{hint}</p>}
    </div>
  );
}
