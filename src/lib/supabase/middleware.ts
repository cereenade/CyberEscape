import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { AUTH_ENABLED, SUPABASE_KEY, SUPABASE_URL } from "./config";

/** Pages réservées aux joueurs connectés. */
const PROTECTED_PATHS = ["/compte"];
/** Pages inutiles quand on est déjà connecté. */
const GUEST_ONLY_PATHS = ["/connexion", "/inscription"];

/**
 * Rafraîchit la session Supabase à chaque requête (sinon on serait déconnecté
 * à l'expiration du jeton) et gère les redirections liées à la connexion.
 */
export async function updateSession(request: NextRequest) {
  if (!AUTH_ENABLED) return NextResponse.next({ request });

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

  if (!user && PROTECTED_PATHS.some((p) => pathname.startsWith(p))) {
    return redirectTo("/connexion", { suite: pathname });
  }
  if (user && GUEST_ONLY_PATHS.includes(pathname)) {
    return redirectTo("/compte");
  }

  return response;
}
