import type { Metadata } from "next";
import Link from "next/link";
import { Deck } from "@/components/Deck";
import { CARDS } from "@/data/game";
import { getPlayerStatus, getSessionUser } from "@/server/player";

export const metadata: Metadata = {
  title: "Mon deck",
};

export const dynamic = "force-dynamic";

export default async function DeckPage() {
  const user = await getSessionUser();
  const status = await getPlayerStatus(user);
  // Seules les cartes déjà gagnées sont envoyées au navigateur.
  const owned = CARDS.filter((card) => status.progress.cards.includes(card.id));

  return (
    <>
      <h1 className="page-title">Mon deck de cyber-cartes</h1>
      {user ? (
        <>
          <p className="page-intro">Clique sur une carte pour relire la notion qu&apos;elle t&apos;a apprise.</p>
          <Deck cards={owned} />
        </>
      ) : (
        <p className="page-intro">
          <Link href="/connexion?suite=/deck">Connecte-toi</Link> pour retrouver les cartes gagnées dans les salles.
        </p>
      )}
    </>
  );
}
