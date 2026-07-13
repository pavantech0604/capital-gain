import { Metadata } from "next";
import { ComingSoon } from "@/components/ui/coming-soon";

export const metadata: Metadata = {
  title: "Refund Policy",
};

export default function RefundPage() {
  return (
    <ComingSoon
      title="Refund Policy"
      description="Our refund and cancellation policy is being finalized. It will detail the process for subscription cancellations, refund eligibility criteria, and timelines as per corporate guidelines."
      backHref="/"
      backLabel="Back to Home"
    />
  );
}
