"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { escapeLike, translateAuthError, validateEmail, validatePassword, validatePseudo } from "@/lib/auth";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { PasswordField } from "./PasswordField";

export function SignupForm() {
  const router = useRouter();
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getBrowserSupabase();
    if (!supabase) return;

    const cleanPseudo = pseudo.trim();
    const cleanEmail = email.trim();
    const invalid =
      validatePseudo(cleanPseudo) ??
      validateEmail(cleanEmail) ??
      validatePassword(password, confirm) ??
      (accepted ? null : "Tu dois accepter les conditions d'utilisation.");
    if (invalid) return setError(invalid);

    setPending(true);
    setError(null);

    // Pseudo déjà pris ? (la base le vérifie aussi, mais on prévient plus clairement)
    const { data: taken } = await supabase
      .from("profiles")
      .select("id")
      .ilike("pseudo", escapeLike(cleanPseudo))
      .limit(1);
    if (taken && taken.length > 0) {
      setPending(false);
      return setError("Ce pseudo est déjà pris. Choisis-en un autre.");
    }

    const { data, error: authError } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: { pseudo: cleanPseudo },
        emailRedirectTo: `${window.location.origin}/auth/callback?suite=/compte`,
      },
    });
    setPending(false);

    if (authError) return setError(translateAuthError(authError.message));
    // Supabase ne renvoie pas d'erreur si l'e-mail existe déjà : il renvoie un utilisateur sans identité.
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      return setError("Un compte existe déjà avec cet e-mail. Connecte-toi ou réinitialise ton mot de passe.");
    }
    if (data.session) {
      // Confirmation par mail désactivée : le joueur est directement connecté.
      router.push("/compte");
      router.refresh();
      return;
    }
    setSentTo(cleanEmail);
  }

  if (sentTo) {
    return (
      <div className="auth-form">
        <p className="feedback feedback-success">
          📬 Presque fini ! Un lien de confirmation a été envoyé à <strong>{sentTo}</strong>. Clique dessus pour activer
          ton compte.
        </p>
        <p className="muted small">Rien reçu ? Regarde dans tes spams, ou réessaie dans quelques minutes.</p>
        <Link href="/connexion" className="btn btn-ghost btn-block">
          Aller à la connexion
        </Link>
      </div>
    );
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="pseudo">Pseudo</label>
        <input
          id="pseudo"
          className="input"
          value={pseudo}
          onChange={(event) => setPseudo(event.target.value)}
          autoComplete="nickname"
          maxLength={20}
          required
        />
        <p className="field-hint">3 à 20 caractères. Il sera visible par les autres joueurs.</p>
      </div>

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

      <PasswordField
        id="password"
        label="Mot de passe"
        value={password}
        onChange={setPassword}
        autoComplete="new-password"
        hint="8 caractères minimum. Astuce : une phrase de passe de 4 mots, c'est long et facile à retenir."
      />
      <PasswordField id="confirm" label="Confirme le mot de passe" value={confirm} onChange={setConfirm} autoComplete="new-password" />

      <label className="checkbox-row">
        <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} />
        <span>
          J&apos;accepte les <Link href="/conditions">conditions d&apos;utilisation</Link> et la{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </span>
      </label>

      {error && (
        <p className="feedback feedback-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-primary btn-block" disabled={pending}>
        {pending ? "Création du compte…" : "Créer mon compte"}
      </button>

      <p className="auth-switch">
        Déjà un compte ? <Link href="/connexion">Se connecter</Link>
      </p>
    </form>
  );
}
