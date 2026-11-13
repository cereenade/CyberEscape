import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = { title: "Mot de passe oublié" };

export default function ForgotPasswordPage() {
  return (
    <AuthCard title="Mot de passe oublié" subtitle="Indique ton adresse e-mail : tu recevras un lien pour en choisir un nouveau.">
      <ForgotPasswordForm />
    </AuthCard>
  );
}
