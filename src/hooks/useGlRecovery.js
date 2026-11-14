import { useCallback, useState } from 'react';

// If the browser loses a WebGL context, remount the canvas (up to `max` times),
// then give up and let the section show its lightweight fallback.
export default function useGlRecovery(max = 3) {
  const [n, setN] = useState(0);
  const onLost = useCallback(() => setN((v) => v + 1), []);
  return { key: n, onLost, failed: n >= max };
}
