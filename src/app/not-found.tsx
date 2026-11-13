import Link from "next/link";

export default function NotFound() {
  return (
    <section className="victory">
      <p className="victory-icon" aria-hidden>
        🛑
      </p>
      <h1>Erreur 404 : salle introuvable</h1>
      <p>Cette porte ne mène nulle part. Le pirate a peut-être effacé la page.</p>
      <div className="actions">
        <Link href="/" className="btn btn-primary">
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
