import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ChatEmptyProps {
  setInput: (input: string) => void;
}

const ChatEmpty = ({ setInput }: ChatEmptyProps) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-4">
        <div className="text-center space-y-2">
          <div className="w-20 h-20 mx-auto relative mb-6">
            <Image
              src="/images/svg/gemini-icon.svg"
              alt="Gemini"
              fill
              className="object-contain opacity-90"
            />
          </div>
          <h3 className="text-2xl font-semibold tracking-tight">
            Stok Sorgulama Asistanı
          </h3>
          <p className="text-muted-foreground text-sm">
            Stok yönetimi konusunda size yardımcı olabilirim. Örnek sorular:
          </p>
        </div>

        {/* Örnek sorular grid'i */}
        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            variant="outline"
            className="h-auto p-4  flex flex-col items-start gap-2"
            onClick={() => setInput("Levrek balığı stok durumu nedir?")}
          >
            <div className="font-medium">Stok Durumu Sorgulama</div>
            <div className="text-sm text-muted-foreground">
              Levrek balığı stok durumu nedir?
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-4  flex flex-col items-start gap-2"
            onClick={() => setInput("Hangi somon balığı çeşitleri mevcut?")}
          >
            <div className="font-medium">Balık Çeşitleri</div>
            <div className="text-sm text-muted-foreground">
              Hangi somon balığı çeşitleri mevcut?
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-4  flex flex-col items-start gap-2"
            onClick={() =>
              setInput(
                "Levrek yerine kullanılabilecek benzer balık türleri nelerdir?"
              )
            }
          >
            <div className="font-medium">Alternatif Balıklar</div>
            <div className="text-sm text-muted-foreground w-full overflow-hidden overflow-ellipsis">
              Levrek yerine kullanılabilecek benzer balık türleri nelerdir?
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-4 t flex flex-col items-start gap-2"
            onClick={() => setInput("Stokta azalan balık türleri hangileri?")}
          >
            <div className="font-medium">Kritik Stok Bilgisi</div>
            <div className="text-sm text-muted-foreground">
              Stokta azalan balık türleri hangileri?
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatEmpty;
