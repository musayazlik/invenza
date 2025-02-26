import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Activity,
	Package,
	ShoppingCart,
	AlertCircle,
	ArrowUpRight,
	ArrowDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Panel = () => {
	// Demo verileri
	const stats = [
		{
			title: "Toplam Ürün",
			value: "3,240",
			change: "+12%",
			icon: Package,
			trend: "up",
		},
		{
			title: "Stok Uyarısı",
			value: "24",
			change: "-2",
			icon: AlertCircle,
			trend: "down",
		},
		{
			title: "Günlük Hareket",
			value: "142",
			change: "+24%",
			icon: ShoppingCart,
			trend: "up",
		},
		{
			title: "Aktivite",
			value: "564",
			change: "+7%",
			icon: Activity,
			trend: "up",
		},
	];

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">Panel</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
				{stats.map((stat) => (
					<Card key={stat.title}>
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								{stat.title}
							</CardTitle>
							<div
								className={`p-2 rounded-full ${
									stat.title === "Stok Uyarısı" ? "bg-red-100" : "bg-blue-100"
								}`}
							>
								<stat.icon
									className={`h-4 w-4 ${
										stat.title === "Stok Uyarısı"
											? "text-red-500"
											: "text-blue-500"
									}`}
								/>
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stat.value}</div>
							<p
								className={`flex items-center text-xs ${
									stat.trend === "up" ? "text-green-500" : "text-red-500"
								}`}
							>
								{stat.trend === "up" ? (
									<ArrowUpRight className="h-3 w-3 mr-1" />
								) : (
									<ArrowDownRight className="h-3 w-3 mr-1" />
								)}
								{stat.change}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Son Hareketler</CardTitle>
						<CardDescription>Son 24 saatteki stok hareketleri</CardDescription>
					</CardHeader>
					<CardContent>
						{/* İçerik burada olacak */}
						<div className="space-y-2">
							{Array.from({ length: 5 }).map((_, i) => (
								<div
									key={`movement-${Date.now() - i * 3600000}`}
									className="flex items-center justify-between border-b pb-2"
								>
									<div>
										<p className="text-sm font-medium">Ürün {i + 1}</p>
										<p className="text-xs text-muted-foreground">
											{i % 2 === 0 ? "Giriş" : "Çıkış"} yapıldı
										</p>
									</div>
									<div className="text-sm">
										{new Date(Date.now() - i * 3600000).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Stok Alarmları</CardTitle>
						<CardDescription>Stok seviyesi kritik olan ürünler</CardDescription>
					</CardHeader>
					<CardContent>
						{/* İçerik burada olacak */}
						<div className="space-y-2">
							{Array.from({ length: 5 }).map((_, i) => (
								<div
									key={`stock-alert-${Date.now() - i * 3600000}`}
									className="flex items-center justify-between border-b pb-2"
								>
									<div>
										<p className="text-sm font-medium">Kritik Ürün {i + 1}</p>
										<p className="text-xs text-red-500">
											Stok: {i + 1} birim kaldı
										</p>
									</div>
									<Button variant="outline" size="sm" className="text-xs">
										Sipariş Ver
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Panel;
