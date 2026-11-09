import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useTeachingData() {
  const [subjects, setSubjects] = useState([]);
  const [status, setStatus] = useState('loading');

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from('university_subjects')
      .select('id, name, code, description, position, created_at, subject_contents(id, title, body, position)')
      .order('position', { ascending: true })
      .order('created_at', { ascending: true });

    if (error || !Array.isArray(data)) {
      setStatus('error');
      return;
    }

    setSubjects(
      data.map(subject => ({
        ...subject,
        subject_contents: [...(subject.subject_contents ?? [])].sort((a, b) => a.position - b.position),
      })),
    );
    setStatus('ready');
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { subjects, status, reload: load };
}
