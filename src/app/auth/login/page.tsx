"use client";

import { useState } from "react";
import Link from "next/link";
import { FaUser, FaLock } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";

import { MotionDiv, MotionForm, MotionP } from "@/lib/motion";

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

// Framer Motion dinamik import

// Animasyon varyantları
const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const formItemVariant = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 100,
		},
	},
};

const Login = () => {
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

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
							Giriş Yap
						</CardTitle>
						<CardDescription className="text-center text-gray-600 mt-2">
							Hesabınıza giriş yaparak sistemi kullanmaya başlayın.
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
						</MotionDiv>

						<MotionDiv
							className="flex items-center justify-between"
							variants={formItemVariant}
						>
							<div className="flex items-center space-x-2">
								<Checkbox id="remember" className="h-5 w-5" />
								<Label htmlFor="remember" className="text-sm text-gray-600">
									Beni hatırla
								</Label>
							</div>
							<Link
								href="/auth/forgot-password"
								className="text-sm text-primary hover:underline"
							>
								Şifremi unuttum
							</Link>
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
									"Giriş Yap"
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
						Hesabınız yok mu?{" "}
						<Link
							href="/auth/register"
							className="text-primary font-medium hover:underline"
						>
							Kayıt ol
						</Link>
					</MotionP>
				</CardFooter>
			</Card>
		</MotionDiv>
	);
};

export default Login;
