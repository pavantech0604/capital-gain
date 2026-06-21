import { MainNav } from "./main-nav";
import { Footer } from "./footer";
import { ShaderBackground } from "@/components/effects/shader-background";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-bg overflow-x-hidden">
      {/* Global persistent WebGL background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ShaderBackground />
      </div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <MainNav />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
