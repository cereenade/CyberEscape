import Link from "next/link";
import { AUTH_ENABLED } from "@/lib/supabase/config";

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

/** Cadre commun des pages de compte (connexion, inscription…). */
export function AuthCard({ title, subtitle, children }: Props) {
  return (
    <section className="auth-card">
      <h1 className="auth-title">{title}</h1>
      {subtitle && <p className="auth-subtitle">{subtitle}</p>}
      {AUTH_ENABLED ? (
        children
      ) : (
        <div className="feedback feedback-error">
          <p>Les comptes ne sont pas encore activés sur ce site.</p>
          <p>
            Tu peux quand même jouer : ta progression est sauvegardée dans ton navigateur.{" "}
            <Link href="/jeu">Jouer maintenant</Link>
          </p>
        </div>
      )}
    </section>
  );
}
