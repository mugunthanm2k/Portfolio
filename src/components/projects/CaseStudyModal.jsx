import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Github, ArrowRight } from 'lucide-react';
import ProjectArt from './ProjectArt';

function Block({ title, children }) {
  return (
    <section className="mt-7">
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyan">{title}</h4>
      {children}
    </section>
  );
}

const List = ({ items }) => (
  <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
    {items.map((i) => (
      <li key={i}>{i}</li>
    ))}
  </ul>
);

export default function CaseStudyModal({ project, onClose }) {
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

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/65 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
        className="glass my-8 w-full max-w-3xl rounded-3xl p-6 sm:p-9"
        style={{ background: 'var(--surface-solid)' }}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-cyan">{project.category}</p>
            <h3 className="mt-1 text-2xl font-semibold sm:text-3xl">{project.title}</h3>
            {project.sample && (
              <p className="mt-2 inline-block rounded-full bg-amber-400/90 px-3 py-0.5 text-[11px] font-semibold text-black">
                Sample demonstration, not real client work
              </p>
            )}
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Close case study" className="rounded-full p-2 hover:bg-line">
            <X size={20} />
          </button>
        </div>

        <Block title="1 · Project overview">
          <p className="text-sm text-muted">{project.description}</p>
        </Block>
        <Block title="2 · Business problem">
          <p className="text-sm text-muted">{project.problem}</p>
          <p className="mt-2 text-sm text-muted">
            <span className="font-medium text-fg">Solution: </span>
            {project.solution}
          </p>
        </Block>
        <Block title="3 · Project objectives">
          <List items={project.objectives} />
        </Block>

        <Block title="4 · Architecture">
          <ol className="flex flex-wrap items-center gap-2" aria-label="Architecture flow">
            {project.architecture.map((node, i) => (
              <li key={node} className="flex items-center gap-2">
                <span className="rounded-xl border border-electric/40 bg-electric/10 px-3 py-2 text-xs font-medium">{node}</span>
                {i < project.architecture.length - 1 && <ArrowRight size={14} className="text-muted" aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </Block>

        <Block title="5 · Technology stack">
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li key={t} className="rounded-full border border-line px-3 py-1 text-xs">
                {t}
              </li>
            ))}
          </ul>
        </Block>

        <Block title="6 · Development process">
          <ol className="space-y-1 text-sm text-muted">
            {project.process.map((p, i) => (
              <li key={p}>
                <span className="mr-2 font-mono text-xs text-electric">{String(i + 1).padStart(2, '0')}</span>
                {p}
              </li>
            ))}
          </ol>
        </Block>

        <Block title="7 · Important features">
          <List items={project.features} />
        </Block>
        <Block title="8 · Database design">
          <p className="text-sm text-muted">{project.database}</p>
        </Block>

        <Block title="9 · Screenshots">
          {project.screenshots.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {project.screenshots.map((s, i) => (
                <img key={i} src={s} alt={`${project.title} screenshot ${i + 1}`} loading="lazy" className="rounded-xl border border-line" />
              ))}
            </div>
          ) : (
            <figure>
              <ProjectArt category={project.category} className="w-full overflow-hidden rounded-xl border border-line" />
              <figcaption className="mt-2 text-xs text-muted">Illustrative preview. Real screenshots can be added in src/data/projects.js.</figcaption>
            </figure>
          )}
        </Block>

        <Block title="10 · Deployment information">
          <p className="text-sm text-muted">{project.deployment}</p>
        </Block>

        <Block title="11 · Live project & 12 · GitHub repository">
          <div className="flex flex-wrap gap-3">
            {project.live ? (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2 text-xs">
                <ExternalLink size={14} /> Live Project
              </a>
            ) : (
              <span className="rounded-full border border-line px-4 py-2 text-xs text-muted">Live link not available</span>
            )}
            {project.github ? (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2 text-xs">
                <Github size={14} /> GitHub Repository
              </a>
            ) : (
              <span className="rounded-full border border-line px-4 py-2 text-xs text-muted">Repository not available</span>
            )}
          </div>
        </Block>
      </motion.div>
    </motion.div>
  );
}
