import { Suspense, lazy } from 'react';
import { ArrowRight, Rocket } from 'lucide-react';
import ErrorBoundary from '../common/ErrorBoundary';
import Reveal from '../common/Reveal';
import { ReactIcon, AngularIcon, SpringIcon, MySqlMark } from '../common/TechIcons';
import useDevice from '../../hooks/useDevice';
import useVisible from '../../hooks/useVisible';
import useGlRecovery from '../../hooks/useGlRecovery';

const WorkspaceScene = lazy(() => import('../3d/WorkspaceScene'));

const techRow = [
  { icon: <ReactIcon size={44} />, label: 'React', color: '#61dafb' },
  { icon: <AngularIcon size={40} />, label: 'Angular' },
  { icon: <SpringIcon size={42} />, label: 'Spring Boot' },
  { icon: <div className="flex h-11 items-center"><MySqlMark /></div>, label: '' },
];

// Lightweight version for phones, reduced motion or WebGL failure
function Fallback() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-6 text-center">
      <div className="flex items-center gap-4">
        <ReactIcon size={40} />
        <AngularIcon size={36} />
        <SpringIcon size={38} />
        <MySqlMark />
      </div>
      <p className="max-w-xs text-sm text-muted">
        Frontend, backend, database and cloud deployment: the full stack in one workspace.
      </p>
    </div>
  );
}

export default function Workspace() {
  const { isMobile, reduced } = useDevice();
  const [ref, seen] = useVisible('150px');
  const gl = useGlRecovery();

  return (
    <section id="workspace" aria-labelledby="workspace-title" className="section">
      {/* Always-dark showcase panel, matching the design reference */}
      <div
        data-theme="dark"
        className="relative overflow-hidden rounded-[2rem] border border-line"
        style={{
          background:
            'radial-gradient(ellipse at 75% 55%, rgba(37,99,235,0.28), transparent 60%), radial-gradient(ellipse at 0% 0%, rgba(139,92,246,0.15), transparent 50%), #050816',
          color: 'var(--fg)',
        }}
      >
        <div className="grid items-center gap-2 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="p-7 sm:p-10 lg:p-12">
            <p className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-electric">
              My digital workspace
              <span className="hidden h-px flex-1 bg-gradient-to-r from-electric/70 to-transparent sm:block" aria-hidden="true" />
            </p>
            <h2 id="workspace-title" className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Where ideas
              <br />
              become <span className="gradient-text">products.</span>
            </h2>
            <p className="mt-5 max-w-md text-base text-muted sm:text-lg">
              Drag to look around. Frontend, backend, database and cloud, all in one scene.
            </p>

            <ul className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-4" aria-label="Core technologies">
              {techRow.map((t, i) => (
                <li key={i} className="flex items-stretch gap-6">
                  <div className="flex flex-col items-center gap-1.5">
                    {t.icon}
                    {t.label && (
                      <span className="text-xs" style={t.color ? { color: t.color } : undefined}>
                        {t.label}
                      </span>
                    )}
                  </div>
                  {i < techRow.length - 1 && <span className="hidden w-px bg-line sm:block" aria-hidden="true" />}
                </li>
              ))}
            </ul>

            <a
              href="#expertise"
              className="group mt-9 inline-flex items-center gap-3 rounded-full p-[1.5px] transition hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(110deg,#22d3ee,#3b82f6,#8b5cf6)' }}
            >
              <span className="flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sm font-medium">
                <Rocket size={16} className="text-cyan" />
                Explore My Workspace
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </span>
            </a>
          </Reveal>

          <div
            ref={ref}
            className="relative h-[340px] sm:h-[460px] lg:h-[540px]"
            role="img"
            aria-label="Interactive 3D developer workspace showing a laptop connected to frontend, backend, database and cloud"
          >
            {seen && !isMobile && !reduced && !gl.failed ? (
              <ErrorBoundary fallback={<Fallback />}>
                <Suspense fallback={<Fallback />}>
                  <WorkspaceScene key={gl.key} onLost={gl.onLost} reduced={reduced} />
                </Suspense>
              </ErrorBoundary>
            ) : (
              <Fallback />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
