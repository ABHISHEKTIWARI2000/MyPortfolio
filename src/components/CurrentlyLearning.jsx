import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Brain, Bot, Code, TrendingUp, Layers, MessageSquare, Terminal, Wrench, Sparkles, ArrowRight,
} from 'lucide-react';
import { Section, SectionHeader } from './Section';
import { siteConfig } from '../config/site';
import { useReducedMotion } from '../hooks/useReducedMotion';

const iconMap = {
  brain: Brain,
  bot: Bot,
  code: Code,
  'trending-up': TrendingUp,
  layers: Layers,
  'message-square': MessageSquare,
  terminal: Terminal,
  wrench: Wrench,
};

export function CurrentlyLearning() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  return (
    <Section id="learning" className="relative overflow-hidden">
      {/* AI-themed ambient glow */}
      <div className="aurora absolute -top-10 right-1/4 h-[300px] w-[300px] rounded-full bg-blue-300/15 blur-[100px] dark:bg-blue-800/10" aria-hidden />

      <div className="container-wide relative">
        <SectionHeader
          eyebrow="Currently Learning"
          title="Expanding into modern AI"
          description="Actively strengthening expertise in AI technologies while maintaining strong foundations in Computer Science and Systems."
        />

        {/* AI-ready banner */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col gap-3 rounded-2xl border border-blue-200/60 bg-gradient-to-r from-blue-50/80 to-teal-50/60 p-5 dark:border-blue-900/40 dark:from-blue-950/30 dark:to-teal-950/20 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
              <Sparkles size={22} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200">Ready for AI work</h3>
              <p className="text-xs text-blue-700/80 dark:text-blue-300/80">Give an AI task — it gets done. A fast learner who ships.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Generative AI', 'Agentic AI', 'LLMs', 'ML Tooling'].map(t => (
              <span key={t} className="chip-accent">{t}</span>
            ))}
          </div>
        </motion.div>

        <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.currentlyLearning.map((item, i) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <motion.div
                key={item.topic}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="card card-hover group relative overflow-hidden"
              >
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-blue-100/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-blue-900/20" />
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-teal-50 text-blue-600 transition-transform group-hover:scale-110 group-hover:rotate-3 dark:from-blue-950/40 dark:to-teal-950/40 dark:text-blue-400">
                  <Icon size={20} />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-neutral-900 dark:text-white">{item.topic}</h3>
                <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">{item.description}</p>

                {/* Progress indicator */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
                    <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">In Progress</span>
                  </div>
                  <ArrowRight size={13} className="text-neutral-300 transition-all group-hover:translate-x-1 group-hover:text-blue-500 dark:text-neutral-700" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 max-w-2xl text-sm text-neutral-500"
        >
          Not an AI expert — a systems engineer deliberately building AI fluency on top of a rigorous CS foundation. The combination is where the value lives.
        </motion.p>
      </div>
    </Section>
  );
}
