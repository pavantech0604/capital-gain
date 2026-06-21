"use client";

import { ComingSoon } from "@/components/ui/coming-soon";

export default function SettingsPage() {
  return (
    <ComingSoon
      title="Account Settings"
      description="Configure notification preferences, manage two-factor authentication, update communication channels, and customize your dashboard experience."
      backHref="/dashboard"
      backLabel="Back to Dashboard"
    />
  );
}
