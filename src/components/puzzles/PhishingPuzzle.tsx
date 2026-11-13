"use client";

import { useState } from "react";
import type { Email } from "@/lib/types";

interface Props {
  emails: Email[];
  onSolved: () => void;
}

export function PhishingPuzzle({ emails, onSolved }: Props) {
  const [revealedLinks, setRevealedLinks] = useState<string[]>([]);
  const [wrongPick, setWrongPick] = useState<Email | null>(null);

  function revealLink(id: string) {
    setRevealedLinks((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  function report(email: Email) {
    if (email.isPhishing) {
      setWrongPick(null);
      onSolved();
    } else {
      setWrongPick(email);
    }
  }

  return (
    <div className="puzzle-body">
      <p className="puzzle-intro">Lis chaque mail attentivement, puis signale celui qui est un piège.</p>

      <div className="inbox">
        {emails.map((email) => (
          <article key={email.id} className="email">
            <header className="email-header">
              <p className="email-from">
                <strong>{email.fromName}</strong> <span className="muted">&lt;{email.fromAddress}&gt;</span>
              </p>
              <p className="email-subject">{email.subject}</p>
            </header>
            <p className="email-body">{email.body}</p>
            <p className="email-link">
              🔗 <span className="fake-link">{email.linkText}</span>
            </p>
            {revealedLinks.includes(email.id) ? (
              <p className="email-real-link">
                Adresse réelle du lien : <code>{email.linkHref}</code>
              </p>
            ) : (
              <button type="button" className="btn btn-ghost btn-small" onClick={() => revealLink(email.id)}>
                Inspecter le lien
              </button>
            )}
            <button type="button" className="btn btn-danger btn-small" onClick={() => report(email)}>
              Signaler comme phishing
            </button>
          </article>
        ))}
      </div>

      {wrongPick && (
        <p className="feedback feedback-error" role="alert">
          Raté : {wrongPick.explanation}
        </p>
      )}
    </div>
  );
}
