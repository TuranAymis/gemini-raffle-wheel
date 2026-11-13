import React from 'react';
import { CATEGORIES, TEMPLATES, type Template } from '../templates/data';
import type { Locale } from '../i18n';
import type { MessageKey } from '../i18n/messages';
import Modal from './Modal';

type Translate = (key: MessageKey, vars?: Record<string, string | number>) => string;

export type ApplyMode = 'add' | 'replace';

interface TemplatesDialogProps {
  locale: Locale;
  t: Translate;
  /** Whether the list already has options: decides if the user is asked how to add the template. */
  hasOptions: boolean;
  onApply: (template: Template, mode: ApplyMode) => void;
  onClose: () => void;
}

const [chooseClass, secondaryClass] = [
  'min-h-[44px] rounded-control bg-primary px-md font-semibold text-ink-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
  'min-h-[44px] rounded-control border border-line-control px-md font-semibold text-ink hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
];

/** The ready-made lists, grouped by category. Featured lists come first in each group. */
const TemplatesDialog: React.FC<TemplatesDialogProps> = ({ locale, t, hasOptions, onApply, onClose }) => {
  const [chosen, setChosen] = React.useState<Template | null>(null);

  const pick = (template: Template) => {
    if (hasOptions) setChosen(template);
    else onApply(template, 'replace');
  };

  return (
    <Modal title={t('templates.title')} onClose={onClose} closeLabel={t('common.closeButton')} width="max-w-2xl">
      {chosen ? (
        <div className="space-y-md">
          <p className="font-semibold text-headline-sm">{chosen.title[locale]}</p>
          <p className="text-body-md text-ink-secondary">{t('templates.howAdd')}</p>
          <div className="grid gap-sm sm:grid-cols-2">
            <button type="button" onClick={() => onApply(chosen, 'add')} className={chooseClass}>
              {t('templates.addToList')}
            </button>
            <button type="button" onClick={() => onApply(chosen, 'replace')} className={secondaryClass}>
              {t('templates.replace')}
            </button>
          </div>
          <button type="button" onClick={() => setChosen(null)} className="min-h-[44px] px-sm text-ink-secondary hover:text-ink">
            {t('common.cancel')}
          </button>
        </div>
      ) : (
        <div className="space-y-lg">
          <p className="text-body-md text-ink-secondary">{t('templates.intro')}</p>
          {CATEGORIES.map((category) => {
            const templates = TEMPLATES.filter((tpl) => tpl.category === category.id).sort(
              (a, b) => Number(b.featured) - Number(a.featured)
            );
            if (templates.length === 0) return null;
            return (
              <section key={category.id} aria-labelledby={`category-${category.id}`}>
                <h3 id={`category-${category.id}`} className="mb-xs text-label-sm uppercase tracking-wider text-ink-secondary">
                  {category.label[locale]}
                </h3>
                <div className="grid gap-sm sm:grid-cols-2">
                  {templates.map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => pick(tpl)}
                      className="min-h-[44px] rounded-card border border-line-subtle bg-surface-muted p-md text-left hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                    >
                      <span className="block font-semibold text-ink">{tpl.title[locale]}</span>
                      <span className="mt-xs block text-body-sm text-ink-secondary">{tpl.description[locale]}</span>
                      <span className="mt-sm block text-label-sm text-ink-secondary">{t('list.count', { n: tpl.options.length })}</span>
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </Modal>
  );
};

export default TemplatesDialog;
