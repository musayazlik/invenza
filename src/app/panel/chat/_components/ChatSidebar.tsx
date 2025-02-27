import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Chat } from "@/types/chat";
import {
  Bot,
  Download,
  MessageSquarePlus,
  MoreVertical,
  Share2,
  Sparkles,
  Trash2,
} from "lucide-react";

interface ChatSidebarProps {
  chats: Chat[];
  activeChat: string | null;
  setActiveChat: (id: string) => void;
  createNewChat: () => void;
  deleteChat: (id: string) => void;
}

const ChatSidebar = ({
  chats,
  activeChat,
  setActiveChat,
  createNewChat,
  deleteChat,
}: ChatSidebarProps) => {
  return (
    <div className="w-full md:w-80 flex flex-col overflow-hidden">
      <div className="p-4 border-b">
        <Button
          onClick={() => {
            createNewChat();
            // Yeni sohbet butonuna tıklandığında input'a focus yapalım
            const inputElement = document.querySelector("input");
            if (inputElement) {
              inputElement.focus();
            }
          }}
          className="w-full flex gap-2 items-center"
          variant="outline"
        >
          <MessageSquarePlus size={16} />
          Yeni Sohbet
        </Button>
      </div>

      <ScrollArea className="flex-grow p-3">
        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveChat(chat.id);
                  e.preventDefault();
                }
              }}
              className={`w-full text-left flex items-center justify-between rounded-md p-3 text-sm cursor-pointer group hover:bg-muted ${
                activeChat === chat.id ? "bg-muted" : ""
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                {chat.model === "gemini" ? (
                  <Bot size={18} className="text-purple-500" />
                ) : (
                  <Sparkles size={18} className="text-green-500" />
                )}
                <span className="truncate">{chat.title}</span>
              </div>

              <div className="opacity-0 group-hover:opacity-100">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <MoreVertical size={16} />
                      <span className="sr-only">Sohbet seçenekleri</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => deleteChat(chat.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Sil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="mr-2 h-4 w-4" />
                      <span>Paylaş</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      <span>Dışa Aktar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
