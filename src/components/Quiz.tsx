"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/types";
import { useGame } from "./GameProvider";

interface Props {
  slug: string;
  questions: QuizQuestion[];
}

export function Quiz({ slug, questions }: Props) {
  const { save, completeLesson } = useGame();
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [checked, setChecked] = useState(false);

  const score = answers.filter((answer, i) => answer === questions[i].correct).length;
  const allAnswered = answers.every((answer) => answer !== null);
  const alreadyDone = save.lessonsDone.includes(slug);

  function choose(questionIndex: number, optionIndex: number) {
    if (checked) return;
    setAnswers((prev) => prev.map((answer, i) => (i === questionIndex ? optionIndex : answer)));
  }

  function check() {
    setChecked(true);
    if (score === questions.length) completeLesson(slug);
  }

  function retry() {
    setAnswers(questions.map(() => null));
    setChecked(false);
  }

  return (
    <section className="quiz" aria-labelledby="quiz-title">
      <h2 id="quiz-title">🧠 Mini-quiz</h2>
      {alreadyDone && !checked && <p className="muted">Tu as déjà réussi ce quiz. Tu peux le refaire quand tu veux.</p>}

      <ol className="quiz-questions">
        {questions.map((question, qi) => (
          <li key={question.question} className="quiz-question">
            <p className="quiz-prompt">{question.question}</p>
            <div className="quiz-options">
              {question.options.map((option, oi) => {
                const selected = answers[qi] === oi;
                let className = "choice";
                if (selected) className += " choice-selected";
                if (checked && oi === question.correct) className += " choice-right";
                if (checked && selected && oi !== question.correct) className += " choice-wrong";
                return (
                  <button
                    key={option}
                    type="button"
                    className={className}
                    onClick={() => choose(qi, oi)}
                    aria-pressed={selected}
                    disabled={checked}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {checked && <p className="quiz-explanation">{question.explanation}</p>}
          </li>
        ))}
      </ol>

      {!checked ? (
        <button type="button" className="btn btn-primary" onClick={check} disabled={!allAnswered}>
          Vérifier mes réponses
        </button>
      ) : (
        <div className="quiz-result">
          <p className={score === questions.length ? "feedback feedback-success" : "feedback feedback-error"}>
            {score === questions.length
              ? `Parfait : ${score}/${questions.length} ! Leçon validée ✅`
              : `${score}/${questions.length}. Relis la leçon et retente ta chance.`}
          </p>
          {score !== questions.length && (
            <button type="button" className="btn btn-ghost" onClick={retry}>
              Recommencer le quiz
            </button>
          )}
        </div>
      )}
    </section>
  );
}
