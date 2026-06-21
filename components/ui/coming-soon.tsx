"use client";

import Link from "next/link";
import { Construction, ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";

interface ComingSoonProps {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
}

/**
 * Reusable "Coming Soon" stub page component.
 * Used for routes that are linked but not yet implemented.
 */
export function ComingSoon({
  title,
  description = "This page is currently under development and will be available soon.",
  backHref = "/",
  backLabel = "Go Back",
}: ComingSoonProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg"
      >
        <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Construction className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-display-md text-on-surface mb-4">{title}</h1>
        <p className="text-body-lg text-on-surface-variant mb-10 max-w-md mx-auto">
          {description}
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href={backHref}
            className="flex items-center gap-2 border border-outline-variant/30 text-on-surface px-6 py-3 rounded-xl text-label-md hover:bg-surface-container-high transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            {backLabel}
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl text-label-md hover:brightness-110 transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            Homepage
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
