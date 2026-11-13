import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { grantFreeAccess, resetTodayTokens, revokeFreeAccess, verifyStudentManually } from "@/app/actions/admin";
import { PLANS, TOTAL_ROOMS } from "@/data/meta";
import { EMAIL_ENABLED } from "@/server/email";
import { isAdmin, getSessionUser, todayInParis } from "@/server/player";
import { STRIPE_ENABLED } from "@/server/stripe";
import { getAdminSupabase } from "@/server/supabase-admin";

export const metadata: Metadata = { title: "Administration", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const PAGE_SIZE = 25;
const DATE = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

const LINKS = [
  { href: "https://supabase.com/dashboard/projects", label: "🗄️ Base de données (Supabase)" },
  { href: "https://vercel.com/dashboard", label: "▲ Hébergement et logs (Vercel)" },
  { href: "https://github.com/cereenade/CyberEscape", label: "🐙 Code source (GitHub)" },
  { href: "https://github.dev/cereenade/CyberEscape", label: "✏️ Éditer le code en ligne (github.dev)" },
  { href: "https://dashboard.stripe.com", label: "💳 Paiements (Stripe)" },
  { href: "https://resend.com/emails", label: "✉️ E-mails envoyés (Resend)" },
];

interface Props {
  searchParams: Promise<{ q?: string; page?: string }>;
}

interface Row {
  user_id: string;
  [key: string]: unknown;
}

function byUser<T extends Row>(rows: T[] | null): Map<string, T> {
  return new Map((rows ?? []).map((row) => [row.user_id, row]));
}

export default async function AdminPage({ searchParams }: Props) {
  const user = await getSessionUser();
  // Page invisible (404) pour tous ceux qui ne sont pas admin.
  if (!user || !(await isAdmin(user.id))) notFound();
  const admin = getAdminSupabase();
  if (!admin) notFound();

  const { q = "", page = "1" } = await searchParams;
  const search = q.trim().toLowerCase().slice(0, 100);
  const pageNumber = Math.max(1, Number.parseInt(page, 10) || 1);

  const [{ data: authData }, usersCount, subsRes, studentsCount, usageRes] = await Promise.all([
    admin.auth.admin.listUsers({ page: 1, perPage: 1000 }),
    admin.from("profiles").select("id", { count: "exact", head: true }),
    admin.from("subscriptions").select("user_id, plan, status, current_period_end, cancel_at_period_end"),
    admin.from("student_verifications").select("user_id", { count: "exact", head: true }).not("verified_at", "is", null),
    admin.from("daily_usage").select("user_id, tokens_used").eq("day", todayInParis()),
  ]);

  const subs = byUser(subsRes.data as Row[] | null);
  const activeSubs = [...subs.values()].filter(
    (s) => ["active", "trialing"].includes(s.status as string) && (!s.current_period_end || new Date(s.current_period_end as string) > new Date()),
  );
  const countPlan = (plan: string) => activeSubs.filter((s) => s.plan === plan).length;
  const monthly = countPlan("etudiant") * 2.99 + countPlan("standard") * 4.99;
  const usage = byUser(usageRes.data as Row[] | null);
  const tokensToday = [...usage.values()].reduce((sum, row) => sum + (row.tokens_used as number), 0);

  const allUsers = (authData?.users ?? [])
    .filter((u) => !search || (u.email ?? "").toLowerCase().includes(search))
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
  const pageCount = Math.max(1, Math.ceil(allUsers.length / PAGE_SIZE));
  const users = allUsers.slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE);
  const ids = users.map((u) => u.id);

  const [profilesRes, progressRes, studentsRes] = ids.length
    ? await Promise.all([
        admin.from("profiles").select("id, pseudo").in("id", ids),
        admin.from("progress").select("user_id, solved_rooms").in("user_id", ids),
        admin.from("student_verifications").select("user_id, school_email, verified_at, expires_at").in("user_id", ids),
      ])
    : [{ data: [] }, { data: [] }, { data: [] }];
  const pseudos = new Map(((profilesRes.data ?? []) as { id: string; pseudo: string }[]).map((p) => [p.id, p.pseudo]));
  const progress = byUser(progressRes.data as Row[] | null);
  const students = byUser(studentsRes.data as Row[] | null);

  return (
    <>
      <h1 className="page-title">🛠️ Administration</h1>
      <p className="page-intro">
        Visible uniquement par toi. Pour modifier le code ou la base, utilise les outils ci-dessous : ils ont leur propre connexion sécurisée (pense à
        activer la double authentification partout).
      </p>

      <section className="account-section">
        <h2>En bref</h2>
        <div className="stats">
          <Stat value={String(usersCount.count ?? 0)} label="comptes" />
          <Stat value={String(activeSubs.length)} label="abonnés actifs" />
          <Stat value={`${monthly.toFixed(2).replace(".", ",")} €`} label="par mois (brut)" />
          <Stat value={String(studentsCount.count ?? 0)} label="étudiants vérifiés" />
          <Stat value={String(tokensToday)} label="jetons utilisés aujourd'hui" />
        </div>
        <p className="muted small">
          {PLANS.etudiant.name} : {countPlan("etudiant")} · {PLANS.standard.name} : {countPlan("standard")} · Offerts : {countPlan("offert")} · Paiement{" "}
          {STRIPE_ENABLED ? "✅ activé" : "⏸️ non configuré"} · E-mails {EMAIL_ENABLED ? "✅ activés" : "⏸️ non configurés"}
        </p>
      </section>

      <section className="account-section">
        <h2>Outils</h2>
        <div className="admin-links">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-small">
              {link.label}
            </a>
          ))}
        </div>
      </section>

      <section className="account-section">
        <h2>Joueurs</h2>
        <form className="answer-row" method="get">
          <input className="input" name="q" defaultValue={search} placeholder="Rechercher un e-mail" aria-label="Rechercher un e-mail" maxLength={100} />
          <button type="submit" className="btn btn-primary">
            Rechercher
          </button>
        </form>

        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Joueur</th>
                <th>Inscrit</th>
                <th>Salles</th>
                <th>Jetons</th>
                <th>Offre</th>
                <th>Étudiant</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const sub = subs.get(u.id);
                const active = activeSubs.includes(sub as Row);
                const student = students.get(u.id);
                const solved = ((progress.get(u.id)?.solved_rooms as string[] | undefined) ?? []).length;
                return (
                  <tr key={u.id}>
                    <td>
                      <strong>{pseudos.get(u.id) ?? "—"}</strong>
                      <br />
                      <span className="muted small">{u.email}</span>
                      {!u.email_confirmed_at && <span className="muted small"> · non confirmé</span>}
                    </td>
                    <td>{DATE.format(new Date(u.created_at))}</td>
                    <td>
                      {solved}/{TOTAL_ROOMS}
                    </td>
                    <td>{(usage.get(u.id)?.tokens_used as number | undefined) ?? 0}</td>
                    <td>
                      {active ? (
                        <>
                          {String(sub?.plan)}
                          {sub?.current_period_end ? ` → ${DATE.format(new Date(sub.current_period_end as string))}` : " (sans limite)"}
                          {sub?.cancel_at_period_end ? " · résilié" : ""}
                        </>
                      ) : (
                        <span className="muted">gratuit</span>
                      )}
                    </td>
                    <td>{student?.verified_at ? `✅ ${(student.school_email as string | null) ?? "manuel"}` : <span className="muted">—</span>}</td>
                    <td>
                      <div className="admin-links">
                        {!active && (
                          <form action={grantFreeAccess} className="answer-row">
                            <input type="hidden" name="userId" value={u.id} />
                            <select name="duree" className="input" aria-label="Durée" defaultValue="30">
                              <option value="30">30 jours</option>
                              <option value="365">1 an</option>
                              <option value="illimite">Sans limite</option>
                            </select>
                            <button type="submit" className="btn btn-primary btn-small">
                              Offrir l&apos;illimité
                            </button>
                          </form>
                        )}
                        {active && sub?.plan === "offert" && (
                          <form action={revokeFreeAccess}>
                            <input type="hidden" name="userId" value={u.id} />
                            <button type="submit" className="btn btn-danger btn-small">
                              Retirer l&apos;accès offert
                            </button>
                          </form>
                        )}
                        <form action={resetTodayTokens}>
                          <input type="hidden" name="userId" value={u.id} />
                          <button type="submit" className="btn btn-ghost btn-small">
                            Rendre les jetons du jour
                          </button>
                        </form>
                        {!student?.verified_at && (
                          <form action={verifyStudentManually}>
                            <input type="hidden" name="userId" value={u.id} />
                            <button type="submit" className="btn btn-ghost btn-small">
                              Valider étudiant
                            </button>
                          </form>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {users.length === 0 && <p className="muted">Aucun joueur trouvé.</p>}

        {pageCount > 1 && (
          <p className="actions">
            {pageNumber > 1 && (
              <Link className="btn btn-ghost btn-small" href={`/admin?q=${encodeURIComponent(search)}&page=${pageNumber - 1}`}>
                ← Précédent
              </Link>
            )}
            <span className="muted">
              Page {pageNumber}/{pageCount}
            </span>
            {pageNumber < pageCount && (
              <Link className="btn btn-ghost btn-small" href={`/admin?q=${encodeURIComponent(search)}&page=${pageNumber + 1}`}>
                Suivant →
              </Link>
            )}
          </p>
        )}
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
