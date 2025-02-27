import { type NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/lib/validations/auth/register/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((error) => ({
        path: error.path.join("."),
        message: error.message,
      }));

      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const { name, email, password } = validationResult.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Bu e-posta adresi zaten kullanılıyor" },
        { status: 400 }
      );
    }
    const hashedPassword = await hash(password, 12);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

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
      { status: 201 }
    );
  } catch (error) {
    console.error("Kayıt hatası:", error);

    return NextResponse.json(
      { success: false, error: "Sunucu hatası oluştu" },
      { status: 500 }
    );
  }
}
