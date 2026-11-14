import { useEffect, useState } from 'react';

// Returns { isMobile, reduced, canHover } so heavy effects can be skipped.
export default function useDevice() {
  const get = () => ({
    isMobile: window.matchMedia('(max-width: 767px)').matches,
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    canHover: window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  });
  const [state, setState] = useState(get);

  useEffect(() => {
    const queries = ['(max-width: 767px)', '(prefers-reduced-motion: reduce)', '(hover: hover) and (pointer: fine)']
      .map((q) => window.matchMedia(q));
    const onChange = () => setState(get());
    queries.forEach((q) => q.addEventListener('change', onChange));
    return () => queries.forEach((q) => q.removeEventListener('change', onChange));
  }, []);

  return state;
}
