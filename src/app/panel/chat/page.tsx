import ChatWrapper from "./_components/wrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat | Panel",
  description: "Chat sayfası",
};

const ChatPage = () => {
  return <ChatWrapper />;
};

export default ChatPage;
