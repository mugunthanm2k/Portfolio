import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import useDevice from '../../hooks/useDevice';

// Desktop-only custom cursor. Disabled for touch devices and reduced-motion users.
export default function Cursor() {
  const { canHover, reduced } = useDevice();
  const enabled = canHover && !reduced;
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 32 });
  const sy = useSpring(y, { stiffness: 380, damping: 32 });
  const [hot, setHot] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add('has-cursor');
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHot(!!e.target.closest?.('a, button, input, textarea, select, [role="button"]'));
    };
    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
      document.body.classList.remove('has-cursor');
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[95] h-2 w-2 rounded-full bg-cyan shadow-[0_0_12px_#22d3ee]"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[95] rounded-full border border-electric/70"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hot ? 54 : 32, height: hot ? 54 : 32, opacity: hot ? 0.9 : 0.6 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
