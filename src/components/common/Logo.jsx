import { site } from '../../data/site';

export default function Logo({ size = 40, withName = false }) {
  const id = `lg-${size}`;
  return (
    <span className="inline-flex items-center gap-3">
      <svg width={size} height={size} viewBox="0 0 64 64" style={{ filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.55))' }} role="img" aria-label={`${site.name} logo`}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3b82f6" />
            <stop offset="0.6" stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="60" height="60" rx="16" fill="var(--surface-solid)" stroke={`url(#${id})`} strokeWidth="2.5" />
        <text
          x="32"
          y="43"
          textAnchor="middle"
          fontFamily="'Space Grotesk', Arial, sans-serif"
          fontWeight="700"
          fontSize={site.initials.length > 1 ? 24 : 30}
          fill={`url(#${id})`}
        >
          {site.initials}
        </text>
      </svg>
      {withName && <span className="font-display text-lg font-semibold tracking-tight">{site.name}</span>}
    </span>
  );
}
