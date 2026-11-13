import type { Locale } from '../i18n';

/**
 * Ready-made option lists, in every supported language. The Turkish text matches
 * docs/sablonlar/hazir-sablonlar.json. Proper names (games, clubs, films, series, maps, agents, brands)
 * are kept as they are in every language. Country names are translated, as they have a standard form per language.
 */

export type Localized = Record<Locale, string>;

export type CategoryId = 'oyun' | 'eglence' | 'egitim-ve-ekip';

export interface Template {
  id: string;
  category: CategoryId;
  featured: boolean;
  /** Placeholder names (e.g. "Katılımcı 1") that the user should replace with real names. */
  requiresCustomization: boolean;
  title: Localized;
  description: Localized;
  options: Localized[];
}

/** The same text in every language: for proper names. */
const P = (text: string): Localized => ({ en: text, tr: text, de: text, es: text, ja: text, 'zh-CN': text });

/** A text in each language, in the order: en, tr, de, es, ja, zh-CN. */
const L = (en: string, tr: string, de: string, es: string, ja: string, zh: string): Localized => ({
  en,
  tr,
  de,
  es,
  ja,
  'zh-CN': zh,
});

/** The option names of a template in one language. */
export const optionsFor = (template: Template, locale: Locale): string[] =>
  template.options.map((option) => option[locale]);

export const CATEGORIES: { id: CategoryId; label: Localized }[] = [
  { id: 'oyun', label: L('Games', 'Oyun', 'Spiele', 'Juegos', 'ゲーム', '游戏') },
  { id: 'eglence', label: L('Fun & friends', 'Eğlence ve Arkadaşlar', 'Spaß & Freunde', 'Diversión y amigos', '楽しみと友だち', '娱乐与朋友') },
  { id: 'egitim-ve-ekip', label: L('School & teams', 'Eğitim ve Ekipler', 'Schule & Teams', 'Escuela y equipos', '学校とチーム', '学校与团队') },
];

export const TEMPLATES: Template[] = [
  // Games
  {
    id: 'ea-fc-kariyer-takim-secici',
    category: 'oyun',
    featured: true,
    requiresCustomization: false,
    title: L('FIFA / EA FC Career Team Picker', 'FIFA / EA FC Kariyer Takım Seçici', 'FIFA / EA FC Karriere-Teamwahl', 'Selector de equipo para la carrera de FIFA / EA FC', 'FIFA / EA FC キャリアのチーム選び', 'FIFA / EA FC 生涯模式球队选择器'),
    description: L('Start a career mode with a random club.', 'Rastgele bir kulüp seçerek kariyer moduna başla.', 'Starte den Karrieremodus mit einem zufälligen Verein.', 'Empieza el modo carrera con un club al azar.', 'ランダムなクラブでキャリアモードを始めましょう。', '随机选一支俱乐部，开始生涯模式。'),
    options: [
      P('Manchester United'), P('Valencia'), P('Roma'), P('Ajax'), P('Schalke 04'),
      P('Marseille'), P('Real Betis'), P('Fiorentina'), P('Everton'), P('Sevilla'),
    ],
  },
  {
    id: 'minecraft-rastgele-gorev',
    category: 'oyun',
    featured: true,
    requiresCustomization: false,
    title: L('Minecraft Random Quest', 'Minecraft Rastgele Görev', 'Minecraft Zufallsaufgabe', 'Misión aleatoria de Minecraft', 'Minecraft ランダムクエスト', 'Minecraft 随机任务'),
    description: L('Pick a random quest for your Minecraft adventure.', 'Minecraft macerası için rastgele bir görev belirle.', 'Wähle eine zufällige Aufgabe für dein Minecraft-Abenteuer.', 'Elige una misión al azar para tu aventura en Minecraft.', 'Minecraft の冒険で挑戦するクエストをランダムに決めます。', '为你的 Minecraft 冒险随机选一个任务。'),
    options: [
      L('Go to the Nether', 'Nether’a git', 'Geh in den Nether', 'Ve al Nether', 'ネザーに行く', '前往下界'),
      L('Build a house', 'Ev inşa et', 'Baue ein Haus', 'Construye una casa', '家を建てる', '建一座房子'),
      L('Defeat the Ender Dragon', 'Ender Dragon’u yen', 'Besiege den Enderdrachen', 'Derrota al Ender Dragon', 'エンダードラゴンを倒す', '击败末影龙'),
      L('Find a village', 'Köy bul', 'Finde ein Dorf', 'Encuentra una aldea', '村を見つける', '找到一个村庄'),
      L('Find diamonds', 'Elmas bul', 'Finde Diamanten', 'Encuentra diamantes', 'ダイヤモンドを見つける', '找到钻石'),
      L('Build an automatic farm', 'Otomatik çiftlik kur', 'Baue eine automatische Farm', 'Construye una granja automática', '自動農場を作る', '建造自动农场'),
      L('Explore a map', 'Bir haritayı keşfet', 'Erkunde eine Karte', 'Explora un mapa', 'マップを探検する', '探索一张地图'),
      L('Build a redstone contraption', 'Redstone düzeneği yap', 'Baue eine Redstone-Schaltung', 'Construye un circuito de redstone', 'レッドストーン装置を作る', '制作红石装置'),
    ],
  },
  {
    id: 'valorant-ajan-secici',
    category: 'oyun',
    featured: true,
    requiresCustomization: false,
    title: L('Valorant Agent Picker', 'Valorant Ajan Seçici', 'Valorant-Agenten-Auswahl', 'Selector de agentes de Valorant', 'Valorant エージェント選び', 'Valorant 特工选择器'),
    description: L('Pick the agent you will play this match.', 'Bu maç oynayacağın ajanı rastgele belirle.', 'Wähle zufällig den Agenten für dieses Match.', 'Elige al azar el agente con el que jugarás esta partida.', 'この試合で使うエージェントをランダムに決めます。', '随机决定这局比赛你要玩的特工。'),
    options: [
      P('Jett'), P('Sage'), P('Raze'), P('Sova'), P('Omen'),
      P('Phoenix'), P('Killjoy'), P('Cypher'), P('Reyna'), P('Brimstone'),
    ],
  },
  {
    id: 'lol-rol-secici',
    category: 'oyun',
    featured: false,
    requiresCustomization: false,
    title: L('LoL Role Picker', 'LoL Rol Seçici', 'LoL-Rollenauswahl', 'Selector de rol de LoL', 'LoL ロール選び', 'LoL 位置选择器'),
    description: L('Pick your role in a League of Legends match.', 'League of Legends maçındaki rolünü seç.', 'Wähle deine Rolle in einem League-of-Legends-Match.', 'Elige tu rol en una partida de League of Legends.', 'League of Legends の試合でのロールを選びます。', '为一局英雄联盟比赛选择你的位置。'),
    options: [
      L('Top', 'Top', 'Top', 'Superior', 'トップ', '上单'),
      L('Jungle', 'Jungle', 'Dschungel', 'Jungla', 'ジャングル', '打野'),
      L('Mid', 'Mid', 'Mitte', 'Medio', 'ミッド', '中单'),
      P('ADC'),
      L('Support', 'Support', 'Support', 'Soporte', 'サポート', '辅助'),
    ],
  },
  {
    id: 'cs2-harita-secici',
    category: 'oyun',
    featured: true,
    requiresCustomization: false,
    title: L('CS2 Map Picker', 'CS2 Harita Seçici', 'CS2-Kartenauswahl', 'Selector de mapa de CS2', 'CS2 マップ選び', 'CS2 地图选择器'),
    description: L('Pick a map for Counter-Strike 2.', 'Counter-Strike 2 için harita seç.', 'Wähle eine Karte für Counter-Strike 2.', 'Elige un mapa para Counter-Strike 2.', 'Counter-Strike 2 のマップを選びます。', '为 Counter-Strike 2 选一张地图。'),
    options: [
      P('Mirage'), P('Dust2'), P('Inferno'), P('Nuke'), P('Ancient'), P('Anubis'), P('Vertigo'),
    ],
  },
  {
    id: 'ea-fc-mac-takimi',
    category: 'oyun',
    featured: false,
    requiresCustomization: false,
    title: L('FIFA / EA FC Match Team', 'FIFA / EA FC Maç Takımı', 'FIFA / EA FC Match-Team', 'Equipo para partido de FIFA / EA FC', 'FIFA / EA FC の試合のチーム', 'FIFA / EA FC 比赛球队'),
    description: L('Pick a random club for a match with your friends.', 'Arkadaşlarınla yapacağın maç için rastgele kulüp seç.', 'Wähle zufällig einen Verein für das Match mit deinen Freunden.', 'Elige un club al azar para el partido con tus amigos.', '友だちと行う試合のクラブをランダムに選びます。', '为和朋友的比赛随机选一支俱乐部。'),
    options: [
      P('Real Madrid'), P('Barcelona'), P('Manchester City'), P('Liverpool'), P('Bayern Münih'), P('Arsenal'),
      P('Inter'), P('Paris Saint-Germain'), P('Juventus'), P('Galatasaray'), P('Fenerbahçe'), P('Beşiktaş'),
    ],
  },
  {
    id: 'oyun-gecesi-secici',
    category: 'oyun',
    featured: true,
    requiresCustomization: false,
    title: L('Game Night Picker', 'Oyun Gecesi Seçici', 'Spieleabend-Auswahl', 'Selector de noche de juegos', 'ゲームナイト選び', '游戏之夜选择器'),
    description: L('Pick the game your group plays today.', 'Arkadaş grubuyla bugün oynanacak oyunu seç.', 'Wähle das Spiel, das eure Gruppe heute spielt.', 'Elige el juego que jugará tu grupo hoy.', '今日グループで遊ぶゲームを選びます。', '为朋友们选今天要玩的游戏。'),
    options: [
      P('Minecraft'), P('CS2'), P('Valorant'), P('League of Legends'), P('Roblox'),
      P('Rocket League'), P('Among Us'), P('Overcooked'),
    ],
  },
  {
    id: 'oyun-challenge-secici',
    category: 'oyun',
    featured: false,
    requiresCustomization: false,
    title: L('Game Challenge Picker', 'Oyun Challenge Seçici', 'Spiel-Challenge-Auswahl', 'Selector de desafíos de juego', 'ゲームチャレンジ選び', '游戏挑战选择器'),
    description: L('Pick a challenge that makes the game harder or more fun.', 'Oyunu zorlaştıran veya eğlenceli hâle getiren bir meydan okuma seç.', 'Wähle eine Herausforderung, die das Spiel schwerer oder lustiger macht.', 'Elige un desafío que haga el juego más difícil o divertido.', 'ゲームを難しく、または楽しくするチャレンジを選びます。', '选一个让游戏更难或更有趣的挑战。'),
    options: [
      L('Pistol only', 'Sadece tabanca', 'Nur Pistole', 'Solo pistola', 'ピストルのみ', '只用手枪'),
      L('Play without equipment', 'Ekipmansız oyna', 'Ohne Ausrüstung spielen', 'Juega sin equipo', '装備なしでプレイ', '不带装备玩'),
      L('One life', 'Tek can', 'Ein Leben', 'Una sola vida', '残機1つ', '只有一条命'),
      L('Pick a random character', 'Rastgele karakter seç', 'Wähle einen zufälligen Charakter', 'Elige un personaje al azar', 'キャラクターをランダムに選ぶ', '随机选一个角色'),
      L("Don't run for the first 10 minutes", 'İlk 10 dakika koşma', 'Die ersten 10 Minuten nicht rennen', 'No corras durante los primeros 10 minutos', '最初の10分間は走らない', '前10分钟不准跑'),
      L('Finish without dying', 'Hiç ölmeden tamamla', 'Ohne Tod abschließen', 'Termínalo sin morir', '一度も死なずにクリアする', '不死完成'),
      L('Play with the strategy your teammate picks', 'Takım arkadaşının seçtiği stratejiyle oyna', 'Spiele mit der Strategie, die dein Teamkollege wählt', 'Juega con la estrategia que elija tu compañero', 'チームメイトが選んだ戦略で遊ぶ', '用队友选的策略来玩'),
    ],
  },
  {
    id: 'zor-kariyer-challenge',
    category: 'oyun',
    featured: false,
    requiresCustomization: false,
    title: L('Hard Career Challenge', 'Zor Kariyer Challenge', 'Schwere Karriere-Challenge', 'Desafío de carrera difícil', '難しいキャリア・チャレンジ', '困难生涯挑战'),
    description: L('Pick a harder EA FC career scenario.', 'Daha zor bir EA FC kariyer senaryosu seç.', 'Wähle ein schwereres EA-FC-Karriere-Szenario.', 'Elige un escenario de carrera más difícil de EA FC.', 'より難しい EA FC キャリアのシナリオを選びます。', '选一个更难的 EA FC 生涯情景。'),
    options: [
      L('Pick a team from a lower league', 'Alt ligden takım seç', 'Wähle einen Verein aus einer unteren Liga', 'Elige un equipo de una liga inferior', '下位リーグのチームを選ぶ', '从低级别联赛选一支球队'),
      L('Pick one of the lowest-budget teams', 'En düşük bütçeli takımlardan birini seç', 'Wähle einen der Vereine mit dem niedrigsten Budget', 'Elige uno de los equipos con menor presupuesto', '最も予算の少ないチームの一つを選ぶ', '选一支预算最低的球队'),
      L('Play with young players only', 'Yalnızca genç oyuncularla oyna', 'Spiele nur mit jungen Spielern', 'Juega solo con jugadores jóvenes', '若手選手だけでプレイする', '只用年轻球员'),
      L('Start with the lowest-rated squad', 'En düşük reytingli kadroyla başla', 'Starte mit dem am niedrigsten bewerteten Kader', 'Empieza con la plantilla de menor valoración', '最も評価の低い選手団で始める', '用评分最低的阵容开始'),
      L("Don't use a transfer budget", 'Transfer bütçesi kullanma', 'Verwende kein Transferbudget', 'No uses presupuesto de fichajes', '移籍予算を使わない', '不使用转会预算'),
      L('Use only academy players', 'Sadece altyapı oyuncuları kullan', 'Verwende nur Nachwuchsspieler', 'Usa solo jugadores de la cantera', 'アカデミー出身の選手だけを使う', '只用青训球员'),
      L('Pick a team in the relegation zone', 'Düşme hattındaki bir takımı seç', 'Wähle einen Verein in der Abstiegszone', 'Elige un equipo en zona de descenso', '降格圏のチームを選ぶ', '选一支处于降级区的球队'),
    ],
  },
  {
    id: 'avrupa-devleri',
    category: 'oyun',
    featured: false,
    requiresCustomization: false,
    title: L('European Giants', 'Avrupa Devleri', 'Europas Giganten', 'Gigantes de Europa', 'ヨーロッパの強豪', '欧洲豪门'),
    description: L("Pick one of Europe's best-known big clubs.", 'Avrupa’nın bilinen büyük kulüplerinden birini seç.', 'Wähle einen der bekanntesten großen Vereine Europas.', 'Elige uno de los grandes clubes más conocidos de Europa.', 'ヨーロッパで知られるビッグクラブを一つ選びます。', '从欧洲最知名的豪门中选一支。'),
    options: [
      P('Real Madrid'), P('Barcelona'), P('Bayern Münih'), P('Liverpool'), P('Manchester City'), P('Arsenal'),
      P('Inter'), P('Juventus'), P('Paris Saint-Germain'), P('AC Milan'), P('Atlético de Madrid'), P('Borussia Dortmund'),
    ],
  },
  {
    id: 'rastgele-lig-secici',
    category: 'oyun',
    featured: false,
    requiresCustomization: false,
    title: L('Random League Picker', 'Rastgele Lig Seçici', 'Zufällige Ligaauswahl', 'Selector de liga al azar', 'ランダムなリーグ選び', '随机联赛选择器'),
    description: L('Pick the football league you will start your career in.', 'Kariyere başlayacağın futbol ligini seç.', 'Wähle die Fußballliga, in der du deine Karriere beginnst.', 'Elige la liga de fútbol en la que empezarás tu carrera.', 'キャリアを始めるサッカーリーグを選びます。', '选一个你开始生涯的足球联赛。'),
    options: [
      P('Premier League'), P('La Liga'), P('Bundesliga'), P('Serie A'), P('Ligue 1'), P('Süper Lig'),
      P('Eredivisie'), P('Primeira Liga'),
    ],
  },
  {
    id: 'kariyer-kurallari',
    category: 'oyun',
    featured: false,
    requiresCustomization: false,
    title: L('Career Rules', 'Kariyer Kuralları', 'Karriere-Regeln', 'Reglas de carrera', 'キャリアのルール', '生涯规则'),
    description: L('Pick an extra rule to follow in football career mode.', 'Futbol kariyer modunda uygulayacağın ek kuralı seç.', 'Wähle eine zusätzliche Regel für den Fußball-Karrieremodus.', 'Elige una regla adicional para el modo carrera de fútbol.', 'サッカーのキャリアモードで守る追加ルールを選びます。', '选一条在足球生涯模式中遵守的额外规则。'),
    options: [
      L('No transfers in the first season', 'İlk sezon transfer yasak', 'Keine Transfers in der ersten Saison', 'Sin fichajes en la primera temporada', '最初のシーズンは移籍禁止', '第一赛季禁止转会'),
      L('Academy players only', 'Sadece altyapı oyuncuları', 'Nur Nachwuchsspieler', 'Solo jugadores de la cantera', 'アカデミー出身の選手のみ', '只用青训球员'),
      L('Free agents only', 'Yalnızca serbest oyuncular', 'Nur Vertragslose Spieler', 'Solo jugadores libres', 'フリーエージェントのみ', '只签自由球员'),
      L('No transfers for players over 30', '30 yaş üstüne transfer yok', 'Keine Transfers für Spieler über 30', 'Sin fichajes de jugadores mayores de 30', '30歳以上の選手は移籍なし', '不签30岁以上的球员'),
      L('Domestic transfers only', 'Sadece yerli oyuncu transferi', 'Nur Transfers aus dem Inland', 'Solo fichajes nacionales', '国内選手の移籍のみ', '只做国内转会'),
      L('Sell the best player every season', 'Her sezon en iyi oyuncuyu sat', 'Verkaufe jede Saison den besten Spieler', 'Vende al mejor jugador cada temporada', '毎シーズン最高の選手を売却する', '每个赛季卖掉最好的球员'),
      L("Don't exceed the wage budget", 'Maaş bütçesini aşma', 'Überschreite das Gehaltsbudget nicht', 'No superes el presupuesto salarial', '給与予算を超えない', '不超过工资预算'),
      L('Loan transfers only', 'Sadece kiralık transfer yap', 'Nur Leihgeschäfte', 'Solo fichajes en cesión', 'レンタル移籍のみ', '只做租借转会'),
    ],
  },

  // Fun & friends
  {
    id: 'film-gecesi',
    category: 'eglence',
    featured: true,
    requiresCustomization: false,
    title: L('Movie Night', 'Film Gecesi', 'Filmabend', 'Noche de cine', '映画の夜', '电影之夜'),
    description: L("Pick the movie to watch tonight.", 'Bu akşam izlenecek filmi seç.', 'Wähle den Film für heute Abend.', 'Elige la película que veremos esta noche.', '今夜見る映画を選びます。', '选出今晚要看的电影。'),
    options: [
      P('Inception'), P('Interstellar'), P('The Matrix'), P('Shrek'), P('The Truman Show'),
      P('The Dark Knight'), P('Spirited Away'), P('Coco'),
    ],
  },
  {
    id: 'dizi-secici',
    category: 'eglence',
    featured: false,
    requiresCustomization: false,
    title: L('TV Series Picker', 'Dizi Seçici', 'Serienauswahl', 'Selector de series', 'ドラマ選び', '剧集选择器'),
    description: L('Pick your next series at random.', 'Sıradaki dizini rastgele seç.', 'Wähle zufällig deine nächste Serie.', 'Elige al azar tu próxima serie.', '次に観るドラマをランダムに選びます。', '随机选出你的下一部剧集。'),
    options: [
      P('Breaking Bad'), P('Dark'), P('Friends'), P('The Office'), P('Stranger Things'),
      P('Sherlock'), P('Brooklyn Nine-Nine'), P('Black Mirror'),
    ],
  },
  {
    id: 'bugun-ne-yiyelim',
    category: 'eglence',
    featured: true,
    requiresCustomization: false,
    title: L('What Should We Eat Today?', 'Bugün Ne Yiyelim?', 'Was essen wir heute?', '¿Qué comemos hoy?', '今日は何を食べる？', '今天吃什么？'),
    description: L('Decide what to eat for lunch or dinner.', 'Öğle veya akşam yemeğinde ne yiyeceğine karar ver.', 'Entscheide, was es mittags oder abends zu essen gibt.', 'Decide qué comer al mediodía o por la noche.', 'ランチやディナーに何を食べるか決めましょう。', '决定午饭或晚饭吃什么。'),
    options: [
      P('Pizza'), L('Burger', 'Burger', 'Burger', 'Hamburguesa', 'バーガー', '汉堡'),
      P('Döner'), L('Sushi', 'Sushi', 'Sushi', 'Sushi', '寿司', '寿司'),
      L('Pasta', 'Makarna', 'Nudeln', 'Pasta', 'パスタ', '意大利面'),
      P('Lahmacun'), P('Mantı'), P('Taco'), P('Pide'),
      L('Salad', 'Salata', 'Salat', 'Ensalada', 'サラダ', '沙拉'),
    ],
  },
  {
    id: 'kim-odeyecek',
    category: 'eglence',
    featured: true,
    requiresCustomization: true,
    title: L('Who Pays?', 'Kim Ödeyecek?', 'Wer zahlt?', '¿Quién paga?', '誰が払う？', '谁来买单？'),
    description: L('Pick who pays the bill at random.', 'Hesabı kimin ödeyeceğini rastgele seç.', 'Wähle zufällig, wer die Rechnung zahlt.', 'Elige al azar quién paga la cuenta.', '会計を払う人をランダムに選びます。', '随机选出谁来买单。'),
    options: [
      L('Participant 1', 'Katılımcı 1', 'Teilnehmer 1', 'Participante 1', '参加者1', '参与者1'),
      L('Participant 2', 'Katılımcı 2', 'Teilnehmer 2', 'Participante 2', '参加者2', '参与者2'),
      L('Participant 3', 'Katılımcı 3', 'Teilnehmer 3', 'Participante 3', '参加者3', '参与者3'),
      L('Participant 4', 'Katılımcı 4', 'Teilnehmer 4', 'Participante 4', '参加者4', '参与者4'),
    ],
  },
  {
    id: 'dogruluk-mu-cesaret-mi',
    category: 'eglence',
    featured: false,
    requiresCustomization: false,
    title: L('Truth or Dare?', 'Doğruluk mu Cesaret mi?', 'Wahrheit oder Pflicht?', '¿Verdad o reto?', '真実か挑戦か？', '真心话还是大冒险？'),
    description: L('Pick truth or dare.', 'Doğruluk mu yoksa cesaret mi olacağını seç.', 'Wähle Wahrheit oder Pflicht.', 'Elige verdad o reto.', '真実か挑戦かを選びます。', '选择真心话还是大冒险。'),
    options: [
      L('Truth', 'Doğruluk', 'Wahrheit', 'Verdad', '真実', '真心话'),
      L('Dare', 'Cesaret', 'Pflicht', 'Reto', '挑戦', '大冒险'),
    ],
  },
  {
    id: 'hafta-sonu-ne-yapalim',
    category: 'eglence',
    featured: false,
    requiresCustomization: false,
    title: L('What Should We Do This Weekend?', 'Hafta Sonu Ne Yapalım?', 'Was machen wir am Wochenende?', '¿Qué hacemos el fin de semana?', '週末何をする？', '周末做什么？'),
    description: L('Pick a weekend activity.', 'Hafta sonu etkinliği seç.', 'Wähle eine Aktivität fürs Wochenende.', 'Elige una actividad para el fin de semana.', '週末のアクティビティを選びます。', '选一个周末活动。'),
    options: [
      L('Cinema', 'Sinema', 'Kino', 'Cine', '映画館', '电影院'),
      P('Bowling'),
      L('Picnic', 'Piknik', 'Picknick', 'Picnic', 'ピクニック', '野餐'),
      L('Game night', 'Oyun gecesi', 'Spieleabend', 'Noche de juegos', 'ゲームナイト', '游戏之夜'),
      L('Museum', 'Müze', 'Museum', 'Museo', '美術館', '博物馆'),
      L('Nature walk', 'Doğa yürüyüşü', 'Naturwanderung', 'Caminata por la naturaleza', '自然散策', '自然徒步'),
      L('Café', 'Kafe', 'Café', 'Cafetería', 'カフェ', '咖啡馆'),
      L('Bike ride', 'Bisiklet turu', 'Fahrradtour', 'Paseo en bici', 'サイクリング', '骑行'),
    ],
  },
  {
    id: 'hangi-ulkeye-gidelim',
    category: 'eglence',
    featured: false,
    requiresCustomization: false,
    title: L('Which Country Should We Visit?', 'Hangi Ülkeye Gidelim?', 'Welches Land besuchen wir?', '¿A qué país viajamos?', 'どの国に行く？', '我们去哪个国家？'),
    description: L('Pick a country for a trip idea.', 'Seyahat fikri için ülke seç.', 'Wähle ein Land für eine Reiseidee.', 'Elige un país para una idea de viaje.', '旅行のアイデアとして国を選びます。', '为旅行想法选一个国家。'),
    options: [
      L('Japan', 'Japonya', 'Japan', 'Japón', '日本', '日本'),
      L('Italy', 'İtalya', 'Italien', 'Italia', 'イタリア', '意大利'),
      L('Spain', 'İspanya', 'Spanien', 'España', 'スペイン', '西班牙'),
      L('Norway', 'Norveç', 'Norwegen', 'Noruega', 'ノルウェー', '挪威'),
      L('Portugal', 'Portekiz', 'Portugal', 'Portugal', 'ポルトガル', '葡萄牙'),
      L('South Korea', 'Güney Kore', 'Südkorea', 'Corea del Sur', '韓国', '韩国'),
      L('Greece', 'Yunanistan', 'Griechenland', 'Grecia', 'ギリシャ', '希腊'),
      L('Switzerland', 'İsviçre', 'Schweiz', 'Suiza', 'スイス', '瑞士'),
      L('Thailand', 'Tayland', 'Thailand', 'Tailandia', 'タイ', '泰国'),
      L('Canada', 'Kanada', 'Kanada', 'Canadá', 'カナダ', '加拿大'),
    ],
  },
  {
    id: 'kim-baslayacak',
    category: 'eglence',
    featured: true,
    requiresCustomization: true,
    title: L('Who Starts?', 'Kim Başlayacak?', 'Wer fängt an?', '¿Quién empieza?', '誰が最初？', '谁先开始？'),
    description: L('Pick who starts the game or activity.', 'Oyuna veya etkinliğe ilk kimin başlayacağını seç.', 'Wähle, wer das Spiel oder die Aktivität beginnt.', 'Elige quién empieza el juego o la actividad.', 'ゲームや活動を最初に始める人を選びます。', '选出谁先开始游戏或活动。'),
    options: [
      L('Participant 1', 'Katılımcı 1', 'Teilnehmer 1', 'Participante 1', '参加者1', '参与者1'),
      L('Participant 2', 'Katılımcı 2', 'Teilnehmer 2', 'Participante 2', '参加者2', '参与者2'),
      L('Participant 3', 'Katılımcı 3', 'Teilnehmer 3', 'Participante 3', '参加者3', '参与者3'),
      L('Participant 4', 'Katılımcı 4', 'Teilnehmer 4', 'Participante 4', '参加者4', '参与者4'),
    ],
  },

  // School & teams
  {
    id: 'sozluye-kim-kalkacak',
    category: 'egitim-ve-ekip',
    featured: false,
    requiresCustomization: true,
    title: L('Who Gets Called On?', 'Sözlüye Kim Kalkacak?', 'Wer wird aufgerufen?', '¿Quién sale a la pizarra?', '口頭試験で次に指名されるのは？', '谁被叫去口试？'),
    description: L('Pick the next student for an oral exam.', 'Sözlü sınavda sıradaki öğrenciyi seç.', 'Wähle die nächste Person für die mündliche Prüfung.', 'Elige al siguiente estudiante para el examen oral.', '口頭試験で次に指名する生徒を選びます。', '为口试选出下一位学生。'),
    options: [
      L('Student 1', 'Öğrenci 1', 'Schüler 1', 'Estudiante 1', '生徒1', '学生1'),
      L('Student 2', 'Öğrenci 2', 'Schüler 2', 'Estudiante 2', '生徒2', '学生2'),
      L('Student 3', 'Öğrenci 3', 'Schüler 3', 'Estudiante 3', '生徒3', '学生3'),
      L('Student 4', 'Öğrenci 4', 'Schüler 4', 'Estudiante 4', '生徒4', '学生4'),
      L('Student 5', 'Öğrenci 5', 'Schüler 5', 'Estudiante 5', '生徒5', '学生5'),
      L('Student 6', 'Öğrenci 6', 'Schüler 6', 'Estudiante 6', '生徒6', '学生6'),
    ],
  },
  {
    id: 'ilk-sunumu-kim-yapacak',
    category: 'egitim-ve-ekip',
    featured: true,
    requiresCustomization: true,
    title: L('Who Presents First?', 'İlk Sunumu Kim Yapacak?', 'Wer präsentiert zuerst?', '¿Quién presenta primero?', '最初に発表するのは？', '谁先做展示？'),
    description: L('Pick who starts the presentations at random.', 'Sunum sırasını başlatacak kişiyi rastgele seç.', 'Wähle zufällig, wer die Präsentationen beginnt.', 'Elige al azar quién empieza las presentaciones.', '発表の順番を最初に始める人をランダムに選びます。', '随机选出第一个做展示的人。'),
    options: [
      L('Participant 1', 'Katılımcı 1', 'Teilnehmer 1', 'Participante 1', '参加者1', '参与者1'),
      L('Participant 2', 'Katılımcı 2', 'Teilnehmer 2', 'Participante 2', '参加者2', '参与者2'),
      L('Participant 3', 'Katılımcı 3', 'Teilnehmer 3', 'Participante 3', '参加者3', '参与者3'),
      L('Participant 4', 'Katılımcı 4', 'Teilnehmer 4', 'Participante 4', '参加者4', '参与者4'),
    ],
  },
  {
    id: 'bugunun-gorevlisi',
    category: 'egitim-ve-ekip',
    featured: false,
    requiresCustomization: true,
    title: L("Today's Duty Person", 'Bugünün Görevlisi', 'Dienst von heute', 'Encargado de hoy', '今日の当番', '今天值日的人'),
    description: L("Pick today's duty person for the class or team.", 'Sınıf veya ekibin bugünkü görevlisini belirle.', 'Bestimme die Dienstperson von heute für Klasse oder Team.', 'Elige al encargado de hoy para la clase o el equipo.', 'クラスやチームの今日の当番を決めます。', '为班级或团队选出今天值日的人。'),
    options: [
      L('Participant 1', 'Katılımcı 1', 'Teilnehmer 1', 'Participante 1', '参加者1', '参与者1'),
      L('Participant 2', 'Katılımcı 2', 'Teilnehmer 2', 'Participante 2', '参加者2', '参与者2'),
      L('Participant 3', 'Katılımcı 3', 'Teilnehmer 3', 'Participante 3', '参加者3', '参与者3'),
      L('Participant 4', 'Katılımcı 4', 'Teilnehmer 4', 'Participante 4', '参加者4', '参与者4'),
    ],
  },
  {
    id: 'rastgele-soru-secici',
    category: 'egitim-ve-ekip',
    featured: false,
    requiresCustomization: false,
    title: L('Random Question Picker', 'Rastgele Soru Seçici', 'Zufällige Fragenauswahl', 'Selector aleatorio de preguntas', 'ランダムな質問選び', '随机问题选择器'),
    description: L('Pick a random question for learning or an activity.', 'Öğrenme veya etkinlik için rastgele bir soru seç.', 'Wähle eine zufällige Frage zum Lernen oder für eine Aktivität.', 'Elige una pregunta al azar para aprender o para una actividad.', '学習やアクティビティ用のランダムな質問を選びます。', '为学习或活动随机选一个问题。'),
    options: [
      L("What's something new you learned today?", 'Bugün yeni ne öğrendin?', 'Was hast du heute Neues gelernt?', '¿Qué aprendiste hoy de nuevo?', '今日新しく学んだことは？', '你今天学到了什么新东西？'),
      L('What is the main idea of the topic?', 'Konunun ana fikri nedir?', 'Was ist die Hauptidee des Themas?', '¿Cuál es la idea principal del tema?', 'その話題の主旨は何ですか？', '这个主题的核心思想是什么？'),
      L('Can you give an example?', 'Bir örnek verebilir misin?', 'Kannst du ein Beispiel nennen?', '¿Puedes poner un ejemplo?', '例を挙げられますか？', '你能举个例子吗？'),
      L('What is the advantage of this method?', 'Bu yöntemin avantajı nedir?', 'Was ist der Vorteil dieser Methode?', '¿Cuál es la ventaja de este método?', 'この方法の利点は何ですか？', '这种方法的优点是什么？'),
      L('Is there an alternative solution?', 'Alternatif bir çözüm var mı?', 'Gibt es eine alternative Lösung?', '¿Hay alguna solución alternativa?', '別の解決策はありますか？', '有没有替代方案？'),
      L('Where could we use this information?', 'Bu bilgiyi nerede kullanabiliriz?', 'Wo könnten wir diese Information anwenden?', '¿Dónde podríamos usar esta información?', 'この情報はどこで使えますか？', '这些信息可以用在哪里？'),
    ],
  },
  {
    id: 'toplantida-ilk-kim-konusacak',
    category: 'egitim-ve-ekip',
    featured: false,
    requiresCustomization: true,
    title: L('Who Speaks First in the Meeting?', 'Toplantıda İlk Kim Konuşacak?', 'Wer spricht zuerst in der Besprechung?', '¿Quién habla primero en la reunión?', '会議で最初に話すのは？', '会议上谁先发言？'),
    description: L('Pick the first speaker in the meeting.', 'Toplantıdaki ilk konuşmacıyı belirle.', 'Bestimme die erste Person, die in der Besprechung spricht.', 'Elige la primera persona que habla en la reunión.', '会議で最初に話す人を決めます。', '选出会议上第一个发言的人。'),
    options: [
      L('Participant 1', 'Katılımcı 1', 'Teilnehmer 1', 'Participante 1', '参加者1', '参与者1'),
      L('Participant 2', 'Katılımcı 2', 'Teilnehmer 2', 'Participante 2', '参加者2', '参与者2'),
      L('Participant 3', 'Katılımcı 3', 'Teilnehmer 3', 'Participante 3', '参加者3', '参与者3'),
      L('Participant 4', 'Katılımcı 4', 'Teilnehmer 4', 'Participante 4', '参加者4', '参与者4'),
    ],
  },
  {
    id: 'kahveyi-kim-alacak',
    category: 'egitim-ve-ekip',
    featured: false,
    requiresCustomization: true,
    title: L('Who Gets the Coffee?', 'Kahveyi Kim Alacak?', 'Wer holt den Kaffee?', '¿Quién trae el café?', 'コーヒーを買うのは？', '谁去买咖啡？'),
    description: L('Randomly assign the coffee run.', 'Kahve alma görevini rastgele paylaştır.', 'Verteile die Kaffeerunde zufällig.', 'Asigna al azar quién trae el café.', 'コーヒーを買いに行く係をランダムに決めます。', '随机分配买咖啡的任务。'),
    options: [
      L('Participant 1', 'Katılımcı 1', 'Teilnehmer 1', 'Participante 1', '参加者1', '参与者1'),
      L('Participant 2', 'Katılımcı 2', 'Teilnehmer 2', 'Participante 2', '参加者2', '参与者2'),
      L('Participant 3', 'Katılımcı 3', 'Teilnehmer 3', 'Participante 3', '参加者3', '参与者3'),
      L('Participant 4', 'Katılımcı 4', 'Teilnehmer 4', 'Participante 4', '参加者4', '参与者4'),
    ],
  },
  {
    id: 'gunluk-gorev-secici',
    category: 'egitim-ve-ekip',
    featured: false,
    requiresCustomization: false,
    title: L('Daily Task Picker', 'Günlük Görev Seçici', 'Tägliche Aufgabe', 'Selector de tareas diarias', '今日のタスク選び', '每日任务选择器'),
    description: L("Pick one of today's chores.", 'Günün yapılacak işlerinden birini belirle.', 'Wähle eine der heutigen Aufgaben.', 'Elige una de las tareas de hoy.', '今日やる仕事を一つ選びます。', '从今天的家务中选一项。'),
    options: [
      L('Clean the table', 'Masayı temizle', 'Tisch abwischen', 'Limpiar la mesa', 'テーブルを片付ける', '擦桌子'),
      L('Take out the trash', 'Çöpü çıkar', 'Müll rausbringen', 'Sacar la basura', 'ゴミを出す', '倒垃圾'),
      L('Wash the dishes', 'Bulaşıkları yıka', 'Abwasch machen', 'Lavar los platos', '皿洗いをする', '洗碗'),
      L('Organize the files', 'Dosyaları düzenle', 'Dateien ordnen', 'Ordenar los archivos', 'ファイルを整理する', '整理文件'),
      L('Water the plants', 'Bitkileri sula', 'Pflanzen gießen', 'Regar las plantas', '植物に水をやる', '给植物浇水'),
      L('Tidy up the shared space', 'Ortak alanı toparla', 'Gemeinschaftsbereich aufräumen', 'Ordenar la zona común', '共有スペースを片付ける', '整理公共区域'),
      L('Update the shopping list', 'Alışveriş listesini güncelle', 'Einkaufsliste aktualisieren', 'Actualizar la lista de la compra', '買い物リストを更新する', '更新购物清单'),
    ],
  },
];
