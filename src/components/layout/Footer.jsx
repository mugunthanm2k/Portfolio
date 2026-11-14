import { ArrowUp, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import Logo from '../common/Logo';
import { site, nav, socials } from '../../data/site';

const iconFor = { github: Github, linkedin: Linkedin, email: Mail, whatsapp: MessageCircle };

export default function Footer() {
  const reduce = useReducedMotion();
  return (
    <footer className="relative border-t border-line">
      <div
        className="pointer-events-none absolute inset-x-[10%] top-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent opacity-70"
        aria-hidden="true"
      />

      {/* One horizontal row: brand | navigation | social */}
      <div className="mx-auto flex max-w-[1480px] flex-col items-center gap-6 px-5 py-8 sm:px-8 lg:flex-row lg:justify-between xl:px-12">
        <a href="#home" aria-label="Go to top" className="flex shrink-0 items-center gap-4">
          <Logo size={44} withName />
          <span className="hidden border-l border-line pl-4 text-xs leading-5 text-muted xl:block">
            {site.title}
            <br />
            {site.location}
          </span>
        </a>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="text-muted transition hover:text-fg hover:[text-shadow:0_0_12px_rgba(96,165,250,0.9)]">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {socials.map((s) => {
            const Icon = iconFor[s.id] || Mail;
            return (
              <a
                key={s.id}
                href={s.href}
                target={s.id === 'email' ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="glass flex h-11 w-11 items-center justify-center rounded-full transition hover:-translate-y-1"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between px-5 py-4 text-xs text-muted sm:px-8 xl:px-12">
          <p>
            © {site.year} {site.name}. All rights reserved.
          </p>
          <motion.a
            href="#home"
            aria-label="Back to top"
            className="glass flex h-10 w-10 items-center justify-center rounded-full"
            animate={reduce ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowUp size={16} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
