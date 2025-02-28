import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import systemDirectiveText from "@/constants";

// Google Gemini istemcisi oluşturma
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

export async function POST(req: Request) {
  try {
    // Oturum kontrolü
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
    }

    const userId = session.user.id;

    // İstek gövdesinden verileri alma
    const { messages, chatId, title } = await req.json();

    // Mesaj kontrolü
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Geçersiz mesaj formatı" },
        { status: 400 }
      );
    }

    // Son kullanıcı mesajını alma
    const lastUserMessage = messages.filter((m) => m.role === "user").pop();
    if (!lastUserMessage) {
      return NextResponse.json(
        { error: "Kullanıcı mesajı bulunamadı" },
        { status: 400 }
      );
    }

    // Mevcut veya yeni sohbet
    let chat;
    let isNewChat = false;

    // Frontend'den null veya undefined geliyorsa veya boş string geliyorsa, yeni sohbet olarak kabul et
    if (!chatId) {
      isNewChat = true;
    } else {
      try {
        // Mevcut sohbeti kontrol et
        chat = await prisma.chat.findUnique({
          where: {
            id: chatId,
            userId: userId,
          },
          include: {
            messages: {
              orderBy: {
                createdAt: "asc",
              },
            },
          },
        });

        if (!chat) {
          isNewChat = true;
        } else {
          isNewChat = false;
        }
      } catch (error) {
        console.error("Sohbet arama hatası:", error);

        isNewChat = true;
      }
    }

    // Yeni sohbet oluştur
    if (isNewChat) {
      const chatTitle =
        title || `Yeni Sohbet ${new Date().toLocaleString("tr-TR")}`;

      chat = await prisma.chat.create({
        data: {
          title: chatTitle,
          userId: userId,
        },
        include: {
          messages: true,
        },
      });
    }

    // Chat null kontrolü
    if (!chat) {
      return NextResponse.json(
        { error: "Sohbet oluşturulamadı" },
        { status: 500 }
      );
    }

    // Kullanıcı mesajını veritabanına kaydet
    const userMessage = await prisma.chatMessage.create({
      data: {
        chatId: chat.id,
        role: "user",
        content: lastUserMessage.content,
      },
    });

    // Gemini'ye gönderilecek mesaj geçmişini hazırlama
    const messageHistory = chat.messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Son kullanıcı mesajını ekle
    messageHistory.push({
      role: "user",
      parts: [{ text: userMessage.content }],
    });

    // Tüm stok öğelerini getir
    const inventoryItems = await prisma.inventoryItem.findMany();

    // Stok bilgilerini formatla
    const inventoryData = inventoryItems.map((item) => ({
      id: item.id,
      itemName: item.itemName,
      itemCode: item.itemCode,
      category: item.category,
      subCategory: item.subCategory,
      description: item.description,
      unit: item.unit,
      alternativeItems: item.alternativeltems,
      suppliers: item.suppliers,
      storageLocation: item.storageLocation,
      minimumStock: item.minimumStock,
      reorderLevel: item.reorderLevel,
    }));

    // Stok veritabanı bilgisi hazırla
    const inventoryContext = `
STOK VERİTABANI BİLGİLERİ:
${JSON.stringify(inventoryData, null, 2)}
`;

    // Gemini modeli
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Sohbet bağlamını oluşturma
    const geminiChat = model.startChat({
      history: messageHistory.slice(0, -1), // Son kullanıcı mesajını hariç tut
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    // Sistem direktifi
    const systemDirective = `${systemDirectiveText} \n\n ${inventoryContext}`;

    // Gemini'den yanıt alma
    const result = await geminiChat.sendMessage(
      systemDirective + "\n\nKullanıcı sorusu: " + userMessage.content
    );
    const response = await result.response;
    const text = response.text();

    // Stok öğelerine referans kontrol
    // Define interface for inventory item reference
    interface InventoryItemReference {
      id: string;
      itemName: string;
      itemCode: string;
    }

    let itemReferences: InventoryItemReference[] = [];
    try {
      // Stok öğelerini getir
      const inventoryItems = await prisma.inventoryItem.findMany({
        select: {
          id: true,
          itemName: true,
          itemCode: true,
        },
      });

      // Metindeki stok öğesi referanslarını bul
      itemReferences = inventoryItems.filter(
        (item) =>
          text.toLowerCase().includes(item.itemName.toLowerCase()) ||
          text.toLowerCase().includes(item.itemCode.toLowerCase())
      );
    } catch (error) {
      console.warn("Stok öğelerini alma hatası:", error);
    }

    // AI yanıtını veritabanına kaydet
    const assistantMessage = await prisma.chatMessage.create({
      data: {
        chatId: chat.id,
        role: "assistant",
        content: text,
        // İlgili stok öğelerine referans ekle
        itemReferences: {
          create: itemReferences.map((item) => ({
            item: {
              connect: {
                id: item.id,
              },
            },
          })),
        },
      },
      include: {
        itemReferences: {
          include: {
            item: true,
          },
        },
      },
    });

    // İlk mesaj ise chat başlığını güncelle
    if (isNewChat) {
      // İlk mesajdan başlık oluştur (max 30 karakter)
      const suggestedTitle =
        userMessage.content.length > 30
          ? userMessage.content.substring(0, 27) + "..."
          : userMessage.content;

      await prisma.chat.update({
        where: { id: chat.id },
        data: { title: suggestedTitle },
      });
    }

    // Yanıtı ve güncellenmiş sohbet bilgilerini döndürme
    return NextResponse.json({
      content: text,
      chatId: chat.id,
      isNewChat,
      itemReferences:
        assistantMessage.itemReferences?.map((ref) => ({
          id: ref.itemId,
          name: ref.item?.itemName || "Ürün",
        })) || [],
    });
  } catch (error) {
    console.error("Gemini API hatası:", error);
    return NextResponse.json(
      {
        error: "AI yanıtı alınamadı",
        details:
          error instanceof Error
            ? error.message
            : "Beklenmeyen bir hata oluştu",
      },
      { status: 500 }
    );
  }
}
