import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    // Kimlik doğrulama kontrolü
    let session;
    try {
      session = await auth();
    } catch (error) {
      console.error("Oturum hatası:", error);
      // Oturum hatası durumunda boş dizi döndür
      return NextResponse.json({ chats: [] });
    }

    // Kullanıcı kimliği yoksa boş dizi döndür
    if (!session?.user?.id) {
      return NextResponse.json({ chats: [] });
    }

    const userId = session.user.id;

    // Kullanıcının sohbetlerini getir
    const chats = await prisma.chat.findMany({
      where: {
        userId: userId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            itemReferences: {
              include: {
                item: {
                  select: {
                    id: true,
                    itemName: true,
                    itemCode: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Frontend için dönüşüm
    const formattedChats = chats.map((chat) => ({
      id: chat.id,
      title: chat.title || "Adsız Sohbet",
      timestamp: chat.createdAt.toISOString(),
      messages: chat.messages.map((msg) => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        timestamp: msg.createdAt.toISOString(),
        // Null kontrolleriyle birlikte sources ekle
        sources: Array.isArray(msg.itemReferences)
          ? msg.itemReferences.map((ref) => ({
              id: ref.itemId,
              title: ref.item?.itemName || "",
              code: ref.item?.itemCode || "",
            }))
          : [],
      })),
      model: "gemini", // Şu an için sabit
    }));

    return NextResponse.json({
      chats: formattedChats,
    });
  } catch (error) {
    console.error("Sohbetleri alma hatası:", error);
    // Hata durumunda da boş dizi döndür
    return NextResponse.json({ chats: [] });
  }
}
