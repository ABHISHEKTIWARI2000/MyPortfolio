import { useState } from 'react';
import { Modal, inputClass, labelClass, primaryButton, errorTextClass } from './Modal';
import { callKrAdmin } from '../../lib/krAdminApi';

export function AdminPasswordModal({ onVerified, onClose }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!password) return;
    setChecking(true);
    setError('');
    try {
      await callKrAdmin(password, 'verify');
      onVerified(password);
    } catch (err) {
      setError(err.message);
      setChecking(false);
    }
  }

  return (
    <Modal title="Admin access" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className={labelClass}>
          Admin password
          <input
            type="password"
            autoFocus
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={`mt-1.5 ${inputClass}`}
          />
        </label>
        {error && <p role="alert" className={errorTextClass}>{error}</p>}
        <button type="submit" disabled={checking || !password} className={`w-full ${primaryButton}`}>
          {checking ? 'Verifying...' : 'Verify password'}
        </button>
      </form>
    </Modal>
  );
}
