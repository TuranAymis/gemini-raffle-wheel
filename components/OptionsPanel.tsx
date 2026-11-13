import React, { forwardRef } from 'react';
import type { Participant } from '../types';
import type { MessageKey } from '../i18n/messages';

type Translate = (key: MessageKey, vars?: Record<string, string | number>) => string;

interface OptionsPanelProps {
  t: Translate;
  participants: Participant[];
  colorById: Map<string, string>;
  newName: string;
  onNewNameChange: (value: string) => void;
  onAdd: () => void;
  onImport: (file: File | undefined) => void;
  onTemplates: () => void;
  onExamples: () => void;
  onShare: () => void;
  onClear: () => void;
  onRemove: (id: string) => void;
  onDismissTip: () => void;
  showTip: boolean;
  /** On phones the panel is a sheet that opens from the wheel screen. */
  sheetOpen: boolean;
  onCloseSheet: () => void;
  shareDisabled: boolean;
}

/** The option list: add, import, actions and the list itself. */
const OptionsPanel = forwardRef<HTMLInputElement, OptionsPanelProps>(
  (
    { t, participants, colorById, newName, onNewNameChange, onAdd, onImport, onTemplates, onExamples, onShare, onClear, onRemove, onDismissTip, showTip, sheetOpen, onCloseSheet, shareDisabled },
    inputRef
  ) => {
    const empty = participants.length === 0;
    const sheet = sheetOpen
      ? 'fixed inset-x-0 bottom-0 z-40 max-h-[88vh] overflow-y-auto rounded-t-card shadow-3'
      : 'hidden';
    return (
      <section
        aria-labelledby="options-heading"
        className={`${sheet} md:static md:block md:max-h-none md:overflow-visible md:rounded-card md:shadow-1 bg-surface text-ink border border-line-subtle p-lg space-y-lg`}
      >
        <div className="flex items-center justify-between gap-md">
          <h2 id="options-heading" className="font-display text-headline-md">
            {t('list.title')} <span className="rounded-full bg-tint text-ink-tint text-label-sm px-sm py-xs align-middle">{participants.length}</span>
          </h2>
          <button
            type="button"
            onClick={onCloseSheet}
            aria-label={t('common.closeButton')}
            className="md:hidden min-w-[44px] min-h-[44px] rounded-control bg-surface-muted text-ink-secondary"
          >
            ✕
          </button>
        </div>

        {showTip && (
          <div className="rounded-card bg-tint text-ink-tint p-md">
            <p className="font-semibold mb-xs">{t('onboarding.title')}</p>
            <p className="text-body-sm mb-sm">{t('onboarding.body')}</p>
            <button
              type="button"
              onClick={onDismissTip}
              className="min-h-[44px] rounded-control bg-surface px-md font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              {t('onboarding.gotIt')}
            </button>
          </div>
        )}

        <form
          className="flex gap-sm"
          onSubmit={(event) => {
            event.preventDefault();
            onAdd();
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={newName}
            onChange={(event) => onNewNameChange(event.target.value)}
            placeholder={t('input.placeholder')}
            aria-label={t('action.addOption')}
            className="min-h-[48px] flex-1 min-w-0 rounded-control border border-line-control bg-surface-muted px-md text-body-md text-ink placeholder:text-ink-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          />
          <button
            type="submit"
            className="min-h-[48px] shrink-0 rounded-control bg-primary px-lg font-semibold text-ink-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            {t('input.add')}
          </button>
        </form>

        <div className="space-y-xs">
          <label className="block text-label-md text-ink" htmlFor="import-file">{t('import.button')}</label>
          <input
            id="import-file"
            type="file"
            accept=".csv,.xlsx"
            onChange={(event) => {
              onImport(event.target.files?.[0]);
              event.target.value = '';
            }}
            className="block w-full min-h-[44px] text-body-sm text-ink-secondary file:mr-sm file:min-h-[44px] file:rounded-control file:border-0 file:bg-surface-muted file:px-md file:text-ink file:font-semibold"
          />
          <p className="text-label-sm text-ink-secondary">{t('import.hint')}</p>
        </div>

        <div className="flex flex-wrap gap-xs">
          <ActionButton onClick={onTemplates}>{t('templates.title')}</ActionButton>
          <ActionButton onClick={onExamples}>{t('action.examples')}</ActionButton>
          <ActionButton onClick={onShare} disabled={shareDisabled}>{t('action.share')}</ActionButton>
          {!empty && <ActionButton onClick={onClear} danger>{t('action.clear')}</ActionButton>}
        </div>

        {empty ? (
          <div className="rounded-card border border-dashed border-line-control p-lg text-center">
            <div aria-hidden="true" className="mx-auto mb-sm h-12 w-12 rounded-full border-2 border-dashed border-line-control" />
            <p className="font-display text-headline-sm mb-xs">{t('empty.title')}</p>
            <p className="text-body-sm text-ink-secondary mb-md">{t('empty.body')}</p>
            <div className="flex flex-wrap justify-center gap-sm">
              <button
                type="button"
                onClick={onExamples}
                className="min-h-[44px] rounded-control bg-primary px-md font-semibold text-ink-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                {t('action.loadExamples')}
              </button>
              <button
                type="button"
                onClick={() => (inputRef as React.RefObject<HTMLInputElement>).current?.focus()}
                className="min-h-[44px] rounded-control border border-line-control px-md font-semibold text-ink hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                {t('action.addOption')}
              </button>
            </div>
          </div>
        ) : (
          <ul className="space-y-xs max-h-[360px] overflow-y-auto pr-xs">
            {participants.map((participant) => (
              <li key={participant.id} className="flex items-center justify-between gap-sm rounded-control bg-surface-muted px-md py-sm">
                <span className="flex min-w-0 items-center gap-sm">
                  <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: colorById.get(participant.id) }} />
                  <span className="truncate">{participant.name}</span>
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(participant.id)}
                  aria-label={t('list.delete')}
                  className="min-w-[44px] min-h-[44px] shrink-0 rounded-control text-ink-secondary hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }
);

const ActionButton: React.FC<{ onClick: () => void; disabled?: boolean; danger?: boolean; children: React.ReactNode }> = ({ onClick, disabled, danger, children }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`min-h-[44px] rounded-control px-md text-label-md disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
      danger ? 'text-error hover:bg-error/10' : 'text-ink hover:bg-primary/10'
    }`}
  >
    {children}
  </button>
);

OptionsPanel.displayName = 'OptionsPanel';
export default OptionsPanel;
