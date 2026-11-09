import { useState } from 'react';
import { Pencil, Plus, Trash2, ChevronRight } from 'lucide-react';
import { Modal, primaryButton, secondaryButton, iconButtonClass, errorTextClass } from './Modal';
import { SubjectForm } from './SubjectForm';
import { SubjectContentsAdmin } from './SubjectContentsAdmin';
import { callKrAdmin } from '../../lib/krAdminApi';

export function TeachingAdmin({ password, subjects, onChanged, onClose }) {
  const [selectedId, setSelectedId] = useState(null);
  const [editor, setEditor] = useState(null);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);

  const selected = subjects.find(s => s.id === selectedId) ?? null;

  async function handleDelete(subject) {
    if (!window.confirm(`Delete "${subject.name}" and all of its content? This cannot be undone.`)) return;
    setBusyId(subject.id);
    setError('');
    try {
      await callKrAdmin(password, 'delete_subject', { id: subject.id });
      await onChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  let title = 'Manage teaching';
  let body;

  if (editor) {
    title = editor.subject ? 'Edit subject' : 'Add subject';
    body = (
      <SubjectForm
        password={password}
        subject={editor.subject}
        nextPosition={subjects.length}
        onSaved={async () => {
          setEditor(null);
          await onChanged();
        }}
        onCancel={() => setEditor(null)}
      />
    );
  } else if (selected) {
    title = selected.name;
    body = (
      <SubjectContentsAdmin
        password={password}
        subject={selected}
        onChanged={onChanged}
        onBack={() => setSelectedId(null)}
      />
    );
  } else {
    body = (
      <div className="space-y-5">
        <div className="flex justify-end">
          <button onClick={() => setEditor({ subject: null })} className={primaryButton}>
            <Plus size={16} /> Add subject
          </button>
        </div>

        {error && <p role="alert" className={errorTextClass}>{error}</p>}

        {subjects.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No subjects yet. Add your first subject to get started.
          </p>
        ) : (
          <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {subjects.map(subject => (
              <li key={subject.id} className="flex items-center justify-between gap-4 py-4">
                <div className="min-w-0">
                  <p className="truncate font-medium text-neutral-900 dark:text-white">{subject.name}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {subject.code || 'No code'} · {subject.subject_contents.length} content item(s)
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button aria-label={`Edit ${subject.name}`} onClick={() => setEditor({ subject })} className={iconButtonClass}>
                    <Pencil size={16} />
                  </button>
                  <button
                    aria-label={`Delete ${subject.name}`}
                    onClick={() => handleDelete(subject)}
                    disabled={busyId === subject.id}
                    className={iconButtonClass}
                  >
                    <Trash2 size={16} />
                  </button>
                  <button onClick={() => setSelectedId(subject.id)} className={secondaryButton}>
                    Content <ChevronRight size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <Modal title={title} onClose={onClose} wide>
      {body}
    </Modal>
  );
}
