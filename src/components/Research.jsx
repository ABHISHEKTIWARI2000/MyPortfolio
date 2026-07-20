import { motion, useInView, useReducedMotion, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
  Cpu, Network, Shield, Check, Server, Zap,
  FlaskConical, Target, Lightbulb, TrendingUp,
} from 'lucide-react';
import { Section, SectionHeader } from './Section';
import { siteConfig } from '../config/site';

const metricIcons = { cpu: Cpu, network: Network, shield: Shield, check: Check, server: Server, zap: Zap };

export function Research() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();
  const r = siteConfig.research;

  return (
    <Section id="research" className="bg-neutral-50/50 dark:bg-neutral-950/50">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Research"
          title="M.Tech Thesis — LiDRA"
          description="The first recovery-enabled authentication framework for multihop IoT networks."
        />

        <div ref={ref}>
          {/* Title card */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="card card-hover mb-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                  <FlaskConical size={12} />
                  {r.type} · {r.period}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white md:text-2xl">{r.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  Supervisor: <span className="font-medium text-neutral-900 dark:text-white">{r.supervisor}</span> · {r.supervisorTitle}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Problem & Contribution */}
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={reduced ? false : { opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card"
            >
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                  <Target size={16} />
                </div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Problem</h4>
              </div>
              <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{r.problem}</p>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="card"
            >
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                  <Lightbulb size={16} />
                </div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Contribution</h4>
              </div>
              <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{r.contribution}</p>
            </motion.div>
          </div>

          {/* Metrics dashboard */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 card"
          >
            <div className="mb-5 flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-600 dark:text-blue-400" />
              <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Results & Impact</h4>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {r.metrics.map((m, i) => {
                const Icon = metricIcons[m.icon] || Check;
                return (
                  <motion.div
                    key={m.label}
                    initial={reduced ? false : { opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                    className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <Icon size={16} className="text-blue-600 dark:text-blue-400" />
                      <AnimatedCounter value={m.value} inView={inView} />
                    </div>
                    <p className="text-xs leading-snug text-neutral-600 dark:text-neutral-400">{m.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Innovations */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 grid gap-6 md:grid-cols-2"
          >
            <div className="card">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">Key Innovations</h4>
              <ul className="space-y-3">
                {r.innovations.map(inn => (
                  <li key={inn} className="flex items-start gap-2.5 text-sm text-neutral-700 dark:text-neutral-300">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400">
                      <Check size={11} />
                    </span>
                    {inn}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">Tools & Stack</h4>
              <div className="mb-5 flex flex-wrap gap-2">
                {r.tools.map(t => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500">Research Areas</h4>
              <div className="flex flex-wrap gap-2">
                {r.tags.map(t => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

function AnimatedCounter({ value, inView }) {
  const reduced = useReducedMotion();
  const isPercent = value.includes('%');
  const isNumeric = /^[\d.]+/.test(value) && !value.includes('→');

  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : value;

  const [display, setDisplay] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced || !inView) {
      setDisplay(target);
      return;
    }
    if (!isNumeric) {
      setDisplay(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: v => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, target, reduced, isNumeric]);

  const formatted = isNumeric
    ? `${Number.isInteger(target) ? Math.round(display) : display.toFixed(1)}${suffix}`
    : value;

  return <span className="text-xl font-bold text-neutral-900 dark:text-white">{formatted}</span>;
}
