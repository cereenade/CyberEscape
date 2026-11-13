"use client";

import type { Puzzle } from "@/lib/types";
import { AnswerForm } from "./AnswerForm";
import { ChoicePuzzle } from "./ChoicePuzzle";
import { PhishingPuzzle } from "./PhishingPuzzle";
import { Workshop } from "./Workshop";

interface Props {
  puzzle: Puzzle;
  onSolved: () => void;
}

export function PuzzleView({ puzzle, onSolved }: Props) {
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

      {puzzle.tools && puzzle.tools.length > 0 && (
        <Workshop tools={puzzle.tools} initialInput={puzzle.workshopInput} />
      )}

      {puzzle.kind === "answer" && (
        <AnswerForm
          answers={puzzle.answers}
          label={puzzle.question}
          placeholder={puzzle.placeholder}
          strict={puzzle.strict}
          onSolved={onSolved}
        />
      )}
      {puzzle.kind === "choice" && (
        <ChoicePuzzle question={puzzle.question} options={puzzle.options} onSolved={onSolved} />
      )}
      {puzzle.kind === "phishing" && <PhishingPuzzle emails={puzzle.emails} onSolved={onSolved} />}
    </div>
  );
}
