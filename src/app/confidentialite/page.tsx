import type { Metadata } from "next";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function PrivacyPage() {
  return (
    <article className="legal">
      <h1 className="page-title">Politique de confidentialité</h1>
      <p className="muted">Dernière mise à jour : novembre 2026</p>

      <h2>Les données collectées</h2>
      <p>Sans compte, aucune donnée personnelle n&apos;est collectée. Un compte est nécessaire pour jouer ; nous enregistrons alors uniquement :</p>
      <ul>
        <li>ton adresse e-mail (pour te connecter et réinitialiser ton mot de passe) ;</li>
        <li>ton pseudo ;</li>
        <li>ta progression dans le jeu (salles résolues, cartes, leçons validées) et tes jetons utilisés chaque jour ;</li>
        <li>si tu t&apos;abonnes : l&apos;offre choisie, son statut et les identifiants techniques Stripe (jamais ta carte bancaire) ;</li>
        <li>si tu demandes l&apos;offre Étudiant : ton adresse e-mail d&apos;école et la date de vérification.</li>
      </ul>
      <p>Ton mot de passe n&apos;est jamais stocké en clair : il est haché par notre prestataire d&apos;authentification.</p>

      <h2>Pourquoi</h2>
      <p>
        Ces données servent uniquement à faire fonctionner ton compte et à sauvegarder ta progression. Elles ne sont ni
        vendues, ni utilisées pour de la publicité.
      </p>

      <h2>Où elles sont stockées</h2>
      <p>
        Les comptes et la progression sont hébergés par Supabase ; le site est hébergé par Vercel ; les paiements sont traités par Stripe et les e-mails de vérification envoyés par Resend. Ces prestataires
        traitent les données pour notre compte.
      </p>

      <h2>Cookies</h2>
      <p>
        Le site utilise seulement les cookies nécessaires à la connexion (session). Aucun cookie publicitaire ni de mesure d&apos;audience.
      </p>

      <h2>Durée de conservation</h2>
      <p>Tes données sont conservées tant que ton compte existe, et supprimées quand tu le supprimes (l&apos;abonnement est alors résilié). Les factures sont conservées par Stripe pendant la durée légale.</p>

      <h2>Tes droits</h2>
      <p>
        Conformément au RGPD, tu peux accéder à tes données, les rectifier ou les supprimer. La page « Mon compte » permet
        de modifier ton pseudo, ton mot de passe et de supprimer ton compte en un clic. Tu peux aussi introduire une
        réclamation auprès de la CNIL (cnil.fr).
      </p>
    </article>
  );
}
