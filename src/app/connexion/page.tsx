import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Connexion" };

interface Props {
  searchParams: Promise<{ suite?: string; erreur?: string }>;
}

function safeNext(value: string | undefined): string {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/compte";
}

export default async function LoginPage({ searchParams }: Props) {
  const { suite, erreur } = await searchParams;

  return (
    <AuthCard title="Connexion" subtitle="Retrouve ta progression et tes cyber-cartes sur tous tes appareils.">
      {erreur === "lien" && (
        <p className="feedback feedback-error">Ce lien est invalide ou a expiré. Connecte-toi ou demande un nouveau lien.</p>
      )}
      <LoginForm next={safeNext(suite)} />
    </AuthCard>
  );
}
