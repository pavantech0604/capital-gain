"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ShieldCheck, Bell, User, Loader2 } from "lucide-react";
import { RoleSidebar, UserRole } from "./role-sidebar";
import { BRAND } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";

export interface UserProfileData {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}

interface RoleLayoutShellProps {
  role: UserRole;
  initialProfile?: UserProfileData;
  children: React.ReactNode;
}

export function RoleLayoutShell({ role, initialProfile, children }: RoleLayoutShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfileData>(
    initialProfile || {
      name: role === "admin" ? "Super Admin" : role === "telecaller" ? "Lead Specialist" : "Relationship Mgr",
      email: `${role}@capitalgrow.in`,
      role,
    }
  );

  const supabase = createClient();

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, email, role")
          .eq("id", user.id)
          .single();

        if (profile) {
          setUserProfile({
            name: profile.full_name || user.email?.split("@")[0] || "Staff",
            email: user.email || profile.email,
            role: profile.role || role,
          });
        }
      }
    }
    if (!initialProfile?.name) {
      loadUser();
    }
  }, [role, initialProfile, supabase]);

  return (
    <div className="min-h-screen bg-[#070F1B] text-slate-100 flex flex-col font-sans">
      <RoleSidebar
        role={role}
        userName={userProfile.name}
        userEmail={userProfile.email}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-30 h-16 bg-[#0B192C]/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 sm:px-8 lg:ml-[270px]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Open navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Live System
            </span>
            <span className="hidden sm:inline-block text-xs text-slate-500">•</span>
            <span className="hidden sm:inline-block text-xs text-slate-400 font-mono">
              KYC / P&L Verification Engine
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-[#112240] px-3 py-1.5 rounded-full border border-slate-700/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-300 font-mono uppercase">
              {role.replace("_", " ")}
            </span>
          </div>

          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs">
            {userProfile.name?.substring(0, 1) || "U"}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="lg:ml-[270px] pt-16 flex-1 flex flex-col">
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto flex-1">
          {children}
        </div>

        <footer className="mt-auto border-t border-slate-800/60 py-4 px-6 text-center text-xs text-slate-500 font-mono">
          Capital Grow Equity Research Desk • Institutional Operations Portal
        </footer>
      </main>
    </div>
  );
}
