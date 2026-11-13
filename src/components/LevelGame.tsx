"use client";

import Link from "next/link";
import { useState } from "react";
import { LEVELS, getLevel } from "@/data/meta";
import { currentRoomIndex } from "@/lib/progress";
import type { LevelId, PublicRoom } from "@/lib/types";
import { useAuth } from "./AuthProvider";
import { useGame } from "./GameProvider";
import { ProgressBar } from "./ProgressBar";
import { RoomView } from "./RoomView";
import { TokenBadge } from "./TokenBadge";

interface Props {
  levelId: LevelId;
  /** Salles du niveau, sans les réponses (vérifiées sur le serveur). */
  rooms: PublicRoom[];
}

export function LevelGame({ levelId, rooms }: Props) {
  const { save, status, loaded } = useGame();
  const { enabled } = useAuth();
  const level = getLevel(levelId);
  /** Salle tout juste résolue : on la garde affichée jusqu'au clic sur « Porte suivante ». */
  const [viewedRoomId, setViewedRoomId] = useState<string | null>(null);
  /** Mode « rejouer » : on refait les salles déjà réussies, sans dépenser de jetons. */
  const [replayIndex, setReplayIndex] = useState<number | null>(null);

  if (!level) return null;
  if (!loaded) return <p className="loading">Connexion au serveur…</p>;

  if (!status.loggedIn) {
    return (
      <section className="victory">
        <p className="victory-icon" aria-hidden>
          🔐
        </p>
        <h1>Connecte-toi pour jouer</h1>
        <p>
          {enabled
            ? `Un compte gratuit te donne ${status.tokensPerDay} jetons par jour : 1 jeton par salle réussie.`
            : "Le jeu est momentanément indisponible."}
        </p>
        {enabled && (
          <div className="actions">
            <Link href={`/inscription`} className="btn btn-primary">
              Créer un compte
            </Link>
            <Link href={`/connexion?suite=/jeu/${levelId}`} className="btn btn-ghost">
              Se connecter
            </Link>
          </div>
        )}
      </section>
    );
  }

  const levelIndex = LEVELS.findIndex((l) => l.id === levelId);
  const viewed = rooms.find((room) => room.id === viewedRoomId);
  const index = viewed ? viewed.index : (replayIndex ?? currentRoomIndex(save, rooms.map((r) => r.id)));

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
            ? `Les ${rooms.length} salles sont ouvertes et ${rooms.length} cyber-cartes ont rejoint ton deck. Prêt pour le niveau ${next.name} ?`
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
              setReplayIndex(0);
            }}
          >
            Rejouer ce niveau
          </button>
        </div>
      </section>
    );
  }

  const room = rooms[index];
  const alreadySolved = save.solvedRooms.includes(room.id);
  const outOfTokens = !status.premium && status.tokensLeft <= 0 && !alreadySolved && !viewed;

  return (
    <>
      <div className="level-head">
        <p className="level-badge">
          Niveau {level.name}
        </p>
        <TokenBadge />
      </div>
      <ProgressBar current={index} total={rooms.length} />

      {outOfTokens ? (
        <section className="victory">
          <p className="victory-icon" aria-hidden>
            🪙
          </p>
          <h1>Plus de jetons pour aujourd&apos;hui</h1>
          <p>
            Tu as réussi tes {status.tokensPerDay} salles du jour, bravo ! Tes jetons reviennent à minuit. En attendant, tu peux réviser
            les cours… ou passer à l&apos;illimité.
          </p>
          <div className="actions">
            <Link href="/abonnement" className="btn btn-primary">
              Voir les offres
            </Link>
            <Link href="/cours" className="btn btn-ghost">
              Réviser les cours
            </Link>
          </div>
        </section>
      ) : (
        // La clé force un nouvel état local à chaque changement de salle.
        <RoomView
          key={room.id}
          room={room}
          onSolved={() => setViewedRoomId(room.id)}
          onNext={() => {
            setViewedRoomId(null);
            if (replayIndex !== null) setReplayIndex(index + 1 >= rooms.length ? null : index + 1);
          }}
        />
      )}
    </>
  );
}
