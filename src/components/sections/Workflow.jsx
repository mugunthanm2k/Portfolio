import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import { workflow } from '../../data/workflow';

export default function Workflow() {
  const reduce = useReducedMotion();
  return (
    <section id="workflow" aria-labelledby="workflow-title" className="section">
      <SectionHeading
        eyebrow="Development workflow"
        title={<span id="workflow-title">From requirement to maintenance.</span>}
        subtitle="The complete software development lifecycle, in twelve steps."
      />

      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {workflow.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal as="li" key={s.n} delay={(i % 4) * 0.06} y={18}>
              <div className="glass group relative h-full overflow-hidden rounded-2xl p-5">
                <div className="flex items-start justify-between">
                  <span className="gradient-text font-display text-4xl font-bold leading-none">{s.n}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-electric/20 to-violet/20">
                    <Icon size={20} className="neon-icon text-electric" />
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{s.text}</p>
                <motion.span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-electric via-violet to-cyan"
                  initial={reduce ? { width: '100%' } : { width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + (i % 4) * 0.08 }}
                />
              </div>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
