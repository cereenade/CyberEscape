import type { Metadata, Viewport } from "next";
import { GameProvider } from "@/components/GameProvider";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CyberEscape — Échappe-toi du serveur piraté",
    template: "%s · CyberEscape",
  },
  description:
    "Un escape game dans ton navigateur pour apprendre la cybersécurité : résous des énigmes, collectionne les cyber-cartes et échappe-toi du serveur piraté.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#09080d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <GameProvider>
          <Header />
          <main className="main">{children}</main>
          <footer className="footer">
            CyberEscape — apprendre la cybersécurité en jouant.{" "}
            <a href="https://github.com/cereenade/CyberEscape" target="_blank" rel="noopener noreferrer">
              Code source sur GitHub
            </a>
          </footer>
        </GameProvider>
      </body>
    </html>
  );
}
