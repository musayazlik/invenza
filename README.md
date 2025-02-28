# Invenza

Invenza, modern teknolojiler kullanılarak geliştirilmiş bir Next.js tabanlı web uygulamasıdır. Bu proje, güçlü bir kullanıcı yönetimi, yapay zeka entegrasyonu ve modern kullanıcı arayüzü sunar.

## 📅 Çalışma Planı

### 1. Gün

- Task istekleri detaylı olarak incelendi
- Proje öncesi gönderilen video ve mail içeriği detaylı analiz edildi.
- RAG (Retrieval-Augmented Generation) sistemi araştırıldı ve incelendi
- Kullanılacak teknolojilere karar verildi (Next.js 15, Prisma, NextAuth vb.)
- Next.js 15 en son sürümü ile proje temeli oluşturuldu
- Gerekli tüm paketler kuruldu ve yapılandırıldı
- Veritabanı işlemleri için Prisma yapısı hazırlandı
- Veritabanı bağlantısı (db connect) yapılandırması tamamlandı
- Prisma model yapısı ve şemaları oluşturuldu
- Kimlik doğrulama için login ve register sayfaları tasarlandı
- NextAuth entegrasyonu yapıldı ve yapılandırıldı
- Panel UI yapısı chat fonksiyonalitesi için hazırlandı
- Chat sistemi için servis yapıları oluşturuldu
- ChatGPT ve Google Gemini API entegrasyonları tamamlandı (şu anda sadece Gemini aktif)
- Görülen hatalar tespit edildi ve giderildi

### 2. Gün

- Chat sisteminin entegrasyonu ve iyileştirilmesi devam etti
- Kullanıcı arayüzü bileşenleri optimize edildi
- Kalan bug'lar tespit edildi ve düzeltildi
- Proje dökümantasyonu hazırlandı ve README dosyası güncellendi
- Deployment hazırlıkları tamamlandı
- Performans optimizasyonu için son düzenlemeler yapıldı.

## ❓ Sorulara Cevaplar

### 1. Hangi yapay zeka modelleri destekleniyor?

Şu anda aktif olarak Google Gemini API entegrasyonu bulunmaktadır. OpenAI ChatGPT entegrasyonu da yapılandırılmış ancak şimdilik aktif değildir.

### 2. Neden RAG sistemi kullanılmadı?

Şu an sistemimizde Full Context Embedding yöntemi kullanılmaktadır. Bu yöntem, tüm verilerin modelin bağlamına entegre edilmesiyle sorulara yanıtlar üretmemizi sağlar. RAG (Retrieval-Augmented Generation), dış kaynaklardan bilgi alarak yanıtlar üretmek için kullanılan bir tekniktir, ancak bunun öğrenilmesi ve uygulanması daha karmaşık ve zaman alıcı bir süreçtir.

Bu sebeple, Full Context Embedding şu anda daha hızlı ve pratik bir çözüm sunuyor. RAG'yi kullanabilmek için ekstra altyapı ve zaman gereksinimi bulunmakta. Ancak ilerleyen zamanlarda daha büyük veri kümeleri veya dinamik veri kaynakları kullanılması gerektiğinde, RAG gibi bir çözüm daha uygun olabilir. Ek olarak bu konuda yapılan temel araştırmalar dokümantasyon içerisinde yer almaktadır.

### Veritabanı olarak ne kullanılıyor?

Proje, MongoDB veritabanı ile çalışmaktadır. Veritabanı işlemleri için Prisma ORM kullanılarak tip güvenliği ve kolay yönetim sağlanmaktadır.

## 🚀 Teknolojiler

Projenin geliştirilmesinde kullanılan temel teknolojiler ve neden tercih edildikleri:

- **Next.js 15**: React tabanlı ve sunucu tarafında render desteği sağlayan framework. Performansı artırmak ve SEO uyumlu içerik üretmek için tercih edildi.
- **React 19**: Modern, bileşen tabanlı kullanıcı arayüzü geliştirmek için kullanıldı.
- **Prisma**: Tip güvenli ve kolay kullanılabilir ORM. Veritabanı işlemlerini güvenli ve hızlı hale getirmek için kullanıldı.
- **Tailwind CSS**: Hızlı ve esnek bir şekilde stil oluşturmak için kullanıldı.
- **NextAuth**: Kullanıcı kimlik doğrulama ve oturum yönetimi için kullanıldı.
- **React Hook Form**: Form yönetimini optimize etmek ve doğrulama süreçlerini kolaylaştırmak için kullanıldı.
- **Zod**: Form doğrulama ve tip denetimi için kullanıldı.
- **TanStack React Query**: Sunucu tarafı verileri önbelleğe almak ve asenkron işlemleri yönetmek için kullanıldı.
- **OpenAI API**: Yapay zeka tabanlı metin üretimi için kullanıldı.
- **Radix UI**: Erişilebilir ve stil verilebilir bileşenler sağlamak için kullanıldı.
- **Lucide-React**: Modern ve özelleştirilebilir ikonlar sağlamak için kullanıldı.

## 📁 Proje Yapısı

Yapı için [https://github.com/musayazlik/nextjs-starter-templete](https://github.com/musayazlik/nextjs-starter-templete) github reposu kullanıldı.

```
src/
├── app/
│   ├── api/               # API route'ları
│   │    ├── auth/         # Kimlik doğrulama endpoint'leri
│   │    ├── chat/         # Sohbetle ilgili endpoint'ler
│   │    │    └── [chatId] # Dinamik sohbet endpoint'i
│   │    └── gemini/       # Google Gemini API ile entegrasyon
│   ├── auth/              # Kimlik doğrulama sayfası
│   ├── panel/             # Yönetim paneli
│   ├── layout.tsx         # Uygulama düzeni
│   ├── page.tsx          # Ana giriş noktası
│   └── providers.tsx     # Context ve sağlayıcılar
│
├── components/            # Yeniden kullanılabilir bileşenler
│   ├── panel/             # Panel bileşenleri
│   └── ui/                # UI bileşenleri
│
├── constants/             # Sabit değişkenler
│   └── index.ts           # Sabitler tanımı
│
├── hooks/                 # Özel React hook'ları
│   └── auth/use-chat.ts   # Sohbet için özel hook
│
├── lib/                   # Yardımcı işlevler
│   ├── db.ts              # Prisma veritabanı bağlantısı
│   ├── motion.tsx         # Animasyonlar için motion bileşeni
│   └── utils.ts           # Genel yardımcı işlevler
│
├── services/              # İş mantığı servisleri
│   └── auth/              # Kimlik doğrulama servisi
│       └── register.service.ts
│
└── types/                 # Tür tanımlamaları
    ├── auth.types.ts      # Kimlik doğrulama türleri
    ├── chat.ts           # Sohbet türleri
    └── middleware.ts     # Middleware türleri
```

## 🔧 Kurulum

Projenin yerel ortamda çalıştırılması için aşağıdaki adımları takip edebilirsiniz:

### 1. Depoyu Klonlayın

```bash
git clone https://github.com/kullanici/invenza.git
cd invenza
```

### 2. Bağımlılıkları Kurun

```bash
bun install
```

### 3. Çevre Değişkenlerini Tanımlayın

`.env` dosyasını oluşturun ve aşağıdaki değişkenleri ekleyin:

```
AUTH_SECRET=<gizli-anahtar>
APP_URI=http://localhost:3000
MONGODB_URI=<mongodb-bağlantı-dizesi>
OPENAI_API_KEY=<openai-api-anahtarı>
GOOGLE_API_KEY=<google-api-anahtarı>
```

### 4. Veritabanını Ayarlayın

Prisma şemasını veritabanına yansıtın:

```bash
npx prisma db push
```

### 5. Geliştirme Ortamını Başlatın

```bash
bun run dev
```

### 6. Üretim Ortamı için Derleme

```bash
bun run build
bun run start
```

## 📌 Komutlar

- `bun run dev`: Geliştirme sunucusunu başlatır.
- `bun run build`: Uygulamayı üretim için derler.
- `bun run start`: Üretim sunucusunu başlatır.
- `bun run lint`: Kod kalitesini denetler.

## Temel Araştırma ve Kaynaklar

# **RAG (Retrieval-Augmented Generation) Sistemi**

## **Temel Mantık**

RAG, modelin dış bir bilgi kaynağından (örneğin veritabanı veya belge) veri çekerek daha doğru ve kapsamlı yanıtlar üretmesini sağlar. Bu süreç şu şekilde işler:

1. Model, gelen soruya karşılık dış kaynaktan ilgili veriyi alır.
2. Alınan veriler modelin yanıt üretme sürecine dahil edilir.
3. Model, hem kendi öğrenilmiş bilgilerini hem de dış kaynaktan alınan verileri kullanarak yanıt oluşturur.

## **Artıları**

- **Daha Doğru Yanıtlar:** Dış kaynaktan alınan veriler sayesinde yanıtlar daha doğru ve anlamlı olur.
- **Dinamik Veri Kullanımı:** Model, güncel ve gerçek zamanlı veri ile çalışabilir.
- **Büyük Veri Kaynaklarıyla Çalışma:** Model, büyük veri kümelerinden faydalanarak kapsamlı yanıtlar üretebilir.

## **Eksileri**

- **Ekstra Altyapı Gereksinimi:** Dış veri kaynağından bilgi çekebilmek için ekstra altyapı ve kaynak gerektirir.
- **Yanıt Süresi Uzunluğu:** Veri çekme süreci zaman alabilir ve yanıt sürelerini uzatabilir.
- **Doğru Veri Çekme Zorluğu:** Yanlış veya alakasız bilgi çekilebilir, bu da yanıtın kalitesini düşürebilir.

# **RAG (Retrieval-Augmented Generation) Sistemi Alternatifleri**

## **1. Full Context Embedding**

- **Temel Mantık:** Tüm veriler modelin bağlamına dahil edilir, böylece model soruya doğrudan yanıt üretir.
- **Artıları:**
  - Hızlı uygulama ve entegrasyon.
  - Basit altyapı gereksinimi.
- **Eksileri:**
  - Veritabanındaki tüm bilgilere önceden erişim gerektirir.
  - Büyük veri setleriyle çalışırken verimlilik düşebilir.

## **2. Fine-Tuning (Özelleştirilmiş Model Eğitimi)**

- **Temel Mantık:** Model, belirli bir görev veya veri kümesi üzerine özelleştirilir ve eğitilir.
- **Artıları:**
  - Model, özgül görevlerde daha yüksek doğruluk gösterir.
  - Mevcut verilerle daha uyumlu ve verimli olabilir.
- **Eksileri:**
  - Eğitimi zaman alabilir ve pahalı olabilir.
  - Büyük ve güncel veri gereksinimleri olabilir.

## **3. Few-Shot Learning**

- **Temel Mantık:** Model, çok az örnekle (genellikle birkaç örnek) belirli bir görevi öğrenir.
- **Artıları:**
  - Az veriyle hızlı öğrenme.
  - Daha az veri gereksinimiyle pratik uygulamalar.
- **Eksileri:**
  - Öğrenme süreci bazen sınırlı ve doğruluk düşük olabilir.
  - Modelin doğru sonuç üretmesi, sağlanan örneklerin kalitesine bağlıdır.

## **4. Knowledge Graphs (Bilgi Grafiklerine Dayalı Sistemler)**

- **Temel Mantık:** Bilgi grafiklerinde veriler, ilişkili düğümler ve bağlantılar olarak düzenlenir, model bu yapıyı kullanarak soruları yanıtlar.
- **Artıları:**
  - Derinlemesine bilgi ve ilişkilendirme sunar.
  - Karmaşık verilerle güçlü etkileşimler sağlar.
- **Eksileri:**
  - Karmaşık yapıların yönetimi ve güncellenmesi zordur.
  - Oluşan grafikleri doğru şekilde yapılandırmak için yüksek uzmanlık gerektirir.

## **5. Transformer-Only Models (Sadece Transformer Modelleri)**

- **Temel Mantık:** Sadece büyük dil modelleri (örneğin GPT, BERT) kullanılarak tüm görevler gerçekleştirilir, veri kaynağından ek bilgi alınmaz.
- **Artıları:**
  - Hızlı ve güçlü dil modelleme yetenekleri.
  - Daha az dış kaynak bağımlılığı.
- **Eksileri:**
  - Modelin bilgi dağarcığı sınırlıdır, dış veri kaynaklarıyla güncellenemez.
  - Büyük veri setleriyle çalışırken performans düşebilir.

## **6. Hybrid Models (Hibrid Modeller)**

- **Temel Mantık:** Hem dış veri kaynağından alınan bilgileri hem de modelin önceden öğrendiği bilgileri birleştiren bir yapı kullanılır.
- **Artıları:**
  - Dış kaynaklardan alınan veri ve modelin öğrenme kapasitesini birleştirir.
  - Yüksek doğruluk ve esneklik.
- **Eksileri:**
  - Altyapı ve entegrasyon karmaşıktır.
  - Zaman ve kaynak gereksinimleri yüksektir.
