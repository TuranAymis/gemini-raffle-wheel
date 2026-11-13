
import React, { useState, useEffect, useMemo } from 'react';
import { Participant, WheelSegment, SegmentType } from './types';
import Wheel from './components/Wheel';
import confetti from 'canvas-confetti';
import { EXAMPLE_OPTIONS, MAX_OPTIONS, addOptions } from './utils/options';
import { UnsupportedFileError, namesFromFile } from './utils/importFile';
import { optionsFromHash, shareUrl } from './utils/share';
import { loadOptions, saveOptions } from './utils/storage';
import { WHEEL_PALETTE, assignSliceColors } from './components/wheelPalette';
import { LOCALES, applyLocale, formatNumber, isLocale, saveLocale, savedLocale, translate, type Locale } from './i18n';
import { MESSAGES, type MessageKey } from './i18n/messages';
import TemplatesDialog, { type ApplyMode } from './components/TemplatesDialog';
import { optionsFor, type Template } from './templates/data';

type Translate = (key: MessageKey, vars?: Record<string, string | number>) => string;

/** The two fixed slices. Their labels follow the chosen language. */
const fixedSegments = (t: Translate): WheelSegment[] => [
  { label: t('segment.pass'), type: SegmentType.PASS, color: '#064e3b' },
  { label: t('segment.bankrupt'), type: SegmentType.BANKRUPT, color: '#7f1d1d' },
  { label: t('segment.pass'), type: SegmentType.PASS, color: '#064e3b' },
  { label: t('segment.bankrupt'), type: SegmentType.BANKRUPT, color: '#7f1d1d' },
  { label: t('segment.bankrupt'), type: SegmentType.BANKRUPT, color: '#7f1d1d' },
];

let idCounter = 0;
const newId = () => `${Date.now().toString(36)}-${(idCounter++).toString(36)}`;

const toParticipants = (names: readonly string[]): Participant[] =>
  names.map((name) => ({ id: newId(), name }));

/** Where the list starts: the names in a shared link, else the list saved in this browser, else the examples. */
const startingNames = (): string[] => optionsFromHash(window.location.hash) ?? loadOptions() ?? EXAMPLE_OPTIONS;

const App: React.FC = () => {
  const [locale, setLocale] = useState<Locale>(savedLocale);
  const t: Translate = (key, vars) => translate(locale, key, vars);

  const [participants, setParticipants] = useState<Participant[]>(() =>
    toParticipants(addOptions([], startingNames()).list)
  );
  const [newName, setNewName] = useState('');
  const [notice, setNotice] = useState<{ text: string; tone: 'ok' | 'error' } | null>(null);
  const [result, setResult] = useState<WheelSegment | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);

  useEffect(() => {
    applyLocale(locale);
    saveLocale(locale);
  }, [locale]);

  // A shared link's names are kept in this browser too, like any other change to the list.
  useEffect(() => {
    const shared = optionsFromHash(window.location.hash);
    if (shared) saveOptions(addOptions([], shared).list);
  }, []);

  // The slices in wheel order, with their colors. The list dots use the same colors, so they always match the wheel.
  const wheel = useMemo(() => {
    type Item = { kind: 'participant'; participant: Participant } | { kind: 'fixed'; segment: WheelSegment };
    const order: Item[] = [];
    const fixed = fixedSegments(t);
    const totalFixed = fixed.length;
    const totalParticipants = participants.length;

    if (totalParticipants === 0) {
      fixed.forEach((segment) => order.push({ kind: 'fixed', segment }));
    } else {
      const interval = Math.floor(totalParticipants / totalFixed) || 1;
      let pIdx = 0;
      let fIdx = 0;
      while (pIdx < totalParticipants || fIdx < totalFixed) {
        for (let i = 0; i < interval && pIdx < totalParticipants; i++) {
          order.push({ kind: 'participant', participant: participants[pIdx++] });
        }
        if (fIdx < totalFixed) {
          order.push({ kind: 'fixed', segment: fixed[fIdx++] });
        }
      }
    }

    const colors = assignSliceColors(
      order.map((item) => (item.kind === 'fixed' ? item.segment.color : null)),
      WHEEL_PALETTE.dark.slices
    );
    const colorById = new Map<string, string>();
    const segments: WheelSegment[] = order.map((item, i) => {
      if (item.kind === 'fixed') return { ...item.segment, color: colors[i] };
      colorById.set(item.participant.id, colors[i]);
      return { label: item.participant.name, type: SegmentType.PARTICIPANT, color: colors[i] };
    });
    return { segments, colorById };
  }, [participants, locale]);

  useEffect(() => {
    if (result && !isSpinning) {
      const duration = 4 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 35, spread: 360, ticks: 100, zIndex: 100 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 60 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [result, isSpinning]);

  const names = participants.map(p => p.name);

  /** Every change to the list goes through here, so the list is always saved in this browser. */
  const commit = (next: Participant[]) => {
    setParticipants(next);
    saveOptions(next.map(p => p.name));
  };

  const showNotice = (text: string, tone: 'ok' | 'error' = 'ok') => setNotice({ text, tone });

  /** Appends the names that are new to the list and reports what happened to the others. */
  const appendNames = (incoming: string[]) => {
    const { list, added, duplicates, overflow } = addOptions(names, incoming);
    const fresh = list.slice(names.length).map((name) => ({ id: newId(), name }));
    commit([...participants, ...fresh]);
    return { added, duplicates, overflow };
  };

  const addOne = () => {
    const { added, duplicates, overflow } = appendNames([newName]);
    if (added > 0) {
      setNewName('');
      showNotice(t('option.added'));
    } else if (newName.trim() === '') {
      showNotice(t('input.empty'), 'error');
    } else if (duplicates > 0) {
      showNotice(t('input.duplicate'), 'error');
    } else if (overflow > 0) {
      showNotice(t('input.max', { n: MAX_OPTIONS }), 'error');
    }
  };

  const importFile = async (file: File | undefined) => {
    if (!file) return;
    try {
      const { added, duplicates, overflow } = appendNames(await namesFromFile(file));
      if (added === 0) {
        showNotice(t('import.noNew'), 'error');
        return;
      }
      const extra = overflow > 0 ? ` ${t('import.overflow', { n: overflow, max: MAX_OPTIONS })}` : '';
      showNotice(`${t('import.result', { n: added, k: duplicates })}${extra}`);
    } catch (error) {
      showNotice(t(error instanceof UnsupportedFileError ? 'import.unsupported' : 'import.error'), 'error');
    }
  };

  const removeParticipant = (id: string) => {
    commit(participants.filter(p => p.id !== id));
  };

  const clearParticipants = () => {
    if (confirm(`${t('clear.title')}\n\n${t('clear.body')}`)) {
      commit([]);
    }
  };

  const loadExamples = () => {
    if (participants.length > 0 && !confirm(t('examples.confirm'))) return;
    commit(toParticipants(EXAMPLE_OPTIONS));
  };

  const shareWheel = async () => {
    const link = shareUrl(window.location.href.split('#')[0]!, names);
    if (!link) {
      showNotice(t('share.tooLong'), 'error');
      return;
    }
    try {
      await navigator.clipboard.writeText(link);
      showNotice(t('share.copied'));
    } catch {
      window.prompt(t('share.prompt'), link);
    }
  };

  const handleResult = (segment: WheelSegment) => {
    setResult(segment);
  };

  /** Adds a ready-made list to the current list, or replaces it. */
  const applyTemplate = (template: Template, mode: ApplyMode) => {
    const incoming = optionsFor(template, locale);
    const name = template.title[locale];
    const hint = template.requiresCustomization ? ` ${t('templates.customize')}` : '';
    if (mode === 'replace') {
      commit(toParticipants(addOptions([], incoming).list));
      showNotice(`${t('templates.loaded', { name, n: incoming.length })}${hint}`);
    } else {
      const { added, duplicates, overflow } = appendNames(incoming);
      const extra = overflow > 0 ? ` ${t('import.overflow', { n: overflow, max: MAX_OPTIONS })}` : '';
      showNotice(`${t('import.result', { n: added, k: duplicates })}${extra}${hint}`, added > 0 ? 'ok' : 'error');
    }
    setTemplatesOpen(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center max-w-6xl mx-auto overflow-x-hidden">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-8xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 mb-4 uppercase tracking-tighter drop-shadow-2xl">
          {t('app.name')}
        </h1>
        <p className="text-slate-400 font-bold tracking-[0.2em] uppercase text-sm opacity-80">{t('app.tagline')}</p>
        <div className="mt-6">
          <select
            aria-label={t('nav.language')}
            value={locale}
            onChange={(e) => {
              if (isLocale(e.target.value)) setLocale(e.target.value);
            }}
            className="bg-slate-800 text-slate-200 rounded-lg px-3 py-2 text-sm border border-white/10"
          >
            {LOCALES.map((code) => (
              <option key={code} value={code}>
                {MESSAGES['lang.name'][code]}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
        <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
          <section className="bg-slate-900/50 p-6 rounded-3xl border border-white/10 backdrop-blur-sm shadow-xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              {t('action.addOption')}
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addOne()}
                placeholder={t('input.placeholder')}
                className="flex-1 bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-500 text-white placeholder:text-slate-500 transition-all"
              />
              <button
                onClick={addOne}
                className="bg-yellow-500 text-slate-900 font-bold px-6 rounded-xl hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/20"
              >
                {t('input.add')}
              </button>
            </div>

            <label className="mt-5 flex flex-col gap-2 text-sm text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">{t('import.button')}</span>
              <input
                type="file"
                accept=".csv,.xlsx"
                onChange={(e) => {
                  void importFile(e.target.files?.[0]);
                  e.target.value = '';
                }}
                className="block w-full text-sm text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-700 file:px-3 file:py-2 file:text-slate-100 hover:file:bg-slate-600"
              />
              <span className="text-xs text-slate-500">{t('import.hint')}</span>
            </label>

            {notice && (
              <p role="status" className={`mt-4 text-sm ${notice.tone === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                {notice.text}
              </p>
            )}
          </section>

          <section className="bg-slate-900/50 p-6 rounded-3xl border border-white/10 backdrop-blur-sm flex-1 shadow-xl">
            <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
              <h2 className="text-xl font-bold">{t('list.title')} ({participants.length})</h2>
              <div className="flex gap-4 text-xs uppercase font-bold tracking-wider">
                <button onClick={() => setTemplatesOpen(true)} className="text-slate-400 hover:text-yellow-400 transition-colors">
                  {t('templates.title')}
                </button>
                <button onClick={loadExamples} className="text-slate-400 hover:text-yellow-400 transition-colors">
                  {t('action.examples')}
                </button>
                <button
                  onClick={() => void shareWheel()}
                  disabled={participants.length === 0}
                  className="text-slate-400 hover:text-yellow-400 transition-colors disabled:opacity-40"
                >
                  {t('action.share')}
                </button>
                {participants.length > 0 && (
                  <button onClick={clearParticipants} className="text-slate-500 hover:text-red-400 transition-colors">
                    {t('action.clear')}
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {participants.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-600">
                  <svg className="w-12 h-12 mb-2 opacity-20" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 015.25-2.906z" /></svg>
                  <p className="italic text-sm">{t('empty.title')}</p>
                </div>
              ) : (
                participants.map((p) => (
                  <div key={p.id} className="group flex items-center justify-between bg-slate-800/50 p-3 rounded-xl hover:bg-slate-800/80 transition-all border border-white/5">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="shrink-0 w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: wheel.colorById.get(p.id) }}></div>
                      <span className="font-semibold text-slate-200 truncate">{p.name}</span>
                    </div>
                    <button
                      onClick={() => removeParticipant(p.id)}
                      aria-label={t('list.delete')}
                      className="shrink-0 text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <div className="lg:col-span-8 flex flex-col items-center justify-center order-1 lg:order-2">
          <div className="relative p-6 md:p-12 bg-slate-900/30 rounded-full border border-white/5 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 rounded-full bg-red-600/10 blur-3xl -z-10 animate-pulse"></div>
            <Wheel
              segments={wheel.segments}
              onResult={handleResult}
              spinning={isSpinning}
              setSpinning={setIsSpinning}
              labels={{ spin: t('wheel.spin'), spinning: t('wheel.spinning'), hint: t('wheel.hint') }}
            />
          </div>
        </div>
      </div>

      {templatesOpen && (
        <TemplatesDialog
          locale={locale}
          t={t}
          hasOptions={participants.length > 0}
          onApply={applyTemplate}
          onClose={() => setTemplatesOpen(false)}
        />
      )}

      {result && !isSpinning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-slate-900 border-t-8 border-yellow-500 p-12 rounded-[3rem] text-center max-w-2xl w-full shadow-[0_20px_100px_rgba(0,0,0,1)] relative overflow-hidden animate-bounce-in z-50">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-yellow-500 blur-md opacity-60"></div>

            <h3 className="text-yellow-500 font-black uppercase tracking-[0.4em] text-2xl mb-8 drop-shadow-lg italic">
              {t('result.title')}
            </h3>

            <div
              className={`text-4xl md:text-6xl font-black mb-6 p-8 rounded-[2rem] whitespace-nowrap overflow-hidden text-ellipsis shadow-2xl transition-all ${result.type === SegmentType.BANKRUPT ? 'text-red-500 bg-red-500/10 border-2 border-red-500/20' :
                result.type === SegmentType.PASS ? 'text-green-500 bg-green-500/10 border-2 border-green-500/20' :
                  'text-white bg-slate-800/80 border-2 border-yellow-500/20'
                }`}
            >
              {result.label}
            </div>

            <p className="text-slate-300 mb-2">
              {t('result.detail', { n: wheel.segments.length, pct: formatNumber(100 / wheel.segments.length, locale) })}
            </p>
            <p className="text-slate-400 mb-10">{t('result.body')}</p>

            <button
              onClick={() => setResult(null)}
              className="group relative bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-black py-6 px-20 rounded-full uppercase tracking-[0.3em] text-xl transition-all transform hover:scale-110 active:scale-95 shadow-[0_10px_40px_rgba(234,179,8,0.4)]"
            >
              <span className="relative z-10">{t('common.closeButton')}</span>
              <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </button>
          </div>
        </div>
      )}

      <footer className="mt-auto pt-12 text-slate-600 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] flex flex-col items-center gap-6">
        <p className="opacity-60 tracking-[0.2em] normal-case">{t('privacy.badge')}</p>
      </footer>

      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </div>
  );
};

export default App;
