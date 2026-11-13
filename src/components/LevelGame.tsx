"use client";

import Link from "next/link";
import { useState } from "react";
import { LEVELS, getLevel, getLevelRooms } from "@/data/game";
import { currentRoomIndex, isLevelUnlocked } from "@/lib/progress";
import type { LevelId } from "@/lib/types";
import { useGame } from "./GameProvider";
import { ProgressBar } from "./ProgressBar";
import { RoomView } from "./RoomView";

export function LevelGame({ levelId }: { levelId: LevelId }) {
  const { save, loaded, resetLevel } = useGame();
  const level = getLevel(levelId);
  const rooms = getLevelRooms(levelId);
  /** Salle tout juste résolue : on la garde affichée jusqu'au clic sur « Porte suivante ». */
  const [viewedRoomId, setViewedRoomId] = useState<string | null>(null);

  if (!level) return null;
  if (!loaded) return <p className="loading">Connexion au serveur…</p>;

  const levelIndex = LEVELS.findIndex((l) => l.id === levelId);

  if (!isLevelUnlocked(save, levelId)) {
    return (
      <section className="victory">
        <p className="victory-icon" aria-hidden>
          🔒
        </p>
        <h1>Niveau verrouillé</h1>
        <p>Termine d&apos;abord le niveau {LEVELS[levelIndex - 1].name} pour accéder à celui-ci.</p>
        <div className="actions">
          <Link href="/jeu" className="btn btn-primary">
            Choisir un niveau
          </Link>
        </div>
      </section>
    );
  }

  const viewed = rooms.find((room) => room.id === viewedRoomId);
  const index = viewed ? viewed.index : currentRoomIndex(save, levelId);

  if (index >= rooms.length) {
    const next = LEVELS[levelIndex + 1];
    return (
      <section className="victory">
        <p className="victory-icon" aria-hidden>
          {next ? "🏁" : "🏆"}
        </p>
        <h1>{next ? `Niveau ${level.name} terminé !` : "Tu t'es échappé du serveur !"}</h1>
        <p>
          {next
            ? `Les 10 salles sont ouvertes et 10 nouvelles cyber-cartes ont rejoint ton deck. Le niveau ${next.name} est débloqué.`
            : "Les 50 salles sont ouvertes, le pirate est éjecté. Tu as collecté tout le savoir du serveur."}
        </p>
        <div className="actions">
          {next && (
            <Link href={`/jeu/${next.id}`} className="btn btn-primary">
              Niveau suivant : {next.name} →
            </Link>
          )}
          <Link href="/deck" className={next ? "btn btn-ghost" : "btn btn-primary"}>
            Voir mon deck
          </Link>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setViewedRoomId(null);
              resetLevel(levelId);
            }}
          >
            Rejouer ce niveau
          </button>
        </div>
      </section>
    );
  }

  const room = rooms[index];

  return (
    <>
      <p className="level-badge">
        {level.icon} Niveau {level.name}
      </p>
      <ProgressBar current={index} total={rooms.length} />
      {/* La clé force un nouvel état local à chaque changement de salle. */}
      <RoomView
        key={room.id}
        room={room}
        onSolved={() => setViewedRoomId(room.id)}
        onNext={() => setViewedRoomId(null)}
      />
    </>
  );
}
