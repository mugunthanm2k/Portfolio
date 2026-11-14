import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowUpRight, ChevronDown } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import { capabilities } from '../../data/capabilities';
import { servicePromotion } from '../../data/site';

function CapabilityModal({ item, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const Icon = item.icon;
  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        className="glass w-full max-w-lg rounded-3xl p-7"
        style={{ background: 'var(--surface-solid)' }}
        initial={{ y: 30, scale: 0.96 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-electric/15 text-electric">
            <Icon size={24} />
          </span>
          <button ref={closeRef} onClick={onClose} aria-label="Close" className="rounded-full p-2 hover:bg-line">
            <X size={18} />
          </button>
        </div>
        <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
        <p className="mt-3 text-muted">{item.desc}</p>
        <h4 className="mt-6 text-xs font-semibold uppercase tracking-widest text-cyan">Relevant technologies</h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {item.tech.map((t) => (
            <li key={t} className="rounded-full border border-line px-3 py-1 text-sm">
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted">
          This describes a development capability, not a record of completed client work.
        </p>
        {servicePromotion.enquiryEnabled ? (
          <a href="#contact" onClick={onClose} className="btn-primary mt-6">
            Discuss this <ArrowUpRight size={16} />
          </a>
        ) : (
          <p className="mt-6 rounded-xl border border-line px-4 py-3 text-xs text-muted">
            Service enquiries are not enabled yet.
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Capabilities() {
  const [open, setOpen] = useState(null);
  const [expanded, setExpanded] = useState(false);

  // Collapsed: exactly two rows at every breakpoint (1-col:4, 2-col:4, 3-col:6, 4-col:8)
  const cls = (i) => {
    if (expanded || i < 4) return '';
    if (i < 6) return 'hidden lg:block';
    if (i < 8) return 'hidden xl:block';
    return 'hidden';
  };

  const toggle = () => {
    if (expanded) document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' });
    setExpanded((v) => !v);
  };

  return (
    <section id="capabilities" aria-labelledby="cap-title" className="section">
      <SectionHeading
        eyebrow="What I can build"
        title={<span id="cap-title">Development capabilities.</span>}
        subtitle="From a single landing page to a full enterprise system, these are the kinds of products I can design, build and deploy."
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {capabilities.map((c, i) => {
          const Icon = c.icon;
          return (
            <Reveal as="li" key={c.title} delay={(i % 4) * 0.05} className={cls(i)}>
              <article className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition duration-300 hover:-translate-y-1.5 hover:border-electric/60">
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-electric/20 opacity-0 blur-2xl transition group-hover:opacity-100"
                  aria-hidden="true"
                />
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-electric/20 to-violet/20 text-electric">
                  <Icon size={22} className="neon-icon" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted">{c.desc}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {c.tech.map((t) => (
                    <li key={t} className="rounded-full bg-line px-2.5 py-0.5 text-[11px] text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setOpen(c)}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-electric transition group-hover:gap-2"
                >
                  Learn more <ArrowUpRight size={14} />
                </button>
              </article>
            </Reveal>
          );
        })}
      </ul>

      <div className="mt-8 flex justify-center">
        <button
          onClick={toggle}
          aria-expanded={expanded}
          className="btn-ghost"
        >
          {expanded ? 'Show less' : `Show all ${capabilities.length} capabilities`}
          <ChevronDown size={16} className={`transition ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <AnimatePresence>{open && <CapabilityModal item={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
