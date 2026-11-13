import type { Metadata } from "next";
import { AccountView } from "@/components/auth/AccountView";
import { AuthCard } from "@/components/auth/AuthCard";
import { AUTH_ENABLED } from "@/lib/supabase/config";

export const metadata: Metadata = { title: "Mon compte" };

export default function AccountPage() {
  if (!AUTH_ENABLED) {
    return (
      <AuthCard title="Mon compte">
        <></>
      </AuthCard>
    );
  }
  return <AccountView />;
}
