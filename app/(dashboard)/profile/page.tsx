"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Upload,
  AlertTriangle,
  FileCheck,
  Key,
  Download,
  Info,
} from "lucide-react";
import { GlassCard, Reveal } from "@/components/ui/motion";
import { BRAND } from "@/lib/constants";

export default function ProfilePage() {
  const [kycStep, setKycStep] = useState(2); // 1: Info, 2: Document, 3: Completed
  const [pan, setPan] = useState("ABCDE1234F");
  const [riskScore, setRiskScore] = useState("Moderate");
  const [isEditing, setIsEditing] = useState(false);

  const [fullName, setFullName] = useState("Rohan Sharma");
  const [phone, setPhone] = useState("9876543210");

  const declarations = [
    {
      title: "Advisory Terms & Disclosures",
      signedAt: "May 20, 2026 at 10:15 AM",
      ip: "192.168.1.45",
    },
    {
      title: "Suitability Assessment Consent",
      signedAt: "May 20, 2026 at 10:18 AM",
      ip: "192.168.1.45",
    },
  ];

  const handleKycSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setKycStep(3);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <header className="border-b border-outline-variant/30 pb-6 flex justify-between items-start sm:items-end flex-wrap gap-4">
        <div>
          <h2 className="text-display-md text-on-surface font-bold">Profile &amp; Settings</h2>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Manage your personal data, KYC documentation, and advisory compliance statuses.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-label-sm font-bold uppercase tracking-wider">KYC Tier 2 Active</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Personal details & Declarations */}
        <div className="lg:col-span-7 space-y-8">
          {/* Personal Details */}
          <GlassCard className="p-6 border border-white/5" hover={false}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-headline-md font-bold text-on-surface">Personal Account Details</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-primary hover:underline text-label-sm font-bold transition-all"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-label-sm text-on-surface-variant uppercase font-bold block ml-1">
                    Full Name (As per PAN)
                  </label>
                  <input
                    disabled={!isEditing}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl p-3.5 text-body-md text-on-surface focus:outline-none focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-label-sm text-on-surface-variant uppercase font-bold block ml-1">
                    Aadhaar Linked Phone
                  </label>
                  <input
                    disabled={!isEditing}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl p-3.5 text-body-md text-on-surface focus:outline-none focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-label-sm text-on-surface-variant uppercase font-bold block ml-1">
                    PAN Card Number
                  </label>
                  <input
                    disabled
                    value={pan}
                    className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl p-3.5 text-body-md text-on-surface-variant/80 cursor-not-allowed font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-label-sm text-on-surface-variant uppercase font-bold block ml-1">
                    Risk Suitability Profile
                  </label>
                  <div className="w-full bg-surface-container-high p-3.5 rounded-xl border border-outline-variant/20 text-body-md text-primary font-bold flex items-center justify-between">
                    <span>{riskScore} Risk Tolerance</span>
                    <button
                      onClick={() => alert("Risk Assessment Quiz will be available soon. Your current risk profile is: " + riskScore)}
                      className="text-tertiary hover:underline text-label-sm font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Retake Quiz
                    </button>
                  </div>
                </div>
              </div>

              {isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-primary text-on-primary font-bold px-6 py-2.5 rounded-xl text-label-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20"
                >
                  Save Changes
                </button>
              )}
            </form>
          </GlassCard>

          {/* Consent History */}
          <GlassCard className="p-6 border border-white/5" hover={false}>
            <div className="flex items-center gap-2.5 mb-6 text-primary">
              <FileCheck className="w-6 h-6" />
              <h3 className="text-headline-md font-bold text-on-surface">Signed Declarations</h3>
            </div>
            <div className="divide-y divide-white/5 space-y-4">
              {declarations.map((dec, index) => (
                <div key={index} className="flex justify-between items-center py-3 first:pt-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-body-md text-on-surface font-semibold">{dec.title}</p>
                    <p className="text-label-sm text-on-surface-variant">
                      IP Address: <span className="font-mono">{dec.ip}</span> • Signed on {dec.signedAt}
                    </p>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Column: KYC Upload & Subscription details */}
        <div className="lg:col-span-5 space-y-8">
          {/* KYC Status & upload wizard */}
          <GlassCard className="p-6 border border-white/5" hover={false}>
            <h3 className="text-headline-md font-bold text-on-surface mb-6">KYC Suitability Status</h3>

            {kycStep === 2 && (
              <form onSubmit={handleKycSubmit} className="space-y-6">
                <div className="p-4 rounded-xl bg-tertiary/10 border border-tertiary/20 flex gap-3">
                  <Info className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
                  <p className="text-body-sm text-on-surface-variant">
                    Please upload your self-attested PAN card PDF/Image to unlock final advisory access.
                  </p>
                </div>

                <div className="border-2 border-dashed border-outline-variant/30 rounded-xl p-8 text-center bg-surface-container-high/20 hover:bg-surface-container-high/40 hover:border-primary/40 transition-all cursor-pointer group relative">
                  <Upload className="w-8 h-8 text-on-surface-variant group-hover:text-primary transition-colors mx-auto mb-3" />
                  <p className="text-body-md font-bold text-on-surface mb-1">Click or drag files here</p>
                  <p className="text-label-sm text-on-surface-variant">
                    PDF, PNG, JPG up to 5MB
                  </p>
                  <input
                    required
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold text-label-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20"
                >
                  Submit for Verification
                </button>
              </form>
            )}

            {kycStep === 3 && (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-primary/20 text-primary border border-primary/30 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(78,222,163,0.2)]">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-headline-md font-bold text-on-surface">Documents Submitted</h4>
                  <p className="text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                    Our compliance desk is auditing your PAN card. The audit typically takes 2 hours.
                  </p>
                </div>
              </div>
            )}
          </GlassCard>

          {/* Subscription Status details */}
          <GlassCard className="p-6 border border-white/5" hover={false}>
            <h3 className="text-headline-md font-bold text-on-surface mb-6">Subscription Status</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-body-md text-on-surface font-semibold">Active Tier</p>
                  <p className="text-headline-md text-primary font-bold mt-0.5">Equity Pro access</p>
                </div>
                <div className="px-3 py-1 bg-primary/15 rounded-xl border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-wider">
                  ACTIVE
                </div>
              </div>

              <div className="space-y-3 border-t border-outline-variant/20 pt-6">
                <div className="flex justify-between text-body-sm">
                  <span className="text-on-surface-variant">Billing Period</span>
                  <span className="text-on-surface font-semibold">Annual Plan</span>
                </div>
                <div className="flex justify-between text-body-sm">
                  <span className="text-on-surface-variant">Renewal Date</span>
                  <span className="text-on-surface font-semibold">Dec 15, 2026</span>
                </div>
                <div className="flex justify-between text-body-sm">
                  <span className="text-on-surface-variant">Renewal Price</span>
                  <span className="text-on-surface font-semibold">₹1,76,998.82/yr</span>
                </div>
              </div>

              <div className="border-t border-outline-variant/20 pt-6">
                <h4 className="text-label-sm text-on-surface-variant uppercase font-bold tracking-wider mb-3">
                  Recent Invoices
                </h4>
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container border border-outline-variant/30 hover:border-primary/30 transition-all text-body-sm cursor-pointer group">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-on-surface group-hover:text-primary transition-colors">
                      Invoice #INV-2026-004
                    </span>
                  </div>
                  <Download className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
