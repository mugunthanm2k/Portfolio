import { useEffect, useState } from 'react';

// Live visibility (not sticky): true only while the element is near the viewport.
// Used to mount 3D canvases only when visible so we never keep several WebGL contexts running.
export default function useVisible(rootMargin = '100px') {
  const [el, setEl] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [el, rootMargin]);

  return [setEl, visible];
}
