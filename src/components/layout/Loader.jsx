import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Logo from '../common/Logo';

export default function Loader() {
  const [show, setShow] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setShow(false), reduce ? 200 : 1300);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          aria-label="Loading"
          role="status"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Logo size={72} />
          </motion.div>
          <div className="mt-8 h-[3px] w-40 overflow-hidden rounded-full bg-line">
            <motion.div
              className="h-full bg-gradient-to-r from-electric via-violet to-cyan"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: reduce ? 0.1 : 1.1, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
