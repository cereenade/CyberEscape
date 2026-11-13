"use client";

import Link from "next/link";
import { useState } from "react";
import { toBase64 } from "@/lib/crypto";
import { AnswerForm } from "../puzzles/AnswerForm";
import { Workshop } from "../puzzles/Workshop";

const SECRET = toBase64("SESAME");

/** Une énigme d'essai sur l'accueil, pour découvrir le jeu en 30 secondes. */
export function MiniPuzzle() {
  const [solved, setSolved] = useState(false);
  const [hint, setHint] = useState(false);

  return (
    <section className="home-section mini-puzzle" aria-labelledby="mini-puzzle-title">
      <p className="section-kicker">&gt; essai gratuit</p>
      <h2 id="mini-puzzle-title">Essaie une énigme maintenant</h2>
      <p className="muted">
        Le pirate a caché le mot de passe de la porte dans un post-it. Saurais-tu le décoder ? Pas besoin de compte.
      </p>

      <div className="puzzle">
        <p className="puzzle-intro">Sur le post-it :</p>
        <p className="cipher-text">{SECRET}</p>

        {!solved && (
          <>
            <Workshop tools={["base64", "hex", "rot13"]} initialInput={SECRET} />
            <AnswerForm answers={["SESAME"]} label="Mot de passe de la porte" onSolved={() => setSolved(true)} />
            <div className="hint">
              {hint ? (
                <p>
                  <strong>🃏 Indice :</strong> un mélange de majuscules, de minuscules et de chiffres, c&apos;est souvent du Base64.
                  Ajoute l&apos;étape « Base64 → texte » dans l&apos;atelier.
                </p>
              ) : (
                <button type="button" className="btn btn-ghost btn-small" onClick={() => setHint(true)}>
                  Besoin d&apos;un indice ?
                </button>
              )}
            </div>
          </>
        )}

        {solved && (
          <div className="success">
            <p className="feedback feedback-success">
              ✅ Bravo, la porte s&apos;ouvre ! Tu viens de décoder du <strong>Base64</strong> : un encodage, pas un
              chiffrement, que n&apos;importe qui peut défaire. Il en reste 200 comme ça… en plus difficile.
            </p>
            <Link href="/jeu" className="btn btn-primary">
              Continuer l&apos;aventure →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
