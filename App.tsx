
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Participant, WheelSegment, SegmentType } from './types';
import Wheel, { type WheelHandle } from './components/Wheel';
import confetti from 'canvas-confetti';
import { EXAMPLE_OPTIONS, MAX_OPTIONS, addOptions } from './utils/options';
import { UnsupportedFileError, namesFromFile } from './utils/importFile';
import { optionsFromHash, shareUrl } from './utils/share';
import { loadOptions, saveOptions } from './utils/storage';
import { addToHistory, loadHistory, saveHistory, type HistoryEntry } from './utils/history';
import { WHEEL_PALETTE, assignSliceColors } from './components/wheelPalette';
import { applyLocale, formatNumber, isLocale, saveLocale, savedLocale, translate, type Locale } from './i18n';
import { MESSAGES, type MessageKey } from './i18n/messages';
import { applyTheme, initialTheme, saveTheme, type Theme } from './theme/tokens';
import TemplatesDialog, { type ApplyMode } from './components/TemplatesDialog';
import { optionsFor, type Template } from './templates/data';
import TopBar from './components/TopBar';
import OptionsPanel from './components/OptionsPanel';
import ResultDialog from './components/ResultDialog';
import HistoryDialog from './components/HistoryDialog';
import ConfirmDialog from './components/ConfirmDialog';
import BottomNav from './components/BottomNav';
import AdSlot from './components/AdSlot';
import ConsentBanner from './components/ConsentBanner';
import { ADSENSE_ENABLED } from './ads/config';
import { readConsent, writeConsent, type Consent } from './ads/consent';

type Translate = (key: MessageKey, vars?: Record<string, string | number>) => string;

/** The two fixed slices. Their labels follow the chosen language. */
const fixedSegments = (t: Translate): WheelSegment[] => [
  { label: t('segment.pass'), type: SegmentType.PASS, color: '#064e3b' },
  { label: t('segment.bankrupt'), type: SegmentType.BANKRUPT, color: '#7f1d1d' },
  { label: t('segment.pass'), type: SegmentType.PASS, color: '#064e3b' },
  { label: t('segment.bankrupt'), type: SegmentType.BANKRUPT, color: '#7f1d1d' },
  { label: t('segment.bankrupt'), type: SegmentType.BANKRUPT, color: '#7f1d1d' },
];

const TIP_KEY = 'kurala-tip-done';

let idCounter = 0;
const newId = () => `${Date.now().toString(36)}-${(idCounter++).toString(36)}`;

const toParticipants = (names: readonly string[]): Participant[] =>
  names.map((name) => ({ id: newId(), name }));

/** Where the list starts: the names in a shared link, else the list saved in this browser, else the examples. */
const startingNames = (): string[] => optionsFromHash(window.location.hash) ?? loadOptions() ?? EXAMPLE_OPTIONS;

const tipAlreadySeen = (): boolean => {
  try {
    return localStorage.getItem(TIP_KEY) === '1';
  } catch {
    return false;
  }
};

type Confirm = 'clear' | 'examples' | 'historyClear';

const App: React.FC = () => {
  const [locale, setLocale] = useState<Locale>(savedLocale);
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const t: Translate = (key, vars) => translate(locale, key, vars);

  const [participants, setParticipants] = useState<Participant[]>(() =>
    toParticipants(addOptions([], startingNames()).list)
  );
  const [newName, setNewName] = useState('');
  const [notice, setNotice] = useState<{ text: string; tone: 'ok' | 'error' } | null>(null);
  const [result, setResult] = useState<WheelSegment | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [confirm, setConfirm] = useState<Confirm | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [showTip, setShowTip] = useState(() => !tipAlreadySeen() && participants.length > 0);
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory);
  const [historyError, setHistoryError] = useState(false);

  const [consent, setConsent] = useState<Consent | null>(readConsent);
  const answerConsent = (answer: Consent) => {
    writeConsent(answer);
    setConsent(answer);
  };

  const wheelRef = useRef<WheelHandle>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    applyLocale(locale);
    saveLocale(locale);
  }, [locale]);

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  // A shared link's names are kept in this browser too, like any other change to the list.
  useEffect(() => {
    const shared = optionsFromHash(window.location.hash);
    if (shared) saveOptions(addOptions([], shared).list);
  }, []);

  // A short message at the bottom of the screen. Errors stay a little longer.
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), notice.tone === 'error' ? 6000 : 4000);
    return () => window.clearTimeout(timer);
  }, [notice]);

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
      WHEEL_PALETTE[theme].slices
    );
    const colorById = new Map<string, string>();
    const segments: WheelSegment[] = order.map((item, i) => {
      if (item.kind === 'fixed') return { ...item.segment, color: colors[i] };
      colorById.set(item.participant.id, colors[i]);
      return { label: item.participant.name, type: SegmentType.PARTICIPANT, color: colors[i] };
    });
    return { segments, colorById };
    // t is derived from locale, which is the real dependency.
  }, [participants, locale, theme]);

  // Confetti after a result, unless the result window is closed again.
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

  const anyDialogOpen = templatesOpen || historyOpen || confirm !== null || result !== null || sheetOpen;

  // Space spins the wheel, unless the user is typing or a dialog is open.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== ' ' || anyDialogOpen) return;
      const target = event.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'].includes(target.tagName)) return;
      event.preventDefault();
      wheelRef.current?.spin();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [anyDialogOpen]);

  // Esc closes the sheet on phones.
  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSheetOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sheetOpen]);

  const names = participants.map((p) => p.name);

  /** Every change to the list goes through here, so the list is always saved in this browser. */
  const commit = (next: Participant[]) => {
    setParticipants(next);
    saveOptions(next.map((p) => p.name));
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
    commit(participants.filter((p) => p.id !== id));
  };

  const dismissTip = () => {
    setShowTip(false);
    try {
      localStorage.setItem(TIP_KEY, '1');
    } catch {
      // Storage can be blocked: the tip may show again on the next visit.
    }
  };

  const runConfirm = () => {
    if (confirm === 'clear') {
      commit([]);
      showNotice(t('toast.cleared'));
    } else if (confirm === 'examples') {
      commit(toParticipants(EXAMPLE_OPTIONS));
      showNotice(t('toast.examplesLoaded'));
    } else if (confirm === 'historyClear') {
      setHistory([]);
      saveHistory([]);
    }
    setConfirm(null);
  };

  const loadExamples = () => {
    if (participants.length > 0) setConfirm('examples');
    else runExamples();
  };

  const runExamples = () => {
    commit(toParticipants(EXAMPLE_OPTIONS));
    showNotice(t('toast.examplesLoaded'));
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
    const slices = wheel.segments.length;
    const entry: HistoryEntry = {
      id: newId(),
      winner: segment.label,
      at: Date.now(),
      slices,
      chance: 100 / slices,
    };
    const next = addToHistory(history, entry);
    setHistory(next);
    setHistoryError(!saveHistory(next));
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

  // Result actions
  const winner = result?.label ?? '';
  const isParticipantResult = result?.type === SegmentType.PARTICIPANT;
  const sliceCount = wheel.segments.length;
  const spinAgain = () => {
    setResult(null);
    wheelRef.current?.spin();
  };
  const removeWinner = () => {
    const target = participants.find((p) => p.name === winner);
    if (target) removeParticipant(target.id);
    setResult(null);
    showNotice(t('toast.removed'));
  };
  const copyResult = async () => {
    const text = `${t('result.badge')}: ${winner}`;
    try {
      await navigator.clipboard.writeText(text);
      showNotice(t('result.copied'));
    } catch {
      window.prompt(t('result.copy'), text);
    }
  };

  const chanceText = (entry: HistoryEntry) =>
    t('history.chance', { n: entry.slices, pct: formatNumber(entry.chance, locale) });

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar
        t={t}
        locale={locale}
        onLocale={setLocale}
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
        onWheel={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onTemplates={() => setTemplatesOpen(true)}
        onHistory={() => setHistoryOpen(true)}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-md py-lg pb-24 md:px-lg md:py-xl md:pb-xl md:grid md:grid-cols-12 md:gap-lg">
        <section aria-labelledby="wheel-heading" className="md:col-span-7 flex flex-col items-center">
          <h1 id="wheel-heading" className="sr-only">{t('app.name')}</h1>
          <p className="mb-md text-center text-body-md text-ink-secondary">{t('app.tagline')}</p>

          <Wheel
            ref={wheelRef}
            segments={wheel.segments}
            onResult={handleResult}
            spinning={isSpinning}
            setSpinning={setIsSpinning}
            labels={{ spin: t('wheel.spin'), spinning: t('wheel.spinning') }}
            theme={theme}
          />

          <p className="mt-md text-center text-label-md text-ink-secondary" aria-live="polite">
            {t('wheel.fairness', { pct: formatNumber(100 / sliceCount, locale) })} · {isSpinning ? t('wheel.spinning') : t('wheel.ready')}
          </p>
          <p className="text-center text-label-sm text-ink-secondary">{t('wheel.hint')}</p>

        </section>

        {sheetOpen && (
          <div className="md:hidden fixed inset-0 z-30 bg-overlay/40" aria-hidden="true" onClick={() => setSheetOpen(false)} />
        )}

        <div className="md:col-span-5 mt-lg md:mt-0">
          <OptionsPanel
            ref={inputRef}
            t={t}
            participants={participants}
            colorById={wheel.colorById}
            newName={newName}
            onNewNameChange={setNewName}
            onAdd={addOne}
            onImport={(file) => void importFile(file)}
            onTemplates={() => setTemplatesOpen(true)}
            onExamples={loadExamples}
            onShare={() => void shareWheel()}
            onClear={() => setConfirm('clear')}
            onRemove={removeParticipant}
            showTip={showTip}
            onDismissTip={dismissTip}
            sheetOpen={sheetOpen}
            onCloseSheet={() => setSheetOpen(false)}
            shareDisabled={participants.length === 0}
          />
          <div className="mt-lg">
            <AdSlot key={`side-${consent}`} placement="sidebar" t={t} consent={consent} />
          </div>
        </div>

        <div className="md:col-span-12 mt-xl">
          <AdSlot key={`foot-${consent}`} placement="footer" t={t} consent={consent} />
        </div>

        <section aria-labelledby="privacy-heading" className="md:col-span-12 mt-xl rounded-card bg-surface-muted p-lg">
          <h2 id="privacy-heading" className="font-display text-headline-sm mb-xs">{t('privacy.badge')}</h2>
          <p className="text-body-sm text-ink-secondary">{t('privacy.card')}</p>
          {historyError && <p className="mt-sm text-body-sm text-warning">{t('history.storageError')}</p>}
        </section>
      </main>

      {ADSENSE_ENABLED && consent === null && <ConsentBanner t={t} onAnswer={answerConsent} />}

      {notice && (
        <div
          role={notice.tone === 'error' ? 'alert' : 'status'}
          className={`fixed bottom-24 md:bottom-md right-md left-md md:left-auto md:w-[380px] z-50 rounded-card bg-surface shadow-3 border-l-4 px-md py-sm text-body-sm ${
            notice.tone === 'error' ? 'border-error' : 'border-success'
          }`}
        >
          <span className="flex items-start justify-between gap-sm">
            <span>{notice.text}</span>
            <button
              type="button"
              onClick={() => setNotice(null)}
              aria-label={t('common.closeButton')}
              className="min-w-[44px] min-h-[44px] -my-sm -mr-sm rounded-control text-ink-secondary hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              ✕
            </button>
          </span>
        </div>
      )}

      <BottomNav
        t={t}
        onWheel={() => { setSheetOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        onOptions={() => setSheetOpen(true)}
        onTemplates={() => setTemplatesOpen(true)}
        onHistory={() => setHistoryOpen(true)}
        active={sheetOpen ? 'options' : 'wheel'}
      />

      {templatesOpen && (
        <TemplatesDialog
          locale={locale}
          t={t}
          hasOptions={participants.length > 0}
          onApply={applyTemplate}
          onClose={() => setTemplatesOpen(false)}
        />
      )}

      {historyOpen && (
        <HistoryDialog
          locale={locale}
          title={t('history.title')}
          count={t('history.count', { n: history.length })}
          limit={t('history.limit')}
          emptyTitle={t('history.emptyTitle')}
          emptyBody={t('history.emptyBody')}
          clearLabel={t('history.clear')}
          closeLabel={t('common.closeButton')}
          chanceText={chanceText}
          entries={history}
          onClear={() => setConfirm('historyClear')}
          onClose={() => setHistoryOpen(false)}
        />
      )}

      {result && !isSpinning && (
        <ResultDialog
          badge={t('result.badge')}
          title={t('result.title')}
          winner={winner}
          detail={t('result.detail', { n: sliceCount, pct: formatNumber(100 / sliceCount, locale) })}
          body={t('result.body')}
          spinAgain={t('result.spinAgain')}
          remove={isParticipantResult ? t('result.remove') : undefined}
          copy={t('result.copy')}
          closeLabel={t('common.closeButton')}
          onSpinAgain={spinAgain}
          onRemove={isParticipantResult ? removeWinner : undefined}
          onCopy={() => void copyResult()}
          onClose={() => setResult(null)}
        />
      )}

      {confirm && (
        <ConfirmDialog
          title={confirm === 'clear' ? t('clear.title') : confirm === 'examples' ? t('examples.confirm') : t('history.clearTitle')}
          body={confirm === 'clear' ? t('clear.body') : confirm === 'examples' ? t('examples.body') : t('history.clearBody')}
          confirmLabel={confirm === 'clear' ? t('clear.confirm') : confirm === 'examples' ? t('action.loadExamples') : t('history.clearConfirm')}
          cancelLabel={t('common.cancel')}
          closeLabel={t('common.closeButton')}
          danger={confirm !== 'examples'}
          onConfirm={runConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
};

export default App;
