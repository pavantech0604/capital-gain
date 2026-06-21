"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  AlertTriangle,
  Info,
  ShieldCheck,
  Landmark,
  QrCode,
  Copy,
  Check,
  Smartphone,
  Mail,
  Zap,
} from "lucide-react";
import { GlassCard, Reveal } from "@/components/ui/motion";
import { BRAND } from "@/lib/constants";

export default function BillingPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <header className="border-b border-outline-variant/30 pb-6">
        <h2 className="text-display-md text-on-surface font-bold">Billing &amp; Subscriptions</h2>
        <p className="text-body-sm text-on-surface-variant mt-1">
          Manage your payments, invoicing, and subscription renewals.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Order Summary & Warnings */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Order Summary Card */}
          <GlassCard className="p-6 border border-white/5" hover={false}>
            <div className="flex items-center gap-2 mb-6 text-primary">
              <CreditCard className="w-6 h-6" />
              <h3 className="text-headline-md font-bold">Order Summary</h3>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-start pb-4 border-b border-white/5">
                <div>
                  <p className="text-body-md text-on-surface font-bold">
                    Institutional Alpha Research
                  </p>
                  <p className="text-body-sm text-on-surface-variant mt-0.5">
                    Annual Subscription • 12 Months Access
                  </p>
                </div>
                <p className="text-label-md text-primary font-bold">₹1,49,999</p>
              </div>
              <div className="space-y-2 text-body-sm">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span className="text-on-surface font-mono">₹1,49,999.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">GST (18%)</span>
                  <span className="text-on-surface font-mono">₹26,999.82</span>
                </div>
              </div>
              <div className="pt-4 border-t border-primary/20 flex justify-between items-center">
                <span className="text-headline-md text-on-surface font-bold">Total Payable</span>
                <span className="text-display-md text-primary font-bold font-mono">
                  ₹1,76,998.82
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Fraud Warning Card */}
          <div className="bg-error-container/10 border border-error/20 p-6 rounded-2xl flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-error shrink-0 mt-0.5" />
            <div>
              <h3 className="text-headline-md text-error font-bold mb-1">Fraud Warning</h3>
              <p className="text-body-sm text-on-surface leading-relaxed">
                Payments made to personal accounts/UPIs are{" "}
                <span className="font-bold underline">NOT responsible for fraud</span>. Ensure you
                are transferring funds only to the official corporate entities listed on this page.
              </p>
            </div>
          </div>

          {/* KYC Link */}
          <GlassCard className="p-4 flex items-center justify-between border border-tertiary/20" hover={false}>
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-tertiary" />
              <p className="text-label-sm text-on-surface-variant">
                Access granted strictly post-KYC verification.
              </p>
            </div>
            <Link
              href="/dashboard/profile"
              className="text-tertiary font-bold hover:underline text-label-sm"
            >
              Complete KYC →
            </Link>
          </GlassCard>
        </div>

        {/* Right Column: Payment Instructions */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-3">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-label-sm uppercase font-bold tracking-wider">
                Secure Payment Channel
              </span>
            </div>
            <h1 className="text-display-md text-on-surface font-bold">Official Payment Channel</h1>
            <p className="text-body-lg text-on-surface-variant mt-1">
              Transfer funds securely via NEFT/RTGS or UPI to our Official Research Account.
            </p>
          </div>

          {/* Bank Details Section */}
          <section className="glass-card rounded-2xl overflow-hidden border border-white/5">
            <div className="bg-surface-container-high p-4 border-b border-white/5 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-primary" />
              <h3 className="text-label-sm text-on-surface font-bold uppercase tracking-wider">
                Bank Transfer Details (NEFT / RTGS / IMPS)
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-primary/5 to-transparent">
              <div className="space-y-1">
                <label className="text-label-sm text-on-surface-variant uppercase tracking-wider block">
                  Account Name
                </label>
                <p className="text-headline-md text-on-surface font-semibold leading-tight">
                  {BRAND.name.toUpperCase()} RESEARCH ANALYST PVT LTD
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-label-sm text-on-surface-variant uppercase tracking-wider block">
                  Account Number
                </label>
                <div className="flex items-center gap-2">
                  <p className="text-headline-md text-on-surface font-mono font-semibold">
                    926020054321098
                  </p>
                  <button
                    onClick={() => copyToClipboard("926020054321098", "acc_num")}
                    className="text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {copiedField === "acc_num" ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-label-sm text-on-surface-variant uppercase tracking-wider block">
                  IFSC Code
                </label>
                <div className="flex items-center gap-2">
                  <p className="text-headline-md text-on-surface font-mono font-semibold">
                    UTIB0000123
                  </p>
                  <button
                    onClick={() => copyToClipboard("UTIB0000123", "ifsc")}
                    className="text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {copiedField === "ifsc" ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-label-sm text-on-surface-variant uppercase tracking-wider block">
                  Bank &amp; Branch
                </label>
                <p className="text-body-md text-on-surface leading-snug">
                  Axis Bank, Bandra Kurla Complex, Mumbai
                </p>
              </div>
            </div>
          </section>

          {/* UPI ID Section */}
          <section className="glass-card rounded-2xl overflow-hidden border border-white/5">
            <div className="bg-surface-container-high p-4 border-b border-white/5 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-secondary" />
              <h3 className="text-label-sm text-on-surface font-bold uppercase tracking-wider">
                Official UPI Channel
              </h3>
            </div>
            <div className="p-6 flex flex-col md:flex-row items-center gap-8">
            <div className="bg-white p-2 rounded-xl shrink-0 w-32 h-32 relative">
              <Image src="/qr_code.png" alt="Official UPI QR Code" fill sizes="128px" className="object-contain p-1" />
            </div>
              <div className="flex-grow text-center md:text-left space-y-3">
                <label className="text-label-sm text-on-surface-variant uppercase tracking-wider block">
                  Transfer via UPI ID
                </label>
                <div className="inline-flex items-center gap-3 bg-canvas px-4 py-2 rounded-xl border border-white/10 group hover:border-primary transition-all">
                  <span className="text-headline-md text-primary font-bold">
                    capitalgain.official@axis
                  </span>
                  <button
                    onClick={() => copyToClipboard("capitalgain.official@axis", "upi")}
                    className="text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {copiedField === "upi" ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-body-sm text-on-surface-variant italic">
                  Works with Google Pay, PhonePe, Paytm, and all banking apps.
                </p>
              </div>
            </div>
          </section>

          {/* Instruction Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GlassCard className="p-4 flex flex-col gap-2 border border-white/5" hover={false}>
              <Smartphone className="w-5 h-5 text-primary" />
              <p className="text-label-sm text-on-surface font-bold">
                1. Save Confirmation Screenshot
              </p>
            </GlassCard>
            <GlassCard className="p-4 flex flex-col gap-2 border border-white/5" hover={false}>
              <Mail className="w-5 h-5 text-primary" />
              <p className="text-label-sm text-on-surface font-bold">
                2. Email UTR to {BRAND.email.compliance}
              </p>
            </GlassCard>
            <GlassCard className="p-4 flex flex-col gap-2 border border-white/5" hover={false}>
              <Zap className="w-5 h-5 text-primary" />
              <p className="text-label-sm text-on-surface font-bold">
                3. Activation in 24-48 Hours
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
