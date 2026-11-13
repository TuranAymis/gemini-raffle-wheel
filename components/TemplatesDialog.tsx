import React, { useEffect, useState } from 'react';
import { CATEGORIES, TEMPLATES, type Template } from '../templates/data';
import type { Locale } from '../i18n';
import type { MessageKey } from '../i18n/messages';

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

/** The ready-made lists, grouped by category. Featured lists come first in each group. */
const TemplatesDialog: React.FC<TemplatesDialogProps> = ({ locale, t, hasOptions, onApply, onClose }) => {
  const [chosen, setChosen] = useState<Template | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const pick = (template: Template) => {
    if (hasOptions) setChosen(template);
    else onApply(template, 'replace');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="templates-title"
        className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl"
      >
        <div className="flex justify-between items-start gap-4 mb-4">
          <div>
            <h2 id="templates-title" className="text-2xl font-bold">{t('templates.title')}</h2>
            {!chosen && <p className="text-slate-400 text-sm mt-1">{t('templates.intro')}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label={t('common.closeButton')}
            className="shrink-0 w-11 h-11 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
          >
            ✕
          </button>
        </div>

        {chosen ? (
          <div className="space-y-4">
            <p className="font-semibold text-lg">{chosen.title[locale]}</p>
            <p className="text-slate-300 text-sm">{t('templates.howAdd')}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => onApply(chosen, 'add')}
                className="min-h-[44px] bg-yellow-500 text-slate-900 font-bold rounded-xl px-4 py-3 hover:bg-yellow-400"
              >
                {t('templates.addToList')}
              </button>
              <button
                onClick={() => onApply(chosen, 'replace')}
                className="min-h-[44px] bg-slate-800 text-slate-100 font-bold rounded-xl px-4 py-3 hover:bg-slate-700"
              >
                {t('templates.replace')}
              </button>
            </div>
            <button onClick={() => setChosen(null)} className="min-h-[44px] text-slate-400 hover:text-white px-2">
              {t('common.cancel')}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {CATEGORIES.map((category) => {
              const templates = TEMPLATES.filter((tpl) => tpl.category === category.id).sort(
                (a, b) => Number(b.featured) - Number(a.featured)
              );
              if (templates.length === 0) return null;
              return (
                <section key={category.id} aria-labelledby={`category-${category.id}`}>
                  <h3 id={`category-${category.id}`} className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    {category.label[locale]}
                  </h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {templates.map((tpl) => (
                      <button
                        key={tpl.id}
                        onClick={() => pick(tpl)}
                        className="min-h-[44px] text-left bg-slate-800/60 hover:bg-slate-800 border border-white/5 hover:border-yellow-500/40 rounded-xl p-4 transition-colors"
                      >
                        <span className="block font-semibold text-slate-100">{tpl.title[locale]}</span>
                        <span className="block text-sm text-slate-400 mt-1">{tpl.description[locale]}</span>
                        <span className="block text-xs text-slate-500 mt-2">
                          {t('list.count', { n: tpl.options.length })}
                        </span>
                      </button>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatesDialog;
