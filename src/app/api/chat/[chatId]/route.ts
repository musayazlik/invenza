import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
type Params = Promise<{ chatId: string }>;

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const session = await auth();
    const { chatId } = await params;

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
    }

    const userId = session.user.id;

    if (!chatId) {
      return NextResponse.json(
        { error: "Sohbet ID'si gerekli" },
        { status: 400 }
      );
    }

    // Önce sohbetin kullanıcıya ait olduğundan emin ol
    try {
      const chat = await prisma.chat.findUnique({
        where: {
          id: chatId,
          userId: userId,
        },
      });

      if (!chat) {
        return NextResponse.json(
          { error: "Sohbet bulunamadı veya erişim izniniz yok" },
          { status: 404 }
        );
      }

      // Sohbeti ve tüm ilişkili mesajları sil
      await prisma.chat.delete({
        where: {
          id: chatId,
        },
      });

      return NextResponse.json({
        message: "Sohbet başarıyla silindi",
        deleted: true,
      });
    } catch (dbError) {
      console.error("Veritabanı işlemi hatası:", dbError);
      return NextResponse.json(
        { error: "Veritabanı işlemi sırasında bir hata oluştu" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Sohbet silme hatası:", error);
    return NextResponse.json({ error: "Sohbet silinemedi" }, { status: 500 });
  }
}
