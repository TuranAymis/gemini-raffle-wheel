<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Kovuldun Raffle Wheel 🎡

Eğlenceli ve sarkaztik bir çarkı döndür, kimin "kovulduğunu" öğren!

## 🚀 Hızlı Başlangıç

**Gereksinimler:** Node.js

1. Bağımlılıkları kur:

   ```bash
   npm install
   ```

2. `GEMINI_API_KEY` değerini [.env.local](.env.local) dosyasında ayarla (Gemini API anahtarı)

3. Uygulamayı çalıştır:
   ```bash
   npm run dev
   ```

## 📋 Seçenekleri Yönet

İlk açılışta örnek seçenekler (futbolcular) görünür. Listeyi değiştirdiğinizde liste bu tarayıcıya kaydedilir.

- **Tek tek ekle:** "Seçenek Ekle" kutusuna yazıp Ekle'ye basın (Enter de çalışır).
- **CSV veya Excel'den ekle:** .csv (virgül, noktalı virgül veya sekme ayracıyla) ya da .xlsx dosyası seçin. İlk sütundaki adlar alınır (Excel'de ilk sayfa); üst satır başlıksa atlanır. Aynı adlar tekrar eklenmez.
- **Temizle:** bütün seçenekleri siler.
- **Örnekler:** örnek listeyi geri yükler.
- **Paylaş:** seçenekleri içeren bir bağlantı kopyalar. Bu bağlantıyı açan herkes aynı seçeneklerle çarkı görür. Liste bağlantıya sığmayacak kadar büyükse uyarı çıkar.

En fazla 200 seçenek eklenebilir; her seçenek en fazla 60 karakter olur. Dosyalar ve seçenekler yalnızca tarayıcıda işlenir; hiçbir sunucuya gönderilmez.

## 🎨 Özellikler

- ✨ Dinamik çark (katılımcı sayısına göre uyarlanır)
- 🎭 Sarkaztik mesajlar ve eğlenceli animasyonlar
- ➕ Seçenek ekleme ve silme, CSV/Excel içe aktarma, paylaşım bağlantısı
- 🎉 Sonuç animasyonları ve confetti efektleri

## 📁 Proje Yapısı

```
├── public/
│   └── participants.json     # Katılımcı listesi
├── components/
│   └── Wheel.tsx            # Çark bileşeni
├── utils/
│   └── audio.ts             # Ses yönetimi
├── App.tsx                  # Ana uygulama
├── index.tsx                # Entry point
└── types.ts                 # TypeScript tipleri
```

## 🛠️ Teknolojiler

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Canvas (Çark çizimi için)
