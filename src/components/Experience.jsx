import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, BookOpen, Terminal, Cpu, GraduationCap, Award } from 'lucide-react';
import { Section, SectionHeader } from './Section';
import { siteConfig } from '../config/site';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  return (
    <Section id="experience">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Experience"
          title="Teaching Assistant — IIT Guwahati"
          description="Three courses, 80+ students impacted, and a bridge between theory and practice."
        />

        <div ref={ref}>
          {siteConfig.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="card card-hover overflow-hidden"
            >
              {/* Header */}
              <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6 dark:border-neutral-800 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                      <Users size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{exp.role}</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">{exp.organization}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2 sm:items-end">
                  <span className="chip">{exp.period}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                    <Award size={12} />
                    {exp.impact} impacted
                  </span>
                </div>
              </div>

              {/* Courses */}
              <div className="grid gap-4 py-6 md:grid-cols-3">
                {exp.courses.map(course => (
                  <div
                    key={course.code}
                    className="rounded-xl border border-neutral-200 p-4 transition-colors hover:border-blue-300 dark:border-neutral-800 dark:hover:border-blue-800"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span className="rounded-md bg-neutral-900 px-2 py-0.5 text-[10px] font-bold text-white dark:bg-white dark:text-neutral-900">
                        {course.code}
                      </span>
                    </div>
                    <h4 className="mb-1 text-sm font-semibold text-neutral-900 dark:text-white">{course.name}</h4>
                    <p className="text-xs text-neutral-500">{course.description}</p>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="border-t border-neutral-100 pt-6 dark:border-neutral-800">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">Key Contributions</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {exp.highlights.map(h => (
                    <div key={h} className="flex items-start gap-2.5 text-sm text-neutral-700 dark:text-neutral-300">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                        <BookOpen size={11} />
                      </span>
                      {h}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {exp.tags.map(t => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Side cards */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { icon: Terminal, title: 'Lab Sessions', desc: 'Hands-on OS & programming labs conducted with real-time feedback.' },
              { icon: Cpu, title: 'IoT Lectures', desc: 'Delivered standalone lectures for the IoT course (CS578).' },
              { icon: GraduationCap, title: 'Mentoring', desc: 'Doubt sessions and one-on-one guidance for junior students.' },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-5 dark:border-neutral-800 dark:bg-neutral-900/30"
              >
                <card.icon size={20} className="mb-2 text-blue-600 dark:text-blue-400" />
                <h4 className="mb-1 text-sm font-semibold text-neutral-900 dark:text-white">{card.title}</h4>
                <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
