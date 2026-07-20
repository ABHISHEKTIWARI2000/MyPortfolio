import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Code2, Cpu, Wrench, BookOpen, Lightbulb, Sparkles } from 'lucide-react';
import { Section, SectionHeader } from './Section';
import { siteConfig } from '../config/site';
import { useReducedMotion } from '../hooks/useReducedMotion';

const pillars = [
  { icon: Brain, title: 'Research Mindset', desc: 'Designed a novel IoT authentication framework with formal verification and real-hardware validation.' },
  { icon: Code2, title: 'Implementation Skills', desc: 'Built systems projects in C, IoT devices on Arduino/ESP, and ML pipelines in Python.' },
  { icon: Cpu, title: 'Systems Thinking', desc: 'Strong grip on Operating Systems, Computer Networks, and low-level socket programming.' },
  { icon: Sparkles, title: 'AI-Ready & Fast Learner', desc: 'Actively building fluency in Generative AI, Agentic AI, LLMs, and ML tooling. Give an AI task — it gets done.' },
  { icon: Wrench, title: 'Engineering Discipline', desc: '250+ DSA problems solved in C++. Consistent, ownership-driven approach to every project.' },
  { icon: BookOpen, title: 'Learning Ability', desc: 'Transitioned from Electrical to CS via GATE 2024. Proven track record of self-driven mastery.' },
  { icon: Lightbulb, title: 'Curiosity & Ownership', desc: 'Self-driven projects, mentoring at Saathi Club, and teaching 80+ students as a TA.' },
];

function SpotlightCard({ icon: Icon, title, desc, i, inView, reduced }) {
  const ref = useRef(null);
  const onMove = e => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
      whileHover={{ y: -4 }}
      className="card card-hover spotlight group"
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all group-hover:scale-110 group-hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:group-hover:bg-blue-900/40">
        <Icon size={20} />
      </div>
      <h3 className="mb-1.5 text-base font-semibold text-neutral-900 dark:text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{desc}</p>
    </motion.div>
  );
}

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  return (
    <Section id="about">
      <div className="container-wide">
        <SectionHeader
          eyebrow="About"
          title="Engineering maturity beyond the fresher label"
          description="Strong CS fundamentals, research mindset, and a consistent track record of turning complex problems into working systems."
        />

        {/* Recruiter signals marquee */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 overflow-hidden rounded-2xl border border-neutral-200/70 bg-neutral-50/50 py-3 dark:border-neutral-800/70 dark:bg-neutral-900/30"
        >
          <div className="flex w-max animate-marquee gap-8">
            {[...siteConfig.recruiterSignals, ...siteConfig.recruiterSignals, ...siteConfig.recruiterSignals].map((s, i) => (
              <span key={i} className="flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                <Sparkles size={13} className="text-blue-500 dark:text-blue-400" />
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        <div ref={ref} className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          {/* Story */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg"
          >
            <p>{siteConfig.bio}</p>
            <p>{siteConfig.bioExtended}</p>
            <p>{siteConfig.aiReady}</p>

            <div className="flex flex-wrap gap-2 pt-2">
              {siteConfig.recruiterSignals.map(t => (
                <span key={t} className="chip-accent">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* Quick facts */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card"
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">Quick Facts</h3>
            <dl className="space-y-3 text-sm">
              {[
                ['Education', 'M.Tech CSE, IIT Guwahati'],
                ['GATE 2024 (CSE)', 'AIR 1219'],
                ['DSA Solved', '250+ problems'],
                ['Teaching Impact', '80+ students'],
                ['AI Fluency', 'Actively building'],
                ['Primary Language', 'C++'],
              ].map(([k, v], i, arr) => (
                <div key={k} className={`flex justify-between gap-4 ${i < arr.length - 1 ? 'border-b border-neutral-100 pb-3 dark:border-neutral-800' : ''}`}>
                  <dt className="text-neutral-500">{k}</dt>
                  <dd className="font-medium text-neutral-900 dark:text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pillars.map((p, i) => (
            <SpotlightCard key={p.title} {...p} i={i} inView={inView} reduced={reduced} />
          ))}
        </div>
      </div>
    </Section>
  );
}
