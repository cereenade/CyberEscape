"use client";

import { useState } from "react";
import { OPS, applyRecipe, type Op, type Step } from "@/lib/crypto";

interface Props {
  tools: Op[];
  initialInput?: string;
}

/**
 * Atelier de décodage : on part d'un texte et on empile des opérations
 * (Base64, César, XOR…) jusqu'à obtenir un message lisible.
 */
export function Workshop({ tools, initialInput = "" }: Props) {
  const [input, setInput] = useState(initialInput);
  const [steps, setSteps] = useState<Step[]>([]);
  const result = applyRecipe(input, steps);

  function addStep(op: Op) {
    const info = OPS[op];
    setSteps((prev) => [...prev, { op, param: info.param === "shift" ? "1" : info.param === "key" ? "" : undefined }]);
  }

  function updateParam(index: number, param: string) {
    setSteps((prev) => prev.map((step, i) => (i === index ? { ...step, param } : step)));
  }

  function removeStep(index: number) {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="tool workshop">
      <p className="tool-title">Atelier de décodage</p>

      <label className="tool-label" htmlFor="workshop-input">
        Texte de départ
      </label>
      <textarea
        id="workshop-input"
        className="input textarea"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        rows={2}
        spellCheck={false}
        placeholder="Colle ici le texte à décoder"
      />
      {initialInput && input !== initialInput && (
        <button type="button" className="btn btn-ghost btn-small" onClick={() => setInput(initialInput)}>
          Remettre le texte d&apos;origine
        </button>
      )}

      <p className="tool-label">Ajouter une étape :</p>
      <div className="tool-buttons">
        {tools.map((op) => (
          <button key={op} type="button" className="btn btn-ghost btn-small" title={OPS[op].description} onClick={() => addStep(op)}>
            + {OPS[op].label}
          </button>
        ))}
      </div>

      {steps.length > 0 && (
        <ol className="recipe">
          {steps.map((step, index) => {
            const info = OPS[step.op];
            const failed = result.error?.step === index + 1;
            return (
              <li key={index} className={failed ? "recipe-step failed" : "recipe-step"}>
                <span>{info.label}</span>
                {info.param === "shift" && (
                  <label className="recipe-param">
                    recule de
                    <input
                      type="number"
                      min={0}
                      max={25}
                      className="input input-small"
                      value={step.param ?? ""}
                      onChange={(event) => updateParam(index, event.target.value)}
                      aria-label="Décalage"
                    />
                  </label>
                )}
                {info.param === "key" && (
                  <label className="recipe-param">
                    clé
                    <input
                      type="text"
                      className="input input-small"
                      value={step.param ?? ""}
                      onChange={(event) => updateParam(index, event.target.value)}
                      aria-label="Clé"
                      spellCheck={false}
                    />
                  </label>
                )}
                <button type="button" className="recipe-remove" onClick={() => removeStep(index)} aria-label={`Retirer l'étape ${index + 1}`}>
                  ✕
                </button>
              </li>
            );
          })}
        </ol>
      )}

      <p className="tool-label">Résultat :</p>
      <p className="cipher-text cipher-output" aria-live="polite">
        {result.output || "…"}
      </p>
      {result.error && (
        <p className="feedback feedback-error" role="alert">
          Étape {result.error.step} : {result.error.message}
        </p>
      )}
    </div>
  );
}
