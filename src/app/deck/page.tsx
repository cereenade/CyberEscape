import type { Metadata } from "next";
import { Deck } from "@/components/Deck";

export const metadata: Metadata = {
  title: "Mon deck",
};

export default function DeckPage() {
  return (
    <>
      <h1 className="page-title">Mon deck de cyber-cartes</h1>
      <p className="page-intro">Clique sur une carte pour relire la notion qu&apos;elle t&apos;a apprise.</p>
      <Deck />
    </>
  );
}
