import React from "react";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  icon: LucideIcon;
  variant?: "gold" | "teal" | "blue" | "emerald" | "amber" | "default";
}

const variantStyles = {
  gold: {
    border: "border-amber-500/20 hover:border-amber-500/40",
    glow: "bg-amber-500/5",
    iconBg: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    badge: "text-amber-300",
  },
  teal: {
    border: "border-teal-500/20 hover:border-teal-500/40",
    glow: "bg-teal-500/5",
    iconBg: "bg-teal-500/10 text-teal-400 border border-teal-500/20",
    badge: "text-teal-300",
  },
  blue: {
    border: "border-blue-500/20 hover:border-blue-500/40",
    glow: "bg-blue-500/5",
    iconBg: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    badge: "text-blue-300",
  },
  emerald: {
    border: "border-emerald-500/20 hover:border-emerald-500/40",
    glow: "bg-emerald-500/5",
    iconBg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    badge: "text-emerald-300",
  },
  amber: {
    border: "border-orange-500/20 hover:border-orange-500/40",
    glow: "bg-orange-500/5",
    iconBg: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
    badge: "text-orange-300",
  },
  default: {
    border: "border-slate-800 hover:border-slate-700",
    glow: "bg-slate-900/40",
    iconBg: "bg-slate-800 text-slate-300 border border-slate-700",
    badge: "text-slate-400",
  },
};

export function KpiCard({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  variant = "default",
}: KpiCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#112240] p-5 border ${styles.border} ${styles.glow} transition-all duration-300 hover:translate-y-[-2px] shadow-lg`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
              {value}
            </h3>
            {trend && (
              <span
                className={`text-xs font-bold font-mono ${
                  trend.isPositive ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {trend.isPositive ? "▲" : "▼"} {trend.value}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-400 pt-0.5">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${styles.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
