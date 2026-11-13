"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { translateAuthError, validateEmail } from "@/lib/auth";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { PasswordField } from "./PasswordField";

interface Props {
  /** Page où revenir après la connexion. */
  next: string;
  notice?: string;
}

export function LoginForm({ next, notice }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getBrowserSupabase();
    if (!supabase) return;

    const invalid = validateEmail(email.trim());
    if (invalid) return setError(invalid);

    setPending(true);
    setError(null);
    const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setPending(false);

    if (authError) return setError(translateAuthError(authError.message));
    router.push(next);
    router.refresh();
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {notice && <p className="feedback feedback-success">{notice}</p>}

      <div className="field">
        <label htmlFor="email">Adresse e-mail</label>
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

      <PasswordField id="password" label="Mot de passe" value={password} onChange={setPassword} autoComplete="current-password" />

      <p className="auth-inline-link">
        <Link href="/mot-de-passe-oublie">Mot de passe oublié ?</Link>
      </p>

      {error && (
        <p className="feedback feedback-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-primary btn-block" disabled={pending}>
        {pending ? "Connexion…" : "Se connecter"}
      </button>

      <p className="auth-switch">
        Pas encore de compte ? <Link href="/inscription">Créer un compte</Link>
      </p>
    </form>
  );
}
