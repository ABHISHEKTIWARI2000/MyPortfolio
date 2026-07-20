import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Github, ExternalLink, ChevronDown, Calendar, Tag } from 'lucide-react';
import { Section, SectionHeader } from './Section';
import { siteConfig } from '../config/site';
import { useReducedMotion } from '../hooks/useReducedMotion';

const categoryColor = {
  Research: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
  IoT: 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400',
  Systems: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400',
  'ML/AI': 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
};

export function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState(null);
  const projects = siteConfig.projects;
  const featured = projects.filter(p => p.featured);
  const other = projects.filter(p => !p.featured);

  return (
    <Section id="projects">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Featured Projects"
          title="Things I've built"
          description="From research frameworks to systems programming and IoT — each project solved a real problem."
        />

        <div ref={ref} className="grid gap-6 lg:grid-cols-2">
          {featured.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              inView={inView}
              reduced={reduced}
              expanded={expanded === p.id}
              onToggle={() => setExpanded(expanded === p.id ? null : p.id)}
            />
          ))}
        </div>

        {other.length > 0 && (
          <>
            <h3 className="mb-4 mt-12 text-sm font-semibold uppercase tracking-wider text-neutral-500">More Projects</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {other.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  index={i + featured.length}
                  inView={inView}
                  reduced={reduced}
                  compact
                  expanded={expanded === p.id}
                  onToggle={() => setExpanded(expanded === p.id ? null : p.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Section>
  );
}

function ProjectCard({ project, index, inView, reduced, expanded, onToggle, compact = false }) {
  const p = project;
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
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="card card-hover spotlight group flex flex-col"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${categoryColor[p.category] || ''}`}>
          <Tag size={10} />
          {p.category}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
          <Calendar size={11} />
          {p.period}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{p.title}</h3>
      <p className="mb-2 text-xs font-medium text-neutral-500">{p.subtitle}</p>
      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{p.description}</p>

      {/* Metrics */}
      <div className="mt-4 flex flex-wrap gap-2">
        {p.metrics.slice(0, compact ? 2 : 4).map(m => (
          <span key={m} className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            {m}
          </span>
        ))}
      </div>

      {/* Tech */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.tech.map(t => (
          <span key={t} className="rounded-md bg-neutral-50 px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">
            {t}
          </span>
        ))}
      </div>

      {/* Expandable */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 border-t border-neutral-100 pt-4 dark:border-neutral-800">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">All Metrics</h4>
              <ul className="space-y-1.5">
                {p.metrics.map(m => (
                  <li key={m} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-blue-500" />
                    {m}
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.map(t => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="mt-auto flex items-center gap-2 pt-5">
        {p.github && (
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
          >
            <Github size={13} />
            Code
          </a>
        )}
        {p.demo && (
          <a
            href={p.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
          >
            <ExternalLink size={13} />
            Demo
          </a>
        )}
        <button
          onClick={onToggle}
          className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400"
        >
          {expanded ? 'Less' : 'Details'}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={13} />
          </motion.span>
        </button>
      </div>
    </motion.div>
  );
}
