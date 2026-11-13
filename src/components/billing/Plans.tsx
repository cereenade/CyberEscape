"use client";

import Link from "next/link";
import { useState } from "react";
import { openBillingPortal, startCheckout } from "@/app/actions/billing";
import { requestStudentVerification } from "@/app/actions/student";
import { PLANS, TOKENS_PER_DAY, type PaidPlan } from "@/data/meta";

interface Props {
  loggedIn: boolean;
  premium: boolean;
  currentPlan: "etudiant" | "standard" | "offert" | null;
  hasBilling: boolean;
  cancelAtPeriodEnd: boolean;
  periodEnd: string | null;
  /** Paiement Stripe configuré ? Sinon : « bientôt disponible ». */
  salesOpen: boolean;
  studentCheckOpen: boolean;
  student: { email: string; until: string | null } | null;
}

const DATE = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export function Plans(props: Props) {
  const { loggedIn, premium, currentPlan, salesOpen, student } = props;
  const [waiver, setWaiver] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function go(action: () => Promise<{ url?: string; error?: string }>, key: string) {
    setPending(key);
    setError(null);
    try {
      const result = await action();
      if (result.url) window.location.assign(result.url);
      else setError(result.error ?? "Une erreur est survenue.");
    } catch {
      setError("Connexion perdue. Réessaie.");
    } finally {
      setPending(null);
    }
  }

  function subscribeButton(plan: PaidPlan) {
    if (!salesOpen) return <span className="btn btn-ghost" aria-disabled>Bientôt disponible</span>;
    if (!loggedIn)
      return (
        <Link href="/inscription" className="btn btn-primary">
          Créer un compte
        </Link>
      );
    if (premium) return <span className="btn btn-ghost" aria-disabled>{currentPlan === plan ? "Ton offre actuelle" : "Déjà abonné"}</span>;
    const blocked = plan === "etudiant" && !student;
    return (
      <button
        type="button"
        className="btn btn-primary"
        disabled={!waiver || blocked || pending !== null}
        onClick={() => go(() => startCheckout(plan, waiver), plan)}
      >
        {pending === plan ? "Redirection…" : blocked ? "Vérifie ton e-mail d'école ↓" : `S'abonner · ${PLANS[plan].price}/mois`}
      </button>
    );
  }

  return (
    <>
      {premium && (
        <div className="feedback feedback-success">
          <p>
            Tu profites de l&apos;illimité ({currentPlan === "offert" ? "accès offert" : `offre ${PLANS[currentPlan as PaidPlan]?.name ?? ""}`})
            {props.periodEnd ? ` jusqu'au ${DATE.format(new Date(props.periodEnd))}` : ""}
            {props.cancelAtPeriodEnd ? " — résiliation programmée, aucun nouveau prélèvement." : "."}
          </p>
          {props.hasBilling && salesOpen && (
            <button type="button" className="btn btn-ghost btn-small" disabled={pending !== null} onClick={() => go(openBillingPortal, "portal")}>
              {pending === "portal" ? "Ouverture…" : "Gérer mon abonnement (carte, factures, résiliation)"}
            </button>
          )}
        </div>
      )}

      <div className="plans">
        <article className="plan">
          <h2>Gratuit</h2>
          <p className="plan-price">
            0 € <small>pour toujours</small>
          </p>
          <ul>
            <li>{TOKENS_PER_DAY} salles réussies par jour</li>
            <li>Jetons remis à zéro chaque nuit (non cumulables)</li>
            <li>Tous les cours et quiz</li>
            <li>Progression sauvegardée</li>
          </ul>
          {loggedIn ? (
            <Link href="/jeu" className="btn btn-ghost">
              Jouer
            </Link>
          ) : (
            <Link href="/inscription" className="btn btn-ghost">
              Créer un compte gratuit
            </Link>
          )}
        </article>

        <article className="plan plan-featured">
          <h2>🎓 {PLANS.etudiant.name}</h2>
          <p className="plan-price">
            {PLANS.etudiant.price} <small>/ mois</small>
          </p>
          <ul>
            <li>Salles illimitées</li>
            <li>Sur vérification de ton adresse e-mail d&apos;école</li>
            <li>Sans engagement, résiliable en 1 clic</li>
          </ul>
          {subscribeButton("etudiant")}
        </article>

        <article className="plan">
          <h2>⚡ {PLANS.standard.name}</h2>
          <p className="plan-price">
            {PLANS.standard.price} <small>/ mois</small>
          </p>
          <ul>
            <li>Salles illimitées</li>
            <li>Pour tout le monde</li>
            <li>Sans engagement, résiliable en 1 clic</li>
          </ul>
          {subscribeButton("standard")}
        </article>
      </div>

      {loggedIn && salesOpen && !premium && (
        <label className="consent">
          <input type="checkbox" checked={waiver} onChange={(event) => setWaiver(event.target.checked)} />
          <span>
            J&apos;accepte les <Link href="/cgv">conditions générales de vente</Link> et je demande l&apos;accès immédiat aux salles illimitées : je
            reconnais perdre mon droit de rétractation de 14 jours dès le début de l&apos;accès (art. L221-28 du Code de la consommation).
          </span>
        </label>
      )}
      {error && (
        <p className="feedback feedback-error" role="alert">
          {error}
        </p>
      )}

      {loggedIn && !premium && <StudentBox open={props.studentCheckOpen} student={student} />}
      <p className="muted small plan-note">
        Paiement sécurisé par Stripe : CyberEscape ne voit jamais ton numéro de carte. <Link href="/cgv">CGV</Link>
      </p>
    </>
  );
}

function StudentBox({ open, student }: { open: boolean; student: Props["student"] }) {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  if (student) {
    return (
      <section className="account-section">
        <h2>🎓 Statut étudiant</h2>
        <p className="feedback feedback-success">
          Vérifié avec {student.email}
          {student.until ? ` (valable jusqu'au ${DATE.format(new Date(student.until))})` : ""}.
        </p>
      </section>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage(null);
    try {
      const result = await requestStudentVerification(email);
      setMessage({ ok: result.ok, text: result.message });
    } catch {
      setMessage({ ok: false, text: "Connexion perdue. Réessaie." });
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="account-section">
      <h2>🎓 Prouver que tu es étudiant(e)</h2>
      {open ? (
        <form className="auth-form inline-form" onSubmit={handleSubmit}>
          <p className="muted">Entre l&apos;adresse e-mail fournie par ton école ou ton université : on t&apos;y envoie un lien de confirmation.</p>
          <div className="answer-row">
            <input
              className="input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="prenom.nom@etu.univ-exemple.fr"
              maxLength={254}
              autoComplete="email"
              aria-label="Adresse e-mail de l'école"
              required
            />
            <button type="submit" className="btn btn-primary" disabled={pending || !email.trim()}>
              {pending ? "Envoi…" : "Recevoir le lien"}
            </button>
          </div>
          {message && <p className={message.ok ? "feedback feedback-success" : "feedback feedback-error"}>{message.text}</p>}
        </form>
      ) : (
        <p className="muted">La vérification par e-mail d&apos;école arrive très bientôt.</p>
      )}
    </section>
  );
}
