import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    console.log(req.body);

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
    }

    // Params parametrelerini güvenli bir şekilde al
    const { chatId } = await params;

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
