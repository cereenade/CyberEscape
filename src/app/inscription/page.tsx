import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = { title: "Créer un compte" };

export default function SignupPage() {
  return (
    <AuthCard
      title="Créer un compte"
      subtitle="Gratuit. Ta progression actuelle sera automatiquement ajoutée à ton compte."
    >
      <SignupForm />
    </AuthCard>
  );
}
