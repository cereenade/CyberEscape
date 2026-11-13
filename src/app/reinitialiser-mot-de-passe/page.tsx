import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";
import { ResetPassword } from "@/components/auth/ResetPassword";

export const metadata: Metadata = { title: "Nouveau mot de passe" };

export default function ResetPasswordPage() {
  return (
    <AuthCard title="Nouveau mot de passe" subtitle="Choisis un nouveau mot de passe pour ton compte.">
      <ResetPassword />
    </AuthCard>
  );
}
