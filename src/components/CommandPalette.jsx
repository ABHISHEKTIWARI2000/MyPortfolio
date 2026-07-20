import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { Search, ArrowRight, CornerDownLeft } from 'lucide-react';
import { siteConfig } from '../config/site';

const sections = [
  { label: 'Home', href: '#home', group: 'Navigation' },
  { label: 'About', href: '#about', group: 'Navigation' },
  { label: 'Education', href: '#education', group: 'Navigation' },
  { label: 'Experience', href: '#experience', group: 'Navigation' },
  { label: 'Research', href: '#research', group: 'Navigation' },
  { label: 'Projects', href: '#projects', group: 'Navigation' },
  { label: 'Publication', href: '#publication', group: 'Navigation' },
  { label: 'Skills', href: '#skills', group: 'Navigation' },
  { label: 'Problem Solving', href: '#problem-solving', group: 'Navigation' },
  { label: 'Currently Learning', href: '#learning', group: 'Navigation' },
  { label: 'Achievements', href: '#achievements', group: 'Navigation' },
  { label: 'Coursework', href: '#coursework', group: 'Navigation' },
  { label: 'Contact', href: '#contact', group: 'Navigation' },
];

const actions = [
  { label: 'Download Resume', href: siteConfig.resume, group: 'Actions', external: false },
  { label: 'Send Email', href: `mailto:${siteConfig.email}`, group: 'Actions', external: false },
  { label: 'Open LinkedIn', href: siteConfig.linkedin, group: 'Actions', external: true },
  { label: 'Open GitHub', href: siteConfig.github, group: 'Actions', external: true },
  { label: 'Open WhatsApp', href: `https://wa.me/${siteConfig.whatsapp}`, group: 'Actions', external: true },
  { label: 'Call Phone', href: `tel:${siteConfig.phone}`, group: 'Actions', external: false },
  { label: 'LeetCode Profile', href: siteConfig.problemSolving.platforms.leetcode, group: 'Actions', external: true },
  { label: 'GeeksforGeeks Profile', href: siteConfig.problemSolving.platforms.geeksforgeeks, group: 'Actions', external: true },
];

export function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const all = useMemo(() => [...sections, ...actions], []);

  const filtered = useMemo(() => {
    if (!query) return all;
    return all.filter(item => item.label.toLowerCase().includes(query.toLowerCase()));
  }, [query, all]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive(a => Math.min(a + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive(a => Math.max(a - 1, 0));
      }
      if (e.key === 'Enter' && filtered[active]) {
        trigger(filtered[active]);
      }
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, active, onClose]);

  const trigger = item => {
    if (item.external) {
      window.open(item.href, '_blank');
    } else if (item.href.startsWith('#')) {
      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
    } else if (item.href.startsWith('http')) {
      window.open(item.href, '_blank');
    } else {
      window.location.href = item.href;
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-[15vh]"
        >
          <div className="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="flex items-center gap-3 border-b border-neutral-100 px-4 py-3 dark:border-neutral-800">
              <Search size={18} className="text-neutral-400" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search sections and actions..."
                className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-white"
              />
              <kbd className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500 dark:bg-neutral-800">ESC</kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-neutral-400">No results found</div>
              )}
              {filtered.map((item, i) => (
                <button
                  key={`${item.label}-${i}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => trigger(item)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    active === i
                      ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white'
                      : 'text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400">{item.group}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.label}</span>
                    {active === i && <ArrowRight size={14} className="text-blue-500" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-neutral-100 px-4 py-2.5 text-[11px] text-neutral-400 dark:border-neutral-800">
              <span className="flex items-center gap-1.5">
                <CornerDownLeft size={11} /> to select
              </span>
              <span>↑↓ to navigate</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
