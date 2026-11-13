import type { Metadata } from "next";
import Link from "next/link";
import { PLANS, TOKENS_PER_DAY } from "@/data/meta";

export const metadata: Metadata = { title: "Conditions générales de vente" };

export default function SalesTermsPage() {
  return (
    <article className="legal">
      <h1 className="page-title">Conditions générales de vente</h1>
      <p className="muted">Dernière mise à jour : novembre 2026.</p>

      <h2>1. Vendeur</h2>
      <p>
        CyberEscape est édité par Ceren Yikilmaz, entrepreneuse individuelle (micro-entreprise, SIRET en cours d&apos;attribution). Contact :{" "}
        <a href="https://github.com/cereenade/CyberEscape/issues" target="_blank" rel="noopener noreferrer">
          via GitHub
        </a>
        . Voir aussi les <Link href="/mentions-legales">mentions légales</Link>.
      </p>

      <h2>2. Offres</h2>
      <ul>
        <li>
          <strong>Gratuit</strong> : {TOKENS_PER_DAY} jetons par jour, 1 jeton consommé par salle réussie. Les jetons non utilisés ne sont pas
          reportés au lendemain.
        </li>
        <li>
          <strong>{PLANS.etudiant.name}</strong> : {PLANS.etudiant.price} TTC par mois, salles illimitées. Réservé aux personnes ayant vérifié une
          adresse e-mail d&apos;établissement d&apos;enseignement ; la vérification est valable un an.
        </li>
        <li>
          <strong>{PLANS.standard.name}</strong> : {PLANS.standard.price} TTC par mois, salles illimitées.
        </li>
      </ul>
      <p>TVA non applicable, art. 293 B du CGI. Les cours restent accessibles gratuitement, avec ou sans abonnement.</p>

      <h2>3. Paiement et renouvellement</h2>
      <p>
        Le paiement se fait par carte via Mollie ; CyberEscape n&apos;a jamais accès à tes coordonnées bancaires. L&apos;abonnement est mensuel et se
        renouvelle automatiquement à date anniversaire, sans engagement.
      </p>

      <h2>4. Résiliation</h2>
      <p>
        Tu peux résilier à tout moment depuis la page <Link href="/abonnement">Offres</Link> ou <Link href="/compte">Mon compte</Link> («
        Gérer mon abonnement »). L&apos;accès illimité continue jusqu&apos;à la fin du mois déjà payé, puis aucun nouveau prélèvement n&apos;a lieu.
        Supprimer ton compte résilie immédiatement l&apos;abonnement.
      </p>

      <h2>5. Droit de rétractation</h2>
      <p>
        Il s&apos;agit d&apos;un contenu numérique fourni immédiatement. Au moment de l&apos;achat, tu demandes expressément l&apos;accès immédiat et tu
        reconnais perdre ton droit de rétractation de 14 jours (art. L221-28, 13° du Code de la consommation).
      </p>

      <h2>6. Fraude</h2>
      <p>
        L&apos;offre Étudiant suppose une adresse d&apos;école réelle et personnelle. En cas d&apos;usage frauduleux (adresse empruntée, revendue…),
        l&apos;abonnement peut être résilié.
      </p>

      <h2>7. Médiation et litiges</h2>
      <p>
        En cas de souci, contacte-nous d&apos;abord : on trouvera une solution. Tu peux aussi recourir gratuitement à un médiateur de la
        consommation ou à la plateforme européenne de règlement en ligne des litiges. Droit applicable : droit français.
      </p>
    </article>
  );
}
