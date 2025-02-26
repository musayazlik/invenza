import { type NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import db from "@/lib/db";
import { z } from "zod";

// Doğrulama şeması
const registerSchema = z.object({
	name: z.string().min(2, { message: "İsim en az 2 karakter olmalıdır" }),
	email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
	password: z
		.string()
		.min(8, { message: "Şifre en az 8 karakter olmalıdır" })
		.regex(/[a-z]/, { message: "Şifre en az bir küçük harf içermelidir" })
		.regex(/[A-Z]/, { message: "Şifre en az bir büyük harf içermelidir" })
		.regex(/[0-9]/, { message: "Şifre en az bir rakam içermelidir" }),
});

export async function POST(req: NextRequest) {
	try {
		// İstek gövdesini al
		const body = await req.json();

		// Formdan gelen verileri doğrula
		const validationResult = registerSchema.safeParse(body);

		// Doğrulama hataları varsa hata mesajlarını döndür
		if (!validationResult.success) {
			const errors = validationResult.error.errors.map((error) => ({
				path: error.path.join("."),
				message: error.message,
			}));

			return NextResponse.json({ success: false, errors }, { status: 400 });
		}

		const { name, email, password } = validationResult.data;

		// E-posta zaten kullanılıyor mu kontrol et
		const existingUser = await db.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return NextResponse.json(
				{ success: false, error: "Bu e-posta adresi zaten kullanılıyor" },
				{ status: 400 },
			);
		}

		// Şifreyi hashle
		const hashedPassword = await hash(password, 10);

		// Kullanıcıyı veritabanına kaydet
		const newUser = await db.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});

		// Hassas verileri kaldırarak kullanıcı bilgilerini döndür
		const safeUser = {
			id: newUser.id,
			name: newUser.name,
			email: newUser.email,
		};

		return NextResponse.json(
			{
				success: true,
				user: safeUser,
				message: "Kayıt başarıyla tamamlandı",
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Kayıt hatası:", error);

		return NextResponse.json(
			{ success: false, error: "Sunucu hatası oluştu" },
			{ status: 500 },
		);
	}
}
