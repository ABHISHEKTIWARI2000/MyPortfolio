import { useState } from 'react';
import { ChevronDown, Settings } from 'lucide-react';
import { Section, SectionHeader } from './Section';
import { useTeachingData } from '../hooks/useTeachingData';
import { AdminPasswordModal } from './kr/AdminPasswordModal';
import { TeachingAdmin } from './kr/TeachingAdmin';

export function KRMangalam() {
  const { subjects, status, reload } = useTeachingData();
  const [expandedId, setExpandedId] = useState(null);
  const [adminStage, setAdminStage] = useState('closed');
  const [adminPassword, setAdminPassword] = useState('');

  const closeAdmin = () => {
    setAdminStage('closed');
    setAdminPassword('');
  };

  return (
    <>
      <Section id="kr-mangalam">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Teaching"
            title="K.R. Mangalam University"
            description="The subjects I teach at K.R. Mangalam University, with the material covered in each."
          />

          <div className="mb-8 flex justify-end">
            <button
              onClick={() => setAdminStage('password')}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900"
            >
              <Settings size={14} /> Manage teaching
            </button>
          </div>

          {status === 'loading' && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Loading subjects...</p>
          )}

          {status === 'error' && (
            <div role="alert" className="card flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-red-600 dark:text-red-400">Could not load teaching content right now.</p>
              <button
                onClick={reload}
                className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
              >
                Try again
              </button>
            </div>
          )}

          {status === 'ready' && subjects.length === 0 && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">No subjects have been added yet.</p>
          )}

          {status === 'ready' && subjects.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {subjects.map(subject => {
                const isOpen = expandedId === subject.id;
                return (
                  <article key={subject.id} className="card">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setExpandedId(isOpen ? null : subject.id)}
                      className="flex w-full items-start justify-between gap-4 text-left"
                    >
                      <div className="min-w-0">
                        {subject.code && (
                          <span className="text-xs font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
                            {subject.code}
                          </span>
                        )}
                        <h3 className="mt-1 text-base font-semibold text-neutral-900 dark:text-white">{subject.name}</h3>
                        {subject.description && (
                          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{subject.description}</p>
                        )}
                        <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
                          {subject.subject_contents.length} content item(s)
                        </p>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`mt-1 shrink-0 text-neutral-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {isOpen && (
                      <div className="mt-6 space-y-5 border-t border-neutral-200 pt-6 dark:border-neutral-800">
                        {subject.subject_contents.length === 0 ? (
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">No content added yet.</p>
                        ) : (
                          subject.subject_contents.map(item => (
                            <div key={item.id}>
                              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">{item.title}</h4>
                              <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                                {item.body}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </Section>

      {adminStage === 'password' && (
        <AdminPasswordModal
          onVerified={password => {
            setAdminPassword(password);
            setAdminStage('manage');
          }}
          onClose={closeAdmin}
        />
      )}
      {adminStage === 'manage' && (
        <TeachingAdmin
          password={adminPassword}
          subjects={subjects}
          onChanged={reload}
          onClose={closeAdmin}
        />
      )}
    </>
  );
}
