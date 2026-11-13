import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { AuthProvider } from "@/components/AuthProvider";
import { GameProvider } from "@/components/GameProvider";
import { Header } from "@/components/Header";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CyberEscape — Échappe-toi du serveur piraté",
    template: "%s · CyberEscape",
  },
  description:
    "Un escape game dans ton navigateur pour apprendre la cybersécurité : résous des énigmes, collectionne les cyber-cartes et échappe-toi du serveur piraté.",
  icons: { icon: "/favicon.svg" },
  metadataBase: new URL(SITE_URL),
  keywords: ["cybersécurité", "escape game", "jeu éducatif", "phishing", "cryptographie", "SOC", "apprendre"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "CyberEscape",
    title: "CyberEscape — Échappe-toi du serveur piraté",
    description: "200 salles, 200 cyber-cartes et 30 leçons pour apprendre la cybersécurité en jouant, directement dans ton navigateur.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: "CyberEscape — Échappe-toi du serveur piraté",
    description: "Apprends la cybersécurité en jouant : énigmes, cyber-cartes et salle de cours.",
  },
};

export const viewport: Viewport = {
  themeColor: "#09080d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <GameProvider>
            <Header />
            <main className="main">{children}</main>
            <footer className="footer">
              <p>CyberEscape — apprendre la cybersécurité en jouant.</p>
              <nav className="footer-links" aria-label="Liens légaux">
                <Link href="/mentions-legales">Mentions légales</Link>
                <Link href="/confidentialite">Confidentialité</Link>
                <Link href="/conditions">Conditions d&apos;utilisation</Link>
                <Link href="/cgv">CGV</Link>
                <a href="https://github.com/cereenade/CyberEscape" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </nav>
            </footer>
          </GameProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
