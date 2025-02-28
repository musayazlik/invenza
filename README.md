# Invenza

Invenza, modern teknolojiler kullanılarak geliştirilmiş bir Next.js tabanlı web uygulamasıdır. Bu proje, güçlü bir kullanıcı yönetimi, yapay zeka entegrasyonu ve modern kullanıcı arayüzü sunar.

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

```
├── src
│   ├── components → Yeniden kullanılabilir bileşenler
│   ├── pages → Uygulama sayfaları
│   ├── lib → Yardımcı işlevler ve API çağrıları
│   ├── prisma → Prisma şeması ve migration dosyaları
│   └── styles → Tailwind için stil dosyaları
├── .env → Çevre değişkenleri
└── package.json → Bağımlılıklar ve scriptler
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
yarn install
# veya
npm install
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
yarn dev
# veya
npm run dev
```

### 6. Üretim Ortamı için Derleme

```bash
yarn build
yarn start
```

## 📌 Komutlar

- `yarn dev`: Geliştirme sunucusunu başlatır.
- `yarn build`: Uygulamayı üretim için derler.
- `yarn start`: Üretim sunucusunu başlatır.
- `yarn lint`: Kod kalitesini denetler.

## 📚 Katkıda Bulunma

Katkıda bulunmak isterseniz, lütfen bir "pull request" açmadan önce bir "issue" oluşturun. Tüm katkılar memnuniyetle karşılanır!

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
