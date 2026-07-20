import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`relative scroll-mt-24 py-20 md:py-32 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeader({ eyebrow, title, description }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="mb-12 md:mb-16">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="eyebrow mb-3"
      >
        <span className="h-1 w-8 rounded-full bg-blue-600 dark:bg-blue-400" />
        {eyebrow}
      </motion.div>
      <motion.h2
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 max-w-2xl text-base text-neutral-600 dark:text-neutral-400 md:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + 120;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids]);
  return active;
}
