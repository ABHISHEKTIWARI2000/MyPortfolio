import { useState } from 'react';
import { inputClass, textareaClass, labelClass, primaryButton, secondaryButton, errorTextClass } from './Modal';
import { callKrAdmin } from '../../lib/krAdminApi';

export function SubjectForm({ password, subject, nextPosition, onSaved, onCancel }) {
  const isEdit = Boolean(subject);
  const [form, setForm] = useState({
    name: subject?.name ?? '',
    code: subject?.code ?? '',
    description: subject?.description ?? '',
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const update = field => e => setForm(f => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Please enter a subject name.');
      return;
    }
    setSaving(true);
    setError('');
    const fields = {
      name: form.name.trim(),
      code: form.code.trim(),
      description: form.description.trim(),
      position: isEdit ? subject.position : nextPosition,
    };
    try {
      await callKrAdmin(
        password,
        isEdit ? 'update_subject' : 'create_subject',
        isEdit ? { ...fields, id: subject.id } : fields,
      );
      await onSaved();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
        <label className={labelClass}>
          Subject name
          <input value={form.name} onChange={update('name')} maxLength={200} required className={`mt-1.5 ${inputClass}`} />
        </label>
        <label className={labelClass}>
          Course code <span className="font-normal text-neutral-500">(optional)</span>
          <input value={form.code} onChange={update('code')} maxLength={40} className={`mt-1.5 ${inputClass}`} />
        </label>
        <label className={labelClass}>
          Short description <span className="font-normal text-neutral-500">(optional)</span>
          <textarea value={form.description} onChange={update('description')} maxLength={2000} rows={3} className={`mt-1.5 ${textareaClass}`} />
        </label>
        {error && <p role="alert" className={errorTextClass}>{error}</p>}
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onCancel} className={secondaryButton}>Cancel</button>
          <button type="submit" disabled={saving} className={primaryButton}>
            {saving ? 'Saving...' : 'Save subject'}
          </button>
        </div>
    </form>
  );
}
