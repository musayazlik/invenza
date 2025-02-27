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
            className="h-auto p-4 text-left flex flex-col items-start gap-2"
            onClick={() => setInput("Stokta hangi ürünler azalmak üzere?")}
          >
            <div className="font-medium">Stok Durumu</div>
            <div className="text-sm text-muted-foreground">
              Stokta hangi ürünler azalmak üzere?
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-4 text-left flex flex-col items-start gap-2"
            onClick={() => setInput("En çok satılan 5 ürünü listeler misin?")}
          >
            <div className="font-medium">Popüler Ürünler</div>
            <div className="text-sm text-muted-foreground">
              En çok satılan 5 ürünü listeler misin?
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-4 text-left flex flex-col items-start gap-2"
            onClick={() => setInput("Tedarikçi bilgilerini göster")}
          >
            <div className="font-medium">Tedarikçi Bilgileri</div>
            <div className="text-sm text-muted-foreground">
              Tedarikçi bilgilerini göster
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-4 text-left flex flex-col items-start gap-2"
            onClick={() => setInput("Son 7 günün stok hareketlerini özetle")}
          >
            <div className="font-medium">Stok Hareketleri</div>
            <div className="text-sm text-muted-foreground">
              Son 7 günün stok hareketlerini özetle
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatEmpty;
