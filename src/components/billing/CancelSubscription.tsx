"use client";

import { useState } from "react";
import { cancelSubscription } from "@/app/actions/billing";

/** Bouton de résiliation en deux temps (demande de confirmation sans fenêtre bloquante). */
export function CancelSubscription({ onDone }: { onDone?: () => void }) {
  const [step, setStep] = useState<"idle" | "confirm" | "pending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function confirm() {
    setStep("pending");
    setError(null);
    const result = await cancelSubscription().catch(() => ({ ok: false, error: "Connexion perdue. Réessaie." }));
    if (result.ok) {
      setStep("done");
      onDone?.();
    } else {
      setError(result.error ?? "La résiliation a échoué.");
      setStep("confirm");
    }
  }

  if (step === "done") return <p className="feedback feedback-success">Abonnement résilié : aucun nouveau prélèvement. Ton accès continue jusqu&apos;à la fin du mois payé.</p>;

  return (
    <div className="cancel-subscription">
      {step === "idle" ? (
        <button type="button" className="btn btn-ghost btn-small" onClick={() => setStep("confirm")}>
          Résilier mon abonnement
        </button>
      ) : (
        <div className="actions">
          <span className="muted small">Confirmer la résiliation ? Tu gardes l&apos;accès jusqu&apos;à la fin du mois payé.</span>
          <button type="button" className="btn btn-danger btn-small" disabled={step === "pending"} onClick={confirm}>
            {step === "pending" ? "Résiliation…" : "Oui, résilier"}
          </button>
          <button type="button" className="btn btn-ghost btn-small" disabled={step === "pending"} onClick={() => setStep("idle")}>
            Annuler
          </button>
        </div>
      )}
      {error && <p className="feedback feedback-error">{error}</p>}
    </div>
  );
}
