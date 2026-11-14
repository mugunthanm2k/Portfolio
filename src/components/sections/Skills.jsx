import { Suspense, lazy, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import ErrorBoundary from '../common/ErrorBoundary';
import useDevice from '../../hooks/useDevice';
import useVisible from '../../hooks/useVisible';
import useGlRecovery from '../../hooks/useGlRecovery';
import { skillCategories } from '../../data/skills';

const TechOrbit = lazy(() => import('../3d/TechOrbit'));

export default function Skills() {
  const [selected, setSelected] = useState(skillCategories[0].id);
  const { isMobile, reduced } = useDevice();
  const [orbitRef, orbitSeen] = useVisible('150px');
  const gl = useGlRecovery();
  const current = skillCategories.find((c) => c.id === selected);
  const CurrentIcon = current.icon;
  const odd = skillCategories.length % 2 === 1;

  return (
    <section id="expertise" aria-labelledby="expertise-title" className="section">
      <SectionHeading
        eyebrow="Technical expertise"
        title={<span id="expertise-title">My technology universe.</span>}
        subtitle="Pick a category to explore the tools I work with across the stack."
      />

      <div className="grid items-stretch gap-6 lg:grid-cols-[1.1fr_0.9fr] xl:gap-8">
        {/* 3D orbit (desktop/tablet only, lazy mounted) */}
        {!isMobile && (
          <div
            ref={orbitRef}
            data-theme="dark"
            style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.22), transparent 65%), #060b1d' }}
            className="relative hidden min-h-[520px] overflow-hidden rounded-3xl border border-line md:block"
          >
            {orbitSeen && !gl.failed && (
              <ErrorBoundary fallback={null}>
                <Suspense fallback={<p className="p-6 text-sm text-muted">Loading 3D view…</p>}>
                  <TechOrbit key={gl.key} onLost={gl.onLost} selectedId={selected} onSelect={setSelected} reduced={reduced} />
                </Suspense>
              </ErrorBoundary>
            )}
            <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs text-muted">
              Click a sphere to select a category
            </p>
          </div>
        )}

        {/* Right column: selected detail + category switcher */}
        <div className="flex flex-col gap-4">
          <div aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-3xl p-6"
                style={{ boxShadow: `0 0 40px -18px ${current.color}` }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ background: `${current.color}22`, color: current.color }}
                  >
                    <CurrentIcon size={24} />
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold">{current.title}</h3>
                    <p className="text-xs text-muted">{current.items.length} technologies</p>
                  </div>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {current.items.map((t) => (
                    <li key={t} className="rounded-full border px-3.5 py-1.5 text-sm" style={{ borderColor: `${current.color}55` }}>
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-3 auto-rows-fr" role="group" aria-label="Technology categories">
            {skillCategories.map((cat, i) => {
              const Icon = cat.icon;
              const active = cat.id === selected;
              const last = odd && i === skillCategories.length - 1;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelected(cat.id)}
                  aria-pressed={active}
                  className={`glass flex items-center gap-3 rounded-2xl p-3.5 text-left transition hover:-translate-y-0.5 ${last ? 'col-span-2' : ''}`}
                  style={active ? { boxShadow: `0 0 0 2px ${cat.color}`, borderColor: cat.color } : undefined}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: `${cat.color}1f`, color: cat.color }}>
                    <Icon size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-sm font-semibold">{cat.title}</span>
                    <span className="block text-xs text-muted">{cat.items.length} technologies</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
