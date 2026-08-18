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

## 📋 Katılımcıları Yönet

Katılımcıların adları [`public/participants.json`](public/participants.json) dosyasında tutulur.

### Katılımcı Eklemek:

- UI'dan "Katılımcı Ekle" bölümünü kullan, ya da
- `public/participants.json` dosyasını doğrudan düzenle

### JSON Formatı:

```json
{
  "names": [
    "Ahmet HACIOGLU",
    "Atakan ULUDAG",
    ...
  ]
}
```

## 🎨 Özellikler

- ✨ Dinamik çark (katılımcı sayısına göre uyarlanır)
- 🎭 Sarkaztik mesajlar ve eğlenceli animasyonlar
- ➕ Runtime'da katılımcı ekleme/silme
- 🎉 Sonuç animasyonları ve confetti efektleri
- 🎲 Seçicilik - PAS ve İFLAS segmentleri içerir

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
