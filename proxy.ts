import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ROLE_DASHBOARDS: Record<string, string> = {
  admin: "/admin/dashboard",
  telecaller: "/telecaller/dashboard",
  relationship_manager: "/rm/dashboard",
};

const PROTECTED_PREFIXES = ["/admin", "/telecaller", "/rm", "/dashboard", "/api/admin", "/api/telecaller", "/api/rm"];
const PUBLIC_PREFIXES = [
  "/login",
  "/contact",
  "/auth",
  "/forgot-password",
  "/unauthorized",
  "/account-disabled",
  "/account-not-configured",
];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const url = request.nextUrl.clone();

  // Strip cache-bust parameter if present
  if (url.searchParams.has("cache-bust")) {
    url.searchParams.delete("cache-bust");
    return NextResponse.rewrite(url);
  }

  const { pathname } = request.nextUrl;
  const isProtectedRoute = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  // Initialize Supabase Client with SSR cookie handlers
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-supabase-url.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key",
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Get user session via getUser (official security best practice)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is on login page and already logged in, redirect them to their respective dashboard
  if (pathname === "/login" && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, is_active")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.redirect(new URL("/account-not-configured", request.url));
    }
    if (!profile.is_active) {
      return NextResponse.redirect(new URL("/account-disabled", request.url));
    }

    const destination = ROLE_DASHBOARDS[profile.role] || "/dashboard";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  // If route is protected and user is not authenticated
  if (isProtectedRoute && !user) {
    const contactUrl = new URL("/contact", request.url);
    contactUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(contactUrl);
  }

  // If route is protected and user is authenticated, verify profile and role
  if (isProtectedRoute && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, is_active")
      .eq("id", user.id)
      .single();

    // If profile row doesn't exist yet
    if (!profile) {
      return NextResponse.redirect(new URL("/account-not-configured", request.url));
    }

    // Inactive employee cannot access dashboards
    if (!profile.is_active) {
      return NextResponse.redirect(new URL("/account-disabled", request.url));
    }

    const role = profile.role;
    const properDashboard = ROLE_DASHBOARDS[role] || "/dashboard";

    // /admin/* -> only admin
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL(properDashboard, request.url));
    }

    // /telecaller/* -> only telecaller
    if (pathname.startsWith("/telecaller") && role !== "telecaller") {
      return NextResponse.redirect(new URL(properDashboard, request.url));
    }

    // /rm/* -> only relationship_manager
    if (pathname.startsWith("/rm") && role !== "relationship_manager") {
      return NextResponse.redirect(new URL(properDashboard, request.url));
    }
  }

  return response;
}

export default proxy;

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
