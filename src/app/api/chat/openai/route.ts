import { NextResponse } from "next/server";
import OpenAI from "openai";
// import { searchVectorDB } from "@/lib/vector-db";

// OpenAI istemcisi oluşturma
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

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

    // // RAG için ilgili belgeleri bulma
    // const searchResults = await searchVectorDB(lastUserMessage.content);

    // Belgelerden içeriği biçimlendirme
    const contextText = "";
    // if (searchResults.length > 0) {
    //   contextText = `Aşağıdaki bilgilere dayanarak yanıt verin:\n\n${searchResults
    //     .map((doc) => `${doc.title}:\n${doc.content}`)
    //     .join("\n\n")}`;
    // }

    // Sistem mesajı oluşturma (RAG bağlamı dahil)
    const systemMessage = {
      role: "system",
      content: `Sen Invenza Otel Stok Yönetim Sistemi'nin bir parçası olan bir AI asistansın. 
      Kullanıcılara stok durumu, ürün bilgileri, tedarikçiler, sipariş hazırlama ve menü önerileri 
      konularında yardımcı olursun. Türkçe yanıt ver ve profesyonel ve yardımsever ol.
      ${contextText ? `\n\n${contextText}` : ""}`,
    };

    // API'ye gönderilen mesajları hazırlama
    const apiMessages = [systemMessage, ...messages];

    // OpenAI API'sinden yanıt alma
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Yanıtı ve kaynakları döndürme
    return NextResponse.json({
      content: completion.choices[0].message.content,
      // sources: searchResults,
    });
  } catch (error) {
    console.error("OpenAI API hatası:", error);
    return NextResponse.json({ error: "AI yanıtı alınamadı" }, { status: 500 });
  }
}
