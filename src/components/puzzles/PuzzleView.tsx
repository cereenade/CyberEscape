"use client";

import Link from "next/link";
import { useState } from "react";
import type { PublicPuzzle, Submission, SubmitResult } from "@/lib/types";
import { AnswerForm } from "./AnswerForm";
import { ChoicePuzzle } from "./ChoicePuzzle";
import { MultiPuzzle } from "./MultiPuzzle";
import { OrderPuzzle } from "./OrderPuzzle";
import { PhishingPuzzle } from "./PhishingPuzzle";
import { Workshop } from "./Workshop";

interface Props {
  puzzle: PublicPuzzle;
  /** Envoie la réponse au serveur, qui la vérifie. */
  onSubmit: (submission: Submission) => Promise<SubmitResult>;
  onSolved: (result: SubmitResult) => void;
}

const WRONG_TEXT: Record<PublicPuzzle["kind"], string> = {
  answer: "Accès refusé. Ce n'est pas la bonne réponse.",
  choice: "Mauvais choix.",
  multi: "Ce n'est pas la bonne sélection.",
  phishing: "Raté, ce n'est pas ce mail.",
  order: "Ce n'est pas le bon ordre. Recommence et réfléchis à ce qui doit arriver en premier.",
};

export function PuzzleView({ puzzle, onSubmit, onSolved }: Props) {
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<SubmitResult | null>(null);

  async function submit(submission: Submission) {
    if (pending) return;
    setPending(true);
    setFeedback(null);
    try {
      const result = await onSubmit(submission);
      if (result.correct) onSolved(result);
      else setFeedback(result);
    } catch {
      setFeedback({ correct: false, message: "Connexion perdue. Vérifie ta connexion et réessaie." });
    } finally {
      setPending(false);
    }
  }

  const clear = () => setFeedback(null);

  return (
    <div className="puzzle">
      {puzzle.intro && <p className="puzzle-intro">{puzzle.intro}</p>}

      {puzzle.content && (
        <figure className="document">
          {puzzle.contentLabel && <figcaption className="document-label">{puzzle.contentLabel}</figcaption>}
          <pre className="code-block">
            <code>{puzzle.content}</code>
          </pre>
        </figure>
      )}

      {puzzle.tools && puzzle.tools.length > 0 && <Workshop tools={puzzle.tools} initialInput={puzzle.workshopInput} />}

      {puzzle.kind === "answer" && (
        <AnswerForm label={puzzle.question} placeholder={puzzle.placeholder} pending={pending} onSubmit={submit} onChange={clear} />
      )}
      {puzzle.kind === "choice" && (
        <ChoicePuzzle question={puzzle.question} options={puzzle.options} pending={pending} onSubmit={submit} />
      )}
      {puzzle.kind === "phishing" && <PhishingPuzzle emails={puzzle.emails} pending={pending} onSubmit={submit} />}
      {puzzle.kind === "multi" && (
        <MultiPuzzle question={puzzle.question} options={puzzle.options} pending={pending} onSubmit={submit} onChange={clear} />
      )}
      {puzzle.kind === "order" && (
        <OrderPuzzle question={puzzle.question} items={puzzle.items} pending={pending} onSubmit={submit} onChange={clear} />
      )}

      {pending && <p className="muted small">Vérification…</p>}

      {feedback && (
        <div className="feedback feedback-error" role="alert">
          {feedback.message ? (
            <p>{feedback.message}</p>
          ) : feedback.explanations && feedback.explanations.length > 0 ? (
            feedback.explanations.map((text) => <p key={text}>✗ {text}</p>)
          ) : (
            <p>{WRONG_TEXT[puzzle.kind]}</p>
          )}
          {!!feedback.missing && feedback.missing > 0 && (
            <p>
              Il manque encore {feedback.missing} bonne{feedback.missing > 1 ? "s" : ""} réponse{feedback.missing > 1 ? "s" : ""}.
            </p>
          )}
          {feedback.noTokens && (
            <p>
              <Link href="/abonnement" className="btn btn-primary btn-small">
                Voir l&apos;abonnement illimité
              </Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
