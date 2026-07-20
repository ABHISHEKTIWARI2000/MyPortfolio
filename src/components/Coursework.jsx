import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen } from 'lucide-react';
import { Section, SectionHeader } from './Section';
import { siteConfig } from '../config/site';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function Coursework() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  return (
    <Section id="coursework">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Coursework"
          title="Academic foundations"
          description="Graduate-level coursework that built the systems and research mindset."
        />

        <div ref={ref} className="flex flex-wrap gap-3">
          {siteConfig.courses.map((course, i) => (
            <motion.span
              key={course}
              initial={reduced ? false : { opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ scale: 1.04, y: -2 }}
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50/50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/20"
            >
              <BookOpen size={14} className="text-blue-600 dark:text-blue-400" />
              {course}
            </motion.span>
          ))}
        </div>
      </div>
    </Section>
  );
}
