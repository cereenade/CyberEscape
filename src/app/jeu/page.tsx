import type { Metadata } from "next";
import { LevelSelect } from "@/components/LevelSelect";
import { LEVELS, TOKENS_PER_DAY, TOTAL_ROOMS } from "@/data/meta";

export const metadata: Metadata = {
  title: "Jouer",
};

export default function GamePage() {
  return (
    <>
      <h1 className="page-title">Choisis ton niveau</h1>
      <p className="page-intro">
        {LEVELS.length} niveaux et {TOTAL_ROOMS} salles, tous accessibles : commence par celui qui te correspond. Chaque salle t&apos;apporte une
        nouvelle cyber-carte. Avec un compte gratuit, tu as {TOKENS_PER_DAY} jetons par jour : 1 jeton par salle réussie.
      </p>
      <LevelSelect />
    </>
  );
}
