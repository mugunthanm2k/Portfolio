import { useState } from 'react';
import { site } from '../../data/site';

// Shows the real photograph. If the file is ever missing, falls back to the initials monogram.
export default function ProfilePhoto({ src, alt, eager = false, className = '', position = 'center top' }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-electric/30 to-violet/30 font-display text-6xl font-bold ${className}`}
        role="img"
        aria-label={alt}
      >
        {site.initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchpriority={eager ? 'high' : 'auto'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
      style={{ objectPosition: position }}
    />
  );
}
