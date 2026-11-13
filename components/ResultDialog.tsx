import React from 'react';
import Modal from './Modal';

interface ResultDialogProps {
  badge: string;
  title: string;
  winner: string;
  /** The chance line, e.g. "Picked from 6 options, each with a 16.7% chance." */
  detail: string;
  body: string;
  spinAgain: string;
  remove?: string;
  copy: string;
  closeLabel: string;
  onSpinAgain: () => void;
  onRemove?: () => void;
  onCopy: () => void;
  onClose: () => void;
}

const ResultDialog: React.FC<ResultDialogProps> = ({
  badge, title, winner, detail, body, spinAgain, remove, copy, closeLabel, onSpinAgain, onRemove, onCopy, onClose,
}) => (
  <Modal title={title} onClose={onClose} closeLabel={closeLabel} width="max-w-md">
    <p className="inline-block rounded-full bg-tint text-ink-tint text-label-sm px-sm py-xs mb-md">{badge}</p>
    <div className="rounded-card border-2 border-primary bg-surface-muted text-center px-md py-lg mb-md">
      <p className="font-display text-display break-words" aria-live="polite">{winner}</p>
    </div>
    <p className="text-body-sm text-ink-secondary text-center mb-sm">{detail}</p>
    <p className="text-body-md text-ink text-center mb-lg">{body}</p>
    <div className="grid gap-sm">
      <button
        type="button"
        onClick={onSpinAgain}
        className="min-h-[44px] rounded-control bg-primary px-md font-semibold text-ink-on-primary hover:bg-primary-hover active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
      >
        {spinAgain}
      </button>
      {remove && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="min-h-[44px] rounded-control border border-line-control px-md font-semibold text-ink hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          {remove}
        </button>
      )}
      <button
        type="button"
        onClick={onCopy}
        className="min-h-[44px] rounded-control border border-line-control px-md font-semibold text-ink hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
      >
        {copy}
      </button>
    </div>
  </Modal>
);

export default ResultDialog;
