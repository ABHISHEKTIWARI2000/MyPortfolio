import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Code2, Cpu, Network, CircuitBoard, FlaskConical, Brain, Wrench, Layers,
  ChevronDown, Globe,
} from 'lucide-react';
import { Section, SectionHeader } from './Section';
import { siteConfig } from '../config/site';
import { useReducedMotion } from '../hooks/useReducedMotion';

const categories = [
  { key: 'programmingLanguages', label: 'Programming Languages', icon: Code2 },
  { key: 'systemsTools', label: 'Systems & Tools', icon: Wrench },
  { key: 'iot', label: 'IoT', icon: CircuitBoard },
  { key: 'coreCS', label: 'Core CS', icon: Cpu },
  { key: 'languages', label: 'Languages', icon: Globe },
];

export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();
  const [open, setOpen] = useState('programmingLanguages');
  const skills = siteConfig.skills;

  return (
    <Section id="skills" className="bg-neutral-50/50 dark:bg-neutral-950/50">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Technical Skills"
          title="Interactive engineering dashboard"
          description="Click any category to explore the stack. Levels reflect hands-on project usage, not self-inflation."
        />

        <div ref={ref} className="grid gap-4 lg:grid-cols-2">
          {categories.map((cat, idx) => {
            const isOpen = open === cat.key;
            const items = skills[cat.key] || [];
            const isList = cat.key === 'coreCS';

            return (
              <motion.div
                key={cat.key}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900/50"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : cat.key)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                      <cat.icon size={18} />
                    </div>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">{cat.label}</span>
                    <span className="text-xs text-neutral-500">({items.length})</span>
                  </div>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={18} className="text-neutral-400" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-neutral-100 p-5 dark:border-neutral-800">
                        {isList ? (
                          <div className="flex flex-wrap gap-2">
                            {items.map(item => (
                              <span key={item} className="chip">{item}</span>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {items.map(item => (
                              <div key={item.name}>
                                <div className="mb-1.5 flex items-center justify-between">
                                  <span className="text-sm font-medium text-neutral-900 dark:text-white">
                                    {item.name}
                                    {item.primary && (
                                      <span className="ml-2 rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                                        PRIMARY
                                      </span>
                                    )}
                                  </span>
                                  {typeof item.level === 'number' ? (
                                    <span className="text-xs font-medium text-neutral-500">{item.level}%</span>
                                  ) : (
                                    <span className="text-xs font-medium text-neutral-500">{item.level}</span>
                                  )}
                                </div>
                                {typeof item.level === 'number' && (
                                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                                    <motion.div
                                      initial={reduced ? false : { width: 0 }}
                                      animate={inView ? { width: `${item.level}%` } : {}}
                                      transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-500"
                                    />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
