"use client";

import type { Puzzle } from "@/lib/types";
import { Base64Puzzle } from "./Base64Puzzle";
import { ChoicePuzzle } from "./ChoicePuzzle";
import { CipherPuzzle } from "./CipherPuzzle";
import { PhishingPuzzle } from "./PhishingPuzzle";
import { SourceCodePuzzle } from "./SourceCodePuzzle";

interface Props {
  puzzle: Puzzle;
  onSolved: () => void;
}

export function PuzzleRenderer({ puzzle, onSolved }: Props) {
  switch (puzzle.kind) {
    case "source":
      return <SourceCodePuzzle code={puzzle.code} answer={puzzle.answer} onSolved={onSolved} />;
    case "cipher":
      return <CipherPuzzle ciphertext={puzzle.ciphertext} answer={puzzle.answer} onSolved={onSolved} />;
    case "phishing":
      return <PhishingPuzzle emails={puzzle.emails} onSolved={onSolved} />;
    case "base64":
      return <Base64Puzzle encoded={puzzle.encoded} answer={puzzle.answer} onSolved={onSolved} />;
    case "choice":
      return <ChoicePuzzle question={puzzle.question} options={puzzle.options} onSolved={onSolved} />;
  }
}
