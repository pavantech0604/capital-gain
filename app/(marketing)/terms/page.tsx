import { Metadata } from "next";
import { ComingSoon } from "@/components/ui/coming-soon";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <ComingSoon
      title="Terms of Service"
      description="Our terms of service document is being prepared by our legal team. It will outline the terms and conditions governing the use of our SEBI-registered research advisory services."
      backHref="/"
      backLabel="Back to Home"
    />
  );
}
