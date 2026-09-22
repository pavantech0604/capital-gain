import { RoleLayoutShell } from "@/components/role-nav/role-layout-shell";
import { requireRole } from "@/lib/auth/guards";

export default async function RelationshipManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireRole("relationship_manager");

  return (
    <RoleLayoutShell
      role="relationship_manager"
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
