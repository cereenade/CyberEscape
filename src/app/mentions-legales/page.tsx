import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mentions légales" };

export default function LegalNoticePage() {
  return (
    <article className="legal">
      <h1 className="page-title">Mentions légales</h1>

      <h2>Éditeur</h2>
      <p>
        CyberEscape est édité par Ceren Yikilmaz, entrepreneuse individuelle (micro-entreprise, SIRET en cours d&apos;attribution). Contact :{" "}
        <a href="https://github.com/cereenade/CyberEscape/issues" target="_blank" rel="noopener noreferrer">
          via GitHub
        </a>
        .
      </p>

      <h2>Hébergement</h2>
      <p>
        Site : Vercel Inc. (
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          vercel.com
        </a>
        ). Comptes et base de données : Supabase Inc. (
        <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">
          supabase.com
        </a>
        ). Paiements : Stripe Payments Europe Ltd (
        <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">
          stripe.com
        </a>
        ).
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Le code source est disponible sur{" "}
        <a href="https://github.com/cereenade/CyberEscape" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        . Les noms d&apos;entreprises, de banques et de services utilisés dans les énigmes (Banque Horizon, ColisExpress,
        serveur-corp.fr…) sont fictifs.
      </p>
    </article>
  );
}
