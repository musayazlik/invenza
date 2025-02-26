"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	MessageSquarePlus,
	Send,
	MoreVertical,
	Trash2,
	Download,
	Share2,
	Sparkles,
	Bot,
	Copy,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface Message {
	id: string;
	role: "user" | "assistant";
	content: string;
	model: "gemini" | "gpt";
	timestamp: Date;
}

interface Chat {
	id: string;
	title: string;
	messages: Message[];
	model: "gemini" | "gpt";
	timestamp: Date;
}

const ChatPage = () => {
	// Aktif chat ve model durum değişkenleri
	const [activeModel, setActiveModel] = useState<"gemini" | "gpt">("gemini");
	const [activeChat, setActiveChat] = useState<string | null>(null);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// Demo veriler (gerçek uygulama API'den alacak)
	const [chats, setChats] = useState<Chat[]>([
		{
			id: "chat1",
			title: "Stok durumu sorgusu",
			messages: [
				{
					id: "msg1",
					role: "user",
					content: "Levrek balığı stokta var mı?",
					model: "gemini",
					timestamp: new Date(Date.now() - 86400000),
				},
				{
					id: "msg2",
					role: "assistant",
					content:
						"Evet, levrek balığı şu anda stokta mevcut. 12 adet levrek bulunuyor ve son kullanma tarihi 15 Mart 2025.",
					model: "gemini",
					timestamp: new Date(Date.now() - 86350000),
				},
				{
					id: "msg3",
					role: "user",
					content: "Teşekkürler! Peki bu balıklar hangi tedarikçiden geldi?",
					model: "gemini",
					timestamp: new Date(Date.now() - 86300000),
				},
				{
					id: "msg4",
					role: "assistant",
					content:
						"Levrek balıkları 'Deniz Ürünleri Ltd.' tedarikçisinden 25 Şubat tarihinde alındı. Toplam alım fiyatı 2.400₺.",
					model: "gemini",
					timestamp: new Date(Date.now() - 86200000),
				},
			],
			model: "gemini",
			timestamp: new Date(Date.now() - 86400000),
		},
		{
			id: "chat2",
			title: "Sipariş hazırlama",
			messages: [
				{
					id: "msg5",
					role: "user",
					content:
						"Yarın akşam yemeği için 20 kişilik bir sipariş hazırlamam gerekiyor, en popüler menü önerilerini listeler misin?",
					model: "gpt",
					timestamp: new Date(Date.now() - 43200000),
				},
				{
					id: "msg6",
					role: "assistant",
					content:
						"20 kişilik akşam yemeği için popüler menü önerileri:\n\n**Başlangıçlar:**\n- Mevsim salata (stokta yeterli malzeme var)\n- Çorba seçenekleri: Mercimek veya Mantar (her ikisi için de yeterli malzeme mevcut)\n\n**Ana Yemekler:**\n- Fırın levrek (12 adet mevcut, 8 adet daha sipariş edilmeli)\n- Izgara bonfile (yeterli stok mevcut)\n- Sebzeli risotto (pirinç stoku düşük, sipariş edilmeli)\n\n**Tatlılar:**\n- Çikolatalı sufle (malzemeler mevcut)\n- Cheesecake (sipariş edilmeli)\n\nSipariş edilmesi gereken malzemeleri otomatik olarak listeleyebilirim. Devam etmek ister misiniz?",
					model: "gpt",
					timestamp: new Date(Date.now() - 43100000),
				},
			],
			model: "gpt",
			timestamp: new Date(Date.now() - 43200000),
		},
	]);

	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Yeni sohbet oluşturma
	const createNewChat = () => {
		const newChat: Chat = {
			id: `chat${Date.now()}`,
			title: "Yeni Sohbet",
			messages: [],
			model: activeModel,
			timestamp: new Date(),
		};

		setChats([newChat, ...chats]);
		setActiveChat(newChat.id);
		setInput("");
	};

	// Sohbet silme
	const deleteChat = (chatId: string) => {
		setChats(chats.filter((chat) => chat.id !== chatId));
		if (activeChat === chatId) {
			setActiveChat(chats.length > 1 ? chats[0].id : null);
		}
	};

	// Mesajları aşağı kaydırma
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		if (chats.length && !activeChat) {
			setActiveChat(chats[0].id);
		}
	}, [chats, activeChat]);

	useEffect(() => {
		scrollToBottom();
	}, [chats]);

	// Mesaj gönderimi
	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!input.trim() || !activeChat) return;

		setIsLoading(true);

		const currentChat = chats.find((chat) => chat.id === activeChat);
		if (!currentChat) return;

		// Kullanıcı mesajı
		const userMessage: Message = {
			id: `msg-${Date.now()}`,
			role: "user",
			content: input,
			model: activeModel,
			timestamp: new Date(),
		};

		// Chats dizisini güncelle
		const updatedChats = chats.map((chat) => {
			if (chat.id === activeChat) {
				// İlk mesajsa chatın başlığını güncelle
				return {
					...chat,
					messages: [...chat.messages, userMessage],
					model: activeModel,
					title:
						chat.messages.length === 0
							? input.length > 20
								? `${input.substring(0, 20)}...`
								: input
							: chat.title,
				};
			}
			return chat;
		});

		setChats(updatedChats);
		setInput("");

		// Yapay zeka yanıtını simüle etme (gerçekte API çağrısı yapılacak)
		setTimeout(() => {
			const aiResponse: Message = {
				id: `msg-${Date.now() + 1}`,
				role: "assistant",
				content: generateDemoResponse(input, activeModel),
				model: activeModel,
				timestamp: new Date(),
			};

			const updatedChatsWithAiResponse = chats.map((chat) => {
				if (chat.id === activeChat) {
					return {
						...chat,
						messages: [...chat.messages, userMessage, aiResponse],
					};
				}
				return chat;
			});

			setChats(updatedChatsWithAiResponse);
			setIsLoading(false);
		}, 1500);
	};

	// Demo AI yanıtı (gerçek uygulamada API'den gelecek)
	const generateDemoResponse = (
		prompt: string,
		model: "gemini" | "gpt",
	): string => {
		if (
			prompt.toLowerCase().includes("stok") ||
			prompt.toLowerCase().includes("ürün")
		) {
			return `Bu bir demo yanıtıdır. ${model === "gemini" ? "Gemini" : "ChatGPT"} modelini kullanıyorsunuz.\n\nStok sorgunuza göre envanter sisteminde şu bilgileri buldum:\n- İlgili ürünler: 5 farklı kategori\n- Toplam stok adedi: 230 birim\n- Son güncelleme: bugün, 14:30\n\nDaha detaylı bilgi için spesifik bir ürün adı veya kategori belirtebilirsiniz.`;
		}

		if (
			prompt.toLowerCase().includes("menü") ||
			prompt.toLowerCase().includes("yemek")
		) {
			return `Bu bir demo yanıtıdır. ${model === "gemini" ? "Gemini" : "ChatGPT"} modelini kullanıyorsunuz.\n\nMenü sorgunuza göre en popüler seçenekler şunlardır:\n1. Mevsim salata (stokta var)\n2. Levrek (stokta az)\n3. Dana bonfile (stokta yeterli)\n4. Çikolatalı sufle (stokta var)\n\nSipariş oluşturmak için belirtmeniz gereken bilgiler:\n- Kişi sayısı\n- Tarih ve saat\n- Özel diyet gereksinimleri`;
		}

		// Default response if no conditions match
		return `Bu bir demo yanıtıdır. ${model === "gemini" ? "Gemini" : "ChatGPT"} modelini kullanıyorsunuz.\n\nSorunuzu analiz ettim. Otel stok yönetim sisteminden aşağıdaki bilgileri görebiliyorum:\n\n- Toplam envanter: 3,240 ürün\n- Kritik stok seviyesindeki ürünler: 24\n- Son 24 saatteki hareketler: 142 işlem\n\nDaha spesifik bir bilgi için lütfen kategoriye veya ürün adına göre sorgunuzu detaylandırın.`;
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
				<div className="p-4 border-b">
					<Button
						onClick={createNewChat}
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
			</Card>

			{/* Ana Sohbet Ekranı */}
			<Card className="flex-grow flex flex-col overflow-hidden">
				{/* Model seçimi ve başlık */}
				<div className="p-4 border-b">
					<Tabs
						defaultValue={activeModel}
						value={activeModel}
						onValueChange={(val) => setActiveModel(val as "gemini" | "gpt")}
						className="w-full"
					>
						<div className="flex items-center justify-between mb-2">
							<h2 className="text-xl font-semibold">Stok Sorgulama Asistanı</h2>
							<TabsList>
								<TabsTrigger value="gemini" className="flex items-center gap-1">
									<Bot size={16} />
									Gemini
								</TabsTrigger>
								<TabsTrigger value="gpt" className="flex items-center gap-1">
									<Sparkles size={16} />
									ChatGPT
								</TabsTrigger>
							</TabsList>
						</div>
						<Separator />
					</Tabs>
				</div>

				{activeChat ? (
					<>
						{/* Mesaj Alanı */}
						<ScrollArea className="flex-grow p-4">
							{activeMessages.length > 0 ? (
								<div className="space-y-6">
									{activeMessages.map((message) => (
										<div key={message.id} className="flex flex-col">
											<div
												className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
											>
												<div className="flex items-start gap-3 max-w-3xl group">
													{message.role === "assistant" && (
														<Avatar className="mt-1">
															{message.model === "gemini" ? (
																<AvatarImage src="/images/svg/gemini-icon.svg" />
															) : (
																<AvatarImage src="/images/svg/chatgpt-icon.svg" />
															)}
															<AvatarFallback>
																{message.model === "gemini" ? "G" : "C"}
															</AvatarFallback>
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
												className={`flex mt-1 text-xs text-muted-foreground ${message.role === "user" ? "justify-end mr-12" : "justify-start ml-12"}`}
											>
												<div className="flex items-center gap-2">
													<span>
														{message.timestamp.toLocaleString("tr-TR", {
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
									<div ref={messagesEndRef} />
								</div>
							) : (
								<div className="h-full flex flex-col items-center justify-center text-center p-8">
									<div className="w-20 h-20 mb-6 relative">
										{activeModel === "gemini" ? (
											<Image
												src="/images/svg/gemini-icon.svg"
												alt="Gemini"
												fill
												className="object-contain"
											/>
										) : (
											<Image
												src="/images/svg/chatgpt-icon.svg"
												alt="ChatGPT"
												fill
												className="object-contain"
											/>
										)}
									</div>
									<h3 className="text-xl font-semibold">
										Stok Sorgulama Asistanı
									</h3>
									<p className="text-muted-foreground mt-2 max-w-sm">
										{activeModel === "gemini"
											? "Gemini modeli kullanılarak stok durumu, ürün bilgileri ve tedarikçiler hakkında sorular sorabilirsiniz."
											: "ChatGPT modeli ile stok yönetimi, sipariş hazırlama ve menü önerileri konularında yardım alabilirsiniz."}
									</p>
								</div>
							)}
						</ScrollArea>

						{/* Input Alanı */}
						<div className="p-4 border-t">
							<form onSubmit={handleSendMessage} className="flex gap-2">
								<Input
									value={input}
									onChange={(e) => setInput(e.target.value)}
									placeholder="Bir mesaj yazın..."
									className="flex-grow"
									disabled={isLoading}
								/>
								<Button type="submit" disabled={isLoading || !input.trim()}>
									{isLoading ? (
										<div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
									) : (
										<Send size={18} />
									)}
								</Button>
							</form>
						</div>
					</>
				) : (
					<div className="h-full flex items-center justify-center">
						<div className="text-center p-8">
							<h3 className="text-xl font-semibold">Sohbet Yok</h3>
							<p className="text-muted-foreground mt-2">
								Soldan bir sohbet seçin veya yeni bir sohbet başlatın.
							</p>
							<Button onClick={createNewChat} className="mt-4">
								Yeni Sohbet
							</Button>
						</div>
					</div>
				)}
			</Card>
		</div>
	);
};

export default ChatPage;
