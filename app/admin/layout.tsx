import { RoleLayoutShell } from "@/components/role-nav/role-layout-shell";
import { requireRole } from "@/lib/auth/guards";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireRole("admin");

  return (
    <RoleLayoutShell
      role="admin"
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
