import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Award, FileText, GraduationCap, Sparkles } from 'lucide-react';
import { Section, SectionHeader } from './Section';
import { siteConfig } from '../config/site';
import { useReducedMotion } from '../hooks/useReducedMotion';

const iconMap = { award: Award, 'file-text': FileText, 'graduation-cap': GraduationCap, sparkles: Sparkles };
const colorMap = {
  blue: 'from-blue-500 to-blue-600 text-blue-50',
  teal: 'from-teal-500 to-teal-600 text-teal-50',
  green: 'from-green-500 to-green-600 text-green-50',
  amber: 'from-amber-500 to-amber-600 text-amber-50',
};

export function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  return (
    <Section id="achievements">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Achievements"
          title="Milestones that matter"
          description="Quantifiable outcomes — not vague claims."
        />

        <div ref={ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.achievements.map((a, i) => {
            const Icon = iconMap[a.icon] || Award;
            const gradient = colorMap[a.color] || colorMap.blue;
            const rankMatch = a.title.match(/AIR (\d+)/);
            const rank = rankMatch ? parseInt(rankMatch[1]) : null;

            return (
              <motion.div
                key={a.title}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="card card-hover spotlight group relative overflow-hidden"
              >
                <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${gradient} opacity-10 transition-opacity group-hover:opacity-20`} />

                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient}`}>
                  <Icon size={22} />
                </div>

                {rank !== null ? (
                  <div className="mb-1 text-3xl font-bold text-neutral-900 dark:text-white">
                    AIR <Counter value={rank} inView={inView} />
                  </div>
                ) : (
                  <h3 className="mb-1 text-base font-semibold text-neutral-900 dark:text-white">{a.title}</h3>
                )}

                {rank !== null && (
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{a.subtitle}</p>
                )}
                <p className="mt-2 text-xs text-neutral-500">{a.detail}</p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                    {a.year}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Leadership */}
        <div className="mt-12">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">Leadership & Extracurricular</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {siteConfig.leadership.map((l, i) => (
              <motion.div
                key={l.role}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                className="card"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-base font-semibold text-neutral-900 dark:text-white">{l.role}</h4>
                  <span className="chip">{l.period}</span>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{l.organization}</p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{l.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {l.tags.map(t => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Counter({ value, inView }) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced || !inView) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: v => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  return <>{display.toLocaleString()}</>;
}
