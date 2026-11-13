"use client";

import Link from "next/link";
import { useState } from "react";
import { LEVELS, getLevel, getLevelRooms } from "@/data/game";
import { currentRoomIndex } from "@/lib/progress";
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
            ? `Les 10 salles sont ouvertes et 10 nouvelles cyber-cartes ont rejoint ton deck. Prêt pour le niveau ${next.name} ?`
            : "Le pirate est éjecté et le serveur est libre. Bravo, tu as battu le niveau le plus dur du jeu !"}
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
