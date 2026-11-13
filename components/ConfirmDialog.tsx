import React from 'react';
import Modal from './Modal';

interface ConfirmDialogProps {
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel: string;
  closeLabel: string;
  /** Marks the confirm action as destructive. */
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/** A yes/no question. "Cancel" has the focus, so Enter does not delete anything by accident. */
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ title, body, confirmLabel, cancelLabel, closeLabel, danger, onConfirm, onCancel }) => (
  <Modal title={title} onClose={onCancel} closeLabel={closeLabel}>
    <p className="text-ink-secondary mb-lg">{body}</p>
    <div className="grid gap-sm sm:grid-cols-2">
      <button
        type="button"
        autoFocus
        onClick={onCancel}
        className="min-h-[44px] rounded-control border border-line-control px-md font-semibold text-ink hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
      >
        {cancelLabel}
      </button>
      <button
        type="button"
        onClick={onConfirm}
        className={`min-h-[44px] rounded-control px-md font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
          danger ? 'bg-surface-muted text-error hover:bg-error/10' : 'bg-primary text-ink-on-primary hover:bg-primary-hover'
        }`}
      >
        {confirmLabel}
      </button>
    </div>
  </Modal>
);

export default ConfirmDialog;
