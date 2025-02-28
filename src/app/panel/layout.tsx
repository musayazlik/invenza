import Header from "@/components/panel/layout/Header";
import Footer from "@/components/panel/layout/Footer";
import { Metadata } from "next";

interface PanelLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Invenza Chat Panel",
  description: "Invenza Chat Panel",
};

export default function PanelLayout({ children }: PanelLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">{children}</main>

      {/* Footer (Chat kısmını içerir) */}
      <Footer />
    </div>
  );
}
