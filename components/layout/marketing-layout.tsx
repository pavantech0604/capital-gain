import { MainNav } from "./main-nav";
import { Footer } from "./footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNav />
      {/* pt-[128px] = 24px floating top margin + 80px nav + 24px spacing */}
      <main className="pt-[128px] flex-1">{children}</main>
      <Footer />
    </>
  );
}
