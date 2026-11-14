import { useId } from 'react';

// Illustrative project artwork drawn in SVG (one scene per project category).
// Replace with real screenshots by setting `thumbnail` / `screenshots` in src/data/projects.js.

const mono = "'JetBrains Mono', ui-monospace, monospace";

function Window({ children }) {
  return (
    <g>
      <rect x="20" y="18" width="280" height="144" rx="10" fill="#0a1128" stroke="#3b4a70" strokeOpacity="0.7" />
      <path d="M20 28a10 10 0 0 1 10-10h260a10 10 0 0 1 10 10v8H20z" fill="#111b3a" />
      <circle cx="32" cy="27" r="2.6" fill="#ef4444" />
      <circle cx="41" cy="27" r="2.6" fill="#f59e0b" />
      <circle cx="50" cy="27" r="2.6" fill="#22c55e" />
      <rect x="70" y="23" width="130" height="8" rx="4" fill="#1a2650" />
      {children}
    </g>
  );
}

const Bar = ({ x, y, w, h = 5, c = '#334155', o = 1 }) => <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={c} opacity={o} />;

function Store({ g }) {
  return (
    <Window>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${32 + i * 88} 46)`}>
          <rect width="78" height="62" rx="8" fill={`url(#${g}${i % 2 ? 'a' : 'b'})`} opacity="0.9" />
          <circle cx="39" cy="31" r="13" fill="#fff" opacity="0.18" />
          <Bar x={0} y={70} w={54} c="#94a3b8" />
          <Bar x={0} y={82} w={34} c="#475569" />
          <rect x="50" y="78" width="28" height="14" rx="7" fill="#3b82f6" />
        </g>
      ))}
      <circle cx="282" cy="27" r="4.5" fill="none" stroke="#22d3ee" />
    </Window>
  );
}

function Hrms({ g }) {
  return (
    <Window>
      <rect x="20" y="36" width="52" height="126" fill="#0d1633" />
      {[0, 1, 2, 3, 4].map((i) => (
        <Bar key={i} x={30} y={48 + i * 16} w={32} c={i === 1 ? '#3b82f6' : '#334155'} />
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={84 + i * 72} y="46" width="64" height="30" rx="7" fill={`url(#${g}${i % 2 ? 'a' : 'b'})`} opacity="0.85" />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(84 ${86 + i * 17})`}>
          <circle cx="6" cy="6" r="5" fill="#475569" />
          <Bar x={18} y={3} w={70} c="#64748b" />
          <Bar x={120} y={3} w={46} c="#334155" />
          <rect x="178" y="0" width="30" height="12" rx="6" fill={i % 2 ? '#22c55e' : '#f59e0b'} opacity="0.8" />
        </g>
      ))}
    </Window>
  );
}

function Api({ g }) {
  const lines = [
    [0, 90, '#a78bfa'], [14, 120, '#38bdf8'], [14, 80, '#f472b6'], [28, 110, '#22d3ee'], [14, 60, '#f59e0b'], [0, 40, '#a78bfa'], [14, 100, '#38bdf8'],
  ];
  return (
    <Window>
      {lines.map(([ind, w, c], i) => (
        <Bar key={i} x={32 + ind} y={48 + i * 13} w={w} c={c} o={0.85} />
      ))}
      <rect x="176" y="44" width="112" height="108" rx="8" fill="#0d1633" stroke="#3b4a70" strokeOpacity="0.6" />
      <text x="186" y="62" fontFamily={mono} fontSize="9" fill="#22d3ee">GET /api/tasks</text>
      <text x="186" y="78" fontFamily={mono} fontSize="9" fill="#22c55e">200 OK</text>
      <text x="186" y="96" fontFamily={mono} fontSize="9" fill="#94a3b8">{'{ "id": 1,'}</text>
      <text x="186" y="110" fontFamily={mono} fontSize="9" fill="#94a3b8">{'  "done": true }'}</text>
      <rect x="186" y="124" width="60" height="14" rx="7" fill={`url(#${g}b)`} />
    </Window>
  );
}

function Landing({ g }) {
  return (
    <Window>
      <Bar x={32} y={46} w={30} c="#3b82f6" />
      {[0, 1, 2].map((i) => <Bar key={i} x={200 + i * 30} y={46} w={20} c="#475569" />)}
      <Bar x={32} y={78} w={120} h={10} c="#e2e8f0" o={0.9} />
      <Bar x={32} y={96} w={96} h={10} c="#e2e8f0" o={0.9} />
      <Bar x={32} y={116} w={110} c="#64748b" />
      <rect x="32" y="130" width="62" height="18" rx="9" fill={`url(#${g}b)`} />
      <circle cx="232" cy="106" r="38" fill={`url(#${g}a)`} opacity="0.85" />
      <circle cx="232" cy="106" r="22" fill="#fff" opacity="0.12" />
    </Window>
  );
}

function Business({ g }) {
  return (
    <Window>
      <rect x="30" y="44" width="260" height="46" rx="8" fill={`url(#${g}b)`} opacity="0.85" />
      <Bar x={42} y={56} w={100} h={8} c="#fff" o={0.9} />
      <Bar x={42} y={72} w={70} c="#fff" o={0.55} />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${30 + i * 90} 100)`}>
          <rect width="80" height="46" rx="7" fill="#111b3a" stroke="#3b4a70" strokeOpacity="0.5" />
          <circle cx="14" cy="14" r="6" fill={['#3b82f6', '#8b5cf6', '#22d3ee'][i]} />
          <Bar x={10} y={28} w={50} c="#64748b" />
          <Bar x={10} y={37} w={32} c="#334155" />
        </g>
      ))}
    </Window>
  );
}

function Dashboard({ g }) {
  return (
    <Window>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${30 + i * 66} 44)`}>
          <rect width="58" height="28" rx="7" fill="#111b3a" stroke="#3b4a70" strokeOpacity="0.5" />
          <Bar x={8} y={8} w={26} c="#64748b" />
          <Bar x={8} y={17} w={38} h={6} c={['#3b82f6', '#8b5cf6', '#22d3ee'][i]} />
        </g>
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={32 + i * 20} y={146 - [24, 40, 30, 52, 36, 58, 44][i]} width="12" height={[24, 40, 30, 52, 36, 58, 44][i]} rx="3" fill={`url(#${g}a)`} />
      ))}
      <polyline points="32,120 62,104 92,112 122,88 152,96 182,74" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      <circle cx="248" cy="112" r="26" fill="none" stroke="#1a2650" strokeWidth="9" />
      <circle cx="248" cy="112" r="26" fill="none" stroke="#8b5cf6" strokeWidth="9" strokeDasharray="95 200" strokeLinecap="round" transform="rotate(-90 248 112)" />
      <circle cx="248" cy="112" r="26" fill="none" stroke="#3b82f6" strokeWidth="9" strokeDasharray="40 200" strokeDashoffset="-100" strokeLinecap="round" transform="rotate(-90 248 112)" />
    </Window>
  );
}

function Mobile({ g }) {
  const Phone = ({ x, y, s = 1, c }) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect width="76" height="150" rx="14" fill="#0a1128" stroke="#4b5b85" strokeWidth="1.5" />
      <rect x="28" y="6" width="20" height="4" rx="2" fill="#1a2650" />
      <rect x="8" y="18" width="60" height="34" rx="8" fill={`url(#${g}${c})`} opacity="0.9" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(8 ${60 + i * 24})`}>
          <rect width="60" height="19" rx="6" fill="#111b3a" />
          <circle cx="10" cy="9.5" r="4" fill={['#3b82f6', '#8b5cf6', '#22d3ee'][i]} />
          <Bar x={20} y={6} w={30} c="#64748b" />
        </g>
      ))}
      <rect x="22" y="136" width="32" height="3" rx="1.5" fill="#475569" />
    </g>
  );
  return (
    <g>
      <Phone x={86} y={16} c="b" />
      <Phone x={170} y={26} c="a" s={0.92} />
    </g>
  );
}

function Enterprise({ g }) {
  const nodes = [[160, 36, 'HR'], [236, 66, 'CRM'], [236, 122, 'FIN'], [160, 148, 'INV'], [84, 122, 'ERP'], [84, 66, 'RPT']];
  return (
    <g>
      {nodes.map(([x, y], i) => (
        <line key={i} x1="160" y1="92" x2={x} y2={y} stroke="#3b82f6" strokeOpacity="0.5" strokeDasharray="4 4" />
      ))}
      <circle cx="160" cy="92" r="26" fill={`url(#${g}b)`} />
      <circle cx="160" cy="92" r="36" fill="none" stroke="#8b5cf6" strokeOpacity="0.4" />
      <text x="160" y="96" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill="#fff">CORE</text>
      {nodes.map(([x, y, t]) => (
        <g key={t}>
          <rect x={x - 20} y={y - 11} width="40" height="22" rx="8" fill="#0d1633" stroke="#60a5fa" strokeOpacity="0.6" />
          <text x={x} y={y + 3.5} textAnchor="middle" fontFamily={mono} fontSize="9" fill="#e2e8f0">{t}</text>
        </g>
      ))}
    </g>
  );
}

const scenes = {
  'MERN Stack': Store,
  'Java Full Stack': Hrms,
  Python: Api,
  'Static Websites': Landing,
  'Business Websites': Business,
  'Admin Dashboards': Dashboard,
  'Mobile Applications': Mobile,
  'Enterprise Applications': Enterprise,
};

export default function ProjectArt({ category, className = '' }) {
  const g = 'pa' + useId().replace(/:/g, '');
  const Scene = scenes[category] || Landing;
  return (
    <svg viewBox="0 0 320 180" className={className} role="img" aria-label={`${category} project illustration`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${g}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b1a44" />
          <stop offset="0.55" stopColor="#1b1450" />
          <stop offset="1" stopColor="#0a2a3d" />
        </linearGradient>
        <linearGradient id={`${g}a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id={`${g}b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
        <radialGradient id={`${g}glow`} cx="0.75" cy="0.2" r="0.7">
          <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.45" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="180" fill={`url(#${g}bg)`} />
      <rect width="320" height="180" fill={`url(#${g}glow)`} />
      <Scene g={g} />
    </svg>
  );
}
