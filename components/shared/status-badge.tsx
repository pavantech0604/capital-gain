import React from "react";

export type StatusType =
  | "new"
  | "called"
  | "not_interested"
  | "follow_up_later"
  | "interested_rm_required"
  | "rm_contacted"
  | "active_trader"
  | "lost"
  | "pending_verification"
  | "approved"
  | "rejected"
  | "active"
  | "inactive";

interface StatusBadgeProps {
  status: StatusType | string;
  size?: "sm" | "md";
}

const statusConfig: Record<
  string,
  { label: string; bg: string; text: string; border: string; dot: string }
> = {
  // Lead statuses
  new: {
    label: "New Lead",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/30",
    dot: "bg-blue-400",
  },
  called: {
    label: "Called",
    bg: "bg-slate-500/10",
    text: "text-slate-300",
    border: "border-slate-500/30",
    dot: "bg-slate-400",
  },
  not_interested: {
    label: "Not Interested",
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    border: "border-rose-500/30",
    dot: "bg-rose-400",
  },
  follow_up_later: {
    label: "Follow Up Later",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
    dot: "bg-amber-400",
  },
  interested_rm_required: {
    label: "Interested (RM Required)",
    bg: "bg-purple-500/15",
    text: "text-purple-300",
    border: "border-purple-500/40",
    dot: "bg-purple-400 animate-pulse",
  },
  rm_contacted: {
    label: "RM Contacted",
    bg: "bg-cyan-500/10",
    text: "text-cyan-300",
    border: "border-cyan-500/30",
    dot: "bg-cyan-400",
  },
  active_trader: {
    label: "Active Trader",
    bg: "bg-emerald-500/15",
    text: "text-emerald-300",
    border: "border-emerald-500/40",
    dot: "bg-emerald-400",
  },
  lost: {
    label: "Lost",
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/30",
    dot: "bg-red-400",
  },

  // Payment statuses
  pending_verification: {
    label: "Pending Verification",
    bg: "bg-amber-500/15",
    text: "text-amber-300",
    border: "border-amber-500/40",
    dot: "bg-amber-400 animate-pulse",
  },
  approved: {
    label: "Verified & Approved",
    bg: "bg-emerald-500/15",
    text: "text-emerald-300",
    border: "border-emerald-500/40",
    dot: "bg-emerald-400",
  },
  rejected: {
    label: "Rejected / Fake",
    bg: "bg-red-500/15",
    text: "text-red-300",
    border: "border-red-500/40",
    dot: "bg-red-400",
  },

  // Trader status
  active: {
    label: "Active",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  inactive: {
    label: "Inactive",
    bg: "bg-slate-500/10",
    text: "text-slate-400",
    border: "border-slate-500/30",
    dot: "bg-slate-400",
  },
};

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config =
    statusConfig[status] || {
      label: status.replace(/_/g, " "),
      bg: "bg-slate-500/10",
      text: "text-slate-300",
      border: "border-slate-500/30",
      dot: "bg-slate-400",
    };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${
        config.bg
      } ${config.text} ${config.border} ${
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span className="capitalize">{config.label}</span>
    </span>
  );
}
