"use client";

import Link from "next/link";
import { CARDS } from "@/data/cards";
import { ROOMS } from "@/data/rooms";
import { useGame } from "./GameProvider";
import { ProgressBar } from "./ProgressBar";
import { RoomView } from "./RoomView";

export function Game() {
  const { save, loaded, isFinished, resetGame } = useGame();

  if (!loaded) {
    return <p className="loading">Connexion au serveur…</p>;
  }

  if (isFinished) {
    return (
      <section className="victory">
        <p className="victory-icon" aria-hidden>
          🏆
        </p>
        <h1>Tu t&apos;es échappé du serveur !</h1>
        <p>
          Le pirate est éjecté et tu as collecté {save.cards.length} cyber-carte
          {save.cards.length > 1 ? "s" : ""} sur {CARDS.length}. Tu en sais maintenant beaucoup plus sur la
          cybersécurité.
        </p>
        <div className="actions">
          <Link href="/deck" className="btn btn-primary">
            Revoir mon deck
          </Link>
          <button type="button" className="btn btn-ghost" onClick={resetGame}>
            Rejouer
          </button>
        </div>
      </section>
    );
  }

  const room = ROOMS[save.currentRoom];

  return (
    <>
      <ProgressBar current={save.currentRoom} total={ROOMS.length} />
      {/* La clé force un nouvel état local à chaque changement de salle. */}
      <RoomView key={room.id} room={room} />
    </>
  );
}
