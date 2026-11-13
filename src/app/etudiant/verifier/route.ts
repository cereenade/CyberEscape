import { NextResponse, type NextRequest } from "next/server";
import { SITE_URL } from "@/lib/site";
import { STUDENT_VALIDITY_DAYS, hashToken } from "@/server/student";
import { getAdminSupabase } from "@/server/supabase-admin";

export const dynamic = "force-dynamic";

function done(result: string) {
  return NextResponse.redirect(`${SITE_URL}/abonnement?etudiant=${result}`);
}

/** Lien reçu sur l'adresse de l'école : confirme le statut étudiant pour un an. */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("jeton") ?? "";
  const admin = getAdminSupabase();
  if (!admin || !/^[A-Za-z0-9_-]{40,60}$/.test(token)) return done("invalide");

  const { data } = await admin
    .from("student_verifications")
    .select("user_id, pending_email, pending_expires_at")
    .eq("pending_token_hash", hashToken(token))
    .maybeSingle();
  if (!data?.pending_email) return done("invalide");
  if (!data.pending_expires_at || new Date(data.pending_expires_at as string).getTime() < Date.now()) return done("expire");

  const now = new Date();
  const { error } = await admin
    .from("student_verifications")
    .update({
      school_email: data.pending_email,
      verified_at: now.toISOString(),
      expires_at: new Date(now.getTime() + STUDENT_VALIDITY_DAYS * 24 * 60 * 60 * 1000).toISOString(),
      pending_email: null,
      pending_token_hash: null,
      pending_expires_at: null,
    })
    .eq("user_id", data.user_id);
  // 23505 : adresse déjà vérifiée par un autre compte (index unique).
  if (error) return done(error.code === "23505" ? "deja-utilisee" : "invalide");
  return done("ok");
}
