import { useEffect, useRef, useState } from 'react';

// True once the element has come near the viewport. Used to lazy mount 3D scenes.
export default function useInView(rootMargin = '200px') {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen, rootMargin]);

  return [ref, seen];
}
