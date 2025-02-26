"use client";

import { useState } from "react";
import Link from "next/link";
import { MotionDiv, MotionForm, MotionP } from "@/lib/motion";
import { staggerContainer, formItemVariant } from "@/lib/motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";

// Shadcn UI bileşenleri
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const Register = () => {
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Burada kayıt işlemi yapılacak
		// Örnek API çağrısı: await fetch('/api/auth/register', {...});

		// Demo için 1 saniye bekleme
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	};

	return (
		<MotionDiv initial="hidden" animate="visible" variants={staggerContainer}>
			<Card className="w-full shadow-lg border-0 shadow-zinc-200">
				<CardHeader className="space-y-1">
					<MotionDiv variants={formItemVariant}>
						<CardTitle className="text-3xl font-bold text-center">
							Hesap Oluştur
						</CardTitle>
						<CardDescription className="text-center text-gray-600 mt-2">
							Invenza Otel Stok Yönetim sistemine kayıt olun.
						</CardDescription>
					</MotionDiv>
				</CardHeader>

				<CardContent>
					<MotionForm
						onSubmit={handleSubmit}
						className="space-y-6"
						variants={staggerContainer}
					>
						<MotionDiv className="space-y-4" variants={formItemVariant}>
							<div className="relative">
								<div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
									<FaUser size={18} />
								</div>
								<Input
									type="text"
									placeholder="Adınız Soyadınız"
									className="pl-12 py-6 text-base"
									required
								/>
							</div>

							<div className="relative">
								<div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
									<FaEnvelope size={18} />
								</div>
								<Input
									type="email"
									placeholder="E-posta Adresiniz"
									className="pl-12 py-6 text-base"
									required
								/>
							</div>

							<div className="relative">
								<div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
									<FaLock size={18} />
								</div>
								<Input
									type="password"
									placeholder="Şifreniz"
									className="pl-12 py-6 text-base"
									required
								/>
							</div>

							<div className="relative">
								<div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
									<FaLock size={18} />
								</div>
								<Input
									type="password"
									placeholder="Şifrenizi Tekrar Girin"
									className="pl-12 py-6 text-base"
									required
								/>
							</div>
						</MotionDiv>

						<MotionDiv
							className="flex items-center space-x-2"
							variants={formItemVariant}
						>
							<Checkbox id="terms" className="mt-1" required />
							<Label htmlFor="terms" className="text-sm mt-1 text-gray-600">
								<span>
									<Link href="/terms" className="text-primary hover:underline">
										Kullanım Şartları
									</Link>{" "}
									ve{" "}
									<Link
										href="/privacy"
										className="text-primary hover:underline"
									>
										Gizlilik Politikası
									</Link>
									nı kabul ediyorum.
								</span>
							</Label>
						</MotionDiv>

						<MotionDiv variants={formItemVariant}>
							<Button
								type="submit"
								variant="default"
								className="w-full py-6 text-base font-medium"
								size="lg"
								disabled={isLoading}
							>
								{isLoading ? (
									<>
										<BiLoaderAlt className="mr-2 h-5 w-5 animate-spin" />
										Yükleniyor...
									</>
								) : (
									"Kayıt Ol"
								)}
							</Button>
						</MotionDiv>
					</MotionForm>
				</CardContent>

				<CardFooter>
					<MotionP
						className="text-center text-sm text-muted-foreground w-full"
						variants={formItemVariant}
					>
						Zaten bir hesabınız var mı?{" "}
						<Link
							href="/auth/login"
							className="text-primary font-medium hover:underline"
						>
							Giriş yap
						</Link>
					</MotionP>
				</CardFooter>
			</Card>
		</MotionDiv>
	);
};

export default Register;
