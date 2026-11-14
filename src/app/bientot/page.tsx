import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bientôt disponible",
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return (
    <section className="victory">
      <h1>Bientôt disponible</h1>
      <p>CyberEscape est en préparation. Reviens très vite !</p>
      <p>
        <Link href="/connexion" className="btn btn-ghost btn-small">
          Connexion
        </Link>
      </p>
    </section>
  );
}
