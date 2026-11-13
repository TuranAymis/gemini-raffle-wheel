# Stitch Paketi İncelemesi

Kaynak: `stitch_kurala_ark_tasar_m_sistemi` (2 `DESIGN.md`, 4 ekran: `code.html` + `screen.png`).
Karşılaştırma ölçütü: PRD (`kurala_r_n_gereksinimleri_belgesi_prd_proje_zeti.md`) ve WCAG 2.2 AA.
Ana belge: [tasarim-sistemi.md](./tasarim-sistemi.md).

## 1. İki sistemin özeti

| Konu | Kurala Decision Wheel (açık) | Decision Engine Slate (koyu) |
| --- | --- | --- |
| Yön | Sıcak, sakin, "friendly pragmatism" | "Tactical cockpit", cam efekti, neon parıltı |
| Başlık fontu | Plus Jakarta Sans | Space Grotesk |
| Gövde | Inter | Manrope |
| Etiket | Plus Jakarta Sans 600 | JetBrains Mono (büyük harf) |
| Ana renk | `#4F46E5` / koyuda `#6366F1` | `#6366F1` (gövde) ama ön yüzde `#c0c1ff` |
| Çark paleti | 6 renk: indigo, turkuaz, zümrüt, kehribar, pembe, mor | Mor/indigo/turuncu/yeşil/turkuaz dilimler, etiket beyaz |
| Yükseklik | Hafif gölge, ince kenarlık | Cam (`blur 16–24px`), iç ışık çizgisi |
| Kapsam | Ana ekran, sonuç modalı (açık ve koyu tema ekran yok) | Ana ekran, sonuç modalı (koyu) |

**Genel değerlendirme:** Açık tema (Decision Wheel) PRD'nin "sakin, tarafsız, kumarhane değil" hedefine yakındır ve tabanı olarak uygundur. Koyu tema (Decision Engine Slate) renk tokenlarında iyi bir temel verir ama dili (geliştirici paneli, neon, "deterministic RNG" yazıları) PRD'nin "Kovuldun/kumarhane" eleştirisinden kaçınmak istediği tona geri götürüyor. Aşağıdaki sorunlar giderilerek birleştirilmiştir.

---

## 2. Erişilebilirlik sorunları (kontrast)

Hesaplamalar WCAG 2.x formülüyle yapılmıştır.

| # | Nerede | Çift | Oran | Durum | Düzeltme |
| --- | --- | --- | --- | --- | --- |
| A1 | Koyu ekran, çark | Beyaz (`#F8FAFC`) etiket / turuncu dilim `#F97316` | 2.68 | ✗ | Etiket `#0F172A`, dilim `#FBBF24` (10.69) |
| A2 | Koyu ekran, çark | Beyaz etiket / yeşil dilim `#10B981` | 2.42 | ✗ | Etiket `#0F172A`, dilim `#34D399` (9.29) |
| A3 | Koyu ekran, çark | Beyaz etiket / turkuaz dilim `#06B6D4` | 2.32 | ✗ | Etiket `#0F172A`, dilim `#22D3EE` (9.88) |
| A4 | Koyu DESIGN, primer düğme | `#F8FAFC` / `#6366F1` | 4.27 | ✗ (14px etiket için) | Zemin `#818CF8`, metin `#0F172A` (5.98) |
| A5 | Koyu DESIGN, metin | `#6366F1` metin / `#0F172A` | 4.00 | ✗ | Metin için `#818CF8` (5.98) |
| A6 | Koyu DESIGN, kenarlık | `#334155` / `#0F172A` | 1.72 | ✗ (1.4.11) | Kontrol kenarlığı `#64748B` (3.75) |
| A7 | Açık DESIGN, çark | Beyaz etiket / turkuaz `#06B6D4` | 2.43 | ✗ | Etiket `#0F172A` (7.35) |
| A8 | Açık DESIGN, çark | Beyaz etiket / zümrüt `#10B981` | 2.54 | ✗ | Etiket `#0F172A` (7.04) |
| A9 | Açık DESIGN, çark | Beyaz etiket / kehribar `#F59E0B` | 2.15 | ✗ | Etiket `#0F172A` (8.31) |
| A10 | Açık DESIGN, metin | `#0D9488` (teal) metin / beyaz | 3.74 | ✗ (metin için) | Metin için koyu ton; teal yalnızca dekoratif/ikon |
| A11 | Açık DESIGN, metin | `#F97316` (coral) metin / beyaz | 2.80 | ✗ | Metin için kullanılmaz; yalnızca zemin rozeti (koyu metinle) |
| A12 | Açık DESIGN, kenarlık | `#CBD5E1` (ghost) / beyaz | 1.48 | ✗ (kontrol sınırı) | Kontrol kenarlığı `#64748B` (4.76) |
| A13 | Açık tema ikincil metin | `#94A3B8` / beyaz (Slate'in metin rengi) | 2.56 | ✗ | Açıkta `#475569` (7.58) |

**Not:** DESIGN dosyaları "WCAG AA" diyor ama çark etiketleri için bu iddia tutmuyor. Çark etiketi kuralı açıkça yazılmalı (tasarım belgesi bölüm 3).

---

## 3. Tutarlılık sorunları

| # | Konu | Ayrıntı | Öneri |
| --- | --- | --- | --- |
| T1 | Açık DESIGN ile açık ekran çark paleti uyuşmuyor | DESIGN 6 renk (indigo, turkuaz, zümrüt, kehribar, pembe, mor) diyor; ekranda koyu indigo, kahverengi (`#7b3300`-benzeri) ve koyu teal dilimler var. Kahverengi, PRD'nin "sıcak ama sakin" hedefinde yerini bulmuyor ve "eski/kasvetli" hissettiriyor. | Tasarım belgesindeki 6 renk esas alınır; ekran görseli bu palete göre yeniden yapılmalı. |
| T2 | Koyu DESIGN ile koyu ekran uyuşmuyor | DESIGN "dilimler koyu slate + indigo/mor tonlarında" diyor; ekranda turuncu, yeşil, turkuaz ve mor dilimler var. | Koyu tema paleti DESIGN'daki açık-koyu eşleşmeleri (`#818CF8`, `#22D3EE`, `#34D399`, `#FBBF24`, `#FDA4AF`, `#C084FC`) ile belgelendi. |
| T3 | Koyu DESIGN'ın iki farklı primer değeri | Front matter `primary: #c0c1ff` (açık lavanta), gövde `#6366F1`. Ekrandaki düğme açık lavanta. | Ekrandaki lavanta ile gövdedeki indigo arasında kontrast testi yapılamadan karar verilemez; bu belgede `#818CF8` zemin + `#0F172A` metin seçildi (5.98). |
| T4 | Koyu ekranda yazı tipi | Slate: Space Grotesk + Manrope + JetBrains Mono. Açık: Plus Jakarta + Inter. İki temanın iki farklı ses taşıması, marka tutarlılığını bozuyor. | Tek başlık ailesi Plus Jakarta Sans, gövde Inter. Monospace kaldırıldı. |
| T5 | Açık ekranda logo | Üst çubukta "Kurala Logo" alt metni görünüyor: logo görseli kırık. | Logo tanımlanana kadar metin logosu (Plus Jakarta Sans 800) kullanılır. |
| T6 | Telif yılı | Footer "© 2025"; bugünkü tarih 2026-11-13. | Yıl dinamik olarak yazılır. |
| T7 | Buton adı | Ekranlarda "Hızlı Örnekler"; spesifikasyonda "Örnekler". | "Örnekler" (kısa, PRD'deki ana eylem adıyla uyumlu). |
| T8 | Modal başlığında emoji | "Karar Verildi! 🎉" ve trophy üzerinde ✨ / 🎉. Emoji, platforma göre farklı görünür ve ekran okuyucuda okunabilir ama anlamsız olur. | Emoji kaldırılır; ikonlar (lucide `trophy`, `check-circle`) kullanılır. |

---

## 4. Ton ve dil sorunları (koyu ekran)

Koyu ekranda geliştirici aracı dili baskın. PRD ve ürün sahibi, "geliştirici aracı" dilini değiştirmek istiyor.

| # | Öğe (koyu ekran) | Sorun | Karar |
| --- | --- | --- | --- |
| D1 | "Kurala Deterministic Pseudo-RNG v2.4" (alt satır) | Teknik jargon; kullanıcıya fayda sağlamaz; "deterministic" kelimesi çarkın tarafsızlığını ima ederken yanlış çağrışım yapar (PRD'de RNG `crypto.getRandomValues` ile). | Kaldırılır. Tarafsızlık için kısa, Türkçe bir ifade kullanılır (gizlilik kartında zaten var). |
| D2 | "Sıfır Sunucu Gecikmesi" | Pazarlama dili, sayfada anlamsız. | Kaldırılır. |
| D3 | "Canlı Karar Modu" rozeti | Ürün kavramı PRD'de yok; "canlı" ifadesi sürekli bir yayın izlenimi veriyor. | Kaldırılır veya "Döndürmek için Döndür'e basın" durum satırına sadeleşir. |
| D4 | "Toplam Karar 14", "Son Çevrilen" | Kullanım istatistiği; PRD'de yok, veri takibi hissi veriyor, tarayıcıda da takip edilmiyor. | Kaldırılır (bkz. tasarım belgesi V4). |
| D5 | JetBrains Mono etiketler ("Döndür [Space]", "Eşit Şans Dağılımı: %16.7", "TIKLA") | Geliştirici aracı estetiği; büyük harf ve monospace yüksek gerilimli bir his. | Monospace kaldırılır; "Space" tuşu metni Plus Jakarta Sans içinde `kbd` rozetiyle gösterilir. |
| D6 | "Atmospheric glassmorphism", "tactical cockpit", neon dış parıltı | PRD'nin "aşırı parlak, dikkat dağıtıcı" eleştirisine ters; kumar/oyun konsollarına benzer. | Cam ve neon kaldırılır; yalnızca modal arka planında 8px blur. |
| D7 | Nav: "Karar Çarkı", "Hazır Şablonlar", "Geçmiş Sonuçlar" | PRD'de şablon Faz 3 olarak geçiyor, geçmiş özelliği yok. | "Hazır Şablonlar" ve "Geçmiş Sonuçlar" MVP'de kalır (ürün sahibi kararı; bkz. V3, tasarım belgesi 7.8 ve 7.9). Geçmiş yalnızca tarayıcıda tutulur. |
| D8 | Footer: "Nasıl Çalışır?", "Şablonlar", "Hakkında" | "Nasıl çalışır?" faydalı ama sayfa içinde ipucu olarak daha iyi; "Şablonlar" kapsam dışı. | "Gizlilik" ve "Hakkında" kalır; "Nasıl çalışır?" ipucu kartına taşınır. |

---

## 5. Kapsam ve eksik ekranlar

**Ekranlarda var:** ana ekran (açık, koyu), sonuç modalı (açık, koyu).

**Pakette yok (tasarım belgesinde tanımlandı):**
- Mobil (390 px) ekranı. DESIGN'da mobil kuralı var ama maket yok. → Tasarım belgesi bölüm 7.1.
- Seçenek ekleme/içe aktarma durumları ve hata mesajları. → bölüm 7.2.
- Boş durum ve ilk açılış ipucu. → bölüm 7.5.
- Temizle onayı. → bölüm 7.5.
- Paylaşım bildirimi ve liste-çok-büyük uyarısı. → bölüm 7.4.
- Toast/bildirim sistemi. → bölüm 7.6.
- Dönüş sırasındaki durum (düğme "Dönüyor…"). → bölüm 7.1.
- Hazır Şablonlar penceresi ve yükleme onayı. → bölüm 7.8.
- Geçmiş Sonuçlar penceresi, boş durum ve temizleme onayı. → bölüm 7.9.

**Pakette var ama PRD'de geç kalmış:** "Mobil dikey çark" PRD Faz 2 (Q2 2025) — ürün tarihleri 2025 olarak geçiyor; bugün 2026-11. Yol haritası güncellenmeli.

---

## 6. Ekran içi bulgular (özet)

| Ekran | Olumlu | Sorun |
| --- | --- | --- |
| Açık ana ekran | Düzen dengeli; sağ panel net; "Eşit şans: %16.7" bilgisi PRD ile uyumlu; gizlilik kartı yerinde. | Logo kırık; çark paleti DESIGN'la uyumsuz (T1); "Hızlı Örnekler" (T7); footer yılı (T6); çark etiketleri beyaz (A7–A9 ile aynı sorun). |
| Koyu ana ekran | Koyu zemin dengeli, çark yüksek kontrastlı kenarlarla okunuyor; gizlilik kartı net. | Etiketler beyaz (A1–A3); D1–D6 tonu; monospace etiketler (D5); "Toplam Karar/Son Çevrilen" (D4). |
| Açık sonuç modalı | Başlık, kazanan kartı, üç eylem PRD FR-3.3 ile birebir; "Kapat (Esc)" ipucu. | Emoji (T8); "Kurala Sonucu" rozet rengi (mint) açık zeminde kontrast değeri ölçülmedi, doğrulanmalı. |
| Koyu sonuç modalı | Kazanan kartı net; lavanta primer düğme kolay bulunuyor. | Düğme metni beyaz/lavanta (A4 benzeri); emoji (T8); aşırı parlaklık yok ama dekoratif çerçeve (iki renkli kenar) gereksiz. |

---

## 7. Özet öneriler (öncelik sırasıyla)

1. **Çark etiketi kuralını uygula** (A1–A3, A7–A9): beyaz etiketi bırak, her dilim için koyu veya beyaz etiketi kontrast değerine göre seç. Tasarım belgesi bölüm 3.
2. **Koyu primer düğme ve bağlantı metinleri** (A4, A5): `#818CF8` zemin + `#0F172A` metin.
3. **Kontrol kenarlıkları** (A6, A12): `#64748B`. Dekoratif kenarlık sınır sayılmaz.
4. **Açık tema ikincil metin** (A13): `#475569`.
5. **Dil ve ton** (D1–D6): jargon, istatistik ve neon kaldırılır; monospace yalnızca sayısal değerlerde değil, tamamen kaldırılır.
6. **Kapsam** (D4, D7, V3, V4): istatistik kartları çıkarılır; "Hazır Şablonlar" ve "Geçmiş Sonuçlar" nav'da kalır ve tasarım belgesi 7.8–7.9'daki gibi tasarlanır.
7. **Metin ve içerik** (T6, T7, T8): yıl, "Örnekler" adı, emoji.
8. **Eksik ekranlar** (bölüm 5): mobil ve durum ekranları, tasarım belgesindeki tarifle üretilmeli.

---

## 8. Doğrulama notu

- Kontrast oranları Node.js ile hesaplandı (WCAG 2.x göreli parlaklık formülü). Ekran görüntüsündeki renkler dosyadan okunan değerlerle eşleştirilmedi; ekran içi değerler DESIGN.md ve görsel üzerinden tahmin edildi.
- `code.html` dosyaları incelenmedi; ekran görüntüleri ve DESIGN.md esas alındı. Uygulamaya geçmeden önce HTML'deki gerçek sınıf/renk değerleri ile bu belgedeki değerler karşılaştırılmalı.
