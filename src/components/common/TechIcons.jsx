// Small inline SVG tech marks (simplified) used in the Workspace section.

export function ReactIcon({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="-12 -12 24 24" role="img" aria-label="React">
      <g fill="none" stroke="#61dafb" strokeWidth="1">
        <ellipse rx="10" ry="4.2" />
        <ellipse rx="10" ry="4.2" transform="rotate(60)" />
        <ellipse rx="10" ry="4.2" transform="rotate(120)" />
      </g>
      <circle r="1.8" fill="#61dafb" />
    </svg>
  );
}

export function AngularIcon({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Angular">
      <path d="M12 1.5 2.5 4.9l1.4 12.4L12 22.5l8.1-5.2 1.4-12.4z" fill="#dd0031" />
      <path d="M12 1.5v21l8.1-5.2 1.4-12.4z" fill="#c3002f" />
      <path d="M12 5.2 7 16.4h1.9l1-2.5h4.2l1 2.5H17zm0 3.6 1.5 3.6h-3z" fill="#fff" />
    </svg>
  );
}

export function Html5Icon({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="HTML5">
      <path d="M3 2h18l-1.6 18L12 22l-7.4-2z" fill="#e34f26" />
      <path d="M12 3.6V20.5l5.9-1.7 1.3-15.2z" fill="#ef652a" />
      <path d="M7.2 7.5h9.8l-.2 2.2H9.5l.2 2.1h6.9l-.5 5.2-4.1 1.2-4.1-1.2-.3-3h2.1l.1 1.5 2.2.6 2.2-.6.2-2.3H7.6z" fill="#fff" />
    </svg>
  );
}

export function SpringIcon({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Spring Boot">
      <path d="M12 1.5 21 6.7v10.6L12 22.5 3 17.3V6.7z" fill="#6db33f" />
      <g fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round">
        <path d="M12 6.8v5.2" />
        <path d="M8.6 9.2a5 5 0 1 0 6.8 0" />
      </g>
    </svg>
  );
}

export function MySqlMark() {
  return (
    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 18, color: '#4aa3df' }}>
      My<span style={{ color: '#f29111' }}>SQL</span>
    </span>
  );
}
