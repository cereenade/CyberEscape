"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteAccount } from "@/app/actions/account";
import { CancelSubscription } from "@/components/billing/CancelSubscription";
import { LEVELS, PLANS, TOTAL_CARDS, TOTAL_ROOMS, roomCount } from "@/data/meta";
import { LESSONS } from "@/data/lessons";
import { translateAuthError, validatePseudo } from "@/lib/auth";
import { solvedCount } from "@/lib/progress";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { useAuth } from "../AuthProvider";
import { useGame } from "../GameProvider";
import { NewPasswordForm } from "./NewPasswordForm";

const DATE_FORMAT = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export function AccountView() {
  const router = useRouter();
  const { user, profile, loading, refreshProfile, signOut } = useAuth();
  const { save, status } = useGame();

  if (loading) return <p className="loading">Chargement de ton compte…</p>;
  if (!user) {
    return (
      <p>
        Tu n&apos;es pas connecté. <Link href="/connexion?suite=/compte">Se connecter</Link>
      </p>
    );
  }

  const createdAt = profile?.createdAt ?? user.created_at;

  return (
    <div className="account">
      <header className="account-header">
        <div className="avatar" aria-hidden>
          {(profile?.pseudo ?? "?").slice(0, 1).toUpperCase()}
        </div>
        <div>
          <h1 className="page-title">{profile?.pseudo ?? "Mon compte"}</h1>
          <p className="muted">
            {user.email} · membre depuis le {DATE_FORMAT.format(new Date(createdAt))}
          </p>
        </div>
      </header>

      <section className="account-section">
        <h2>Ma progression</h2>
        <div className="stats">
          <Stat value={`${save.solvedRooms.length} / ${TOTAL_ROOMS}`} label="salles ouvertes" />
          <Stat value={`${save.cards.length} / ${TOTAL_CARDS}`} label="cyber-cartes" />
          <Stat value={`${save.lessonsDone.length} / ${LESSONS.length}`} label="leçons validées" />
        </div>
        <ul className="account-levels">
          {LEVELS.map((level) => {
            const total = roomCount(level.id);
            const solved = solvedCount(save, level.id);
            return (
              <li key={level.id}>
                <span>
                  {level.icon} {level.name}
                </span>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${(solved / total) * 100}%` }} />
                </div>
                <span className="muted">
                  {solved}/{total}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="muted small">Ta progression est sauvegardée sur ton compte : retrouve-la sur n&apos;importe quel appareil.</p>
      </section>

      <section className="account-section">
        <h2>Mon offre</h2>
        <SubscriptionInfo premium={status.premium} plan={status.plan} tokensLeft={status.tokensLeft} tokensPerDay={status.tokensPerDay} />
      </section>

      <section className="account-section">
        <h2>Mon pseudo</h2>
        <PseudoForm userId={user.id} current={profile?.pseudo ?? ""} onSaved={refreshProfile} />
      </section>

      <section className="account-section">
        <h2>Mot de passe</h2>
        <NewPasswordForm submitLabel="Changer mon mot de passe" />
      </section>

      <section className="account-section">
        <h2>Session</h2>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={async () => {
            await signOut();
            router.push("/");
            router.refresh();
          }}
        >
          Se déconnecter
        </button>
      </section>

      <section className="account-section danger-zone">
        <h2>Zone de danger</h2>
        <DeleteAccount
          onDeleted={async () => {
            await signOut();
            router.push("/?compte=supprime");
            router.refresh();
          }}
        />
      </section>
    </div>
  );
}

function SubscriptionInfo({ premium, plan, tokensLeft, tokensPerDay }: { premium: boolean; plan: string | null; tokensLeft: number; tokensPerDay: number }) {
  if (!premium) {
    return (
      <>
        <p>
          Offre gratuite : il te reste <strong>{tokensLeft}</strong> jeton{tokensLeft > 1 ? "s" : ""} sur {tokensPerDay} aujourd&apos;hui.
        </p>
        <Link href="/abonnement" className="btn btn-primary btn-small">
          Passer à l&apos;illimité
        </Link>
      </>
    );
  }

  const name = plan === "admin" ? "Accès administrateur" : plan === "offert" ? "Accès offert" : PLANS[plan as keyof typeof PLANS]?.name ?? "Illimité";
  return (
    <>
      <p>
        ∞ Salles illimitées · <strong>{name}</strong>
      </p>
      {plan === "admin" && (
        <Link href="/admin" className="btn btn-primary btn-small">
          Ouvrir l&apos;administration
        </Link>
      )}
      {plan !== "offert" && plan !== "admin" && (
        <p>
          <Link href="/abonnement">Gérer mon abonnement</Link>
        </p>
      )}
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function PseudoForm({ userId, current, onSaved }: { userId: string; current: string; onSaved: () => Promise<void> }) {
  const [pseudo, setPseudo] = useState(current);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => setPseudo(current), [current]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    const clean = pseudo.trim();
    const invalid = validatePseudo(clean);
    if (invalid) return setMessage({ ok: false, text: invalid });

    setPending(true);
    const { error } = await supabase.from("profiles").update({ pseudo: clean }).eq("id", userId);
    setPending(false);

    if (error) {
      // 23505 = valeur déjà utilisée (index unique sur le pseudo).
      const text = error.code === "23505" ? "Ce pseudo est déjà pris." : translateAuthError(error.message);
      return setMessage({ ok: false, text });
    }
    await onSaved();
    setMessage({ ok: true, text: "Pseudo mis à jour." });
  }

  return (
    <form className="auth-form inline-form" onSubmit={handleSubmit} noValidate>
      <div className="answer-row">
        <input
          className="input"
          value={pseudo}
          onChange={(event) => {
            setPseudo(event.target.value);
            setMessage(null);
          }}
          maxLength={20}
          aria-label="Pseudo"
        />
        <button type="submit" className="btn btn-primary" disabled={pending || pseudo.trim() === current}>
          Enregistrer
        </button>
      </div>
      {message && <p className={message.ok ? "feedback feedback-success" : "feedback feedback-error"}>{message.text}</p>}
    </form>
  );
}

function DeleteAccount({ onDeleted }: { onDeleted: () => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    setPending(true);
    setError(null);
    try {
      const result = await deleteAccount(confirmText);
      if (!result.ok) return setError(result.error ?? "La suppression a échoué.");
      await onDeleted();
    } catch {
      setError("Connexion perdue. Réessaie.");
    } finally {
      setPending(false);
    }
  }

  if (!open) {
    return (
      <>
        <p className="muted">Supprime définitivement ton compte, ton pseudo et ta progression. Un abonnement en cours est résilié immédiatement.</p>
        <button type="button" className="btn btn-danger" onClick={() => setOpen(true)}>
          Supprimer mon compte
        </button>
      </>
    );
  }

  return (
    <div className="auth-form">
      <p>
        Cette action est <strong>définitive</strong>. Tape <code>SUPPRIMER</code> pour confirmer.
      </p>
      <input
        className="input"
        value={confirmText}
        onChange={(event) => setConfirmText(event.target.value)}
        aria-label="Confirmation de suppression"
        autoComplete="off"
      />
      {error && <p className="feedback feedback-error">{error}</p>}
      <div className="actions">
        <button type="button" className="btn btn-danger" disabled={confirmText !== "SUPPRIMER" || pending} onClick={handleDelete}>
          {pending ? "Suppression…" : "Supprimer définitivement"}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>
          Annuler
        </button>
      </div>
    </div>
  );
}
