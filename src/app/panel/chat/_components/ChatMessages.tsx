import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Message } from "@/types/chat";
import { Copy } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect } from "react";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  copyToClipboard: (text: string) => void;
}

const ChatMessages = ({
  messages,
  isLoading,
  copyToClipboard,
}: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mesajları aşağı kaydırma fonksiyonu
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      try {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      } catch (error) {
        console.error("Scroll error:", error);
      }
    }
  };

  // Mesajlar değiştiğinde scroll
  useEffect(() => {
    const scrollTimer = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(scrollTimer);
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <div className="w-20 h-20 mb-6 relative">
          <Image
            src="/images/svg/gemini-icon.svg"
            alt="Gemini"
            fill
            className="object-contain"
          />
        </div>
        <h3 className="text-xl font-semibold">Stok Sorgulama Asistanı</h3>
        <p className="text-muted-foreground mt-2 max-w-sm">
          Gemini modeli kullanılarak stok durumu, ürün bilgileri ve tedarikçiler
          hakkında sorular sorabilirsiniz.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-grow p-4">
      <div className="space-y-6">
        {/* Mevcut mesaj render kodu */}
        {messages.map((message) => (
          <div key={message.id} className="flex flex-col">
            <div
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex items-start gap-3 max-w-3xl group">
                {message.role === "assistant" && (
                  <Avatar className="mt-1">
                    <AvatarImage src="/images/svg/gemini-icon.svg" />
                    <AvatarFallback>G</AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`rounded-lg px-4 py-3 whitespace-pre-wrap ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>

                {message.role === "user" && (
                  <Avatar className="mt-1">
                    <AvatarImage src="/avatar-placeholder.png" />
                    <AvatarFallback>KL</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>

            <div
              className={`flex mt-1 text-xs text-muted-foreground ${
                message.role === "user"
                  ? "justify-end mr-12"
                  : "justify-start ml-12"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>
                  {new Date(message.timestamp).toLocaleString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <Button
                  onClick={() => copyToClipboard(message.content)}
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100"
                >
                  <Copy size={12} />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Loading animasyonu */}
        {isLoading && (
          <div className="flex flex-col">
            <div className="flex justify-start">
              <div className="flex items-start gap-3 max-w-3xl group">
                <Avatar className="mt-1">
                  <AvatarImage src="/images/svg/gemini-icon.svg" />
                  <AvatarFallback>G</AvatarFallback>
                </Avatar>

                <div className="rounded-lg px-4 py-3 bg-muted">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse delay-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default ChatMessages;
