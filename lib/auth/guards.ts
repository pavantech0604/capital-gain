import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { UserRole } from "@/db/schema";

export interface AuthenticatedUserProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  role: UserRole;
  is_active: boolean;
}

/**
 * Validates that a user is logged in via Supabase Auth,
 * has a valid active profile in public.profiles.
 */
export async function requireAuthenticatedUser(): Promise<AuthenticatedUserProfile> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, full_name, email, phone, role, is_active")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    redirect("/account-not-configured");
  }

  if (!profile.is_active) {
    redirect("/account-disabled");
  }

  return profile as AuthenticatedUserProfile;
}

/**
 * Validates that the logged-in user possesses the required role.
 * If user has a different role, securely redirects them to their own authorized dashboard.
 */
export async function requireRole(expectedRole: UserRole): Promise<AuthenticatedUserProfile> {
  const profile = await requireAuthenticatedUser();

  if (profile.role !== expectedRole) {
    // Redirect to their respective authorized dashboard
    if (profile.role === "admin") {
      redirect("/admin/dashboard");
    } else if (profile.role === "telecaller") {
      redirect("/telecaller/dashboard");
    } else if (profile.role === "relationship_manager") {
      redirect("/rm/dashboard");
    } else {
      redirect("/unauthorized");
    }
  }

  return profile;
}
