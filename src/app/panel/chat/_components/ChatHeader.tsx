import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ModelType } from "@/types/chat";
import { Bot } from "lucide-react";

interface ChatHeaderProps {
  activeModel: ModelType;
  setActiveModel: (model: ModelType) => void;
}

const ChatHeader = ({ activeModel, setActiveModel }: ChatHeaderProps) => {
  return (
    <div className="p-4 border-b">
      <Tabs
        defaultValue={activeModel}
        value={activeModel}
        onValueChange={(val) => setActiveModel(val as ModelType)}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Stok Sorgulama Asistanı</h2>
          <TabsList>
            <TabsTrigger value="gemini" className="flex items-center gap-1">
              <Bot size={16} />
              Gemini
            </TabsTrigger>
          </TabsList>
        </div>
        <Separator />
      </Tabs>
    </div>
  );
};

export default ChatHeader;
