import { PrismaClient } from "@prisma/client";

// PrismaClient'ın geliştirme sırasında birden çok kez yeniden yüklenmesini önlemek için
// global nesnesine bağlanması
declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;
}

// Geliştirme ortamında hot-reload nedeniyle birden fazla Prisma Client örneği oluşmaması için
// önceden oluşturulmuş bir istemci varsa onu kullanıyoruz
const db =
	global.prisma ||
	new PrismaClient({
		log:
			process.env.NODE_ENV === "development"
				? ["query", "error", "warn"]
				: ["error"],
	});

// Sadece geliştirme ortamında global değişkene bağla
if (process.env.NODE_ENV === "development") {
	global.prisma = db;
}

export default db;
