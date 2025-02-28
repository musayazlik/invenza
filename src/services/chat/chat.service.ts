import { Chat } from "@/types/chat";

/**
 * Kullanıcıya ait tüm sohbetleri getiren servis fonksiyonu
 */
export const getUserChats = async (): Promise<Chat[]> => {
  try {
    const response = await fetch("/api/chat/user-chats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Sohbetler yüklenemedi");
    }

    const data = await response.json();

    if (data && Array.isArray(data.chats)) {
      return data.chats;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Sohbet yükleme hatası:", error);
    return [];
  }
};

/**
 * Mesaj gönderen servis fonksiyonu
 */
export const sendChatMessage = async (
  message: string,
  chatId: string | null
) => {
  const response = await fetch("/api/chat/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: message }],
      chatId: chatId || null,
      title: !chatId ? message.substring(0, 30) : undefined,
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return await response.json();
};

/**
 * Sohbet silme servis fonksiyonu
 */
export const deleteUserChat = async (chatId: string): Promise<boolean> => {
  const response = await fetch(`/api/chat/${chatId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Sohbet silinemedi");
  }

  return true;
};
