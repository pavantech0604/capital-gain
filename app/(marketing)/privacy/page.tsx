import { Metadata } from "next";
import { ComingSoon } from "@/components/ui/coming-soon";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <ComingSoon
      title="Privacy Policy"
      description="Our comprehensive privacy policy is being finalized by our legal and compliance team. It will detail how we collect, use, and protect your personal data in accordance with applicable regulations."
      backHref="/"
      backLabel="Back to Home"
    />
  );
}
