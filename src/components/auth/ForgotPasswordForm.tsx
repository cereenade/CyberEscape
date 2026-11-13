"use client";

import Link from "next/link";
import { useState } from "react";
import { translateAuthError, validateEmail } from "@/lib/auth";
import { getBrowserSupabase } from "@/lib/supabase/client";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getBrowserSupabase();
    if (!supabase) return;

    const invalid = validateEmail(email.trim());
    if (invalid) return setError(invalid);

    setPending(true);
    setError(null);
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/callback?suite=/reinitialiser-mot-de-passe`,
    });
    setPending(false);

    // Par sécurité, on n'indique pas si l'adresse existe : seules les vraies erreurs techniques s'affichent.
    if (authError && translateAuthError(authError.message).startsWith("Trop de tentatives")) {
      return setError(translateAuthError(authError.message));
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="auth-form">
        <p className="feedback feedback-success">
          Si un compte existe avec cette adresse, un lien pour choisir un nouveau mot de passe vient d&apos;être envoyé.
        </p>
        <Link href="/connexion" className="btn btn-ghost btn-block">
          Retour à la connexion
        </Link>
      </div>
    );
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="email">Adresse e-mail du compte</label>
        <input
          id="email"
          className="input"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
      </div>

      {error && (
        <p className="feedback feedback-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-primary btn-block" disabled={pending}>
        {pending ? "Envoi…" : "Envoyer le lien"}
      </button>

      <p className="auth-switch">
        <Link href="/connexion">← Retour à la connexion</Link>
      </p>
    </form>
  );
}
