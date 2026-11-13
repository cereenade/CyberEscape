"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../AuthProvider";
import { NewPasswordForm } from "./NewPasswordForm";

/** Page atteinte via le lien « mot de passe oublié » : le lien a ouvert une session temporaire. */
export function ResetPassword() {
  const { user, loading } = useAuth();
  const [done, setDone] = useState(false);

  if (loading) return <p className="loading">Vérification du lien…</p>;
  if (!user) {
    return (
      <p className="feedback feedback-error">
        Ce lien a expiré ou a déjà été utilisé. <Link href="/mot-de-passe-oublie">Demander un nouveau lien</Link>
      </p>
    );
  }

  return (
    <>
      <NewPasswordForm submitLabel="Enregistrer le nouveau mot de passe" onDone={() => setDone(true)} />
      {done && (
        <Link href="/compte" className="btn btn-ghost btn-block">
          Aller à mon compte →
        </Link>
      )}
    </>
  );
}
