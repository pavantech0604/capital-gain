import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardIndexPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch verified profile from database
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role, is_active")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    redirect("/account-not-configured");
  }

  if (!profile.is_active) {
    redirect("/account-disabled");
  }

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
