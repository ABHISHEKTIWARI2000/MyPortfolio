import { useEffect } from 'react';
import { X } from 'lucide-react';

export const inputClass =
  'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white';
export const textareaClass = `${inputClass} resize-y`;
export const labelClass = 'block text-sm font-medium text-neutral-700 dark:text-neutral-300';
export const primaryButton =
  'inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200';
export const secondaryButton =
  'inline-flex items-center justify-center gap-1.5 rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900';
export const iconButtonClass =
  'rounded-full p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 disabled:opacity-50 dark:hover:bg-neutral-900 dark:hover:text-white';
export const errorTextClass = 'text-sm text-red-600 dark:text-red-400';

export function Modal({ title, onClose, children, wide = false }) {
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative max-h-[88vh] w-full ${wide ? 'max-w-3xl' : 'max-w-md'} overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-950`}
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{title}</h3>
          <button onClick={onClose} aria-label="Close" className={iconButtonClass}>
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
