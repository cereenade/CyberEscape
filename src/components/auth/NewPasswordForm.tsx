"use client";

import { useState } from "react";
import { translateAuthError, validatePassword } from "@/lib/auth";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { PasswordField } from "./PasswordField";

interface Props {
  submitLabel: string;
  onDone?: () => void;
}

/** Choisir un nouveau mot de passe (après « mot de passe oublié » ou depuis Mon compte). */
export function NewPasswordForm({ submitLabel, onDone }: Props) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getBrowserSupabase();
    if (!supabase) return;

    const invalid = validatePassword(password, confirm);
    if (invalid) return setError(invalid);

    setPending(true);
    setError(null);
    setSuccess(false);
    const { error: authError } = await supabase.auth.updateUser({ password });
    setPending(false);

    if (authError) return setError(translateAuthError(authError.message));
    setPassword("");
    setConfirm("");
    setSuccess(true);
    onDone?.();
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <PasswordField
        id="new-password"
        label="Nouveau mot de passe"
        value={password}
        onChange={setPassword}
        autoComplete="new-password"
        hint="8 caractères minimum."
      />
      <PasswordField id="new-confirm" label="Confirme le nouveau mot de passe" value={confirm} onChange={setConfirm} autoComplete="new-password" />

      {error && (
        <p className="feedback feedback-error" role="alert">
          {error}
        </p>
      )}
      {success && <p className="feedback feedback-success">Mot de passe modifié ✅</p>}

      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Enregistrement…" : submitLabel}
      </button>
    </form>
  );
}
