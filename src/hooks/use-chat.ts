import { useState, useCallback, useEffect } from "react";
import { Chat, Message, ModelType } from "@/types/chat";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export const useChat = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [activeModel, setActiveModel] = useState<ModelType>("gemini");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const { data: session, status } = useSession();

  // Kullanıcının sohbetlerini veritabanından yükleme
  useEffect(() => {
    const fetchChats = async () => {
      if (status !== "authenticated") return;

      try {
        setIsLoadingChats(true);

        // GET isteğini ayarlarla birlikte gönder
        const response = await fetch("/api/chat/user-chats", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // credentials: 'include' ekleyin
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Sohbetler yüklenemedi");
        }

        const data = await response.json();

        // null kontrollü veri ataması
        if (data && Array.isArray(data.chats)) {
          setChats(data.chats);
        } else {
          // Veri boşsa boş array kullan
          setChats([]);
        }
      } catch (error) {
        console.error("Sohbet yükleme hatası:", error);
        // Hata durumunda boş liste kullan
        setChats([]);
      } finally {
        setIsLoadingChats(false);
      }
    };

    console.log("useEffect: çağrıldı");

    fetchChats();
  }, [session, status]);

  // Yeni sohbet oluşturma
  const createNewChat = useCallback(() => {
    if (!session?.user) {
      toast.error("Oturum açmanız gerekiyor");
      return;
    }

    // State güncellemelerini sıralı yapalım
    setInput("");
    setActiveChat(null);

    console.log("Yeni sohbet oluşturuldu");

    window.scrollTo(0, 0);
  }, [session]);

  // Sohbet silme
  const deleteChat = useCallback(
    async (chatId: string) => {
      if (!session?.user) return;

      console.log("Sohbet silme", chatId);

      try {
        // Önce API'ye silme isteği gönder
        const response = await fetch(`/api/chat/${chatId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Sohbet silinemedi");
        }

        // API başarılı olduktan sonra UI güncellemesi yap
        setChats((prev) => {
          const filteredChats = prev.filter((chat) => chat.id !== chatId);

          // Aktif sohbet silindiyse, başka bir sohbet seçme
          if (activeChat === chatId) {
            if (filteredChats.length > 0) {
              setActiveChat(filteredChats[0].id);
            } else {
              setActiveChat(null);
            }
          }

          return filteredChats;
        });

        toast.success("Sohbet başarıyla silindi");
      } catch (error) {
        console.error("Sohbet silme hatası:", error);
        toast.error("Sohbet silinemedi");
      }
    },
    [activeChat, session]
  );

  // sendMessage fonksiyonunu güncelleyelim
  const sendMessage = useCallback(
    async (message: string, chatId: string | null, model: ModelType) => {
      if (!message.trim() || !session?.user) return;

      setIsLoading(true);

      try {
        const timestamp = new Date().toISOString();
        const isNewChat = !chatId;
        const tempChatId = isNewChat ? `temp-${uuidv4()}` : chatId;

        const tempUserMessageId = `msg-${uuidv4()}`;
        const userMessage: Message = {
          id: tempUserMessageId,
          role: "user",
          content: message,
          model: model,
          timestamp: timestamp,
        };

        if (isNewChat) {
          const newChat: Chat = {
            id: tempChatId,
            title:
              message.length > 30 ? `${message.substring(0, 27)}...` : message,
            messages: [userMessage],
            model: model,
            timestamp: timestamp,
          };

          // Yeni sohbet için önce state'i güncelle ve aktif olarak ayarla
          setChats((prevChats) => [newChat, ...prevChats]);
          // Yeni sohbeti hemen aktif yap
          setActiveChat(tempChatId);
        } else {
          // Mevcut sohbeti güncelle
          setChats((prevChats) =>
            prevChats.map((chat) =>
              chat.id === chatId
                ? {
                    ...chat,
                    messages: [...chat.messages, userMessage],
                    model: model,
                    timestamp: timestamp,
                  }
                : chat
            )
          );
        }

        setInput("");

        // API isteği ve yanıt işleme...
        const response = await fetch("/api/chat/gemini", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: message }],
            chatId: isNewChat ? null : chatId,
            title: isNewChat ? message.substring(0, 30) : undefined,
          }),
        });

        if (!response.ok) {
          throw new Error(await response.text());
        }

        const data = await response.json();

        // AI yanıtını ekle
        const assistantMessage: Message = {
          id: uuidv4(),
          role: "assistant",
          content: data.content,
          model: model,
          timestamp: new Date().toISOString(),
          sources: data.itemReferences || [],
        };

        if (isNewChat && data.chatId) {
          // Geçici ID'yi gerçek ID ile güncelle
          setChats((prevChats) =>
            prevChats.map((chat) =>
              chat.id === tempChatId
                ? {
                    ...chat,
                    id: data.chatId,
                    messages: [...chat.messages, assistantMessage],
                  }
                : chat
            )
          );
          // Aktif sohbeti gerçek ID ile güncelle
          setActiveChat(data.chatId);
        } else {
          setChats((prevChats) =>
            prevChats.map((chat) =>
              chat.id === chatId
                ? {
                    ...chat,
                    messages: [...chat.messages, assistantMessage],
                  }
                : chat
            )
          );
        }
      } catch (error) {
        console.error("Mesaj gönderirken hata oluştu:", error);
        toast.error("Mesaj gönderilemedi");
      } finally {
        setIsLoading(false);
      }
    },
    [session] // activeChat'i dependency array'den kaldırdık
  );

  // Sohbetleri yeniden yükleme
  const fetchChats = useCallback(async () => {
    console.log("fetchChats:çağrıldı");

    if (status !== "authenticated") return;

    try {
      setIsLoadingChats(true);

      // GET isteğini ayarlarla birlikte gönder
      const response = await fetch("/api/chat/user-chats", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: 'include' ekleyin
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Sohbetler yüklenemedi");
      }

      const data = await response.json();

      // null kontrollü veri ataması
      if (data && Array.isArray(data.chats)) {
        setChats(data.chats);
      } else {
        // Veri boşsa boş array kullan
        setChats([]);
      }
    } catch (error) {
      console.error("Sohbet yükleme hatası:", error);
      // Hata durumunda boş liste kullan
      setChats([]);
    } finally {
      setIsLoadingChats(false);
    }
  }, [status]);

  return {
    chats,
    activeChat,
    setActiveChat,
    activeModel,
    setActiveModel,
    input,
    setInput,
    isLoading,
    isLoadingChats,
    createNewChat,
    deleteChat,
    sendMessage,
    refreshChats: fetchChats,
  };
};
