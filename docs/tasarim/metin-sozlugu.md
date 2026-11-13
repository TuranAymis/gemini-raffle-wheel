# Kurala — Metin Sözlüğü (i18n)

Varsayılan dil: **İngilizce (`en`)**. Desteklenen diller: Türkçe (`tr`), Deutsch (`de`), Español (`es`), 日本語 (`ja`), 中文 简体 (`zh-CN`).

Kurallar:
- Her metin bir anahtarla (`key`) çağrılır. Kodda metin yazılmaz; yalnızca anahtar.
- Eksik bir çeviri varsa İngilizce metin gösterilir.
- `{n}`, `{k}`, `{pct}`, `{name}` yer tutucuları çevrilmez, sırası dile göre değişebilir.
- Marka adı **Kurala** her dilde aynı kalır. Örnek seçenekler (Ronaldo, Messi…) özel ad olduğu için çevrilmez.
- Sayılar ve yüzdeler `Intl.NumberFormat` ile biçimlenir (`16.7%` / `16,7 %`).
- Tırnak ve noktalama dile göre: Almanca „…", İspanyolca ¿…?, ¡…!, Japonca 「」, Çince “”.

## Uygulama ve gizlilik

| key | en | tr | de | es | ja | zh-CN |
| --- | --- | --- | --- | --- | --- | --- |
| app.name | Kurala | Kurala | Kurala | Kurala | Kurala | Kurala |
| privacy.badge | Your data stays in your browser | Verileriniz tarayıcınızda saklanır, sunucuya iletilmez | Deine Daten bleiben in deinem Browser | Tus datos se quedan en tu navegador | データはブラウザにのみ保存され、サーバーへは送信されません | 数据仅保存在您的浏览器中，不会发送到服务器 |
| privacy.card | Everything you enter stays in this browser. No options, votes or results are sent to any server. | Girdiğiniz tüm liste elemanları yalnızca web tarayıcınızda saklanır. Hiçbir girdi, oylama verisi veya sonuç uzak sunuculara iletilmez. | Alles, was du eingibst, bleibt nur in diesem Browser. Keine Optionen, Abstimmungen oder Ergebnisse werden an einen Server gesendet. | Todo lo que escribes se queda en este navegador. Ninguna opción, voto ni resultado se envía a ningún servidor. | 入力した内容はすべてこのブラウザにのみ保存されます。選択肢・投票・結果がサーバーに送信されることはありません。 | 您输入的所有内容仅保存在此浏览器中。选项、投票和结果都不会发送到任何服务器。 |

## Navigasyon ve dil seçici

| key | en | tr | de | es | ja | zh-CN |
| --- | --- | --- | --- | --- | --- | --- |
| nav.wheel | Wheel | Karar Çarkı | Rad | Ruleta | ルーレット | 转盘 |
| nav.language | Language | Dil | Sprache | Idioma | 言語 | 语言 |
| nav.theme | Theme | Tema | Design | Tema | テーマ | 主题 |
| nav.help | Help | Yardım | Hilfe | Ayuda | ヘルプ | 帮助 |
| lang.name | English | Türkçe | Deutsch | Español | 日本語 | 中文 |

Dil adları her dilde kendi dilinde yazılır (İngilizce kullanıcı da "Deutsch" görür). Dil seçici üst çubukta, `aria-label` = "Language".

## Çark

| key | en | tr | de | es | ja | zh-CN |
| --- | --- | --- | --- | --- | --- | --- |
| wheel.hint | Press Spin or Space to spin | Döndürmek için Döndür'e veya Space tuşuna basın | Drücke „Drehen“ oder die Leertaste | Pulsa Girar o la barra espaciadora | 「回す」を押すか、スペースキーを押してください | 点击“转动”或按空格键 |
| wheel.spin | Spin | Döndür | Drehen | Girar | 回す | 转动 |
| wheel.spinning | Spinning… | Dönüyor… | Dreht sich… | Girando… | 回転中… | 转动中… |
| wheel.shuffle | Shuffle | Karıştır | Mischen | Mezclar | シャッフル | 打乱 |
| wheel.fullscreen | Full screen | Tam Ekran | Vollbild | Pantalla completa | 全画面表示 | 全屏 |
| wheel.fairness | Equal chance per option: {pct}% | Seçenek başına eşit şans: %{pct} | Gleiche Chance pro Option: {pct} % | Probabilidad igual por opción: {pct} % | 各選択肢の確率：{pct}%（均等） | 每个选项机会均等：{pct}% |
| wheel.needTwo | At least two options are needed. | En az iki seçenek gerekir. | Mindestens zwei Optionen sind nötig. | Se necesitan al menos dos opciones. | 選択肢は2つ以上必要です。 | 至少需要两个选项。 |

## Seçenek listesi

| key | en | tr | de | es | ja | zh-CN |
| --- | --- | --- | --- | --- | --- | --- |
| list.title | Options | Seçenekler | Optionen | Opciones | 選択肢 | 选项 |
| list.count | {n} options | {n} seçenek | {n} Optionen | {n} opciones | {n}件 | {n} 个选项 |
| list.edit | Edit | Düzenle | Bearbeiten | Editar | 編集 | 编辑 |
| list.delete | Delete option | Seçeneği sil | Option löschen | Eliminar opción | 選択肢を削除 | 删除选项 |
| list.autoRemove | Remove the winner from the wheel automatically | Kazananı çarktan otomatik çıkar | Gewinner nach dem Drehen automatisch entfernen | Quitar al ganador de la ruleta automáticamente | 当選した選択肢を自動的に外す | 自动移除获胜选项 |
| list.confetti | Confetti on result | Sonuç konfeti kutlaması | Konfetti bei Ergebnis | Confeti al mostrar el resultado | 結果に紙吹雪を表示 | 结果时显示彩纸 |

## Ekleme ve içe aktarma

| key | en | tr | de | es | ja | zh-CN |
| --- | --- | --- | --- | --- | --- | --- |
| input.placeholder | Add an option (e.g. Pizza, Central Park…) | Yeni seçenek ekle (ör. Lahmacun, Kadıköy…) | Option hinzufügen (z. B. Pizza, Stadtpark …) | Añade una opción (p. ej. Pizza, Retiro…) | 選択肢を追加（例：ピザ、公園…） | 添加选项（例如：披萨、中央公园…） |
| input.add | Add | Ekle | Hinzufügen | Añadir | 追加 | 添加 |
| input.empty | Please enter a name. | Lütfen bir ad yazın. | Bitte gib einen Namen ein. | Escribe un nombre, por favor. | 名前を入力してください。 | 请输入名称。 |
| input.duplicate | This option is already in the list. | Bu seçenek zaten listede. | Diese Option ist bereits in der Liste. | Esta opción ya está en la lista. | この選択肢はすでにリストにあります。 | 该选项已在列表中。 |
| input.max | You can add up to {n} options. | En fazla {n} seçenek ekleyebilirsiniz. | Du kannst bis zu {n} Optionen hinzufügen. | Puedes añadir hasta {n} opciones. | 選択肢は最大{n}件まで追加できます。 | 最多可添加 {n} 个选项。 |
| input.maxLength | Up to 60 characters. | Seçenek en fazla 60 karakter olabilir. | Höchstens 60 Zeichen. | Máximo 60 caracteres. | 60文字以内で入力してください。 | 最多 60 个字符。 |
| import.button | Bulk add / import CSV & Excel | Toplu Ekle / CSV & Excel İçe Aktar | Mehrere hinzufügen / CSV & Excel importieren | Añadir varias / importar CSV y Excel | 一括追加 / CSV・Excel から読み込み | 批量添加 / 导入 CSV 和 Excel |
| import.reading | Reading file… | Dosya okunuyor… | Datei wird gelesen… | Leyendo el archivo… | ファイルを読み込んでいます… | 正在读取文件… |
| import.result | {n} new options added, {k} duplicates skipped. | {n} yeni seçenek eklendi, {k} mükerrer kayıt atlandı. | {n} neue Optionen hinzugefügt, {k} Duplikate übersprungen. | {n} opciones nuevas añadidas, {k} duplicados omitidos. | {n}件を追加、{k}件の重複をスキップしました。 | 已添加 {n} 个新选项，跳过 {k} 个重复项。 |
| import.noNew | No new options to add. All names are already in the list. | Eklenecek yeni seçenek yok. Tüm adlar listede zaten var. | Keine neuen Optionen. Alle Namen sind schon in der Liste. | No hay opciones nuevas. Todos los nombres ya están en la lista. | 追加できる新しい選択肢はありません。すべての名前がすでにリストにあります。 | 没有可添加的新选项，所有名称都已在列表中。 |
| import.error | Could not read the file. Choose a CSV or XLSX file. | Dosya okunamadı. CSV veya XLSX dosyası seçin. | Die Datei konnte nicht gelesen werden. Wähle eine CSV- oder XLSX-Datei. | No se pudo leer el archivo. Elige un archivo CSV o XLSX. | ファイルを読み込めませんでした。CSV か XLSX のファイルを選んでください。 | 无法读取文件，请选择 CSV 或 XLSX 文件。 |
| import.tooLarge | The file is too large. Up to 200 options can be imported. | Dosya çok büyük. En fazla 200 seçenek alınabilir. | Die Datei ist zu groß. Es können höchstens 200 Optionen importiert werden. | El archivo es demasiado grande. Se pueden importar hasta 200 opciones. | ファイルが大きすぎます。取り込めるのは最大200件です。 | 文件太大，最多可导入 200 个选项。 |

## Eylemler ve ortak metinler

| key | en | tr | de | es | ja | zh-CN |
| --- | --- | --- | --- | --- | --- | --- |
| action.clear | Clear | Temizle | Leeren | Borrar | クリア | 清空 |
| action.examples | Examples | Örnekler | Beispiele | Ejemplos | サンプル | 示例 |
| action.share | Share | Paylaş | Teilen | Compartir | 共有 | 分享 |
| action.loadExamples | Load examples | Örnekleri yükle | Beispiele laden | Cargar ejemplos | サンプルを読み込む | 加载示例 |
| common.cancel | Cancel | Vazgeç | Abbrechen | Cancelar | キャンセル | 取消 |
| common.close | Close (Esc) | Kapat (Esc) | Schließen (Esc) | Cerrar (Esc) | 閉じる（Esc） | 关闭（Esc） |
| common.undo | Undo | Geri al | Rückgängig | Deshacer | 元に戻す | 撤销 |

## Temizle onayı

| key | en | tr | de | es | ja | zh-CN |
| --- | --- | --- | --- | --- | --- | --- |
| clear.title | Delete all options? | Tüm seçenekler silinsin mi? | Alle Optionen löschen? | ¿Eliminar todas las opciones? | すべての選択肢を削除しますか？ | 要删除所有选项吗？ |
| clear.body | This can't be undone. You can load the examples again later. | Bu işlem geri alınamaz. Örnek listeyi daha sonra yeniden yükleyebilirsiniz. | Das lässt sich nicht rückgängig machen. Die Beispiele kannst du später wieder laden. | Esto no se puede deshacer. Puedes volver a cargar los ejemplos más tarde. | この操作は元に戻せません。サンプルはあとで再読み込みできます。 | 此操作无法撤销。之后可以重新加载示例。 |
| clear.confirm | Yes, clear | Evet, temizle | Ja, leeren | Sí, borrar | はい、クリアする | 是，清空 |

## Boş durum ve ilk açılış

| key | en | tr | de | es | ja | zh-CN |
| --- | --- | --- | --- | --- | --- | --- |
| empty.title | Your option list is empty | Seçenek listeniz boş | Deine Optionsliste ist leer | Tu lista de opciones está vacía | 選択肢リストは空です | 选项列表为空 |
| empty.body | Add options above, or load the example list to spin the wheel. | Çarkı döndürmek için yukarıdan yeni seçenekler ekleyin ya da hızlı örnek listeyi yükleyin. | Füge oben Optionen hinzu oder lade die Beispielliste, um das Rad zu drehen. | Añade opciones arriba o carga la lista de ejemplo para girar la ruleta. | 上で選択肢を追加するか、サンプルリストを読み込んでルーレットを回してください。 | 在上方添加选项，或加载示例列表后转动转盘。 |
| onboarding.title | Build your own list | Kendi listenizi oluşturun | Erstelle deine eigene Liste | Crea tu propia lista | 自分のリストを作ろう | 创建你自己的列表 |
| onboarding.body | The example list is ready. Add options one by one, or import a CSV or Excel file. Your changes stay in this browser. | Örnek liste hazır. Seçenekleri yukarıdan tek tek ekleyebilir ya da CSV / Excel dosyasından içe aktarabilirsiniz. Değişiklikleriniz bu tarayıcıda saklanır. | Die Beispielliste ist fertig. Füge Optionen einzeln hinzu oder importiere eine CSV- oder Excel-Datei. Deine Änderungen bleiben in diesem Browser. | La lista de ejemplo está lista. Añade opciones una a una o importa un archivo CSV o Excel. Tus cambios se quedan en este navegador. | サンプルリストの準備ができました。選択肢を1つずつ追加するか、CSV・Excel ファイルから読み込めます。変更はこのブラウザにのみ保存されます。 | 示例列表已准备好。您可以逐个添加选项，也可以导入 CSV 或 Excel 文件。更改仅保存在此浏览器中。 |
| onboarding.gotIt | Got it | Anladım | Verstanden | Entendido | わかりました | 知道了 |

## Sonuç penceresi

| key | en | tr | de | es | ja | zh-CN |
| --- | --- | --- | --- | --- | --- | --- |
| result.badge | Kurala result | Kurala Sonucu | Kurala-Ergebnis | Resultado de Kurala | Kurala の結果 | Kurala 结果 |
| result.title | Decided! | Karar Verildi! | Entschieden! | ¡Decidido! | 決まりました！ | 已决定！ |
| result.detail | Picked from {n} options, each with a {pct}% chance. | {n} seçenek arasından %{pct} eşit şans oranıyla seçildi. | Aus {n} Optionen mit je {pct} % Chance gewählt. | Elegida entre {n} opciones, cada una con un {pct} % de probabilidad. | {n}件の選択肢から、各{pct}%の確率で選ばれました。 | 从 {n} 个选项中选出，每个选项机会均为 {pct}%。 |
| result.body | Done. You can remove the winner from the list or spin again. | Seçim tamamlandı. Kazananı listeden çıkarabilir veya yeni bir tur başlatabilirsiniz. | Fertig. Du kannst den Gewinner aus der Liste entfernen oder noch einmal drehen. | Listo. Puedes quitar al ganador de la lista o girar de nuevo. | 決まりました。当選した選択肢をリストから外すか、もう一度回せます。 | 已完成。您可以将获胜选项移出列表，或再转一次。 |
| result.spinAgain | Spin again | Tekrar Çevir | Erneut drehen | Girar de nuevo | もう一度回す | 再转一次 |
| result.remove | Remove from list | Listeden Çıkar | Aus der Liste entfernen | Quitar de la lista | リストから外す | 从列表移除 |
| result.copy | Share / copy result | Sonucu Paylaş / Kopyala | Ergebnis teilen / kopieren | Compartir / copiar resultado | 結果を共有 / コピー | 分享 / 复制结果 |

## Paylaşım

| key | en | tr | de | es | ja | zh-CN |
| --- | --- | --- | --- | --- | --- | --- |
| share.copied | Link copied! Share it with your friends. | Bağlantı panoya kopyalandı! Arkadaşlarınızla paylaşabilirsiniz. | Link kopiert! Teile ihn mit deinen Freunden. | ¡Enlace copiado! Compártelo con tus amigos. | リンクをコピーしました。友だちと共有できます。 | 链接已复制！快分享给朋友吧。 |
| share.failed | Couldn't copy. Copy the link from the address bar. | Kopyalanamadı. Bağlantıyı adres çubuğundan kopyalayın. | Kopieren nicht möglich. Kopiere den Link aus der Adressleiste. | No se pudo copiar. Copia el enlace desde la barra de direcciones. | コピーできませんでした。アドレスバーからリンクをコピーしてください。 | 复制失败，请从地址栏复制链接。 |
| share.tooLong | The list is too long for a link. Use fewer options. | Liste bağlantıya sığmayacak kadar uzun. Seçenek sayısını azaltın. | Die Liste ist zu lang für einen Link. Verwende weniger Optionen. | La lista es demasiado larga para un enlace. Usa menos opciones. | リストが長すぎてリンクに収まりません。選択肢を減らしてください。 | 列表太长，无法生成链接。请减少选项。 |
| share.opened | This wheel was opened from a link. Your changes are saved only in this browser. | Bu çark bağlantıdan açıldı. Değişiklikleriniz yalnızca bu tarayıcıda saklanır. | Dieses Rad wurde über einen Link geöffnet. Deine Änderungen werden nur in diesem Browser gespeichert. | Esta ruleta se abrió desde un enlace. Tus cambios solo se guardan en este navegador. | このルーレットはリンクから開かれました。変更はこのブラウザにのみ保存されます。 | 此转盘通过链接打开。您的更改仅保存在此浏览器中。 |

## Hazır şablonlar

| key | en | tr | de | es | ja | zh-CN |
| --- | --- | --- | --- | --- | --- | --- |
| templates.title | Ready-made lists | Hazır Şablonlar | Fertige Vorlagen | Listas predefinidas | テンプレート | 现成模板 |
| templates.intro | Pick a list and we'll add its options. | Bir şablon seçin; seçenekleri listenize ekleyelim. | Wähle eine Vorlage, dann fügen wir ihre Optionen hinzu. | Elige una lista y añadiremos sus opciones. | リストを選ぶと、その選択肢を追加します。 | 选择一个模板，我们会把它的选项添加到列表中。 |
| templates.use | Use this list | Bu şablonu kullan | Diese Vorlage verwenden | Usar esta lista | このリストを使う | 使用此模板 |
| templates.howAdd | How should we add it? | Şablon nasıl eklensin? | Wie soll die Vorlage hinzugefügt werden? | ¿Cómo quieres añadirla? | どのように追加しますか？ | 如何添加？ |
| templates.addToList | Add to list | Listeye ekle | Zur Liste hinzufügen | Añadir a la lista | リストに追加 | 添加到列表 |
| templates.replace | Replace current list | Mevcut listenin yerine koy | Aktuelle Liste ersetzen | Reemplazar la lista actual | 現在のリストを置き換える | 替换当前列表 |
| templates.loaded | {name} loaded: {n} options. | {name} şablonu yüklendi: {n} seçenek. | {name} geladen: {n} Optionen. | {name} cargada: {n} opciones. | {name} を読み込みました（{n}件）。 | 已加载“{name}”：{n} 个选项。 |
| templates.customize | Replace the placeholder names with your own. | Yer tutucu adları kendi adlarınızla değiştirin. | Ersetze die Platzhalter durch eigene Namen. | Sustituye los nombres de ejemplo por los tuyos. | 仮の名前を実際の名前に変えてください。 | 请把占位名称换成你自己的名字。 |

## Geçmiş sonuçlar

| key | en | tr | de | es | ja | zh-CN |
| --- | --- | --- | --- | --- | --- | --- |
| history.title | Past results | Geçmiş Sonuçlar | Frühere Ergebnisse | Resultados anteriores | 過去の結果 | 历史结果 |
| history.count | {n} records | {n} kayıt | {n} Einträge | {n} registros | {n}件 | {n} 条记录 |
| history.limit | Up to 50 records are kept. | En fazla 50 kayıt tutulur. | Es werden höchstens 50 Einträge gespeichert. | Se guardan hasta 50 registros. | 最大50件まで保存されます。 | 最多保存 50 条记录。 |
| history.emptyTitle | No results yet | Henüz sonuç yok | Noch keine Ergebnisse | Aún no hay resultados | まだ結果はありません | 还没有结果 |
| history.emptyBody | Results will appear here after you spin the wheel. | Çarkı döndürdüğünüzde sonuçlar burada görünür. | Ergebnisse erscheinen hier, nachdem du das Rad gedreht hast. | Los resultados aparecerán aquí cuando gires la ruleta. | ルーレットを回すと、結果がここに表示されます。 | 转动转盘后，结果会显示在这里。 |
| history.clear | Clear history | Geçmişi temizle | Verlauf löschen | Borrar historial | 履歴を消去 | 清空历史 |
| history.clearTitle | Delete history? | Geçmiş silinsin mi? | Verlauf löschen? | ¿Borrar el historial? | 履歴を削除しますか？ | 要删除历史记录吗？ |
| history.clearConfirm | Yes, delete | Evet, sil | Ja, löschen | Sí, borrar | はい、削除する | 是，删除 |
| history.storageError | History can't be saved in this browser. | Geçmiş bu tarayıcıda kaydedilemiyor. | Der Verlauf kann in diesem Browser nicht gespeichert werden. | No se puede guardar el historial en este navegador. | このブラウザでは履歴を保存できません。 | 无法在此浏览器中保存历史记录。 |

## Bildirimler (toast)

| key | en | tr | de | es | ja | zh-CN |
| --- | --- | --- | --- | --- | --- | --- |
| toast.removed | Option removed from the list. | Seçenek listeden çıkarıldı. | Option aus der Liste entfernt. | Opción quitada de la lista. | 選択肢をリストから外しました。 | 已从列表移除选项。 |
| toast.cleared | List cleared. | Liste silindi. | Liste geleert. | Lista borrada. | リストをクリアしました。 | 列表已清空。 |
| toast.examplesLoaded | Example list loaded. | Örnek liste yüklendi. | Beispielliste geladen. | Lista de ejemplo cargada. | サンプルリストを読み込みました。 | 示例列表已加载。 |
| toast.deleted | Option deleted. | Seçenek silindi. | Option gelöscht. | Opción eliminada. | 選択肢を削除しました。 | 选项已删除。 |

## Uygulama ekleri (kod tarafından kullanılır)

| key | en | tr | de | es | ja | zh-CN |
| --- | --- | --- | --- | --- | --- | --- |
| app.tagline | Pick one, fairly | Adil bir seçim yap | Triff eine faire Wahl | Elige con justicia | 公平に選びましょう | 公平地做出选择 |
| option.added | Option added. | Seçenek eklendi. | Option hinzugefügt. | Opción añadida. | 選択肢を追加しました。 | 已添加选项。 |
| import.hint | Names in the first column are used. A header row is skipped. | İlk sütundaki adlar alınır. Üst satır başlıksa atlanır. | Die Namen in der ersten Spalte werden übernommen. Eine Kopfzeile wird übersprungen. | Se usan los nombres de la primera columna. Si la primera fila es un encabezado, se omite. | 最初の列の名前を使います。先頭行が見出しの場合は飛ばします。 | 使用第一列中的名称。如果首行是标题，则会被跳过。 |
| import.overflow | {n} did not fit (limit {max}). | {n} sığmadı (en fazla {max}). | {n} passten nicht (Maximum {max}). | {n} no cupieron (máximo {max}). | {n}件は入りませんでした（上限{max}件）。 | {n} 个无法容纳（上限 {max} 个）。 |
| import.unsupported | Supported files: .csv and .xlsx. | Desteklenen dosyalar: .csv ve .xlsx. | Unterstützte Dateien: .csv und .xlsx. | Archivos compatibles: .csv y .xlsx. | 対応ファイル：.csv と .xlsx | 支持的文件：.csv 和 .xlsx。 |
| examples.confirm | Replace the current options with the examples? | Mevcut seçenekler örneklerle değiştirilsin mi? | Aktuelle Optionen durch die Beispiele ersetzen? | ¿Reemplazar las opciones actuales por los ejemplos? | 現在の選択肢をサンプルで置き換えますか？ | 要用示例替换当前选项吗？ |
| share.prompt | Copy the link: | Bağlantıyı kopyalayın: | Link kopieren: | Copia el enlace: | リンクをコピーしてください： | 请复制链接： |
| common.closeButton | Close | Kapat | Schließen | Cerrar | 閉じる | 关闭 |
| action.addOption | Add option | Seçenek ekle | Option hinzufügen | Añadir opción | 選択肢を追加 | 添加选项 |
| segment.pass | Pass | PAS | Aussetzen | Pasar | パス | 跳过 |
| segment.bankrupt | Bankrupt | İFLAS | Pleite | Quiebra | 倒産 | 破产 |
