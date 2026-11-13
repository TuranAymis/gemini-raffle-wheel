# Kurala — Tasarım Sistemi

Sürüm: 1.0 (MVP) · Kaynaklar: PRD (`kurala_r_n_gereksinimleri_belgesi_prd_proje_zeti.md`), Stitch paketi (`Kurala Decision Wheel`, `Decision Engine Slate`, 4 ekran).
Bu belge iki Stitch sistemini birleştirir ve gerekçeli kararları tek yerde toplar. Stitch'te çelişen ya da erişilebilirlik kuralını geçemeyen her değer burada düzeltilmiştir. Ayrıntılı bulgular: [stitch-incelemesi.md](./stitch-incelemesi.md).

Tüm kontrast oranları WCAG 2.x formülüyle hesaplanmıştır (metin için ≥ 4.5:1, büyük metin ve arayüz sınırları için ≥ 3:1).

---

## 1. Tasarım yönü

**Kurala sakin, sıcak ve tarafsız bir karar aracıdır.** Çark bir oyun gibi değil, bir toplantı ya da arkadaş grubunda herkesin güvendiği bir "hakem" gibi görünmeli. Görsel dil: beyaz/açık slate zeminler, tek bir net indigo vurgu, yumuşak yüzeyler ve çarkın renkleri. Koyu tema aynı karakteri korur, neon parıltı ve cam efektini taşımaz. Altın, kırmızı parlama ve rulet imgeleri kullanılmaz; kırmızı yalnızca silme ve hata durumlarında, o da küçük ve metinle birlikte görünür.

**Karar gerekçeleri**
- *Light tabanı, Decision Wheel sistemi esas alınır:* daha sakin, okunabilir ve PRD'deki "hafif, eğlenceli, tarafsız" hedefe daha yakın.
- *Koyu tema, Slate yüzey renkleriyle yapılır ama parıltı azaltılır:* gece/karanlık ortam kullanımı için iyi, fakat "tactical cockpit" ve neon dili PRD'nin "aşırı parlak ve dikkat dağıtıcı" eleştirisiyle çelişir.
- *Tek başlık ailesi (Plus Jakarta Sans):* iki tema için iki ayrı ekran dili (Space Grotesk + JetBrains Mono) yerine tek bir tutarlı ses. Geliştirici aracı hissi bırakılır.
- *Dekoratif değil, işlevsel renk:* çarkın 6 rengi dışında renk yalnızca durum (başarı, hata, odak) ve eylem için kullanılır.

---

## 2. Renk tokenları

Değerler HEX'tir. "Metin oranı" sütunu, o rengin ilgili arka plan üzerindeki tahmini kontrast oranıdır.

### 2.1 Açık tema (Light)

| Token | HEX | Kullanım | Kontrast |
| --- | --- | --- | --- |
| `bg-canvas` | `#F8FAFC` | Sayfa zemini | — |
| `bg-surface` | `#FFFFFF` | Kart, panel, input zemini | — |
| `bg-surface-muted` | `#F1F5F9` | Sürükle/bırak alanı, pasif kutu | — |
| `bg-tint` | `#E0E7FF` | Seçili chip, sayaç rozeti | — |
| `text-primary` | `#0F172A` | Başlık, seçenek adı | 17.06 (bg-canvas) |
| `text-secondary` | `#475569` | Açıklama, meta metin | 7.24 (bg-canvas) · 7.58 (white) |
| `text-on-primary` | `#FFFFFF` | Primer düğme metni | 6.29 (`primary` üzerinde) |
| `text-tint` | `#3730A3` | Sayaç rozeti metni | 8.06 (`bg-tint` üzerinde) |
| `primary` | `#4F46E5` | Primer düğme, aktif durum, odak halkası | 6.29 (beyaz üzerinde) · 6.01 (bg-canvas üzerinde odak) |
| `primary-hover` | `#4338CA` | Primer düğme hover | Beyaz metin için daha koyu, güvenli |
| `border-control` | `#64748B` | Input ve kutu kenarlığı (UI bileşeni sınırı) | 4.76 (white) |
| `border-subtle` | `#E2E8F0` | Dekoratif ayraç, kart kenarı (metin değil) | Dekoratif; sınır olarak tek başına kullanılmaz |
| `success` | `#047857` | Başarı metni, "Hazır" durumu | 5.48 (white) |
| `warning` | `#B45309` | Uyarı metni (ör. liste bağlantıya sığmıyor) | 5.02 (white) |
| `error` | `#B91C1C` | Hata metni, silme hover'ı | 6.47 (white) |
| `focus-ring` | `#4F46E5` | `:focus-visible` halkası, 2px + 2px ofset | 6.01 (bg-canvas) |
| `overlay` | `rgba(15,23,42,0.40)` + `blur(8px)` | Modal arka planı | — |

### 2.2 Koyu tema (Dark)

| Token | HEX | Kullanım | Kontrast |
| --- | --- | --- | --- |
| `bg-canvas` | `#0F172A` | Sayfa zemini (düz, gradyansız) | — |
| `bg-surface` | `#1E293B` | Kart, panel, input zemini | — |
| `bg-surface-muted` | `#273449` | Sürükle/bırak alanı, pasif kutu | — |
| `bg-tint` | `#312E81` | Seçili chip, sayaç rozeti | Metin: `text-tint` ile 7.66 |
| `text-primary` | `#F8FAFC` | Başlık, seçenek adı | 17.06 (bg-canvas) · 13.98 (bg-surface) |
| `text-secondary` | `#94A3B8` | Açıklama, meta metin | 6.96 (bg-canvas) · 5.71 (bg-surface) · 4.89 (bg-surface-muted) |
| `text-tint` | `#C7D2FE` | Sayaç rozeti metni | 7.66 (`bg-tint` üzerinde) |
| `primary` | `#818CF8` | Primer düğme zemini, odak halkası, vurgu metni | 5.98 (bg-canvas) |
| `text-on-primary` | `#0F172A` | Primer düğme metni (açık zemin üzerinde koyu metin) | 5.98 (`primary` üzerinde) |
| `primary-hover` | `#A5B4FC` | Primer düğme hover | 8.96 (metin `#0F172A` ile) |
| `border-control` | `#64748B` | Input ve kutu kenarlığı | 3.75 (bg-canvas) · 3.07 (bg-surface) |
| `border-subtle` | `#334155` | Dekoratif ayraç, kart kenarı | Dekoratif; sınır olarak kullanılmaz (1.72) |
| `success` | `#34D399` | Başarı metni, "Hazır" durumu | 9.29 (bg-canvas) |
| `warning` | `#FBBF24` | Uyarı metni | 10.69 (bg-canvas) |
| `error` | `#F87171` | Hata metni | 6.45 (bg-canvas) |
| `focus-ring` | `#818CF8` | `:focus-visible` halkası | 5.98 (bg-canvas) |
| `overlay` | `rgba(2,6,23,0.60)` + `blur(8px)` | Modal arka planı | — |

> Koyu tema primer düğmesi `#6366F1` zeminle beyaz metin kullanmaz: `#F8FAFC` metin bu zeminde 4.27:1 kalır ve küçük etiketler için yetersizdir. Bu yüzden zemin açılır (`#818CF8`) ve metin koyulaşır (`#0F172A`, 5.98:1).

---

## 3. Çark renkleri

### 3.1 Dilim paleti

Dilim renkleri sırayla döner. Her dilimin etiket rengi, zemin üzerinde ≥ 4.5:1 olacak şekilde seçilir; beyaz metin yalnızca koyu dilimlerde kullanılır.

**Açık tema**

| Sıra | Dilim | HEX | Etiket rengi | Kontrast |
| --- | --- | --- | --- | --- |
| 1 | Indigo | `#4F46E5` | `#FFFFFF` | 6.29 |
| 2 | Turkuaz | `#06B6D4` | `#0F172A` | 7.35 |
| 3 | Zümrüt | `#10B981` | `#0F172A` | 7.04 |
| 4 | Kehribar | `#F59E0B` | `#0F172A` | 8.31 |
| 5 | Mercan pembe | `#FB7185` | `#0F172A` | 6.63 |
| 6 | Mor | `#A855F7` | `#0F172A` | 4.51 (sınırda; gerekirse `#9333EA`) |

**Koyu tema**

| Sıra | Dilim | HEX | Etiket rengi | Kontrast |
| --- | --- | --- | --- | --- |
| 1 | Indigo | `#818CF8` | `#0F172A` | 5.98 |
| 2 | Turkuaz | `#22D3EE` | `#0F172A` | 9.88 |
| 3 | Zümrüt | `#34D399` | `#0F172A` | 9.29 |
| 4 | Kehribar | `#FBBF24` | `#0F172A` | 10.69 |
| 5 | Mercan pembe | `#FDA4AF` | `#0F172A` | 9.44 |
| 6 | Mor | `#C084FC` | `#0F172A` | 6.76 |

### 3.2 Döngü ve ayırma kuralları
- 2–6 dilim: paletten sırayla, komşu dilimler farklı renk olacak şekilde.
- 7+ dilim: palet baştan tekrar eder. Son dilimin rengi ilk dilimle aynıysa son dilim 2. sıradaki renge alınır; komşu dilimler hiçbir zaman aynı renk olmaz.
- Dilimler arası ayırıcı: 2px. Açık temada `#FFFFFF`, koyu temada `#1E293B`.
- Renk tek başına anlam taşımaz: liste satırındaki renk noktası ile çark dilimi aynı rengi gösterir, ama seçenek adı her zaman metinle yazılır (renk körlüğü için).

### 3.3 Dilim yazısı
- Yazı tipi: Plus Jakarta Sans 600, büyük harf **kullanılmaz** (Stitch'teki `uppercase` dilim etiketleri okumayı zorlaştırır; isimler olduğu gibi yazılır).
- Yönlendirme: dilimin orta açısına göre radyal, merkezden dışa doğru, okunabilir yönde (dilim yarısındaki yazı ters dönmez; gerekirse 180° çevrilir).
- Boyut ölçeği: dilim sayısı ve çark çapına göre 16px → 12px arasında küçülür. 12px altına inilmez.
- Sığmayan isimler: sonu `…` ile kısaltılır. Tam ad, dilimin üzerine gelince ya da odaklanınca sonuç ekranında ve listede görünür.
- Metin yalnızca dilimin kendi rengi üzerinde çizilir; dilim sınırına taşan metin kesilir (taşma yok).

### 3.4 Merkez, işaretçi ve dış halka

| Parça | Açık tema | Koyu tema |
| --- | --- | --- |
| Merkez "Döndür" düğmesi | 80px daire, `primary` `#4F46E5`, metin beyaz, Level 2 gölge | 80px daire, `primary` `#818CF8`, metin `#0F172A` |
| İşaretçi (12 saat) | Damla biçimli, dolgu `#0F172A`, dış çizgi `#FFFFFF` 2px (her dilim renginde okunur) | Dolgu `#F8FAFC`, dış çizgi `#0F172A` 2px |
| Dış halka | `#FFFFFF`, dıştan `border-subtle` ince çizgi | `#1E293B` zemin, `#334155` ince çizgi; parıltı yok |
| Platform gölgesi | `0 12px 32px -8px rgba(79,70,229,0.12)` | `0 12px 32px -8px rgba(0,0,0,0.5)` |

- İşaretçi dönüş sırasında dilim sınırını geçtiğinde 8° titreşir (ayrıntı için bölüm 6).
- Dönüş bittiğinde kazanan dilim hafifçe parlamaz; yalnızca işaretçi altındaki dilimin sınır çizgisi `primary` renkte 3px olur.

---

## 4. Tipografi

**Aileler**
- Başlık ve kontroller: **Plus Jakarta Sans** (400, 600, 700, 800)
- Gövde ve listeler: **Inter** (400, 500)
- Monospace kullanılmaz. Sayılar (ör. "%16.7") Inter'in tabular-nums özelliğiyle hizalanır.

> PRD'de Space Grotesk geçiyor. Bu belgede Plus Jakarta Sans'ın tek başlık ailesi olması kararı alındı (varsayım: ürün sahibi onaylamalı). Space Grotesk ve JetBrains Mono kaldırıldı.

| Ad | Boyut / satır | Ağırlık | Harf aralığı | Kullanım |
| --- | --- | --- | --- | --- |
| `display` | 40 / 48 (mobil 30 / 38) | 800 | -0.02em | Sonuç adı (kazanan) |
| `headline-lg` | 32 / 40 (mobil 24 / 32) | 700 | -0.015em | Modal başlığı ("Karar Verildi!") |
| `headline-md` | 22 / 30 | 600 | 0 | Panel başlığı ("Seçenekler") |
| `headline-sm` | 18 / 26 | 600 | 0 | Bölüm başlığı, boş durum başlığı |
| `body-lg` | 18 / 28 | 400 | 0 | Boş durum açıklaması, sonuç açıklaması |
| `body-md` | 16 / 24 | 400 | 0 | Seçenek adı, genel metin, input |
| `body-sm` | 14 / 20 | 400 | 0 | Yardım metni, meta |
| `label-lg` | 16 / 20 | 600 | 0.01em | Büyük düğme |
| `label-md` | 14 / 18 | 600 | 0.01em | Düğme, chip, sayaç rozeti |
| `label-sm` | 12 / 16 | 500 | 0.02em | Yalnızca yardımcı etiket (12px altı yok) |

Kurallar:
- Input ve textarea metni **16px** (`body-md`) — iOS Safari'nin giriş alanında otomatik yakınlaştırmasını önler.
- Metin satırı uzunluğu: gövde metni en fazla ~70 karakter.
- Büyük harf yalnızca çok kısa etiketlerde (ör. "CSV") kullanılır; cümleler büyük harfle yazılmaz.

---

## 5. Boşluk, boyut ve köşe

**Boşluk (4px tabanlı)**

| Token | Değer | Kullanım |
| --- | --- | --- |
| `space-xs` | 4px | İkon–metin arası |
| `space-sm` | 8px | Chip içi, satır içi boşluk |
| `space-md` | 16px | Kart iç boşluğu (mobil), bileşenler arası |
| `space-lg` | 24px | Kart iç boşluğu (masaüstü), bölümler arası |
| `space-xl` | 40px | Sayfa üst boşluğu (masaüstü) |

Kenar boşluğu: mobil 16px, tablet 24px, masaüstü 40px. Panel boşlukları: `gutter` 16px (mobil), 24px (masaüstü).

**Dokunma hedefi:** tüm düğme, ikon düğmesi, sil, sayaç artırıcı ve anahtar için görünür alan küçük olsa bile tıklama alanı **44 × 44 px**. Liste satırındaki sil düğmesi 20px ikon + 44px alan olarak yapılır.

**Köşe yuvarlaklığı**

| Öğe | Değer |
| --- | --- |
| Düğme, input, liste satırı | 8px |
| Kutucuk (checkbox) | 6px |
| Chip, sayaç rozeti, merkez düğme | tam yuvarlak (9999px) |
| Kart, panel, bottom sheet | 16px |
| Modal | 24px |

**Yükseklik ve gölge**

| Seviye | Açık tema | Koyu tema |
| --- | --- | --- |
| 0 — Zemin | `bg-canvas` | `bg-canvas` |
| 1 — Kart / input | `0 2px 8px -2px rgba(15,23,42,0.05)` + `border-subtle` | `0 4px 12px -2px rgba(0,0,0,0.3)` + `#334155` ince çizgi |
| 2 — Çark platformu | `0 12px 32px -8px rgba(79,70,229,0.12)` | `0 12px 32px -8px rgba(0,0,0,0.5)` |
| 3 — Modal | `0 20px 40px -12px rgba(15,23,42,0.18)` | `0 20px 40px -12px rgba(0,0,0,0.6)` |

Cam efekti (`backdrop-filter`) yalnızca modal arka planında kullanılır. Paneller ve kartlar opak arka planlıdır (yüzde 70–85 saydamlık ve blur, arkadaki metnin kontrastını öngörülemez kılar).

---

## 6. Hareket

| Olay | Süre | Eğri | Not |
| --- | --- | --- | --- |
| Çark dönüşü | 4.0–5.0 sn | `cubic-bezier(0.17, 0.67, 0.12, 0.99)` | Sonuç, dönüş bitmeden belli olmaz; açı önceden seçilir |
| İşaretçi titreşimi | 120 ms | ease-out | Dilim sınırı geçildiğinde 8°, dönüş hızına göre |
| Düğme basma | 100 ms | ease-out | `scale(0.97)` |
| Satır ekleme | 180 ms | ease-out | Yukarıdan 8px kayarak belirir |
| Satır silme | 150 ms | ease-in | Yükseklik çöker; "Geri al" bildirimi 5 sn |
| Sonuç modalı | 220 ms | ease-out | Aşağıdan 12px + opaklık |
| Konfeti | 1.2 sn | — | Tek seferlik; "Sonuç konfeti kutlaması" kapalıysa yok |
| Bildirim (toast) | 200 ms | ease-out | 4 sn görünür, hover/odakta duraklar |

**`prefers-reduced-motion: reduce`:** çark dönüşü 1.5 sn'ye düşer ve son yavaşlama eğrisi basitleşir; işaretçi titreşimi, konfeti ve modal kayması kapanır. Sonuç yine tam olarak gösterilir.

---

## 7. Ekranlar

### 7.1 Ana ekran (liste ve çark)

**Masaüstü (≥ 1024 px)** — iki sütun, toplam genişlik sınırlı (en fazla 1280 px, ortalı).
- Sol (yaklaşık 7/12): üst satırda "Canlı Karar Modu" yerine yalın durum metni ("Döndürmek için Döndür'e basın veya Space'e basın"), sağda "Örnekler" düğmesi ve ses ayarı. Altında çark (en fazla 640 px). Çarkın altında "Döndür" (birincil, 56px yükseklik), "Karıştır", "Tam Ekran" ve bir satırda "Eşit şans: %16.7 · 6 seçenek".
- Sağ (yaklaşık 5/12, 380–440 px): "Seçenekler" paneli. Başlık + sayaç rozeti + "Paylaş" / "Temizle". Ekleme alanı (input + "Ekle"), altında "Toplu ekle (CSV / Excel)" ikincil düğme, sonra seçenek listesi (kendi kaydırma alanı), en altta iki ayar anahtarı ("Kazananı çarktan otomatik çıkar", "Sonuç konfeti kutlaması").
- En alt: gizlilik kartı, tek satır başlıkla: "Verileriniz tarayıcınızda saklanır, sunucuya iletilmez."
- Footer: marka adı, tek cümle slogan, bağlantılar ("Nasıl çalışır?", "Gizlilik"), telif (yıl dinamik).

**Mobil (< 768 px)** — tek sütun, kenar boşluğu 16px.
- Üstte çark: genişlik `min(88vw, 360px)`, ortada. Döndür düğmesi çarkın hemen altında.
- Çarkın altında tek satır: "Seçenekler (6)" + "Düzenle" düğmesi (44px). Düzenle, tam yükseklikte bir **alt sayfa (bottom sheet)** açar; içinde ekleme, içe aktarma, liste, ayarlar ve Temizle / Örnekler / Paylaş bulunur.
- Alt sayfa kapatma: sağ üstte X, aşağı kaydırma, `Esc`. Açılınca odak sayfanın başlığına gider; kapanınca "Düzenle" düğmesine döner.
- Gizlilik kartı en altta, daraltılabilir.

**Durumlar**
- *Boş:* çark yerine boş daire (kesik çizgi) ve boş durum mesajı (bölüm 7.5). Döndür devre dışı.
- *Dolu (2 seçenek ve üstü):* normal.
- *Tek seçenek:* Döndür devre dışı, altında "En az iki seçenek gerekir."
- *Yükleniyor (içe aktarma):* panel üstünde ince ilerleme çizgisi, metin "Dosya okunuyor…".
- *Dönüyor:* Döndür düğmesi "Dönüyor…" olur, devre dışı; liste düzenlenemez (kilitli, görsel olarak soluk değil, yalnızca düğmeler devre dışı).
- *Hata:* ilgili alanın altında metin, toast ile birlikte.

### 7.2 Seçenek ekleme ve içe aktarma

**Tek tek ekleme**
- Input placeholder: "Yeni seçenek ekle (ör. Lahmacun, Kadıköy…)". Enter ve "Ekle" aynı işi yapar.
- Boş gönderimde input odakta kalır ve kısa hata gösterilir: "Lütfen bir ad yazın."
- Tekrar eden ad: eklenmez, input altında "Bu seçenek zaten listede." (açıklama, kırmızı değil; `warning` rengi).
- 60 karakter sınırı: sayaç "42/60" yalnızca 40+ karakterde görünür.
- 200 seçenek sınırına ulaşınca input devre dışı, altında: "En fazla 200 seçenek ekleyebilirsiniz."

**CSV / Excel içe aktarma**
- Tıklanabilir alan + sürükle-bırak (masaüstü). Kabul edilen dosyalar: `.csv`, `.txt`, `.xlsx`. Metin etiketi: "Toplu Ekle / CSV & Excel İçe Aktar".
- Yükleme sırasında: "Dosya okunuyor…" ve iptal düğmesi.
- Başarı (toast + panel durum satırı): "3 yeni seçenek eklendi, 1 mükerrer kayıt atlandı."
- Tüm satırlar mükerrerse: "Eklenecek yeni seçenek yok. Tüm adlar listede zaten var."
- Hata: "Dosya okunamadı. CSV veya XLSX dosyası seçin." Dosya boyutu/limiti aşılırsa: "Dosya çok büyük. En fazla 200 seçenek alınabilir."

### 7.3 Çark ve sonuç

**Çark** — bölüm 3 ve 6'daki kurallar. Ek olarak:
- Klavye: `Space` ya da `Enter` (çark odaktayken) ile döndürür. Ekran okuyucuda çark bir `button` içindeki açıklamalı bir grafik gibi duyurulur: "Çark, 6 seçenek. Döndürmek için Döndür düğmesine basın."
- Dönüş bitince `aria-live="polite"` ile kazanan adı duyurulur.

**Sonuç penceresi (modal)**
- Başlık: "Karar Verildi!" (`headline-lg`). Rozet: "Kurala Sonucu".
- Kazanan adı `display` boyutunda, ortada, bir kart içinde. Altında küçük satır: "6 seçenek arasından %16.7 eşit şans oranıyla seçildi."
- Açıklama (body-md): "Seçim tamamlandı. Kazananı listeden çıkarabilir veya yeni bir tur başlatabilirsiniz."
- Düğmeler: **Tekrar Çevir** (primer), **Listeden Çıkar** (ikincil); altta tam genişlik **Sonucu Paylaş / Kopyala** (ikincil).
- Kapat: sağ üstte X (44px), altta "Kapat (Esc)" metni. Dış tıklama kapatır. Odak tuzağı; kapanınca odak çarkın Döndür düğmesine döner.
- Konfeti: kutlama için tek seferlik, sonuç penceresinin arkasında; kapalıysa yok.
- Emoji kullanılmaz; başlıkta ve rozette ikonlar (trophy, check-circle) kullanılır.

**Listeden Çıkar** kazananı listeden kaldırır, çarkı yeniden boyutlandırır ve toast ile "Seçenek listeden çıkarıldı. Geri al" bildirir.

### 7.4 Paylaşım

- "Paylaş" düğmesi bağlantıyı panoya kopyalar. Başarılıysa düğme 2 sn "Kopyalandı" ikonuna döner.
- Toast (başarı): "Bağlantı panoya kopyalandı! Arkadaşlarınızla paylaşabilirsiniz."
- Panoya erişim yoksa (tarayıcı izni): "Kopyalanamadı. Bağlantıyı adres çubuğundan kopyalayın." ve bağlantı bir salt okunur alanda gösterilir.
- Liste bağlantıya sığmıyorsa: düğme devre dışı değil, tıklanınca `warning` renkli uyarı: "Liste bağlantıya sığmayacak kadar uzun. Seçenek sayısını azaltın." Uyarı, panel içinde kalıcı bir satır olarak da görünür (yalnızca paylaşım sınırı aşıldığında).
- Paylaşılan bağlantıyı açan kişi, çarkı aynı seçeneklerle görür; ekranda kısa bir bilgi satırı: "Bu çark bağlantıdan açıldı. Değişiklikleriniz yalnızca bu tarayıcıda saklanır."

### 7.5 Boş durum ve ilk açılış

**İlk açılış (örnek liste)** — "En iyi futbolcular" örnek listesi yüklenir. Üstte tek seferlik ipucu kartı (kapatılabilir, tarayıcıda hatırlanır):
- Başlık: "Kendi listenizi oluşturun"
- Metin: "Örnek liste hazır. Seçenekleri yukarıdan tek tek ekleyebilir ya da CSV / Excel dosyasından içe aktarabilirsiniz. Değişiklikleriniz bu tarayıcıda saklanır."
- Düğme: "Anladım" (ikincil) ve "Örnekleri kaldır" (metin düğmesi, Temizle'ye yönlendirir).

**Liste boşaldığında** (Temizle sonrası):
- Başlık (`headline-sm`): "Seçenek listeniz boş"
- Açıklama: "Çarkı döndürmek için yukarıdan yeni seçenekler ekleyin ya da hızlı örnek listeyi yükleyin."
- Düğmeler: **Örnekleri yükle** (primer), **Seçenek ekle** (ikincil, input'a odaklanır).
- Çark yerine kesik çizgili daire, ortasında kutu ikonu.

**Temizle onayı** (dialog):
- Başlık: "Tüm seçenekler silinsin mi?"
- Metin: "Bu işlem geri alınamaz. Örnek listeyi daha sonra yeniden yükleyebilirsiniz."
- Düğmeler: **Vazgeç** (ikincil, varsayılan odak), **Evet, temizle** (tehlikeli: `error` metin rengi, beyaz değil).

### 7.6 Bildirimler (toast ve durum)

- Konum: masaüstünde sağ alt, mobilde alt kenar (alt çubuk varsa üstünde). En fazla iki bildirim görünür.
- `role="status"` (başarı, bilgi) ve `aria-live="polite"`; hata için `role="alert"` (yalnızca kullanıcının eylemi başarısız olduğunda).
- Her bildirimde kapatma düğmesi (44px). Otomatik kapanma 4 sn; hata bildirimi 6 sn.
- Metinler (bölüm 9): başarı → `success` ikonu + gri gövde; hata → `error` ikonu; bilgi → `primary` ikonu. Renk tek başına anlam taşımaz; ikon ve metin birlikte.

### 7.7 Tema

- Varsayılan: koyu. Tercih, sistem ayarına (`prefers-color-scheme`) göre ilk açılışta belirlenir; kullanıcı üst çubuktaki düğmeyle değiştirir ve tercih tarayıcıda saklanır.
- Geçiş: tüm renkler token ile değişir; geçişte `transition: background-color 200ms, color 200ms` (reduced-motion'da kapalı).
- Her iki temada aynı bileşen, aynı boşluk ve aynı düzen. Yalnızca token değerleri değişir.

### 7.8 Hazır Şablonlar

Üst çubuktaki "Hazır Şablonlar" girişi MVP'de kalır. Ekran, ana akışı bozmadan açılan bir pencere olarak tasarlanır.

- **Üst çubuk (masaüstü):** marka · gizlilik rozeti · "Karar Çarkı" · "Hazır Şablonlar" · "Geçmiş Sonuçlar" · dil seçici · tema · yardım.
- **Pencere:** masaüstünde modal, en fazla 720 px genişlik, 24px köşe. Başlık "Hazır Şablonlar" (`headline-md`), altında kısa metin: "Bir şablon seçin; seçenekleri listenize ekleyelim."
- **Kartlar:** masaüstünde 2 sütun, mobilde tek sütun (mobilde pencere alt sayfa olur). Her kart: lucide ikon (24px, `primary`), şablon adı (`headline-sm`), bir satır açıklama (`body-sm`, `text-secondary`), "12 seçenek" rozeti (`bg-tint`), altta "Bu şablonu kullan" düğmesi (ikincil). Kart, tamamı tıklanabilir alan (44px üstü), hover'da kenarlık `primary`.
- **Şablonlar (ilk sürüm, PRD Faz 3 listesinden):** Yemek (`UtensilsCrossed`), Film (`Film`), Kutu Oyunları (`Dices`), Takım Eşleştirme (`Users`). İçerikler ürün sahibi onayı bekler.
- **Yükleme davranışı:**
  - Liste boşsa: şablon doğrudan yüklenir; toast: "{şablon} şablonu yüklendi: {n} seçenek."
  - Liste doluysa: küçük onay dialogu. Başlık: "Şablon nasıl eklensin?" Düğmeler: **Listeye ekle** (primer, mükerrerler atlanır, toast: "{n} yeni seçenek eklendi, {k} mükerrer kayıt atlandı."), **Mevcut listenin yerine koy** (ikincil, tehlikeli metin rengi), **Vazgeç** (metin düğmesi, varsayılan odak).
- **Kapatma:** sağ üstte X (44 px), `Esc`, dış tıklama. Kapanınca odak "Hazır Şablonlar" düğmesine döner.
- **Durumlar:** normal, odak (kart ve düğme `:focus-visible` halkası), hover. Şablon verisi yerel olduğu için yükleniyor ve hata durumu yoktur.
- **Metinler:** "Hazır Şablonlar" · "Bu şablonu kullan" · "Şablon nasıl eklensin?" · "Listeye ekle" · "Mevcut listenin yerine koy" · "Vazgeç" · "{n} seçenek".

### 7.9 Geçmiş Sonuçlar

Her tamamlanan karar (sonuç penceresi açıldığında) tarayıcıda kaydedilir. Geçmiş, paylaşım bağlantısına dahil edilmez; yalnızca bu tarayıcıda görünür ve sunucuya gönderilmez.

- **Kayıt:** kazanan adı, seçim zamanı (yerel saat, "13 Kasım 2026, 14:32"), seçenek sayısı ve eşit şans oranı. En fazla 50 kayıt tutulur; yeni kayıt en üste eklenir, eski kayıt silinir.
- **Erişim:** üst çubuktaki "Geçmiş Sonuçlar" girişi. Masaüstünde modal (en fazla 720 px, 24px köşe); mobilde alt sayfa. Başlık "Geçmiş Sonuçlar" (`headline-md`), sağ üstte X.
- **Liste:** her satır bir kayıt: kazanan adı (`body-lg`, `text-primary`), altında tarih ve saat + "6 seçenek · %16.7" (`body-sm`, `text-secondary`). Satır sol kenarında kazananın dilim rengi (4px çizgi). En yeni üstte. Satırlar tıklanabilir değildir; yalnızca okunur.
- **Tek tek silme:** yok (MVP). Tüm geçmiş tek seferde silinir.
- **Altta eylem:** "Geçmişi temizle" (ikincil, tehlikeli metin rengi). Tıklanınca onay dialogu: başlık "Geçmiş silinsin mi?", gövde "Bu işlem geri alınamaz.", düğmeler **Vazgeç** (varsayılan odak) ve **Evet, sil** (`error` metin rengi).
- **Boş durum:** başlık "Henüz sonuç yok", açıklama "Çarkı döndürdüğünüzde sonuçlar burada görünür.", ikon `History` (kesik çizgili daire içinde). Temizle düğmesi gizlenir.
- **Sayaç:** pencere başlığının yanında "12 kayıt" rozeti (`bg-tint`). 50 kayda ulaşınca "En fazla 50 kayıt tutulur." yardım metni.
- **Durumlar:** normal, odak (satır yok, yalnızca düğmeler ve X odaklanır), boş, dolu. Hata durumu yoktur (yerel veri); depolama kullanılamazsa pencere "Geçmiş bu tarayıcıda kaydedilemiyor." uyarısını gösterir ve yeni kayıt yapılmaz.
- **Kapatma ve odak:** `Esc`, X, dış tıklama. Kapanınca odak "Geçmiş Sonuçlar" düğmesine döner.
- **Hareket:** pencere açılışı 220 ms (bölüm 6 ile aynı); liste öğeleri aynı anda değil, sırayla değil, tek blok olarak görünür.
- **Metinler:** bölüm 9'da.

---

## 8. Bileşenler ve durumları

| Bileşen | Varyant | Normal | Odak (`:focus-visible`) | Devre dışı | Hata / diğer |
| --- | --- | --- | --- | --- | --- |
| **Primer düğme** | Döndür, Ekle, Evet/Tekrar Çevir | Açık: `#4F46E5` + beyaz · Koyu: `#818CF8` + `#0F172A` | 2px `focus-ring`, 2px ofset | %40 opaklık, imleç `not-allowed` | Dönüyorken "Dönüyor…" |
| **İkincil düğme** | Karıştır, Paylaş, Temizle | Açık: beyaz zemin + `border-control` 1.5px · Koyu: `#1E293B` + `#64748B` 1.5px | Aynı halka | Aynı | — |
| **Metin düğmesi** | Vazgeç, Kapat, Örnekleri kaldır | Metin `primary` | Aynı halka | — | — |
| **Tehlikeli düğme** | Evet, temizle (dialog) | Metin `error`, zemin beyaz (açık) / `#1E293B` (koyu) | Aynı halka | — | — |
| **İkon düğmesi** | Sil, X, ses, tema | 44 × 44, ikon 20px, hover'da zemin %8 tint | Aynı halka | Aynı | Sil: hover'da metin `error` |
| **Input** | Seçenek adı, arama yok | Yükseklik 48px, kenarlık `border-control` 1px, zemin `bg-surface` | Kenarlık `primary` 2px + halka | Soluk zemin | Hata: kenarlık `error`, altında metin (ikon ile) |
| **Seçenek satırı** | Liste öğesi | Renk noktası (12px) + ad + `1x` rozeti + sil | Satır kenarlığı `primary` | — | Düzenleme modunda input |
| **Sayaç rozeti** | "6 seçenek" | `bg-tint`, `text-tint`, label-sm | — | — | — |
| **Chip** | Örnek listeler (ileride) | 36px yükseklik, 16px yatay boşluk | Aynı halka | — | — |
| **Kutucuk (checkbox)** | Otomatik çıkar, konfeti | 20px, 6px köşe, kenarlık `border-control` | Halka | Soluk | — |
| **Anahtar (switch)** | Konfeti, otomatik çıkar | Parça 44 px yükseklikte dokunma alanı içinde; açıkken `primary` | Halka | Soluk | — |
| **Kart** | Gizlilik, ipucu | `bg-surface`, 16px köşe, gölge seviye 1 | — | — | — |
| **Modal** | Sonuç, Temizle onayı | 24px köşe, gölge 3, arka plan `overlay` | — | — | Odak tuzağı, Esc |
| **Alt sayfa** | Mobil düzenleme | Üst köşeler 16px, tutma çubuğu | — | — | Esc ve X ile kapanır |
| **Bildirim** | Başarı, hata, bilgi | Kart, 16px köşe, ikon + metin | Kapatma düğmesi halka | — | Otomatik kapanır |
| **Çark (dilim)** | Bölüm 3 | Dilim rengi + etiket | Çark odaklanınca yalnızca açıklama | — | Sığmayan metin `…` |
| **Merkez düğme** | Döndür | 80px daire | Halka | Dönüyorken soluk | — |

**Kontrol boyutu özeti:** tüm etkileşimli öğeler 44 × 44 px dokunma alanına sahiptir; görsel boyut daha küçük olabilir.

---

## 9. Metinler ve yerelleştirme

Varsayılan dil **İngilizce**dir. Desteklenen diller: English (`en`, varsayılan), Türkçe (`tr`), Deutsch (`de`), Español (`es`), 日本語 (`ja`), 中文 简体 (`zh-CN`). Tüm metinler ve anahtarları [metin-sozlugu.md](./metin-sozlugu.md) dosyasındadır; aşağıdaki liste Türkçe referanstır.

**Dil kuralları**
- İlk ziyarette dil İngilizcedir. Tarayıcı dili otomatik algılanmaz (V12).
- Dil seçici üst çubukta; her dil kendi adıyla gösterilir (English, Türkçe, Deutsch, Español, 日本語, 中文). Seçim tarayıcıda saklanır ve paylaşım bağlantısına eklenmez.
- Eksik çeviri anahtarında İngilizce metin gösterilir; ekranda anahtar adı asla görünmez.
- Marka adı (Kurala) ve örnek seçenek adları (Ronaldo, Messi…) çevrilmez.
- Sayı ve yüzdeler dile göre biçimlenir (`16.7%` / `16,7 %`); tarih ve saat yerel biçimde gösterilir.

**Yazı tipi ve düzen (dile göre)**
- Latin diller (en, tr, de, es): Plus Jakarta Sans ve Inter.
- Japonca ve Çince: Plus Jakarta Sans/Inter Japonca ve Çince glif içermez; `Noto Sans JP` ve `Noto Sans SC` yedek yazı tipi olarak yüklenir. CJK metinde satır yüksekliği en az 1.6, harf aralığı 0.
- `uppercase` ve italik yalnızca Latin dillerde kullanılır.
- Almanca metin İngilizceden yaklaşık %30 uzun olabilir: düğmeler, chip'ler ve sekmeler sığmazsa iki satıra iner; genişlik sabit verilmez. Japonca ve Çince metin kısa ama yüksektir: dilim etiketleri, ölçülerek küçültülür (en az 12px).
- Her dilde 390px genişlikte yatay kaydırma olmaz; alt sayfa ve modal düğmeleri dar ekranda alt alta dizilir.

**Dil yazım kuralları**
- Türkçe büyük/küçük harf: `toLocaleUpperCase("tr")` ve `toLocaleLowerCase("tr")` kullanılır (İ/ı ayrımı); seçenek adı karşılaştırması zaten bu kuralla test edilmiştir.
- Tırnak: Almanca „…", İspanyolca ¿…? ¡…!, Japonca 「」, Çince “”.
- Düğme metinleri kısa fiil biçiminde yazılır (Almanca: Infinitiv; Japonca: 〜する yerine kısa ad).

**Türkçe referans**

**Marka ve üst bilgi**
- Uygulama adı: Kurala
- Gizlilik rozeti: "Verileriniz tarayıcınızda saklanır, sunucuya iletilmez"
- Gizlilik kartı: "Girdiğiniz tüm liste elemanları yalnızca web tarayıcınızda saklanır. Hiçbir girdi, oylama verisi veya sonuç uzak sunuculara iletilmez."

**Çark ve eylemler**
- Durum (çark üstü): "Döndürmek için Döndür'e veya Space tuşuna basın"
- Merkez düğme: "Döndür" · dönerken: "Dönüyor…"
- "Karıştır" · "Tam Ekran" · "Örnekler" · "Paylaş" · "Temizle"
- Eşit şans: "Eşit şans: %16.7 · 6 seçenek"

**Seçenek paneli**
- Başlık: "Seçenekler" · sayaç: "6 seçenek"
- Placeholder: "Yeni seçenek ekle (ör. Lahmacun, Kadıköy…)"
- Ekle düğmesi: "Ekle"
- İçe aktarma: "Toplu Ekle / CSV & Excel İçe Aktar"
- Ayar: "Kazananı çarktan otomatik çıkar" · "Sonuç konfeti kutlaması"
- Satır: "Seçeneği sil" (erişilebilir ad)

**Boş durum ve ipucu**
- Başlık: "Seçenek listeniz boş"
- Açıklama: "Çarkı döndürmek için yukarıdan yeni seçenekler ekleyin ya da hızlı örnek listeyi yükleyin."
- Düğmeler: "Örnekleri yükle" · "Seçenek ekle"
- İlk açılış ipucu: "Kendi listenizi oluşturun" — "Örnek liste hazır. Seçenekleri yukarıdan tek tek ekleyebilir ya da CSV / Excel dosyasından içe aktarabilirsiniz. Değişiklikleriniz bu tarayıcıda saklanır." · "Anladım"

**Sonuç penceresi**
- Rozet: "Kurala Sonucu"
- Başlık: "Karar Verildi!"
- Alt satır: "{n} seçenek arasından %{oran} eşit şans oranıyla seçildi."
- Gövde: "Seçim tamamlandı. Kazananı listeden çıkarabilir veya yeni bir tur başlatabilirsiniz."
- Düğmeler: "Tekrar Çevir" · "Listeden Çıkar" · "Sonucu Paylaş / Kopyala" · "Kapat (Esc)"

**Bildirimler (toast)**
- "Bağlantı panoya kopyalandı! Arkadaşlarınızla paylaşabilirsiniz."
- "{n} yeni seçenek eklendi, {k} mükerrer kayıt atlandı."
- "Eklenecek yeni seçenek yok. Tüm adlar listede zaten var."
- "Seçenek listeden çıkarıldı." · "Geri al"
- "Liste silindi." · "Geri al" (5 sn; Temizle onaylandıktan sonra)
- "Örnek liste yüklendi."

**Hata ve uyarı**
- "Lütfen bir ad yazın."
- "Bu seçenek zaten listede."
- "En fazla 200 seçenek ekleyebilirsiniz."
- "Seçenek en fazla 60 karakter olabilir."
- "Dosya okunamadı. CSV veya XLSX dosyası seçin."
- "Dosya çok büyük. En fazla 200 seçenek alınabilir."
- "Liste bağlantıya sığmayacak kadar uzun. Seçenek sayısını azaltın."
- "Kopyalanamadı. Bağlantıyı adres çubuğundan kopyalayın."
- "En az iki seçenek gerekir."

**Onay (Temizle)**
- Başlık: "Tüm seçenekler silinsin mi?"
- Gövde: "Bu işlem geri alınamaz. Örnek listeyi daha sonra yeniden yükleyebilirsiniz."
- Düğmeler: "Vazgeç" · "Evet, temizle"

**Paylaşılan çark**
- "Bu çark bağlantıdan açıldı. Değişiklikleriniz yalnızca bu tarayıcıda saklanır."

**Geçmiş Sonuçlar**
- Başlık: "Geçmiş Sonuçlar" · rozet: "{n} kayıt" · yardım: "En fazla 50 kayıt tutulur."
- Boş durum: "Henüz sonuç yok" — "Çarkı döndürdüğünüzde sonuçlar burada görünür."
- Eylem: "Geçmişi temizle" · onay: "Geçmiş silinsin mi?" — "Bu işlem geri alınamaz." · "Vazgeç" · "Evet, sil"
- Hata: "Geçmiş bu tarayıcıda kaydedilemiyor."

---

## 10. Erişilebilirlik kontrol listesi

- [ ] Metin kontrastı ≥ 4.5:1 (bölüm 2 ve 3'teki oranlar); büyük metin ≥ 3:1.
- [ ] Input, kutu ve anahtar kenarlığı ≥ 3:1 (`border-control`). Dekoratif ayraçlar (`border-subtle`) sınır olarak kullanılmaz.
- [ ] Tüm etkileşimli öğelerde `:focus-visible` halkası (2px, `focus-ring`); halka zemin rengiyle ≥ 3:1.
- [ ] Klavye: Tab sırası görsel sırayla aynı; Space/Enter çarkı döndürür; Esc modal ve alt sayfayı kapatır; modal içinde odak tuzağı var.
- [ ] Dokunma hedefi ≥ 44 × 44 px.
- [ ] Input metni 16px; sayfa 390 px genişlikte yatay kaydırma yapmaz (çark `min(88vw, 360px)`).
- [ ] Renk tek başına anlam taşımaz: çark dilimleri metinle etiketli; durumlar ikon + metinle.
- [ ] Çark için ekran okuyucu açıklaması; kazanan `aria-live` ile duyurulur.
- [ ] `prefers-reduced-motion` desteği (bölüm 6).
- [ ] Varsayılan dil İngilizce; altı dilin tamamında metinler anahtarla geliyor, ekranda anahtar adı görünmüyor.
- [ ] Türkçe karakterler (ş, ğ, ı, İ, ç, ö, ü) Plus Jakarta Sans / Inter ile doğru görünüyor; Japonca ve Çince glifler Noto yedek fontuyla gösteriliyor.
- [ ] Almanca en uzun metinlerle 390px'te taşma ve kırpılma yok.

---

## 11. Logo fikirleri (yalnızca metin tarifi)

Logo kimliği henüz yok. Üç yön, metin olarak:

1. **Kelime işareti:** "Kurala" kelimesi Plus Jakarta Sans 800, küçük harf, harf aralığı -0.02em. Son "a" harfi, dilim sınırını andıran ince bir yay ile çerçevelenmiş (yay indigo `#4F46E5`, harf koyu slate). Renk: indigo + slate. Yalnızca yazı, sade ve kolay küçülen.
2. **Simge:** Üstten görülen çarkın dört dilimi (indigo, turkuaz, zümrüt, kehribar) ve üstte küçük bir damla biçimli işaretçi. Simge kare içinde, 8px köşeli. Renk: dört dilim, yalnızca çarkın paletinden. Çarkı ve karar anını tek bakışta anlatır.
3. **Simge + onay:** Merkezde küçük bir onay işareti (✓) ile ortada bir daire. Anlam: "kural" ve "karar verildi". Renk: indigo zemin, beyaz işaret. En sade ve en kurumsal yön; oyun çağrışımı en düşük olan.

**Öneri:** 1 ya da 3. Simge, favicon ve uygulama ikonu için 2 daha okunabilir; ama dört renk küçük boyutta karışabilir, bu yüzden tek renkli varyant da tanımlanmalı.

---

## 12. Varsayımlar ve açık kararlar

| No | Konu | Karar / varsayım | Onay |
| --- | --- | --- | --- |
| V1 | Başlık ailesi | Plus Jakarta Sans tek başlık ailesi (PRD'deki Space Grotesk yerine). | Ürün sahibi onaylamalı |
| V2 | Koyu tema primer | `#818CF8` zemin + `#0F172A` metin (Slate'in açık lavanta düğmesine yakın, kontrast geçer). | — |
| V3 | Nav / ürün kapsamı | "Hazır Şablonlar" ve "Geçmiş Sonuçlar" MVP'de kalır (ürün sahibi kararı). PRD'de ikisi de yok ya da Faz 3; yol haritası güncellenmeli. Üst çubuk: marka, gizlilik rozeti, Karar Çarkı, Hazır Şablonlar, Geçmiş Sonuçlar, tema, yardım. Ekranlar bölüm 7.8 ve 7.9'da. | Şablon listesi (4 kategori) ve geçmiş kayıt sınırı (50) onaylanmalı |
| V11 | Geçmiş verisi | Geçmiş yalnızca tarayıcıda (`localStorage`), paylaşım bağlantısına dahil değil, en fazla 50 kayıt. PRD'de bu özellik tanımlı değil; gizlilik ilkesiyle uyumlu bir varsayım. | Onaylanmalı |
| V4 | Kullanıcı istatistikleri | "Toplam Karar" ve "Son Çevrilen" kartları MVP'de yok (PRD'de yok, veri takibi izlenimi veriyor). | Onaylanmalı |
| V5 | "Örnekler" adı | Düğme "Örnekler" (PRD'deki "Hızlı Örnekler" yerine), ikinci sözcük yalnızca gerekirse. | — |
| V6 | Konfeti | Açık gelir ama kısa (1.2 sn) ve kapatılabilir. | — |
| V7 | Mobil düzen | Çark üstte, liste bottom sheet'te. (PRD Faz 2'de 390 px dikey çark maketi yazıyordu; bu sürümde maket yok.) | — |
| V8 | Ses efektleri | MVP'de yok (PRD Faz 2). Ses düğmesi gösterilmez. | — |
| V9 | Ağırlık (1x) | Satırda görünür; ağırlık düzenleme MVP'de düğme ile yapılır (stepper). | Ürün sahibi onaylamalı |
| V10 | Metinde emoji | Kullanılmaz; ikon kullanılır (ekran okuyucu ve tutarlılık). | — |
| V12 | Varsayılan dil | İlk ziyarette İngilizce; tarayıcı dili otomatik algılanmaz. Kullanıcı seçimi tarayıcıda saklanır. | Onaylanmalı |
| V13 | Çince varyantı | Basitleştirilmiş Çince (zh-CN) varsayıldı; Geleneksel Çince (zh-TW) ayrı bir dil olarak eklenmedi. | Onaylanmalı |
| V14 | Çeviri kalitesi | Metinler ilk taslaktır; her dil bir ana dil kullanıcısı tarafından gözden geçirilmeli, özellikle Japonca ve Çince. | Gözden geçirme gerekli |
