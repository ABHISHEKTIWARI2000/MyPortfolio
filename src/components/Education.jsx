import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap } from 'lucide-react';
import { Section, SectionHeader } from './Section';
import { siteConfig } from '../config/site';
import { useReducedMotion } from '../hooks/useReducedMotion';

const typeColor = {
  postgrad: 'bg-blue-500',
  undergrad: 'bg-teal-500',
  school: 'bg-neutral-400',
};

export function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  return (
    <Section id="education">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Education"
          title="Academic journey"
          description="From Electrical & Electronics to Computer Science — a deliberate transition driven by GATE 2024."
        />

        <div ref={ref} className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-2 bottom-2 w-px bg-neutral-200 dark:bg-neutral-800 md:left-1/2" />

          <div className="space-y-8">
            {siteConfig.education.map((edu, i) => (
              <motion.div
                key={edu.degree}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Dot */}
                <div className="absolute left-4 top-6 z-10 -translate-x-1/2 md:left-1/2">
                  <div className={`h-3 w-3 rounded-full ring-4 ring-white dark:ring-neutral-950 ${typeColor[edu.type]}`} />
                </div>

                {/* Spacer for desktop */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                  <div className="card card-hover spotlight group transition-shadow hover:shadow-md">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {edu.period}
                      </span>
                      <span className="text-lg">{edu.logo}</span>
                    </div>
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-white">{edu.degree}</h3>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{edu.institution}</p>
                    {edu.location && (
                      <p className="mt-0.5 text-xs text-neutral-500">{edu.location}</p>
                    )}
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex items-center gap-1.5 rounded-lg bg-neutral-100 px-3 py-1.5 dark:bg-neutral-800">
                        <GraduationCap size={14} className="text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-semibold text-neutral-900 dark:text-white">{edu.cgpa}</span>
                      </div>
                      {edu.highlights.length > 0 && (
                        <span className="text-xs text-neutral-500">{edu.highlights.length} highlights</span>
                      )}
                    </div>
                    {edu.highlights.length > 0 && (
                      <ul className="mt-4 space-y-1.5">
                        {edu.highlights.map(h => (
                          <li key={h} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
