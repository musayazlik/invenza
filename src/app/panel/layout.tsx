import Header from "@/components/panel/Header";
import Footer from "@/components/panel/Footer";

interface PanelLayoutProps {
	children: React.ReactNode;
}

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
