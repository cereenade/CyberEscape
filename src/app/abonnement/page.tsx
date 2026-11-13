import type { Metadata } from "next";
import { Plans } from "@/components/billing/Plans";
import { TOKENS_PER_DAY } from "@/data/meta";
import { getPlayerStatus, getSessionUser, getSubscription } from "@/server/player";
import { EMAIL_ENABLED } from "@/server/email";
import { MOLLIE_ENABLED } from "@/server/mollie";
import { getAdminSupabase } from "@/server/supabase-admin";

export const metadata: Metadata = {
  title: "Offres",
  description: "Jouez gratuitement 5 salles par jour, ou passez à l'illimité : 2,99 €/mois pour les étudiants, 4,99 €/mois pour tous.",
};

export const dynamic = "force-dynamic";

const NOTICES: Record<string, { ok: boolean; text: string }> = {
  "paiement:ok": { ok: true, text: "Merci ! Ton abonnement est en cours d'activation (quelques secondes)." },
  "paiement:retour": { ok: true, text: "Merci ! Si ton paiement a abouti, l'illimité s'active dans quelques secondes : recharge la page si besoin." },
  "paiement:annule": { ok: false, text: "Paiement annulé : rien n'a été prélevé." },
  "etudiant:ok": { ok: true, text: "Statut étudiant confirmé pour un an ✅ Tu peux maintenant choisir l'offre Étudiant." },
  "etudiant:expire": { ok: false, text: "Ce lien a expiré. Redemande un e-mail de vérification." },
  "etudiant:invalide": { ok: false, text: "Lien de vérification invalide ou déjà utilisé." },
  "etudiant:deja-utilisee": { ok: false, text: "Cette adresse d'école est déjà associée à un autre compte." },
};

interface Props {
  searchParams: Promise<{ paiement?: string; etudiant?: string }>;
}

export default async function PricingPage({ searchParams }: Props) {
  const { paiement, etudiant } = await searchParams;
  const notice = NOTICES[`paiement:${paiement}`] ?? NOTICES[`etudiant:${etudiant}`];

  const user = await getSessionUser();
  const status = await getPlayerStatus(user);
  const sub = user ? await getSubscription(user.id) : null;

  let student: { email: string; until: string | null } | null = null;
  const admin = getAdminSupabase();
  if (user && admin) {
    const { data } = await admin.from("student_verifications").select("school_email, verified_at, expires_at").eq("user_id", user.id).maybeSingle();
    const valid = data?.verified_at && (!data.expires_at || new Date(data.expires_at as string).getTime() > Date.now());
    if (valid) student = { email: data.school_email as string, until: (data.expires_at as string | null) ?? null };
  }

  return (
    <>
      <h1 className="page-title">Les offres</h1>
      <p className="page-intro">
        Gratuit : {TOKENS_PER_DAY} jetons par jour, 1 jeton par salle réussie. Les jetons ne se cumulent pas et reviennent chaque nuit à minuit.
        Les cours restent toujours en accès libre.
      </p>
      {notice && <p className={notice.ok ? "feedback feedback-success" : "feedback feedback-error"}>{notice.text}</p>}
      <Plans
        loggedIn={status.loggedIn}
        premium={status.premium}
        currentPlan={status.plan}
        hasBilling={Boolean(sub?.mollie_subscription_id)}
        cancelAtPeriodEnd={Boolean(sub?.cancel_at_period_end)}
        periodEnd={sub?.current_period_end ?? null}
        salesOpen={MOLLIE_ENABLED}
        studentCheckOpen={EMAIL_ENABLED}
        student={student}
      />
    </>
  );
}
