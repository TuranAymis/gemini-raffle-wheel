import React, { useEffect, useId } from 'react';

interface ModalProps {
  title: string;
  onClose: () => void;
  closeLabel: string;
  /** Tailwind width class for the panel. */
  width?: string;
  children: React.ReactNode;
}

/** A dialog with an overlay: Esc and the close button close it, and the title is read by screen readers. */
const Modal: React.FC<ModalProps> = ({ title, onClose, closeLabel, width = 'max-w-lg', children }) => {
  const titleId = useId();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-overlay/40 backdrop-blur-sm p-0 md:p-md">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`bg-surface text-ink w-full ${width} max-h-[90vh] overflow-y-auto rounded-t-card md:rounded-modal shadow-3 p-lg`}
      >
        <div className="flex justify-between items-start gap-md mb-md">
          <h2 id={titleId} className="font-display text-headline-md">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="shrink-0 min-w-[44px] min-h-[44px] rounded-control bg-surface-muted text-ink-secondary hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
