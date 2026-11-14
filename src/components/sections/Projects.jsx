import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import ProjectCard from '../projects/ProjectCard';
import CaseStudyModal from '../projects/CaseStudyModal';
import { projects, projectCategories } from '../../data/projects';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );
  const hasSamples = projects.some((p) => p.sample);

  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <SectionHeading
        eyebrow="Featured projects"
        title={<span id="projects-title">My work.</span>}
        subtitle={
          hasSamples
            ? 'The projects below are editable sample demonstrations. Real projects and screenshots will replace them.'
            : 'A selection of projects I have built.'
        }
      />

      <div role="group" aria-label="Filter projects by category" className="mb-6 flex flex-wrap gap-2">
        {projectCategories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`rounded-full px-4 py-2 text-sm transition ${
              filter === c ? 'bg-gradient-to-r from-electric to-violet text-white' : 'glass text-muted hover:text-fg'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <LayoutGroup>
        <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-live="polite">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.li
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={p} onOpen={setSelected} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>

      {visible.length === 0 && (
        <p className="glass rounded-2xl p-8 text-center text-muted">No projects in this category yet.</p>
      )}

      <AnimatePresence>
        {selected && <CaseStudyModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
