import { useState } from 'react';
import { inputClass, textareaClass, labelClass, primaryButton, secondaryButton, errorTextClass } from './Modal';
import { callKrAdmin } from '../../lib/krAdminApi';

export function ContentForm({ password, subjectId, content, nextPosition, onSaved, onCancel }) {
  const isEdit = Boolean(content);
  const [form, setForm] = useState({
    title: content?.title ?? '',
    body: content?.body ?? '',
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const update = field => e => setForm(f => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) {
      setError('Please enter a title and the teaching content.');
      return;
    }
    setSaving(true);
    setError('');
    const fields = {
      title: form.title.trim(),
      body: form.body.trim(),
      position: isEdit ? content.position : nextPosition,
    };
    try {
      await callKrAdmin(
        password,
        isEdit ? 'update_content' : 'create_content',
        isEdit ? { ...fields, id: content.id } : { ...fields, subject_id: subjectId },
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
        Title
        <input value={form.title} onChange={update('title')} maxLength={200} required className={`mt-1.5 ${inputClass}`} />
      </label>
      <label className={labelClass}>
        Teaching content
        <textarea
          value={form.body}
          onChange={update('body')}
          maxLength={20000}
          rows={10}
          required
          className={`mt-1.5 ${textareaClass}`}
        />
      </label>
      {error && <p role="alert" className={errorTextClass}>{error}</p>}
      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className={secondaryButton}>Cancel</button>
        <button type="submit" disabled={saving} className={primaryButton}>
          {saving ? 'Saving...' : 'Save content'}
        </button>
      </div>
    </form>
  );
}
