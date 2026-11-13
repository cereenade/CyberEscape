"use client";

import Link from "next/link";
import { useEffect } from "react";

/** Affichée si une page plante : le joueur garde la main au lieu d'une page blanche. */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="victory">
      <p className="victory-icon" aria-hidden>
        ⚠️
      </p>
      <h1>Le serveur a planté</h1>
      <p>Une erreur inattendue est survenue. Pas de panique : ta progression est sauvegardée.</p>
      {error.digest && <p className="muted small">Code de l&apos;erreur : {error.digest}</p>}
      <div className="actions">
        <button type="button" className="btn btn-primary" onClick={reset}>
          Réessayer
        </button>
        <Link href="/" className="btn btn-ghost">
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
