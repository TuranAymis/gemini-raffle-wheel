import React from 'react';
import Modal from './Modal';
import type { HistoryEntry } from '../utils/history';
import type { Locale } from '../i18n';

interface HistoryDialogProps {
  locale: Locale;
  title: string;
  count: string;
  limit: string;
  emptyTitle: string;
  emptyBody: string;
  clearLabel: string;
  closeLabel: string;
  /** The text for "{n} options · {pct}%" of one entry. */
  chanceText: (entry: HistoryEntry) => string;
  entries: HistoryEntry[];
  onClear: () => void;
  onClose: () => void;
}

const HistoryDialog: React.FC<HistoryDialogProps> = ({
  locale, title, count, limit, emptyTitle, emptyBody, clearLabel, closeLabel, chanceText, entries, onClear, onClose,
}) => {
  const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' });
  return (
    <Modal title={title} onClose={onClose} closeLabel={closeLabel} width="max-w-xl">
      <div className="flex flex-wrap items-center gap-sm mb-md">
        <span className="rounded-full bg-tint text-ink-tint text-label-sm px-sm py-xs">{count}</span>
        <span className="text-body-sm text-ink-secondary">{limit}</span>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-card border border-dashed border-line-control p-lg text-center">
          <p className="font-display text-headline-sm mb-xs">{emptyTitle}</p>
          <p className="text-body-sm text-ink-secondary">{emptyBody}</p>
        </div>
      ) : (
        <ul className="space-y-sm max-h-[50vh] overflow-y-auto mb-lg">
          {entries.map((entry) => (
            <li key={entry.id} className="rounded-control bg-surface-muted border-l-4 border-primary px-md py-sm">
              <p className="font-semibold break-words">{entry.winner}</p>
              <p className="text-label-sm text-ink-secondary">
                {dateFormat.format(new Date(entry.at))} · {chanceText(entry)}
              </p>
            </li>
          ))}
        </ul>
      )}

      {entries.length > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="min-h-[44px] w-full rounded-control text-error font-semibold hover:bg-error/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          {clearLabel}
        </button>
      )}
    </Modal>
  );
};

export default HistoryDialog;
