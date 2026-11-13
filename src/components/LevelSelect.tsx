"use client";

import Link from "next/link";
import { LEVELS, getLevelRooms } from "@/data/game";
import { isLevelComplete, solvedCount } from "@/lib/progress";
import { useGame } from "./GameProvider";

export function LevelSelect() {
  const { save, loaded } = useGame();

  if (!loaded) return <p className="loading">Connexion au serveur…</p>;

  return (
    <div className="level-grid">
      {LEVELS.map((level, index) => {
        const complete = isLevelComplete(save, level.id);
        const solved = solvedCount(save, level.id);
        const total = getLevelRooms(level.id).length;
        return (
          <Link key={level.id} href={`/jeu/${level.id}`} className={`level-card level-${level.id}`}>
            <div className="level-top">
              <span className="level-icon" aria-hidden>
                {level.icon}
              </span>
              <span className="level-progress">{complete ? "✅ Terminé" : `${solved} / ${total}`}</span>
            </div>
            <h2 className="level-name">
              Niveau {index + 1} · {level.name}
            </h2>
            <p className="level-tagline">{level.tagline}</p>
            <p className="level-description">{level.description}</p>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${(solved / total) * 100}%` }} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
