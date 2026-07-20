import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Mail, Phone, Github, Linkedin, Download, Copy, Check, MessageCircle, Calendar,
} from 'lucide-react';
import { Section, SectionHeader } from './Section';
import { siteConfig } from '../config/site';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState({ email: false, phone: false });

  const copy = (key, value) => {
    navigator.clipboard.writeText(value);
    setCopied(c => ({ ...c, [key]: true }));
    setTimeout(() => setCopied(c => ({ ...c, [key]: false })), 1800);
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      copyKey: 'email',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone}`,
      copyKey: 'phone',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Chat on WhatsApp',
      href: `https://wa.me/${siteConfig.whatsapp}`,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: siteConfig.linkedin,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'View repositories',
      href: siteConfig.github,
    },
  ];

  return (
    <Section id="contact" className="bg-neutral-50/50 dark:bg-neutral-950/50">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something"
          description="Open to Software Engineering roles. Reach out via any channel below."
        />

        <div ref={ref} className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Methods */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            {contactMethods.map(m => (
              <div
                key={m.label}
                className="card flex items-center justify-between gap-4 transition-shadow hover:shadow-md"
              >
                <a href={m.href} target={m.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex flex-1 items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                    <m.icon size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-neutral-500">{m.label}</div>
                    <div className="text-sm font-medium text-neutral-900 dark:text-white">{m.value}</div>
                  </div>
                </a>
                {m.copyKey && (
                  <button
                    onClick={() => copy(m.copyKey, m.value)}
                    aria-label={`Copy ${m.label}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
                  >
                    {copied[m.copyKey] ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
                  </button>
                )}
              </div>
            ))}
          </motion.div>

          {/* CTA card */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card relative flex flex-col justify-between overflow-hidden border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white dark:from-neutral-900 dark:to-neutral-950"
          >
            <div className="aurora absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/20 blur-[80px]" aria-hidden />
            <div className="relative">
              <h3 className="text-xl font-semibold">Ready to contribute</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                Strong CS fundamentals, research mindset, engineering discipline, and AI-ready. Let's discuss how I can add value to your team.
              </p>
            </div>
            <div className="relative mt-6 flex flex-col gap-3">
              <a href={siteConfig.resume} download className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 transition-all hover:scale-[1.02] hover:bg-neutral-200">
                <Download size={16} />
                Download Resume
              </a>
              <a href={`mailto:${siteConfig.email}?subject=Interview%20Schedule`} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-all hover:scale-[1.02] hover:bg-white/10">
                <Calendar size={16} />
                Schedule Interview
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
