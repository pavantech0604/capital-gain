import { RoleLayoutShell } from "@/components/role-nav/role-layout-shell";
import { requireRole } from "@/lib/auth/guards";

export default async function TelecallerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireRole("telecaller");

  return (
    <RoleLayoutShell
      role="telecaller"
      initialProfile={{
        id: profile.id,
        name: profile.full_name,
        email: profile.email,
        role: profile.role,
      }}
    >
      {children}
    </RoleLayoutShell>
  );
}
