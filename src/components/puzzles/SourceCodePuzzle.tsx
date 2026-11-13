"use client";

import { AnswerForm } from "./AnswerForm";

interface Props {
  code: string;
  answer: string;
  onSolved: () => void;
}

export function SourceCodePuzzle({ code, answer, onSolved }: Props) {
  return (
    <div className="puzzle">
      <p className="puzzle-intro">
        Voici le code source de la page de connexion récupérée par le pirate. Trouve le mot de passe.
      </p>
      <pre className="code-block" aria-label="Code source de la page">
        <code>{code}</code>
      </pre>
      {/* Petit bonus pour les curieux qui ouvrent les outils de développement (F12). */}
      <div
        hidden
        dangerouslySetInnerHTML={{
          __html: "<!-- Bien joué, tu inspectes le vrai code de CyberEscape ! Bon réflexe. -->",
        }}
      />
      <AnswerForm expected={answer} label="Mot de passe administrateur" onSolved={onSolved} />
    </div>
  );
}
