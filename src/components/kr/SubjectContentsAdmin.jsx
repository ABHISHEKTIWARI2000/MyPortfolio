import { useState } from 'react';
import { Pencil, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { ContentForm } from './ContentForm';
import { primaryButton, secondaryButton, iconButtonClass, errorTextClass } from './Modal';
import { callKrAdmin } from '../../lib/krAdminApi';

export function SubjectContentsAdmin({ password, subject, onChanged, onBack }) {
  const [editor, setEditor] = useState(null);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);
  const contents = subject.subject_contents;

  async function handleDelete(item) {
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    setBusyId(item.id);
    setError('');
    try {
      await callKrAdmin(password, 'delete_content', { id: item.id });
      await onChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  if (editor) {
    return (
      <ContentForm
        password={password}
        subjectId={subject.id}
        content={editor.content}
        nextPosition={contents.length}
        onSaved={async () => {
          setEditor(null);
          await onChanged();
        }}
        onCancel={() => setEditor(null)}
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <button onClick={onBack} className={secondaryButton}>
          <ArrowLeft size={14} /> Back to subjects
        </button>
        <button onClick={() => setEditor({ content: null })} className={primaryButton}>
          <Plus size={16} /> Add content
        </button>
      </div>

      {error && <p role="alert" className={errorTextClass}>{error}</p>}

      {contents.length === 0 ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          No content yet. Add topics, notes, or readings for this subject.
        </p>
      ) : (
        <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {contents.map(item => (
            <li key={item.id} className="flex items-start justify-between gap-4 py-4">
              <div className="min-w-0">
                <p className="font-medium text-neutral-900 dark:text-white">{item.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">{item.body}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button aria-label={`Edit ${item.title}`} onClick={() => setEditor({ content: item })} className={iconButtonClass}>
                  <Pencil size={16} />
                </button>
                <button
                  aria-label={`Delete ${item.title}`}
                  onClick={() => handleDelete(item)}
                  disabled={busyId === item.id}
                  className={iconButtonClass}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
