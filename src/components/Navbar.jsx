import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Command } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useTheme } from '../hooks/useTheme';
import { useActiveSection } from './Section';

const navLinks = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Research', href: '#research', id: 'research' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'DSA', href: '#problem-solving', id: 'problem-solving' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export function Navbar({ onCommand }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const active = useActiveSection(navLinks.map(l => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass border-b'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="container-wide flex h-16 items-center justify-between">
          <a href="#home" className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-white transition-transform group-hover:scale-105 dark:bg-white dark:text-neutral-900">
              AT
            </span>
            <span className="hidden text-sm font-medium text-neutral-900 dark:text-white sm:block">
              {siteConfig.name}
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  active === link.id
                    ? 'text-neutral-900 dark:text-white'
                    : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-neutral-100 dark:bg-neutral-900"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onCommand}
              className="hidden items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-xs text-neutral-500 transition-colors hover:border-neutral-300 hover:text-neutral-700 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-neutral-200 sm:flex"
            >
              <Command size={12} />
              <span>Search</span>
              <kbd className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium dark:bg-neutral-800">⌘K</kbd>
            </button>

            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-all hover:scale-105 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun size={16} />
                  </motion.span>
                ) : (
                  <motion.span key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <a
              href={siteConfig.resume}
              download
              className="hidden rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-all hover:scale-[1.03] hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 md:block"
            >
              Resume
            </a>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400 lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[85%] border-l border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm font-medium">Menu</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {navLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-4 py-3 text-base transition-colors ${
                      active === link.id
                        ? 'bg-neutral-100 font-medium text-neutral-900 dark:bg-neutral-900 dark:text-white'
                        : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={siteConfig.resume}
                  download
                  onClick={() => setOpen(false)}
                  className="mt-4 rounded-lg bg-neutral-900 px-4 py-3 text-center text-base font-medium text-white dark:bg-white dark:text-neutral-900"
                >
                  Download Resume
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
