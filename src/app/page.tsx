import Link from "next/link";
import { LEVELS, PLANS, TOKENS_PER_DAY, TOTAL_CARDS, TOTAL_ROOMS } from "@/data/meta";
import { LESSONS } from "@/data/lessons";

const FEATURES = [
  {
    title: `${TOTAL_ROOMS} salles piégées`,
    text: "Mot de passe dans le code source, message chiffré, faux mail, logs d'attaque… chaque porte cache une énigme.",
  },
  {
    title: `${TOTAL_CARDS} cyber-cartes`,
    text: "Une carte par salle. Chacune t'apprend une vraie notion de cyber et te donne la clé pour avancer.",
  },
  {
    title: `${LESSONS.length} leçons`,
    text: "Une salle de cours rangée par thème et par niveau, avec objectifs, exemples, résumés et mini-quiz.",
  },
];

const STEPS = [
  {
    title: "Explore la salle",
    text: "Chaque salle raconte une scène de l'attaque : un terminal, une boîte mail, un journal de connexions…",
  },
  {
    title: "Ramasse la cyber-carte",
    text: "Elle t'explique une vraie notion de cybersécurité, en quelques lignes, et te sert d'indice.",
  },
  {
    title: "Résous l'énigme",
    text: "Décode un message, démasque un faux mail, analyse un log… et la porte s'ouvre sur la salle suivante.",
  },
  {
    title: "Progresse chaque jour",
    text: `${TOKENS_PER_DAY} jetons gratuits par jour : 1 jeton par salle réussie. Ton deck grandit, et les cours restent en accès libre.`,
  },
];

interface Props {
  searchParams: Promise<{ compte?: string }>;
}

export default async function HomePage({ searchParams }: Props) {
  const { compte } = await searchParams;

  return (
    <>
      {compte === "supprime" && (
        <p className="feedback feedback-success">Ton compte et tes données ont bien été supprimés. À bientôt !</p>
      )}
      <section className="hero">
        <p className="hero-kicker">&gt; alerte : intrusion détectée</p>
        <h1 className="hero-title">CyberEscape</h1>
        <p className="hero-text">
          Un pirate a pris le contrôle du serveur, et tu es enfermé dedans. Traverse les salles piégées, résous les
          énigmes de cybersécurité et collectionne les cyber-cartes pour t&apos;en sortir. Pas besoin d&apos;être expert :
          tu apprends en jouant, à ton rythme.
        </p>
        <p className="hero-tagline">Collectionne. Décode. Échappe-toi.</p>
        <div className="actions">
          <Link href="/jeu" className="btn btn-primary btn-large">
            Commencer la partie
          </Link>
          <Link href="/cours" className="btn btn-ghost btn-large">
            Aller en cours
          </Link>
        </div>
      </section>

      <section className="home-section" aria-labelledby="how-title">
        <p className="section-kicker">&gt; mode d&apos;emploi</p>
        <h2 id="how-title">Comment ça marche ?</h2>
        <ol className="steps">
          {STEPS.map((step, index) => (
            <li key={step.title} className="step">
              <span className="step-number">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="features">
        {FEATURES.map((feature) => (
          <article key={feature.title} className="feature">
            <h2>{feature.title}</h2>
            <p>{feature.text}</p>
          </article>
        ))}
      </section>

      <section className="levels-preview">
        <h2>{LEVELS.length} niveaux, du premier réflexe au boss final</h2>
        <ol className="levels-list">
          {LEVELS.map((level) => (
            <li key={level.id}>
              <strong>{level.name}</strong>
              <span className="muted"> · {level.tagline}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-cta">
        <h2>Prêt(e) à t&apos;échapper ?</h2>
        <p className="muted">
          Compte gratuit : {TOKENS_PER_DAY} salles par jour. Envie d&apos;aller plus vite ? Illimité dès {PLANS.etudiant.price}/mois pour les
          étudiants, {PLANS.standard.price}/mois pour tous.
        </p>
        <div className="actions">
          <Link href="/inscription" className="btn btn-primary btn-large">
            Créer un compte gratuit
          </Link>
          <Link href="/abonnement" className="btn btn-ghost btn-large">
            Voir les offres
          </Link>
        </div>
      </section>
    </>
  );
}
