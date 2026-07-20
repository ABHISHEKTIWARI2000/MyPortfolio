import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Code2, TrendingUp, ExternalLink, BarChart3 } from 'lucide-react';
import { Section, SectionHeader } from './Section';
import { siteConfig } from '../config/site';
import { useReducedMotion } from '../hooks/useReducedMotion';

const difficultyColors = {
  easy: { bar: 'bg-green-500', text: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-950/30' },
  medium: { bar: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/30' },
  hard: { bar: 'bg-red-500', text: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/30' },
};

export function ProblemSolving() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();
  const ps = siteConfig.problemSolving;

  return (
    <Section id="problem-solving">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Problem Solving"
          title="DSA practice, visualized"
          description="A structured progression across 22 topic areas — from arrays to segment trees."
        />

        <div ref={ref} className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          {/* Stats card */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="card"
          >
            <div className="mb-5 flex items-center gap-2">
              <BarChart3 size={18} className="text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Overview</h3>
            </div>

            <div className="mb-6 flex items-end gap-2">
              <Counter value={ps.totalSolved} inView={inView} />
              <span className="mb-1 text-sm text-neutral-500">problems solved</span>
            </div>

            <div className="mb-6 flex items-center gap-2 rounded-xl bg-neutral-100 px-3 py-2 dark:bg-neutral-800">
              <Code2 size={16} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">Primary language:</span>
              <span className="text-sm font-semibold text-neutral-900 dark:text-white">{ps.primaryLanguage}</span>
            </div>

            {/* Breakdown */}
            <div className="space-y-4">
              {['easy', 'medium', 'hard'].map(diff => {
                const count = ps.breakdown[diff];
                const pct = (count / ps.totalSolved) * 100;
                const c = difficultyColors[diff];
                return (
                  <div key={diff}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className={`font-medium capitalize ${c.text}`}>{diff}</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">
                        <Counter value={count} inView={inView} />
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                      <motion.div
                        initial={reduced ? false : { width: 0 }}
                        animate={inView ? { width: `${pct}%` } : {}}
                        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                        className={`h-full rounded-full ${c.bar}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Platform links */}
            <div className="mt-6 border-t border-neutral-100 pt-5 dark:border-neutral-800">
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Profiles</h4>
              <div className="flex flex-wrap gap-2">
                {ps.platforms.leetcode && (
                  <a href={ps.platforms.leetcode} target="_blank" rel="noreferrer" className="btn-secondary text-xs">
                    <ExternalLink size={12} />
                    LeetCode
                  </a>
                )}
                {ps.platforms.geeksforgeeks && (
                  <a href={ps.platforms.geeksforgeeks} target="_blank" rel="noreferrer" className="btn-secondary text-xs">
                    <ExternalLink size={12} />
                    GeeksforGeeks
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Topics roadmap */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card"
          >
            <div className="mb-5 flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Topic Roadmap</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {ps.topics.map((topic, i) => (
                <motion.span
                  key={topic}
                  initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.03 }}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-default rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
                >
                  {topic}
                </motion.span>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-neutral-100 pt-5 dark:border-neutral-800">
              {['easy', 'medium', 'hard'].map(diff => {
                const c = difficultyColors[diff];
                return (
                  <div key={diff} className={`rounded-xl p-3 text-center ${c.bg}`}>
                    <div className={`text-lg font-bold ${c.text}`}>
                      <Counter value={ps.breakdown[diff]} inView={inView} />
                    </div>
                    <div className="text-[11px] font-medium capitalize text-neutral-500">{diff}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
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
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: v => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  return <>{display}</>;
}
