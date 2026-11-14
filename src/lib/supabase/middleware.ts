import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { AUTH_ENABLED, SUPABASE_KEY, SUPABASE_URL } from "./config";

/** Pages réservées aux joueurs connectés (le serveur revérifie de toute façon à chaque action). */
const PROTECTED_PATHS = ["/compte", "/jeu/", "/deck", "/admin"];
/** Pages inutiles quand on est déjà connecté. */
const GUEST_ONLY_PATHS = ["/connexion", "/inscription"];

/**
 * Avant le lancement (SITE_PUBLIC différent de « true »), le site affiche
 * « Bientôt disponible » à tout le monde, sauf aux comptes administrateurs.
 * Seules les pages utiles pour se connecter et les pages légales restent ouvertes.
 */
const SITE_PUBLIC = process.env.SITE_PUBLIC === "true";
const COMING_SOON_PATH = "/bientot";
const OPEN_PATHS = [COMING_SOON_PATH, "/connexion", "/auth/", "/mot-de-passe-oublie", "/reinitialiser-mot-de-passe", "/api/", "/robots.txt", "/mentions-legales", "/cgv", "/confidentialite", "/conditions"];
const SERVICE_KEY = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

function matches(pathname: string, paths: string[]) {
  return paths.some((p) => (p.endsWith("/") ? pathname.startsWith(p) : pathname === p || pathname.startsWith(`${p}/`)));
}

async function isAdminUser(userId: string) {
  if (!SUPABASE_URL || !SERVICE_KEY) return false;
  const admin = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data } = await admin.from("admins").select("user_id").eq("user_id", userId).maybeSingle();
  return Boolean(data);
}

/**
 * Rafraîchit la session Supabase à chaque requête (sinon on serait déconnecté
 * à l'expiration du jeton) et gère les redirections liées à la connexion.
 */
export async function updateSession(request: NextRequest) {
  if (!AUTH_ENABLED) {
    if (!SITE_PUBLIC && !matches(request.nextUrl.pathname, OPEN_PATHS)) {
      const url = request.nextUrl.clone();
      url.pathname = COMING_SOON_PATH;
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // Important : getUser() valide le jeton auprès de Supabase (ne pas le retirer).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const redirectTo = (path: string, params?: Record<string, string>) => {
    const url = request.nextUrl.clone();
    url.pathname = path;
    url.search = "";
    Object.entries(params ?? {}).forEach(([k, v]) => url.searchParams.set(k, v));
    const redirect = NextResponse.redirect(url);
    // On garde les cookies de session éventuellement rafraîchis.
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    return redirect;
  };

  if (!SITE_PUBLIC && !matches(pathname, OPEN_PATHS) && !(user && (await isAdminUser(user.id)))) {
    return redirectTo(COMING_SOON_PATH);
  }

  const isProtected = matches(pathname, PROTECTED_PATHS);
  if (!user && isProtected) {
    return redirectTo("/connexion", { suite: pathname });
  }
  if (user && GUEST_ONLY_PATHS.includes(pathname)) {
    return redirectTo("/compte");
  }

  return response;
}
