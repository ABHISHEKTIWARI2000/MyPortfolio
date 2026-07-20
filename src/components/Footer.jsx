import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { siteConfig } from '../config/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 py-10 dark:border-neutral-800">
      <div className="container-wide">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-xs font-bold text-white dark:bg-white dark:text-neutral-900">
              AT
            </span>
            <div>
              <div className="text-sm font-medium text-neutral-900 dark:text-white">{siteConfig.name}</div>
              <div className="text-xs text-neutral-500">{siteConfig.title}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a href={siteConfig.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900">
              <Github size={16} />
            </a>
            <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900">
              <Linkedin size={16} />
            </a>
            <a href={`mailto:${siteConfig.email}`} aria-label="Email" className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900">
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-neutral-100 pt-6 text-xs text-neutral-500 dark:border-neutral-800/50 sm:flex-row">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart size={12} className="text-red-500" /> using React, Tailwind & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
