import { Suspense, lazy } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import ProfilePhoto from '../common/ProfilePhoto';
import ErrorBoundary from '../common/ErrorBoundary';
import useDevice from '../../hooks/useDevice';
import useVisible from '../../hooks/useVisible';
import useGlRecovery from '../../hooks/useGlRecovery';
import { site, availability } from '../../data/site';
import profile from '../../assets/profile.png';

const HeroScene = lazy(() => import('../3d/HeroScene'));

const chips = [
  { label: 'React', pos: 'left-[2%] top-[14%]', d: 0 },
  { label: 'Node.js', pos: 'right-[0%] top-[22%]', d: 0.6 },
  { label: 'Java', pos: 'left-[-2%] bottom-[28%]', d: 1.2 },
  { label: 'Python', pos: 'right-[2%] bottom-[16%]', d: 1.8 },
  { label: 'MongoDB', pos: 'left-[16%] bottom-[2%]', d: 2.4 },
];

export default function Hero() {
  const { isMobile, reduced } = useDevice();
  const [sceneRef, sceneVisible] = useVisible('50px');
  const gl = useGlRecovery();
  const reduce = useReducedMotion();

  return (
    <section id="home" aria-labelledby="hero-title" className="relative flex min-h-[88vh] items-center overflow-hidden pt-16">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-40 top-20 h-[460px] w-[460px] rounded-full bg-electric/20 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-violet/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-[1480px] items-center gap-10 px-5 py-8 sm:px-8 lg:grid-cols-2">
        <div>
          {availability.enabled && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {availability.label}
            </motion.div>
          )}

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="font-mono text-sm text-cyan"
          >
            Hello, I'm {site.name}.
          </motion.p>

          <motion.h1
            id="hero-title"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl"
          >
            <span className="gradient-text">Full Stack</span>
            <br />
            Software Developer
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-6 max-w-xl text-base text-muted sm:text-lg xl:max-w-2xl xl:text-xl"
          >
            {site.heroText}
          </motion.p>

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-4 max-w-xl text-sm italic text-muted"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a href="#projects" className="btn-primary">
              Explore My Work <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn-ghost">
              <MessageCircle size={16} /> Let's Connect
            </a>
          </motion.div>
        </div>

        {/* Photo composition */}
        <div ref={sceneRef} className="relative mx-auto aspect-square w-full max-w-[520px] xl:max-w-[640px]">
          <div className="absolute inset-[-12%]" aria-hidden="true">
            {sceneVisible && !gl.failed && (
              <ErrorBoundary fallback={null}>
                <Suspense fallback={null}>
                  <HeroScene key={gl.key} onLost={gl.onLost} isMobile={isMobile} reduced={reduced} />
                </Suspense>
              </ErrorBoundary>
            )}
          </div>

          <div className="absolute inset-[16%] rounded-full bg-gradient-to-br from-electric via-violet to-cyan p-[3px] shadow-[0_0_80px_-10px_var(--glow)]">
            <div className="h-full w-full overflow-hidden rounded-full">
              <ProfilePhoto
                src={profile}
                alt={`Portrait of ${site.name}`}
                eager
                className="h-full w-full"
                position="center 18%"
              />
            </div>
          </div>

          {chips.map((c) => (
            <motion.span
              key={c.label}
              className={`glass absolute ${c.pos} rounded-full px-3 py-1.5 font-mono text-xs`}
              animate={reduce || isMobile ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: c.d, ease: 'easeInOut' }}
            >
              {c.label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
