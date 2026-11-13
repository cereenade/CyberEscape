import type { Metadata } from "next";

export const metadata: Metadata = { title: "Conditions d'utilisation" };

export default function TermsPage() {
  return (
    <article className="legal">
      <h1 className="page-title">Conditions d&apos;utilisation</h1>
      <p className="muted">Dernière mise à jour : novembre 2026</p>

      <h2>1. Objet</h2>
      <p>
        CyberEscape est un jeu éducatif gratuit qui permet d&apos;apprendre les bases de la cybersécurité. Les présentes
        conditions encadrent l&apos;utilisation du site et des comptes joueurs.
      </p>

      <h2>2. Compte joueur</h2>
      <p>
        La création d&apos;un compte est facultative : le jeu reste jouable sans compte. Tu es responsable de la
        confidentialité de ton mot de passe. Ton pseudo est visible par les autres joueurs : il ne doit pas être
        injurieux, usurper l&apos;identité de quelqu&apos;un ni contenir d&apos;informations personnelles.
      </p>

      <h2>3. Usage éthique</h2>
      <p>
        Les techniques présentées (décodage, analyse de logs, failles web…) sont expliquées à des fins pédagogiques et
        défensives. Les mettre en pratique sur un système sans l&apos;autorisation de son propriétaire est illégal (articles
        323-1 et suivants du Code pénal). Il est également interdit de tenter d&apos;attaquer CyberEscape lui-même.
      </p>

      <h2>4. Disponibilité</h2>
      <p>
        Le site est fourni « en l&apos;état », sans garantie de disponibilité. Le contenu peut évoluer à tout moment.
      </p>

      <h2>5. Suppression du compte</h2>
      <p>
        Tu peux supprimer ton compte à tout moment depuis la page « Mon compte ». Un compte qui ne respecte pas ces
        conditions peut être supprimé.
      </p>
    </article>
  );
}
