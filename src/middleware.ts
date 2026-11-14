import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Site privé tant que SITE_PUBLIC n'est pas « true » : tout est protégé par
 * un mot de passe (SITE_PASSWORD, identifiant libre). Sans mot de passe configuré,
 * personne n'entre. Le webhook Mollie reste hors du matcher.
 */
const SITE_PUBLIC = process.env.SITE_PUBLIC === "true";
const SITE_PASSWORD = process.env.SITE_PASSWORD ?? "";

function sameText(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function hasAccess(request: NextRequest) {
  if (!SITE_PASSWORD) return false;
  const header = request.headers.get("authorization") ?? "";
  if (!header.startsWith("Basic ")) return false;
  try {
    const decoded = atob(header.slice(6));
    const password = decoded.slice(decoded.indexOf(":") + 1);
    return sameText(password, SITE_PASSWORD);
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  if (!SITE_PUBLIC) {
    if (!hasAccess(request)) {
      return new NextResponse("Site en préparation.", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="CyberEscape (privé)", charset="UTF-8"',
          "X-Robots-Tag": "noindex, nofollow",
          "Cache-Control": "no-store",
        },
      });
    }
    const response = await updateSession(request);
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }
  return updateSession(request);
}

export const config = {
  matcher: [
    // Toutes les pages, sauf les fichiers statiques, les images et le webhook Mollie (sans session).
    "/((?!_next/static|_next/image|api/mollie|favicon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
