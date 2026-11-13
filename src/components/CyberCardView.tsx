import type { CyberCard } from "@/lib/types";

interface Props {
  card: CyberCard;
  /** Affiche l'explication complète en plus du résumé. */
  detailed?: boolean;
}

export function CyberCardView({ card, detailed = false }: Props) {
  return (
    <article className={`cyber-card cat-${slug(card.category)}`}>
      <div className="cyber-card-top">
        <span className="cyber-card-icon" aria-hidden>
          {card.icon}
        </span>
        <span className="cyber-card-category">{card.category}</span>
      </div>
      <h3 className="cyber-card-title">{card.title}</h3>
      <p className="cyber-card-summary">{card.summary}</p>
      {detailed && (
        <ul className="cyber-card-details">
          {card.details.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function LockedCard() {
  return (
    <article className="cyber-card locked" aria-label="Carte non découverte">
      <span className="cyber-card-icon" aria-hidden>
        🔒
      </span>
      <h3 className="cyber-card-title">???</h3>
      <p className="cyber-card-summary">Explore les salles pour découvrir cette carte.</p>
    </article>
  );
}

function slug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
}
