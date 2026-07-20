import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileText, Users, Clock, BookOpen } from 'lucide-react';
import { Section, SectionHeader } from './Section';
import { siteConfig } from '../config/site';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function Publication() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();
  const pub = siteConfig.publication;

  return (
    <Section id="publication">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Publication"
          title="Research output"
          description="A formal contribution to IoT security literature."
        />

        <div ref={ref}>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="card relative overflow-hidden"
          >
            {/* Decorative left bar */}
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-teal-500" />

            <div className="grid gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <FileText size={18} className="text-blue-600 dark:text-blue-400" />
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                    <Clock size={11} />
                    {pub.status}
                  </span>
                  <span className="text-xs text-neutral-500">{pub.year}</span>
                </div>

                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white md:text-xl">{pub.title}</h3>

                <div className="mt-3 flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <Users size={14} />
                  {pub.authors.join(', ')}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{pub.abstract}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {pub.tags.map(t => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-row items-center gap-4 md:flex-col md:items-end md:justify-center">
                <div className="flex flex-col items-center rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
                  <BookOpen size={20} className="mb-2 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs text-neutral-500">Type</span>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">Research Paper</span>
                </div>
                {pub.venue && (
                  <div className="flex flex-col items-center rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
                    <span className="text-xs text-neutral-500">Venue</span>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">{pub.venue}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
