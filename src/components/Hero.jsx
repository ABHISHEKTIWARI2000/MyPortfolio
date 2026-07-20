import { motion, useReducedMotion } from 'framer-motion';
import {
  Download, Mail, Github, Linkedin, ArrowDown, Sparkles,
  GraduationCap, Cpu, Users, FlaskConical, FileText, Award, Brain,
} from 'lucide-react';
import { siteConfig } from '../config/site';

const badgeIcons = {
  'graduation-cap': GraduationCap,
  cpu: Cpu,
  users: Users,
  flask: FlaskConical,
  'file-text': FileText,
  award: Award,
  sparkles: Sparkles,
};

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background */}
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="absolute inset-0 dot-bg opacity-30" aria-hidden />
      {/* Aurora blobs */}
      <div className="aurora absolute -top-20 left-1/4 h-[420px] w-[420px] rounded-full bg-blue-300/20 blur-[110px] dark:bg-blue-700/15" aria-hidden />
      <div className="aurora absolute top-40 right-1/4 h-[360px] w-[360px] rounded-full bg-teal-300/15 blur-[110px] dark:bg-teal-700/10" style={{ animationDelay: '-4s' }} aria-hidden />

      <div className="container-wide relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/70 px-3 py-1.5 text-xs font-medium text-neutral-600 backdrop-blur-xl dark:border-neutral-800/80 dark:bg-neutral-900/60 dark:text-neutral-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              {siteConfig.currentStatus}
            </motion.div>

            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="shimmer-text">{siteConfig.name}</span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-4 text-lg font-medium text-neutral-600 dark:text-neutral-300 md:text-xl"
            >
              {siteConfig.title} · <span className="text-accent-gradient font-semibold">{siteConfig.tagline}</span>
            </motion.p>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg"
            >
              {siteConfig.bio}
            </motion.p>

            {/* AI-ready highlight */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-5 flex items-start gap-3 rounded-2xl border border-blue-200/60 bg-gradient-to-r from-blue-50/80 to-teal-50/60 px-4 py-3 dark:border-blue-900/40 dark:from-blue-950/30 dark:to-teal-950/20"
            >
              <Brain size={18} className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" />
              <p className="text-sm leading-relaxed text-blue-900/80 dark:text-blue-200/80">
                <span className="font-semibold text-blue-700 dark:text-blue-300">AI-Ready:</span> {siteConfig.aiReady}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href={siteConfig.resume} download className="btn-primary">
                <Download size={16} />
                Download Resume
              </a>
              <a href={`mailto:${siteConfig.email}`} className="btn-secondary">
                <Mail size={16} />
                Contact
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-all hover:scale-110 hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-all hover:scale-110 hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-2.5"
            >
              {siteConfig.trustBadges.map(badge => {
                const Icon = badgeIcons[badge.icon] || Sparkles;
                return (
                  <motion.span
                    key={badge.label}
                    whileHover={{ y: -2, scale: 1.04 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/80 bg-white/80 px-3 py-1.5 text-xs font-medium text-neutral-700 backdrop-blur transition-colors hover:border-blue-300/60 dark:border-neutral-800/80 dark:bg-neutral-900/70 dark:text-neutral-300 dark:hover:border-blue-800/60"
                  >
                    <Icon size={12} className="text-blue-600 dark:text-blue-400" />
                    {badge.label}
                  </motion.span>
                );
              })}
            </motion.div>
          </div>

          {/* Right: Photo */}
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="relative">
              <div className="aurora absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-300/30 via-teal-200/20 to-transparent dark:from-blue-800/20 dark:via-teal-800/10" aria-hidden />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-neutral-200/80 bg-neutral-100 shadow-[0_24px_60px_-20px_rgb(var(--shadow-color)/0.25)] dark:border-neutral-800/80 dark:bg-neutral-900">
                <img
                  src={siteConfig.profilePhoto}
                  alt={siteConfig.name}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent" />
              </div>
              {/* Floating chips */}
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={reduced ? {} : { opacity: 1, y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -left-6 top-8 rounded-xl border border-neutral-200/80 bg-white/90 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur dark:border-neutral-800/80 dark:bg-neutral-900/90"
              >
                <div className="flex items-center gap-2">
                  <GraduationCap size={14} className="text-blue-600 dark:text-blue-400" />
                  IIT Guwahati
                </div>
              </motion.div>
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={reduced ? {} : { opacity: 1, y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -right-4 bottom-16 rounded-xl border border-neutral-200/80 bg-white/90 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur dark:border-neutral-800/80 dark:bg-neutral-900/90"
              >
                <div className="flex items-center gap-2">
                  <Brain size={14} className="text-blue-600 dark:text-blue-400" />
                  AI-Ready
                </div>
              </motion.div>
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={reduced ? {} : { opacity: 1, y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute -right-6 top-20 rounded-xl border border-neutral-200/80 bg-white/90 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur dark:border-neutral-800/80 dark:bg-neutral-900/90"
              >
                <div className="flex items-center gap-2">
                  <FlaskConical size={14} className="text-blue-600 dark:text-blue-400" />
                  Researcher
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex justify-center"
        >
          <motion.a
            href="#about"
            animate={reduced ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-xs text-neutral-400"
          >
            <span className="uppercase tracking-widest">Scroll</span>
            <ArrowDown size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
