"use client";

import Link from "next/link";
import { LEVELS } from "@/data/game";
import { isLevelComplete, isLevelUnlocked, solvedCount } from "@/lib/progress";
import { useGame } from "./GameProvider";

export function LevelSelect() {
  const { save, loaded } = useGame();

  if (!loaded) return <p className="loading">Connexion au serveur…</p>;

  return (
    <div className="level-grid">
      {LEVELS.map((level, index) => {
        const unlocked = isLevelUnlocked(save, level.id);
        const complete = isLevelComplete(save, level.id);
        const solved = solvedCount(save, level.id);
        const content = (
          <>
            <div className="level-top">
              <span className="level-icon" aria-hidden>
                {unlocked ? level.icon : "🔒"}
              </span>
              <span className="level-progress">{complete ? "✅ Terminé" : `${solved} / 10`}</span>
            </div>
            <h2 className="level-name">
              Niveau {index + 1} · {level.name}
            </h2>
            <p className="level-tagline">{level.tagline}</p>
            <p className="level-description">
              {unlocked ? level.description : `Termine le niveau ${LEVELS[index - 1].name} pour le débloquer.`}
            </p>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${solved * 10}%` }} />
            </div>
          </>
        );

        return unlocked ? (
          <Link key={level.id} href={`/jeu/${level.id}`} className={`level-card level-${level.id}`}>
            {content}
          </Link>
        ) : (
          <div key={level.id} className={`level-card level-${level.id} locked`} aria-disabled>
            {content}
          </div>
        );
      })}
    </div>
  );
}
