"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useChat } from "@/hooks/use-chat";

// Komponentlerimizi import ediyoruz
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatEmpty from "./ChatEmpty";
import ChatMessages from "./ChatMessages";
import ChatInputForm from "./ChatInputForm";
import Loading from "@/components/panel/loading";

const ChatWrapper = () => {
  // Oturum durumunu kontrol et
  const { status } = useSession();
  const router = useRouter();

  // Chat hook kullanarak verileri ve durumları yönetme
  const {
    activeModel,
    setActiveModel,
    activeChat,
    setActiveChat,
    input,
    setInput,
    isLoading,
    chats,
    createNewChat,
    deleteChat,
    sendMessage,
  } = useChat();

  // Oturum açılmamışsa giriş sayfasına yönlendir
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  // Oturum yükleniyorsa yükleme göster
  if (status === "loading") {
    return <Loading />;
  }

  // Mesaj gönderimi
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Eğer aktif chat yoksa ve input doluysa yeni bir mesaj gönderiliyor demektir
    if (!activeChat) {
      await sendMessage(input, null, activeModel);
    } else {
      await sendMessage(input, activeChat, activeModel);
    }
  };

  // Mesajı kopyalama
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Kopyalandı", {
      description: "Mesaj panoya kopyalandı.",
    });
  };

  // Aktif sohbetin mesajları
  const activeMessages =
    chats.find((chat) => chat.id === activeChat)?.messages || [];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-4">
      {/* Sol Panel - Sohbet Listesi */}
      <Card className="w-full md:w-80 flex flex-col overflow-hidden">
        <ChatSidebar
          chats={chats}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          createNewChat={createNewChat}
          deleteChat={deleteChat}
        />
      </Card>

      {/* Ana Sohbet Ekranı */}
      <Card className="flex-grow flex flex-col overflow-hidden">
        {/* Model seçimi ve başlık her zaman görünecek */}
        <ChatHeader activeModel={activeModel} setActiveModel={setActiveModel} />

        {/* Ana içerik alanı */}
        {!activeChat ? (
          // Hiç sohbet seçili değilse bu kısım görünecek
          <div className="flex-grow flex flex-col">
            <ChatEmpty setInput={setInput} />
          </div>
        ) : (
          // Aktif sohbet varsa mesajlar görünecek
          <ChatMessages
            messages={activeMessages}
            isLoading={isLoading}
            copyToClipboard={copyToClipboard}
          />
        )}

        {/* Input alanı her zaman görünecek */}
        <ChatInputForm
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
};

export default ChatWrapper;
