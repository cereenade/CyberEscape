import type { Metadata } from "next";
import { LevelSelect } from "@/components/LevelSelect";

export const metadata: Metadata = {
  title: "Jouer",
};

export default function GamePage() {
  return (
    <>
      <h1 className="page-title">Choisis ton niveau</h1>
      <p className="page-intro">
        5 niveaux de 10 salles. Chaque niveau terminé débloque le suivant, et chaque salle t&apos;apporte une nouvelle
        cyber-carte.
      </p>
      <LevelSelect />
    </>
  );
}
