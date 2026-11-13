import type { Metadata } from "next";
import { LevelSelect } from "@/components/LevelSelect";
import { LEVELS, ROOMS } from "@/data/game";

export const metadata: Metadata = {
  title: "Jouer",
};

export default function GamePage() {
  return (
    <>
      <h1 className="page-title">Choisis ton niveau</h1>
      <p className="page-intro">
        {LEVELS.length} niveaux de {ROOMS.length / LEVELS.length} salles, tous accessibles : commence par celui qui te correspond. Chaque salle t&apos;apporte une
        nouvelle cyber-carte.
      </p>
      <LevelSelect />
    </>
  );
}
